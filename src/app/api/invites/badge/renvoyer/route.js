import { route, preflight } from "@/lib/http";
import { limiter } from "@/lib/rateLimit";
import { renvoyerBadge } from "@/lib/invites";

// Renvoie le badge par e-mail. Il faut d'abord demander un code avec
// POST /api/invites/code/envoyer, puis envoyer { email, code } ici.
export const POST = route(async ({ ip, lireJson }) => {
  limiter(`badge:${ip}`, 10, 10 * 60_000);

  const corps = await lireJson();
  return { corps: await renvoyerBadge(corps) };
}, { service: "api" });

export const OPTIONS = preflight;
