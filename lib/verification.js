import { getSupabaseAdmin } from "./supabaseServer.js";
import { HttpError, erreurBase } from "./errors.js";
import { genererCode, hasherCode, egal } from "./securite.js";
import { envoyerEmail } from "./brevo.js";
import { emailCode } from "./emails.js";

// Vérification d'une adresse e-mail par code (table verification_code).
const VALIDITE_MINUTES = 10;
const MAX_ESSAIS = 5;
const MAX_ENVOIS = 3; // par adresse, sur la durée de validité

const MESSAGE_CODE_INVALIDE = "Code invalide ou expiré.";

// Envoie un nouveau code. Refuse au-delà de MAX_ENVOIS demandes en 10 minutes.
export async function envoyerCode(email) {
  const db = getSupabaseAdmin();
  const depuis = new Date(Date.now() - VALIDITE_MINUTES * 60_000).toISOString();

  const { count, error } = await db
    .from("verification_code")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("cree_le", depuis);
  if (error) throw erreurBase(error, "comptage des codes");
  if ((count ?? 0) >= MAX_ENVOIS) {
    throw new HttpError(
      429,
      "Trop de codes demandés pour cette adresse. Réessayez dans quelques minutes.",
      "trop_de_codes"
    );
  }

  const code = genererCode();
  const { error: errInsert } = await db.from("verification_code").insert({
    email,
    code_hash: hasherCode(email, code),
    expire_le: new Date(Date.now() + VALIDITE_MINUTES * 60_000).toISOString(),
  });
  if (errInsert) throw erreurBase(errInsert, "enregistrement du code");

  const mail = emailCode({ code, minutes: VALIDITE_MINUTES });
  await envoyerEmail({ a: email, sujet: mail.sujet, html: mail.html, texte: mail.texte });
}

// Contrôle le code et le marque comme utilisé (un code ne sert qu'une fois).
// Lève une HttpError si le code est faux, expiré, déjà utilisé ou si trop
// d'essais ont été faits.
export async function consommerCode(email, code) {
  const db = getSupabaseAdmin();

  // On regarde les derniers codes encore valables (et pas seulement le plus
  // récent) : si deux e-mails de code sont partis, celui de l'un ou de
  // l'autre est accepté.
  const { data, error } = await db
    .from("verification_code")
    .select("id, code_hash, essais")
    .eq("email", email)
    .eq("utilise", false)
    .gt("expire_le", new Date().toISOString())
    .order("cree_le", { ascending: false })
    .limit(3);
  if (error) throw erreurBase(error, "lecture du code");

  const lignes = data ?? [];
  if (!lignes.length) {
    console.warn(
      `[code] aucun code valable pour ${email} : jamais demandé, expiré, déjà utilisé, ou demandé pour une autre adresse.`
    );
    throw new HttpError(400, MESSAGE_CODE_INVALIDE, "code_invalide");
  }

  const encoreEssayables = lignes.filter((l) => l.essais < MAX_ESSAIS);
  if (!encoreEssayables.length) {
    throw new HttpError(
      429,
      "Trop d'essais. Demandez un nouveau code.",
      "trop_d_essais"
    );
  }

  const empreinte = hasherCode(email, code);
  const ligne = encoreEssayables.find((l) => egal(l.code_hash, empreinte));

  if (!ligne) {
    console.warn(
      `[code] code incorrect pour ${email} (${encoreEssayables.length} code(s) en attente).`
    );
    for (const l of encoreEssayables) {
      await db
        .from("verification_code")
        .update({ essais: l.essais + 1 })
        .eq("id", l.id);
    }
    throw new HttpError(400, MESSAGE_CODE_INVALIDE, "code_invalide");
  }

  // Marquage conditionnel : si deux requêtes arrivent en même temps avec le
  // bon code, une seule peut le consommer.
  const { data: maj, error: errMaj } = await db
    .from("verification_code")
    .update({ utilise: true })
    .eq("id", ligne.id)
    .eq("utilise", false)
    .select("id");
  if (errMaj) throw erreurBase(errMaj, "consommation du code");
  if (!maj?.length) throw new HttpError(400, MESSAGE_CODE_INVALIDE, "code_invalide");
}
