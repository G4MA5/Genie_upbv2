import { route, preflight } from "@/lib/http";
import { HttpError } from "@/lib/errors";
import { limiter } from "@/lib/rateLimit";
import { contexteUtilisateur } from "@/lib/auth";
import { badgeActifDe, imageDuBadge } from "@/lib/badges";

// Mon badge : l'image du badge actif de la personne connectée (espace personnel).
export const GET = route(async ({ req }) => {
  const ctx = await contexteUtilisateur(req);
  limiter(`badge-moi:${ctx.user.id}`, 60, 60_000);

  const qr = await badgeActifDe(ctx.user.id);
  if (!qr) throw new HttpError(404, "Vous n'avez pas encore de badge.", "aucun_badge");

  let png;
  try {
    png = await imageDuBadge({ qr, user: ctx.user });
  } catch (e) {
    console.error("Badge non générable :", e);
    throw new HttpError(
      422,
      "Votre badge ne peut pas être généré pour le moment. Contactez les organisateurs.",
      "badge_non_generable"
    );
  }

  return {
    fichier: { contenu: png, type: "image/png", nom: "badge-genie-upb.png", en_ligne: true },
  };
}, { service: "badges" });

export const OPTIONS = preflight;
