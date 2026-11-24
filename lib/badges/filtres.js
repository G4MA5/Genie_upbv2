import { HttpError } from "../errors.js";
import { valideEntier } from "../validation.js";
import { TYPES_BADGE } from "./gabarits.js";
import { PAR_PAGE_AUTORISES } from "./pdf.js";

// Lecture et contrôle des paramètres d'adresse des routes de badges.
//   type, actif (true ou false), q (recherche), page, limite,
//   format (zip ou pdf), par_page (6 ou 12)
export function lireFiltres(searchParams) {
  const sp = searchParams;

  const type = sp.get("type") || undefined;
  if (type && !TYPES_BADGE.includes(type)) {
    throw new HttpError(400, "Le type de badge est invalide.", "type_badge_invalide");
  }

  let actif;
  const a = sp.get("actif");
  if (a === "true") actif = true;
  else if (a === "false") actif = false;
  else if (a && a !== "tous") {
    throw new HttpError(400, "Le champ « actif » est invalide.", "champ_invalide");
  }

  const format = sp.get("format") || "zip";
  if (!["zip", "pdf"].includes(format)) {
    throw new HttpError(400, "Le format doit être zip ou pdf.", "format_invalide");
  }

  let parPage = 6;
  if (sp.get("par_page")) {
    parPage = valideEntier(sp.get("par_page"), "par_page");
    if (!PAR_PAGE_AUTORISES.includes(parPage)) {
      throw new HttpError(
        400,
        `par_page doit valoir ${PAR_PAGE_AUTORISES.join(" ou ")}.`,
        "champ_invalide"
      );
    }
  }

  return {
    type,
    actif,
    q: sp.get("q") || undefined,
    page: sp.get("page") ? valideEntier(sp.get("page"), "page") : 1,
    limite: sp.get("limite") ? Math.min(valideEntier(sp.get("limite"), "limite"), 200) : 50,
    format,
    parPage,
  };
}
