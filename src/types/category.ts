export interface CategoryInfo {
  id: string;
  code: '01' | '02' | '03' | '04';
  name: 'Technologie' | 'Innovation' | 'Économie' | 'Droit';
  slug: string;
  pitch: string;
  tailleEquipe: string;
  placesRestantes: string;
  tauxRemplissage: number;
  couleur: string;
  tint?: string;
  image: string;
  epreuves: string[];
  formatEpreuve: string;
  criteres: { n: number; title: string }[];
  recompenses: string;
  responsable: {
    name: string;
    role: string;
    contact: string;
    avatar?: string;
  };
}
