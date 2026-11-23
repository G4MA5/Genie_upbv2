-- =====================================================================
-- GENIE UPB 2026 : rôles du personnel, demandes de bénévoles et
-- traçabilité des badges
--
-- Ce que le fichier ajoute :
--   1. qrcode : le type "benevole", et qui a créé / désactivé un badge et
--      pourquoi (traçabilité) ;
--   2. role_utilisateur : les rôles du personnel (PCO, responsables de
--      catégorie et de commission, formateur, encadreur, juré, partenaire,
--      bénévole, comité technique) ;
--   3. demande_benevole : les demandes des bénévoles et leur suivi ;
--   4. equipe : date et auteur de la validation.
-- =====================================================================

begin;

-- 1) qrcode : type "benevole" + traçabilité ------------------------------
-- Retire l'ancien contrôle des types (son nom peut varier), puis le recrée.
do $$
declare c text;
begin
  for c in
    select conname from pg_constraint
    where conrelid = 'public.qrcode'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) like '%invite%'
      and pg_get_constraintdef(oid) like '%partenaire%'
  loop
    execute format('alter table public.qrcode drop constraint %I', c);
  end loop;
end $$;

alter table public.qrcode
  add constraint qrcode_type_check
  check (type in ('participant', 'invite', 'jure', 'encadreur', 'formateur',
                  'organisateur', 'partenaire', 'benevole'));

alter table public.qrcode
  add column if not exists cree_par            int references public."user"(id),
  add column if not exists desactive_par       int references public."user"(id),
  add column if not exists motif_desactivation text;

-- role_utilisateur : les rôles ------------------------------------------
create table if not exists public.role_utilisateur (
  id            int generated always as identity primary key,
  id_user       int not null references public."user"(id) on delete cascade,
  role          text not null
      check (role in ('super_user', 'pco', 'resp_categorie', 'resp_commission',
                      'formateur', 'encadreur', 'jure', 'partenaire', 'benevole')),
  id_categorie  int references public.categorie(id),
  commission    text
      check (commission in ('securite', 'technique', 'logistique', 'communication')),
  actif         boolean not null default true,
  cree_par      int references public."user"(id),
  cree_le       timestamptz not null default now(),
  check (role <> 'resp_categorie'  or id_categorie is not null),
  check (role <> 'resp_commission' or commission  is not null)
);

-- Une personne ne peut pas avoir deux fois exactement le même rôle.
create unique index if not exists role_utilisateur_unique
  on public.role_utilisateur (id_user, role, coalesce(id_categorie, 0), coalesce(commission, ''));

create index if not exists role_utilisateur_par_user
  on public.role_utilisateur (id_user) where actif;

-- demande_benevole : inscription et suivi des bénévoles ------------------
-- Statuts : en_attente -> (rencontre_demandee) -> acceptee ou refusee.
-- Un bénévole refusé peut redéposer une demande : une seule demande "en
-- cours ou acceptée" à la fois par personne.
create table if not exists public.demande_benevole (
  id                    int generated always as identity primary key,
  id_user               int not null references public."user"(id) on delete cascade,
  statut                text not null default 'en_attente'
      check (statut in ('en_attente', 'rencontre_demandee', 'acceptee', 'refusee')),
  message               text,                         -- motivation du bénévole
  rencontre_demandee_le timestamptz,
  decide_par            int references public."user"(id),
  decide_le             timestamptz,
  motif_refus           text,
  cree_le               timestamptz not null default now()
);

create unique index if not exists demande_benevole_une_active
  on public.demande_benevole (id_user)
  where statut in ('en_attente', 'rencontre_demandee', 'acceptee');

create index if not exists demande_benevole_par_statut
  on public.demande_benevole (statut, cree_le);

--  equipe : qui a validé l'équipe, et quand -------------------------------
alter table public.equipe
  add column if not exists validee_le  timestamptz,
  add column if not exists validee_par int references public."user"(id);

--  Données personnelles : RLS activé, aucune règle publique ---------------
alter table public.role_utilisateur enable row level security;
alter table public.demande_benevole enable row level security;

commit;

-- ---------------------------------------------------------------------
-- A faire à la main, une fois, quand le fichier est validé :
-- donner à ton propre compte le rôle de comité technique. Remplacer l'adresse.
--
--   insert into public.role_utilisateur (id_user, role)
--   select id, 'super_user' from public."user"
--   where lower(email) = lower('graouroudivine@gmail.com');
--
-- Les responsables de catégorie déjà présents dans l'ancienne table
-- super_user pourront être repris de la même façon (role 'resp_categorie',
-- avec leur id_categorie) : à faire avec l'équipe après vérification de la
-- table.
-- ---------------------------------------------------------------------
