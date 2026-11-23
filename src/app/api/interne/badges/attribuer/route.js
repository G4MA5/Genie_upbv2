import { route, preflight } from "@/lib/http";
import { HttpError } from "@/lib/errors";
import { exigerCleService } from "@/lib/serviceAuth";
import { valideEntier } from "@/lib/validation";
import { attribuerEtEnvoyer } from "@/lib/badges/attribution";

// ROUTE INTERNE : appelée par l'API principale, pas par un navigateur.
// Protégée par la clé secrète partagée (en-tête X-Service-Key).
//
// Attribue un badge à une personne et l'envoie par e-mail (idempotent).
// Corps :
//   { "id_user": 42, "type": "invite", "type_invite": "particulier",
//     "lien_mot_de_passe": "https://...", "cree_par": 1, "renvoyer": false }
// Réponse : { status: "ok", type, cree, email_envoye }
const TYPES_INVITE = ["etudiant_upb", "particulier", "entreprise"];

export const POST = route(async ({ req, lireJson }) => {
  exigerCleService(req);
  const corps = await lireJson();

  const lien = corps.lien_mot_de_passe;
  if (lien !== undefined && lien !== null) {
    if (typeof lien !== "string" || lien.length > 2000 || !/^https?:\/\//i.test(lien)) {
      throw new HttpError(400, "Le lien de mot de passe est invalide.", "champ_invalide");
    }
  }

  const resultat = await attribuerEtEnvoyer({
    idUser: valideEntier(corps.id_user, "id_user"),
    type: typeof corps.type === "string" ? corps.type : undefined,
    typeInvite: TYPES_INVITE.includes(corps.type_invite) ? corps.type_invite : undefined,
    lienMotDePasse: lien || undefined,
    creePar: corps.cree_par ? valideEntier(corps.cree_par, "cree_par") : undefined,
    renvoyer: corps.renvoyer === true,
  });
  return { corps: { status: "ok", ...resultat } };
}, { service: "badges" });

export const OPTIONS = preflight;
