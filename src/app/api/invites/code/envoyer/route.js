import { route, preflight } from "@/lib/http";
import { limiter } from "@/lib/rateLimit";
import { valideEmail } from "@/lib/validation";
import { envoyerCode } from "@/lib/verification";
import { verifierFenetre } from "@/lib/invites";

// Envoie un code de vérification à 6 chiffres par e-mail (valable 10 minutes).
// Sert à l'inscription et au renvoi du badge. La réponse est la même que
// l'adresse soit connue ou non.
export const POST = route(async ({ ip, lireJson }) => {
  limiter(`code:${ip}`, 5, 10 * 60_000);

  const corps = await lireJson();
  verifierFenetre();
  const email = valideEmail(corps.email);

  await envoyerCode(email);

  return {
    corps: {
      status: "ok",
      message: "Un code de vérification vous a été envoyé par e-mail.",
    },
  };
}, { service: "api" });

export const OPTIONS = preflight;
