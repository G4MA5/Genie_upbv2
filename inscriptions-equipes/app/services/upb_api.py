"""Client de l'API « base étudiants UPB » (POST /api/partenaire/verifier).

Attention : la clé fournie a la permission « Vérification et inscription » ; chaque
appel réussi marque donc l'étudiant inscrit au concours côté UPB (idempotent).
On met le résultat en cache quelques minutes pour éviter les appels répétés
entre l'aperçu (« Te voilà ! ») et la création du compte.
"""
import hashlib
import logging
import threading
import time
from dataclasses import dataclass
from datetime import date

import httpx

from ..config import get_settings
from .normalisation import normaliser_filiere, normaliser_genre, normaliser_niveau

log = logging.getLogger(__name__)

CACHE_TTL = 600  # secondes


@dataclass
class EtudiantUPB:
    matricule: str
    nom: str
    prenoms: str
    date_naissance: date | None
    filiere: str | None
    niveau: str | None
    genre: str | None
    email: str | None
    telephone: str | None
    numero_candidat: str | None


class UpbIndisponible(Exception):
    """Erreur réseau, 5xx, 429 ou clé refusée : on ne peut rien conclure."""


_cache: dict[str, tuple[float, EtudiantUPB | None]] = {}
_lock = threading.Lock()


def _depuis_reponse(matricule: str, payload: dict) -> EtudiantUPB:
    data = payload.get("data") or {}
    insc = payload.get("inscription") or {}
    dn = data.get("date_naissance")
    try:
        naissance = date.fromisoformat(dn) if dn else None
    except ValueError:
        naissance = None
    return EtudiantUPB(
        matricule=(data.get("matricule") or matricule).upper(),
        nom=(data.get("nom") or "").strip(),
        prenoms=(data.get("prenoms") or "").strip(),
        date_naissance=naissance,
        filiere=normaliser_filiere(data.get("filiere")),
        niveau=normaliser_niveau(data.get("niveau")),
        genre=normaliser_genre(data.get("sexe")),
        email=(data.get("email") or "").strip() or None,
        telephone=(data.get("telephone") or "").strip() or None,
        numero_candidat=insc.get("numero_candidat"),
    )


def _mock(matricule: str) -> EtudiantUPB | None:
    """Étudiants fictifs déterministes, pour les tests automatisés uniquement."""
    if matricule.startswith("INCONNU"):
        return None
    h = int(hashlib.sha256(matricule.encode()).hexdigest(), 16)
    noms = ["KONAN", "TRAORE", "KOUAME", "BAMBA", "DIALLO", "YAO", "COULIBALY", "TOURE"]
    prenoms = ["AWA", "MOUSSA", "FATOU", "ISSA", "AMINATA", "CEDRIC", "MARIAM", "JEAN"]
    # Les 2 derniers caractères peuvent forcer niveau / genre : ...L1F, ...L3M
    niveau = f"L{matricule[-2]}" if matricule[-3] == "L" and matricule[-2] in "123" else f"L{h % 3 + 1}"
    genre = matricule[-1] if matricule[-3] == "L" and matricule[-1] in "FM" else ("F" if h % 2 else "M")
    filiere = "SEA" if "ECO" in matricule else ["MIAGE", "SEA", "SEG", "3EA", "SJAP"][h % 5]
    for f in ("ASSRI", "MIAGE", "3EA", "RIT", "SJAP", "SEG"):
        if f in matricule:
            filiere = f
            break
    return EtudiantUPB(
        matricule=matricule,
        nom=noms[h % len(noms)],
        prenoms=prenoms[(h >> 4) % len(prenoms)],
        date_naissance=date(2003, 1 + h % 12, 1 + h % 28),
        filiere=filiere,
        niveau=niveau,
        genre=genre,
        email="partage@exemple.test" if "MEMEMAIL" in matricule else f"{matricule.lower()}@exemple.test",
        telephone=None,
        numero_candidat=f"GENIE-TEST-{matricule[-5:]}",
    )


def _appel(matricule: str) -> EtudiantUPB | None:
    s = get_settings()
    if not s.upb_api_key:
        raise UpbIndisponible("UPB_API_KEY n'est pas configurée")
    url = f"{s.upb_api_url.rstrip('/')}/api/partenaire/verifier"
    headers = {"X-API-Key": s.upb_api_key, "Content-Type": "application/json"}
    derniere_erreur = "inconnue"
    for essai in range(3):
        try:
            r = httpx.post(url, json={"matricule": matricule}, headers=headers, timeout=10)
        except httpx.HTTPError as exc:
            derniere_erreur = f"réseau : {exc.__class__.__name__}"
        else:
            if r.status_code == 200:
                return _depuis_reponse(matricule, r.json())
            if r.status_code in (400, 404):
                return None
            if r.status_code in (401, 403):
                log.error("API UPB : accès refusé (%s) — vérifier la clé", r.status_code)
                raise UpbIndisponible("accès refusé par l'API UPB")
            derniere_erreur = f"HTTP {r.status_code}"
        time.sleep(2**essai)  # 1 s, 2 s, 4 s
    log.warning("API UPB indisponible : %s", derniere_erreur)
    raise UpbIndisponible(derniere_erreur)


def verifier_matricule(matricule: str) -> EtudiantUPB | None:
    """Renvoie l'étudiant, None s'il n'existe pas, ou lève UpbIndisponible."""
    maintenant = time.monotonic()
    with _lock:
        cache = _cache.get(matricule)
        if cache and maintenant - cache[0] < CACHE_TTL:
            return cache[1]
    etudiant = _mock(matricule) if get_settings().upb_api_mode == "mock" else _appel(matricule)
    with _lock:
        _cache[matricule] = (maintenant, etudiant)
        if len(_cache) > 5000:  # borne mémoire
            for cle in sorted(_cache, key=lambda k: _cache[k][0])[:1000]:
                _cache.pop(cle, None)
    return etudiant
