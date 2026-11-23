-- =============================================================================
-- GÉNIE UPB — Migration 02 (à exécuter APRÈS 01_inscriptions_equipes.sql)
--   * 1 candidat = 1 adresse e-mail (deux comptes candidats ne partagent pas un e-mail)
--   * un candidat peut être dans 2 équipes UNIQUEMENT si l'une est Technologie et
--     l'autre Innovation (la combinaison est vérifiée par le backend ; la base
--     interdit seulement d'être deux fois dans la même équipe)
--   * un seul QR code participant par candidat (un badge par équipe, même QR)
-- Ré-exécutable sans erreur.
-- =============================================================================

-- 1. Une seule équipe active par étudiant -> remplacé par : pas deux fois la même équipe
drop index if exists public.membre_une_equipe_active;
create unique index if not exists membre_equipe_active_unique
  on public.membre (id_user, id_equipe)
  where id_user is not null and retire_le is null;
create index if not exists membre_id_user_idx on public.membre (id_user) where retire_le is null;

-- 2. Un e-mail ne peut appartenir qu'à un seul candidat.
-- Si cette ligne échoue, deux candidats existants partagent déjà un e-mail : à corriger avant.
create unique index if not exists user_email_candidat_unique
  on public.user (lower(btrim(email)))
  where participant = true and email is not null and btrim(email) <> '';

-- 3. Un seul QR code participant actif par candidat. Un candidat Technologie + Innovation
-- a 2 badges (design de chaque catégorie) qui portent ce même QR code.
-- Si cette ligne échoue, un candidat a déjà plusieurs QR participant actifs : à corriger avant.
create unique index if not exists qrcode_participant_actif_unique
  on public.qrcode (id_user)
  where type = 'participant' and actif;
