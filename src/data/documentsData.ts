export interface DocumentItem {
  id: string;
  titre: string;
  description: string;
  format: 'PDF' | 'DOCX';
  taille: string;
  pages: string;
  categorie: 'Règlement' | 'Charte' | 'Évaluation' | 'Modèle';
  url: string;
}

export const documentsData: DocumentItem[] = [
  {
    id: '1',
    titre: 'Règlement général du tournoi GÉNIE UPB 2026-2027',
    description: 'Règles officielles régissant les inscriptions, la composition des équipes, le déroulement des épreuves et les sanctions disciplinaires.',
    format: 'PDF',
    taille: '2.4 Mo',
    pages: '16 pages',
    categorie: 'Règlement',
    url: '#',
  },
  {
    id: '2',
    titre: 'Charte d’engagement et éthique des candidats',
    description: 'Engagement solennel sur l’intégrité intellectuelle, le respect des jurys, des adversaires et l’assiduité aux 5 semaines de formations.',
    format: 'PDF',
    taille: '850 Ko',
    pages: '4 pages',
    categorie: 'Charte',
    url: '#',
  },
  {
    id: '3',
    titre: 'Grille transversale d’évaluation des Jurys',
    description: 'Barème officiel de notation sur 100 points : faisabilité, pertinence, prestation orale et réponse aux objections techniques.',
    format: 'PDF',
    taille: '1.1 Mo',
    pages: '8 pages',
    categorie: 'Évaluation',
    url: '#',
  },
  {
    id: '4',
    titre: 'Trame officielle de la note d’intention (Candidature)',
    description: 'Modèle standardisé obligatoire pour la présentation initiale de votre projet et de la problématique résolue.',
    format: 'DOCX',
    taille: '320 Ko',
    pages: '3 pages',
    categorie: 'Modèle',
    url: '#',
  },
  {
    id: '5',
    titre: 'Guide d’utilisation des laboratoires et matériels IoT',
    description: 'Consignes de sécurité, inventaire des composants disponibles et protocoles d’expérimentation au sein du campus UPB.',
    format: 'PDF',
    taille: '1.8 Mo',
    pages: '12 pages',
    categorie: 'Règlement',
    url: '#',
  },
];
