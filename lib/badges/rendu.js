import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import QRCode from "qrcode";
import opentype from "opentype.js";
import { fichierGabarit } from "./gabarits.js";

// Génération de l'image d'un badge (PNG) : gabarit + QR code + nom.
//
// Rien n'est stocké : l'image est recréée à partir du jeton (table qrcode) et
// des informations de la personne chaque fois qu'il faut l'envoyer.
//
// Fichiers utilisés (dossier assets/) :
//   badge/gabarit-*.png         gabarits SANS QR ni nom (remplaçables par des
//                                versions plus nettes : les positions sont
//                                calculées en proportion de leur largeur)
//   fonts/Montserrat-Bold.ttf   nom de famille
//   fonts/Montserrat-Light.ttf  prénoms
//
// Positions : exprimées dans le repère de 754 x 1280 pixels des designs reçus
// (identique pour tous les types de badge).

const REF_LARGEUR = 754;

const MISE_EN_PAGE = {
  qr: { x: 57, y: 916, taille: 316, rayon: 14 },
  texte: {
    x: 427,
    haut: 916, // haut des majuscules de la première ligne
    largeurMax: 297,
    basMax: 1250,
    tailleMax: 50,
    tailleMin: 24,
    interligne: 1.45, // espace entre deux lignes, en multiple de la taille
    hautMajuscule: 0.74, // hauteur des majuscules, en multiple de la taille
    couleur: "#ffffff",
  },
};

const cache = { polices: null, gabarits: new Map() };

function cheminAsset(...morceaux) {
  return path.join(process.cwd(), "assets", ...morceaux);
}

async function chargerPolices() {
  if (!cache.polices) {
    const lire = async (nom) => {
      const tampon = await readFile(cheminAsset("fonts", nom));
      return opentype.parse(
        tampon.buffer.slice(tampon.byteOffset, tampon.byteOffset + tampon.byteLength)
      );
    };
    cache.polices = {
      gras: await lire("Montserrat-Bold.ttf"),
      fin: await lire("Montserrat-Light.ttf"),
    };
  }
  return cache.polices;
}

async function chargerGabarit(fichier) {
  if (!cache.gabarits.has(fichier)) {
    cache.gabarits.set(fichier, await readFile(cheminAsset("badge", fichier)));
  }
  return cache.gabarits.get(fichier);
}

// "KOUAME" -> "Kouame", "jean-marc" -> "Jean-Marc"
function titre(mot) {
  return mot
    .toLowerCase()
    .replace(/(^|[-'’])(\p{L})/gu, (_, sep, lettre) => sep + lettre.toLocaleUpperCase("fr"));
}

// Blocs de texte : le nom en gras, puis chaque prénom, chacun sur sa ligne.
function blocsDuNom(nom, prenom) {
  const blocs = [{ texte: nom.trim().toLocaleUpperCase("fr"), police: "gras" }];
  for (const p of prenom.trim().split(/\s+/).filter(Boolean)) {
    blocs.push({ texte: titre(p), police: "fin" });
  }
  return blocs;
}

// Coupe un texte trop long en plusieurs lignes, aux espaces et après les
// traits d'union. Renvoie null si un mot seul dépasse la largeur disponible.
function couper(texte, police, taille, largeurMax) {
  const largeur = (t) => police.getAdvanceWidth(t, taille);
  const mots = texte.split(/(?<=-)|\s+/).filter(Boolean);
  const lignes = [];
  let courante = "";
  for (const mot of mots) {
    const essai = courante === "" ? mot : courante + (courante.endsWith("-") ? "" : " ") + mot;
    if (largeur(essai) <= largeurMax) {
      courante = essai;
    } else {
      if (courante !== "") lignes.push(courante);
      courante = mot;
    }
  }
  if (courante !== "") lignes.push(courante);
  return lignes.every((l) => largeur(l) <= largeurMax) ? lignes : null;
}

// Cherche la plus grande taille de police (de tailleMax à tailleMin) pour
// laquelle le nom et les prénoms tiennent dans la largeur et la hauteur
// disponibles.
function disposer(blocs, polices, mep) {
  const t = mep.texte;
  const construire = (taille) => {
    const lignes = [];
    for (const b of blocs) {
      const morceaux = couper(b.texte, polices[b.police], taille, t.largeurMax);
      if (!morceaux) return null;
      for (const m of morceaux) lignes.push({ texte: m, police: b.police });
    }
    return lignes;
  };
  const tient = (lignes, taille) =>
    t.haut + taille * t.hautMajuscule + (lignes.length - 1) * taille * t.interligne <= t.basMax;

  for (let taille = t.tailleMax; taille >= t.tailleMin; taille -= 2) {
    const lignes = construire(taille);
    if (lignes && tient(lignes, taille)) return { taille, lignes };
  }
  // Dernier recours : taille minimale, sans coupure supplémentaire.
  return { taille: t.tailleMin, lignes: blocs };
}

function cheminsTexte(blocs, polices, mep, echelle) {
  const { taille, lignes } = disposer(blocs, polices, mep);
  const t = mep.texte;
  let baseline = t.haut + taille * t.hautMajuscule;
  const chemins = [];
  for (const l of lignes) {
    const trace = polices[l.police].getPath(
      l.texte,
      t.x * echelle,
      baseline * echelle,
      taille * echelle
    );
    chemins.push(trace.toPathData(2));
    baseline += taille * t.interligne;
  }
  return chemins;
}

// QR sombre sur fond blanc (le plus fiable à scanner), aux coins arrondis.
async function imageQr(jeton, taille, rayon) {
  const brut = await QRCode.toBuffer(jeton, {
    type: "png",
    width: taille,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#1a1a1a", light: "#ffffff" },
  });
  const masque = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${taille}" height="${taille}">
       <rect width="${taille}" height="${taille}" rx="${rayon}" ry="${rayon}" fill="#fff"/>
     </svg>`
  );
  return sharp(brut)
    .resize(taille, taille)
    .composite([{ input: masque, blend: "dest-in" }])
    .png()
    .toBuffer();
}

// Renvoie l'image du badge (Buffer PNG).
//   jeton       contenu du QR (table qrcode)
//   nom, prenom identité affichée
//   type        invite, jure, encadreur, formateur, organisateur, partenaire
//               ou benevole
export async function genererBadgePng({ jeton, nom, prenom, type = "invite" }) {
  const fichier = fichierGabarit(type);
  const [gabarit, polices] = await Promise.all([chargerGabarit(fichier), chargerPolices()]);

  const meta = await sharp(gabarit).metadata();
  const echelle = meta.width / REF_LARGEUR;
  const mep = MISE_EN_PAGE;

  const tailleQr = Math.round(mep.qr.taille * echelle);
  const qr = await imageQr(jeton, tailleQr, Math.round(mep.qr.rayon * echelle));

  const chemins = cheminsTexte(blocsDuNom(nom, prenom), polices, mep, echelle);
  const svgTexte = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}">
       ${chemins.map((d) => `<path d="${d}" fill="${mep.texte.couleur}"/>`).join("\n")}
     </svg>`
  );

  return sharp(gabarit)
    .composite([
      { input: qr, left: Math.round(mep.qr.x * echelle), top: Math.round(mep.qr.y * echelle) },
      { input: svgTexte, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}
