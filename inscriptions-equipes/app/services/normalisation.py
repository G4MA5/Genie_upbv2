"""Normalisation des données renvoyées par l'API UPB (niveau, genre, filière, matricule)."""
import re
import unicodedata

MATRICULE_RE = re.compile(r"^[A-Z0-9]{6,40}$")


def sans_accents(texte: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", texte) if unicodedata.category(c) != "Mn")


def normaliser_matricule(brut: str) -> str:
    return re.sub(r"\s+", "", brut or "").upper()


def matricule_valide(matricule: str) -> bool:
    return bool(MATRICULE_RE.match(matricule))


def normaliser_niveau(brut: str | None) -> str | None:
    """« Licence 3 », « L3 », « licence3 » -> « L3 » ; « Master 1 » -> « M1 »."""
    if not brut:
        return None
    t = sans_accents(brut).upper().replace(" ", "")
    m = re.match(r"^(LICENCE|L)(\d)$", t)
    if m:
        return f"L{m.group(2)}"
    m = re.match(r"^(MASTER|M)(\d)$", t)
    if m:
        return f"M{m.group(2)}"
    return brut.strip()


def normaliser_genre(brut: str | None) -> str | None:
    """Renvoie « F », « M » ou None."""
    if not brut:
        return None
    t = sans_accents(brut).strip().upper()
    if t.startswith("F"):
        return "F"
    if t.startswith("M") or t.startswith("H"):
        return "M"
    return None


def normaliser_filiere(brut: str | None) -> str | None:
    return brut.strip().upper() if brut else None


def initiales(nom: str | None, prenom: str | None) -> str:
    a = (prenom or "").strip()[:1]
    b = (nom or "").strip()[:1]
    return (a + b).upper() or "?"


def cle_categorie(titre: str | None) -> str | None:
    """« Économie » -> « economie » ; reconnaît les 4 catégories du concours."""
    if not titre:
        return None
    t = sans_accents(titre).lower()
    for cle in ("technologie", "innovation", "economie", "droit"):
        if cle in t:
            return cle
    return None
