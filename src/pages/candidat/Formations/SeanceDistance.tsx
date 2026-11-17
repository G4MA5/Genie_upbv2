import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5c : SÉANCE À DISTANCE (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19984113) :
 * - Bandeau supérieur violet (#5B3BB5) avec bouton retour `←` translucide
 * - Badge "À distance · en direct"
 * - Titre "Atelier pitch : convaincre en 7 minutes"
 * - Grille fluide 2 colonnes sur grand écran :
 *   - Colonne 1 : Carte des détails (Date: Lundi 4 janvier, Heure: 14:00 – 16:00, Formateur: M. Ibrahim Diallo)
 *     + Notice d'émargement automatique
 *   - Colonne 2 : Carte de connexion avec compte à rebours "Commence dans 12 min" et bouton "Rejoindre la séance ↗"
 * 100% pleine largeur sur grand écran.
 */

export default function SeanceDistance() {
  const navigate = useNavigate();

  const handleJoin = () => {
    try {
      localStorage.setItem('genie_presence_p5c', 'true');
    } catch (_) {}
    window.open('https://meet.google.com/new', '_blank');
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* Bandeau supérieur violet (#5B3BB5) pleine largeur */}
        <div className="w-full bg-[#5B3BB5] text-white rounded-[26px] p-6 sm:p-8 flex flex-col gap-4 shadow-[0_12px_30px_rgba(91,59,181,0.25)]">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white/15 flex items-center justify-center font-bold text-[20px] text-white cursor-pointer hover:bg-white/25 active:scale-95 transition-all self-start"
            aria-label="Retour"
          >
            ←
          </button>

          <span className="self-start px-3.5 py-1.5 rounded-full bg-white/[0.18] font-bold text-[13px] text-white backdrop-blur-sm">
            À distance · en direct
          </span>

          <h1 className="m-0 font-black text-[28px] sm:text-[34px] leading-[1.1] text-white">
            Atelier pitch : convaincre en 7 minutes
          </h1>
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne 1 : Carte des détails + Notice présence */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7] flex flex-col">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] pb-3 border-b border-[#F2F0EA]">
                INFORMATIONS DE LA SÉANCE
              </span>

              <div className="min-h-[56px] flex justify-between items-center border-b border-[#F2F0EA] font-medium text-[15px]">
                <span className="text-[#6A7189]">Date</span>
                <span className="font-black text-[#0A1430]">Lundi 4 janvier</span>
              </div>
              <div className="min-h-[56px] flex justify-between items-center border-b border-[#F2F0EA] font-medium text-[15px]">
                <span className="text-[#6A7189]">Heure</span>
                <span className="font-black text-[#0A1430]">14:00 – 16:00</span>
              </div>
              <div className="min-h-[56px] flex justify-between items-center font-medium text-[15px]">
                <span className="text-[#6A7189]">Formateur</span>
                <span className="font-black text-[#0A1430]">M. Ibrahim Diallo</span>
              </div>
            </div>

            {/* Notice présence */}
            <div className="flex gap-3 p-4 px-5 rounded-[20px] bg-[#E9ECF5] text-[#0A1430] font-semibold text-[15px] leading-[1.5] shadow-sm">
              <span className="font-black text-[#2F6BF0] text-[16px]">i</span>
              <span>Votre présence est enregistrée dès que vous rejoignez la séance en direct.</span>
            </div>
          </div>

          {/* Colonne 2 : Carte d'accès direct et compte à rebours */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 flex flex-col gap-5 items-center text-center shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
            <div className="w-16 h-16 rounded-full bg-[#F3EBF9] text-[#5B3BB5] grid place-items-center font-black text-[24px]">
              📹
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-black text-[20px] text-[#0A1430]">
                Salle virtuelle Google Meet
              </span>
              <span className="font-bold text-[15px] text-[#5B3BB5]">
                Commence dans 12 min
              </span>
            </div>

            <span className="font-medium text-[14px] leading-[1.5] text-[#6A7189]">
              Connectez-vous avec votre adresse institutionnelle UPB pour que l'émargement soit pris en compte dans votre assiduité.
            </span>

            <button
              type="button"
              onClick={handleJoin}
              className="w-full min-h-[58px] rounded-[18px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-black text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] hover:scale-[1.01] active:scale-95 transition-all"
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
