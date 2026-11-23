import sharp from "sharp";
import { imageDuBadge, enParLots } from "./service.js";
import { creerZip } from "./zip.js";
import { creerPdf } from "./pdf.js";

// Fabrication des fichiers de téléchargement groupé (ZIP d'images ou PDF A4).

function simplifier(texte) {
  return (
    String(texte ?? "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "sans-nom"
  );
}

// Ordre d'impression : par type puis par nom.
function trier(items) {
  const cle = (i) =>
    [i.qr.type, i.user.nom ?? "", i.user.prenom ?? ""].join("|").toLowerCase();
  return [...items].sort((a, b) => cle(a).localeCompare(cle(b), "fr"));
}

// Génère les images (8 à la fois). Pour un PDF, chaque image est convertie en
// JPEG tout de suite : on ne garde en mémoire que ~100 Ko par badge au lieu de
// ~420 Ko. Les badges impossibles à générer (catégorie inconnue, par exemple)
// sont mis de côté avec leur raison.
async function genererImages(items, format) {
  const triees = trier(items);
  const sorties = await enParLots(triees, 8, async (item) => {
    try {
      const png = await imageDuBadge(item);
      if (format === "pdf") {
        return { item, jpeg: await sharp(png).jpeg({ quality: 90 }).toBuffer() };
      }
      return { item, png };
    } catch (e) {
      return { item, erreur: e.message };
    }
  });
  return {
    images: sorties.filter((s) => s.png || s.jpeg),
    ignores: sorties.filter((s) => !s.png && !s.jpeg),
  };
}

function nomFichier(item) {
  const personne = simplifier(`${item.user.nom ?? ""} ${item.user.prenom ?? ""}`);
  return `${simplifier(item.qr.type)}/${personne}-${item.qr.id}.png`;
}

function rapportIgnores(ignores) {
  return [
    "Badges qui n'ont pas pu être générés :",
    "",
    ...ignores.map(
      (i) => `- badge ${i.item.qr.id} (${i.item.user.nom ?? ""} ${i.item.user.prenom ?? ""}) : ${i.erreur}`
    ),
    "",
  ].join("\n");
}

// Renvoie { contenu, type, nom, ignores } prêt à être envoyé au client.
export async function fabriquerTelechargement(items, { format = "zip", parPage = 6 } = {}) {
  const { images, ignores } = await genererImages(items, format);

  if (format === "pdf") {
    const contenu = await creerPdf(
      images.map((s) => ({ jpeg: s.jpeg })),
      { parPage }
    );
    return { contenu, type: "application/pdf", nom: "badges-genie-upb.pdf", ignores: ignores.length };
  }

  const fichiers = images.map((s) => ({ nom: nomFichier(s.item), donnees: s.png }));
  if (ignores.length) {
    fichiers.push({
      nom: "badges-non-generes.txt",
      donnees: Buffer.from(rapportIgnores(ignores), "utf8"),
    });
  }
  return {
    contenu: creerZip(fichiers),
    type: "application/zip",
    nom: "badges-genie-upb.zip",
    ignores: ignores.length,
  };
}
