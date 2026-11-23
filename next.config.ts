import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le badge est généré à partir de fichiers du dossier assets/ (gabarit
  // et polices), lus au moment de la requête : on demande à Next de les
  // inclure dans le déploiement (sinon ils manqueraient en production).
  outputFileTracingIncludes: {
    "/api/invites/**": ["./assets/**/*"],
    "/api/badges/**": ["./assets/**/*"],
    "/api/interne/**": ["./assets/**/*"],
    "/api/personnel/**": ["./assets/**/*"],
    "/api/benevoles/**": ["./assets/**/*"],
    "/api/dev/badge": ["./assets/**/*"],
  },
};

export default nextConfig;
