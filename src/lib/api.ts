/**
 * Client HTTP du backend FastAPI (inscriptions & équipes).
 * En développement, Vite redirige /api et /fichiers vers http://127.0.0.1:8000 (vite.config.ts).
 * En production, définir VITE_EQUIPES_API_URL (URL du backend FastAPI « inscriptions-equipes »).
 * VITE_API_URL est réservé au backend Next.js (src/services/api.ts).
 */
import type { Equipe, EspaceApi, Etudiant, Invitation, Referentiel } from '../types/espace';

const API_URL = (import.meta.env.VITE_EQUIPES_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const CLE_JETON = 'genie-token';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const session = {
  get: (): string | null => {
    try {
      return localStorage.getItem(CLE_JETON);
    } catch {
      return null;
    }
  },
  set: (jeton: string) => localStorage.setItem(CLE_JETON, jeton),
  clear: () => localStorage.removeItem(CLE_JETON),
};

/** URL absolue d'un fichier renvoyé par l'API (les URLs locales commencent par /fichiers). */
export function urlFichier(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

async function requete<T>(methode: string, chemin: string, corps?: unknown): Promise<T> {
  const headers: Record<string, string> = {};
  const jeton = session.get();
  if (jeton) headers.Authorization = `Bearer ${jeton}`;
  let body: BodyInit | undefined;
  if (corps instanceof FormData) body = corps;
  else if (corps !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(corps);
  }

  let rep: Response;
  try {
    rep = await fetch(`${API_URL}${chemin}`, { method: methode, headers, body });
  } catch {
    throw new ApiError(0, 'Impossible de joindre le serveur. Vérifie ta connexion.');
  }
  const texte = await rep.text();
  const donnees = texte ? JSON.parse(texte) : null;
  if (!rep.ok) {
    const message = typeof donnees?.detail === 'string' ? donnees.detail : 'Une erreur est survenue.';
    if (rep.status === 401) {
      session.clear();
      window.dispatchEvent(new Event('genie-session-expiree'));
    }
    throw new ApiError(rep.status, message);
  }
  return donnees as T;
}

function fichier(f: File): FormData {
  const fd = new FormData();
  fd.append('fichier', f);
  return fd;
}

/** Aperçu après saisie du matricule : aucune session n'est ouverte à ce stade. */
export interface ReponseMatricule {
  statut: 'existant' | 'nouveau';
  etudiant: Etudiant;
  /** E-mail du dossier, semi-masqué (ex. ga********0@g****.com) ; null si absent du dossier. */
  email_masque: string | null;
}

export const api = {
  // Inscription / connexion
  identifier: (matricule: string) => requete<ReponseMatricule>('POST', '/api/auth/matricule', { matricule }),
  /** Envoie un code à 5 chiffres si l'e-mail saisi est celui du dossier. */
  demanderCode: (matricule: string, email: string) =>
    requete<{ message: string; email_masque: string; validite_minutes: number }>('POST', '/api/auth/code', {
      matricule,
      email,
    }),
  /** Code correct : session (compte existant) ou création du compte (première inscription). */
  verifierCode: (matricule: string, email: string, code: string, conditions: boolean, hebergement: boolean) =>
    requete<{ statut: string; token: string }>('POST', '/api/auth/verifier', {
      matricule,
      email,
      code,
      conditions_acceptees: conditions,
      hebergement,
    }),

  // Espace
  referentiel: () => requete<Referentiel>('GET', '/api/referentiel'),
  espace: () => requete<EspaceApi>('GET', '/api/espace'),
  modifierProfil: (hebergement: boolean) => requete<{ hebergement: boolean }>('PATCH', '/api/moi', { hebergement }),
  changerPhoto: (f: File) => requete<{ photo_url: string }>('POST', '/api/moi/photo', fichier(f)),
  supprimerPhoto: () => requete<{ photo_url: null }>('DELETE', '/api/moi/photo'),
  chercherEtudiant: (matricule: string, idEquipe: number) =>
    requete<Etudiant & { id: number; prenom: string; disponible: boolean; raison: string | null }>(
      'GET',
      `/api/etudiants/${encodeURIComponent(matricule.trim())}?equipe=${idEquipe}`
    ),

  // Équipe (toutes les actions portent sur une équipe précise : un candidat peut en avoir deux)
  creerEquipe: (nom: string, id_concours: number) => requete<Equipe>('POST', '/api/equipes', { nom, id_concours }),
  modifierEquipe: (eq: number, modif: { nom?: string; id_concours?: number }) =>
    requete<Equipe>('PATCH', `/api/equipes/${eq}`, modif),
  inviter: (eq: number, matricule: string) => requete<Equipe>('POST', `/api/equipes/${eq}/invitations`, { matricule }),
  annulerInvitation: (eq: number, id: number) => requete<Equipe>('DELETE', `/api/equipes/${eq}/invitations/${id}`),
  retirerMembre: (eq: number, idUser: number, motif: string | null) =>
    requete<Equipe>('POST', `/api/equipes/${eq}/membres/${idUser}/retirer`, { motif }),
  soumettre: (eq: number) => requete<Equipe>('POST', `/api/equipes/${eq}/soumettre`),
  deposerRessource: (eq: number, f: File) => requete<Equipe>('POST', `/api/equipes/${eq}/ressources`, fichier(f)),
  lienRessource: (eq: number, id: number) => requete<{ url: string }>('GET', `/api/equipes/${eq}/ressources/${id}/lien`),
  supprimerRessource: (eq: number, id: number) => requete<Equipe>('DELETE', `/api/equipes/${eq}/ressources/${id}`),

  // Invitations reçues
  invitations: () => requete<Invitation[]>('GET', '/api/invitations'),
  accepter: (id: number) => requete<Equipe>('POST', `/api/invitations/${id}/accepter`),
  refuser: (id: number) => requete<{ statut: string }>('POST', `/api/invitations/${id}/refuser`),
};
