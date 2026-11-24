import { HttpError } from "./errors.js";

// Droits de chaque rôle. Ils sont définis ICI (pas dans la base) : modifier
// un droit ne demande aucune migration. Voir docs/badges-attribution.md.
//
// ctx est le résultat de contexteUtilisateur() : { user, roles }.

export function aRole(ctx, ...noms) {
  return ctx.roles.some((r) => noms.includes(r.role));
}

// Comité technique (inclut le responsable de la commission Technique).
export const estSuperUser = (ctx) => aRole(ctx, "super_user");
export const estPco = (ctx) => aRole(ctx, "pco");

export const estRespLogistique = (ctx) =>
  ctx.roles.some((r) => r.role === "resp_commission" && r.commission === "logistique");

// Ce que la personne a le droit de voir en matière de badges :
//   tous        tous les badges, tous types (PCO, comité technique)
//   benevoles   badges des bénévoles (PCO, comité technique, resp. Logistique)
export function portee(ctx) {
  const tous = estSuperUser(ctx) || estPco(ctx);
  return { tous, benevoles: tous || estRespLogistique(ctx) };
}

// Seul le comité technique désactive et réémet les badges.
export const peutDesactiver = (ctx) => estSuperUser(ctx);

// Seuls les PCO et le comité technique créent le personnel.
export const peutCreerPersonnel = (ctx) => estSuperUser(ctx) || estPco(ctx);

// Bénévoles : voir les demandes = PCO, comité technique et responsable Logistique
// (portee().benevoles) ; les décider (rencontre, accepter, refuser) = responsable
// Logistique seulement.
export const peutGererBenevoles = (ctx) => estRespLogistique(ctx);

export function exiger(condition, message = "Vous n'avez pas le droit d'effectuer cette action.") {
  if (!condition) throw new HttpError(403, message, "acces_refuse");
}

// Ce que la personne connectée peut faire, à destination du front (pour
// afficher ou cacher les écrans d'administration). Ce n'est qu'une aide
// d'affichage : chaque route recontrôle les droits côté serveur.
export function droits(ctx) {
  const p = portee(ctx);
  return {
    roles: ctx.roles.map((r) => ({
      role: r.role,
      id_categorie: r.id_categorie ?? null,
      commission: r.commission ?? null,
    })),
    comite_technique: estSuperUser(ctx),
    pco: estPco(ctx),
    resp_logistique: estRespLogistique(ctx),
    personnel_creer: peutCreerPersonnel(ctx),
    personnel_gerer: peutCreerPersonnel(ctx),
    creer_comite_technique: estSuperUser(ctx),
    badges_voir_tous: p.tous,
    badges_voir_benevoles: p.benevoles,
    badges_telecharger: p.benevoles,
    badges_desactiver: peutDesactiver(ctx),
    badges_reemettre: peutDesactiver(ctx),
    benevoles_voir_demandes: p.benevoles,
    benevoles_decider: peutGererBenevoles(ctx),
  };
}
