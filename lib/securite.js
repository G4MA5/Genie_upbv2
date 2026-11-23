import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { HttpError } from "./errors.js";

function secret() {
  const s = process.env.APP_SECRET;
  if (!s || s.length < 16) {
    console.error("APP_SECRET manquant ou trop court (16 caractères minimum).");
    throw new HttpError(500, "Configuration du serveur incomplète.", "config");
  }
  return s;
}

// Code de vérification à 6 chiffres, tiré avec un générateur sûr.
export function genererCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

// Le code n'est jamais stocké en clair : on garde son empreinte HMAC, liée à
// l'adresse e-mail (un code ne vaut que pour l'adresse à laquelle il a été envoyé).
export function hasherCode(email, code) {
  return createHmac("sha256", secret()).update(`${email}:${code}`).digest("hex");
}

export function egal(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

// Jeton signé et daté, utilisé entre deux étapes d'un formulaire
// (ex. matricule vérifié). Il n'est pas chiffré : n'y mettre rien de sensible.
export function signerToken(charge, dureeSecondes) {
  const corps = Buffer.from(
    JSON.stringify({ ...charge, exp: Math.floor(Date.now() / 1000) + dureeSecondes })
  ).toString("base64url");
  const signature = createHmac("sha256", secret()).update(corps).digest("base64url");
  return `${corps}.${signature}`;
}

export function lireToken(token, usage) {
  const erreur = new HttpError(
    400,
    "La vérification a expiré. Veuillez recommencer.",
    "token_invalide"
  );
  if (typeof token !== "string" || !token.includes(".")) throw erreur;

  const [corps, signature] = token.split(".");
  const attendue = createHmac("sha256", secret()).update(corps).digest("base64url");
  if (!egal(signature ?? "", attendue)) throw erreur;

  let charge;
  try {
    charge = JSON.parse(Buffer.from(corps, "base64url").toString("utf8"));
  } catch {
    throw erreur;
  }
  if (charge.p !== usage || typeof charge.exp !== "number") throw erreur;
  if (charge.exp < Math.floor(Date.now() / 1000)) throw erreur;
  return charge;
}
