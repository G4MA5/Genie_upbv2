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

export async function POST(req) {
  const origin = req.headers.get("origin") || "";

  try {
    const { teamName, captainName, members, hebergement, type } =
      await req.json();

    if (!teamName || !captainName || !members || members.length === 0) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Champs obligatoires manquants",
        }),
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // Vérifier que chaque email n'existe pas déjà
    const emails = members.map((m) => m.email.toLowerCase()); // forcer minuscules
    const { data: existingMembers, error: selectError } = await supabase
      .from("membre")
      .select("email, nom_equipe")
      .in("email", emails);

    if (selectError) throw selectError;

    if (existingMembers && existingMembers.length > 0) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: `Un de vos membres est déja dans une autre équipe`,
        }),
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // Insérer l'équipe
    const { data: equipeData, error: equipeError } = await supabase
      .from("equipe")
      .insert([
        {
          nom_equipe: teamName,
          nom_capitaine: captainName,
          membres: JSON.stringify(members),
          hebergement: hebergement || false,
          id_concours: type,
          statut: false,
        },
      ])
      .select("id");

    if (equipeError) throw equipeError;
    const id_equipe = equipeData[0].id;

    // Insérer chaque membre
    for (let member of members) {
      const { nom, email, genre, niveau, filiere } = member;
      await supabase.from("membre").insert([
        {
          nom_prenom: nom,
          email: email.toLowerCase(), // forcer minuscules
          nom_equipe: teamName,
          id_equipe: id_equipe,
          genre,
          niveau,
          filiere,
        },
      ]);
    }

    return new Response(
      JSON.stringify({
        status: "ok",
        message: "Inscription réussie !",
        id_equipe,
      }),
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: err.message || "Erreur serveur",
      }),
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
