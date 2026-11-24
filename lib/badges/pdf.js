import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import sharp from "sharp";

// PDF A4 d'impression : plusieurs badges par page, avec repères de coupe.
//
// Deux mises en page (à valider avec une impression test) :
//   6 par page : 3 colonnes x 2 lignes, badges de 62 x 105 mm
//  12 par page : 4 colonnes x 3 lignes, badges de 47 x 80 mm
// Les proportions sont celles des badges (754 x 1280). Un petit espace sépare
// les badges, et des traits aux quatre coins de chacun guident la découpe.

const MM = 72 / 25.4; // millimètres -> points PDF
const A4 = [595.28, 841.89];
const ECART_MM = 4;

const MISES_EN_PAGE = {
  6: { colonnes: 3, lignes: 2, largeur: 62, hauteur: 105 },
  12: { colonnes: 4, lignes: 3, largeur: 47, hauteur: 80 },
};

export const PAR_PAGE_AUTORISES = Object.keys(MISES_EN_PAGE).map(Number);

// images : [{ jpeg: Buffer }] (ou { png: Buffer }, converti ici) dans l'ordre d'impression.
export async function creerPdf(images, { parPage = 6 } = {}) {
  const cfg = MISES_EN_PAGE[parPage] ?? MISES_EN_PAGE[6];
  const parPageReel = cfg.colonnes * cfg.lignes;

  const pdf = await PDFDocument.create();
  pdf.setTitle("Badges GENIE UPB 2026");
  const police = await pdf.embedFont(StandardFonts.Helvetica);

  const largeurGrille = (cfg.colonnes * cfg.largeur + (cfg.colonnes - 1) * ECART_MM) * MM;
  const hauteurGrille = (cfg.lignes * cfg.hauteur + (cfg.lignes - 1) * ECART_MM) * MM;
  const x0 = (A4[0] - largeurGrille) / 2;
  const yHaut = (A4[1] + hauteurGrille) / 2;

  const nbPages = Math.max(1, Math.ceil(images.length / parPageReel));
  const traitRepere = { thickness: 0.4, color: rgb(0.35, 0.35, 0.35) };
  const decalage = 1.2 * MM; // distance entre le badge et le repère
  const longueur = 3 * MM;

  for (let p = 0; p < nbPages; p++) {
    const page = pdf.addPage(A4);

    const lot = images.slice(p * parPageReel, (p + 1) * parPageReel);
    for (let k = 0; k < lot.length; k++) {
      // Les images sont en JPEG : un PDF bien plus léger, sans différence
      // visible à l'impression.
      const jpeg = lot[k].jpeg ?? (await sharp(lot[k].png).jpeg({ quality: 90 }).toBuffer());
      const image = await pdf.embedJpg(jpeg);

      const colonne = k % cfg.colonnes;
      const ligne = Math.floor(k / cfg.colonnes);
      const l = cfg.largeur * MM;
      const h = cfg.hauteur * MM;
      const x = x0 + colonne * (cfg.largeur + ECART_MM) * MM;
      const y = yHaut - ligne * (cfg.hauteur + ECART_MM) * MM - h;

      page.drawImage(image, { x, y, width: l, height: h });

      // Repères de coupe aux quatre coins.
      for (const [cx, cy, sx, sy] of [
        [x, y, -1, -1],
        [x + l, y, 1, -1],
        [x, y + h, -1, 1],
        [x + l, y + h, 1, 1],
      ]) {
        page.drawLine({
          start: { x: cx + sx * decalage, y: cy },
          end: { x: cx + sx * (decalage + longueur), y: cy },
          ...traitRepere,
        });
        page.drawLine({
          start: { x: cx, y: cy + sy * decalage },
          end: { x: cx, y: cy + sy * (decalage + longueur) },
          ...traitRepere,
        });
      }
    }

    page.drawText(`GENIE UPB 2026 - badges - page ${p + 1} sur ${nbPages}`, {
      x: 28,
      y: 18,
      size: 7,
      font: police,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  return Buffer.from(await pdf.save());
}
