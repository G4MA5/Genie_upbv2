import type { CleCategorie, EtatEquipe } from '../types/espace';

/** Couleurs officielles des catégories (badges). */
export const COULEUR_CATEGORIE: Record<CleCategorie, string> = {
  technologie: '#FF5500',
  innovation: '#10357E',
  economie: '#00A52C',
  droit: '#E21D48',
};

export const couleurCategorie = (cle: CleCategorie | null | undefined) =>
  (cle && COULEUR_CATEGORIE[cle]) || '#2F6BF0';

/** Couleur d'avatar stable pour une personne. */
const PALETTE = ['#E8621A', '#2F6BF0', '#17744B', '#8E44AD', '#C8372D', '#0E9F6E', '#9061F9'];
export function couleurAvatar(cle: string | number | null | undefined): string {
  const s = String(cle ?? '');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

/** « AKA FULGENCE » -> « Aka Fulgence ». */
export function casse(texte: string | null | undefined): string {
  if (!texte) return '';
  return texte
    .toLowerCase()
    .split(/(\s|-)/)
    .map((m) => (m.trim() ? m.charAt(0).toUpperCase() + m.slice(1) : m))
    .join('');
}

export const premierPrenom = (prenoms: string | null | undefined) => casse((prenoms || '').split(' ')[0]);

export const nomComplet = (p: { prenom?: string | null; nom?: string | null }) =>
  `${casse(p.prenom)} ${casse(p.nom)}`.trim();

/** « Aya K. » */
export const nomCourt = (p: { prenom?: string | null; nom?: string | null }) =>
  `${premierPrenom(p.prenom)} ${(p.nom || '').charAt(0).toUpperCase()}.`.trim();

export const cursus = (p: { niveau?: string | null; filiere?: string | null }) =>
  [p.niveau, p.filiere].filter(Boolean).join(' · ');

const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MOIS_LONG = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export function dateCourte(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getDate()} ${MOIS[d.getMonth()]}`;
}

export function dateLongue(iso: string | null | undefined, annee = false): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getDate()} ${MOIS_LONG[d.getMonth()]}${annee ? ` ${d.getFullYear()}` : ''}`;
}

/** « aujourd'hui, 14:32 », « hier, 18:40 » ou « 12 nov., 09:05 ». */
export function dateRelative(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  const heure = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  const auj = new Date();
  const jour = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const ecart = Math.round((jour(auj) - jour(d)) / 86400000);
  if (ecart === 0) return `aujourd'hui, ${heure}`;
  if (ecart === 1) return `hier, ${heure}`;
  return `${dateCourte(iso)}, ${heure}`;
}

export function joursRestants(iso: string | null | undefined): number | null {
  if (!iso) return null;
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

export const LIBELLE_ETAT: Record<EtatEquipe, string> = {
  brouillon: 'Brouillon',
  soumise: 'Soumise',
  validee: 'Validée',
  refusee: 'À corriger',
};

export const PASTILLE_ETAT: Record<EtatEquipe, string> = {
  brouillon: '#AEB8D6',
  soumise: '#FFE14A',
  validee: '#4ADE80',
  refusee: '#FF8A7A',
};

export function tailleFichier(octets: number | null | undefined): string {
  if (!octets) return '';
  if (octets < 1024 * 1024) return `${Math.max(1, Math.round(octets / 1024))} Ko`;
  return `${(octets / 1024 / 1024).toFixed(1).replace('.', ',')} Mo`;
}

export const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? 's' : ''}`;

/** Nom affiché d'une catégorie à partir de sa clé (technologie, innovation, economie, droit). */
export const NOM_CATEGORIE: Record<string, string> = {
  technologie: 'Technologie',
  innovation: 'Innovation',
  economie: 'Économie',
  droit: 'Droit',
};

/** « Innovation », « Droit ou Innovation »… */
export function listeCategories(cles: string[]): string {
  const noms = cles.map((c) => NOM_CATEGORIE[c] ?? c);
  return noms.length <= 1 ? noms.join('') : `${noms.slice(0, -1).join(', ')} ou ${noms[noms.length - 1]}`;
}

/** Règle des 2 équipes, telle qu'expliquée aux candidats. */
export const REGLE_DEUX_EQUIPES =
  'Au plus 2 équipes : une en Droit, Technologie ou Économie (si ta filière y est acceptée) et une en Innovation.';
