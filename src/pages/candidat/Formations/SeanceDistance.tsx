import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5c : SÉANCE À DISTANCE (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L543510 - 548076) :
 * - Bandeau supérieur violet (#5B3BB5) avec bouton retour `←` translucide
 * - Badge "À distance · en direct"
 * - Titre "Atelier pitch : convaincre en 7 minutes"
 * - Carte des détails (Date: Lundi 4 janvier, Heure: 14:00 – 16:00, Formateur: M. Ibrahim Diallo)
 * - Notice d'émargement automatique : "Votre présence est enregistrée quand vous rejoignez la séance."
 * - Compte à rebours "Commence dans 12 min"
 * - Bouton "Rejoindre la séance ↗" (gradient orange vers le lien de visio)
 * 100% Tailwind CSS valide.
 */

export default function SeanceDistance() {
  const navigate = useNavigate();

  const handleJoin = () => {
    // Émargement simulé
    try {
      localStorage.setItem('genie_presence_p5c', 'true');
    } catch (_) {}
    window.open('https://meet.google.com/new', '_blank');
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] flex flex-col justify-start items-center animate-fadeIn">
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* Bandeau supérieur violet (#5B3BB5) */}
        <div className="bg-[#5B3BB5] text-white pt-20 md:pt-14 px-4.5 px-4 pb-8 flex flex-col gap-3.5">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white/15 flex items-center justify-center font-bold text-[20px] text-white cursor-pointer hover:bg-white/25 transition-colors self-start"
            aria-label="Retour"
          >
            ←
          </button>

          <span className="self-start px-2.5 py-1 rounded-full bg-white/[0.18] font-bold text-[13px] text-white">
            À distance · en direct
          </span>

          <h1 className="m-0 font-extrabold text-[32px] leading-[1.05] text-white">
            Atelier pitch : convaincre en 7 minutes
          </h1>
        </div>

        {/* Corps de la page */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
          {/* Carte des détails */}
          <div className="bg-white rounded-[20px] px-4 py-1.5 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7] flex flex-col">
            <div className="min-h-[52px] flex justify-between items-center border-b border-[#F2F0EA] font-medium text-[15px]">
              <span className="text-[#6A7189]">Date</span>
              <span className="font-bold text-[#0A1430]">Lundi 4 janvier</span>
            </div>
            <div className="min-h-[52px] flex justify-between items-center border-b border-[#F2F0EA] font-medium text-[15px]">
              <span className="text-[#6A7189]">Heure</span>
              <span className="font-bold text-[#0A1430]">14:00 – 16:00</span>
            </div>
            <div className="min-h-[52px] flex justify-between items-center font-medium text-[15px]">
              <span className="text-[#6A7189]">Formateur</span>
              <span className="font-bold text-[#0A1430]">M. Ibrahim Diallo</span>
            </div>
          </div>

          {/* Notice présence */}
          <div className="flex gap-2.5 p-3.5 rounded-[16px] bg-[#E9ECF5] text-[#0A1430] font-semibold text-[15px] leading-[1.45]">
            <span className="font-extrabold text-[#2F6BF0]">i</span>
            <span>Votre présence est enregistrée quand vous rejoignez la séance.</span>
          </div>

          {/* Bloc d'action Rejoindre */}
          <div className="mt-8 flex flex-col gap-2 items-center">
            <span className="font-semibold text-[14px] text-[#5B3BB5]">
              Commence dans 12 min
            </span>

            <button
              type="button"
              onClick={handleJoin}
              className="w-full min-h-[54px] rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-extrabold text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] hover:scale-[1.01] transition-transform"
            >
              Rejoindre la séance ↗
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
