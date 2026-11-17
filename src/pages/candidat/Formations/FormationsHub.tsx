import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5 : FORMATIONS HUB (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L529640 - 534799) :
 * - Titre "Formations"
 * - Alerte format allégé (24 déc. au 3 janv.)
 * - Carte Prochaine séance (blueprint #0A1430 avec grille, date, salle, formateur)
 * - Bouton "Voir la séance" (gradient orange vers P5c)
 * - Grille de 4 tuiles statistiques interactives :
 *   1. Calendrier (12 séances) -> P5a
 *   2. Supports (8 documents) -> P5b
 *   3. Assiduité (88 %) -> P5d
 *   4. Annonces (2 nouvelles) -> P5e
 * 100% Tailwind CSS valide.
 */

export default function FormationsHub() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Formations
        </h1>

        {/* Notice format allégé */}
        <div className="flex gap-2.5 p-3 px-3.5 rounded-[16px] bg-[#FBEFD2] text-[#7A4F00] font-medium text-[14px] leading-[1.45]">
          <span className="font-extrabold text-[16px]">☾</span>
          <span>
            <strong>Du 24 déc. au 3 janv. :</strong> format allégé, séances à distance en fin de journée, disponibles en replay.
          </span>
        </div>

        {/* Carte PROCHAINE SÉANCE (Blueprint sombre) */}
        <div className="relative bg-[#0A1430] text-white rounded-[24px] p-5 flex flex-col gap-2.5 overflow-hidden shadow-[0_14px_34px_rgba(10,20,48,0.18)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]">
          <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#F2C45A]">
            PROCHAINE SÉANCE · JEU. 7 JANV.
          </span>
          <span className="font-extrabold text-[24px] leading-[1.1] text-white">
            Prototypage rapide et maquettes
          </span>
          <span className="font-medium text-[15px] text-[#C9D1E8]">
            09:00 – 12:00 · Fablab, bât. C · Mme Konan
          </span>

          <button
            type="button"
            onClick={() => navigate('/espace/formations/visio')}
            className="self-start mt-1 min-h-[54px] px-5 rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-extrabold text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.02]"
          >
            Voir la séance
          </button>
        </div>

        {/* Grille des 4 sections d'accès rapide */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Tuile 1 : Calendrier */}
          <div
            onClick={() => navigate('/espace/formations/planning')}
            className="bg-white rounded-[20px] p-4 min-h-[104px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-extrabold text-[28px] text-[#F58220]">
              12
            </span>
            <span className="font-bold text-[16px] text-[#0A1430] flex items-center justify-between">
              Calendrier <span>→</span>
            </span>
          </div>

          {/* Tuile 2 : Supports */}
          <div
            onClick={() => navigate('/espace/formations/supports')}
            className="bg-white rounded-[20px] p-4 min-h-[104px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-extrabold text-[28px] text-[#F58220]">
              8
            </span>
            <span className="font-bold text-[16px] text-[#0A1430] flex items-center justify-between">
              Supports <span>→</span>
            </span>
          </div>

          {/* Tuile 3 : Assiduité */}
          <div
            onClick={() => navigate('/espace/formations/presence')}
            className="bg-white rounded-[20px] p-4 min-h-[104px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-extrabold text-[28px] text-[#17744B]">
              88 %
            </span>
            <span className="font-bold text-[16px] text-[#0A1430] flex items-center justify-between">
              Assiduité <span>→</span>
            </span>
          </div>

          {/* Tuile 4 : Annonces */}
          <div
            onClick={() => navigate('/espace/formations/annonces')}
            className="bg-white rounded-[20px] p-4 min-h-[104px] flex flex-col justify-between shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="font-extrabold text-[28px] text-[#F58220]">
              2
            </span>
            <span className="font-bold text-[16px] text-[#0A1430] flex items-center justify-between">
              Annonces <span>→</span>
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
