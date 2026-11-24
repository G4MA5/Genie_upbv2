import { HttpError } from "./errors.js";

// Origines autorisées à appeler l'API. Surchargeable avec FRONT_ORIGINS
// (liste séparée par des virgules).
const ORIGINES_PAR_DEFAUT = ["http://localhost:5173", "https://genie-upb.com"];

export function originesAutorisees() {
  const brut = process.env.FRONT_ORIGINS;
  if (!brut) return ORIGINES_PAR_DEFAUT;
  return brut
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function enTetes(origin) {
  const h = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  };
  if (originesAutorisees().includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    h["Access-Control-Allow-Credentials"] = "true";
    h["Access-Control-Expose-Headers"] = "Content-Disposition, X-Badges-Ignores";
    h["Vary"] = "Origin";
  }
  return h;
}

export function reponse(corps, status, origin) {
  return new Response(JSON.stringify(corps), {
    status,
    headers: enTetes(origin),
  });
}

export function adresseIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "inconnue";
}

export async function lireJson(req) {
  const texte = await req.text();
  if (texte.length > 20000) {
    throw new HttpError(413, "Requête trop volumineuse.", "trop_gros");
  }
  try {
    const valeur = JSON.parse(texte || "{}");
    if (typeof valeur !== "object" || valeur === null || Array.isArray(valeur)) {
      throw new Error("objet attendu");
    }
    return valeur;
  } catch {
    throw new HttpError(400, "Corps de la requête invalide.", "json_invalide");
  }
}

// Aiguillage des deux serveurs : le même code est déployé deux fois, et la
// variable SERVICE décide des routes que chaque serveur répond.
//   SERVICE=badges : service des badges (routes déclarées { service: "badges" })
//   SERVICE=api    : API principale (routes déclarées { service: "api" })
//   absent         : tout est actif (développement sur un seul serveur)
// Une route qui n'appartient pas au serveur répond 404.
export function serviceAutorise(service) {
  const actuel = (process.env.SERVICE || "").trim().toLowerCase();
  if (!actuel || !["badges", "api"].includes(actuel)) return true;
  return !service || actuel === service;
}

// Enveloppe commune des routes. Le gestionnaire reçoit
// { req, origin, ip, params, lireJson } et renvoie { status?, corps }.
// Les HttpError sont renvoyées telles quelles ; toute autre erreur donne un
// message générique (le détail va dans les journaux du serveur).
// { service } : serveur auquel appartient la route (voir serviceAutorise).
export function route(gestionnaire, { service } = {}) {
  return async function (req, contexte) {
    const origin = req.headers.get("origin") || "";
    if (!serviceAutorise(service)) {
      return reponse(
        {
          status: "error",
          code: "introuvable",
          message: "Cette adresse n'existe pas sur ce serveur.",
        },
        404,
        origin
      );
    }
    try {
      const resultat = await gestionnaire({
        req,
        origin,
        ip: adresseIp(req),
        params: contexte?.params,
        lireJson: () => lireJson(req),
      });
      // Réponse "fichier" (image, PDF, ZIP) : { fichier: { contenu, type, nom?, en_ligne? }, entetes? }
      if (resultat.fichier) {
        const f = resultat.fichier;
        const h = { ...enTetes(origin), "Content-Type": f.type, ...(resultat.entetes ?? {}) };
        if (f.nom) {
          h["Content-Disposition"] = `${f.en_ligne ? "inline" : "attachment"}; filename="${f.nom}"`;
        }
        return new Response(f.contenu, { status: resultat.status ?? 200, headers: h });
      }
      return reponse(resultat.corps, resultat.status ?? 200, origin);
    } catch (e) {
      if (e instanceof HttpError) {
        return reponse(
          {
            status: "error",
            code: e.code,
            message: e.message,
            ...(e.details !== undefined ? { details: e.details } : {}),
          },
          e.status,
          origin
        );
      }
      console.error("Erreur serveur :", e);
      return reponse(
        {
          status: "error",
          code: "erreur_serveur",
          message: "Une erreur est survenue. Veuillez réessayer.",
        },
        500,
        origin
      );
    }
  };
}

export function preflight(req) {
  const origin = req.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: enTetes(origin) });
}
