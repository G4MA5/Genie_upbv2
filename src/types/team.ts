export type TeamStatus = 'soumise' | 'validee' | 'attente' | 'refusee';

export interface TeamMember {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  isCaptain: boolean;
  charteSignee: boolean;
  status: 'valide' | 'en_attente' | 'refuse';
}

export interface Team {
  id: string;
  nom: string;
  categorie: 'Technologie' | 'Innovation' | 'Économie' | 'Droit';
  statut: TeamStatus;
  capitaineId: string;
  membres: TeamMember[];
  dossierSoumisLe?: string;
  motifRefus?: string;
}
