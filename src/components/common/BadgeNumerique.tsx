import React, { useState } from 'react';
import logoGenie from '../../assets/images/badge_logo_genie.png';
import logoUpb from '../../assets/images/badge_logo_upb.png';

export type ParticipantCategory = 'Innovation' | 'Droit' | 'Économie' | 'Technologie';

export type BadgeRoleType =
  | 'PARTICIPANT'
  | 'ORGANISATEUR'
  | 'ENCADREUR / FORMATEUR'
  | 'INVITÉ'
  | 'PARTENAIRE'
  | 'JURY';

export interface BadgeThemeConfig {
  primary: string;        // Couleur principale du badge
  secondary: string;      // Couleur secondaire pour dégradés/accents
  bgLight: string;        // Fond très clair de la carte haute
  gridLine: string;       // Couleur des lignes de grille
  tileFill: string;       // Couleur des tuiles pleines flottantes
  titleColor: string;     // Couleur du titre (ex: PARTICIPANT)
  pillBg: string;         // Fond du badge de catégorie
  pillText: string;       // Texte du badge de catégorie
  bottomBg: string;       // Fond du bloc inférieur (QR + nom)
  label: string;          // Libellé officiel
  filiereDefaut?: string; // Filière type pour la démo
}

// Configuration complète des thèmes (4 catégories participants + extensions pour le backend)
export const BADGE_THEMES: Record<ParticipantCategory | string, BadgeThemeConfig> = {
  Innovation: {
    primary: '#0F357C',
    secondary: '#1A4BA6',
    bgLight: '#F5F8FE',
    gridLine: 'rgba(15, 53, 124, 0.18)',
    tileFill: 'rgba(15, 53, 124, 0.28)',
    titleColor: '#0F357C',
    pillBg: '#0F357C',
    pillText: '#FFFFFF',
    bottomBg: '#0F357C',
    label: 'Innovation',
    filiereDefaut: 'Etudiant en L2 MIAGE',
  },
  Droit: {
    primary: '#E11D48',
    secondary: '#BE123C',
    bgLight: '#FDF2F4',
    gridLine: 'rgba(225, 29, 72, 0.18)',
    tileFill: 'rgba(225, 29, 72, 0.28)',
    titleColor: '#E11D48',
    pillBg: '#E11D48',
    pillText: '#FFFFFF',
    bottomBg: '#E11D48',
    label: 'Droit',
    filiereDefaut: 'Etudiant en L3 SJAP',
  },
  'Économie': {
    primary: '#00A52C',
    secondary: '#008C25',
    bgLight: '#F0FBF3',
    gridLine: 'rgba(0, 165, 44, 0.18)',
    tileFill: 'rgba(0, 165, 44, 0.28)',
    titleColor: '#00A52C',
    pillBg: '#00A52C',
    pillText: '#FFFFFF',
    bottomBg: '#00A52C',
    label: 'Économie',
    filiereDefaut: 'Etudiant en L3 SEA',
  },
  Technologie: {
    primary: '#FF5500',
    secondary: '#E64D00',
    bgLight: '#FFF6F0',
    gridLine: 'rgba(255, 85, 0, 0.18)',
    tileFill: 'rgba(255, 85, 0, 0.28)',
    titleColor: '#FF5500',
    pillBg: '#FF5500',
    pillText: '#FFFFFF',
    bottomBg: '#FF5500',
    label: 'Technologie',
    filiereDefaut: 'Etudiant en L3 3EA',
  },
  // Extensions pour les 5 autres rôles (prévus pour le backend)
  Organisateur: {
    primary: '#1F1E24',
    secondary: '#32303A',
    bgLight: '#F6F6F7',
    gridLine: 'rgba(31, 30, 36, 0.18)',
    tileFill: 'rgba(31, 30, 36, 0.28)',
    titleColor: '#1F1E24',
    pillBg: '#1F1E24',
    pillText: '#FFFFFF',
    bottomBg: '#1F1E24',
    label: 'Organisateur',
    filiereDefaut: 'Comité d\'Organisation',
  },
  Formateur: {
    primary: '#0C9488',
    secondary: '#0F766E',
    bgLight: '#F0FDFA',
    gridLine: 'rgba(12, 148, 136, 0.18)',
    tileFill: 'rgba(12, 148, 136, 0.28)',
    titleColor: '#0C9488',
    pillBg: '#0C9488',
    pillText: '#FFFFFF',
    bottomBg: '#0C9488',
    label: 'Encadreur / Formateur',
    filiereDefaut: 'Corps Professoral UPB',
  },
  'Invité': {
    primary: '#E6B60A',
    secondary: '#CA9E04',
    bgLight: '#FEFCE8',
    gridLine: 'rgba(230, 182, 10, 0.22)',
    tileFill: 'rgba(230, 182, 10, 0.32)',
    titleColor: '#D4A000',
    pillBg: '#E6B60A',
    pillText: '#FFFFFF',
    bottomBg: '#E6B60A',
    label: 'Invité',
    filiereDefaut: 'Visiteur Officiel',
  },
  Partenaire: {
    primary: '#8EBCFC',
    secondary: '#60A5FA',
    bgLight: '#EFF6FF',
    gridLine: 'rgba(142, 188, 252, 0.28)',
    tileFill: 'rgba(142, 188, 252, 0.38)',
    titleColor: '#3B82F6',
    pillBg: '#8EBCFC',
    pillText: '#FFFFFF',
    bottomBg: '#8EBCFC',
    label: 'Partenaire',
    filiereDefaut: 'Partenaire Entreprise',
  },
  Jury: {
    primary: '#6366F1',
    secondary: '#4F46E5',
    bgLight: '#EEF2FF',
    gridLine: 'rgba(99, 102, 241, 0.18)',
    tileFill: 'rgba(99, 102, 241, 0.28)',
    titleColor: '#6366F1',
    pillBg: '#6366F1',
    pillText: '#FFFFFF',
    bottomBg: '#6366F1',
    label: 'Jury',
    filiereDefaut: 'Membre du Jury Officiel',
  },
};

export interface BadgeNumeriqueProps {
  categorie?: ParticipantCategory;
  role?: BadgeRoleType;
  nom?: string;
  prenom?: string;
  filiere?: string;
  matricule?: string;
  equipe?: string;
  animated?: boolean;
  className?: string;
}

export default function BadgeNumerique({
  categorie = 'Innovation',
  role = 'PARTICIPANT',
  nom = 'KOUASSI',
  prenom = 'Aya',
  filiere,
  matricule = '23UPB0457',
  equipe = 'Les Bâtisseurs',
  animated = true,
  className = '',
}: BadgeNumeriqueProps) {
  const theme = BADGE_THEMES[categorie] || BADGE_THEMES.Innovation;
  const filiereAffichee = filiere || theme.filiereDefaut || 'Etudiant en L2 MIAGE';

  return (
    <div
      className={`relative w-full max-w-[340px] rounded-[32px] overflow-hidden bg-white shadow-[0_24px_60px_rgba(10,20,48,0.25)] border border-slate-100 flex flex-col select-none transition-all duration-300 ${className}`}
      style={{
        boxShadow: `0 24px 50px -12px ${theme.primary}40, 0 12px 24px -8px rgba(0,0,0,0.12)`,
      }}
    >
      {/* ==================================================================
          SECTION SUPÉRIEURE (BLANCHE / GRILLE ANIMÉE)
          ================================================================== */}
      <div className="relative pt-6 px-6 pb-6 overflow-hidden flex flex-col items-center min-h-[340px]">
        
        {/* GRILLE D'ARRIÈRE-PLAN MATRICIELLE ANIMÉE */}
        <div
          aria-hidden="true"
          className="absolute -inset-10 pointer-events-none origin-center"
          style={{
            transform: 'rotate(-10deg) scale(1.3)',
          }}
        >
          {/* Lignes de grille en mouvement infini */}
          <div
            className={`w-full h-full ${animated ? 'animate-[gridDrift_12s_linear_infinite]' : ''}`}
            style={{
              backgroundImage: `
                linear-gradient(${theme.gridLine} 1.5px, transparent 1.5px),
                linear-gradient(90deg, ${theme.gridLine} 1.5px, transparent 1.5px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Tuiles carrées pleines / flottantes semi-transparentes */}
          <div
            className="absolute top-[80px] left-[70px] w-[39px] h-[39px] rounded-[2px]"
            style={{ backgroundColor: theme.tileFill }}
          />
          <div
            className="absolute top-[160px] left-[150px] w-[39px] h-[39px] rounded-[2px]"
            style={{ backgroundColor: theme.tileFill }}
          />
          <div
            className="absolute top-[120px] right-[90px] w-[39px] h-[39px] rounded-[2px]"
            style={{ backgroundColor: theme.tileFill }}
          />
          <div
            className="absolute bottom-[100px] left-[110px] w-[39px] h-[39px] rounded-[2px]"
            style={{ backgroundColor: theme.tileFill }}
          />
          <div
            className="absolute bottom-[60px] right-[130px] w-[39px] h-[39px] rounded-[2px]"
            style={{ backgroundColor: theme.tileFill }}
          />
        </div>

        {/* LOGOS SUPÉRIEURS (Génie UPB à gauche, Université UPB à droite) */}
        <div className="relative z-10 w-full flex justify-between items-start mb-6">
          {/* Logo Génie UPB 3e édition */}
          <div className="w-[102px] h-[58px] flex items-center shrink-0">
            <img
              src={logoGenie}
              alt="Génie UPB 3e Édition"
              className="w-full h-full object-contain filter drop-shadow-xs"
            />
          </div>

          {/* Logo Université Polytechnique de Bingerville */}
          <div className="w-[78px] h-[66px] flex items-center justify-end shrink-0">
            <img
              src={logoUpb}
              alt="Université Polytechnique de Bingerville"
              className="w-full h-full object-contain filter drop-shadow-xs"
            />
          </div>
        </div>

        {/* TITRE PRINCIPAL DU BADGE (PARTICIPANT) */}
        <div className="relative z-10 my-auto py-2 flex flex-col items-center text-center">
          <h2
            className="font-black text-[30px] sm:text-[32px] tracking-[0.05em] uppercase m-0 leading-none"
            style={{ color: theme.titleColor }}
          >
            {role}
          </h2>

          {/* PILL / BADGE DE CATÉGORIE (En parallélogramme incliné fidèle) */}
          <div className="mt-4 flex items-center justify-center">
            <div
              className="rounded-[16px] px-7 py-2.5 shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-300"
              style={{
                backgroundColor: theme.pillBg,
                transform: 'skewX(-14deg)',
              }}
            >
              <span
                className="block font-black text-[20px] sm:text-[22px] tracking-wide text-white leading-tight"
                style={{
                  transform: 'skewX(14deg)',
                }}
              >
                {theme.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================
          SÉPARATEUR DE VAGUE ARCHÉE (COURBE SIGNATURE FIDÈLE AU VISUEL)
          ================================================================== */}
      <div className="relative w-full -mb-[1px] leading-none z-10">
        <svg
          viewBox="0 0 340 44"
          className="w-full h-[36px] sm:h-[42px] block"
          preserveAspectRatio="none"
        >
          {/* Forme pleine de fond avec la courbure signature sur la droite */}
          <path
            d="M 0 8 L 195 8 Q 260 8 340 44 L 340 44 L 0 44 Z"
            fill={theme.bottomBg}
          />
          {/* Double ligne blanche de contour élégante */}
          <path
            d="M 0 17 L 190 17 Q 252 17 330 44"
            fill="none"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ==================================================================
          SECTION INFÉRIEURE COLORÉE (QR CODE BLANC + NOM + FORMATION)
          ================================================================== */}
      <div
        className="relative z-10 px-5 pt-1 pb-6 text-white flex items-center gap-4"
        style={{ backgroundColor: theme.bottomBg }}
      >
        {/* QR CODE EN BLANC CONTRASTÉ */}
        <div className="shrink-0 w-[114px] h-[114px] p-1 flex items-center justify-center">
          <svg
            width="106"
            height="106"
            viewBox="0 0 106 106"
            className="w-full h-full block"
          >
            {/* Coin supérieur gauche */}
            <rect x="0" y="0" width="34" height="34" rx="4" fill="#ffffff" />
            <rect x="6" y="6" width="22" height="22" rx="2" fill={theme.bottomBg} />
            <rect x="11" y="11" width="12" height="12" fill="#ffffff" />

            {/* Coin supérieur droit */}
            <rect x="72" y="0" width="34" height="34" rx="4" fill="#ffffff" />
            <rect x="78" y="6" width="22" height="22" rx="2" fill={theme.bottomBg} />
            <rect x="83" y="11" width="12" height="12" fill="#ffffff" />

            {/* Coin inférieur gauche */}
            <rect x="0" y="72" width="34" height="34" rx="4" fill="#ffffff" />
            <rect x="6" y="78" width="22" height="22" rx="2" fill={theme.bottomBg} />
            <rect x="11" y="83" width="12" height="12" fill="#ffffff" />

            {/* Modules et motifs de synchronisation */}
            <rect x="42" y="4" width="7" height="14" fill="#ffffff" />
            <rect x="56" y="10" width="8" height="7" fill="#ffffff" />
            <rect x="42" y="24" width="12" height="7" fill="#ffffff" />

            <rect x="8" y="42" width="8" height="8" fill="#ffffff" />
            <rect x="22" y="42" width="12" height="7" fill="#ffffff" />
            <rect x="42" y="42" width="22" height="22" rx="4" fill="#ffffff" />
            <circle cx="53" cy="53" r="5" fill={theme.bottomBg} />
            <rect x="72" y="42" width="11" height="8" fill="#ffffff" />
            <rect x="91" y="47" width="13" height="7" fill="#ffffff" />

            <rect x="42" y="72" width="9" height="14" fill="#ffffff" />
            <rect x="58" y="77" width="14" height="8" fill="#ffffff" />
            <rect x="78" y="72" width="11" height="10" fill="#ffffff" />
            <rect x="94" y="85" width="11" height="16" fill="#ffffff" />
            <rect x="55" y="93" width="15" height="9" fill="#ffffff" />
          </svg>
        </div>

        {/* IDENTITÉ DU PARTICIPANT */}
        <div className="flex-1 min-w-0 flex flex-col justify-center text-left leading-tight">
          {/* Nom en majuscules grasses */}
          <span className="font-black text-[22px] tracking-[0.04em] uppercase text-white truncate">
            {nom}
          </span>
          
          {/* Prénom en graisse moyenne */}
          <span className="font-semibold text-[17px] text-white/95 truncate mt-0.5">
            {prenom}
          </span>

          {/* Filière / Équipe */}
          <span className="font-normal text-[12px] text-white/80 mt-2 leading-snug line-clamp-2">
            {filiereAffichee}
          </span>

          {/* Équipe si renseignée */}
          {equipe && (
            <span className="font-medium text-[11px] text-white/70 tracking-wider uppercase mt-1">
              Équipe : {equipe}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * MODAL DU BADGE NUMÉRIQUE (AVEC SÉLECTEUR DE CATÉGORIES POUR TEST & BACKEND)
 * ============================================================================
 */
export function ModalBadgeNumerique({
  isOpen,
  onClose,
  initialCategorie = 'Innovation',
  nom = 'KOUASSI',
  prenom = 'Aya',
  filiere = 'Etudiant en L2 MIAGE',
  matricule = '23UPB0457',
  equipe = 'Les Bâtisseurs',
}: {
  isOpen: boolean;
  onClose: () => void;
  initialCategorie?: ParticipantCategory;
  nom?: string;
  prenom?: string;
  filiere?: string;
  matricule?: string;
  equipe?: string;
}) {
  const [selectedCat, setSelectedCat] = useState<ParticipantCategory>(initialCategorie);

  if (!isOpen) return null;

  const categories: ParticipantCategory[] = ['Innovation', 'Droit', 'Économie', 'Technologie'];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[500] bg-[#0A1430]/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[390px] flex flex-col items-center gap-3 my-auto animate-in zoom-in-95 duration-200"
      >
        {/* BARRE SUPÉRIEURE : SÉLECTEUR + BOUTON FERMETURE */}
        <div className="w-full flex items-center justify-between gap-2.5">
          {/* SÉLECTEUR DE CATÉGORIE (POUR VÉRIFICATION VISUELLE DES 4 BADGES) */}
          <div className="flex-1 min-w-0 bg-[#0A1430]/90 border border-white/20 p-1 rounded-[18px] backdrop-blur-md flex gap-1 shadow-lg">
            {categories.map((cat) => {
              const isSel = selectedCat === cat;
              const theme = BADGE_THEMES[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`flex-1 py-1.5 px-1.5 rounded-[12px] font-extrabold text-[11px] sm:text-[12px] transition-all cursor-pointer text-center truncate ${
                    isSel
                      ? 'text-white shadow-md scale-[1.02]'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: isSel ? theme.primary : 'transparent',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* BOUTON FERMER DÉDIÉ SANS CHEVAUCHEMENT */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 shrink-0 rounded-full bg-white flex items-center justify-center text-[#0A1430] font-black text-[13px] cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* LE BADGE OFFICIEL FIDÈLE */}
        <BadgeNumerique
          categorie={selectedCat}
          role="PARTICIPANT"
          nom={nom}
          prenom={prenom}
          filiere={filiere}
          matricule={matricule}
          equipe={equipe}
          animated={true}
        />

        {/* MENTIONS COMPLÉMENTAIRES */}
        <div className="w-full max-w-[340px] flex flex-col items-center gap-2 text-center">
          <span className="font-medium text-[12px] leading-snug text-white/80 px-2 drop-shadow-xs">
            Présente ce QR code à l'entrée de chaque séance et des épreuves.
          </span>

          <span className="font-semibold text-[11px] font-mono text-[#8A5A00] bg-[#FFF3C2] py-1 px-3 rounded-[8px] shadow-xs">
            Actif après validation de l'équipe
          </span>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-1 min-h-[44px] rounded-[16px] bg-white hover:bg-slate-100 text-[#0A1430] font-black text-[14px] shadow-md transition-all cursor-pointer active:scale-98"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
