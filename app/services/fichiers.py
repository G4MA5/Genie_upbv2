"""Contrôle des fichiers envoyés : taille, type réel (signature binaire), image valide."""
import io

from fastapi import UploadFile, status
from PIL import Image

from .equipes import erreur

SIGNATURES = {
    "application/pdf": [b"%PDF-"],
    "image/png": [b"\x89PNG\r\n\x1a\n"],
    "image/jpeg": [b"\xff\xd8\xff"],
    "image/webp": [b"RIFF"],
    # Formats Office récents = archives zip ; anciens formats = OLE
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [b"PK\x03\x04"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [b"PK\x03\x04"],
    "application/msword": [b"\xd0\xcf\x11\xe0"],
    "application/vnd.ms-powerpoint": [b"\xd0\xcf\x11\xe0"],
}

EXTENSIONS = {
    "pdf": "application/pdf",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "webp": "image/webp",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "doc": "application/msword",
    "ppt": "application/vnd.ms-powerpoint",
}


async def lire_fichier(fichier: UploadFile, taille_max: int, types_autorises: set[str]) -> tuple[bytes, str, str]:
    """Renvoie (contenu, type_mime, extension) ou lève une erreur 400/413."""
    nom = fichier.filename or ""
    ext = nom.rsplit(".", 1)[-1].lower() if "." in nom else ""
    mime = EXTENSIONS.get(ext)
    if mime not in types_autorises:
        formats = ", ".join(sorted({e.upper() for e, m in EXTENSIONS.items() if m in types_autorises}))
        raise erreur(status.HTTP_400_BAD_REQUEST, f"Format non accepté. Formats autorisés : {formats}.")

    contenu = await fichier.read(taille_max + 1)
    if len(contenu) > taille_max:
        raise erreur(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, f"Fichier trop lourd ({taille_max // (1024 * 1024)} Mo maximum).")
    if not contenu:
        raise erreur(status.HTTP_400_BAD_REQUEST, "Le fichier est vide.")
    if not any(contenu.startswith(sig) for sig in SIGNATURES[mime]):
        raise erreur(status.HTTP_400_BAD_REQUEST, "Le contenu du fichier ne correspond pas à son extension.")
    if mime.startswith("image/"):
        try:
            with Image.open(io.BytesIO(contenu)) as img:
                img.verify()
        except Exception:
            raise erreur(status.HTTP_400_BAD_REQUEST, "Image illisible.") from None
    return contenu, mime, "jpg" if ext == "jpeg" else ext
