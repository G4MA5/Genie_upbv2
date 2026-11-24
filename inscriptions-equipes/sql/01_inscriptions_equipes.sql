-- =============================================================================
-- GÉNIE UPB — Inscriptions candidats & équipes
-- Script ADDITIF : à exécuter une fois dans l'éditeur SQL Supabase.
-- Il ne supprime ni ne renomme rien. Il ajoute seulement :
--   * des colonnes à public.user, public.equipe et public.membre ;
--   * deux tables : public.invitation et public.ressource ;
--   * trois buckets de stockage : ressources, photos-profil, qrcodes.
-- Ré-exécutable sans erreur (IF NOT EXISTS / ON CONFLICT partout).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. public.user : un candidat = une ligne avec participant = true
--    (nom, prenom, filiere, niveau, email, numero, matricule, genre existent déjà)
-- -----------------------------------------------------------------------------
alter table public.user add column if not exists date_naissance date;
alter table public.user add column if not exists photo_url text;
alter table public.user add column if not exists hebergement boolean not null default false;
alter table public.user add column if not exists conditions_acceptees_le timestamp with time zone;
alter table public.user add column if not exists numero_candidat text;

-- Un matricule ne peut correspondre qu'à un seul compte (insensible à la casse).
-- Si cette ligne échoue, c'est qu'il existe déjà des doublons de matricule
-- dans public.user : il faut les fusionner avant de relancer le script.
create unique index if not exists user_matricule_unique
  on public.user (upper(btrim(matricule)))
  where matricule is not null;

-- -----------------------------------------------------------------------------
-- 2. public.equipe : chef, dates de création et de soumission
--    statut (bool) existant : null = en attente / brouillon, true = validée, false = refusée
--    soumise_le null = brouillon (pas encore envoyée aux organisateurs)
-- -----------------------------------------------------------------------------
alter table public.equipe add column if not exists id_chef integer references public.user(id);
alter table public.equipe add column if not exists cree_le timestamp with time zone not null default now();
alter table public.equipe add column if not exists soumise_le timestamp with time zone;

-- Deux équipes d'un même concours ne peuvent pas porter le même nom.
-- (limité aux équipes créées par la plateforme : id_chef renseigné)
create unique index if not exists equipe_nom_par_concours_unique
  on public.equipe (id_concours, lower(btrim(nom_equipe)))
  where id_chef is not null;

-- -----------------------------------------------------------------------------
-- 3. public.membre : lien vers le compte, hébergement, rôle, retrait
--    Un membre retiré garde sa ligne (retire_le renseigné) pour l'historique
--    et pour afficher le motif à l'étudiant concerné.
-- -----------------------------------------------------------------------------
alter table public.membre add column if not exists id_user integer references public.user(id);
alter table public.membre add column if not exists hebergement boolean not null default false;
alter table public.membre add column if not exists est_chef boolean not null default false;
alter table public.membre add column if not exists rejoint_le timestamp with time zone not null default now();
alter table public.membre add column if not exists retire_le timestamp with time zone;
alter table public.membre add column if not exists motif_retrait text;
alter table public.membre add column if not exists retire_par integer references public.user(id);

-- Un étudiant n'appartient qu'à une seule équipe à la fois.
create unique index if not exists membre_une_equipe_active
  on public.membre (id_user)
  where id_user is not null and retire_le is null;

create index if not exists membre_id_equipe_idx on public.membre (id_equipe);

-- -----------------------------------------------------------------------------
-- 4. public.invitation : invitation d'un étudiant (par matricule) par le chef
-- -----------------------------------------------------------------------------
create table if not exists public.invitation (
  id integer generated always as identity not null,
  id_equipe integer not null,
  id_invite integer not null,
  id_expediteur integer not null,
  statut text not null default 'en_attente'
    check (statut = any (array['en_attente'::text, 'acceptee'::text, 'refusee'::text, 'annulee'::text])),
  cree_le timestamp with time zone not null default now(),
  repondu_le timestamp with time zone,
  constraint invitation_pkey primary key (id),
  constraint invitation_id_equipe_fkey foreign key (id_equipe) references public.equipe(id) on delete cascade,
  constraint invitation_id_invite_fkey foreign key (id_invite) references public.user(id),
  constraint invitation_id_expediteur_fkey foreign key (id_expediteur) references public.user(id)
);

-- Une seule invitation en attente par (équipe, étudiant).
create unique index if not exists invitation_en_attente_unique
  on public.invitation (id_equipe, id_invite)
  where statut = 'en_attente';

create index if not exists invitation_id_invite_idx on public.invitation (id_invite, statut);

-- -----------------------------------------------------------------------------
-- 5. public.ressource : documents envoyés par une équipe (diagramme « Ressources »)
--    fileName -> file_name, date -> date, dateLimit -> date_limit
-- -----------------------------------------------------------------------------
create table if not exists public.ressource (
  id integer generated always as identity not null,
  id_equipe integer not null,
  file_name text not null,
  chemin text not null,               -- chemin de l'objet dans le bucket « ressources »
  type_mime text,
  taille bigint,
  date timestamp with time zone not null default now(),
  date_limit timestamp with time zone, -- date limite de dépôt en vigueur au moment de l'envoi
  depose_par integer,
  constraint ressource_pkey primary key (id),
  constraint ressource_id_equipe_fkey foreign key (id_equipe) references public.equipe(id) on delete cascade,
  constraint ressource_depose_par_fkey foreign key (depose_par) references public.user(id)
);

create index if not exists ressource_id_equipe_idx on public.ressource (id_equipe);

-- -----------------------------------------------------------------------------
-- 6. Sécurité : les nouvelles tables ne sont lisibles que par le backend
--    (clé service_role / connexion Postgres). Aucune policy = aucun accès anon.
-- -----------------------------------------------------------------------------
alter table public.invitation enable row level security;
alter table public.ressource enable row level security;

-- -----------------------------------------------------------------------------
-- 7. Buckets Supabase Storage
--    ressources     : privé  (documents d'équipe, lus via URL signée)
--    photos-profil  : public (photos affichées dans l'espace)
--    qrcodes        : privé  (badges QR, lus via URL signée + envoyés par e-mail)
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('ressources', 'ressources', false, 10485760,
     array['application/pdf',
           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
           'application/msword',
           'application/vnd.openxmlformats-officedocument.presentationml.presentation',
           'application/vnd.ms-powerpoint',
           'image/png', 'image/jpeg']),
  ('photos-profil', 'photos-profil', true, 3145728,
     array['image/png', 'image/jpeg', 'image/webp']),
  ('qrcodes', 'qrcodes', false, 5242880,
     array['image/png'])
on conflict (id) do nothing;
