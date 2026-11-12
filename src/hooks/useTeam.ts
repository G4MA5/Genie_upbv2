import { useState } from 'react';
import { Team } from '../types/team';

export function useTeam() {
  const [team, setTeam] = useState<Team | null>({
    id: 'team-1',
    nom: 'NeoSahel Innovators',
    categorie: 'Technologie',
    statut: 'soumise',
    capitaineId: 'demo-1',
    membres: [
      { id: '1', matricule: 'UPB-8841', nom: 'Kouassi', prenom: 'Ariel', isCaptain: true, charteSignee: true, status: 'valide' },
      { id: '2', matricule: 'UPB-8842', nom: 'Traore', prenom: 'Fatou', isCaptain: false, charteSignee: true, status: 'valide' },
      { id: '3', matricule: 'UPB-8843', nom: 'Yao', prenom: 'Cedric', isCaptain: false, charteSignee: true, status: 'valide' },
      { id: '4', matricule: 'UPB-8844', nom: 'Diallo', prenom: 'Awa', isCaptain: false, charteSignee: false, status: 'en_attente' },
      { id: '5', matricule: 'UPB-8845', nom: 'Bamba', prenom: 'Issa', isCaptain: false, charteSignee: false, status: 'en_attente' }
    ]
  });

  return { team, setTeam, hasTeam: !!team };
}
