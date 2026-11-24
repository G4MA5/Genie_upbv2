"""Espace candidat : vue d'ensemble, profil (hébergement, photo), référentiel public."""
import uuid
from typing import Any

from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel

from ..config import get_settings
from ..db import all_rows, one, transaction
from ..security import Candidat
from ..services import equipes as eq
from ..services import stockage
from ..services.fichiers import lire_fichier
from ..services.normalisation import initiales, matricule_valide, normaliser_matricule
from ..services.regles import NOMS_CATEGORIES

router = APIRouter(prefix="/api", tags=["Espace candidat"])

TYPES_PHOTO = {"image/png", "image/jpeg", "image/webp"}


@router.get("/referentiel")
def referentiel() -> dict[str, Any]:
    """Concours ouverts (une ligne par catégorie), règles et calendrier. Public."""
    s = get_settings()
    with transaction() as conn:
        lignes = all_rows(
            conn,
            """select c.id, c.titre, c.date_debut, c.date_fin, cat.titre as categorie,
                      (select count(*) from public.equipe e where e.id_concours = c.id and e.id_chef is not null)
                        as nb_equipes
               from public.concours c left join public.categorie cat on cat.id = c.id_categorie
               where c.date_fin is null or c.date_fin >= current_date
               order by c.id""",
        )
    concours = []
    for l in lignes:
        l["cle"] = eq.cle_categorie(l["categorie"] or l["titre"])
        concours.append({**eq.concours_public(l), "nb_equipes": l["nb_equipes"]})
    debuts = [l["date_debut"] for l in lignes if l["date_debut"]]
    fins = [l["date_fin"] for l in lignes if l["date_fin"]]
    return {
        "concours": concours,
        "inscriptions_cloture": s.inscriptions_cloture.isoformat(),
        "inscriptions_ouvertes": eq.inscriptions_ouvertes(),
        "evenement": {
            "date_debut": min(debuts).isoformat() if debuts else None,
            "date_fin": max(fins).isoformat() if fins else None,
        },
    }


@router.get("/espace")
def espace(moi: Candidat) -> dict[str, Any]:
    """Tout ce qu'il faut pour afficher l'espace : profil, équipe, invitations, retrait éventuel."""
    with transaction() as conn:
        actives = eq.appartenances(conn, moi["id"])
        equipes = [eq.detail(conn, a["id_equipe"], moi["id"]) for a in actives]
        nb_inv = one(
            conn,
            "select count(*) as n from public.invitation where id_invite = %s and statut = 'en_attente'",
            (moi["id"],),
        )
        retrait = None
        if not actives:
            dernier = one(
                conn,
                """select m.retire_le, m.motif_retrait, e.nom_equipe, cat.titre as categorie,
                          c.titre as concours, chef.nom as chef_nom, chef.prenom as chef_prenom
                   from public.membre m
                   join public.equipe e on e.id = m.id_equipe
                   left join public.concours c on c.id = e.id_concours
                   left join public.categorie cat on cat.id = c.id_categorie
                   left join public."user" chef on chef.id = m.retire_par
                   where m.id_user = %s order by m.rejoint_le desc limit 1""",
                (moi["id"],),
            )
            if dernier and dernier["retire_le"]:
                retrait = {
                    "equipe": dernier["nom_equipe"],
                    "categorie": dernier["categorie"] or dernier["concours"],
                    "par": f"{dernier['chef_prenom'] or ''} {dernier['chef_nom'] or ''}".strip() or None,
                    "motif": dernier["motif_retrait"],
                    "le": dernier["retire_le"].isoformat(),
                }
        possibles = eq.possibles(conn, moi["id"])
    return {
        "candidat": eq.user_prive(moi),
        "equipes": equipes,
        "categories_possibles": possibles,
        "invitations_en_attente": nb_inv["n"] if nb_inv else 0,
        "retrait": retrait,
        "inscriptions_ouvertes": eq.inscriptions_ouvertes(),
        "inscriptions_cloture": get_settings().inscriptions_cloture.isoformat(),
    }


class ProfilIn(BaseModel):
    hebergement: bool


@router.patch("/moi")
def modifier_profil(body: ProfilIn, moi: Candidat) -> dict[str, Any]:
    with transaction() as conn:
        conn.execute('update public."user" set hebergement = %s where id = %s', (body.hebergement, moi["id"]))
        for a in eq.appartenances(conn, moi["id"]):
            conn.execute("update public.membre set hebergement = %s where id = %s", (body.hebergement, a["id"]))
            eq.synchroniser(conn, a["id_equipe"])
    return {"hebergement": body.hebergement}


@router.post("/moi/photo")
async def changer_photo(moi: Candidat, fichier: UploadFile = File(...)) -> dict[str, Any]:
    s = get_settings()
    contenu, mime, ext = await lire_fichier(fichier, 3 * 1024 * 1024, TYPES_PHOTO)
    chemin = f"{moi['id']}/{uuid.uuid4().hex}.{ext}"
    stockage.televerser(s.bucket_photos, chemin, contenu, mime)
    url = stockage.url_publique(s.bucket_photos, chemin)
    with transaction() as conn:
        ancien = one(conn, 'select photo_url from public."user" where id = %s', (moi["id"],))
        conn.execute('update public."user" set photo_url = %s where id = %s', (url, moi["id"]))
    _supprimer_ancienne_photo(ancien["photo_url"] if ancien else None)
    return {"photo_url": url}


@router.delete("/moi/photo")
def supprimer_photo(moi: Candidat) -> dict[str, Any]:
    with transaction() as conn:
        conn.execute('update public."user" set photo_url = null where id = %s', (moi["id"],))
    _supprimer_ancienne_photo(moi.get("photo_url"))
    return {"photo_url": None}


def _supprimer_ancienne_photo(url: str | None) -> None:
    s = get_settings()
    marqueur = f"/{s.bucket_photos}/"
    if url and marqueur in url:
        stockage.supprimer(s.bucket_photos, url.split(marqueur, 1)[1].split("?")[0].replace("%2F", "/"))


@router.get("/etudiants/{matricule}")
def chercher_etudiant(matricule: str, moi: Candidat, equipe: int | None = None) -> dict[str, Any]:
    """Recherche d'un étudiant inscrit sur la plateforme, pour l'inviter (par matricule uniquement)."""
    m = eq_matricule(matricule)
    with transaction() as conn:
        u = one(conn, 'select * from public."user" where upper(btrim(matricule)) = %s and participant', (m,))
        if u is None:
            raise eq.erreur(
                404,
                "Aucun candidat inscrit avec ce matricule. L'étudiant doit d'abord créer son compte sur GÉNIE UPB.",
            )
        raison = None
        if u["id"] == moi["id"]:
            raison = "C'est toi !"
        elif equipe is not None and eq.membre_de(conn, u["id"], equipe):
            raison = "Fait déjà partie de l'équipe."
        else:
            cle = None
            if equipe is not None:
                e = one(conn, "select id_concours from public.equipe where id = %s", (equipe,))
                c = eq.concours(conn, e["id_concours"]) if e and e["id_concours"] else None
                cle = c["cle"] if c else None
            if eq.incompatibilite(conn, u["id"], cle):
                actuelles = eq.cles_actives(conn, u["id"])
                raison = (
                    "Fait déjà partie d'une équipe"
                    + (f" ({', '.join(NOMS_CATEGORIES.get(x or '', '?') for x in actuelles)})" if actuelles else "")
                    + " : seule la combinaison Technologie + Innovation est permise."
                )
    return {**eq.user_public(u), "initiales": initiales(u["nom"], u["prenom"]), "disponible": raison is None, "raison": raison}


def eq_matricule(brut: str) -> str:
    m = normaliser_matricule(brut)
    if not matricule_valide(m):
        raise eq.erreur(400, "Matricule invalide.")
    return m
