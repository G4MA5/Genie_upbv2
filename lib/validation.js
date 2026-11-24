import { HttpError } from "./errors.js";

function invalide(nom) {
  return new HttpError(400, `Le champ « ${nom} » est invalide.`, "champ_invalide");
}

export function valideTexte(valeur, nom, { min = 1, max = 100 } = {}) {
  if (typeof valeur !== "string") throw invalide(nom);
  const v = valeur.trim().replace(/\s+/g, " ");
  if (v.length < min || v.length > max) throw invalide(nom);
  return v;
}

export function valideEmail(valeur) {
  if (typeof valeur !== "string") throw invalide("e-mail");
  const v = valeur.trim().toLowerCase();
  if (v.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
    throw invalide("e-mail");
  }
  return v;
}

// Numéro de téléphone : 8 à 15 chiffres, "+" facultatif au début.
export function valideNumero(valeur) {
  if (typeof valeur !== "string") throw invalide("numéro de téléphone");
  const v = valeur.replace(/[\s.\-()]/g, "");
  if (!/^\+?[0-9]{8,15}$/.test(v)) throw invalide("numéro de téléphone");
  return v;
}

export function valideMatricule(valeur) {
  if (typeof valeur !== "string") throw invalide("matricule");
  const v = valeur.trim().toUpperCase();
  if (!/^[A-Z0-9._-]{4,30}$/.test(v)) throw invalide("matricule");
  return v;
}

export function valideCode(valeur) {
  const v = typeof valeur === "string" ? valeur.trim() : String(valeur ?? "");
  if (!/^[0-9]{6}$/.test(v)) {
    throw new HttpError(400, "Le code doit contenir 6 chiffres.", "code_invalide");
  }
  return v;
}

export function joursAutorises() {
  const brut = process.env.INVITES_JOURS || "2027-01-27,2027-01-28,2027-01-29";
  return brut
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Jours où l'invité compte venir : indicatif, facultatif, non bloquant.
export function valideJours(valeur) {
  if (valeur === undefined || valeur === null) return [];
  if (!Array.isArray(valeur) || valeur.length > 10) throw invalide("jours prévus");
  const autorises = joursAutorises();
  const jours = new Set();
  for (const jour of valeur) {
    if (typeof jour !== "string" || !autorises.includes(jour)) {
      throw invalide("jours prévus");
    }
    jours.add(jour);
  }
  return [...jours].sort();
}

// Entier strictement positif (identifiant). Accepte un nombre ou un texte.
export function valideEntier(valeur, nom, { min = 1, max = 2_147_483_647 } = {}) {
  const n = typeof valeur === "number" ? valeur : Number(String(valeur ?? "").trim());
  if (!Number.isInteger(n) || n < min || n > max) throw invalide(nom);
  return n;
}
