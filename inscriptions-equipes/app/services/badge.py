"""Génération du badge participant (PNG) : modèle de la catégorie + QR code + identité.

Les modèles (app/assets/badges/<categorie>.jpg) sont les visuels fournis. On recouvre
le panneau coloré du bas avec sa propre couleur, puis on y dessine le QR code (blanc)
et le nom, les prénoms, le niveau et la filière du participant.

Police : la maquette utilise Montserrat. Déposez Montserrat-Bold.ttf et
Montserrat-Regular.ttf dans app/assets/fonts/ (ou définissez BADGE_FONT_BOLD /
BADGE_FONT_REGULAR) ; à défaut une police système est utilisée.
"""
import io
from functools import lru_cache
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont
from qrcode.constants import ERROR_CORRECT_M

from ..config import get_settings

ASSETS = Path(__file__).resolve().parent.parent / "assets"

# Zone du panneau inférieur dans les modèles 1178 x 2000
QR_BOX = (88, 1430, 497)  # x, y, côté
ZONE_EFFACEE = (40, 1410, 1080, 1990)  # sous la courbe blanche, à gauche du bord arrondi
TEXTE_X = 665
TEXTE_MAX_L = ZONE_EFFACEE[2] - TEXTE_X

POLICES_SECOURS = {
    "bold": ["DejaVuSans-Bold.ttf", "C:/Windows/Fonts/arialbd.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"],
    "regular": ["DejaVuSans.ttf", "C:/Windows/Fonts/arial.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"],
}


@lru_cache
def _chemin_police(graisse: str) -> str | None:
    s = get_settings()
    config = s.badge_font_bold if graisse == "bold" else s.badge_font_regular
    candidats = [config] if config else []
    # Polices embarquées (indispensables en production : les serveurs Linux n'ont ni Arial ni toujours DejaVu)
    noms = ["Montserrat-Bold.ttf"] if graisse == "bold" else ["Montserrat-Regular.ttf", "Montserrat-Light.ttf"]
    candidats += [str(ASSETS / "fonts" / n) for n in noms]
    candidats += POLICES_SECOURS[graisse]
    for c in candidats:
        try:
            ImageFont.truetype(c, 10)
            return c
        except OSError:
            continue
    return None


def _police(graisse: str, taille: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    chemin = _chemin_police(graisse)
    return ImageFont.truetype(chemin, taille) if chemin else ImageFont.load_default(taille)


def _ajuster(draw: ImageDraw.ImageDraw, texte: str, graisse: str, taille: int, largeur: int):
    """Réduit la taille de police jusqu'à ce que le texte tienne dans la largeur."""
    while taille > 28:
        police = _police(graisse, taille)
        if draw.textlength(texte, font=police) <= largeur:
            return police
        taille -= 4
    return _police(graisse, taille)


def _lignes_prenoms(prenoms: str) -> list[str]:
    mots = [m.capitalize() if m.isupper() else m for m in prenoms.split()]
    if len(mots) <= 2:
        return mots
    return [mots[0], " ".join(mots[1:])]


def generer_badge(
    categorie_cle: str, jeton: str, nom: str, prenoms: str, niveau: str | None, filiere: str | None, genre: str | None = None
) -> bytes:
    modele = ASSETS / "badges" / f"{categorie_cle}.jpg"
    if not modele.exists():
        modele = ASSETS / "badges" / "innovation.jpg"
    img = Image.open(modele).convert("RGB")
    couleur = img.getpixel((620, 1960))
    draw = ImageDraw.Draw(img)

    # 1. Effacer le contenu d'exemple du panneau inférieur
    draw.rectangle(list(ZONE_EFFACEE), fill=couleur)

    # 2. QR code blanc sur la couleur de la catégorie
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_M, border=0, box_size=10)
    qr.add_data(jeton)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="white", back_color=couleur).convert("RGB")
    x, y, cote = QR_BOX
    img.paste(qr_img.resize((cote, cote), Image.Resampling.NEAREST), (x, y))

    # 3. Identité
    blanc = (255, 255, 255)
    y_txt = 1418
    police_nom = _ajuster(draw, nom.upper(), "bold", 84, TEXTE_MAX_L)
    draw.text((TEXTE_X, y_txt), nom.upper(), font=police_nom, fill=blanc)
    y_txt += 120
    for ligne in _lignes_prenoms(prenoms):
        police = _ajuster(draw, ligne, "regular", 84, TEXTE_MAX_L)
        draw.text((TEXTE_X, y_txt), ligne, font=police, fill=blanc)
        y_txt += 112

    cursus = " ".join(p for p in (niveau, filiere) if p)
    if cursus:
        police_cursus = _ajuster(draw, cursus, "regular", 46, TEXTE_MAX_L)
        draw.text((TEXTE_X, 1782), "Etudiante en" if genre == "F" else "Etudiant en", font=_police("regular", 46), fill=blanc)
        draw.text((TEXTE_X, 1840), cursus, font=police_cursus, fill=blanc)

    sortie = io.BytesIO()
    img.save(sortie, format="PNG", optimize=True)
    return sortie.getvalue()
