export interface DocumentItem {
  id: string;
  t: string;
  d: string;
  v: string;
  s: string;
  tag: string;
  format: 'PDF';
  /** Fichier réel servi depuis public/ (ex. /ressources/x.pdf). */
  fichier?: string;
  // Compatibility aliases
  titre?: string;
  description?: string;
  taille?: string;
}

export const documentsData: DocumentItem[] = [
  {
    id: 'doc-reglement',
    t: 'Règlement du concours',
    d: 'Conditions de participation, déroulement des épreuves et sanctions.',
    v: 'Version du 10 nov. 2026',
    s: '231 Ko',
    tag: 'Obligatoire',
    format: 'PDF',
    // Fiche d'engagement du concours (participant + parent / tuteur légal)
    fichier: '/ressources/fiche-engagement-genie-upb.pdf',
    titre: 'Règlement du concours',
    description: 'Conditions de participation, déroulement des épreuves et sanctions.',
    taille: '231 Ko',
  },
  {
    id: 'doc-charte-participants',
    t: 'Charte des participants',
    d: 'Engagements de chaque membre pendant les formations et le concours.',
    v: 'Version du 10 nov. 2026',
    s: '640 Ko',
    tag: 'Obligatoire',
    format: 'PDF',
    titre: 'Charte des participants',
    description: 'Engagements de chaque membre pendant les formations et le concours.',
    taille: '640 Ko',
  },
  {
    id: 'doc-charte-ethique',
    t: "Charte d'éthique — Technologie",
    d: "Règles sur le code, les données et l\u2019usage des outils d\u2019IA.",
    v: 'Version du 12 nov. 2026',
    s: '480 Ko',
    tag: 'Technologie',
    format: 'PDF',
    titre: "Charte d'éthique — Technologie",
    description: "Règles sur le code, les données et l\u2019usage des outils d\u2019IA.",
    taille: '480 Ko',
  },
  {
    id: 'doc-programme',
    t: 'Programme détaillé du concours',
    d: 'Horaires et lieux des quatre journées, du 27 au 30 janvier.',
    v: 'Version du 14 nov. 2026',
    s: '2,4 Mo',
    tag: '',
    format: 'PDF',
    titre: 'Programme détaillé du concours',
    description: 'Horaires et lieux des quatre journées, du 27 au 30 janvier.',
    taille: '2,4 Mo',
  },
];
