import { HttpError } from "./errors.js";

// Client du service des badges, utilisé par l'API principale.
//
// En production, les badges sont gérés par un serveur séparé (SERVICE=badges) :
// l'API principale l'appelle en HTTP avec la clé secrète partagée.
//   BADGES_SERVICE_URL   adresse du service (ex. https://badges-genie-upb.onrender.com)
//   BADGES_SERVICE_KEY   clé secrète, la même sur les deux serveurs
//
// En développement, sans BADGES_SERVICE_URL, un seul serveur fait tout : le
// code du service est alors appelé directement, sans HTTP.

const MESSAGE_INDISPONIBLE =
  "Le service des badges est momentanément indisponible. Réessayez dans un instant.";

// Attribue un badge à une personne et l'envoie par e-mail.
// Renvoie { type, cree, email_envoye }. Voir lib/badges/attribution.js.
export async function attribuerBadge({
  idUser,
  type,
  typeInvite,
  lienMotDePasse,
  creePar,
  renvoyer = false,
}) {
  const base = process.env.BADGES_SERVICE_URL;

  // Mode « un seul serveur » (développement).
  if (!base) {
    const { attribuerEtEnvoyer } = await import("./badges/attribution.js");
    return attribuerEtEnvoyer({ idUser, type, typeInvite, lienMotDePasse, creePar, renvoyer });
  }

  const cle = process.env.BADGES_SERVICE_KEY;
  if (!cle) {
    console.error("BADGES_SERVICE_KEY manquante : impossible d'appeler le service des badges.");
    throw new HttpError(500, "Configuration du serveur incomplète.", "config");
  }

  let res;
  try {
    // Délai long : un service gratuit endormi met jusqu'à une minute à se réveiller.
    res = await fetch(`${base.replace(/\/$/, "")}/api/interne/badges/attribuer`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Service-Key": cle },
      body: JSON.stringify({
        id_user: idUser,
        type,
        type_invite: typeInvite,
        lien_mot_de_passe: lienMotDePasse,
        cree_par: creePar,
        renvoyer,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(60_000),
    });
  } catch (e) {
    console.error("Service des badges injoignable :", e);
    throw new HttpError(503, MESSAGE_INDISPONIBLE, "badges_indisponible");
  }

  let corps = null;
  try {
    corps = await res.json();
  } catch {
    // réponse non JSON : traitée comme une panne plus bas
  }

  if (!res.ok) {
    // Refus normal du service (personne introuvable, badge d'un autre type...) :
    // on relaie son message. Un refus d'accès (clé fausse) est une panne de
    // configuration : message générique côté client, détail dans les journaux.
    if (corps?.code && res.status >= 400 && res.status < 500 && res.status !== 401 && res.status !== 403) {
      throw new HttpError(res.status, corps.message, corps.code);
    }
    console.error("Service des badges : réponse", res.status, corps);
    throw new HttpError(503, MESSAGE_INDISPONIBLE, "badges_indisponible");
  }

  return { type: corps.type, cree: corps.cree === true, email_envoye: corps.email_envoye === true };
}
