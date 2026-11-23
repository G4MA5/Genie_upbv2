import { route, preflight } from "@/lib/http";
import { contexteUtilisateur } from "@/lib/auth";
import { portee, exiger } from "@/lib/permissions";
import { listerBadges } from "@/lib/badges";
import { lireFiltres } from "@/lib/badges/filtres";

// Liste des badges, tous types confondus (vue d'impression générale).
// Réservée aux PCO et au comité technique ; le responsable Logistique ne voit
// que les badges des bénévoles.
//   ?type=jure&actif=true&q=kouame&page=1&limite=50
export const GET = route(async ({ req }) => {
  const ctx = await contexteUtilisateur(req);
  const p = portee(ctx);
  exiger(p.tous || p.benevoles, "Vous n'avez pas accès à la liste des badges.");

  const f = lireFiltres(new URL(req.url).searchParams);
  const resultat = await listerBadges({
    type: f.type,
    actif: f.actif,
    q: f.q,
    page: f.page,
    limite: f.limite,
    typesAutorises: p.tous ? undefined : ["benevole"],
  });
  return { corps: { status: "ok", ...resultat } };
}, { service: "badges" });

export const OPTIONS = preflight;
