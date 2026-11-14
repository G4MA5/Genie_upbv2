import imgNews1 from '../assets/images/f3963bb8.png';
import imgNews2 from '../assets/images/144a752c.png';
import imgNews3 from '../assets/images/9aad4d4a.png';
import imgNews4 from '../assets/images/e388fda3.png';

export interface ArticleItem {
  id: string;
  slug: string;
  date: string;
  titre: string;
  resume: string;
  contenu: string[];
  categorie: 'Annonce' | 'Partenariat' | 'Témoignage' | 'Conseils';
  image: string;
  auteur: string;
  tempsLecture: string;
}

export const newsArticles: ArticleItem[] = [
  {
    id: '1',
    slug: 'categories-genie-upb-devoilees',
    date: '04 NOV. 2026',
    titre: 'Les catégories de GÉNIE UPB 2026 dévoilées',
    resume: 'Format des épreuves, taille des équipes et calendrier des formations : découvrez toutes les nouveautés de cette édition historique.',
    contenu: [
      'Le comité d’organisation de l’Université Polytechnique de Bingerville a officiellement levé le voile sur les quatre disciplines phares du tournoi GÉNIE UPB.',
      'Cette année, les épreuves mettent l’accent sur la résolution de problématiques d’impact direct pour l’Afrique de l’Ouest : agriculture connectée IoT, entrepreneuriat innovant, gestion de chocs financiers et procès simulés avec cas réels.',
      'Cinq semaines de formations certifiantes gratuites accompagneront chaque étudiant dès le 21 décembre, assurées par des spécialistes et des universitaires de premier plan.',
    ],
    categorie: 'Annonce',
    image: imgNews1,
    auteur: 'Comité d’Organisation UPB',
    tempsLecture: '4 min',
  },
  {
    id: '2',
    slug: 'partenariats-incubateurs-tournoi',
    date: '28 OCT. 2026',
    titre: 'Trois nouveaux incubateurs et fonds d’amorçage rejoignent le tournoi',
    resume: 'Des opportunités d’incubation et de financement direct offertes aux équipes finalistes dès la clôture des épreuves.',
    contenu: [
      'GÉNIE UPB franchit un nouveau cap avec l’entrée de trois acteurs majeurs de l’écosystème tech et entrepreneurial ivoirien.',
      'Les équipes lauréates bénéficieront d’un accès prioritaire à des espaces de coworking, de mentorats individuels et de pré-financements pour transformer leurs prototypes en startups viables.',
    ],
    categorie: 'Partenariat',
    image: imgNews2,
    auteur: 'Pôle Partenariats & Entreprises',
    tempsLecture: '3 min',
  },
  {
    id: '3',
    slug: 'retour-experience-laureats-edition-precedente',
    date: '15 OCT. 2026',
    titre: '« GÉNIE UPB a été le tremplin de notre carrière » — Témoignage des lauréats',
    resume: 'L’équipe victorieuse en Technologie revient sur leur parcours, des nuits de prototypage jusqu’à la consécration au grand amphithéâtre.',
    contenu: [
      'Rencontre inspirante avec Marie et Fabrice, étudiants diplômés aujourd’hui à la tête de leur propre solution agritech connectée.',
      '« Le tournoi vous pousse au-delà de la théorie des cours. On apprend à pitcher devant des jurys sans concession et à coopérer sous la pression. »',
    ],
    categorie: 'Témoignage',
    image: imgNews3,
    auteur: 'Rédaction UPB News',
    tempsLecture: '5 min',
  },
  {
    id: '4',
    slug: 'guide-constituer-equipe-equilibree',
    date: '02 OCT. 2026',
    titre: 'Guide pratique : comment constituer une équipe gagnante ?',
    resume: 'Complémentarité des compétences, répartition des rôles et organisation interne : les conseils des jurys pour maximiser vos chances.',
    contenu: [
      'Pour maximiser vos chances de qualification, évitez les équipes monolithiques. Associez des profils orientés technique, stratégie, design et communication.',
      'Chaque équipe doit désigner un capitaine rigoureux qui sera le point de contact unique pour le dépôt des livrables et la gestion du calendrier.',
    ],
    categorie: 'Conseils',
    image: imgNews4,
    auteur: 'Jury & Formateurs UPB',
    tempsLecture: '6 min',
  },
];
