// Module des badges : point d'entrée unique.
//
// - rendu : image d'un badge (gabarit + QR + nom)
// - gabarits : choix du gabarit
// - service : attribution, consultation, désactivation, réémission, envoi
// - telechargement : ZIP d'images et PDF A4 d'impression
// Voir docs/badges.md et docs/badges-attribution.md.
export { genererBadgePng } from "./rendu.js";
export { TYPES_BADGE, fichierGabarit } from "./gabarits.js";
export {
  badgeActifDe,
  badgeParId,
  obtenirOuCreerBadge,
  envoyerBadgeParEmail,
  imageDuBadge,
  desactiverBadge,
  reemettreBadge,
  listerBadges,
  selectionPourTelechargement,
  userParId,
} from "./service.js";
export { fabriquerTelechargement } from "./telechargement.js";
