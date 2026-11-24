import { HttpError } from "./errors.js";
import { egal } from "./securite.js";

// Protection des routes INTERNES : appelées d'un serveur à l'autre (l'API
// principale demande au service des badges), jamais par un navigateur.
// Les deux serveurs partagent la même clé secrète BADGES_SERVICE_KEY, envoyée
// dans l'en-tête X-Service-Key.
export function exigerCleService(req) {
  const attendue = process.env.BADGES_SERVICE_KEY;
  if (!attendue || attendue.length < 16) {
    console.error("BADGES_SERVICE_KEY manquante ou trop courte (16 caractères minimum).");
    throw new HttpError(500, "Configuration du serveur incomplète.", "config");
  }
  const recue = req.headers.get("x-service-key") ?? "";
  if (!egal(recue, attendue)) {
    throw new HttpError(401, "Clé de service invalide.", "cle_invalide");
  }
}
