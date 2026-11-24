import { HttpError } from "../errors.js";
import {
  badgeActifDe,
  obtenirOuCreerBadge,
  envoyerBadgeParEmail,
  userParId,
} from "./service.js";

// Attribue un badge à une personne ET l'envoie par e-mail, en une seule
// opération. C'est ce que l'API principale demande au service des badges
// (route interne /api/interne/badges/attribuer).
//
// L'opération est idempotente : si la personne a déjà un badge actif du même
// type, il est réutilisé (pas de doublon) et simplement renvoyé.
//
//   idUser          personne concernée
//   type            type de badge (invite, jure, organisateur...). Obligatoire,
//                   sauf avec renvoyer
//   typeInvite      pour un invité : etudiant_upb, particulier ou entreprise
//   lienMotDePasse  lien pour définir le mot de passe d'un compte créé
//   creePar         personne qui a demandé l'attribution (traçabilité)
//   renvoyer        true : renvoyer le badge actif quel que soit son type
//
// Renvoie { type, cree, email_envoye }. Une erreur d'envoi d'e-mail n'annule
// pas l'attribution : email_envoye vaut alors false.
export async function attribuerEtEnvoyer({
  idUser,
  type,
  typeInvite,
  lienMotDePasse,
  creePar,
  renvoyer = false,
}) {
  const user = await userParId(idUser);
  if (!user) throw new HttpError(404, "Personne introuvable.", "personne_introuvable");

  let jeton;
  let typeFinal;
  let cree = false;

  const actif = await badgeActifDe(idUser);
  if (renvoyer && actif) {
    jeton = actif.jeton;
    typeFinal = actif.type;
  } else {
    if (!type) {
      throw new HttpError(400, "Le type de badge est obligatoire.", "type_requis");
    }
    const resultat = await obtenirOuCreerBadge(idUser, type, creePar);
    jeton = resultat.jeton;
    cree = resultat.cree;
    typeFinal = type;
  }

  const emailEnvoye = await envoyerBadgeParEmail({
    user,
    jeton,
    type: typeFinal,
    typeInvite,
    lienMotDePasse,
  });

  return { type: typeFinal, cree, email_envoye: emailEnvoye };
}
