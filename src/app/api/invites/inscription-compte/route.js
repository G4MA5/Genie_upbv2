import { route, preflight } from "@/lib/http";
import { HttpError } from "@/lib/errors";
import { limiter } from "@/lib/rateLimit";
import { inscrireDepuisCompte } from "@/lib/invites";

// Inscription comme invité d'un étudiant qui a déjà un compte Genie UPB.
// Exige l'en-tête Authorization: Bearer <jeton de connexion>.
export const POST = route(async ({ req, ip, lireJson }) => {
  limiter(`inscription-compte:${ip}`, 10, 10 * 60_000);

  const entete = req.headers.get("authorization") ?? "";
  const jeton = entete.startsWith("Bearer ") ? entete.slice(7).trim() : "";
  if (!jeton) {
    throw new HttpError(401, "Vous devez être connecté.", "non_connecte");
  }

  const corps = await lireJson();
  return { status: 201, corps: await inscrireDepuisCompte(jeton, corps) };
}, { service: "api" });

export const OPTIONS = preflight;
