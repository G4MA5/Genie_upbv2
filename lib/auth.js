import { getSupabaseAdmin } from "./supabaseServer.js";
import { HttpError, erreurBase } from "./errors.js";

// Identifie la personne qui appelle l'API et charge ses rôles.
//
// Le front envoie l'en-tête "Authorization: Bearer <jeton de connexion
// Supabase>". On en tire le compte, la fiche de la table "user" et les rôles
// actifs de la table role_utilisateur.
//
// Renvoie { user, roles } où roles est une liste de
//   { role, id_categorie, commission }
export async function contexteUtilisateur(req) {
  const entete = req.headers.get("authorization") ?? "";
  const jeton = entete.startsWith("Bearer ") ? entete.slice(7).trim() : "";
  if (!jeton) {
    throw new HttpError(401, "Vous devez être connecté.", "non_connecte");
  }

  const db = getSupabaseAdmin();

  const { data: auth, error: errAuth } = await db.auth.getUser(jeton);
  if (errAuth || !auth?.user) {
    throw new HttpError(401, "Votre session a expiré. Reconnectez-vous.", "non_connecte");
  }

  const { data: lignes, error: errUser } = await db
    .from("user")
    .select("*")
    .eq("user_id", auth.user.id)
    .limit(1);
  if (errUser) throw erreurBase(errUser, "lecture du profil");
  const user = lignes?.[0];
  if (!user) throw new HttpError(404, "Profil introuvable.", "profil_introuvable");

  const { data: roles, error: errRoles } = await db
    .from("role_utilisateur")
    .select("role, id_categorie, commission")
    .eq("id_user", user.id)
    .eq("actif", true);
  if (errRoles) throw erreurBase(errRoles, "lecture des rôles");

  return { user, roles: roles ?? [] };
}
