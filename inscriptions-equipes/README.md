# GÉNIE UPB — Backend inscriptions & équipes (FastAPI)

Inscription des étudiants par matricule (API base étudiants UPB), équipes, invitations,
documents d'équipe, photos de profil, badges QR par catégorie, e-mails Brevo.
Base de données et fichiers : **Supabase** (Postgres + Storage).

> Ce service vit dans `backend/inscriptions-equipes/`. Le dossier `backend/` contient aussi
> le backend **Next.js** (invités, personnel, badges) : ce sont deux serveurs distincts,
> déployés séparément (voir le README de `backend/` et la section 6 ci-dessous).

## 1. Mise en place

Toutes les commandes se lancent depuis `backend/inscriptions-equipes/`.

1. **Base de données** : dans Supabase › SQL Editor, exécuter dans l'ordre
   [`sql/01_inscriptions_equipes.sql`](sql/01_inscriptions_equipes.sql) puis
   [`sql/02_double_participation_email.sql`](sql/02_double_participation_email.sql), puis
   [`sql/03_code_connexion_email.sql`](sql/03_code_connexion_email.sql) (codes de connexion par e-mail), puis
   [`sql/04_suppression_equipe.sql`](sql/04_suppression_equipe.sql) (historique des équipes supprimées).
   Le script est **additif** (aucune table existante n'est modifiée en dehors de colonnes ajoutées)
   et peut être relancé sans risque. Il crée aussi les buckets `ressources`, `photos-profil`, `qrcodes`.
2. **Configuration** : un seul fichier pour les deux backends : copier `backend/.env.example`
   en `backend/.env` et compléter (un `.env` dans ce dossier, s'il existe, prime sur celui-ci)
   (`DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `UPB_API_KEY`, `BREVO_*`,
   `JWT_SECRET`, `ADMIN_API_KEY`).
3. **Lancer** :
   ```powershell
   python -m venv .venv
   .venv\Scripts\pip install -r requirements.txt
   .venv\Scripts\uvicorn app.main:app --reload --port 8000
   ```
   Documentation interactive : http://127.0.0.1:8000/docs
4. **Frontend** : `npm run dev` dans `Genie_upbv2-dev` ; Vite redirige `/api` vers le port 8000.
   En production, définir `VITE_API_URL` au build du frontend et `FRONT_ORIGINS` côté backend.

## 2. Données

| Table               | Rôle                                                                                                                                                                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public.user`       | Un candidat = une ligne avec `participant = true`. Remplie depuis l'API UPB (nom, prénoms, filière, niveau, e-mail, téléphone → `numero`, sexe → `genre`, date de naissance). Ajouts : `photo_url`, `hebergement`, `conditions_acceptees_le`, `numero_candidat`. |
| `public.equipe`     | `id_chef`, `cree_le`, `soumise_le` ajoutés. `statut` existant : `null` = brouillon/soumise, `true` = validée, `false` = refusée (`motif_refus`). `membres` (jsonb), `nom_capitaine` et `hebergement` sont tenus à jour.                                          |
| `public.membre`     | Une ligne par appartenance. Ajouts : `id_user`, `hebergement`, `est_chef`, `rejoint_le`, `retire_le`, `motif_retrait`, `retire_par`. Un étudiant n'a qu'une équipe active (index unique).                                                                        |
| `public.invitation` | Invitations du chef (par matricule) : `en_attente`, `acceptee`, `refusee`, `annulee`.                                                                                                                                                                            |
| `public.ressource`  | Documents d'équipe (`file_name`, `date`, `date_limit`, chemin dans le bucket).                                                                                                                                                                                   |
| `public.qrcode`     | Existant : **un seul** QR `participant` actif par candidat, créé à la validation de sa première équipe et réutilisé ensuite. Le QR encode le `jeton` (uuid).                                                                                                     |

## 3. Règles métier

- **Connexion et inscription** : le matricule ne suffit pas. Après le matricule, l'e-mail du dossier s'affiche
  semi-masqué (`ga********0@g****.com`) ; le candidat le retape en entier, et s'il correspond, un code à
  **5 chiffres** lui est envoyé par Brevo (valable 10 min, 5 essais, 5 codes par heure et par matricule).
  Le bon code ouvre la session, ou crée le compte s'il s'agit d'une première inscription
  (`/api/auth/matricule` → `/api/auth/code` → `/api/auth/verifier`). Seule l'empreinte HMAC du code est stockée
  (table `code_connexion`). Sans e-mail dans le dossier UPB, la connexion est impossible : l'organisation doit
  compléter le dossier. Avec `EMAIL_ENABLED=false` (développement), le code est écrit dans les journaux du serveur.
- **Session** : jeton valable 90 jours (`JWT_EXPIRE_HOURS=2160`), gardé dans le navigateur : le candidat reste
  connecté en naviguant ou en revenant sur le site, jusqu'à « Se déconnecter ».
- **API UPB** : la clé fournie a la permission _Vérification et inscription_ : chaque vérification réussie marque
  l'étudiant inscrit au concours côté UPB. Le résultat est mis en cache 10 min pour ne l'appeler qu'une fois.
- **Équipes** (`app/services/regles.py`, facile à modifier) :
  - Innovation : 1 à 6 membres, **toutes les filières**, document de présentation obligatoire avant soumission.
  - Droit : **filière SJAP uniquement** ; exactement 6, au moins 2 filles, au moins un L1, un L2 et un L3.
  - Économie : **toutes les filières** ; 4 à 6, au plus 3 L1 / 2 L2 / 2 L3, au moins 2 L1 et 2 L2
    (aucun L3 obligatoire : une équipe peut en compter 0).
  - Technologie : **toutes les filières sauf SJAP, SEA et SEG** ; 6 à 7, au moins 2 filles, au plus 2 L3,
    au moins un 3EA, un ASSRI et un MIAGE, au plus 4 étudiants d'une même filière ; le chef est le capitaine.
  - La filière est vérifiée à la création d'une équipe, à l'invitation et à l'acceptation ; l'espace ne propose
    au candidat que les catégories ouvertes à sa filière.
  - Une invitation ou une acceptation qui rendrait l'équipe impossible à compléter est refusée.
  - Un candidat = une adresse e-mail (deux comptes ne peuvent pas partager un e-mail).
  - Un candidat a **au plus 2 équipes** : une dans une catégorie principale (Droit, Technologie ou Économie,
    si sa filière y est acceptée) et une en **Innovation**, dans n'importe quel ordre, chef ou membre. Il reçoit alors 2 badges (design de chaque catégorie) qui portent le **même** QR code.
  - Après soumission, la composition est figée (sauf refus des organisateurs).
  - **Suppression** : le chef peut supprimer son équipe tant qu'elle n'est pas soumise ET qu'elle ne remplit
    pas toutes les conditions (`POST /api/equipes/{id}/supprimer`, motif obligatoire). Le motif, le chef, la
    catégorie et la liste des membres sont gardés dans `equipe_suppression` ; les membres, libérés, sont
    prévenus par e-mail et peuvent créer ou rejoindre une autre équipe.
- **Badges QR** : générés à la **validation** par les organisateurs, sur le modèle de la catégorie
  (`app/assets/badges/*.jpg`), stockés dans `qrcodes/<id_user>/<jeton>-<id_equipe>.png` et envoyés par e-mail (Brevo).
  Police : déposer `Montserrat-Bold.ttf` et `Montserrat-Regular.ttf` dans `app/assets/fonts/` (sinon police système).

## 4. Validation par les organisateurs (pas encore d'écran admin)

```powershell
curl -X POST http://127.0.0.1:8000/api/admin/equipes/12/valider -H "X-Admin-Key: <ADMIN_API_KEY>"
curl -X POST http://127.0.0.1:8000/api/admin/equipes/12/refuser -H "X-Admin-Key: <ADMIN_API_KEY>" -H "Content-Type: application/json" -d '{\"motif\":\"Il manque un L3\"}'
curl "http://127.0.0.1:8000/api/admin/equipes?etat=soumise" -H "X-Admin-Key: <ADMIN_API_KEY>"
```

`/valider` crée les QR, génère les badges et envoie les e-mails ; `/badges/renvoyer` les renvoie.

## 5. Tests

Tests d'intégration (base Postgres jetable + API UPB simulée, `UPB_API_MODE=mock`).
Le dossier `tests/` (tests et générateur d'étudiants fictifs `tests/upb_simule.py`) est **local uniquement** :
il est ignoré par git et n'existe donc ni sur le dépôt ni en production, où `UPB_API_MODE` doit valoir `live`.

```powershell
$env:TEST_DATABASE_ADMIN_URL="postgresql://postgres@localhost:5432/postgres"
$env:TEST_BASE_SCHEMA="chemin\vers\schema_existant.sql" # SQL.txt + stubs auth.users / storage.buckets
.venv\Scripts\python -m pytest -q tests
```

## 6. Déploiement

### Vercel
Ce service est déployé **dans le même projet Vercel que le backend Next.js**, comme service `equipes`
déclaré dans `backend/vercel.json` (voir le README de `backend/`). Le point d'entrée est
`app.main:app` (aussi indiqué dans `pyproject.toml`), Python 3.12 via `.python-version`.

- `DATABASE_URL` : utiliser le **pooler Supabase en mode transaction (port 6543)** : chaque fonction
  serverless ouvre ses propres connexions.
- `STORAGE_BACKEND=supabase`, `UPB_API_MODE=live`.
- `FRONT_ORIGINS` doit contenir l'adresse du frontend déployé, et le frontend doit pointer sur l'URL
  du projet backend (`VITE_EQUIPES_API_URL`).

Limites du mode serverless : la limitation de débit en mémoire est par instance (moins stricte),
et une requête dure au plus 60 s, ce qui suffit pour la validation d'une équipe.

### Render (alternative, serveur permanent)
Web Service Python, **Root Directory** `inscriptions-equipes`, Build `pip install -r requirements.txt`,
Start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`, mêmes variables d'environnement.
Ici, le pooler en mode session (port 5432) convient aussi.

Vérification après déploiement : `GET /api/sante` doit répondre `{"statut": "ok"}`.
