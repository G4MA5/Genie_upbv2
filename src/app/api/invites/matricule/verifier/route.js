import { route, preflight } from "@/lib/http";
import { HttpError } from "@/lib/errors";
import { limiter } from "@/lib/rateLimit";
import { valideMatricule } from "@/lib/validation";
import { signerToken } from "@/lib/securite";
import { chercherEtudiant } from "@/lib/pco";
import { verifierFenetre, userParMatricule } from "@/lib/invites";

// Étape 1 pour un étudiant de l'UPB sans compte : vérifier son matricule
// auprès de l'API des PCO. Renvoie son nom, ses prénoms et sa filière (pour qu'il se reconnaisse)
// et un jeton valable 20 minutes à renvoyer à l'inscription.
export const POST = route(async ({ ip, lireJson }) => {
  limiter(`matricule:${ip}`, 10, 10 * 60_000);

  const corps = await lireJson();
  verifierFenetre();
  const matricule = valideMatricule(corps.matricule);

  if (await userParMatricule(matricule)) {
    throw new HttpError(
      409,
      "Un compte existe déjà pour ce matricule. Connectez-vous pour vous inscrire comme invité.",
      "compte_existant"
    );
  }

  const etudiant = await chercherEtudiant(matricule);
  if (!etudiant) {
    throw new HttpError(
      404,
      "Matricule introuvable dans la base des étudiants UPB. Vérifiez votre saisie ou veuillez contacter Josias Konan ou écrire à josias.konan026@gmail.com.",
      "matricule_introuvable"
    );
  }

  return {
    corps: {
      status: "ok",
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      filiere: etudiant.filiere ?? null,
      niveau: etudiant.niveau ?? null,
      token: signerToken({ p: "matricule", m: etudiant.matricule }, 20 * 60),
    },
  };
}, { service: "api" });

export const OPTIONS = preflight;
