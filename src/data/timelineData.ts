export interface TimelineStep {
  date: string;
  titre: string;
  description: string;
  isPassed: boolean;
  isCurrent: boolean;
}

export const timelineData: TimelineStep[] = [
  {
    date: '25 nov. 2026',
    titre: 'Ouverture des inscriptions',
    description: 'Création des comptes étudiants et composition des équipes.',
    isPassed: false,
    isCurrent: true
  },
  {
    date: '18 déc. 2026 (23h59)',
    titre: 'Clôture définitive',
    description: 'Date butoir de soumission des dossiers et validation des membres.',
    isPassed: false,
    isCurrent: false
  },
  {
    date: '04 janv. - 25 janv. 2027',
    titre: '5 Semaines de Formations',
    description: 'Masterclasses en présentiel et séances de coaching à distance.',
    isPassed: false,
    isCurrent: false
  },
  {
    date: '30 janv. 2027',
    titre: 'Grande Finale & Clôture',
    description: 'Passage devant le grand jury et remise des prix officiels UPB.',
    isPassed: false,
    isCurrent: false
  }
];
