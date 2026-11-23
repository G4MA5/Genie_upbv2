export interface PartnerItem {
  a: string; // ID / Logo slot id (pt-1, pt-2, ...)
  b: string; // Nom du partenaire
  c: string; // Rôle / description du partenariat
  url?: string;
}

export interface PartnerGroup {
  g: string; // Titre du groupe (Matériel, Expertise, Dotations)
  items: PartnerItem[];
}

export const partnerGroups: PartnerGroup[] = [
  {
    g: 'Matériel',
    items: [
      { a: 'pt-1', b: 'ElectroCI', c: 'Kits électroniques et capteurs' },
      { a: 'pt-2', b: 'Ivoire Labs', c: 'Imprimantes 3D et fablab' },
    ],
  },
  {
    g: 'Expertise',
    items: [
      { a: 'pt-3', b: 'Cabinet Koné & Associés', c: 'Mentorat de la catégorie Droit' },
      { a: 'pt-4', b: 'Banque Atlantique', c: 'Ateliers finance de marché' },
    ],
  },
  {
    g: 'Dotations',
    items: [
      { a: 'pt-5', b: 'Orange Digital Center', c: 'Prix de la catégorie Innovation' },
      { a: 'pt-6', b: 'Ville de Bingerville', c: 'Prix du public' },
    ],
  },
];

// Compatibilité descendante pour l'Accueil
export const partnersData = partnerGroups.flatMap((g) =>
  g.items.map((it) => ({
    id: it.a,
    nom: it.b,
    type: it.c,
    description: it.c,
    badge: g.g,
    badgeCol: '#2F6BF0',
  }))
);
