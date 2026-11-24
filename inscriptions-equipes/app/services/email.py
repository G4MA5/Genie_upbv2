"""Envoi d'e-mails transactionnels via l'API Brevo (POST /v3/smtp/email).

Un échec d'envoi est journalisé mais ne fait jamais échouer l'action de l'utilisateur.
"""
import base64
import logging
from html import escape

import httpx

from ..config import get_settings

log = logging.getLogger(__name__)

BREVO_URL = "https://api.brevo.com/v3/smtp/email"


def _gabarit(titre: str, corps_html: str, bouton: tuple[str, str] | None = None) -> str:
    cta = ""
    if bouton:
        libelle, lien = bouton
        cta = (
            f'<p style="margin:28px 0 8px"><a href="{escape(lien)}" '
            'style="background:#0A1430;color:#fff;text-decoration:none;font-weight:800;'
            f'padding:14px 22px;border-radius:14px;display:inline-block">{escape(libelle)} →</a></p>'
        )
    return f"""<!doctype html><html><body style="margin:0;background:#F6F8FC;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:24px;overflow:hidden">
<tr><td style="background:#2F6BF0;color:#fff;padding:26px 28px">
<div style="font-weight:900;letter-spacing:.08em;font-size:13px;color:#DCE7FF">GÉNIE UPB · 3ᵉ ÉDITION</div>
<div style="font-weight:900;font-size:24px;margin-top:8px">{escape(titre)}</div></td></tr>
<tr><td style="padding:26px 28px;color:#3D4459;font-size:15px;line-height:1.55">{corps_html}{cta}</td></tr>
<tr><td style="padding:16px 28px;background:#F1F4FA;color:#6A7189;font-size:12px">
Université Polytechnique de Bingerville · Message automatique, merci de ne pas y répondre.</td></tr>
</table></td></tr></table></body></html>"""


def envoyer(
    destinataire: str | None,
    nom: str,
    sujet: str,
    html: str,
    pieces_jointes: list[tuple[str, bytes]] | None = None,
) -> bool:
    s = get_settings()
    if not destinataire:
        log.info("E-mail « %s » non envoyé : pas d'adresse", sujet)
        return False
    if not s.email_enabled or not s.brevo_api_key or not s.brevo_sender_email:
        log.info("E-mail désactivé/non configuré — « %s » non envoyé à %s", sujet, destinataire)
        return False
    payload: dict = {
        "sender": {"name": s.brevo_sender_name, "email": s.brevo_sender_email},
        "to": [{"email": destinataire, "name": nom}],
        "subject": sujet,
        "htmlContent": html,
    }
    if pieces_jointes:
        payload["attachment"] = [
            {"name": n, "content": base64.b64encode(c).decode()} for n, c in pieces_jointes
        ]
    try:
        r = httpx.post(
            BREVO_URL,
            json=payload,
            headers={"api-key": s.brevo_api_key, "accept": "application/json"},
            timeout=20,
        )
    except httpx.HTTPError as exc:
        log.error("Brevo injoignable : %s", exc)
        return False
    if r.status_code >= 300:
        log.error("Brevo a refusé l'e-mail (%s) : %s", r.status_code, r.text[:300])
        return False
    return True


# --- Messages métier ---------------------------------------------------------

def code_connexion(dest_email: str, dest_prenom: str, code: str, minutes: int) -> bool:
    """Code à 5 chiffres pour confirmer l'adresse e-mail (inscription ou connexion). Renvoie True si accepté par Brevo."""
    corps = (
        f"<p>Bonjour {escape(dest_prenom)},</p>"
        "<p>Voici ton code pour accéder à ton espace GÉNIE UPB :</p>"
        '<p style="margin:22px 0;text-align:center"><span style="display:inline-block;background:#F1F4FA;'
        'border-radius:16px;padding:14px 26px;font-size:34px;font-weight:900;letter-spacing:12px;color:#0A1430">'
        f"{escape(code)}</span></p>"
        f"<p>Il est valable <b>{minutes} minutes</b> et ne sert qu'une fois.</p>"
        "<p>Si tu n'as rien demandé, ignore ce message : personne ne peut se connecter sans ce code.</p>"
    )
    return envoyer(dest_email, dest_prenom, f"{code} est ton code GÉNIE UPB", _gabarit("Ton code de connexion", corps))


def invitation_recue(dest_email: str | None, dest_prenom: str, chef: str, equipe: str, categorie: str) -> None:
    s = get_settings()
    corps = (
        f"<p>Bonjour {escape(dest_prenom)},</p>"
        f"<p><b>{escape(chef)}</b> t'invite à rejoindre l'équipe <b>{escape(equipe)}</b> "
        f"(catégorie {escape(categorie)}) pour GÉNIE UPB.</p>"
        "<p>Connecte-toi à ton espace avec ton matricule pour accepter ou refuser l'invitation. "
        "Accepter une invitation refuse automatiquement les autres.</p>"
    )
    envoyer(
        dest_email, dest_prenom, f"Invitation à rejoindre l'équipe {equipe}",
        _gabarit("Tu es invité·e dans une équipe", corps, ("Voir mes invitations", f"{s.frontend_url}/espace/equipe/invitations")),
    )


def membre_retire(dest_email: str | None, dest_prenom: str, chef: str, equipe: str, motif: str | None) -> None:
    s = get_settings()
    motif_html = f"<p>Motif indiqué : <b>{escape(motif)}</b></p>" if motif else ""
    corps = (
        f"<p>Bonjour {escape(dest_prenom)},</p>"
        f"<p>{escape(chef)}, chef de l'équipe <b>{escape(equipe)}</b>, t'a retiré·e de l'équipe.</p>"
        f"{motif_html}<p>Ton compte reste actif : tu peux rejoindre ou créer une autre équipe "
        "jusqu'à la clôture des inscriptions.</p>"
    )
    envoyer(
        dest_email, dest_prenom, f"Tu ne fais plus partie de l'équipe {equipe}",
        _gabarit("Changement dans ton équipe", corps, ("Ouvrir mon espace", f"{s.frontend_url}/espace/equipe")),
    )


def equipe_validee_badge(dest_email: str | None, dest_prenom: str, equipe: str, categorie: str, badge_png: bytes) -> bool:
    s = get_settings()
    corps = (
        f"<p>Bonjour {escape(dest_prenom)},</p>"
        f"<p>Bonne nouvelle : l'équipe <b>{escape(equipe)}</b> est <b>validée</b> pour la catégorie "
        f"{escape(categorie)} de GÉNIE UPB.</p>"
        "<p>Ton badge participant est joint à cet e-mail. Son QR code est <b>personnel et unique</b> : "
        "il te sera demandé à l'entrée, aux repas et aux formations. Ne le partage pas.</p>"
    )
    return envoyer(
        dest_email, dest_prenom, "Ton badge GÉNIE UPB — équipe validée",
        _gabarit("Équipe validée 🎉", corps, ("Ouvrir mon espace", f"{s.frontend_url}/espace/profil")),
        pieces_jointes=[("badge-genie-upb.png", badge_png)],
    )


def equipe_refusee(dest_email: str | None, dest_prenom: str, equipe: str, motif: str | None) -> None:
    s = get_settings()
    motif_html = f"<p>Motif : <b>{escape(motif)}</b></p>" if motif else ""
    corps = (
        f"<p>Bonjour {escape(dest_prenom)},</p>"
        f"<p>Le dossier de l'équipe <b>{escape(equipe)}</b> n'a pas été validé par les organisateurs.</p>"
        f"{motif_html}<p>Le chef d'équipe peut corriger la composition puis soumettre à nouveau.</p>"
    )
    envoyer(
        dest_email, dest_prenom, f"Dossier de l'équipe {equipe} non validé",
        _gabarit("Dossier à corriger", corps, ("Voir le statut", f"{s.frontend_url}/espace/statut")),
    )
