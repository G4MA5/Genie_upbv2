-- =============================================================================
-- GÉNIE UPB — Migration 03 (à exécuter APRÈS 02)
-- Vérification de l'e-mail à l'inscription et à la connexion des candidats :
-- un code à 5 chiffres est envoyé à l'adresse du dossier UPB et doit être saisi
-- pour accéder à l'espace. Seule l'empreinte (HMAC) du code est stockée.
-- Additive et ré-exécutable sans erreur.
-- =============================================================================

create table if not exists public.code_connexion (
  id         bigint generated always as identity primary key,
  matricule  text        not null,
  email      text        not null,
  code_hash  text        not null,
  essais     integer     not null default 0,
  utilise    boolean     not null default false,
  expire_le  timestamptz not null,
  cree_le    timestamptz not null default now()
);

create index if not exists code_connexion_matricule_idx
  on public.code_connexion (matricule, cree_le desc);

-- Accès réservé au backend (connexion Postgres directe) : aucune politique pour anon/authenticated.
alter table public.code_connexion enable row level security;
