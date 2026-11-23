import { HttpError } from "./errors.js";

// Envoi d'e-mails avec Brevo (API transactionnelle).
// En développement, sans BREVO_API_KEY, l'e-mail n'est pas envoyé : son
// contenu texte est affiché dans la console du serveur (le code de
// vérification y est lisible). En production, une clé est obligatoire.
// repondreA : { email, nom } : adresse à laquelle le destinataire répond (facultatif).
export async function envoyerEmail({ a, nom, sujet, html, texte, pieces, repondreA }) {
  const cle = process.env.BREVO_API_KEY;

  if (!cle) {
    if (process.env.NODE_ENV === "production") {
      console.error("BREVO_API_KEY manquant.");
      throw new HttpError(500, "Configuration du serveur incomplète.", "config");
    }
    console.log(`[e-mail simulé] à : ${a} | sujet : ${sujet}`);
    console.log(texte);
    if (pieces?.length) {
      console.log(`[pièces jointes simulées] ${pieces.map((p) => p.nom).join(", ")}`);
    }
    return { simule: true };
  }

  const adresseExpediteur = process.env.BREVO_SENDER_EMAIL;
  if (!adresseExpediteur) {
    console.error("BREVO_SENDER_EMAIL manquant.");
    throw new HttpError(500, "Configuration du serveur incomplète.", "config");
  }

  const corps = {
    sender: {
      email: adresseExpediteur,
      name: process.env.BREVO_SENDER_NAME || "GENIE UPB",
    },
    to: [{ email: a, name: nom || a }],
    subject: sujet,
    htmlContent: html,
    textContent: texte,
  };
  if (repondreA?.email) {
    corps.replyTo = { email: repondreA.email, name: repondreA.nom || repondreA.email };
  }
  if (pieces?.length) {
    corps.attachment = pieces.map((p) => ({ name: p.nom, content: p.contenuBase64 }));
  }

  let res;
  try {
    res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": cle,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(corps),
      signal: AbortSignal.timeout(10000),
    });
  } catch (e) {
    console.error("Brevo injoignable :", e);
    throw new HttpError(502, "L'envoi de l'e-mail a échoué.", "email_echec");
  }

  if (!res.ok) {
    console.error("Brevo :", res.status, await res.text());
    throw new HttpError(502, "L'envoi de l'e-mail a échoué.", "email_echec");
  }
  return { simule: false };
}
