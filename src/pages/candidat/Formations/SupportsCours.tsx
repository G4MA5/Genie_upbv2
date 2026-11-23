import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5b : SUPPORTS DE FORMATION (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19979835) :
 * - Bouton retour `←` rond
 * - Titre "Supports"
 * - Grille fluide 2 colonnes sur grand écran :
 *   - Groupes de supports par séance (badges de format, titre, bouton de téléchargement rond)
 *   - Carte de ressources partenaires exclusives catégorie Innovation (#F58220) avec bouton "Ouvrir ↗"
 * 100% pleine largeur sur grand écran.
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
            Supports
          </h1>
        </div>

        {/* Grille 2 colonnes fluide sur grand écran */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
          {SUPPORTS_DATA.map((g) => (
            <div
              key={g.s}
              className="bg-white rounded-[24px] p-5 sm:p-6 flex flex-col gap-2 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]"
            >
              <span className="font-black text-[18px] text-[#0A1430] mb-2">
                {g.s}
              </span>

              {g.items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3.5 items-center min-h-[56px] border-t border-[#F2F0EA] pt-2"
                >
                  <span className="w-[76px] py-1 rounded-[8px] bg-[#F2F0EA] font-extrabold text-[12px] text-[#4A5168] text-center shrink-0">
                    {it.k}
                  </span>
                  <span className="flex-1 font-bold text-[15px] text-[#121628] leading-snug">
                    {it.t}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Téléchargement de : ${it.t}`)}
                    className="w-11 h-11 shrink-0 rounded-full bg-[#0A1430] text-white flex items-center justify-center font-bold text-[15px] cursor-pointer hover:bg-[#1A2649] transition-colors"
                  >
                    {it.ic}
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Carte ressource partenaire exclusive Innovation */}
          <div className="bg-[#F58220] rounded-[24px] p-6 flex flex-col gap-3 text-[#0A1430] shadow-[0_10px_25px_rgba(245,130,32,0.25)]">
            <span className="font-bold text-[12px] font-mono tracking-[0.06em] uppercase text-[#0A1430]/80">
              VOTRE CATÉGORIE · INNOVATION
            </span>
            <span className="font-black text-[22px] leading-tight text-[#0A1430]">
              Banque d'études de marché
            </span>
            <span className="font-semibold text-[15px] leading-[1.5] text-[#0A1430]/90">
              Données et modèles fournis par nos partenaires pour votre projet.
            </span>
            <button
              type="button"
              onClick={() => alert('Ouverture de la banque de données partenaires.')}
              className="self-start mt-2 min-h-[46px] px-5 rounded-full bg-[#0A1430] text-white font-extrabold text-[14px] flex items-center cursor-pointer hover:bg-[#1A2649] transition-colors"
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
