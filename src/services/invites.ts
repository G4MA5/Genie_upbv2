import { api } from './api';

export const invitesApi = {
  verifierMatricule: (matricule: string) =>
    api<{ initiales: string; debut_nom: string; token: string }>('/api/invites/matricule/verifier', {
      method: 'POST', body: { matricule }, public: true,
    }),
  envoyerCode: (email: string) =>
    api<{ message: string }>('/api/invites/code/envoyer', { method: 'POST', body: { email }, public: true }),
  inscrire: (corps: Record<string, unknown>) =>
    api<{ message: string; email_envoye: boolean }>('/api/invites/inscription', {
      method: 'POST', body: corps, public: true,
    }),
  inscrireAvecCompte: (corps: { consentement: true; numero?: string; jours_prevus?: string[] }) =>
    api<{ message: string; email_envoye: boolean }>('/api/invites/inscription-compte', {
      method: 'POST', body: corps,
    }),
  renvoyerBadge: (email: string, code: string) =>
    api<{ message: string }>('/api/invites/badge/renvoyer', {
      method: 'POST', body: { email, code }, public: true,
    }),
};
