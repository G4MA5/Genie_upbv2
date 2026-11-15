import imgNews1 from '../assets/images/f3963bb8.png';
import imgNews2 from '../assets/images/144a752c.png';
import imgNews3 from '../assets/images/9aad4d4a.png';
import imgGal1 from '../assets/images/0f212a34.png';
import imgGal2 from '../assets/images/7206a375.png';
import imgGal3 from '../assets/images/44e0b199.png';
import imgGal4 from '../assets/images/144a752c.png';
import imgGal5 from '../assets/images/e388fda3.png';
import imgGal6 from '../assets/images/9aad4d4a.png';

export interface NewsArticle {
  id: string;
  slug: string;
  date: string;
  tag: string;
  titre: string;
  resume: string;
  chapeau: string;
  paragraphe1: string;
  citation: string;
  paragraphe2: string;
  image: string;
  tempsLecture?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'categories-genie-upb-devoilees',
    date: '04 NOV. 2026',
    tag: 'ANNONCE',
    titre: 'Les catégories de GÉNIE UPB 2026 dévoilées',
    resume: 'Format des épreuves, taille des équipes et calendrier des formations.',
    chapeau: 'Technologie, Innovation, Économie et Droit : cette année, quatre catégories pour quatre façons de relever un défi.',
    paragraphe1: 'Chaque catégorie a son format d\'épreuve, ses critères et son responsable. Les équipes de 4 à 6 étudiants de licence s\'inscrivent en ligne du 23 novembre au 18 décembre, puis suivent cinq semaines de formations avant le concours du 27 au 29 janvier.',
    citation: '« On veut que chaque étudiant trouve le terrain où il brille. »',
    paragraphe2: 'Les places sont limitées dans chaque catégorie ; au-delà du quota, les équipes passent en liste d\'attente.',
    image: imgNews1,
    tempsLecture: '4 min',
  },
  {
    id: 'news-2',
    slug: 'retour-en-images-edition-precedente',
    date: '28 OCT. 2026',
    tag: 'RÉTROSPECTIVE',
    titre: 'Retour en images sur l’édition précédente',
    resume: 'Revivez les temps forts, les pitchs en amphithéâtre et la remise des prix de l\'édition 2025.',
    chapeau: 'Une immersion dans la ferveur et l\'énergie des 45 équipes participantes réunies sur le campus de Bingerville.',
    paragraphe1: 'Des nuits entières de hackathon, des démonstrations de prototypes fonctionnels devant le jury et des moments inoubliables partagés entre étudiants de toutes les filières.',
    citation: '« L\'émulation intellectuelle et la cohésion d\'équipe ont marqué cette édition record. »',
    paragraphe2: 'Plus de 5 millions de FCFA de récompenses et bourses de pré-incubation ont été décernés aux projets les plus prometteurs.',
    image: imgNews2,
    tempsLecture: '3 min',
  },
  {
    id: 'news-3',
    slug: 'rencontre-responsables-categorie',
    date: '20 OCT. 2026',
    tag: 'INTERVIEW',
    titre: 'Rencontre avec les responsables de catégorie',
    resume: 'Conseils de préparation, attentes des jurys et astuces pour composer une équipe équilibrée.',
    chapeau: 'Les quatre responsables académiques livrent leurs recommandations exclusives pour aborder sereinement les qualifications.',
    paragraphe1: 'Chaque responsable détaille la grille d\'évaluation spécifique à sa discipline, de la rigueur algorithmique en Technologie à la force rhétorique en Droit.',
    citation: '« La clé de la réussite réside dans l\'écoute mutuelle et la répartition claire des rôles au sein de l\'équipe. »',
    paragraphe2: 'Les formations débutent le 21 décembre : tous les supports et plannings seront accessibles depuis l\'espace candidat.',
    image: imgNews3,
    tempsLecture: '5 min',
  },
];

export const galleryImages = [
  { id: 'g1', src: imgGal1, alt: 'Campus UPB - Travaux en équipe' },
  { id: 'g2', src: imgGal2, alt: 'Présentation devant le jury' },
  { id: 'g3', src: imgGal3, alt: 'Atelier prototypage électronique' },
  { id: 'g4', src: imgGal4, alt: 'Séance de travail en groupe' },
  { id: 'g5', src: imgGal5, alt: 'Délibération du jury' },
  { id: 'g6', src: imgGal6, alt: 'Cérémonie de remise des prix' },
];
