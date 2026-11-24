"""Équipes : création, modification, invitations envoyées, retrait, soumission, ressources."""
import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, File, UploadFile, status
from psycopg import Connection
from psycopg.errors import UniqueViolation
from pydantic import BaseModel, Field, field_validator

from ..config import get_settings
from ..db import one, transaction
from ..security import Candidat
from ..services import email, stockage
from ..services import equipes as eq
from ..services.fichiers import lire_fichier
from ..services.normalisation import matricule_valide, normaliser_matricule
from ..services.regles import regle_pour, verifier_ajout

router = APIRouter(prefix="/api/equipes", tags=["Équipes"])

TYPES_RESSOURCE = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "image/png",
    "image/jpeg",
}
MAX_RESSOURCES = 10


class EquipeIn(BaseModel):
    nom: str = Field(min_length=2, max_length=60)
    id_concours: int

    @field_validator("nom")
    @classmethod
    def _nom(cls, v: str) -> str:
        v = " ".join(v.split())
        if len(v) < 2:
            raise ValueError("Nom trop court")
        return v


class EquipeModif(BaseModel):
    nom: str | None = Field(default=None, min_length=2, max_length=60)
    id_concours: int | None = None


class InvitationIn(BaseModel):
    matricule: str = Field(min_length=1, max_length=40)


class RetraitIn(BaseModel):
    motif: str | None = Field(default=None, max_length=200)


def _ma_equipe(
    conn: Connection, moi: dict, id_equipe: int, chef_requis: bool = False, verrou: bool = False
) -> dict[str, Any]:
    """Équipe `id_equipe`, à condition que le candidat en soit membre actif."""
    if not eq.membre_de(conn, moi["id"], id_equipe):
        raise eq.erreur(status.HTTP_404_NOT_FOUND, "Tu ne fais pas partie de cette équipe.")
    e = eq.verrouiller_equipe(conn, id_equipe) if verrou else one(
        conn, "select * from public.equipe where id = %s", (id_equipe,)
    )
    assert e is not None
    if chef_requis and e["id_chef"] != moi["id"]:
        raise eq.erreur(status.HTTP_403_FORBIDDEN, "Seul le chef d'équipe peut faire cette action.")
    return e


def _exiger_modifiable(e: dict[str, Any]) -> None:
    eq.exiger_inscriptions_ouvertes()
    if eq.etat(e) not in eq.ETATS_MODIFIABLES:
        raise eq.erreur(
            status.HTTP_409_CONFLICT,
            "L'équipe a été soumise aux organisateurs : sa composition ne peut plus être modifiée.",
        )


def _concours_ou_404(conn: Connection, id_concours: int) -> dict[str, Any]:
    c = eq.concours(conn, id_concours)
    if c is None:
        raise eq.erreur(status.HTTP_404_NOT_FOUND, "Catégorie introuvable.")
    return c


@router.post("", status_code=201)
def creer(body: EquipeIn, moi: Candidat) -> dict[str, Any]:
    """Le créateur devient chef d'équipe."""
    eq.exiger_inscriptions_ouvertes()
    try:
        with transaction() as conn:
            eq.verrouiller_user(conn, moi["id"])
            c = _concours_ou_404(conn, body.id_concours)
            refus_cat = eq.incompatibilite(conn, moi["id"], c["cle"])
            if refus_cat:
                raise eq.erreur(status.HTTP_409_CONFLICT, refus_cat)
            regle = regle_pour(c["cle"])
            refus = verifier_ajout(regle, [], eq.profil(moi))
            if refus:
                raise eq.erreur(status.HTTP_409_CONFLICT, refus)
            e = one(
                conn,
                """insert into public.equipe (nom_equipe, id_concours, id_chef, nom_capitaine, statut, membres)
                   values (%s, %s, %s, %s, null, '[]'::jsonb) returning *""",
                (body.nom, c["id"], moi["id"], f"{moi['nom']} {moi['prenom']}".strip()),
            )
            assert e is not None
            eq.ajouter_membre(conn, e, moi, est_chef=True)
            eq.synchroniser(conn, e["id"])
            return eq.detail(conn, e["id"], moi["id"])
    except UniqueViolation:
        raise eq.erreur(status.HTTP_409_CONFLICT, "Ce nom d'équipe est déjà pris dans cette catégorie.") from None


@router.patch("/{id_equipe}")
def modifier(id_equipe: int, body: EquipeModif, moi: Candidat) -> dict[str, Any]:
    try:
        with transaction() as conn:
            e = _ma_equipe(conn, moi, id_equipe, chef_requis=True, verrou=True)
            _exiger_modifiable(e)
            if body.id_concours is not None and body.id_concours != e["id_concours"]:
                c = _concours_ou_404(conn, body.id_concours)
                regle = regle_pour(c["cle"])
                if not regle.document_requis and one(
                    conn, "select 1 from public.ressource where id_equipe = %s limit 1", (e["id"],)
                ):
                    raise eq.erreur(
                        status.HTTP_409_CONFLICT,
                        "Seule la catégorie Innovation fournit des documents : retire d'abord les documents de l'équipe.",
                    )
                membres: list = []
                for m in eq.membres_actifs(conn, e["id"]):
                    refus = verifier_ajout(regle, membres, eq.profil(m)) or eq.incompatibilite(
                        conn, m["id"], c["cle"], sauf_equipe=e["id"], sujet=m["prenom"] or "Un membre"
                    )
                    if refus:
                        raise eq.erreur(
                            status.HTTP_409_CONFLICT,
                            f"Impossible de passer en {c['categorie'] or c['titre']} avec les membres actuels : {refus}",
                        )
                    membres.append(eq.profil(m))
                conn.execute("update public.equipe set id_concours = %s where id = %s", (c["id"], e["id"]))
            if body.nom is not None:
                nom = " ".join(body.nom.split())
                conn.execute("update public.equipe set nom_equipe = %s where id = %s", (nom, e["id"]))
                conn.execute(
                    "update public.membre set nom_equipe = %s where id_equipe = %s and retire_le is null", (nom, e["id"])
                )
            return eq.detail(conn, e["id"], moi["id"])
    except UniqueViolation:
        raise eq.erreur(status.HTTP_409_CONFLICT, "Ce nom d'équipe est déjà pris dans cette catégorie.") from None


@router.post("/{id_equipe}/invitations", status_code=201)
def inviter(id_equipe: int, body: InvitationIn, moi: Candidat) -> dict[str, Any]:
    matricule = normaliser_matricule(body.matricule)
    if not matricule_valide(matricule):
        raise eq.erreur(status.HTTP_400_BAD_REQUEST, "Matricule invalide.")
    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe, chef_requis=True, verrou=True)
        _exiger_modifiable(e)
        cible = one(conn, 'select * from public."user" where upper(btrim(matricule)) = %s and participant', (matricule,))
        if cible is None:
            raise eq.erreur(
                status.HTTP_404_NOT_FOUND,
                "Aucun candidat inscrit avec ce matricule. L'étudiant doit d'abord créer son compte sur GÉNIE UPB.",
            )
        if cible["id"] == moi["id"]:
            raise eq.erreur(status.HTTP_400_BAD_REQUEST, "Tu fais déjà partie de l'équipe.")
        c = eq.concours(conn, e["id_concours"])
        if eq.membre_de(conn, cible["id"], e["id"]):
            raise eq.erreur(status.HTTP_409_CONFLICT, f"{cible['prenom']} fait déjà partie de l'équipe.")
        refus_cat = eq.incompatibilite(conn, cible["id"], c["cle"] if c else None, sujet=cible["prenom"] or "Cet étudiant")
        if refus_cat:
            raise eq.erreur(status.HTTP_409_CONFLICT, refus_cat)
        if one(
            conn,
            "select 1 from public.invitation where id_equipe = %s and id_invite = %s and statut = 'en_attente'",
            (e["id"], cible["id"]),
        ):
            raise eq.erreur(status.HTTP_409_CONFLICT, f"{cible['prenom']} a déjà une invitation en attente.")

        regle = regle_pour(c["cle"] if c else None)
        membres = eq.membres_actifs(conn, e["id"])
        en_attente = one(
            conn, "select count(*) as n from public.invitation where id_equipe = %s and statut = 'en_attente'", (e["id"],)
        )
        if len(membres) + (en_attente["n"] if en_attente else 0) >= regle.max_membres:
            raise eq.erreur(
                status.HTTP_409_CONFLICT,
                f"Toutes les places sont prises ou réservées ({regle.max_membres} maximum). "
                "Annule une invitation en attente pour en envoyer une autre.",
            )
        refus = verifier_ajout(regle, [eq.profil(m) for m in membres], eq.profil(cible))
        if refus:
            raise eq.erreur(status.HTTP_409_CONFLICT, refus)
        conn.execute(
            "insert into public.invitation (id_equipe, id_invite, id_expediteur) values (%s, %s, %s)",
            (e["id"], cible["id"], moi["id"]),
        )
        resultat = eq.detail(conn, e["id"], moi["id"])
        categorie = (c["categorie"] or c["titre"]) if c else ""
    email.invitation_recue(
        cible.get("email"), cible.get("prenom") or "", f"{moi['prenom']} {moi['nom']}".strip(), e["nom_equipe"], categorie
    )
    return resultat


@router.delete("/{id_equipe}/invitations/{id_invitation}")
def annuler_invitation(id_equipe: int, id_invitation: int, moi: Candidat) -> dict[str, Any]:
    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe, chef_requis=True, verrou=True)
        r = conn.execute(
            """update public.invitation set statut = 'annulee', repondu_le = now()
               where id = %s and id_equipe = %s and statut = 'en_attente'""",
            (id_invitation, e["id"]),
        )
        if r.rowcount == 0:
            raise eq.erreur(status.HTTP_404_NOT_FOUND, "Invitation introuvable ou déjà traitée.")
        return eq.detail(conn, e["id"], moi["id"])


@router.post("/{id_equipe}/membres/{id_user}/retirer")
def retirer(id_equipe: int, id_user: int, body: RetraitIn, moi: Candidat) -> dict[str, Any]:
    motif = (body.motif or "").strip() or None
    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe, chef_requis=True, verrou=True)
        _exiger_modifiable(e)
        if id_user == moi["id"]:
            raise eq.erreur(status.HTTP_400_BAD_REQUEST, "Le chef ne peut pas se retirer de sa propre équipe.")
        cible = one(
            conn,
            """select u.* from public.membre m join public."user" u on u.id = m.id_user
               where m.id_equipe = %s and m.id_user = %s and m.retire_le is null""",
            (e["id"], id_user),
        )
        if cible is None:
            raise eq.erreur(status.HTTP_404_NOT_FOUND, "Ce membre ne fait pas partie de l'équipe.")
        conn.execute(
            """update public.membre set retire_le = now(), motif_retrait = %s, retire_par = %s
               where id_equipe = %s and id_user = %s and retire_le is null""",
            (motif, moi["id"], e["id"], id_user),
        )
        eq.synchroniser(conn, e["id"])
        resultat = eq.detail(conn, e["id"], moi["id"])
    email.membre_retire(
        cible.get("email"), cible.get("prenom") or "", f"{moi['prenom']} {moi['nom']}".strip(), e["nom_equipe"], motif
    )
    return resultat


@router.post("/{id_equipe}/soumettre")
def soumettre(id_equipe: int, moi: Candidat) -> dict[str, Any]:
    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe, chef_requis=True, verrou=True)
        _exiger_modifiable(e)
        d = eq.detail(conn, e["id"], moi["id"])
        manquants = [c["libelle"] + " : " + c["detail"] for c in d["controles"] if not c["ok"]]
        if manquants:
            raise eq.erreur(status.HTTP_409_CONFLICT, "L'équipe ne respecte pas encore les règles — " + " ; ".join(manquants))
        conn.execute(
            """update public.equipe set soumise_le = now(), statut = null, motif_refus = null,
               validee_le = null, validee_par = null where id = %s""",
            (e["id"],),
        )
        return eq.detail(conn, e["id"], moi["id"])


# --- Ressources ---------------------------------------------------------------

@router.post("/{id_equipe}/ressources", status_code=201)
async def deposer_ressource(id_equipe: int, moi: Candidat, fichier: UploadFile = File(...)) -> dict[str, Any]:
    s = get_settings()
    if datetime.now(timezone.utc) > s.date_limite_ressources:
        raise eq.erreur(status.HTTP_409_CONFLICT, "La date limite de dépôt des documents est passée.")
    contenu, mime, ext = await lire_fichier(fichier, 10 * 1024 * 1024, TYPES_RESSOURCE)
    nom_original = (fichier.filename or f"document.{ext}").replace("/", "_").replace("\\", "_")[:150]

    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe)
        c = eq.concours(conn, e["id_concours"])
        if not regle_pour(c["cle"] if c else None).document_requis:
            raise eq.erreur(status.HTTP_409_CONFLICT, "Seules les équipes de la catégorie Innovation fournissent des documents.")
        nb = one(conn, "select count(*) as n from public.ressource where id_equipe = %s", (e["id"],))
        if nb and nb["n"] >= MAX_RESSOURCES:
            raise eq.erreur(status.HTTP_409_CONFLICT, f"{MAX_RESSOURCES} documents maximum par équipe.")
    chemin = f"equipe-{e['id']}/{uuid.uuid4().hex}.{ext}"
    stockage.televerser(s.bucket_ressources, chemin, contenu, mime)
    with transaction() as conn:
        conn.execute(
            """insert into public.ressource (id_equipe, file_name, chemin, type_mime, taille, date_limit, depose_par)
               values (%s, %s, %s, %s, %s, %s, %s)""",
            (e["id"], nom_original, chemin, mime, len(contenu), s.date_limite_ressources, moi["id"]),
        )
        return eq.detail(conn, e["id"], moi["id"])


@router.get("/{id_equipe}/ressources/{id_ressource}/lien")
def lien_ressource(id_equipe: int, id_ressource: int, moi: Candidat) -> dict[str, str]:
    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe)
        r = one(conn, "select * from public.ressource where id = %s and id_equipe = %s", (id_ressource, e["id"]))
    if r is None:
        raise eq.erreur(status.HTTP_404_NOT_FOUND, "Document introuvable.")
    return {"url": stockage.url_signee(get_settings().bucket_ressources, r["chemin"], 300, r["file_name"])}


@router.delete("/{id_equipe}/ressources/{id_ressource}")
def supprimer_ressource(id_equipe: int, id_ressource: int, moi: Candidat) -> dict[str, Any]:
    with transaction() as conn:
        e = _ma_equipe(conn, moi, id_equipe)
        if eq.etat(e) not in eq.ETATS_MODIFIABLES:
            raise eq.erreur(status.HTTP_409_CONFLICT, "Les documents d'une équipe soumise ne peuvent plus être supprimés.")
        r = one(conn, "select * from public.ressource where id = %s and id_equipe = %s", (id_ressource, e["id"]))
        if r is None:
            raise eq.erreur(status.HTTP_404_NOT_FOUND, "Document introuvable.")
        if r["depose_par"] != moi["id"] and e["id_chef"] != moi["id"]:
            raise eq.erreur(status.HTTP_403_FORBIDDEN, "Seuls le chef et l'auteur du dépôt peuvent le supprimer.")
        conn.execute("delete from public.ressource where id = %s", (id_ressource,))
        resultat = eq.detail(conn, e["id"], moi["id"])
    stockage.supprimer(get_settings().bucket_ressources, r["chemin"])
    return resultat

