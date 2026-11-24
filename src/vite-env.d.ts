/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend Next.js : invités, personnel, connexion (src/services/api.ts) */
  readonly VITE_API_URL?: string;
  /** Service des badges du backend Next.js (src/services/api.ts) */
  readonly VITE_BADGES_URL?: string;
  /** Backend FastAPI : inscriptions étudiants et équipes (src/lib/api.ts) */
  readonly VITE_EQUIPES_API_URL?: string;
}
