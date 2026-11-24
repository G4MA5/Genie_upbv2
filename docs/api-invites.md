# API des invités

Inscription des invités au concours GENIE UPB 2026. Tous les endpoints répondent en JSON. En cas de succès : `{ "status": "ok", ... }`. En cas d'erreur : `{ "status": "error", "code": "...", "message": "..." }`. Le `message` est affichable tel quel à l'utilisateur ; le `code` est stable et sert au front pour choisir un affichage.

Prérequis base de données : `database/invites/schema_invites.sql` doit avoir été lancé. Variables d'environnement : voir `.env.example`.

## Les trois parcours

| Parcours | Étapes |
|---|---|
| Étudiant UPB avec compte (connecté) | `inscription-compte` |
| Étudiant UPB sans compte | `matricule/verifier`, `code/envoyer`, `inscription` (type `etudiant_upb`) |
| Particulier ou entreprise | `code/envoyer`, `inscription` (type `particulier` ou `entreprise`) |

Un étudiant d'une autre école est un `particulier` (pas de matricule, pas de compte).

## Endpoints

### POST /api/invites/matricule/verifier
Vérifie le matricule auprès de l'API des PCO.

Corps : `{ "matricule": "TEST0001" }`
Réponse 200 : `{ "status": "ok", "nom": "KOUAME", "prenom": "Aya Marie", "filiere": "...", "niveau": "...", "token": "..." }` (`filiere` et `niveau` valent `null` si l'API des PCO ne les donne pas). Le front les affiche pour que la personne confirme que c'est bien elle
Le `token` est valable 20 minutes et sera renvoyé à l'inscription.
Erreurs : 404 `matricule_introuvable`, 409 `compte_existant` (un compte existe déjà : se connecter et utiliser `inscription-compte`), 403 `inscriptions_fermees`, 429.

### POST /api/invites/code/envoyer
Envoie un code à 6 chiffres par e-mail (valable 10 minutes, 3 codes maximum par adresse sur cette durée).

Corps : `{ "email": "nom@exemple.com" }`
Réponse 200 : `{ "status": "ok", "message": "..." }`
Erreurs : 400 `champ_invalide`, 429 `trop_de_codes`.

### POST /api/invites/inscription
Crée l'invité, son badge, et envoie le badge par e-mail.

Corps commun : `type_invite`, `email`, `numero`, `code`, `consentement` (doit valoir `true`), `jours_prevus` (facultatif, liste de dates parmi `INVITES_JOURS`).

| `type_invite` | Champs en plus |
|---|---|
| `etudiant_upb` | `token` (reçu de `matricule/verifier`). Nom, prénom, filière, niveau et genre viennent de l'API des PCO. Un compte Genie UPB est créé, avec un lien pour définir le mot de passe dans l'e-mail |
| `particulier` | `nom`, `prenom`, `statut` (ex. parent, prestataire, étudiant d'une autre école) |
| `entreprise` | `nom_entreprise`, `nom`, `prenom` (ceux du représentant). Une inscription = une personne |

Réponse 201 : `{ "status": "ok", "message": "...", "email_envoye": true }`. Si `email_envoye` vaut `false`, l'inscription est valable : proposer « renvoyer mon badge ».
Erreurs : 400 `code_invalide` (faux, expiré ou déjà utilisé), 400 `consentement_requis`, 400 `token_invalide`, 409 `deja_invite`, 409 `compte_existant`, 403 `inscriptions_fermees`, 429.

### POST /api/invites/inscription-compte
Inscription d'un étudiant qui a déjà un compte. En-tête `Authorization: Bearer <jeton de connexion Supabase>`.

Corps : `{ "consentement": true, "jours_prevus": [...], "numero": "..." }` (`numero` obligatoire seulement si le profil n'en a pas).
Réponse 201 : comme `inscription`.
Erreurs : 401 `non_connecte`, 403 `deja_dans_une_equipe` (un compte dans une équipe ne peut pas être invité), 409 `deja_invite`.

### POST /api/invites/badge/renvoyer
Renvoie le badge par e-mail. Demander d'abord un code avec `code/envoyer`.

Corps : `{ "email": "...", "code": "123456" }`
Erreurs : 400 `code_invalide`, 404 `inscription_introuvable`.

## Fausse API des PCO

La vérification des matricules appelle l'API des PCO en HTTP. Contrat :

```
POST {PCO_API_URL}
En-tete : X-API-Key: {PCO_API_KEY}
Corps   : { "matricule": "KOUA1703980001" }
```

`PCO_API_URL` est l'adresse complète du point d'entrée (celle de la vraie API : `https://api.dbupb.synapstic.tech/api/verifier`). Pour un matricule inconnu, cette API répond 404 avec `{ "status": "error", "message": "Matricule non reconnus dans la base I-UPB." }`. Son appel dans le Swagger des PCO ne montre pas d'en-tête de clé : `PCO_API_KEY` peut rester vide, sauf si les PCO en exigent une.

Réponse en cas de succès :

```
{ "status": "success", "message": "Vos informations ont été retrouvées.",
  "data": { "matricule", "nom", "prenoms", "date_naissance", "telephone",
            "email", "sexe", "allergies_affection", "filiere", "niveau" } }
```

Données conservées : matricule, nom, prénoms, sexe, filière, niveau. **Jamais lus ni stockés** : date de naissance, téléphone, e-mail et allergies ou affections (donnée de santé). Le téléphone et l'e-mail de l'invité sont ceux qu'il saisit lui-même.

En attendant, `POST /api/mock-pco/partenaire/verifier` imite cette API avec le même contrat. Matricules de test : `TEST0001` à `TEST0005` (`TEST0001` : KOUAME Aya Marie).

Réponses gérées par `lib/pco.js` :

| Réponse de l'API | Résultat côté invités |
|---|---|
| 200 avec nom et prénom(s) | Étudiant trouvé (l'étudiant peut être à la racine ou dans `etudiant`, `student`, `data`, `resultat` ou `result`) |
| 200 avec `valide`, `valid`, `existe`, `found` ou `trouve` à `false` | Matricule introuvable |
| 404, 400 ou 422 | Matricule introuvable |
| 401 ou 403 | Erreur de configuration (clé refusée), message générique au client |
| autre erreur, panne, délai de 8 secondes dépassé | « Service de vérification indisponible » |

Si la réponse ne contient ni nom ni prénom, le serveur affiche dans sa console les NOMS des champs reçus (jamais leurs valeurs) : il suffit alors d'adapter `normaliser` dans `lib/pco.js`.

Pour passer de la fausse à la vraie API : changer `PCO_API_URL` et `PCO_API_KEY` dans `.env.local` (plus rien d'autre). La route `src/app/api/mock-pco` peut ensuite être supprimée (elle est désactivée en production sauf si `PCO_MOCK_ENABLED=true`).

## Où est le code

| Fichier | Rôle |
|---|---|
| `lib/invites.js` | Règles métier de l'inscription |
| `lib/verification.js` | Codes par e-mail (hachés, 10 min, 5 essais) |
| `lib/pco.js` | Appel de l'API des PCO |
| `lib/brevo.js`, `lib/emails.js` | Envoi et modèles d'e-mails |
| `lib/badges/` | Module des badges : image (gabarit + QR + nom), voir `docs/badges.md` |
| `lib/qr.js` | QR code seul (repli si le badge illustré échoue) |
| `lib/http.js`, `lib/errors.js`, `lib/rateLimit.js`, `lib/validation.js`, `lib/securite.js` | Briques communes |
| `lib/supabaseServer.js` | Client Supabase serveur (clé service role, sans session) |

## Le badge (image envoyée par e-mail)

L'image du badge (gabarit du design, QR code, nom) est générée par le module `lib/badges/` (voir `docs/badges.md`) et jointe à l'e-mail sous le nom `badge-genie-upb.png`.

- **Rien n'est stocké** : la table `qrcode` ne garde que le jeton aléatoire (le contenu du QR). L'image est recréée à partir du jeton et du nom à chaque envoi ou renvoi.
- **Fichiers** (dossier `assets/`) : `badge/gabarit-invite.png` (fond sans QR ni nom) et `fonts/Montserrat-Bold.ttf`, `fonts/Montserrat-Light.ttf` (licence SIL OFL, voir `assets/fonts/OFL.txt`).
- **Remplacer le gabarit** par une version plus nette (sans QR ni nom) : déposer le nouveau fichier sous le même nom. Les positions sont calculées en proportion de sa largeur ; le design de référence fait 754 x 1280 pixels (le gabarit doit garder les mêmes proportions).
- **Régler la mise en page** (position du QR, du nom, tailles) : constante `MISE_EN_PAGE` en haut de `lib/badges/rendu.js`.
- **QR** : modules sombres sur une tuile blanche aux coins arrondis, plutôt que blancs sur fond doré comme dans la maquette : c'est la forme que les lecteurs de QR lisent le plus sûrement. Lecture vérifiée en taille réelle et réduite à 40 %.
- **Noms longs** : le nom et les prénoms passent à la ligne et la taille de police diminue pour tenir dans la zone.
- **Si la génération échoue** (fichier manquant, par exemple), l'e-mail part avec le QR seul au lieu d'être bloqué, et l'erreur s'affiche dans la console.
- **Autres types de badge** (juré, organisateur, participant...) : déjà gérés par le même module, voir `docs/badges.md`.

Aperçu pendant le développement (sans base de données, désactivé en production) :

```
GET /api/dev/badge?nom=KOPHY&prenom=Yaho%20Djack
```

Ouvrir cette adresse dans le navigateur affiche le badge.

## Tester en local sans Brevo

Sans `BREVO_API_KEY`, en développement, les e-mails ne partent pas : leur texte (donc le code de vérification) s'affiche dans la console du serveur.

## Limites connues

- Le limiteur de requêtes par adresse IP est en mémoire (non partagé entre plusieurs instances du serveur). Les limites sur les codes sont, elles, comptées en base.
- Le scan du badge (entrée, sortie) n'est pas encore implémenté.
