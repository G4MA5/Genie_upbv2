export interface PartnerItem {
  id: string;
  nom: string;
  type: string;
  description: string;
  groupe: 'Institutionnels' | 'Entreprises & Sponsors' | 'Incubateurs & Écosystème';
  badge: string;
  badgeCol: string;
}

export const partnerGroupsData: { groupName: string; description: string; partners: PartnerItem[] }[] = [
  {
    groupName: 'Partenaires Institutionnels & Académiques',
    description: 'Les institutions qui garantissent l’excellence académique, la rigueur des jurys et la reconnaissance des certificats.',
    partners: [
      {
        id: '1',
        nom: 'Université Polytechnique de Bingerville (UPB)',
        type: 'Organisateur & Hôte Officiel',
        description: 'Mise à disposition des infrastructures technologiques, des amphithéâtres et du corps professoral.',
        groupe: 'Institutionnels',
        badge: 'Hôte Académique',
        badgeCol: '#2F6BF0',
      },
      {
        id: '2',
        nom: 'Ministère de l’Enseignement Supérieur & de la Recherche',
        type: 'Haut Patronage',
        description: 'Soutien institutionnel au rayonnement scientifique et à l’émulation intellectuelle des étudiants.',
        groupe: 'Institutionnels',
        badge: 'Patronage',
        badgeCol: '#0E1E4A',
      },
      {
        id: '3',
        nom: 'Ordre National des Avocats de Côte d’Ivoire',
        type: 'Parrain Catégorie Droit',
        description: 'Encadrement des procès simulés, parrainage des plaidoiries et accueil en stages d’immersion.',
        groupe: 'Institutionnels',
        badge: 'Juridique',
        badgeCol: '#BE185D',
      },
    ],
  },
  {
    groupName: 'Entreprises Sponsors & Industriels',
    description: 'Les leaders sectoriels qui financent les bourses d’incubation et proposent des cas d’études réels aux équipes.',
    partners: [
      {
        id: '4',
        nom: 'Orange Digital Center Côte d’Ivoire',
        type: 'Sponsor Titre — Catégorie Tech',
        description: 'Dotation hardware IoT, connectivité 5G sur le campus et mentorat par des architectes cloud.',
        groupe: 'Entreprises & Sponsors',
        badge: 'Tech & IoT',
        badgeCol: '#F58220',
      },
      {
        id: '5',
        nom: 'Société Générale Côte d’Ivoire (SGCI)',
        type: 'Sponsor Titre — Catégorie Économie',
        description: 'Alimentation des simulations financières de marché et dotation de 1,2M FCFA à l’équipe lauréate.',
        groupe: 'Entreprises & Sponsors',
        badge: 'Banque & Finance',
        badgeCol: '#0D9488',
      },
      {
        id: '6',
        nom: 'Gama Labs Tech Studios',
        type: 'Partenaire Plateforme Digitale',
        description: 'Conception ergonomique et architecture logicielle de la plateforme officielle du tournoi.',
        groupe: 'Entreprises & Sponsors',
        badge: 'Studio Digital',
        badgeCol: '#2F6BF0',
      },
    ],
  },
  {
    groupName: 'Incubateurs & Accélérateurs d’Innovation',
    description: 'Les structures qui prolongent l’aventure après la finale pour transformer les prototypes en véritables entreprises.',
    partners: [
      {
        id: '7',
        nom: 'Innov’UPB Incubateur Universitaire',
        type: 'Accompagnement Post-Concours',
        description: '6 mois d’incubation gratuite, prototypage dans les fablabs et coaching en levée de fonds.',
        groupe: 'Incubateurs & Écosystème',
        badge: 'Incubation',
        badgeCol: '#F58220',
      },
      {
        id: '8',
        nom: 'Hub Ivoire Tech & AgriStartup',
        type: 'Accélérateur Sectoriel',
        description: 'Déploiement terrain des solutions d’agriculture connectée auprès de coopératives agricoles.',
        groupe: 'Incubateurs & Écosystème',
        badge: 'Accélération',
        badgeCol: '#0D9488',
      },
    ],
  },
];

export const partnersData: PartnerItem[] = partnerGroupsData.flatMap((g) => g.partners);

