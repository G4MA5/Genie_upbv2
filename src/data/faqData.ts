export interface FaqItem {
  id: string;
  theme: 'Inscription' | 'Équipes' | 'Formations' | 'Concours' | 'Pratique';
  q: string;
  a: string;
  open?: boolean;
  // Compatibilité
  question?: string;
  reponse?: string;
}

export const faqThemes = ['Inscription', 'Équipes', 'Formations', 'Concours', 'Pratique'] as const;

export const faqData: FaqItem[] = [
  // Thème : Équipes (thème officiel par défaut du prototype)
  {
    id: 'eq-1',
    theme: 'Équipes',
    q: 'Combien de membres faut-il dans une équipe ?',
    a: 'Cela dépend de la catégorie : 4 à 6 membres en Innovation et en Droit, 4 en Économie. La taille pour Technologie sera confirmée prochainement.',
    open: true,
    question: 'Combien de membres faut-il dans une équipe ?',
    reponse: 'Cela dépend de la catégorie : 4 à 6 membres en Innovation et en Droit, 4 en Économie. La taille pour Technologie sera confirmée prochainement.',
  },
  {
    id: 'eq-2',
    theme: 'Équipes',
    q: 'Puis-je faire partie de deux équipes ?',
    a: 'Non. Chaque étudiant UPB ne peut être inscrit et rattaché qu’à une seule équipe et une seule catégorie durant toute l’édition 2026-2027.',
    open: false,
    question: 'Puis-je faire partie de deux équipes ?',
    reponse: 'Non. Chaque étudiant UPB ne peut être inscrit et rattaché qu’à une seule équipe et une seule catégorie durant toute l’édition 2026-2027.',
  },
  {
    id: 'eq-3',
    theme: 'Équipes',
    q: 'Qui peut inviter ou retirer un membre ?',
    a: 'Seul le chef d’équipe (qui a créé l’équipe au départ) a le droit d’émettre des invitations via les matricules étudiants et de retirer un coéquipier avant la soumission finale.',
    open: false,
    question: 'Qui peut inviter ou retirer un membre ?',
    reponse: 'Seul le chef d’équipe (qui a créé l’équipe au départ) a le droit d’émettre des invitations via les matricules étudiants et de retirer un coéquipier avant la soumission finale.',
  },
  {
    id: 'eq-4',
    theme: 'Équipes',
    q: 'Comment quitter mon équipe ?',
    a: 'Tant que le dossier n’a pas été formellement validé par le responsable, vous pouvez quitter votre équipe directement depuis votre espace candidat dans l’onglet « Mon équipe ».',
    open: false,
    question: 'Comment quitter mon équipe ?',
    reponse: 'Tant que le dossier n’a pas été formellement validé par le responsable, vous pouvez quitter votre équipe directement depuis votre espace candidat dans l’onglet « Mon équipe ».',
  },

  // Thème : Inscription
  {
    id: 'ins-1',
    theme: 'Inscription',
    q: 'Qui peut s’inscrire au concours GÉNIE UPB ?',
    a: 'Tous les étudiants régulièrement inscrits en Licence (L1, L2, L3) à l’Université Polytechnique de Bingerville, toutes spécialités confondues.',
    open: true,
    question: 'Qui peut s’inscrire au concours GÉNIE UPB ?',
    reponse: 'Tous les étudiants régulièrement inscrits en Licence (L1, L2, L3) à l’Université Polytechnique de Bingerville, toutes spécialités confondues.',
  },
  {
    id: 'ins-2',
    theme: 'Inscription',
    q: 'L’inscription au concours est-elle payante ?',
    a: 'Non, la participation au concours et l’ensemble des formations associées sont entièrement gratuites et prises en charge par l’UPB et ses partenaires.',
    open: false,
    question: 'L’inscription au concours est-elle payante ?',
    reponse: 'Non, la participation au concours et l’ensemble des formations associées sont entièrement gratuites et prises en charge par l’UPB et ses partenaires.',
  },

  // Thème : Formations
  {
    id: 'for-1',
    theme: 'Formations',
    q: 'La présence aux formations est-elle obligatoire ?',
    a: 'Oui. Un taux de présence d’au moins 80% est exigé pour chaque candidat afin de valider la participation de l’équipe aux épreuves finales du concours.',
    open: true,
    question: 'La présence aux formations est-elle obligatoire ?',
    reponse: 'Oui. Un taux de présence d’au moins 80% est exigé pour chaque candidat afin de valider la participation de l’équipe aux épreuves finales du concours.',
  },
  {
    id: 'for-2',
    theme: 'Formations',
    q: 'Comment sont dispensées les formations ?',
    a: 'Les formations combinent des ateliers pratiques sur le campus UPB et des webinaires accessibles en ligne depuis votre espace candidat.',
    open: false,
    question: 'Comment sont dispensées les formations ?',
    reponse: 'Les formations combinent des ateliers pratiques sur le campus UPB et des webinaires accessibles en ligne depuis votre espace candidat.',
  },

  // Thème : Concours
  {
    id: 'con-1',
    theme: 'Concours',
    q: 'Quelles sont les dates des épreuves finales ?',
    a: 'Les épreuves du concours se dérouleront sur trois jours consécutifs du 27 au 29 janvier 2027, suivies de la cérémonie de clôture le 30 janvier.',
    open: true,
    question: 'Quelles sont les dates des épreuves finales ?',
    reponse: 'Les épreuves du concours se dérouleront sur trois jours consécutifs du 27 au 29 janvier 2027, suivies de la cérémonie de clôture le 30 janvier.',
  },
  {
    id: 'con-2',
    theme: 'Concours',
    q: 'Quels sont les critères d’évaluation du jury ?',
    a: 'Le jury évalue la pertinence de la solution, la rigueur technique, l’impact économique ou sociétal ainsi que la qualité de la soutenance orale.',
    open: false,
    question: 'Quels sont les critères d’évaluation du jury ?',
    reponse: 'Le jury évalue la pertinence de la solution, la rigueur technique, l’impact économique ou sociétal ainsi que la qualité de la soutenance orale.',
  },

  // Thème : Pratique
  {
    id: 'pra-1',
    theme: 'Pratique',
    q: 'Où se situe le lieu des épreuves ?',
    a: 'Toutes les épreuves présentielles se tiennent sur le campus principal de l’Université Polytechnique de Bingerville.',
    open: true,
    question: 'Où se situe le lieu des épreuves ?',
    reponse: 'Toutes les épreuves présentielles se tiennent sur le campus principal de l’Université Polytechnique de Bingerville.',
  },
  {
    id: 'pra-2',
    theme: 'Pratique',
    q: 'Du matériel est-il fourni pour la catégorie Technologie ?',
    a: 'Oui, des kits électroniques, capteurs et accès aux imprimantes 3D et fablab sont mis à disposition des équipes sélectionnées.',
    open: false,
    question: 'Du matériel est-il fourni pour la catégorie Technologie ?',
    reponse: 'Oui, des kits électroniques, capteurs et accès aux imprimantes 3D et fablab sont mis à disposition des équipes sélectionnées.',
  },
];

// Compatibilité existante
export const faqList = faqData;
export const faqCategories = ['Tous', ...faqThemes] as const;
