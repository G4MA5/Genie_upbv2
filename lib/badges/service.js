import { getSupabaseAdmin } from "../supabaseServer.js";
import { HttpError, erreurBase } from "../errors.js";
import { envoyerEmail } from "../brevo.js";
import { emailBadge } from "../emails.js";
import { genererQrPng } from "../qr.js";
import { valideTexte } from "../validation.js";
import { genererBadgePng } from "./rendu.js";
import { TYPES_BADGE } from "./gabarits.js";

// Service des badges : attribution, consultation, désactivation, réémission,
// envoi. Les droits (qui a le droit de faire quoi) sont vérifiés par les
// routes avec lib/permissions.js ; ce fichier ne contient que la mécanique.
//
// Tables : qrcode (le badge) et user (la personne).

const db = () => getSupabaseAdmin();

const COLONNES_BADGE = "id, id_user, type, actif, cree_le, desactive_le";
// Limites d'un téléchargement groupé, pour protéger la mémoire du serveur :
// un ZIP garde les images PNG en mémoire (environ 420 Ko chacune), un PDF les
// convertit tout de suite en JPEG (environ 100 Ko chacune).
export const MAX_ZIP = 300;
export const MAX_PDF = 800;

function unique(liste) {
  return [...new Set(liste.filter((v) => v !== null && v !== undefined))];
}

// Exécute fn sur chaque élément, par lots de `taille` en parallèle.
export async function enParLots(elements, taille, fn) {
  const resultats = new Array(elements.length);
  for (let i = 0; i < elements.length; i += taille) {
    const lot = elements.slice(i, i + taille);
    const sortie = await Promise.all(lot.map((el, k) => fn(el, i + k)));
    sortie.forEach((v, k) => {
      resultats[i + k] = v;
    });
  }
  return resultats;
}

// ---------------------------------------------------------------------
// Lecture
// ---------------------------------------------------------------------

export async function userParId(id) {
  const { data, error } = await db().from("user").select("*").eq("id", id).limit(1);
  if (error) throw erreurBase(error, "lecture de la personne");
  return data?.[0] ?? null;
}

async function usersParIds(ids) {
  if (!ids.length) return new Map();
  const { data, error } = await db()
    .from("user")
    .select("id, nom, prenom, email")
    .in("id", ids);
  if (error) throw erreurBase(error, "lecture des personnes");
  return new Map((data ?? []).map((u) => [u.id, u]));
}

// Badge actif d'une personne (avec son jeton), ou null.
export async function badgeActifDe(idUser) {
  const { data, error } = await db()
    .from("qrcode")
    .select(`${COLONNES_BADGE}, jeton`)
    .eq("id_user", idUser)
    .eq("actif", true)
    .limit(1);
  if (error) throw erreurBase(error, "lecture du badge");
  return data?.[0] ?? null;
}

export async function badgeParId(id) {
  const { data, error } = await db()
    .from("qrcode")
    .select(`${COLONNES_BADGE}, jeton`)
    .eq("id", id)
    .limit(1);
  if (error) throw erreurBase(error, "lecture du badge");
  return data?.[0] ?? null;
}

// ---------------------------------------------------------------------
// Image du badge
// ---------------------------------------------------------------------

// Paramètres d'affichage du badge d'une personne.
export function parametresRendu(user, type) {
  return {
    nom: String(user.nom ?? ""),
    prenom: String(user.prenom ?? ""),
    type,
  };
}

// Image PNG d'un badge. item : { qr: {jeton, type}, user }
export async function imageDuBadge({ qr, user }) {
  return genererBadgePng({ jeton: qr.jeton, ...parametresRendu(user, qr.type) });
}

// ---------------------------------------------------------------------
// Attribution
// ---------------------------------------------------------------------

// Badge actif de la personne, créé s'il n'existe pas. Renvoie { jeton, cree }.
// Une personne n'a qu'un badge actif : si elle en a déjà un d'un AUTRE type,
// l'opération est refusée (le comité technique doit le désactiver d'abord).
export async function obtenirOuCreerBadge(idUser, type, creePar) {
  if (!TYPES_BADGE.includes(type)) {
    throw new HttpError(400, "Le type de badge est invalide.", "type_badge_invalide");
  }

  const actif = await badgeActifDe(idUser);
  if (actif) {
    if (actif.type !== type) {
      throw new HttpError(
        409,
        "Cette personne a déjà un badge d'un autre type.",
        "badge_existant"
      );
    }
    return { jeton: actif.jeton, cree: false };
  }

  const ligne = { id_user: idUser, type };
  if (creePar) ligne.cree_par = creePar;

  const { data, error } = await db().from("qrcode").insert(ligne).select("jeton").single();
  if (error) {
    // Deux demandes simultanées : l'autre a créé le badge entre-temps.
    if (error.code === "23505") {
      const apres = await badgeActifDe(idUser);
      if (apres && apres.type === type) return { jeton: apres.jeton, cree: false };
    }
    throw erreurBase(error, "création du badge");
  }
  return { jeton: data.jeton, cree: true };
}

// ---------------------------------------------------------------------
// Envoi par e-mail
// ---------------------------------------------------------------------

// Envoie le badge (image en pièce jointe). Renvoie false si l'envoi échoue :
// l'attribution reste valable et le badge pourra être renvoyé.
export async function envoyerBadgeParEmail({
  user,
  jeton,
  type,
  typeInvite,
  lienMotDePasse,
  reemis = false,
}) {
  if (!user.email) {
    console.error(`Badge non envoyé : pas d'adresse e-mail pour la personne ${user.id}.`);
    return false;
  }
  try {
    // Badge illustré. Si sa génération échoue (fichier manquant...), on envoie
    // le QR seul plutôt que de bloquer l'envoi.
    let png;
    try {
      png = await genererBadgePng({ jeton, ...parametresRendu(user, type) });
    } catch (e) {
      console.error("Badge illustré impossible, envoi du QR seul :", e);
      png = await genererQrPng(jeton);
    }

    const mail = emailBadge({
      prenom: user.prenom,
      nom: user.nom,
      typeBadge: type,
      typeInvite,
      lienMotDePasse,
      reemis,
    });
    await envoyerEmail({
      a: user.email,
      nom: `${user.prenom} ${user.nom}`,
      sujet: mail.sujet,
      html: mail.html,
      texte: mail.texte,
      pieces: [{ nom: "badge-genie-upb.png", contenuBase64: png.toString("base64") }],
    });
    return true;
  } catch (e) {
    console.error("Badge non envoyé :", e);
    return false;
  }
}

// ---------------------------------------------------------------------
// Désactivation et réémission (comité technique)
// ---------------------------------------------------------------------

export async function desactiverBadge({ id, par, motif }) {
  const motifNet = valideTexte(motif, "motif", { min: 3, max: 200 });
  const { data, error } = await db()
    .from("qrcode")
    .update({
      actif: false,
      desactive_le: new Date().toISOString(),
      desactive_par: par,
      motif_desactivation: motifNet,
    })
    .eq("id", id)
    .eq("actif", true)
    .select("id, id_user, type");
  if (error) throw erreurBase(error, "désactivation du badge");
  if (!data?.length) {
    throw new HttpError(404, "Badge introuvable ou déjà désactivé.", "badge_introuvable");
  }
  return data[0];
}

// Désactive le badge actif de la personne et en crée un nouveau (même type, ou
// le type demandé), puis l'envoie par e-mail.
export async function reemettreBadge({ idUser, par, type }) {
  const user = await userParId(idUser);
  if (!user) throw new HttpError(404, "Personne introuvable.", "personne_introuvable");

  const ancien = await badgeActifDe(idUser);
  const typeFinal = type ?? ancien?.type;
  if (!typeFinal) {
    throw new HttpError(
      400,
      "Cette personne n'a pas de badge actif : indiquez le type de badge à créer.",
      "type_requis"
    );
  }
  if (!TYPES_BADGE.includes(typeFinal)) {
    throw new HttpError(400, "Le type de badge est invalide.", "type_badge_invalide");
  }

  if (ancien) await desactiverBadge({ id: ancien.id, par, motif: "Réémission du badge" });

  const { data, error } = await db()
    .from("qrcode")
    .insert({ id_user: idUser, type: typeFinal, cree_par: par })
    .select("id, jeton")
    .single();
  if (error) {
    // Échec : on remet l'ancien badge en service pour ne pas laisser la personne sans badge.
    if (ancien) {
      await db()
        .from("qrcode")
        .update({ actif: true, desactive_le: null, desactive_par: null, motif_desactivation: null })
        .eq("id", ancien.id);
    }
    throw erreurBase(error, "création du nouveau badge");
  }

  const emailEnvoye = await envoyerBadgeParEmail({
    user,
    jeton: data.jeton,
    type: typeFinal,
    reemis: true,
  });
  return { id: data.id, type: typeFinal, email_envoye: emailEnvoye };
}

// ---------------------------------------------------------------------
// Listes (selon la portée de la personne connectée)
// ---------------------------------------------------------------------

async function idsParRecherche(q) {
  const nettoye = String(q).replace(/[,()%*\\]/g, " ").trim();
  if (nettoye.length < 2) {
    throw new HttpError(400, "La recherche doit contenir au moins 2 caractères.", "recherche_courte");
  }
  const { data, error } = await db()
    .from("user")
    .select("id")
    .or(`nom.ilike.%${nettoye}%,prenom.ilike.%${nettoye}%,email.ilike.%${nettoye}%`)
    .limit(500);
  if (error) throw erreurBase(error, "recherche de personnes");
  return (data ?? []).map((u) => u.id);
}

// Tous les badges, tous types (PCO, comité technique). Le resp. Logistique ne
// voit que les bénévoles (typesAutorises = ["benevole"]).
export async function listerBadges({ type, actif, q, page = 1, limite = 50, typesAutorises }) {
  let requete = db()
    .from("qrcode")
    .select(COLONNES_BADGE, { count: "exact" })
    .order("cree_le", { ascending: false });

  if (typesAutorises) requete = requete.in("type", typesAutorises);
  if (type) requete = requete.eq("type", type);
  if (actif === true || actif === false) requete = requete.eq("actif", actif);
  if (q) {
    const ids = await idsParRecherche(q);
    if (!ids.length) return { total: 0, page, limite, badges: [] };
    requete = requete.in("id_user", ids);
  }

  const debut = (page - 1) * limite;
  const { data, count, error } = await requete.range(debut, debut + limite - 1);
  if (error) throw erreurBase(error, "liste des badges");

  const personnes = await usersParIds(unique((data ?? []).map((b) => b.id_user)));
  return {
    total: count ?? 0,
    page,
    limite,
    badges: (data ?? []).map((b) => ({
      id: b.id,
      type: b.type,
      actif: b.actif,
      cree_le: b.cree_le,
      desactive_le: b.desactive_le,
      personne: personnes.get(b.id_user)
        ? {
            id: b.id_user,
            nom: personnes.get(b.id_user).nom,
            prenom: personnes.get(b.id_user).prenom,
            email: personnes.get(b.id_user).email,
          }
        : { id: b.id_user },
    })),
  };
}

// ---------------------------------------------------------------------
// Sélection pour le téléchargement groupé
// ---------------------------------------------------------------------

// Renvoie [{ qr, user }] : les badges à imprimer. PCO et comité technique :
// tous les types ; responsable Logistique : les bénévoles.
export async function selectionPourTelechargement({ portee, type, actif, format = "zip" }) {
  if (!portee.tous && !portee.benevoles) {
    throw new HttpError(403, "Vous n'avez pas accès à cette vue.", "acces_refuse");
  }
  const max = format === "pdf" ? MAX_PDF : MAX_ZIP;

  let requete = db()
    .from("qrcode")
    .select(`${COLONNES_BADGE}, jeton`)
    .order("type")
    .order("id")
    .limit(max + 1);
  if (!portee.tous) requete = requete.eq("type", "benevole");
  if (type) requete = requete.eq("type", type);
  requete = requete.eq("actif", actif === false ? false : true);

  const { data, error } = await requete;
  if (error) throw erreurBase(error, "sélection des badges");
  const personnes = await usersParIds(unique((data ?? []).map((b) => b.id_user)));
  const items = (data ?? [])
    .filter((b) => personnes.has(b.id_user))
    .map((b) => ({
      qr: { id: b.id, jeton: b.jeton, type: b.type },
      user: personnes.get(b.id_user),
    }));

  if (items.length > max) {
    throw new HttpError(
      413,
      `Trop de badges pour un ${format.toUpperCase()} (plus de ${max}). Ajoutez un filtre (type)${
        format === "zip" ? ", ou choisissez le format PDF" : ""
      }.`,
      "trop_de_badges"
    );
  }
  return items;
}
