# GÉNIE UPB — Backends

Ce dossier contient **deux backends indépendants**, qui partagent la même base Supabase :

| Backend | Dossier | Rôle | Techno |
|---|---|---|---|
| API invités, personnel et badges | `./` (racine : `src/app/api`, `lib/`) | Inscription des invités, personnel, bénévoles, service des badges | Next.js 16 |
| Inscriptions & équipes | [`inscriptions-equipes/`](inscriptions-equipes/README.md) | Inscription des étudiants par matricule, équipes, invitations, documents, badges des candidats | FastAPI (Python) |

## Déploiement : un seul projet Vercel pour les deux backends

Le fichier [`vercel.json`](vercel.json) déclare deux **Services Vercel** (fonctionnalité en bêta,
disponible sur toutes les offres) dans le même projet et sous le même domaine :

| Service | Dossier | Chemins servis |
|---|---|---|
| `equipes` (FastAPI) | `inscriptions-equipes/` | `/api/auth`, `/api/referentiel`, `/api/espace`, `/api/moi`, `/api/etudiants`, `/api/equipes`, `/api/invitations`, `/api/admin`, `/api/sante` |
| `next` (Next.js) | `./` | tout le reste (`/api/invites`, `/api/badges`, `/api/connexion`, ...) |

Réglages du projet Vercel :
1. **Settings › General** : *Framework Preset* = **Services**, *Root Directory* = `./` (racine du dépôt).
2. **Settings › Environment Variables** : toutes les variables de [`.env.example`](.env.example)
   (communes, FastAPI et Next.js), cochées pour Production, Preview et Development.
3. Redéployer, puis vérifier `https://<projet>.vercel.app/api/sante` (FastAPI, répond `{"statut":"ok"}`)
   et `https://<projet>.vercel.app/api/badges` (Next.js, répond 401 sans connexion).

Côté frontend, `VITE_API_URL`, `VITE_BADGES_URL` et `VITE_EQUIPES_API_URL` prennent toutes la même
valeur : l'URL de ce projet backend.

Une nouvelle route FastAPI dont le préfixe n'est pas dans la liste ci-dessus doit être ajoutée aux
`rewrites` de `vercel.json`, sinon elle est envoyée au Next.js (404).

Si les Services posaient problème, solution de repli : deux projets Vercel séparés sur le même dépôt,
*Root Directory* `./` (Next.js) et `inscriptions-equipes` (FastAPI, détecté via `pyproject.toml`).

Important : aucun dossier `app/` ne doit revenir à la racine. Next.js utiliserait ce dossier à la place
de `src/app` et toutes les routes `/api/...` disparaîtraient du build.

## Variables d'environnement

Les deux backends lisent **le même fichier** `backend/.env` et utilisent **les mêmes noms** pour les
valeurs communes (`supabase_url`, `supabase_anon_key`, `supabase_service_role_key`, `BREVO_*`,
`FRONT_ORIGINS`). Le modèle complet, classé par backend, est dans [`.env.example`](.env.example).
Sur Vercel, chaque projet a ses propres variables : y reprendre exactement ces noms, cochés pour
Production, Preview et Development. Sans les trois variables `supabase_*`, le build Next.js échoue.
