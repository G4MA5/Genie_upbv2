export interface FaqItem {
  id: string;
  theme: 'Inscriptions' | 'Équipes' | 'Formations' | 'Épreuves' | 'Logistique';
  question: string;
  reponse: string;
}

export const faqCategories = ['Tous', 'Inscriptions', 'Équipes', 'Formations', 'Épreuves', 'Logistique'] as const;

export const faqList: FaqItem[] = [
  {
    id: '1',
    theme: 'Inscriptions',
    question: 'Qui peut participer au concours GÉNIE UPB ?',
    reponse: 'Tous les étudiants de Licence (L1, L2, L3) régulièrement inscrits à l’Université Polytechnique de Bingerville, toutes filières confondues. Les étudiants de Master peuvent intervenir en tant que tuteurs mais ne concourent pas.',
  },
  {
    id: '2',
    theme: 'Inscriptions',
    question: 'L’inscription est-elle gratuite ?',
    reponse: 'Oui, l’inscription, les 5 semaines de formations certifiantes ainsi que l’accès aux laboratoires et matériels du tournoi sont 100% gratuits, pris en charge par l’UPB et nos partenaires.',
  },
  {
    id: '3',
    theme: 'Équipes',
    question: 'Combien d’étudiants doit comporter une équipe ?',
    reponse: 'Les équipes doivent être composées de 4 à 6 membres pour les catégories Technologie, Innovation et Droit. Pour la catégorie Économie, la taille requise est de 4 membres stricts.',
  },
  {
    id: '4',
    theme: 'Équipes',
    question: 'Puis-je créer mon compte sans avoir encore d’équipe complète ?',
    reponse: 'Absolument ! Créez votre profil individuel, puis vous pourrez créer votre équipe et inviter vos camarades via leur matricule étudiant UPB, ou accepter une invitation reçue.',
  },
  {
    id: '5',
    theme: 'Formations',
    question: 'Les formations sont-elles obligatoires pour participer aux épreuves ?',
    reponse: 'Oui, un taux d’assiduité minimal de 80% aux 5 semaines de formations est exigé pour valider la candidature et accéder aux épreuves finales de janvier.',
  },
  {
    id: '6',
    theme: 'Formations',
    question: 'Comment se déroulent les séances à distance (visio) ?',
    reponse: 'Chaque candidat dispose dans son Espace d’un onglet « Séance à distance » avec le flux vidéo en direct, le salon de discussion interactif et l’émargement automatique de présence.',
  },
  {
    id: '7',
    theme: 'Épreuves',
    question: 'Les projets doivent-ils être rédigés en français uniquement ?',
    reponse: 'Oui, les dossiers écrits et les présentations orales officielles devant le jury se font en langue française. Toutefois, l’usage de termes techniques internationaux en anglais est parfaitement admis.',
  },
  {
    id: '8',
    theme: 'Logistique',
    question: 'Où se déroulent les épreuves et la finale ?',
    reponse: 'Toutes les épreuves présentielles se tiennent sur le campus principal de l’Université Polytechnique de Bingerville (Laboratoires, Salle des Thèses et Grand Amphithéâtre). Des navettes dédiées sont mises en place.',
  },
];
