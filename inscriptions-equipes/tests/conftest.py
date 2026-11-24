"""Tests d'intégration : base Postgres jetable + API UPB simulée (UPB_API_MODE=mock).

Variables attendues :
  TEST_DATABASE_ADMIN_URL  ex. postgresql://postgres@localhost:55432/postgres
  TEST_BASE_SCHEMA         fichier SQL reproduisant le schéma existant (SQL.txt + stubs auth/storage)
"""
import os
import tempfile
from pathlib import Path

import psycopg
import pytest

ADMIN_URL = os.environ.get("TEST_DATABASE_ADMIN_URL", "postgresql://postgres@localhost:55432/postgres")
BASE_SCHEMA = os.environ.get("TEST_BASE_SCHEMA")
MIGRATIONS = sorted((Path(__file__).resolve().parent.parent / "sql").glob("*.sql"))
DB = "genie_pytest"

if not BASE_SCHEMA:
    pytest.skip("TEST_BASE_SCHEMA non défini", allow_module_level=True)

with psycopg.connect(ADMIN_URL, autocommit=True) as c:
    c.execute(f"drop database if exists {DB} with (force)")
    c.execute(f"create database {DB}")
url = ADMIN_URL.rsplit("/", 1)[0] + f"/{DB}"
with psycopg.connect(url, autocommit=True) as c:
    c.execute(Path(BASE_SCHEMA).read_text(encoding="utf-8"))
    for migration in MIGRATIONS:
        c.execute(migration.read_text(encoding="utf-8"))

os.environ.update(
    DATABASE_URL=url,
    JWT_SECRET="test-secret-0123456789-0123456789-0123456789",
    UPB_API_MODE="mock",
    STORAGE_BACKEND="local",
    LOCAL_STORAGE_DIR=tempfile.mkdtemp(prefix="genie-stockage-"),
    EMAIL_ENABLED="false",
    ADMIN_API_KEY="admin-test",
    INSCRIPTIONS_CLOTURE="2099-01-01T00:00:00+00:00",
)

from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="session")
def concours(client):
    return {c["cle"]: c["id"] for c in client.get("/api/referentiel").json()["concours"]}


def inscrire(client, matricule: str, hebergement: bool = False) -> dict:
    from app import security

    security._appels.clear()  # la limitation de débit est testée à part
    r = client.post("/api/auth/matricule", json={"matricule": matricule})
    assert r.status_code == 200, r.text
    if r.json()["statut"] == "existant":
        return {"Authorization": f"Bearer {r.json()['token']}"}
    r = client.post(
        "/api/auth/inscription",
        json={"matricule": matricule, "conditions_acceptees": True, "hebergement": hebergement},
    )
    assert r.status_code == 201, r.text
    return {"Authorization": f"Bearer {r.json()['token']}"}



def E(client, headers) -> int:
    """Identifiant de la (première) équipe du candidat."""
    return client.get("/api/espace", headers=headers).json()["equipes"][0]["id"]
