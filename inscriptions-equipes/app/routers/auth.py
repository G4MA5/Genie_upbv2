"""Inscription et connexion des candidats : matricule, puis confirmation de l'e-mail par un code.

1. POST /api/auth/matricule : aperçu de l'étudiant (compte existant ou dossier UPB) et e-mail semi-masqué.
2. POST /api/auth/code      : le candidat retape son e-mail ; s'il correspond à celui du dossier,
                              un code à 5 chiffres lui est envoyé (Brevo).
3. POST /api/auth/verifier  : code correct -> session (compte existant) ou création du compte.

Personne ne peut donc entrer dans l'espace d'un candidat avec son seul matricule.
"""
import hashlib
import hmac
import logging
import secrets
from typing import Any

from fastapi import APIRouter, Depends, status
from psycopg import Connection
from psycopg.errors import UniqueViolation
from pydantic import BaseModel, Field

from ..config import get_settings
from ..db import one, transaction
from ..security import creer_jeton, limiter
from ..services import email as mails
from ..services import upb_api
from ..services.equipes import erreur, exiger_inscriptions_ouvertes
from ..services.normalisation import (
    initiales,
    masquer_email,
    matricule_valide,
    normaliser_email,
    normaliser_matricule,
)

log = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["Inscription"])

CODE_CHIFFRES = 5
CODE_VALIDITE_MIN = 10
CODE_MAX_ESSAIS = 5
CODES_MAX_PAR_HEURE = 5

MSG_EMAIL_PRIS = (
    "L'adresse e-mail associée à ce matricule est déjà utilisée par un autre candidat. "
    "Un candidat = une adresse e-mail : contacte l'organisation pour corriger ton dossier."
)
MSG_SANS_EMAIL = (
    "Aucune adresse e-mail n'est enregistrée dans ton dossier UPB : "
    "complète-le sur la base des étudiants UPB (https://dbupb.synapstic.tech/)."
)
MSG_EMAIL_DIFFERENT = "Cette adresse ne correspond pas à celle du dossier. Vérifie l'adresse semi-masquée."
# Le frontend redirige alors l'étudiant vers la base des étudiants UPB (https://dbupb.synapstic.tech/)
MSG_MATRICULE_INCONNU = "Ce matricule n'est pas dans la base des étudiants UPB."
MSG_DOSSIER_INCOMPLET = (
    "Ton dossier UPB est incomplet : complète-le sur la base des étudiants UPB (https://dbupb.synapstic.tech/)."
)
MSG_CODE_FAUX = "Code incorrect. Vérifie le code reçu par e-mail."
MSG_CODE_EXPIRE = "Ce code a expiré ou a déjà servi. Demande un nouveau code."


class MatriculeIn(BaseModel):
    matricule: str = Field(min_length=1, max_length=40)


class CodeIn(MatriculeIn):
    email: str = Field(min_length=3, max_length=254)


class VerificationIn(CodeIn):
    code: str = Field(min_length=1, max_length=10)
    # Seulement pour une première inscription
    conditions_acceptees: bool = False
    hebergement: bool = False


# --- Outils -------------------------------------------------------------------

def _matricule(brut: str) -> str:
    m = normaliser_matricule(brut)
    if not matricule_valide(m):
        raise erreur(status.HTTP_400_BAD_REQUEST, "Format invalide : lettres et chiffres uniquement, sans espace.")
    return m


def _compte(conn: Connection, matricule: str) -> dict[str, Any] | None:
    return one(conn, 'select * from public."user" where upper(btrim(matricule)) = %s', (matricule,))


def _etudiant_upb(matricule: str) -> upb_api.EtudiantUPB:
    try:
        etu = upb_api.verifier_matricule(matricule)
    except upb_api.UpbIndisponible:
        raise erreur(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            "La base des étudiants UPB ne répond pas. Réessaie dans quelques minutes.",
        ) from None
    if etu is None:
        raise erreur(status.HTTP_404_NOT_FOUND, MSG_MATRICULE_INCONNU)
    return etu


def _manquants(nom, prenoms, email, filiere, niveau, genre) -> list[str]:
    """Champs indispensables absents du dossier : sans eux, ni e-mail de confirmation ni règles d'équipe."""
    champs = {
        "e-mail": email, "nom": nom, "prénoms": prenoms,
        "filière": filiere, "niveau": niveau, "sexe": genre,
    }
    return [libelle for libelle, valeur in champs.items() if not (str(valeur).strip() if valeur else "")]


def _dossier(matricule: str) -> dict[str, Any]:
    """Qui se connecte : compte candidat existant, sinon dossier de la base UPB (nouvelle inscription)."""
    with transaction() as conn:
        compte = _compte(conn, matricule)
    if compte and compte.get("participant"):
        return {
            "statut": "existant",
            "compte": compte,
            "etu": None,
            "email": compte.get("email"),
            "prenom": compte.get("prenom") or "",
            "manquants": _manquants(
                compte.get("nom"), compte.get("prenom"), compte.get("email"),
                compte.get("filiere"), compte.get("niveau"), compte.get("genre"),
            ),
            "apercu": {
                "matricule": compte.get("matricule") or matricule,
                "nom": compte.get("nom") or "",
                "prenoms": compte.get("prenom") or "",
                "initiales": initiales(compte.get("nom"), compte.get("prenom")),
                "niveau": compte.get("niveau"),
                "filiere": compte.get("filiere"),
            },
        }
    exiger_inscriptions_ouvertes()
    etu = _etudiant_upb(matricule)
    return {
        "statut": "nouveau",
        "compte": compte,
        "etu": etu,
        "email": etu.email,
        "prenom": etu.prenoms or "",
        "manquants": _manquants(etu.nom, etu.prenoms, etu.email, etu.filiere, etu.niveau, etu.genre),
        "apercu": {
            "matricule": etu.matricule,
            "nom": etu.nom,
            "prenoms": etu.prenoms,
            "initiales": initiales(etu.nom, etu.prenoms),
            "niveau": etu.niveau,
            "filiere": etu.filiere,
        },
    }


def _verifier_email(dossier: dict[str, Any], saisi: str) -> str:
    if dossier["manquants"]:
        raise erreur(status.HTTP_409_CONFLICT, MSG_DOSSIER_INCOMPLET)
    attendu = normaliser_email(dossier["email"])
    if not attendu:
        raise erreur(status.HTTP_409_CONFLICT, MSG_SANS_EMAIL)
    if not hmac.compare_digest(attendu.encode(), normaliser_email(saisi).encode()):
        raise erreur(status.HTTP_400_BAD_REQUEST, MSG_EMAIL_DIFFERENT)
    return attendu


def _empreinte(matricule: str, code: str) -> str:
    cle = get_settings().jwt_secret.encode()
    return hmac.new(cle, f"connexion:{matricule}:{code}".encode(), hashlib.sha256).hexdigest()


# --- Routes -------------------------------------------------------------------

@router.post("/matricule", dependencies=[Depends(limiter("auth-matricule", 20, 60))])
def identifier(body: MatriculeIn) -> dict[str, Any]:
    """Aperçu de l'étudiant et e-mail semi-masqué. Aucune session n'est ouverte ici."""
    matricule = _matricule(body.matricule)
    dossier = _dossier(matricule)
    return {
        "statut": dossier["statut"],
        "etudiant": dossier["apercu"],
        "email_masque": masquer_email(dossier["email"]),
        # Champs indispensables absents : le frontend propose alors de compléter le dossier sur dbupb
        "dossier_incomplet": bool(dossier["manquants"]),
        "champs_manquants": dossier["manquants"],
    }


@router.post("/code", dependencies=[Depends(limiter("auth-code", 6, 60))])
def envoyer_code(body: CodeIn) -> dict[str, Any]:
    """Envoie un code à 5 chiffres si l'e-mail saisi est bien celui du dossier."""
    matricule = _matricule(body.matricule)
    dossier = _dossier(matricule)
    email = _verifier_email(dossier, body.email)

    code = f"{secrets.randbelow(10 ** CODE_CHIFFRES):0{CODE_CHIFFRES}d}"
    with transaction() as conn:
        recents = one(
            conn,
            "select count(*) as n from public.code_connexion where matricule = %s and cree_le > now() - interval '1 hour'",
            (matricule,),
        )
        if recents and recents["n"] >= CODES_MAX_PAR_HEURE:
            raise erreur(
                status.HTTP_429_TOO_MANY_REQUESTS,
                "Trop de codes demandés pour ce matricule. Réessaie dans une heure.",
            )
        # Un seul code valable à la fois : les précédents ne servent plus.
        conn.execute(
            "update public.code_connexion set utilise = true where matricule = %s and not utilise", (matricule,)
        )
        conn.execute(
            """insert into public.code_connexion (matricule, email, code_hash, expire_le)
               values (%s, %s, %s, now() + make_interval(mins => %s))""",
            (matricule, email, _empreinte(matricule, code), CODE_VALIDITE_MIN),
        )

    s = get_settings()
    if not s.email_enabled:
        # Développement uniquement : sans envoi d'e-mail, le code est visible dans les journaux du serveur.
        log.warning("E-mails désactivés — code de connexion pour %s : %s", matricule, code)
    elif not mails.code_connexion(email, dossier["prenom"], code, CODE_VALIDITE_MIN):
        with transaction() as conn:
            conn.execute("update public.code_connexion set utilise = true where matricule = %s and not utilise", (matricule,))
        raise erreur(
            status.HTTP_502_BAD_GATEWAY,
            "L'e-mail n'a pas pu être envoyé. Réessaie dans quelques instants.",
        )
    return {
        "message": f"Code envoyé à {masquer_email(email)}.",
        "email_masque": masquer_email(email),
        "validite_minutes": CODE_VALIDITE_MIN,
    }


@router.post("/verifier", dependencies=[Depends(limiter("auth-verifier", 15, 60))])
def verifier_code(body: VerificationIn) -> dict[str, Any]:
    """Code correct : ouvre la session (compte existant) ou crée le compte (première inscription)."""
    matricule = _matricule(body.matricule)
    code = "".join(c for c in body.code if c.isdigit())
    if len(code) != CODE_CHIFFRES:
        raise erreur(status.HTTP_400_BAD_REQUEST, f"Le code contient {CODE_CHIFFRES} chiffres.")

    dossier = _dossier(matricule)
    email = _verifier_email(dossier, body.email)
    if dossier["statut"] == "nouveau" and not body.conditions_acceptees:
        raise erreur(status.HTTP_400_BAD_REQUEST, "Tu dois accepter les conditions d'utilisation pour t'inscrire.")

    refus: str | None = None
    with transaction() as conn:
        ligne = one(
            conn,
            """select * from public.code_connexion
               where matricule = %s and lower(email) = %s and not utilise and expire_le > now()
               order by cree_le desc limit 1 for update""",
            (matricule, email),
        )
        if ligne is None:
            raise erreur(status.HTTP_400_BAD_REQUEST, MSG_CODE_EXPIRE)
        if hmac.compare_digest(ligne["code_hash"], _empreinte(matricule, code)):
            conn.execute("update public.code_connexion set utilise = true where id = %s", (ligne["id"],))
        else:
            # Le compteur d'essais est enregistré (pas d'exception dans la transaction).
            essais = ligne["essais"] + 1
            epuise = essais >= CODE_MAX_ESSAIS
            conn.execute(
                "update public.code_connexion set essais = %s, utilise = %s where id = %s",
                (essais, epuise, ligne["id"]),
            )
            restant = CODE_MAX_ESSAIS - essais
            refus = (
                "Trop d'essais incorrects. Demande un nouveau code."
                if epuise
                else f"{MSG_CODE_FAUX} Il te reste {restant} essai{'s' if restant > 1 else ''}."
            )
    if refus:
        raise erreur(status.HTTP_400_BAD_REQUEST, refus)

    # Code correct
    if dossier["statut"] == "existant":
        return {"statut": "existant", "token": creer_jeton(dossier["compte"]["id"])}
    return _inscrire(matricule, dossier["etu"], body.hebergement)


# --- Création du compte -------------------------------------------------------

def _inscrire(matricule: str, etu: upb_api.EtudiantUPB, hebergement: bool) -> dict[str, Any]:
    valeurs = (
        etu.nom, etu.prenoms, etu.filiere, etu.niveau, etu.email, etu.telephone, etu.genre,
        etu.date_naissance, hebergement, etu.numero_candidat,
    )
    try:
        return _creer_ou_activer(matricule, etu, valeurs)
    except UniqueViolation as exc:
        if exc.diag.constraint_name == "user_email_candidat_unique":
            raise erreur(status.HTTP_409_CONFLICT, MSG_EMAIL_PRIS) from None
        # Double clic / deux onglets : le compte vient d'être créé par l'autre requête.
        with transaction() as conn:
            compte = _compte(conn, matricule)
        if not compte:
            raise
        return {"statut": "existant", "token": creer_jeton(compte["id"])}


def _creer_ou_activer(matricule: str, etu: upb_api.EtudiantUPB, valeurs: tuple) -> dict[str, Any]:
    with transaction() as conn:
        compte = _compte(conn, matricule)
        if compte and compte.get("participant"):
            return {"statut": "existant", "token": creer_jeton(compte["id"])}
        # 1 candidat = 1 e-mail
        if etu.email and one(
            conn,
            """select 1 from public."user" where participant and lower(btrim(email)) = lower(btrim(%s))
               and id <> coalesce(%s, -1)""",
            (etu.email, compte["id"] if compte else None),
        ):
            raise erreur(status.HTTP_409_CONFLICT, MSG_EMAIL_PRIS)
        if compte:
            # Ligne déjà présente (ex. invité) : on la complète et on l'active comme candidat.
            conn.execute(
                """update public."user" set nom=%s, prenom=%s, filiere=%s, niveau=%s, email=%s, numero=%s,
                   genre=%s, date_naissance=%s, hebergement=%s, numero_candidat=%s, participant=true,
                   conditions_acceptees_le=now() where id=%s""",
                (*valeurs, compte["id"]),
            )
            id_user = compte["id"]
        else:
            row = one(
                conn,
                """insert into public."user"
                   (user_id, nom, prenom, filiere, niveau, email, numero, genre, date_naissance, hebergement,
                    numero_candidat, matricule, participant, role, invite, conditions_acceptees_le)
                   values (null, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, true, false, false, now())
                   returning id""",
                (*valeurs, etu.matricule),
            )
            assert row is not None
            id_user = row["id"]
    return {"statut": "cree", "token": creer_jeton(id_user)}
