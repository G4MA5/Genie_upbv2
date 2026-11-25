/** Types des réponses du backend (inscriptions & équipes). */

export type CleCategorie = 'technologie' | 'innovation' | 'economie' | 'droit';
export type EtatEquipe = 'brouillon' | 'soumise' | 'validee' | 'refusee';

export interface Etudiant {
  id?: number;
  matricule: string;
  nom: string;
  prenom?: string;
  prenoms?: string;
  initiales: string;
  niveau: string | null;
  filiere: string | null;
  genre?: string | null;
  photo_url?: string | null;
}

export interface Candidat extends Etudiant {
  id: number;
  prenom: string;
  email: string | null;
  telephone: string | null;
  date_naissance: string | null;
  hebergement: boolean;
  numero_candidat: string | null;
  inscrit_le: string | null;
  conditions_acceptees_le: string | null;
}

export interface ConcoursInfo {
  id: number;
  titre: string;
  categorie: string;
  cle: CleCategorie | null;
  taille: string;
  min_membres: number;
  max_membres: number;
  regles: string[];
  nb_equipes?: number;
}

export interface MembreEquipe extends Etudiant {
  id: number;
  prenom: string;
  est_chef: boolean;
  rejoint_le: string;
}

export interface Controle {
  code: string;
  libelle: string;
  ok: boolean;
  detail: string;
}

export interface Ressource {
  id: number;
  file_name: string;
  type_mime: string | null;
  taille: number | null;
  date: string;
  date_limit: string | null;
  depose_par: string | null;
  peut_supprimer: boolean;
}

export interface Equipe {
  id: number;
  nom: string;
  concours: ConcoursInfo | null;
  etat: EtatEquipe;
  modifiable: boolean;
  est_chef: boolean;
  cree_le: string | null;
  soumise_le: string | null;
  validee_le: string | null;
  motif_refus: string | null;
  membres: MembreEquipe[];
  invitations_envoyees: { id: number; cree_le: string; invite: Etudiant & { id: number; prenom: string } }[];
  places_restantes: number;
  /** true seulement en Innovation : seule catégorie qui fournit des documents */
  documents: boolean;
  ressources: Ressource[];
  date_limite_ressources: string;
  controles: Controle[];
  peut_soumettre: boolean;
  /** Le chef peut supprimer l'équipe : avant soumission et tant qu'elle ne remplit pas toutes les conditions */
  peut_supprimer: boolean;
  badge_url: string | null;
}

export interface Retrait {
  equipe: string;
  categorie: string | null;
  par: string | null;
  motif: string | null;
  le: string;
}

/** Réponse brute de GET /api/espace. */
export interface EspaceApi {
  candidat: Candidat;
  /** 0, 1 ou 2 équipes (la catégorie de sa filière + Innovation) */
  equipes: Equipe[];
  categories_possibles: CleCategorie[];
  invitations_en_attente: number;
  retrait: Retrait | null;
  inscriptions_ouvertes: boolean;
  inscriptions_cloture: string;
}

/** Vue utilisée par les pages : `equipe` = l'équipe sélectionnée. */
export interface Espace {
  candidat: Candidat;
  equipes: Equipe[];
  equipe: Equipe | null;
  categories_possibles: CleCategorie[];
  invitations_en_attente: number;
  retrait: Retrait | null;
  badge_url: string | null;
  inscriptions_ouvertes: boolean;
  inscriptions_cloture: string;
}

export interface Invitation {
  id: number;
  cree_le: string;
  equipe: { id: number; nom: string; categorie: string; cle: CleCategorie | null; nb_membres: number; taille: string };
  chef: { nom: string; prenom: string; initiales: string; photo_url: string | null };
  /** false si l'accepter violerait la règle des 2 équipes (catégorie de sa filière + Innovation) ou sa filière */
  compatible: boolean;
}

export interface Referentiel {
  concours: ConcoursInfo[];
  inscriptions_cloture: string;
  inscriptions_ouvertes: boolean;
  evenement: { date_debut: string | null; date_fin: string | null };
}
