import { route, preflight } from "@/lib/http";
import { limiter } from "@/lib/rateLimit";
import { inscrire } from "@/lib/invites";

// Inscription publique d'un invité : étudiant UPB sans compte, particulier
// ou entreprise. Corps attendu : voir docs/api-invites.md.
export const POST = route(async ({ ip, lireJson }) => {
  limiter(`inscription:${ip}`, 10, 10 * 60_000);

  const corps = await lireJson();
  return { status: 201, corps: await inscrire(corps) };
}, { service: "api" });

export const OPTIONS = preflight;
