import { route, preflight } from "@/lib/http";
import { HttpError } from "@/lib/errors";
import { limiter } from "@/lib/rateLimit";
import { contexteUtilisateur } from "@/lib/auth";
import { portee, exiger } from "@/lib/permissions";
import { selectionPourTelechargement, fabriquerTelechargement } from "@/lib/badges";
import { lireFiltres } from "@/lib/badges/filtres";

// Téléchargement groupé des badges pour l'impression.
//   ?format=pdf|zip   (zip par défaut)
//   &par_page=6|12    (PDF : badges par page A4)
//   &type=jure  &actif=false
// PCO et comité technique : tout. Responsable Logistique : les bénévoles.
export const GET = route(async ({ req }) => {
  const ctx = await contexteUtilisateur(req);
  limiter(`telechargement:${ctx.user.id}`, 6, 10 * 60_000);

  const p = portee(ctx);
  exiger(p.tous || p.benevoles, "Vous n'avez pas accès au téléchargement.");

  const f = lireFiltres(new URL(req.url).searchParams);
  const items = await selectionPourTelechargement({
    portee: p,
    type: f.type,
    actif: f.actif,
    format: f.format,
  });
  if (!items.length) {
    throw new HttpError(404, "Aucun badge ne correspond à cette sélection.", "aucun_badge");
  }

  const fichier = await fabriquerTelechargement(items, { format: f.format, parPage: f.parPage });
  return {
    fichier: { contenu: fichier.contenu, type: fichier.type, nom: fichier.nom },
    entetes: { "X-Badges-Ignores": String(fichier.ignores) },
  };
}, { service: "badges" });

export const OPTIONS = preflight;
