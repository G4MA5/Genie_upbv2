import { useState } from 'react';
import { UserProfile } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'demo-1',
    nom: 'Kouassi',
    prenom: 'Ariel',
    email: 'ariel.kouassi@upb.ci',
    matricule: 'UPB-2026-8841',
    filiere: 'Technologie',
    niveau: 'Licence 3',
    role: 'capitaine'
  });

  return { user, setUser, isAuthenticated: !!user };
}
