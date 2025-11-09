import { supabase } from "../../../../lib/supabaseClient";
const FRONT_ORIGINS = ["http://localhost:5173", "https://genie-upb.com"];

function corsHeaders(origin) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (FRONT_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    headers["Access-Control-Allow-Credentials"] = "true";
  }
  return headers;
}

// Vérifier si l’email existe déjà
const isEmailTaken = async (email) => {
  const { data, error } = await supabase
    .from("invite")
    .select("email")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // "PGRST116" = pas trouvé, donc ok
    console.error("Erreur vérification email :", error.message);
    return false; // traiter comme non existant en cas d'erreur autre
  }
  return !!data; // true si email existe
};

// Méthode POST
export async function POST(req) {
  const origin = req.headers.get("origin") || "";
  try {
    const body = await req.json();
    const { email, nom, prenom, statut, numero } = body;

    // Vérifier si l’email existe déjà
    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Vous etes déja inscrit.",
        }),
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // Création utilisateur

    // Insertion des infos utilisateur dans la table
    const { error: insertError } = await supabase
      .from("invite")
      .insert([
        {
          nom,
          prenom,
          email,
          numero,
          statut,
        },
      ])
      .select();

    if (insertError) {
      return new Response(
        JSON.stringify({ status: "error", message: insertError.message }),
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    return new Response(
      JSON.stringify({ status: "ok", message: "Inscription réussie" }),
      {
        status: 200,
        headers: corsHeaders(origin),
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ status: "error", message: err.message }),
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

// OPTIONS = préflight
export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
