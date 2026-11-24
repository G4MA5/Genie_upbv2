"""Client de l'API « base étudiants UPB » (POST /api/partenaire/verifier).

Attention : la clé fournie a la permission « Vérification et inscription » ; chaque
appel réussi marque donc l'étudiant inscrit au concours côté UPB (idempotent).
On met le résultat en cache quelques minutes pour éviter les appels répétés
entre l'aperçu (« Te voilà ! ») et la création du compte.
"""
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


def _simule(matricule: str) -> EtudiantUPB | None:
    """Mode simulé (UPB_API_MODE=mock) : réservé aux tests locaux. Le générateur d'étudiants fictifs
    est dans tests/upb_simule.py, qui n'est pas versionné : hors de l'environnement local, ce mode
    est donc impossible."""
    try:
        from tests.upb_simule import etudiant_fictif  # type: ignore[import-not-found]
    except ImportError:
        log.error("UPB_API_MODE=mock alors que le mode simulé n'existe qu'en local : utiliser UPB_API_MODE=live")
        raise UpbIndisponible("mode simulé indisponible") from None
    return etudiant_fictif(matricule)


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
    etudiant = _simule(matricule) if get_settings().upb_api_mode == "mock" else _appel(matricule)
    with _lock:
        _cache[matricule] = (maintenant, etudiant)
        if len(_cache) > 5000:  # borne mémoire
            for cle in sorted(_cache, key=lambda k: _cache[k][0])[:1000]:
                _cache.pop(cle, None)
    return etudiant
