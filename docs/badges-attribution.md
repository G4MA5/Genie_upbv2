# Attribution des badges : fonctionnement prévu (à valider)

Ce document décrit ce qui a été décidé pour l'attribution des badges et la gestion du personnel. Rien n'est encore codé pour ces parties. Le module de rendu des badges est décrit dans `docs/badges.md`, l'inscription des invités (déjà en place) dans `docs/api-invites.md`.

## Principes

- Un badge est lié à **une personne** (table `qrcode`, un seul badge actif par personne). Son QR ne contient qu'un jeton opaque.
- L'attribution est **un service à part entière**, déployé sur **son propre serveur** (même dépôt de code, `SERVICE=badges`, voir `docs/deploiement-render.md`). L'API principale lui demande de créer et d'envoyer les badges par une route interne protégée par une clé ; l'application de scan s'y connecte directement.
- Les droits sont **contrôlés côté serveur** à partir des rôles de la personne connectée. Les interfaces (front séparé) ne font qu'afficher.
- Toute personne qui reçoit un badge a une **fiche** dans la table `user` (son identité). Un **compte de connexion** Genie UPB est obligatoire pour les étudiants de l'UPB (participants, bénévoles, étudiants invités) et pour le personnel qui a une interface de gestion. Il n'est **pas obligatoire** pour les personnes extérieures à l'université (invités externes, et jurés, formateurs, encadreurs ou partenaires qui n'ont pas d'interface) : elles reçoivent leur badge par e-mail.

## Rôles

| Rôle | Badge | Remarques |
|---|---|---|
| Comité technique (`super_user`) | Organisateur | Inclut le responsable de la commission Technique |
| PCO (`pco`) | Organisateur | |
| Responsable de catégorie (`resp_categorie`) | Organisateur | Droit, Innovation, Technologie, Économie |
| Responsable de commission (`resp_commission`) | Organisateur | Sécurité, Technique, Logistique, Communication |
| Formateur / Encadreur | Encadreur / Formateur | |
| Juré | Juré | |
| Partenaire | Partenaire | |
| Bénévole | Bénévole (ardoise) | S'inscrit lui-même, accepté par la Logistique |
| Participant | aucun | **Hors de ce service** : ni envoi, ni affichage, ni impression des badges des participants (confié à quelqu'un d'autre) |
| Invité | Invité | Automatique à l'inscription (déjà fait) |

## Droits

| Action | Comité technique | PCO | Resp. catégorie | Resp. Logistique | Sécurité, Communication |
|---|---|---|---|---|---|
| Créer le personnel (organisateurs, formateurs, encadreurs, jurés, partenaires) | oui | oui | non | non | non |
| Voir les inscriptions (personnel, bénévoles) | toutes | toutes | non | les bénévoles | non (leur interface plus tard) |
| **Vue d'impression de tous les badges** (tous types : organisateurs, invités, bénévoles, jurés, partenaires...) et téléchargement groupé | **oui** | **oui** | non | non | non |
| Voir et télécharger les badges des bénévoles | oui | oui | non | oui | non |
| **Désactiver et réémettre** un badge | **oui** | non | non | non | non |
| Gérer les bénévoles (accepter, refuser, demander une rencontre) | non | non | non | oui | non |

Les responsables de catégorie ne créent pas de comptes pour l'instant. Plus tard, ils pourraient **proposer** des jurés, formateurs et encadreurs que les PCO valident.

## Flux

### Personnel
Les PCO ou le comité technique créent la personne avec son rôle (et sa catégorie ou sa commission). L'API crée sa fiche, son rôle et son badge, puis envoie un e-mail avec le badge.

- **Avec compte** (cas par défaut pour les organisateurs : PCO, responsables de catégorie et de commission) : l'API crée aussi le compte Genie UPB, et l'e-mail contient un lien pour définir le mot de passe. Ce compte donne accès à l'interface de gestion de son rôle.
- **Sans compte** (possible pour les jurés, formateurs, encadreurs et partenaires extérieurs à l'université qui n'ont pas besoin d'interface) : fiche et badge seulement, envoyé par e-mail, comme un invité externe. Un champ « avec compte » (oui ou non) dans la création en décide.

### Participants
**Les badges des participants ne sont pas gérés par ce service** : ni l'envoi des QR codes (validation d'équipe, e-mail d'acceptation), ni l'affichage, ni l'impression. C'est confié à quelqu'un d'autre. Il n'y a donc ni type ni gabarit « participant » ici.

L'e-mail d'acceptation envoyé aujourd'hui par le service Python (déclencheur `envoi_mail` sur `equipe`) fera doublon : il faudra le désactiver au moment de cette étape.

### Bénévoles
1. Le bénévole, **connecté**, dépose une demande. Son matricule est vérifié auprès des PCO (il doit être étudiant de l'UPB).
2. Refusé automatiquement s'il est participant, membre d'une équipe ou invité.
3. Le responsable Logistique voit les demandes. Il peut **demander une rencontre** (e-mail d'entretien au bénévole), puis **accepter** (le bénévole reçoit son badge) ou **refuser** (e-mail de refus).
4. Un bénévole refusé peut redéposer une demande.
5. Le responsable Logistique affecte ensuite les bénévoles aux contextes de scan (étape de l'application de scan, plus tard).

### Impression
L'impression concerne **tous les badges gérés par ce service** (organisateurs, invités, bénévoles, jurés, formateurs, encadreurs, partenaires). Une seule vue :
- **Vue d'impression** : tous les badges, filtrable par type et par état. Réservée aux **PCO** et au **comité technique** ; le responsable Logistique voit de la même façon les badges des bénévoles.

Le téléchargement groupé propose :
- **un PDF A4**, plusieurs badges par page avec repères de coupe. Proposition : 6 badges par page (3 colonnes, 2 lignes, 62 x 105 mm par badge) ; une version à 12 par page (47 x 80 mm) est possible. A valider avec une impression test ;
- **un ZIP d'images** (si le PDF ne convient pas).

### Badge perdu
Seul le comité technique désactive un badge (avec un motif) et en réémet un nouveau, envoyé par e-mail. L'ancien QR ne fonctionne plus.

## Routes prévues

| Route | Qui | Rôle |
|---|---|---|
| `GET /api/badges/moi` | personne connectée | Mon badge (image) |
| `GET /api/badges` | PCO, comité technique | Tous les badges, tous types, filtrables (type, état) |
| `GET /api/badges/telecharger?format=pdf\|zip` | PCO et comité technique (tous) ; resp. Logistique (bénévoles) | Téléchargement groupé, avec les mêmes filtres que la liste |
| `POST /api/badges/{id}/desactiver` | comité technique | Désactiver, avec motif |
| `POST /api/badges/reemettre` | comité technique | Nouveau badge pour une personne |
| `POST /api/personnel` | PCO, comité technique | Créer une personne avec son rôle (avec ou sans compte de connexion) |
| `GET /api/personnel` | PCO, comité technique | Liste du personnel |
| `POST /api/benevoles/demande` | personne connectée | Déposer une demande |
| `GET /api/benevoles/demandes` | resp. Logistique | Liste des demandes |
| `POST /api/benevoles/demandes/{id}/rencontre` | resp. Logistique | Demander une rencontre |
| `POST /api/benevoles/demandes/{id}/accepter` | resp. Logistique | Accepter et envoyer le badge |
| `POST /api/benevoles/demandes/{id}/refuser` | resp. Logistique | Refuser (e-mail de refus) |

## Base de données
 dans `database/personnel/proposition_roles_et_benevoles.sql` (non appliquée) :
- `role_utilisateur` : les rôles de chaque personne ;
- `demande_benevole` : les demandes de bénévoles et leur suivi ;
- `qrcode` : type `benevole`, auteur de la création et de la désactivation, motif ;
- `equipe` : date et auteur de la validation.

Les droits par rôle sont dans le code de l'API, pas dans la base : modifier un droit ne demande aucune migration.

## Ordre de construction
1. **Fait** : rôles, permissions et service des badges (mon badge, liste, téléchargement, désactivation, réémission). Voir `docs/api-badges.md`.
2. **Fait** : création du personnel (compte, rôle, badge). Voir `docs/api-personnel.md`.
3. **Retiré du périmètre** : l'envoi des QR codes aux participants (validation d'équipe) ne fait pas partie de ce service.
4. **Fait** : bénévoles (candidature, rencontre, acceptation, refus). Voir `docs/api-benevoles.md`.
5. Application de scan et affectation des bénévoles aux contextes.

Dépendance ajoutée pour le PDF : `pdf-lib`. Le ZIP est fabriqué sans bibliothèque (`lib/badges/zip.js`).
