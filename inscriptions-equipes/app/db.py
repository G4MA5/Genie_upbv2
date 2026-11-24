
from collections.abc import Iterator
from contextlib import contextmanager
from typing import Any

from psycopg import Connection
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

from .config import get_settings

_pool: ConnectionPool | None = None


def open_pool() -> None:
    global _pool
    if _pool is None:
        _pool = ConnectionPool(
            get_settings().database_url,
            min_size=1,
            max_size=10,
            # prepare_threshold=None : compatible avec le pooler Supabase (pgbouncer, mode transaction)
            kwargs={"row_factory": dict_row, "prepare_threshold": None, "autocommit": False},
            open=True,
        )


def close_pool() -> None:
    global _pool
    if _pool is not None:
        _pool.close()
        _pool = None


@contextmanager
def transaction() -> Iterator[Connection[dict[str, Any]]]:
    """Ouvre une transaction : commit à la sortie, rollback en cas d'exception."""
    if _pool is None:
        open_pool()
    assert _pool is not None
    with _pool.connection() as conn:
        with conn.transaction():
            yield conn  # type: ignore[misc]


def one(conn: Connection, sql: str, params: Any = None) -> dict[str, Any] | None:
    return conn.execute(sql, params).fetchone()  # type: ignore[return-value]


def all_rows(conn: Connection, sql: str, params: Any = None) -> list[dict[str, Any]]:
    return conn.execute(sql, params).fetchall()  # type: ignore[return-value]
