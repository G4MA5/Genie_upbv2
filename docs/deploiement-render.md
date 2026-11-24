# Déploiement sur Render : deux serveurs

Le projet tourne sur **deux serveurs séparés**, déployés depuis le **même dépôt** :

| Serveur | `SERVICE` | Rôle |
|---|---|---|
| API principale | `api` | Inscription des invités (codes, matricules), création du personnel, bénévoles, anciennes routes |
| Service des badges | `badges` | Création, image et envoi des badges, listes, ZIP et PDF, désactivation et réémission, scan et présence (à venir) |

Chaque serveur ne répond qu'à ses propres routes (les autres donnent 404). Ce sont deux processus indépendants : un plantage ou une surcharge mémoire (gros téléchargement de badges) n'arrête pas les inscriptions, et inversement.

## Qui appelle qui

- **Interface de gestion** : appelle l'API principale (personnel, équipes, bénévoles, invités) et le service des badges (liste, impression, désactivation). Les deux reconnaissent le même jeton de connexion Supabase.
- **Application de scan** : appelle **seulement le service des badges**. Elle continue de marcher même si l'API principale a un problème.
- **API principale vers service des badges** : quand elle a besoin d'un badge (un invité s'inscrit, une équipe est validée...), elle appelle la route interne `POST /api/interne/badges/attribuer`, protégée par la clé `BADGES_SERVICE_KEY`. Si le service est indisponible, l'opération est refusée avec « réessayez dans un instant » : personne n'est inscrit sans badge.
- Les deux serveurs utilisent **la même base Supabase**.

## Créer les deux services sur Render

Pour chacun : **New**, **Web Service**, même dépôt Git.

| Réglage | Valeur |
|---|---|
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Variable `NODE_VERSION` | `22` (ou plus récent) |
| Variable `SERVICE` | `api` pour le premier, `badges` pour le second |

Render fournit tout seul le port (`PORT`) : `next start` l'utilise.

Conseils d'offre :
- Le service des badges génère des images : prévoir **au moins 512 Mo de mémoire** (les téléchargements sont limités à 300 badges en ZIP et 800 en PDF pour cette raison).
- Sur l'offre gratuite, un service s'endort après environ 15 minutes sans visite et met jusqu'à une minute à se réveiller. Pour l'événement, une offre payante évite ce délai, surtout pour le service des badges (scan).

## Variables d'environnement

La même clé secrète `BADGES_SERVICE_KEY` (16 caractères minimum) doit être **identique sur les deux serveurs**. En générer une :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

| Variable | API principale | Service des badges |
|---|---|---|
| `SERVICE` | `api` | `badges` |
| `supabase_url`, `supabase_service_role_key` | oui | oui |
| `supabase_anon_key` | oui (anciennes routes) | non |
| `BADGES_SERVICE_KEY` | oui | oui (même valeur) |
| `BADGES_SERVICE_URL` | oui (adresse du service des badges) | non |
| `APP_SECRET` | oui (codes et jetons de matricule) | non |
| `FRONT_ORIGINS` | oui (adresse du site) | oui (adresses du site, de l'interface de gestion et de l'application de scan) |
| `FRONT_RESET_URL` | oui | non |
| `PCO_API_URL`, `PCO_API_KEY` | oui | non |
| `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME` | oui (codes de vérification) | oui (e-mails des badges) |
| `INVITES_OUVERTURE`, `INVITES_CLOTURE`, `INVITES_JOURS` | oui | non |

Ne jamais commiter ces valeurs : elles se saisissent dans le tableau de bord de Render.

## Vérifier après le déploiement

Remplacer les adresses par les vôtres :

```bash
# Service des badges : sa route répond (401 = il faut être connecté), celles de l'API non (404)
curl -i https://badges-genie-upb.onrender.com/api/badges/moi
curl -i -X POST https://badges-genie-upb.onrender.com/api/invites/code/envoyer

# API principale : l'inverse
curl -i https://api-genie-upb.onrender.com/api/badges/moi
curl -i -X POST https://api-genie-upb.onrender.com/api/invites/code/envoyer -H "Content-Type: application/json" -d '{"email":"x"}'

# La clé de service est refusée si elle est fausse (401)
curl -i -X POST https://badges-genie-upb.onrender.com/api/interne/badges/attribuer -H "X-Service-Key: fausse"
```

Résultats attendus : 401, 404, 404, 400, 401.

## Développement sur un seul serveur

Laisser `SERVICE`, `BADGES_SERVICE_URL` et `BADGES_SERVICE_KEY` vides : un seul serveur répond à toutes les routes et le code des badges est appelé directement, sans HTTP. C'est le mode de `npm run dev`.

Pour tester la configuration à deux serveurs en local, lancer deux terminaux avec des ports et des valeurs de `SERVICE` différents, et renseigner `BADGES_SERVICE_URL=http://localhost:<port du service des badges>`.

## Limites connues

- L'aiguillage se fait dans le code des routes (variable `SERVICE`), pas par le fichier `proxy` de Next 16, qui ne s'est pas activé dans nos essais. Les **anciennes routes** (`connexion`, `forgot`, `reset`, `inscription`, `concours_inscription`) répondent sur les deux serveurs ; elles ne doivent être appelées que sur l'API principale.
- Un service gratuit endormi retarde la première requête (jusqu'à une minute) ; l'appel interne attend 60 secondes avant d'abandonner.
- La création d'un badge et la base sont dans deux endroits : si le service des badges répond après un long délai alors que l'API principale a déjà abandonné, un badge peut exister pour une inscription annulée. Cas rare, sans conséquence pour les scans (il n'appartient plus à personne).
