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
  epreuves: string[];
}
