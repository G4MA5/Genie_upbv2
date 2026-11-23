// Choix du gabarit de badge.
//
// Les gabarits sont des images (dossier assets/badge/) SANS QR ni nom : le
// fond, les logos et le bandeau du type de badge y sont déjà dessinés.
//
// Les badges des participants ne sont pas gérés par ce service (leur envoi est
// confié à quelqu'un d'autre) : il n'y a donc ni type ni gabarit "participant".

// Types de badge (valeurs de qrcode.type dans la base).
export const TYPES_BADGE = [
  "invite",
  "jure",
  "encadreur",
  "formateur",
  "organisateur",
  "partenaire",
  "benevole",
];

const FICHIERS = {
  invite: "gabarit-invite.png",
  jure: "gabarit-jure.png",
  encadreur: "gabarit-encadreur.png",
  formateur: "gabarit-encadreur.png", // un seul badge "Encadreur / Formateur"
  organisateur: "gabarit-organisateur.png",
  partenaire: "gabarit-partenaire.png",
  benevole: "gabarit-benevole.png", // ardoise
};

// Nom du fichier de gabarit d'un type de badge. Lève une erreur claire si le
// type est inconnu.
export function fichierGabarit(type) {
  const fichier = FICHIERS[type];
  if (!fichier) throw new Error(`Type de badge inconnu : "${type}"`);
  return fichier;
}
