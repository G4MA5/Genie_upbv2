"""Stockage des fichiers : buckets Supabase Storage (production) ou disque local (dev)."""
import logging
from pathlib import Path
from urllib.parse import quote

import httpx

from ..config import get_settings

log = logging.getLogger(__name__)


class StockageErreur(Exception):
    pass


def _entetes() -> dict[str, str]:
    """Accepte la nouvelle clé secrète (sb_secret_…) comme l'ancienne clé service_role (JWT eyJ…)."""
    cle = get_settings().supabase_service_role_key
    entetes = {"apikey": cle}
    if cle.startswith("eyJ"):  # ancienne clé JWT : aussi attendue en Bearer
        entetes["Authorization"] = f"Bearer {cle}"
    return entetes


def _base() -> str:
    return get_settings().supabase_url.rstrip("/") + "/storage/v1"


def _local(bucket: str, chemin: str) -> Path:
    racine = get_settings().local_storage_dir.resolve()
    cible = (racine / bucket / chemin).resolve()
    if racine not in cible.parents:
        raise StockageErreur("chemin invalide")
    return cible


def televerser(bucket: str, chemin: str, contenu: bytes, type_mime: str) -> None:
    s = get_settings()
    if s.storage_backend == "local":
        cible = _local(bucket, chemin)
        cible.parent.mkdir(parents=True, exist_ok=True)
        cible.write_bytes(contenu)
        return
    r = httpx.post(
        f"{_base()}/object/{bucket}/{quote(chemin)}",
        content=contenu,
        headers={**_entetes(), "Content-Type": type_mime, "x-upsert": "true"},
        timeout=60,
    )
    if r.status_code >= 300:
        log.error("Upload Supabase échoué (%s) : %s", r.status_code, r.text[:300])
        raise StockageErreur("Le fichier n'a pas pu être enregistré.")


def supprimer(bucket: str, chemin: str) -> None:
    s = get_settings()
    if s.storage_backend == "local":
        _local(bucket, chemin).unlink(missing_ok=True)
        return
    r = httpx.request(
        "DELETE", f"{_base()}/object/{bucket}", json={"prefixes": [chemin]}, headers=_entetes(), timeout=30
    )
    if r.status_code >= 300:
        log.warning("Suppression Supabase échouée (%s) : %s", r.status_code, r.text[:300])


def lire(bucket: str, chemin: str) -> bytes:
    s = get_settings()
    if s.storage_backend == "local":
        return _local(bucket, chemin).read_bytes()
    r = httpx.get(f"{_base()}/object/{bucket}/{quote(chemin)}", headers=_entetes(), timeout=60)
    if r.status_code >= 300:
        raise StockageErreur("Fichier introuvable.")
    return r.content


def url_publique(bucket: str, chemin: str) -> str:
    s = get_settings()
    if s.storage_backend == "local":
        return f"/fichiers/{bucket}/{quote(chemin)}"
    return f"{_base()}/object/public/{bucket}/{quote(chemin)}"


def url_signee(bucket: str, chemin: str, expire_s: int = 300, nom_telechargement: str | None = None) -> str:
    s = get_settings()
    if s.storage_backend == "local":
        return f"/fichiers/{bucket}/{quote(chemin)}"
    r = httpx.post(
        f"{_base()}/object/sign/{bucket}/{quote(chemin)}",
        json={"expiresIn": expire_s},
        headers=_entetes(),
        timeout=30,
    )
    if r.status_code >= 300:
        raise StockageErreur("Lien de téléchargement indisponible.")
    url = s.supabase_url.rstrip("/") + "/storage/v1" + r.json()["signedURL"]
    if nom_telechargement:
        url += "&download=" + quote(nom_telechargement)
    return url
