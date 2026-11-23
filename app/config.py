"""Configuration lue depuis les variables d'environnement (fichier .env en local)."""
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env", env_file_encoding="utf-8", extra="ignore")

    # --- Base de données Supabase (chaîne de connexion Postgres) ---
    database_url: str

    # --- Supabase Storage ---
    supabase_url: str = ""
    supabase_service_role_key: str = ""
    # "supabase" en production ; "local" pour développer sans Supabase (fichiers sur disque)
    storage_backend: Literal["supabase", "local"] = "supabase"
    local_storage_dir: Path = BASE_DIR / "stockage_local"
    bucket_ressources: str = "ressources"
    bucket_photos: str = "photos-profil"
    bucket_qrcodes: str = "qrcodes"

    # --- API base étudiants UPB ---
    upb_api_url: str = "https://api.dbupb.synapstic.tech"
    upb_api_key: str = ""
    # "mock" : étudiants fictifs générés localement, UNIQUEMENT pour les tests
    upb_api_mode: Literal["live", "mock"] = "live"

    # --- E-mails Brevo ---
    brevo_api_key: str = ""
    brevo_sender_email: str = ""
    brevo_sender_name: str = "GÉNIE UPB"
    email_enabled: bool = True

    # --- Sessions ---
    jwt_secret: str
    jwt_expire_hours: int = 24 * 7

    # --- Administration (validation des équipes) ---
    admin_api_key: str = ""

    # --- Calendrier ---
    inscriptions_cloture: datetime = datetime(2026, 12, 18, 23, 59, 59, tzinfo=timezone.utc)
    # Date limite de dépôt des ressources ; vide = jusqu'à la clôture des inscriptions
    ressources_date_limite: datetime | None = None

    # --- Divers ---
    frontend_url: str = "http://localhost:5173"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    badge_font_bold: str = ""
    badge_font_regular: str = ""

    @field_validator("jwt_secret")
    @classmethod
    def _secret_long(cls, v: str) -> str:
        if len(v) < 32:
            raise ValueError("JWT_SECRET doit contenir au moins 32 caractères")
        return v

    @property
    def cors_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def date_limite_ressources(self) -> datetime:
        return self.ressources_date_limite or self.inscriptions_cloture


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
