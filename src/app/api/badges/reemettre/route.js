import { route, preflight } from "@/lib/http";
import { limiter } from "@/lib/rateLimit";
import { contexteUtilisateur } from "@/lib/auth";
import { peutDesactiver, exiger } from "@/lib/permissions";
import { valideEntier } from "@/lib/validation";
import { reemettreBadge } from "@/lib/badges";

// Réémet le badge d'une personne : désactive son badge actif, en crée un
// nouveau et l'envoie par e-mail. Réservé au comité technique.
// Corps : { "id_user": 42 }  (et "type" si la personne n'a pas de badge actif)
export const POST = route(async ({ req, lireJson }) => {
  const ctx = await contexteUtilisateur(req);
  exiger(peutDesactiver(ctx), "Seul le comité technique peut réémettre un badge.");
  limiter(`badge-reemettre:${ctx.user.id}`, 30, 10 * 60_000);

  const corps = await lireJson();
  const resultat = await reemettreBadge({
    idUser: valideEntier(corps.id_user, "id_user"),
    par: ctx.user.id,
    type: corps.type || undefined,
  });
  return {
    corps: {
      status: "ok",
      message: resultat.email_envoye
        ? "Un nouveau badge a été créé et envoyé par e-mail."
        : "Un nouveau badge a été créé, mais l'e-mail n'a pas pu être envoyé.",
      ...resultat,
    },
  };
}, { service: "badges" });

export const OPTIONS = preflight;
