"""Organisateurs : validation / refus des équipes et envoi des badges QR.

Protégé par l'en-tête X-Admin-Key (variable ADMIN_API_KEY). Chaque candidat a UN seul
QR code (table qrcode, type 'participant'), créé à la validation de sa première équipe.
Il reçoit un badge par équipe validée : le design de la catégorie avec son nom, et
toujours le même QR code. Un candidat Technologie + Innovation a donc 2 badges, 1 QR.
"""
import logging
from typing import Any

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field

from ..config import get_settings
from ..db import all_rows, transaction
from ..security import admin_requis
from ..services import email, stockage
from ..services import equipes as eq
from ..services.badge import generer_badge

log = logging.getLogger(__name__)
router = APIRouter(prefix="/api/admin", tags=["Administration"], dependencies=[Depends(admin_requis)])


class RefusIn(BaseModel):
    motif: str = Field(min_length=3, max_length=500)


@router.get("/equipes")
def lister(etat: str | None = None) -> list[dict[str, Any]]:
    with transaction() as conn:
        ids = [r["id"] for r in all_rows(conn, "select id from public.equipe where id_chef is not null order by id")]
        equipes = [eq.detail(conn, i, -1) for i in ids]
    return [e for e in equipes if etat is None or e["etat"] == etat]


def _emettre_badges(id_equipe: int, membres_jetons: list[dict[str, Any]], equipe: str, categorie: str, cle: str) -> dict[str, int]:
    """Génère, stocke et envoie les badges (hors transaction : appels réseau)."""
    s = get_settings()
    envoyes = 0
    for m in membres_jetons:
        try:
            png = generer_badge(cle, str(m["jeton"]), m["nom"] or "", m["prenom"] or "", m["niveau"], m["filiere"], m["genre"])
            stockage.televerser(s.bucket_qrcodes, eq.chemin_badge(m["id"], m["jeton"], id_equipe), png, "image/png")
        except Exception:
            log.exception("Badge non généré pour l'utilisateur %s (équipe %s)", m["id"], id_equipe)
            continue
        if email.equipe_validee_badge(m["email"], m["prenom"] or "", equipe, categorie, png):
            envoyes += 1
            with transaction() as conn:
                conn.execute(
                    "update public.membre set ticket_envoyer = true where id_equipe = %s and id_user = %s and retire_le is null",
                    (id_equipe, m["id"]),
                )
    return {"badges": len(membres_jetons), "emails_envoyes": envoyes}


def _jetons_actifs(conn, id_equipe: int) -> list[dict[str, Any]]:
    return all_rows(
        conn,
        """select u.id, u.nom, u.prenom, u.niveau, u.filiere, u.genre, u.email, q.jeton
           from public.membre m join public."user" u on u.id = m.id_user
           join lateral (select jeton from public.qrcode q
                         where q.id_user = u.id and q.type = 'participant' and q.actif
                         order by q.cree_le desc limit 1) q on true
           where m.id_equipe = %s and m.retire_le is null""",
        (id_equipe,),
    )


@router.post("/equipes/{id_equipe}/valider")
def valider(id_equipe: int) -> dict[str, Any]:
    with transaction() as conn:
        e = eq.verrouiller_equipe(conn, id_equipe)
        if eq.etat(e) != "soumise":
            raise eq.erreur(status.HTTP_409_CONFLICT, f"Seule une équipe soumise peut être validée (état : {eq.etat(e)}).")
        c = eq.concours(conn, e["id_concours"])
        conn.execute("update public.equipe set statut = true, validee_le = now() where id = %s", (id_equipe,))
        for m in eq.membres_actifs(conn, id_equipe):
            # Un seul QR participant par personne : s'il existe déjà (autre équipe validée),
            # il est réutilisé ; seul le badge (design de la catégorie) change.
            eq.verrouiller_user(conn, m["id"])
            if not eq.qr_participant(conn, m["id"]):
                conn.execute("insert into public.qrcode (id_user, type) values (%s, 'participant')", (m["id"],))
        jetons = _jetons_actifs(conn, id_equipe)
    categorie = (c["categorie"] or c["titre"]) if c else ""
    bilan = _emettre_badges(id_equipe, jetons, e["nom_equipe"], categorie, (c["cle"] if c else None) or "innovation")
    return {"etat": "validee", **bilan}


@router.post("/equipes/{id_equipe}/badges/renvoyer")
def renvoyer_badges(id_equipe: int) -> dict[str, Any]:
    with transaction() as conn:
        e = eq.verrouiller_equipe(conn, id_equipe)
        if eq.etat(e) != "validee":
            raise eq.erreur(status.HTTP_409_CONFLICT, "L'équipe n'est pas validée.")
        c = eq.concours(conn, e["id_concours"])
        jetons = _jetons_actifs(conn, id_equipe)
    categorie = (c["categorie"] or c["titre"]) if c else ""
    return _emettre_badges(id_equipe, jetons, e["nom_equipe"], categorie, (c["cle"] if c else None) or "innovation")


@router.post("/equipes/{id_equipe}/refuser")
def refuser(id_equipe: int, body: RefusIn) -> dict[str, Any]:
    with transaction() as conn:
        e = eq.verrouiller_equipe(conn, id_equipe)
        if eq.etat(e) not in {"soumise", "validee"}:
            raise eq.erreur(status.HTTP_409_CONFLICT, f"Cette équipe n'est pas en attente de décision (état : {eq.etat(e)}).")
        conn.execute(
            "update public.equipe set statut = false, motif_refus = %s, validee_le = null where id = %s",
            (body.motif.strip(), id_equipe),
        )
        # Si l'équipe avait été validée, le QR de ses membres cesse de fonctionner,
        # sauf pour ceux qui ont encore une autre équipe validée (même QR, autre badge).
        conn.execute(
            """update public.qrcode q set actif = false, desactive_le = now(), motif_desactivation = 'Équipe refusée'
               where q.type = 'participant' and q.actif
                 and q.id_user in (select id_user from public.membre where id_equipe = %s and retire_le is null)
                 and not exists (
                   select 1 from public.membre m2 join public.equipe e2 on e2.id = m2.id_equipe
                   where m2.id_user = q.id_user and m2.retire_le is null and m2.id_equipe <> %s and e2.statut is true)""",
            (id_equipe, id_equipe),
        )
        membres = eq.membres_actifs(conn, id_equipe)
    for m in membres:
        email.equipe_refusee(m.get("email"), m.get("prenom") or "", e["nom_equipe"], body.motif.strip())
    return {"etat": "refusee"}
