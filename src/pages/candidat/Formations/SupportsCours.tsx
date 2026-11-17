import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5b : SUPPORTS DE FORMATION (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L539468 - 543510) :
 * - Bouton retour `←` rond
 * - Titre "Supports"
 * - Groupes de supports par séance (badges de format, titre, bouton de téléchargement rond)
 * - Carte de ressources exclusives catégorie Innovation (#F58220) avec bouton "Ouvrir ↗"
 * 100% Tailwind CSS valide.
 */

interface SupportItem {
  id: string;
  k: string; // format: PDF, SLIDES, CODE, VIDÉO
  t: string; // title
  ic: string; // icon: ↓, ↗, ▶
}

interface SupportGroup {
  s: string; // Session name
  items: SupportItem[];
}

const SUPPORTS_DATA: SupportGroup[] = [
  {
    s: 'Séance 1 · Méthodologie du concours',
    items: [
      { id: '1', k: 'PDF', t: 'Guide officiel du participant & barème jury', ic: '↓' },
      { id: '2', k: 'SLIDES', t: 'Présentation de rentrée des équipes', ic: '↓' },
      { id: '3', k: 'VIDÉO', t: 'Replay de la séance inaugurale (1h45)', ic: '▶' },
    ],
  },
  {
    s: 'Séance 2 · Prototypage et maquettes',
    items: [
      { id: '4', k: 'SLIDES', t: 'Kit UI Figma & composants officiels UPB', ic: '↗' },
      { id: '5', k: 'PDF', t: 'Fiche méthode : tests utilisateurs rapides', ic: '↓' },
    ],
  },
];

export default function SupportsCours() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 pt-16 md:pt-6">
        
        {/* Bouton retour rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/formations')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Supports
        </h1>

        {/* Groupes de documents */}
        <div className="flex flex-col gap-3.5">
          {SUPPORTS_DATA.map((g) => (
            <div
              key={g.s}
              className="bg-white rounded-[20px] p-3.5 px-4 flex flex-col gap-1 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]"
            >
              <span className="font-extrabold text-[17px] text-[#0A1430] mb-1.5">
                {g.s}
              </span>

              {g.items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3 items-center min-h-[52px] border-t border-[#F2F0EA] pt-1"
                >
                  <span className="w-[76px] py-1 rounded-[6px] bg-[#F2F0EA] font-bold text-[12px] text-[#4A5168] text-center shrink-0">
                    {it.k}
                  </span>
                  <span className="flex-1 font-semibold text-[15px] text-[#121628] leading-snug">
                    {it.t}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Téléchargement de : ${it.t}`)}
                    className="w-10 h-10 shrink-0 rounded-full bg-[#0A1430] text-white flex items-center justify-center font-bold text-[14px] cursor-pointer hover:bg-[#1A2649] transition-colors"
                  >
                    {it.ic}
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Carte ressource partenaire exclusive Innovation */}
          <div className="bg-[#F58220] rounded-[20px] p-4.5 p-4 flex flex-col gap-2 text-[#0A1430] shadow-sm">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em]">
              VOTRE CATÉGORIE · INNOVATION
            </span>
            <span className="font-extrabold text-[20px] leading-tight text-[#0A1430]">
              Banque d'études de marché
            </span>
            <span className="font-medium text-[15px] leading-[1.45]">
              Données et modèles fournis par nos partenaires pour votre projet.
            </span>
            <button
              type="button"
              onClick={() => alert('Ouverture de la banque de données partenaires.')}
              className="self-start mt-1 min-h-[44px] px-4 rounded-full bg-[#0A1430] text-white font-bold text-[14px] flex items-center cursor-pointer hover:bg-[#1A2649] transition-colors"
            >
              Ouvrir ↗
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
