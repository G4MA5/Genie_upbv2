import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5d : ASSIDUITÉ ET PRÉSENCE (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L548076 - 552753) :
 * - Bouton retour `←` rond
 * - Titre "Mon assiduité"
 * - Deux cadrans donuts conic :
 *   1. "Moi" : 88 % (vert #17744B)
 *   2. "Mon équipe" : 74 % (jaune/orange #E8B33D)
 * - Notice d'explication des modes d'émargement (QR code en présentiel, connexion en visio)
 * - Liste des séances avec statuts de présence (Présent, Absent, À venir)
 * 100% Tailwind CSS valide.
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
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="max-w-[560px] w-full flex flex-col gap-3.5 pt-12 md:pt-4">
        
        {/* Bouton retour en rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/formations')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Mon assiduité
        </h1>

        {/* Deux cadrans donut conic */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Cadran 1 : Moi */}
          <div className="bg-white rounded-[20px] p-4 flex flex-col items-center gap-2 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
            <div className="w-[92px] h-[92px] rounded-full bg-[conic-gradient(#17744B_0_88%,#EEECE6_88%)] flex items-center justify-center">
              <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center font-extrabold text-[22px] text-[#0A1430]">
                88 %
              </div>
            </div>
            <span className="font-semibold text-[14px] text-[#4A5168]">Moi</span>
          </div>

          {/* Cadran 2 : Mon équipe */}
          <div className="bg-white rounded-[20px] p-4 flex flex-col items-center gap-2 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
            <div className="w-[92px] h-[92px] rounded-full bg-[conic-gradient(#E8B33D_0_74%,#EEECE6_74%)] flex items-center justify-center">
              <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center font-extrabold text-[22px] text-[#0A1430]">
                74 %
              </div>
            </div>
            <span className="font-semibold text-[14px] text-[#4A5168]">Mon équipe</span>
          </div>
        </div>

        {/* Notice explicative */}
        <div className="flex gap-2.5 p-3 px-3.5 rounded-[16px] bg-[#E9ECF5] text-[#0A1430] font-medium text-[14px] leading-[1.45]">
          <span className="font-extrabold text-[#2F6BF0]">i</span>
          <span>
            Présentiel : badge scanné à l'entrée. À distance : présence enregistrée à la connexion.
          </span>
        </div>

        {/* Liste des émargements */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
          {ATTENDANCE_LIST.map((a, idx) => (
            <div
              key={a.id}
              className={`min-h-[60px] px-4 flex gap-3 items-center ${
                idx > 0 ? 'border-t border-[#F2F0EA]' : ''
              }`}
            >
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="font-bold text-[15px] text-[#121628] leading-snug truncate">
                  {a.t}
                </span>
                <span className="font-medium text-[13px] text-[#6A7189] truncate">
                  {a.d}
                </span>
              </div>
              <span
                style={{ backgroundColor: a.bg, color: a.fg }}
                className="px-2.5 py-1 rounded-full font-bold text-[13px] shrink-0"
              >
                {a.s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
