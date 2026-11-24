"""Logique métier commune aux équipes (lecture, sérialisation, contrôles d'état)."""
import json
from datetime import datetime, timezone
from typing import Any

from fastapi import HTTPException, status
from psycopg import Connection

from ..config import get_settings
from ..db import all_rows, one
from . import stockage
from .normalisation import cle_categorie, initiales
from .regles import Profil, categories_possibles, combinaison_valide, controles, message_incompatibilite, regle_pour

ETATS_MODIFIABLES = {"brouillon", "refusee"}


def erreur(code: int, message: str) -> HTTPException:
    return HTTPException(code, message)


def inscriptions_ouvertes() -> bool:
    return datetime.now(timezone.utc) <= get_settings().inscriptions_cloture


def exiger_inscriptions_ouvertes() -> None:
    if not inscriptions_ouvertes():
        raise erreur(status.HTTP_409_CONFLICT, "Les inscriptions sont closes.")


def etat(equipe: dict[str, Any]) -> str:
    if equipe.get("statut") is True:
        return "validee"
    if equipe.get("statut") is False:
        return "refusee"
    return "soumise" if equipe.get("soumise_le") else "brouillon"


def profil(u: dict[str, Any]) -> Profil:
    return Profil(niveau=u.get("niveau"), genre=u.get("genre"), filiere=(u.get("filiere") or "").upper() or None)


def user_public(u: dict[str, Any]) -> dict[str, Any]:
    """Données d'un étudiant visibles par ses coéquipiers (pas d'e-mail ni de téléphone)."""
    return {
        "id": u["id"],
        "matricule": u.get("matricule"),
        "nom": u.get("nom"),
        "prenom": u.get("prenom"),
        "initiales": initiales(u.get("nom"), u.get("prenom")),
        "niveau": u.get("niveau"),
        "filiere": u.get("filiere"),
        "genre": u.get("genre"),
        "photo_url": u.get("photo_url"),
    }


def user_prive(u: dict[str, Any]) -> dict[str, Any]:
    """Profil complet, renvoyé uniquement à l'étudiant lui-même."""
    return {
        **user_public(u),
        "email": u.get("email"),
        "telephone": u.get("numero"),
        "date_naissance": u.get("date_naissance").isoformat() if u.get("date_naissance") else None,
        "hebergement": bool(u.get("hebergement")),
        "numero_candidat": u.get("numero_candidat"),
        "inscrit_le": u["date_inscription"].isoformat() if u.get("date_inscription") else None,
        "conditions_acceptees_le": u["conditions_acceptees_le"].isoformat() if u.get("conditions_acceptees_le") else None,
    }


def concours(conn: Connection, id_concours: int) -> dict[str, Any] | None:
    row = one(
        conn,
        """select c.id, c.titre, c.date_debut, c.date_fin, cat.titre as categorie
           from public.concours c left join public.categorie cat on cat.id = c.id_categorie
           where c.id = %s""",
        (id_concours,),
    )
    if row:
        row["cle"] = cle_categorie(row["categorie"] or row["titre"])
    return row


def concours_public(c: dict[str, Any] | None) -> dict[str, Any] | None:
    if not c:
        return None
    regle = regle_pour(c["cle"])
    return {
        "id": c["id"],
        "titre": c["titre"],
        "categorie": c["categorie"] or c["titre"],
        "cle": c["cle"],
        "taille": regle.taille,
        "min_membres": regle.min_membres,
        "max_membres": regle.max_membres,
        "regles": regle.resume,
    }


def appartenances(conn: Connection, id_user: int) -> list[dict[str, Any]]:
    """Équipes actives d'un candidat (0, 1, ou 2 si Technologie + Innovation), avec la clé de catégorie."""
    lignes = all_rows(
        conn,
        """select m.*, e.nom_equipe as equipe_nom, c.titre as concours_titre, cat.titre as categorie
           from public.membre m
           join public.equipe e on e.id = m.id_equipe
           left join public.concours c on c.id = e.id_concours
           left join public.categorie cat on cat.id = c.id_categorie
           where m.id_user = %s and m.retire_le is null
           order by m.rejoint_le""",
        (id_user,),
    )
    for l in lignes:
        l["cle"] = cle_categorie(l["categorie"] or l["concours_titre"])
    return lignes


def cles_actives(conn: Connection, id_user: int, sauf_equipe: int | None = None) -> list[str | None]:
    return [a["cle"] for a in appartenances(conn, id_user) if a["id_equipe"] != sauf_equipe]


def verrouiller_user(conn: Connection, id_user: int) -> None:
    """Sérialise les changements d'appartenance d'un même candidat (deux acceptations simultanées)."""
    conn.execute('select id from public."user" where id = %s for update', (id_user,))


def incompatibilite(
    conn: Connection, id_user: int, cle: str | None, sauf_equipe: int | None = None, sujet: str = "Tu"
) -> str | None:
    """Message d'erreur si le candidat ne peut pas rejoindre une équipe de la catégorie `cle`."""
    actuelles = cles_actives(conn, id_user, sauf_equipe)
    if combinaison_valide([*actuelles, cle]):
        return None
    return message_incompatibilite(actuelles, cle, sujet)


def possibles(conn: Connection, id_user: int) -> list[str]:
    """Catégories que le candidat peut encore rejoindre : combinaison d'équipes permise ET filière acceptée."""
    u = one(conn, 'select filiere from public."user" where id = %s', (id_user,))
    filiere = ((u or {}).get("filiere") or "").upper() or None
    return [c for c in categories_possibles(cles_actives(conn, id_user)) if regle_pour(c).accepte_filiere(filiere)]


def membre_de(conn: Connection, id_user: int, id_equipe: int) -> bool:
    return one(
        conn,
        "select 1 from public.membre where id_user = %s and id_equipe = %s and retire_le is null",
        (id_user, id_equipe),
    ) is not None


def membres_actifs(conn: Connection, id_equipe: int) -> list[dict[str, Any]]:
    return all_rows(
        conn,
        """select u.*, m.est_chef, m.rejoint_le, m.hebergement as membre_hebergement
           from public.membre m join public."user" u on u.id = m.id_user
           where m.id_equipe = %s and m.retire_le is null
           order by m.est_chef desc, m.rejoint_le""",
        (id_equipe,),
    )


def verrouiller_equipe(conn: Connection, id_equipe: int) -> dict[str, Any]:
    """Verrou de ligne : sérialise toutes les modifications de composition d'une équipe."""
    e = one(conn, "select * from public.equipe where id = %s for update", (id_equipe,))
    if e is None:
        raise erreur(status.HTTP_404_NOT_FOUND, "Équipe introuvable.")
    return e


def ajouter_membre(conn: Connection, e: dict[str, Any], u: dict[str, Any], est_chef: bool) -> None:
    conn.execute(
        """insert into public.membre (nom_prenom, email, nom_equipe, genre, niveau, filiere, id_equipe,
                                      id_user, hebergement, est_chef)
           values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
        (
            f"{u['nom'] or ''} {u['prenom'] or ''}".strip(), u.get("email"), e["nom_equipe"], u.get("genre"),
            u.get("niveau"), u.get("filiere"), e["id"], u["id"], bool(u.get("hebergement")), est_chef,
        ),
    )
    # Les invitations devenues incompatibles (ex. une 2e équipe hors Technologie + Innovation)
    # sont refusées automatiquement ; une invitation encore compatible reste en attente.
    actuelles = cles_actives(conn, u["id"])
    for inv in all_rows(
        conn,
        """select i.id, c.titre as concours, cat.titre as categorie
           from public.invitation i
           join public.equipe x on x.id = i.id_equipe
           left join public.concours c on c.id = x.id_concours
           left join public.categorie cat on cat.id = c.id_categorie
           where i.id_invite = %s and i.statut = 'en_attente'""",
        (u["id"],),
    ):
        if not combinaison_valide([*actuelles, cle_categorie(inv["categorie"] or inv["concours"])]):
            conn.execute(
                "update public.invitation set statut = 'refusee', repondu_le = now() where id = %s", (inv["id"],)
            )


def synchroniser(conn: Connection, id_equipe: int) -> None:
    """Met à jour les colonnes historiques d'equipe (membres jsonb, capitaine, hébergement)."""
    membres = membres_actifs(conn, id_equipe)
    chef = next((m for m in membres if m["est_chef"]), None)
    resume = [
        {
            "id_user": m["id"],
            "matricule": m["matricule"],
            "nom_prenom": f"{m['nom']} {m['prenom']}".strip(),
            "niveau": m["niveau"],
            "filiere": m["filiere"],
            "genre": m["genre"],
            "chef": m["est_chef"],
        }
        for m in membres
    ]
    conn.execute(
        """update public.equipe set membres = %s::jsonb, nom_capitaine = %s, hebergement = %s where id = %s""",
        (
            json.dumps(resume, ensure_ascii=False),
            f"{chef['nom']} {chef['prenom']}".strip() if chef else None,
            any(m["membre_hebergement"] for m in membres),
            id_equipe,
        ),
    )


def detail(conn: Connection, id_equipe: int, id_user_courant: int) -> dict[str, Any]:
    e = one(conn, "select * from public.equipe where id = %s", (id_equipe,))
    if e is None:
        raise erreur(status.HTTP_404_NOT_FOUND, "Équipe introuvable.")
    c = concours(conn, e["id_concours"]) if e["id_concours"] else None
    regle = regle_pour(c["cle"] if c else None)
    membres = membres_actifs(conn, id_equipe)
    est_chef = e["id_chef"] == id_user_courant

    invitations = []
    if est_chef:
        for r in all_rows(
            conn,
            """select i.id as inv_id, i.cree_le as inv_cree_le, u.* from public.invitation i
               join public."user" u on u.id = i.id_invite
               where i.id_equipe = %s and i.statut = 'en_attente' order by i.cree_le""",
            (id_equipe,),
        ):
            invitations.append({"id": r["inv_id"], "cree_le": r["inv_cree_le"].isoformat(), "invite": user_public(r)})

    ressources = [
        {
            "id": r["id"],
            "file_name": r["file_name"],
            "type_mime": r["type_mime"],
            "taille": r["taille"],
            "date": r["date"].isoformat(),
            "date_limit": r["date_limit"].isoformat() if r["date_limit"] else None,
            "depose_par": r["depose_par_nom"],
            "peut_supprimer": est_chef or r["depose_par"] == id_user_courant,
        }
        for r in all_rows(
            conn,
            """select r.*, trim(coalesce(u.prenom,'') || ' ' || coalesce(u.nom,'')) as depose_par_nom
               from public.ressource r left join public."user" u on u.id = r.depose_par
               where r.id_equipe = %s order by r.date desc""",
            (id_equipe,),
        )
    ]

    ctrl = controles(regle, [profil(m) for m in membres], len(ressources))
    etat_e = etat(e)
    return {
        "id": e["id"],
        "nom": e["nom_equipe"],
        "concours": concours_public(c),
        "etat": etat_e,
        "modifiable": etat_e in ETATS_MODIFIABLES and inscriptions_ouvertes(),
        "est_chef": est_chef,
        "cree_le": e["cree_le"].isoformat() if e.get("cree_le") else None,
        "soumise_le": e["soumise_le"].isoformat() if e.get("soumise_le") else None,
        "validee_le": e["validee_le"].isoformat() if e.get("validee_le") else None,
        "motif_refus": e.get("motif_refus"),
        "membres": [
            {**user_public(m), "est_chef": m["est_chef"], "rejoint_le": m["rejoint_le"].isoformat()} for m in membres
        ],
        "invitations_envoyees": invitations,
        "places_restantes": max(0, regle.max_membres - len(membres)),
        "documents": regle.document_requis,  # seule la catégorie Innovation fournit des documents
        "ressources": ressources,
        "date_limite_ressources": get_settings().date_limite_ressources.isoformat(),
        "controles": [x.as_dict() for x in ctrl],
        "peut_soumettre": est_chef and etat_e in ETATS_MODIFIABLES and all(x.ok for x in ctrl) and inscriptions_ouvertes(),
        # Suppression : seulement par le chef, avant soumission, et tant que l'équipe ne remplit PAS toutes les conditions
        "peut_supprimer": est_chef and etat_e in ETATS_MODIFIABLES and not all(x.ok for x in ctrl),
        "badge_url": badge_url(conn, id_user_courant, e["id"]) if etat_e == "validee" else None,
    }


def qr_participant(conn: Connection, id_user: int) -> dict[str, Any] | None:
    """Le QR code participant actif du candidat : un seul par personne, quelles que soient ses équipes."""
    return one(
        conn,
        """select id, jeton from public.qrcode
           where id_user = %s and type = 'participant' and actif
           order by cree_le desc limit 1""",
        (id_user,),
    )


def chemin_badge(id_user: int, jeton: Any, id_equipe: int) -> str:
    """Un badge (design de la catégorie) par équipe, tous portant le même QR code."""
    return f"{id_user}/{jeton}-{id_equipe}.png"


def badge_url(conn: Connection, id_user: int, id_equipe: int) -> str | None:
    qr = qr_participant(conn, id_user)
    if not qr:
        return None
    try:
        return stockage.url_signee(
            get_settings().bucket_qrcodes, chemin_badge(id_user, qr["jeton"], id_equipe), 600, "badge-genie-upb.png"
        )
    except stockage.StockageErreur:
        return None
