"""Session candidat (jeton JWT signé) et protection des routes d'administration."""
import hmac
import threading
import time
from collections import deque
from datetime import datetime, timedelta, timezone
from typing import Annotated, Any

import jwt
from fastapi import Depends, Header, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .config import get_settings
from .db import one, transaction

_bearer = HTTPBearer(auto_error=False)


def creer_jeton(id_user: int) -> str:
    s = get_settings()
    maintenant = datetime.now(timezone.utc)
    return jwt.encode(
        {"sub": str(id_user), "iat": maintenant, "exp": maintenant + timedelta(hours=s.jwt_expire_hours), "typ": "candidat"},
        s.jwt_secret,
        algorithm="HS256",
    )


def _non_autorise(message: str = "Session expirée, reconnecte-toi avec ton matricule.") -> HTTPException:
    return HTTPException(status.HTTP_401_UNAUTHORIZED, message, headers={"WWW-Authenticate": "Bearer"})


def candidat_courant(
    cred: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> dict[str, Any]:
    if cred is None:
        raise _non_autorise("Connexion requise.")
    try:
        payload = jwt.decode(cred.credentials, get_settings().jwt_secret, algorithms=["HS256"])
        id_user = int(payload["sub"])
        if payload.get("typ") != "candidat":
            raise ValueError
    except (jwt.PyJWTError, KeyError, ValueError):
        raise _non_autorise() from None
    with transaction() as conn:
        user = one(conn, 'select * from public."user" where id = %s and participant = true', (id_user,))
    if user is None:
        raise _non_autorise("Compte introuvable.")
    return user


Candidat = Annotated[dict[str, Any], Depends(candidat_courant)]


def admin_requis(x_admin_key: Annotated[str | None, Header()] = None) -> None:
    attendu = get_settings().admin_api_key
    if not attendu or not x_admin_key or not hmac.compare_digest(x_admin_key, attendu):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Accès réservé aux organisateurs.")


# --- Limitation de débit simple, en mémoire (par IP) -------------------------
_appels: dict[str, deque[float]] = {}
_verrou = threading.Lock()


def limiter(nom: str, max_appels: int, fenetre_s: int):
    """Dépendance FastAPI : au plus `max_appels` par `fenetre_s` secondes et par IP."""

    def _dep(request: Request) -> None:
        ip = request.client.host if request.client else "?"
        cle = f"{nom}:{ip}"
        maintenant = time.monotonic()
        with _verrou:
            file = _appels.setdefault(cle, deque())
            while file and maintenant - file[0] > fenetre_s:
                file.popleft()
            if len(file) >= max_appels:
                attente = int(fenetre_s - (maintenant - file[0])) + 1
                raise HTTPException(
                    status.HTTP_429_TOO_MANY_REQUESTS,
                    f"Trop de tentatives, réessaie dans {attente} s.",
                    headers={"Retry-After": str(attente)},
                )
            file.append(maintenant)

    return _dep
