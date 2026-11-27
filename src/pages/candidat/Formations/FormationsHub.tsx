import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, ArrowRight } from 'lucide-react';

/**
 * ============================================================================
 * P5 : FORMATIONS HUB (ESPACE PARTICIPANT)
 * ============================================================================
 * Hub officiel des formations :
 * - Titre "Formations"
 * - Notice d'information sur le déroulement des ateliers
 * - Carte Programme officiel (blueprint sombre #0A1430 avec grille)
 * - Bouton d'accès au calendrier
 * - Grille de 4 tuiles interactives (Calendrier, Supports, Assiduité, Annonces)
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

        {/* Notice d'information */}
        <div className="w-full flex gap-3 p-4 px-5 rounded-[20px] bg-[#EAF1FF] text-[#1D4FD8] font-medium text-[15px] leading-[1.5] shadow-sm items-start">
          <Info size={19} className="shrink-0 text-[#1D4FD8] mt-0.5" />
          <span>
            <strong>Ateliers préparatoires :</strong> les formations débuteront prochainement en présentiel et à distance. Les séances seront également disponibles en replay.
          </span>
        </div>

        {/* Carte PROGRAMME DES FORMATIONS (Blueprint sombre pleine largeur) */}
        <div className="w-full relative bg-[#0A1430] text-white rounded-[26px] p-6 sm:p-7 flex flex-col gap-3 overflow-hidden shadow-[0_14px_34px_rgba(10,20,48,0.18)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]">
          <span className="font-bold text-[12px] font-mono tracking-[0.06em] text-[#F2C45A] uppercase">
            PROGRAMME OFFICIEL DES FORMATIONS
          </span>
          <span className="font-black text-[26px] sm:text-[28px] leading-[1.1] text-white">
            Ateliers méthodologiques et techniques
          </span>
          <span className="font-medium text-[16px] text-[#C9D1E8]">
            Prototypage, business model, pitch et éthique : le planning officiel des sessions sera publié dès la finalisation des inscriptions.
          </span>

          <button
            type="button"
            onClick={() => navigate('/espace/formations/planning')}
            className="self-start mt-2 min-h-[52px] px-6 rounded-[18px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[16px] flex items-center gap-2 cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          >
            <span>Consulter le calendrier</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Grille des 4 sections d'accès rapide (4 colonnes sur desktop) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Tuile 1 : Calendrier */}
          <div
            onClick={() => navigate('/espace/formations/planning')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[30px] text-[#F58220]">
              —
            </span>
            <span className="font-black text-[16px] text-[#0A1430] flex items-center justify-between">
              <span>Calendrier</span>
              <ArrowRight size={16} strokeWidth={2.5} className="text-[#6A7189]" />
            </span>
          </div>

          {/* Tuile 2 : Supports */}
          <div
            onClick={() => navigate('/espace/formations/supports')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[30px] text-[#F58220]">
              —
            </span>
            <span className="font-black text-[16px] text-[#0A1430] flex items-center justify-between">
              <span>Supports</span>
              <ArrowRight size={16} strokeWidth={2.5} className="text-[#6A7189]" />
            </span>
          </div>

          {/* Tuile 3 : Assiduité */}
          <div
            onClick={() => navigate('/espace/formations/presence')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[30px] text-[#6A7189]">
              — %
            </span>
            <span className="font-black text-[16px] text-[#0A1430] flex items-center justify-between">
              <span>Assiduité</span>
              <ArrowRight size={16} strokeWidth={2.5} className="text-[#6A7189]" />
            </span>
          </div>

          {/* Tuile 4 : Annonces */}
          <div
            onClick={() => navigate('/espace/formations/annonces')}
            className="bg-white rounded-[22px] p-5 min-h-[120px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-black text-[30px] text-[#F58220]">
              0
            </span>
            <span className="font-black text-[16px] text-[#0A1430] flex items-center justify-between">
              <span>Annonces</span>
              <ArrowRight size={16} strokeWidth={2.5} className="text-[#6A7189]" />
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
