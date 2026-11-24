-- =====================================================================
-- GENIE UPB 2026 : schéma des INVITÉS SEULEMENT
-- (premier script des invités, remis en place)
--
-- Basé sur les tables existantes : on réutilise "user" et "invite" et on
-- garde les mêmes conventions (snake_case, noms en français, id int,
-- "genre", "numero", "filiere", "niveau", booléens comme "participant").
--
-- À lancer APRÈS l'archivage (database/archive_2025). Si le schéma complet
-- (schema/schema_complet_2026.sql) a déjà été lancé, lancer d'abord
-- schema/annuler_schema_complet.sql, sinon ce script s'arrête.
-- Peut être relancé sans danger. L'API écrit avec la clé service role
-- (supabaseAdmin) : les nouvelles tables ont le RLS activé sans règle
-- publique.
-- =====================================================================

begin;

-- Garde-fou : refuser si le schéma complet est présent.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'qrcode'
      and column_name = 'id_materiel'
  ) then
    raise exception 'Le schéma complet est présent : lancer d''abord annuler_schema_complet.sql';
  end if;
end $$;

-- 1) "user" = l'identité commune ---------------------------------------
alter table public."user"
  add column if not exists matricule text,
  add column if not exists genre     text,
  add column if not exists invite    boolean default false; -- "marque invité"

-- Un matricule = une seule personne, tous types confondus.
create unique index if not exists user_matricule_unique
  on public."user" (matricule) where matricule is not null;

-- Un e-mail = une seule personne (insensible à la casse).
-- (échoue s'il existe déjà des doublons : les nettoyer avant)
create unique index if not exists user_email_unique
  on public."user" (lower(email)) where email is not null;

-- 2) "invite" = la fiche propre aux invités ----------------------------
-- Colonnes existantes conservées : nom, prenom, statut (= origine),
-- email, numero, valide.
-- Colonnes presence, last_scan_date, ticket_envoyer : remplacées par la
-- table "activite" ; à supprimer quand l'équipe aura validé.
alter table public.invite
  add column if not exists id_user          int references public."user"(id),
  add column if not exists type_invite      text
      -- etudiant_upb = étudiant de l'UPB (matricule vérifié, compte créé).
      -- particulier  = tout autre individu, y compris un étudiant d'une
      --                autre école (pas de matricule, pas de compte).
      check (type_invite in ('etudiant_upb', 'particulier', 'entreprise')),
  add column if not exists nom_entreprise   text,
  add column if not exists nom_representant text,
  add column if not exists jours_prevus     date[] default '{}', -- indicatif, non bloquant
  add column if not exists consentement_le  timestamptz,
  add column if not exists cree_le          timestamptz default now();

-- Une personne = une seule fiche invité.
create unique index if not exists invite_id_user_unique
  on public.invite (id_user);

-- 3) "qrcode" = le badge, séparé de la personne -------------------------
create table if not exists public.qrcode (
  id            int generated always as identity primary key,
  id_user       int  not null references public."user"(id),
  type          text not null
      check (type in ('participant', 'invite', 'jure', 'encadreur',
                      'formateur', 'organisateur', 'partenaire')),
  jeton         uuid not null default gen_random_uuid() unique, -- seul contenu du QR
  actif         boolean not null default true,
  cree_le       timestamptz not null default now(),
  desactive_le  timestamptz
);
-- Un seul badge ACTIF par personne (l'ancien est désactivé à la réédition).
create unique index if not exists qrcode_un_actif_par_user
  on public.qrcode (id_user) where actif;

-- 4) "activite" = chaque scan (entrée, sortie, repas...) ----------------
create table if not exists public.activite (
  id           int generated always as identity primary key,
  id_qrcode    int  not null references public.qrcode(id),
  type_event   text not null
      check (type_event in ('entree', 'sortie', 'repas_matin', 'repas_midi',
                            'repas_soir', 'materiel_demande',
                            'materiel_retour', 'presence_formation')),
  date_heure   timestamptz not null default now(),
  poste        text,                                  -- contexte du bénévole
  id_scanneur  int references public."user"(id)
);
create index if not exists activite_qrcode_date
  on public.activite (id_qrcode, date_heure desc);

-- Journée de concours : remise à zéro à 5 h (heure d'Abidjan).
create or replace function public.jour_concours(ts timestamptz)
returns date language sql immutable as $$
  select ((ts at time zone 'Africa/Abidjan') - interval '5 hours')::date
$$;

-- 5) Vérification de l'e-mail par code ----------------------------------
create table if not exists public.verification_code (
  id         int generated always as identity primary key,
  email      text not null,
  code_hash  text not null,            -- jamais le code en clair
  expire_le  timestamptz not null,     -- ex. 10 minutes
  essais     int not null default 0,   -- bloqué à 5
  utilise    boolean not null default false,
  cree_le    timestamptz not null default now()
);
create index if not exists verification_code_email
  on public.verification_code (lower(email), cree_le desc);

-- 6) Données personnelles : RLS activé, aucune règle publique ----------
alter table public.qrcode            enable row level security;
alter table public.activite          enable row level security;
alter table public.verification_code enable row level security;

commit;
