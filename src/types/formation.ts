export interface FormationSession {
  id: string;
  titre: string;
  date: string;
  horaire: string;
  lieu: string;
  formateur: string;
  isVisio: boolean;
  lienVisio?: string;
}

export interface SupportCours {
  id: string;
  titre: string;
  categorie: string;
  datePublication: string;
  tailleFichier: string;
  url: string;
}
