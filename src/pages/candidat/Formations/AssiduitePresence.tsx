import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5d : ASSIDUITÉ ET PRÉSENCE (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19988959) :
 * - Bouton retour `←` rond
 * - Titre "Mon assiduité"
 * - Grille fluide 2 colonnes sur grand écran :
 *   - Colonne 1 : Deux cadrans donuts conic (Moi 88% vert #17744B, Mon équipe 74% jaune #E8B33D) + Notice d'explication
 *   - Colonne 2 : Liste des séances avec statuts de présence (Présent, Absent, À venir)
 * 100% pleine largeur sur grand écran.
 */

interface AttendanceRecord {
  id: string;
  t: string;
  d: string;
  s: string;
  bg: string;
  fg: string;
}

const ATTENDANCE_LIST: AttendanceRecord[] = [
  {
    id: '1',
    t: 'Séance 1 · Méthodologie du concours',
    d: 'Mer. 16 déc. · Présentiel (Amphi A)',
    s: 'Présent',
    bg: '#DDF7E8',
    fg: '#17744B',
  },
  {
    id: '2',
    t: 'Séance 2 · Prototypage et maquettes',
    d: 'Jeu. 7 janv. · Présentiel (Fablab)',
    s: 'Présent',
    bg: '#DDF7E8',
    fg: '#17744B',
  },
  {
    id: '3',
    t: 'Séance 3 · Business model & valeur',
    d: 'Ven. 8 janv. · À distance (Meet)',
    s: 'Absent',
    bg: '#FBE6E3',
    fg: '#B4281F',
  },
  {
    id: '4',
    t: 'Séance 4 · Atelier pitch en 7 minutes',
    d: 'Lun. 11 janv. · À distance (Meet)',
    s: 'À venir',
    bg: '#F2F0EA',
    fg: '#4A5168',
  },
];

export default function AssiduitePresence() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond `←` */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            ←
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Mon assiduité
          </h1>
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne 1 : Deux cadrans donut conic + Notice */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Cadran 1 : Moi */}
              <div className="bg-white rounded-[24px] p-6 flex flex-col items-center gap-3 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
                <div className="w-[104px] h-[104px] rounded-full bg-[conic-gradient(#17744B_0_88%,#EEECE6_88%)] flex items-center justify-center">
                  <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center font-black text-[24px] text-[#0A1430]">
                    88 %
                  </div>
                </div>
                <span className="font-extrabold text-[16px] text-[#0A1430]">Moi</span>
              </div>

              {/* Cadran 2 : Mon équipe */}
              <div className="bg-white rounded-[24px] p-6 flex flex-col items-center gap-3 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
                <div className="w-[104px] h-[104px] rounded-full bg-[conic-gradient(#E8B33D_0_74%,#EEECE6_74%)] flex items-center justify-center">
                  <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center font-black text-[24px] text-[#0A1430]">
                    74 %
                  </div>
                </div>
                <span className="font-extrabold text-[16px] text-[#0A1430]">Mon équipe</span>
              </div>
            </div>

            {/* Notice explicative */}
            <div className="flex gap-3 p-4 px-5 rounded-[20px] bg-[#E9ECF5] text-[#0A1430] font-medium text-[15px] leading-[1.5] shadow-sm">
              <span className="font-black text-[#2F6BF0] text-[16px]">i</span>
              <span>
                Présentiel : badge scanné à l'entrée par le formateur. À distance : présence enregistrée automatiquement à la connexion.
              </span>
            </div>
          </div>

          {/* Colonne 2 : Liste des émargements */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7] flex flex-col">
            <div className="p-4 px-5 border-b border-[#F2F0EA]">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
                HISTORIQUE DES ÉMARGEMENTS
              </span>
            </div>

            {ATTENDANCE_LIST.map((a, idx) => (
              <div
                key={a.id}
                className={`min-h-[68px] p-4 px-5 flex gap-3.5 items-center ${
                  idx > 0 ? 'border-t border-[#F2F0EA]' : ''
                }`}
              >
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="font-bold text-[16px] text-[#121628] leading-snug truncate">
                    {a.t}
                  </span>
                  <span className="font-medium text-[13px] text-[#6A7189] truncate">
                    {a.d}
                  </span>
                </div>
                <span
                  style={{ backgroundColor: a.bg, color: a.fg }}
                  className="px-3 py-1 rounded-full font-black text-[13px] shrink-0"
                >
                  {a.s}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
