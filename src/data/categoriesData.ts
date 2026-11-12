import { CategoryInfo } from '../types/category';

export const categoriesData: CategoryInfo[] = [
  {
    id: 'tech',
    code: '01',
    name: 'Technologie',
    slug: 'technologie',
    pitch: 'Concevez, programmez et faites fonctionner un prototype devant le jury.',
    tailleEquipe: 'Équipe à confirmer',
    placesRestantes: '6 places',
    tauxRemplissage: 40,
    couleur: 'oklch(0.58 0.15 258)',
    epreuves: ['Prototype connecté', 'Démonstration en direct', 'Code & Architecture']
  },
  {
    id: 'inno',
    code: '02',
    name: 'Innovation',
    slug: 'innovation',
    pitch: 'Transformez une idée en projet viable et défendez-la en public.',
    tailleEquipe: '4 à 6 membres',
    placesRestantes: '3 places',
    tauxRemplissage: 75,
    couleur: 'oklch(0.62 0.15 50)',
    epreuves: ['Pitch Deck', 'Business Model Canvas', 'Validation marché']
  },
  {
    id: 'eco',
    code: '03',
    name: 'Économie',
    slug: 'economie',
    pitch: 'Gérez un portefeuille simulé et prenez les meilleures décisions financières.',
    tailleEquipe: '4 membres',
    placesRestantes: '8 places',
    tauxRemplissage: 30,
    couleur: 'oklch(0.58 0.12 170)',
    epreuves: ['Diagnostic financier', 'Gestion de crise', 'Plaidoyer stratégique']
  },
  {
    id: 'droit',
    code: '04',
    name: 'Droit',
    slug: 'droit',
    pitch: 'Plaidez un cas réel après une immersion complète au tribunal.',
    tailleEquipe: '4 à 6 membres',
    placesRestantes: 'Complet (Liste d\'attente)',
    tauxRemplissage: 100,
    couleur: 'oklch(0.55 0.15 340)',
    epreuves: ['Rédaction de conclusions', 'Procès simulé', 'Joute oratoire']
  }
];
