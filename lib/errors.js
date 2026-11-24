// Erreur "attendue" : le message est destiné au client, le code est stable
// (le front peut s'en servir pour choisir un affichage).
export class HttpError extends Error {
  // details : informations supplémentaires pour le front (ex. la liste des
  // membres concernés), renvoyées dans le champ "details" de la réponse.
  constructor(status, message, code = "erreur", details = undefined) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Transforme une erreur Supabase/PostgreSQL en HttpError sans exposer les
// détails internes au client (ils restent dans les journaux du serveur).
export function erreurBase(error, contexte = "base de données") {
  if (error?.code === "23505") {
    return new HttpError(409, "Cette information est déjà enregistrée.", "deja_enregistre");
  }
  console.error(`Erreur ${contexte} :`, error);
  return new HttpError(500, "Une erreur est survenue. Veuillez réessayer.", "erreur_base");
}
