import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5 : FORMATIONS HUB (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19969413) :
 * - Titre "Formations"
 * - Alerte format allégé (24 déc. au 3 janv.)
 * - Carte Prochaine séance (blueprint #0A1430 avec grille, date, salle, formateur)
 * - Bouton "Voir la séance" (gradient orange vers P5c)
 * - Grille de 4 tuiles interactives pleine largeur (4 colonnes sur desktop) :
 *   1. Calendrier (12 séances) -> P5a
 *   2. Supports (8 documents) -> P5b
 *   3. Assiduité (88 %) -> P5d
 *   4. Annonces (2 nouvelles) -> P5e
 * 100% pleine largeur sur grand écran.
 */

export default function FormationsHub() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Titre */}
        <div className="flex items-center justify-between">
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Formations
          </h1>
        </div>

        {/* Notice format allégé */}
        <div className="w-full flex gap-3 p-4 px-5 rounded-[20px] bg-[#FBEFD2] text-[#7A4F00] font-medium text-[15px] leading-[1.5] shadow-sm">
          <span className="font-black text-[18px]">☾</span>
          <span>
            <strong>Du 24 déc. au 3 janv. :</strong> format allégé, séances à distance en fin de journée, disponibles en replay.
          </span>
        </div>

        {/* Carte PROCHAINE SÉANCE (Blueprint sombre pleine largeur) */}
        <div className="w-full relative bg-[#0A1430] text-white rounded-[26px] p-6 sm:p-7 flex flex-col gap-3 overflow-hidden shadow-[0_14px_34px_rgba(10,20,48,0.18)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]">
          <span className="font-bold text-[12px] font-mono tracking-[0.06em] text-[#F2C45A] uppercase">
            PROCHAINE SÉANCE · JEU. 7 JANV.
          </span>
          <span className="font-black text-[26px] sm:text-[28px] leading-[1.1] text-white">
            Prototypage rapide et maquettes
          </span>
          <span className="font-medium text-[16px] text-[#C9D1E8]">
            09:00 – 12:00 · Fablab, bât. C · Mme Konan
          </span>

          <button
            type="button"
            onClick={() => navigate('/espace/formations/visio')}
            className="self-start mt-2 min-h-[54px] px-6 rounded-[18px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          >
            Voir la séance
          </button>
        </div>

        {/* Grille des 4 sections d'accès rapide (4 colonnes sur desktop) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Tuile 1 : Calendrier */}
          <div
            onClick={() => navigate('/espace/formations/planning')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[32px] text-[#F58220]">
              12
            </span>
            <span className="font-black text-[17px] text-[#0A1430] flex items-center justify-between">
              Calendrier <span>→</span>
            </span>
          </div>

          {/* Tuile 2 : Supports */}
          <div
            onClick={() => navigate('/espace/formations/supports')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[32px] text-[#F58220]">
              8
            </span>
            <span className="font-black text-[17px] text-[#0A1430] flex items-center justify-between">
              Supports <span>→</span>
            </span>
          </div>

          {/* Tuile 3 : Assiduité */}
          <div
            onClick={() => navigate('/espace/formations/presence')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[32px] text-[#17744B]">
              88 %
            </span>
            <span className="font-black text-[17px] text-[#0A1430] flex items-center justify-between">
              Assiduité <span>→</span>
            </span>
          </div>

          {/* Tuile 4 : Annonces */}
          <div
            onClick={() => navigate('/espace/formations/annonces')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[32px] text-[#F58220]">
              2
            </span>
            <span className="font-black text-[17px] text-[#0A1430] flex items-center justify-between">
              Annonces <span>→</span>
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
