# API des badges (étape 1)

Consultation, téléchargement, désactivation et réémission des badges. Le fonctionnement complet (rôles, flux) est dans `docs/badges-attribution.md`, le rendu des images dans `docs/badges.md`, l'inscription des invités dans `docs/api-invites.md`.

## Prérequis

- Les scripts de la base ont été lancés : `database/invites/schema_invites.sql` puis `database/personnel/proposition_roles_et_benevoles.sql`.
- Le compte de la personne qui appelle a un rôle dans `role_utilisateur`. Pour donner le rôle de comité technique à ton compte, voir la requête en bas du fichier SQL.

## Authentification

Toutes les routes demandent l'en-tête `Authorization: Bearer <jeton de connexion Supabase>` (le champ `token` renvoyé par `/api/connexion`). Sans jeton ou avec un jeton périmé : 401. Une personne sans le droit demandé reçoit 403.

Les réponses JSON ont la forme `{ "status": "ok", ... }` ou `{ "status": "error", "code": "...", "message": "..." }`. Les routes qui renvoient une image, un PDF ou un ZIP envoient le fichier directement.

**Le jeton du QR n'est jamais renvoyé** par les listes : il n'apparaît que dans les images de badge.

## Routes et droits

| Route | Qui | Réponse |
|---|---|---|
| `GET /api/badges/moi` | toute personne ayant un badge actif | image PNG de son badge |
| `GET /api/badges` | PCO, comité technique (le resp. Logistique : bénévoles seulement) | liste JSON |
| `GET /api/badges/{id}/image` | propriétaire, PCO, comité technique, resp. Logistique (bénévoles) | image PNG |
| `GET /api/badges/telecharger` | PCO, comité technique (tout) ; resp. Logistique (bénévoles) | ZIP ou PDF |
| `POST /api/badges/{id}/desactiver` | **comité technique** | confirmation |
| `POST /api/badges/reemettre` | **comité technique** | nouveau badge envoyé par e-mail |

Les droits sont définis dans `lib/permissions.js`.

## Paramètres de liste et de téléchargement

| Paramètre | Valeurs | Utilisé par |
|---|---|---|
| `type` | `invite`, `jure`, `encadreur`, `formateur`, `organisateur`, `partenaire`, `benevole` | liste, téléchargement |
| `actif` | `true`, `false` (défaut du téléchargement : `true`) | liste, téléchargement |
| `q` | texte (2 caractères minimum) : nom, prénom ou e-mail | liste |
| `page`, `limite` | page (1 par défaut), limite (50 par défaut, 200 au maximum) | liste |
| `format` | `zip` (défaut) ou `pdf` | téléchargement |
| `par_page` | `6` (3 x 2, 62 x 105 mm) ou `12` (4 x 3, 47 x 80 mm) | téléchargement PDF |

## Exemples de réponses

Liste (`GET /api/badges?type=jure`) :

```json
{ "status": "ok", "total": 1, "page": 1, "limite": 50,
  "badges": [ { "id": 7, "type": "jure", "actif": true,
                "cree_le": "...", "desactive_le": null,
                "personne": { "id": 30, "nom": "NEUF", "prenom": "Nina", "email": "nina@exemple.com" } } ] }
```

## Téléchargement groupé

- **ZIP** : une image PNG par badge, rangées par type (`jure/kone-awa-7.png`). Si certains badges n'ont pas pu être générés, un fichier `badges-non-generes.txt` en donne la liste.
- **PDF A4** : plusieurs badges par page, repères de coupe aux quatre coins, numéro de page. Les images y sont en JPEG de bonne qualité pour garder un fichier léger.
- L'en-tête de réponse `X-Badges-Ignores` indique combien de badges ont été écartés.
- Limites : 300 badges en ZIP et 800 en PDF par téléchargement (au-delà : 413, ajouter un filtre ou choisir le PDF), et 6 téléchargements par personne toutes les 10 minutes. Ces limites protègent la mémoire du serveur.
- A valider avec une **impression test** : la taille des badges et les repères de coupe. Avec 12 par page, les repères du bord gauche sont proches de la marge d'impression de certaines imprimantes.

## Désactivation et réémission

- `POST /api/badges/{id}/desactiver` avec `{ "motif": "Badge perdu" }` (motif de 3 à 200 caractères). Le badge reste en base (état « désactivé », avec l'auteur, la date et le motif) : l'application de scan saura qu'il est refusé.
- `POST /api/badges/reemettre` avec `{ "id_user": 42 }` (et `"type"` si la personne n'a aucun badge actif) : désactive le badge actif, en crée un nouveau et l'envoie par e-mail en précisant que l'ancien ne fonctionne plus. Si la création échoue, l'ancien badge est remis en service.
- Une personne n'a qu'un badge actif à la fois.

## Serveurs séparés

Ces routes tournent sur le **service des badges** (`SERVICE=badges`), un serveur distinct de l'API principale (voir `docs/deploiement-render.md`). L'API principale lui demande de créer et d'envoyer un badge par la route interne :

`POST /api/interne/badges/attribuer` avec l'en-tête `X-Service-Key: <BADGES_SERVICE_KEY>` et le corps `{ "id_user": 42, "type": "invite", "type_invite": "particulier", "lien_mot_de_passe": "https://...", "cree_par": 1, "renvoyer": false }`. Réponse : `{ "status": "ok", "type": "invite", "cree": true, "email_envoye": true }`. L'opération est idempotente (pas de doublon) ; `renvoyer: true` renvoie le badge actif, quel que soit son type. Cette route n'est pas faite pour un navigateur.

## Où est le code

| Fichier | Rôle |
|---|---|
| `lib/auth.js` | Identifie la personne connectée et charge ses rôles |
| `lib/permissions.js` | Droits de chaque rôle |
| `lib/badges/service.js` | Attribution, listes, désactivation, réémission, envoi |
| `lib/badges/attribution.js`, `lib/badgesClient.js`, `lib/serviceAuth.js` | Attribuer et envoyer (côté service), appel du service par l'API principale, contrôle de la clé de service |
| `lib/badges/telechargement.js`, `zip.js`, `pdf.js` | Fabrication des ZIP et des PDF |
| `lib/badges/filtres.js` | Contrôle des paramètres d'adresse |
| `src/app/api/badges/` | Les routes |

## Limites connues

- Les badges des **participants** ne sont pas gérés par ce service (ni envoi, ni affichage, ni impression). Il n'y a ni type ni gabarit « participant ».
