"""Invitations reçues : liste, acceptation, refus."""
from typing import Any

from fastapi import APIRouter, status

from ..db import all_rows, one, transaction
from ..security import Candidat
from ..services import equipes as eq
from ..services.normalisation import initiales
from ..services.regles import regle_pour, verifier_ajout

router = APIRouter(prefix="/api/invitations", tags=["Invitations"])


@router.get("")
def mes_invitations(moi: Candidat) -> list[dict[str, Any]]:
    with transaction() as conn:
        lignes = all_rows(
            conn,
            """select i.id, i.cree_le, e.id as id_equipe, e.nom_equipe, c.titre as concours, cat.titre as categorie,
                      x.nom as chef_nom, x.prenom as chef_prenom, x.photo_url as chef_photo,
                      (select count(*) from public.membre m where m.id_equipe = e.id and m.retire_le is null) as nb_membres
               from public.invitation i
               join public.equipe e on e.id = i.id_equipe
               left join public.concours c on c.id = e.id_concours
               left join public.categorie cat on cat.id = c.id_categorie
               join public."user" x on x.id = i.id_expediteur
               where i.id_invite = %s and i.statut = 'en_attente'
               order by i.cree_le desc""",
            (moi["id"],),
        )
    with transaction() as conn:
        possibles = eq.possibles(conn, moi["id"])
    resultat = []
    for l in lignes:
        cle = eq.cle_categorie(l["categorie"] or l["concours"])
        regle = regle_pour(cle)
        resultat.append(
            {
                "id": l["id"],
                "cree_le": l["cree_le"].isoformat(),
                "equipe": {
                    "id": l["id_equipe"],
                    "nom": l["nom_equipe"],
                    "categorie": l["categorie"] or l["concours"],
                    "cle": cle,
                    "nb_membres": l["nb_membres"],
                    "taille": regle.taille,
                },
                "compatible": cle in possibles,
                "chef": {
                    "nom": l["chef_nom"],
                    "prenom": l["chef_prenom"],
                    "initiales": initiales(l["chef_nom"], l["chef_prenom"]),
                    "photo_url": l["chef_photo"],
                },
            }
        )
    return resultat


def _invitation(conn, id_invitation: int, id_user: int) -> dict[str, Any]:
    inv = one(
        conn,
        "select * from public.invitation where id = %s and id_invite = %s and statut = 'en_attente'",
        (id_invitation, id_user),
    )
    if inv is None:
        raise eq.erreur(status.HTTP_404_NOT_FOUND, "Invitation introuvable, expirée ou déjà traitée.")
    return inv


@router.post("/{id_invitation}/accepter")
def accepter(id_invitation: int, moi: Candidat) -> dict[str, Any]:
    eq.exiger_inscriptions_ouvertes()
    with transaction() as conn:
        eq.verrouiller_user(conn, moi["id"])
        inv = _invitation(conn, id_invitation, moi["id"])
        e = eq.verrouiller_equipe(conn, inv["id_equipe"])
        if eq.etat(e) not in eq.ETATS_MODIFIABLES:
            raise eq.erreur(status.HTTP_409_CONFLICT, "Cette équipe a déjà été soumise : elle n'accepte plus de membres.")
        c = eq.concours(conn, e["id_concours"])
        refus_cat = eq.incompatibilite(conn, moi["id"], c["cle"] if c else None)
        if refus_cat:
            raise eq.erreur(status.HTTP_409_CONFLICT, refus_cat)
        regle = regle_pour(c["cle"] if c else None)
        refus = verifier_ajout(regle, [eq.profil(m) for m in eq.membres_actifs(conn, e["id"])], eq.profil(moi))
        if refus:
            raise eq.erreur(status.HTTP_409_CONFLICT, f"Impossible de rejoindre {e['nom_equipe']} : {refus}")
        conn.execute(
            "update public.invitation set statut = 'acceptee', repondu_le = now() where id = %s", (id_invitation,)
        )
        # ajouter_membre refuse aussi automatiquement les invitations devenues incompatibles
        eq.ajouter_membre(conn, e, moi, est_chef=False)
        eq.synchroniser(conn, e["id"])
        return eq.detail(conn, e["id"], moi["id"])


@router.post("/{id_invitation}/refuser")
def refuser(id_invitation: int, moi: Candidat) -> dict[str, str]:
    with transaction() as conn:
        _invitation(conn, id_invitation, moi["id"])
        conn.execute(
            "update public.invitation set statut = 'refusee', repondu_le = now() where id = %s", (id_invitation,)
        )
    return {"statut": "refusee"}
