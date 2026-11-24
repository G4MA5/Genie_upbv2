import { route, preflight } from "@/lib/http";
import { HttpError } from "@/lib/errors";
import { limiter } from "@/lib/rateLimit";
import { contexteUtilisateur } from "@/lib/auth";
import { portee } from "@/lib/permissions";
import { valideEntier } from "@/lib/validation";
import { badgeParId, userParId, imageDuBadge } from "@/lib/badges";

// Image d'un badge précis. Autorisé pour :
//   - le propriétaire du badge ;
//   - les PCO et le comité technique (tous les badges) ;
//   - le responsable Logistique (badges des bénévoles).
export const GET = route(async ({ req, params }) => {
  const ctx = await contexteUtilisateur(req);
  limiter(`badge-image:${ctx.user.id}`, 120, 60_000);

  const { id } = await params;
  const idBadge = valideEntier(id, "id");

  const qr = await badgeParId(idBadge);
  const refus = new HttpError(404, "Badge introuvable.", "badge_introuvable");
  if (!qr) throw refus;

  const user = await userParId(qr.id_user);
  if (!user) throw refus;

  const p = portee(ctx);
  let autorise = user.id === ctx.user.id || p.tous;
  if (!autorise && qr.type === "benevole" && p.benevoles) autorise = true;
  // Même message qu'un badge inexistant : on ne révèle pas son existence.
  if (!autorise) throw refus;

  let png;
  try {
    png = await imageDuBadge({ qr, user });
  } catch (e) {
    console.error("Badge non générable :", e);
    throw new HttpError(422, "Ce badge ne peut pas être généré.", "badge_non_generable");
  }
  return {
    fichier: { contenu: png, type: "image/png", nom: `badge-${qr.id}.png`, en_ligne: true },
  };
}, { service: "badges" });

export const OPTIONS = preflight;
