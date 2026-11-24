import { getSupabaseAdmin } from "./supabaseServer.js";
import { HttpError, erreurBase } from "./errors.js";
import { chercherEtudiant } from "./pco.js";
import { consommerCode } from "./verification.js";
import { lireToken } from "./securite.js";
import { attribuerBadge } from "./badgesClient.js";
import {
  valideTexte,
  valideEmail,
  valideNumero,
  valideCode,
  valideJours,
} from "./validation.js";

// Logique métier de l'inscription des invités.
// Tables utilisées : "user", "invite", "qrcode", "membre", "verification_code"
// (voir database/invites/schema_invites.sql).

const TYPES_INVITE = ["etudiant_upb", "particulier", "entreprise"];
const STATUT_ETUDIANT = "Etudiant UPB";

// Les inscriptions invités ouvrent après la clôture des équipes. Les dates
// se règlent avec INVITES_OUVERTURE et INVITES_CLOTURE (format ISO). Sans
// ces variables, les inscriptions sont ouvertes.
export function verifierFenetre() {
  const maintenant = Date.now();
  const ouverture = Date.parse(process.env.INVITES_OUVERTURE ?? "");
  const cloture = Date.parse(process.env.INVITES_CLOTURE ?? "");

  if (!Number.isNaN(ouverture) && maintenant < ouverture) {
    throw new HttpError(
      403,
      "Les inscriptions des invités ne sont pas encore ouvertes.",
      "inscriptions_fermees"
    );
  }
  if (!Number.isNaN(cloture) && maintenant > cloture) {
    throw new HttpError(
      403,
      "Les inscriptions des invités sont closes.",
      "inscriptions_fermees"
    );
  }
}

// Échappe les caractères joker de ilike (% et _) pour comparer une adresse
// exacte sans tenir compte de la casse.
function motifExact(valeur) {
  return valeur.replace(/[\\%_]/g, "\\$&");
}

export async function userParEmail(email) {
  const { data, error } = await getSupabaseAdmin()
    .from("user")
    .select("*")
    .ilike("email", motifExact(email))
    .limit(1);
  if (error) throw erreurBase(error, "recherche utilisateur par e-mail");
  return data?.[0] ?? null;
}

export async function userParMatricule(matricule) {
  const { data, error } = await getSupabaseAdmin()
    .from("user")
    .select("*")
    .eq("matricule", matricule)
    .limit(1);
  if (error) throw erreurBase(error, "recherche utilisateur par matricule");
  return data?.[0] ?? null;
}

// Un compte est "dans une équipe" si son drapeau participant est vrai ou si
// son adresse figure parmi les membres d'une équipe.
export async function estDansUneEquipe(user) {
  if (user.participant === true) return true;
  if (!user.email) return false;

  const { data, error } = await getSupabaseAdmin()
    .from("membre")
    .select("id")
    .ilike("email", motifExact(user.email))
    .limit(1);
  if (error) throw erreurBase(error, "recherche d'équipe");
  return (data?.length ?? 0) > 0;
}

// Lien pour définir le mot de passe du compte créé. Null si indisponible.
export async function lienMotDePasse(email) {
  try {
    const { data, error } = await getSupabaseAdmin().auth.admin.generateLink({
      type: "recovery",
      email,
      options: process.env.FRONT_RESET_URL
        ? { redirectTo: process.env.FRONT_RESET_URL }
        : undefined,
    });
    if (error) throw error;
    return data?.properties?.action_link ?? null;
  } catch (e) {
    console.error("Lien de mot de passe non généré :", e);
    return null;
  }
}

// Exécute les étapes de nettoyage en sens inverse (au mieux) après un échec.
async function annuler(etapes) {
  for (const etape of [...etapes].reverse()) {
    try {
      await etape();
    } catch (e) {
      console.error("Nettoyage incomplet :", e);
    }
  }
}

function conflit(user) {
  if (user.invite) {
    return new HttpError(
      409,
      "Vous êtes déjà inscrit comme invité. Utilisez « renvoyer mon badge » si besoin.",
      "deja_invite"
    );
  }
  return new HttpError(
    409,
    "Un compte existe déjà avec ces informations. Connectez-vous pour vous inscrire comme invité.",
    "compte_existant"
  );
}

async function verifierDoublons(email, matricule) {
  const parEmail = await userParEmail(email);
  if (parEmail) throw conflit(parEmail);
  if (matricule) {
    const parMatricule = await userParMatricule(matricule);
    if (parMatricule) throw conflit(parMatricule);
  }
}

// Réunit les informations d'identité selon le type d'invité.
async function preparerIdentite(type, corps) {
  if (type === "etudiant_upb") {
    // Le matricule a été vérifié à l'étape précédente : on ne fait confiance
    // qu'au jeton signé, puis on relit les données auprès de l'API des PCO.
    const { m } = lireToken(corps.token, "matricule");
    const etudiant = await chercherEtudiant(m);
    if (!etudiant) {
      throw new HttpError(
        404,
        "Matricule introuvable dans la base des étudiants UPB. Veuillez contacter Josias Konan ou écrire à josias.konan026@gmail.com.",
        "matricule_introuvable"
      );
    }
    return { ...etudiant, statut: STATUT_ETUDIANT };
  }

  const nom = valideTexte(corps.nom, "nom", { max: 80 });
  const prenom = valideTexte(corps.prenom, "prénom", { max: 80 });

  if (type === "particulier") {
    return {
      nom,
      prenom,
      statut: valideTexte(corps.statut, "statut", { max: 80 }),
    };
  }

  // entreprise : nom et prénom sont ceux du représentant.
  return {
    nom,
    prenom,
    statut: "Entreprise",
    nomEntreprise: valideTexte(corps.nom_entreprise, "nom de l'entreprise", { max: 120 }),
    nomRepresentant: `${prenom} ${nom}`,
  };
}

async function insererInvite({ idUser, identite, email, numero, type, jours }) {
  const { data, error } = await getSupabaseAdmin()
    .from("invite")
    .insert({
      id_user: idUser,
      nom: identite.nom,
      prenom: identite.prenom,
      email,
      numero,
      statut: identite.statut,
      type_invite: type,
      nom_entreprise: identite.nomEntreprise ?? null,
      nom_representant: identite.nomRepresentant ?? null,
      jours_prevus: jours,
      consentement_le: new Date().toISOString(),
      valide: true,
    })
    .select("id")
    .single();
  if (error) throw erreurBase(error, "création de la fiche invité");
  return data;
}

// Inscription publique d'un invité (étudiant UPB sans compte, particulier ou
// entreprise). Le code reçu par e-mail prouve que l'adresse appartient à la
// personne.
export async function inscrire(corps) {
  verifierFenetre();

  const type = corps.type_invite;
  if (!TYPES_INVITE.includes(type)) {
    throw new HttpError(400, "Le type d'invité est invalide.", "type_invalide");
  }

  const email = valideEmail(corps.email);
  const numero = valideNumero(corps.numero);
  const jours = valideJours(corps.jours_prevus);
  const code = valideCode(corps.code);
  if (corps.consentement !== true) {
    throw new HttpError(
      400,
      "Vous devez accepter le traitement de vos données pour vous inscrire.",
      "consentement_requis"
    );
  }

  // Les données de l'étudiant sont relues AVANT de consommer le code : si
  // l'API des PCO est en panne, le code n'est pas perdu.
  const identite = await preparerIdentite(type, corps);

  await consommerCode(email, code);
  await verifierDoublons(email, identite.matricule ?? null);

  const db = getSupabaseAdmin();
  const nettoyage = [];
  let user;
  let emailEnvoye;

  try {
    let authId = null;

    if (type === "etudiant_upb") {
      // Compte de connexion Genie UPB (e-mail déjà vérifié par le code).
      const { data, error } = await db.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { nom: identite.nom, prenom: identite.prenom },
      });
      if (error) {
        if (error.status === 422 || /already|registered/i.test(error.message ?? "")) {
          throw new HttpError(
            409,
            "Un compte existe déjà avec cette adresse. Connectez-vous pour vous inscrire comme invité.",
            "compte_existant"
          );
        }
        throw erreurBase(error, "création du compte");
      }
      authId = data.user.id;
      nettoyage.push(() => db.auth.admin.deleteUser(authId));
    }

    // Une éventuelle fonction automatique de la base a pu déjà créer la ligne
    // "user" à la création du compte : dans ce cas on la complète.
    const ligneUser = {
      nom: identite.nom,
      prenom: identite.prenom,
      email,
      numero,
      filiere: identite.filiere ?? null,
      niveau: identite.niveau ?? null,
      matricule: identite.matricule ?? null,
      genre: identite.genre ?? null,
      invite: true,
    };

    let existante = null;
    if (authId) {
      const { data, error } = await db
        .from("user")
        .select("id")
        .eq("user_id", authId)
        .limit(1);
      if (error) throw erreurBase(error, "lecture du profil");
      existante = data?.[0] ?? null;
    }

    if (existante) {
      const { data, error } = await db
        .from("user")
        .update(ligneUser)
        .eq("id", existante.id)
        .select("id, nom, prenom, email")
        .single();
      if (error) throw erreurBase(error, "mise à jour du profil");
      user = data;
    } else {
      const { data, error } = await db
        .from("user")
        // user_id toujours explicite : la colonne a une valeur par défaut gen_random_uuid()
        // (schéma d'origine) qui ne correspond à aucun compte et viole la contrainte
        // vers auth.users. Sans compte de connexion (particulier, entreprise) : null.
        .insert({ ...ligneUser, user_id: authId ?? null })
        .select("id, nom, prenom, email")
        .single();
      if (error) throw erreurBase(error, "création du profil");
      user = data;
      nettoyage.push(() => db.from("user").delete().eq("id", data.id));
    }

    const invite = await insererInvite({
      idUser: user.id,
      identite,
      email,
      numero,
      type,
      jours,
    });
    nettoyage.push(() => db.from("invite").delete().eq("id", invite.id));

    // Badge : créé et envoyé par le service des badges (serveur séparé en
    // production). S'il est injoignable, l'inscription est annulée avec un
    // message clair plutôt que de laisser une personne inscrite sans badge.
    // Pas de lien « définir mon mot de passe » dans l'e-mail : le site n'a ni page
    // de connexion par mot de passe ni page de réinitialisation, le lien mènerait
    // à une page vide. Les invités n'ont besoin que de leur badge.
    const attribution = await attribuerBadge({
      idUser: user.id,
      type: "invite",
      typeInvite: type,
    });
    emailEnvoye = attribution.email_envoye;
  } catch (e) {
    await annuler(nettoyage);
    throw e;
  }

  return {
    status: "ok",
    message: emailEnvoye
      ? "Inscription confirmée. Votre badge vous a été envoyé par e-mail."
      : "Inscription confirmée, mais l'e-mail n'a pas pu être envoyé. Utilisez « renvoyer mon badge ».",
    email_envoye: emailEnvoye,
  };
}

// Inscription d'un étudiant qui a déjà un compte Genie UPB (connecté).
export async function inscrireDepuisCompte(accessToken, corps) {
  verifierFenetre();
  const db = getSupabaseAdmin();

  const { data: auth, error: errAuth } = await db.auth.getUser(accessToken);
  if (errAuth || !auth?.user) {
    throw new HttpError(401, "Vous devez être connecté.", "non_connecte");
  }

  const { data: lignes, error } = await db
    .from("user")
    .select("*")
    .eq("user_id", auth.user.id)
    .limit(1);
  if (error) throw erreurBase(error, "lecture du profil");
  const user = lignes?.[0];
  if (!user) throw new HttpError(404, "Profil introuvable.", "profil_introuvable");

  if (user.invite) throw conflit(user);
  if (await estDansUneEquipe(user)) {
    throw new HttpError(
      403,
      "Votre compte participe déjà à une équipe : vous ne pouvez pas vous inscrire comme invité.",
      "deja_dans_une_equipe"
    );
  }

  if (corps.consentement !== true) {
    throw new HttpError(
      400,
      "Vous devez accepter le traitement de vos données pour vous inscrire.",
      "consentement_requis"
    );
  }
  const jours = valideJours(corps.jours_prevus);
  const numero = corps.numero ? valideNumero(corps.numero) : user.numero;
  if (!numero) {
    throw new HttpError(400, "Le numéro de téléphone est obligatoire.", "numero_requis");
  }

  const nettoyage = [];
  let emailEnvoye;
  try {
    const invite = await insererInvite({
      idUser: user.id,
      identite: { nom: user.nom, prenom: user.prenom, statut: STATUT_ETUDIANT },
      email: user.email,
      numero,
      type: "etudiant_upb",
      jours,
    });
    nettoyage.push(() => db.from("invite").delete().eq("id", invite.id));

    const { error: errMaj } = await db
      .from("user")
      .update({ invite: true })
      .eq("id", user.id);
    if (errMaj) throw erreurBase(errMaj, "marquage du compte");

    const attribution = await attribuerBadge({
      idUser: user.id,
      type: "invite",
      typeInvite: "etudiant_upb",
    });
    emailEnvoye = attribution.email_envoye;
  } catch (e) {
    await annuler(nettoyage);
    throw e;
  }

  return {
    status: "ok",
    message: emailEnvoye
      ? "Inscription confirmée. Votre badge vous a été envoyé par e-mail."
      : "Inscription confirmée, mais l'e-mail n'a pas pu être envoyé. Utilisez « renvoyer mon badge ».",
    email_envoye: emailEnvoye,
  };
}

// Renvoie le badge actif par e-mail (le code prouve que l'adresse est la sienne).
export async function renvoyerBadge(corps) {
  const email = valideEmail(corps.email);
  const code = valideCode(corps.code);

  await consommerCode(email, code);

  const user = await userParEmail(email);
  if (!user?.invite) {
    throw new HttpError(
      404,
      "Aucune inscription d'invité n'existe avec cette adresse.",
      "inscription_introuvable"
    );
  }

  const { data } = await getSupabaseAdmin()
    .from("invite")
    .select("type_invite")
    .eq("id_user", user.id)
    .limit(1);

  // Renvoie le badge actif (quel que soit son type) ; en crée un s'il n'y en a pas.
  const envoye = (
    await attribuerBadge({
      idUser: user.id,
      type: "invite",
      typeInvite: data?.[0]?.type_invite ?? "particulier",
      renvoyer: true,
    })
  ).email_envoye;
  if (!envoye) {
    throw new HttpError(502, "L'envoi de l'e-mail a échoué. Réessayez.", "email_echec");
  }
  return { status: "ok", message: "Votre badge vous a été renvoyé par e-mail." };
}
