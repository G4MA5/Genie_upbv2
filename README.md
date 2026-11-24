# GÉNIE UPB — Backends

Ce dossier contient **deux backends indépendants**, qui partagent la même base Supabase :

| Backend | Dossier | Rôle | Techno |
|---|---|---|---|
| API invités, personnel et badges | `./` (racine : `src/app/api`, `lib/`) | Inscription des invités, personnel, bénévoles, service des badges | Next.js 16 |
| Inscriptions & équipes | [`inscriptions-equipes/`](inscriptions-equipes/README.md) | Inscription des étudiants par matricule, équipes, invitations, documents, badges des candidats | FastAPI (Python) |

Ils se déploient **séparément** (deux projets Vercel, ou deux services Render), depuis le même dépôt :

| Projet | Root Directory | Preset détecté | Documentation |
|---|---|---|---|
| Next.js | `./` | Next.js | [`docs/deploiement-render.md`](docs/deploiement-render.md) |
| FastAPI | `inscriptions-equipes` | FastAPI | [`inscriptions-equipes/README.md`](inscriptions-equipes/README.md#6-déploiement) |

Important : aucun dossier `app/` ne doit revenir à la racine. Next.js utiliserait ce dossier à la place
de `src/app` et toutes les routes `/api/...` disparaîtraient du build.

Variables du backend Next.js à définir sur l'hébergeur (le build échoue sans les trois premières) :
`supabase_url`, `supabase_anon_key`, `supabase_service_role_key`, puis selon les routes
`APP_SECRET`, `BADGES_SERVICE_KEY`, `BADGES_SERVICE_URL`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`,
`BREVO_SENDER_NAME`, `FRONT_ORIGINS`, `FRONT_RESET_URL`, `INVITES_OUVERTURE`, `INVITES_CLOTURE`,
`INVITES_JOURS`, `PCO_API_URL`, `PCO_API_KEY`, `SERVICE` (facultatif, voir la doc Render).
