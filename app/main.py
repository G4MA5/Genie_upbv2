"""Point d'entrée FastAPI — GÉNIE UPB : inscriptions et équipes."""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from .config import get_settings
from .db import close_pool, open_pool
from .routers import admin, auth, equipes, espace, invitations
from .services.stockage import StockageErreur

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s : %(message)s")


@asynccontextmanager
async def lifespan(_: FastAPI):
    open_pool()
    yield
    close_pool()


settings = get_settings()
app = FastAPI(
    title="GÉNIE UPB — API inscriptions & équipes",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type", "X-Admin-Key"],
)


@app.middleware("http")
async def entetes_securite(request: Request, call_next):
    reponse = await call_next(request)
    reponse.headers.setdefault("X-Content-Type-Options", "nosniff")
    reponse.headers.setdefault("X-Frame-Options", "DENY")
    reponse.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    if request.url.path.startswith("/api/"):
        reponse.headers.setdefault("Cache-Control", "no-store")
    return reponse


@app.exception_handler(RequestValidationError)
async def validation(_: Request, exc: RequestValidationError):
    premiere = exc.errors()[0] if exc.errors() else {}
    champ = ".".join(str(x) for x in premiere.get("loc", [])[1:])
    return JSONResponse(status_code=400, content={"detail": f"Donnée invalide{f' ({champ})' if champ else ''}."})


@app.exception_handler(StockageErreur)
async def stockage_erreur(_: Request, exc: StockageErreur):
    return JSONResponse(status_code=502, content={"detail": str(exc)})


@app.get("/", include_in_schema=False)
def racine() -> dict[str, str]:
    return {"service": "GÉNIE UPB — API inscriptions & équipes", "documentation": "/docs", "sante": "/api/sante"}


@app.get("/api/sante", tags=["Système"])
def sante() -> dict[str, str]:
    return {"statut": "ok"}


for r in (auth.router, espace.router, equipes.router, invitations.router, admin.router):
    app.include_router(r)

if settings.storage_backend == "local":
    settings.local_storage_dir.mkdir(parents=True, exist_ok=True)
    app.mount("/fichiers", StaticFiles(directory=settings.local_storage_dir), name="fichiers")
