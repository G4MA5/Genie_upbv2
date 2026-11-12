export type UserRole = 'visiteur' | 'candidat' | 'capitaine' | 'formateur' | 'jury' | 'admin';

export interface UserProfile {
  id: string;
  matricule?: string;
  nom: string;
  prenom: string;
  email: string;
  filiere?: 'Technologie' | 'Innovation' | 'Économie' | 'Droit';
  niveau?: 'Licence 1' | 'Licence 2' | 'Licence 3' | 'Master';
  role: UserRole;
  avatarUrl?: string;
  telephone?: string;
}
