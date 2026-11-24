import { HttpError } from "./errors.js";

// Client de l'API des PCO (base des étudiants de l'UPB).
//
// Contrat de l'API des PCO :
//   POST {UPB_API_URL}/api/verifier (UPB_API_URL = adresse de base partagée avec
//                                  le FastAPI, ex. https://api.dbupb.synapstic.tech ;
//                                  une adresse complète avec chemin reste acceptée)
//   En-tête : X-API-Key: {UPB_API_KEY}
//   Corps   : { "matricule": "KOUA1703980001" }
//
// La fausse API intégrée (src/app/api/mock-pco) respecte le même contrat :
// passer de l'une à l'autre ne demande de changer que UPB_API_URL et
// UPB_API_KEY dans l'environnement.
//
// Réponse en cas de succès :
//   { "status": "success", "message": "...", "data": { matricule, nom,
//     prenoms, date_naissance, telephone, email, sexe,
//     allergies_affection, filiere, niveau } }
//
// MINIMISATION DES DONNEES : seuls matricule, nom, prénoms, sexe, filière et
// niveau sont conservés (normaliser()). La date de naissance, le téléphone,
// l'e-mail et surtout les allergies et affections (donnée de santé) de l'API
// ne sont jamais lus, stockés ni affichés. Le téléphone et l'e-mail de
// l'invité sont ceux qu'il saisit lui-même (e-mail vérifié par code).
//
// La lecture reste tolérante (voir extraire() et normaliser()). Si un champ
// manque, le serveur affiche les NOMS des champs reçus (jamais leurs
// valeurs) pour permettre d'adapter normaliser().

function pick(objet, noms) {
  for (const nom of noms) {
    const v = objet?.[nom];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return null;
}

// L'étudiant peut être à la racine de la réponse ou dans un objet englobant.
function extraire(json) {
  for (const cle of ["etudiant", "student", "data", "resultat", "result"]) {
    const v = json?.[cle];
    if (v && typeof v === "object" && !Array.isArray(v)) return v;
  }
  return json;
}

// L'API des PCO répond { status: "success", message, data: {...} }. Un autre
// statut (ex. "error") avec un code 200 signifie "non trouvé". Certaines API
// utilisent aussi un indicateur booléen.
function indiqueNonTrouve(json) {
  const statut =
    typeof json?.status === "string" ? json.status.toLowerCase() : null;
  if (
    statut &&
    ["error", "fail", "failed", "not_found", "notfound"].includes(statut)
  ) {
    return true;
  }
  return (
    json?.valide === false ||
    json?.valid === false ||
    json?.existe === false ||
    json?.found === false ||
    json?.trouve === false
  );
}

function normaliser(donnees, matriculeDemande) {
  const nom = pick(donnees, ["nom", "last_name", "lastName"]);
  const prenom = pick(donnees, [
    "prenoms",
    "prenom",
    "first_name",
    "firstName",
  ]);

  if (!nom || !prenom) {
    console.error(
      "Réponse inattendue de l'API des PCO : nom ou prénom introuvable. Champs reçus :",
      Object.keys(donnees ?? {}),
    );
    throw new HttpError(
      502,
      "Le service de vérification a renvoyé une réponse inattendue.",
      "pco_reponse_invalide",
    );
  }

  return {
    matricule: String(
      pick(donnees, ["matricule", "numero_etudiant"]) ?? matriculeDemande,
    )
      .trim()
      .toUpperCase(),
    nom: String(nom).trim(),
    prenom: String(prenom).trim(),
    genre: pick(donnees, ["sexe", "genre", "gender"]),
    filiere: pick(donnees, ["filiere", "parcours"]),
    niveau: pick(donnees, ["niveau", "level"]),
  };
}

const MESSAGE_INDISPONIBLE =
  "Le service de vérification est momentanément indisponible. Réessayez plus tard.";

// UPB_API_URL est partagée avec le backend FastAPI, qui y met l'adresse de BASE
// (https://api.dbupb.synapstic.tech) et ajoute lui-même son chemin. Les invités
// utilisent le point d'entrée public /api/verifier : on l'ajoute si l'adresse
// n'a pas de chemin. Une adresse complète (avec chemin) est utilisée telle quelle.
function pointEntree(brute) {
  try {
    const url = new URL(brute);
    if (url.pathname === "" || url.pathname === "/") url.pathname = "/api/verifier";
    return url.toString();
  } catch {
    return brute;
  }
}

// Renvoie l'étudiant, ou null si le matricule est inconnu.
export async function chercherEtudiant(matricule) {
  const adresse = process.env.UPB_API_URL ? pointEntree(process.env.UPB_API_URL.trim()) : "";
  if (!adresse) {
    console.error("UPB_API_URL manquant.");
    throw new HttpError(500, "Configuration du serveur incomplète.", "config");
  }

  const entetes = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (process.env.UPB_API_KEY) entetes["X-API-Key"] = process.env.UPB_API_KEY;

  let res;
  try {
    res = await fetch(adresse, {
      method: "POST",
      headers: entetes,
      body: JSON.stringify({ matricule }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    console.error("API des PCO injoignable :", e);
    throw new HttpError(502, MESSAGE_INDISPONIBLE, "pco_indisponible");
  }

  if (res.status === 404) {
    // Soit le matricule est inconnu, soit l'adresse de l'API est incorrecte :
    // on affiche l'adresse (sans la clé) et le début de la réponse pour
    // distinguer les deux cas.
    let debut = "";
    try {
      debut = (await res.text()).slice(0, 200).replace(/\s+/g, " ");
    } catch {
      // réponse illisible : on affiche seulement le statut
    }
    let lieu = adresse;
    try {
      const u = new URL(adresse);
      lieu = u.origin + u.pathname;
    } catch {
      // adresse invalide : affichée telle quelle
    }
    console.warn(`[pco] 404 sur ${lieu} : ${debut || "(réponse vide)"}`);
    return null;
  }

  if (res.status === 401 || res.status === 403) {
    console.error(
      `API des PCO : accès refusé (${res.status}). Vérifier UPB_API_KEY.`,
    );
    throw new HttpError(502, MESSAGE_INDISPONIBLE, "pco_acces_refuse");
  }

  // Requête jugée invalide par l'API (ex. format de matricule) : inconnu.
  if (res.status === 400 || res.status === 422) {
    console.warn(`API des PCO : matricule refusé (${res.status}).`);
    return null;
  }

  if (!res.ok) {
    console.error("API des PCO : statut", res.status);
    throw new HttpError(502, MESSAGE_INDISPONIBLE, "pco_indisponible");
  }

  let json;
  try {
    json = await res.json();
  } catch {
    console.error("API des PCO : la réponse n'est pas du JSON.");
    throw new HttpError(502, MESSAGE_INDISPONIBLE, "pco_reponse_invalide");
  }

  if (indiqueNonTrouve(json)) return null;
  return normaliser(extraire(json), matricule);
}

// Initiales pour que l'étudiant reconnaisse son identité sans la dévoiler.
export function initiales(etudiant) {
  const lettres = [
    ...etudiant.prenom.split(/\s+/),
    ...etudiant.nom.split(/\s+/),
  ]
    .filter(Boolean)
    .map((mot) => mot[0].toUpperCase());
  return lettres.join(".") + ".";
}

// Début du nom : deux lettres puis des étoiles.
export function debutNom(nom) {
  return nom.slice(0, 2) + "***";
}
