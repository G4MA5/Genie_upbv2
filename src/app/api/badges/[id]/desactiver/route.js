import { route, preflight } from "@/lib/http";
import { limiter } from "@/lib/rateLimit";
import { contexteUtilisateur } from "@/lib/auth";
import { peutDesactiver, exiger } from "@/lib/permissions";
import { valideEntier } from "@/lib/validation";
import { desactiverBadge } from "@/lib/badges";

// Désactive un badge (perdu, volé...). Réservé au comité technique.
// Corps : { "motif": "Badge perdu" }
// Le QR de ce badge est refusé ensuite. Pour en donner un nouveau à la
// personne, utiliser POST /api/badges/reemettre.
export const POST = route(async ({ req, params, lireJson }) => {
  const ctx = await contexteUtilisateur(req);
  exiger(peutDesactiver(ctx), "Seul le comité technique peut désactiver un badge.");
  limiter(`badge-desactiver:${ctx.user.id}`, 30, 10 * 60_000);

  const { id } = await params;
  const corps = await lireJson();
  const badge = await desactiverBadge({
    id: valideEntier(id, "id"),
    par: ctx.user.id,
    motif: corps.motif,
  });
  return {
    corps: { status: "ok", message: "Le badge a été désactivé.", badge: { id: badge.id, type: badge.type } },
  };
}, { service: "badges" });

export const OPTIONS = preflight;
