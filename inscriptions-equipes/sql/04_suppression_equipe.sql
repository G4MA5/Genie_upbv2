-- =============================================================================
-- GÉNIE UPB — Migration 04 (à exécuter APRÈS 03)
-- Historique des équipes supprimées par leur chef : l'équipe disparaît, mais le motif
-- (obligatoire), le chef, la catégorie et la liste des membres sont conservés ici.
-- Additive et ré-exécutable sans erreur.
-- =============================================================================

create table if not exists public.equipe_suppression (
  id             bigint generated always as identity primary key,
  id_equipe      integer     not null,          -- identifiant de l'équipe supprimée (plus de lien : elle n'existe plus)
  nom_equipe     text        not null,
  id_concours    integer     references public.concours(id),
  categorie      text,
  id_chef        integer     references public."user"(id),
  motif          text        not null,
  etat           text,                          -- brouillon ou refusee au moment de la suppression
  membres        jsonb       not null default '[]'::jsonb,  -- [{id_user, nom, prenom, matricule, est_chef}]
  supprimee_le   timestamptz not null default now()
);

create index if not exists equipe_suppression_chef_idx on public.equipe_suppression (id_chef);

-- Accès réservé au backend (connexion Postgres directe) : aucune politique pour anon/authenticated.
alter table public.equipe_suppression enable row level security;
