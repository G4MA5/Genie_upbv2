import { createClient } from "@supabase/supabase-js";
import { HttpError } from "./errors.js";

// Client Supabase avec la clé service role, réservé au serveur.
// Différences avec lib/supabaseClient.js : aucune session n'est conservée
// (un serveur ne doit pas mémoriser un utilisateur entre deux requêtes) et le
// client n'est créé qu'au premier usage, pour ne pas planter au chargement
// quand les variables d'environnement manquent.
// Les noms de variables existants (minuscules) sont conservés.
let client;

export function getSupabaseAdmin() {
  if (!client) {
    const url = process.env.supabase_url ?? process.env.SUPABASE_URL;
    const cle =
      process.env.supabase_service_role_key ??
      process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !cle) {
      console.error("supabase_url ou supabase_service_role_key manquant.");
      throw new HttpError(500, "Configuration du serveur incomplète.", "config");
    }
    client = createClient(url, cle, {
      auth: { persistSession: false, autoRefreshToken: false },
      // Un appel qui n'aboutit pas en 15 secondes échoue au lieu de laisser
      // la requête tourner indéfiniment.
      global: {
        fetch: (ressource, options = {}) =>
          fetch(ressource, {
            ...options,
            signal: options.signal ?? AbortSignal.timeout(15000),
          }),
      },
    });
  }
  return client;
}
