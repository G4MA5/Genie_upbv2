"""Inscription et connexion par matricule."""
from typing import Any

from fastapi import APIRouter, Depends, status
from psycopg import Connection
from psycopg.errors import UniqueViolation
from pydantic import BaseModel, Field

from ..db import one, transaction
from ..security import creer_jeton, limiter
from ..services import upb_api
from ..services.equipes import erreur, exiger_inscriptions_ouvertes
from ..services.normalisation import initiales, matricule_valide, normaliser_matricule

router = APIRouter(prefix="/api/auth", tags=["Inscription"])


class MatriculeIn(BaseModel):
    matricule: str = Field(min_length=1, max_length=40)


class InscriptionIn(MatriculeIn):
    conditions_acceptees: bool
    hebergement: bool = False


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
        raise erreur(status.HTTP_404_NOT_FOUND, "Matricule non reconnu dans la base des étudiants UPB.")
    return etu


@router.post("/matricule", dependencies=[Depends(limiter("auth-matricule", 20, 60))])
def identifier(body: MatriculeIn) -> dict[str, Any]:
    """Étape 1 : compte existant -> session ; sinon aperçu de l'étudiant trouvé dans la base UPB."""
    matricule = _matricule(body.matricule)
    with transaction() as conn:
        compte = _compte(conn, matricule)
    if compte and compte.get("participant"):
        return {"statut": "existant", "token": creer_jeton(compte["id"]), "prenom": compte.get("prenom")}

    exiger_inscriptions_ouvertes()
    etu = _etudiant_upb(matricule)
    # Aperçu minimal : de quoi se reconnaître, sans e-mail ni téléphone.
    return {
        "statut": "nouveau",
        "etudiant": {
            "matricule": etu.matricule,
            "nom": etu.nom,
            "prenoms": etu.prenoms,
            "initiales": initiales(etu.nom, etu.prenoms),
            "niveau": etu.niveau,
            "filiere": etu.filiere,
        },
    }


@router.post("/inscription", status_code=201, dependencies=[Depends(limiter("auth-inscription", 10, 60))])
def inscrire(body: InscriptionIn) -> dict[str, Any]:
    """Étape 2 : création du compte après acceptation des conditions d'utilisation."""
    if not body.conditions_acceptees:
        raise erreur(status.HTTP_400_BAD_REQUEST, "Tu dois accepter les conditions d'utilisation pour t'inscrire.")
    matricule = _matricule(body.matricule)
    exiger_inscriptions_ouvertes()
    etu = _etudiant_upb(matricule)

    valeurs = (
        etu.nom, etu.prenoms, etu.filiere, etu.niveau, etu.email, etu.telephone, etu.genre,
        etu.date_naissance, body.hebergement, etu.numero_candidat,
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


MSG_EMAIL_PRIS = (
    "L'adresse e-mail associée à ce matricule est déjà utilisée par un autre candidat. "
    "Un candidat = une adresse e-mail : contacte l'organisation pour corriger ton dossier."
)


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
