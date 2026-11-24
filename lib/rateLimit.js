import { HttpError } from "./errors.js";

// Limiteur simple en mémoire : "max" appels par clé et par fenêtre.
// Limite connue : la mémoire n'est pas partagée entre plusieurs instances du
// serveur. C'est une première barrière ; les limites par e-mail (codes de
// vérification) sont, elles, comptées en base.
const seaux = new Map();

export function limiter(cle, max, fenetreMs) {
  const maintenant = Date.now();
  const recents = (seaux.get(cle) || []).filter((t) => maintenant - t < fenetreMs);

  if (recents.length >= max) {
    seaux.set(cle, recents);
    throw new HttpError(
      429,
      "Trop de tentatives. Réessayez dans quelques minutes.",
      "trop_de_tentatives"
    );
  }

  recents.push(maintenant);
  seaux.set(cle, recents);

  // Évite que la mémoire grossisse indéfiniment.
  if (seaux.size > 5000) {
    for (const k of seaux.keys()) {
      seaux.delete(k);
      if (seaux.size <= 4000) break;
    }
  }
}
