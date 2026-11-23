# Module des badges

Génération de l'image des badges du concours GENIE UPB 2026. Code : `lib/badges/`.

Ce module est indépendant des invités : il sert à tous les types de badge. L'inscription des invités l'utilise déjà (attribution et envoi automatiques). L'attribution des badges aux autres types de personnes est décrite dans `docs/badges-attribution.md` (pas encore codée).

## Les types de badge

| Type (`qrcode.type`) | Gabarit | Particularités |
|---|---|---|
| `invite` | doré, bandeau INVITÉ | |
| `organisateur` | noir | |
| `encadreur` et `formateur` | vert turquoise | un seul badge « Encadreur / Formateur » |
| `jure` | violet | |
| `partenaire` | bleu clair | |
| `benevole` | ardoise (gris bleuté) | |

Les badges des **participants** ne sont pas gérés par ce service : leur envoi est confié à quelqu'un d'autre, et il n'y a ni type ni gabarit « participant ».

## Utilisation

```js
import { genererBadgePng } from "@/lib/badges";

const png = await genererBadgePng({
  jeton,                       // contenu du QR (table qrcode)
  nom: "KOPHY",
  prenom: "Yaho Djack",
  type: "organisateur",        // invite, jure, encadreur, formateur, organisateur, partenaire, benevole
});
```

Le résultat est un `Buffer` PNG (754 x 1280 pixels avec les gabarits actuels). Une erreur claire est levée pour un type inconnu.

## Fichiers

| Fichier | Rôle |
|---|---|
| `lib/badges/index.js` | Point d'entrée du module |
| `lib/badges/gabarits.js` | Choix du gabarit selon le type de badge |
| `lib/badges/service.js`, `telechargement.js`, `zip.js`, `pdf.js`, `filtres.js` | Attribution, listes, téléchargements groupés : voir `docs/api-badges.md` |
| `lib/badges/rendu.js` | Dessin du badge : gabarit + QR + nom, positions dans `MISE_EN_PAGE` |
| `assets/badge/gabarit-*.png` | Gabarits sans QR ni nom (un par type) |
| `assets/fonts/` | Montserrat Bold et Light (licence SIL OFL, `OFL.txt`) |

## Règles d'affichage

- Nom de famille en gras et majuscules, chaque prénom sur sa ligne.
- Un nom trop long passe à la ligne (aux espaces et après les traits d'union) et la taille de police diminue pour tenir dans la zone.
- QR : modules sombres sur une tuile blanche aux coins arrondis (la forme la plus fiable à scanner). Le contenu du QR est uniquement le jeton opaque : aucune donnée personnelle.
- Rien n'est stocké : l'image est recréée à partir du jeton et des informations de la personne.

## Remplacer un gabarit
Déposer le nouveau fichier sous le même nom dans `assets/badge/`. Il doit être **sans QR ni nom** et garder les proportions 754 x 1280 ; les positions s'adaptent à sa largeur. Une version plus grande donne un badge plus net. Les gabarits actuels viennent des images des designs reçus (754 x 1280 pixels).

## Aperçu pendant le développement
Sans base de données, désactivé en production :

```
/api/dev/badge?type=organisateur&nom=KOPHY&prenom=Yaho%20Djack
```

## Ce qui reste à faire
L'attribution des badges aux utilisateurs, comme service à part entière : voir `docs/badges-attribution.md` (droits par rôle, flux, routes prévues). La reconnaissance d'un QR scanné viendra avec l'application de scan.
