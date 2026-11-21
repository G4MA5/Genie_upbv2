import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';

/**
 * ============================================================================
 * P3 / P3t / P3r : MON ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L478902 - 502073) :
 * - P3t (state === 'team' ou par défaut) : Avec équipe ("Les Bâtisseurs", catégorie Innovation,
 *   arborescence 3D interactive, jauges, et accès directs Membres, Chartes, Soumission, Statut).
 * - P3 (state === 'empty') : Sans équipe (Créer une équipe + Mes invitations).
 * - P3r (state === 'removed') : Retiré de l'équipe (Notification avec motif + démarches).
 * 100% Tailwind CSS valide avec classes arbitraires exactes du prototype.
 */

export default function MonEquipe() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state') || 'team'; // 'team' (P3t), 'empty' (P3), 'removed' (P3r)
  const [guestModalOpen, setGuestModalOpen] = useState(false);

  // ==========================================================================
  // ÉCRAN 1 : P3 SANS ÉQUIPE (?state=empty)
  // ==========================================================================
  if (state === 'empty') {
    return (
      <div className="flex-1 w-full flex flex-col justify-between min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 animate-fadeIn">
        <div className="w-full flex flex-col gap-6">
          <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Mon équipe
          </h1>
          <p className="m-0 font-normal text-[16px] leading-[1.5] text-[#4A5168]">
            Vous n'avez pas encore d'équipe. Créez la vôtre ou rejoignez celle qui vous a invité.
          </p>

          {/* Grille responsive des 2 cartes d'action : 2 colonnes fluides sur desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-full items-stretch">
            {/* Carte 1 : Créer une équipe (blueprint sombre) */}
            <div
              onClick={() => navigate('/espace/equipe/creer')}
              className="relative bg-[#0A1430] text-white rounded-[24px] p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[220px] overflow-hidden cursor-pointer shadow-[0_14px_34px_rgba(10,20,48,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(10,20,48,0.28)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]"
            >
              <span className="w-[52px] h-[52px] rounded-[16px] bg-[#F58220] text-[#0A1430] font-extrabold text-[30px] flex items-center justify-center select-none shadow-[0_6px_16px_rgba(245,130,32,0.35)]">
                +
              </span>
              <div className="flex flex-col gap-1.5 mt-4">
                <span className="font-extrabold text-[26px] leading-tight text-white">
                  Créer une équipe
                </span>
                <span className="font-normal text-[15px] leading-[1.5] text-[#C9D1E8]">
                  Vous en serez le chef : vous choisissez la catégorie et invitez les membres.
                </span>
              </div>
            </div>

            {/* Carte 2 : Mes invitations */}
            <div
              onClick={() => navigate('/espace/equipe/invitations')}
              className="bg-white rounded-[24px] p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[220px] shadow-[0_10px_30px_rgba(10,20,48,0.06)] border border-[#EEF1F7] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(10,20,48,0.1)]"
            >
              <div className="flex justify-between items-center">
                <span className="w-[52px] h-[52px] rounded-[16px] bg-[#F2F0EA] font-bold text-[24px] flex items-center justify-center text-[#0A1430]">
                  ✉
                </span>
                <span className="min-w-[34px] h-[34px] px-2.5 rounded-full bg-[#F58220] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center shadow-[0_4px_12px_rgba(245,130,32,0.3)]">
                  2
                </span>
              </div>
              <div className="flex flex-col gap-1.5 mt-4">
                <span className="font-extrabold text-[26px] leading-tight text-[#0A1430]">
                  Mes invitations
                </span>
                <span className="font-normal text-[15px] leading-[1.5] text-[#4A5168]">
                  Deux équipes vous ont invité à les rejoindre.
                </span>
              </div>
            </div>
          </div>

          {/* Option Invité : Si l'étudiant n'a pas trouvé d'équipe */}
          <div className="w-full p-5 sm:p-6 rounded-[24px] bg-[#0A1430] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_14px_34px_rgba(10,20,48,0.18)]">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white flex items-center justify-center shrink-0 shadow-md">
                <UserPlus size={24} strokeWidth={2.5} />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-extrabold text-[19px] sm:text-[20px] text-white leading-tight">
                  Vous n'avez pas d'équipe pour concourir ?
                </span>
                <span className="text-[14px] text-[#A9C2FF] leading-snug">
                  Ne manquez pas l'événement : inscrivez-vous en tant qu'invité pour assister aux présentations et cérémonies officielles.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGuestModalOpen(true)}
              className="w-full md:w-auto px-5 py-3.5 rounded-[14px] bg-gradient-to-r from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-[15px] hover:opacity-95 active:scale-95 transition-all shadow-[0_6px_20px_rgba(232,98,26,0.35)] shrink-0 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
            >
              <UserPlus size={18} strokeWidth={2.5} />
              <span>S'inscrire en tant qu'invité</span>
            </button>
          </div>
        </div>

        {/* Modal d'inscription invité */}
        <ModalInscriptionInvite
          isOpen={guestModalOpen}
          onClose={() => setGuestModalOpen(false)}
          initialNom="Kouassi"
          initialPrenom="Aya"
          initialMatricule="UPB-2024-0012"
        />

        {/* Espace de respiration inférieur pour l'appBar mobile */}
        <div aria-hidden="true" className="h-[90px] shrink-0" />
      </div>
    );
  }

  // ==========================================================================
  // ÉCRAN 2 : P3r RETIRÉ DE L'ÉQUIPE (?state=removed)
  // ==========================================================================
  if (state === 'removed') {
    return (
      <div className="flex-1 w-full flex flex-col bg-[#F6F8FC] animate-fadeIn">
        {/* Bandeau bleu nuit avec grille */}
        <div className="relative pt-[84px] md:pt-14 px-[18px] pb-[70px] bg-[#0A1430] text-white flex flex-col gap-2.5 bg-[linear-gradient(rgba(255,255,255,0.08)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.08)_2px,transparent_2px)] bg-[size:40px_40px]">
          <span className="self-start px-3 py-1.5 rounded-full bg-white/10 font-bold text-[13px] text-[#FFB4A8]">
            ● Sans équipe
          </span>
          <h1 className="m-0 font-black text-[32px] md:text-[38px] leading-[1.05] tracking-[-0.02em]">
            Tu ne fais plus partie
            <br />
            des Bâtisseurs
          </h1>
        </div>

        {/* Corps avec carte notification */}
        <div className="relative z-10 -mt-[46px] px-4 sm:px-6 md:px-8 lg:px-10 pb-16 flex flex-col gap-4 flex-1 w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_14px_34px_rgba(14,30,74,0.12)] border border-[#EEF1F7]">
            {/* Header notification */}
            <div className="flex gap-3 items-center p-3.5 px-4 border-b border-[#EEECE6]">
              <span className="w-11 h-11 shrink-0 rounded-full bg-[#E3ECFF] flex items-center justify-center font-black text-[#2F6BF0] text-[15px]">
                UPB
              </span>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="font-bold text-[15px] text-[#0A1430]">
                  GÉNIE UPB <span className="font-medium text-[#6A7189]">· notification</span>
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  à moi · aujourd'hui, 14:32
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8372D]" />
            </div>

            {/* Corps du message */}
            <div className="p-4 flex flex-col gap-3">
              <span className="font-extrabold text-[18px] leading-[1.25] text-[#0A1430]">
                Tu as été retiré de l'équipe Les Bâtisseurs
              </span>
              <span className="font-medium text-[15px] leading-[1.55] text-[#3D4459]">
                Bonjour Moussa, la cheffe d'équipe Aya Kouassi t'a retiré de l'équipe (catégorie Innovation). Ton compte reste actif : tu peux rejoindre ou créer une autre équipe jusqu'au 18 décembre.
              </span>
              <div className="flex gap-2.5 p-3 rounded-[14px] bg-[#FFF6DA] font-semibold text-[14px] text-[#6B4E00]">
                <span>Motif :</span>
                <span className="font-medium">Plus de nouvelles</span>
              </div>
            </div>
          </div>

          <span className="mt-1 font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
            ET MAINTENANT ?
          </span>

          {/* Carte action 1 : Mes invitations */}
          <div
            onClick={() => navigate('/espace/equipe/invitations')}
            className="flex items-center gap-3 p-4 rounded-[20px] bg-[#0A1430] text-white cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_28px_rgba(10,20,48,0.2)]"
          >
            <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-[#2F6BF0] text-white shadow-[0_10px_28px_rgba(47,107,240,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] flex items-center justify-center font-extrabold text-[18px]">
              ✉
            </span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-extrabold text-[17px] text-white">Mes invitations</span>
              <span className="font-medium text-[14px] text-[#AEB8D6]">2 équipes t'attendent</span>
            </div>
            <span className="font-extrabold text-[20px] text-[#AEB8D6]">›</span>
          </div>

          {/* Carte action 2 : Créer une équipe */}
          <div
            onClick={() => navigate('/espace/equipe/creer')}
            className="flex items-center gap-3 p-4 rounded-[20px] bg-white text-[#0A1430] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_30px_rgba(10,20,48,0.06)]"
          >
            <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-[#F58220] text-[#0A1430] shadow-[0_10px_24px_rgba(245,130,32,0.3)] flex items-center justify-center font-extrabold text-[22px]">
              +
            </span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-extrabold text-[17px] text-[#0A1430]">Créer une nouvelle équipe</span>
              <span className="font-medium text-[14px] text-[#6A7189]">Deviens le chef de projet</span>
            </div>
            <span className="font-extrabold text-[20px] text-[#6A7189]">›</span>
          </div>

          {/* Carte action 3 : S'inscrire en tant qu'invité */}
          <div
            onClick={() => setGuestModalOpen(true)}
            className="flex items-center gap-3 p-4 rounded-[20px] bg-white text-[#0A1430] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_30px_rgba(10,20,48,0.06)]"
          >
            <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white flex items-center justify-center font-extrabold text-[18px]">
              <UserPlus size={20} strokeWidth={2.5} />
            </span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-extrabold text-[17px] text-[#0A1430]">Participer comme invité</span>
              <span className="font-medium text-[14px] text-[#6A7189]">Assister aux présentations et cérémonies du concours</span>
            </div>
            <span className="font-extrabold text-[20px] text-[#6A7189]">›</span>
          </div>
        </div>

        {/* Modal d'inscription invité */}
        <ModalInscriptionInvite
          isOpen={guestModalOpen}
          onClose={() => setGuestModalOpen(false)}
          initialNom="Kouassi"
          initialPrenom="Aya"
          initialMatricule="UPB-2024-0012"
        />

        <div aria-hidden="true" className="h-[90px] shrink-0" />
      </div>
    );
  }

  // ==========================================================================
  // ÉCRAN 3 : P3t AVEC ÉQUIPE (PAR DÉFAUT / ?state=team)
  // ==========================================================================
  return (
    <div className="flex-1 w-full min-h-screen bg-[linear-gradient(180deg,#EAF1FF_0%,#9DBBF5_22%,#2F6BF0_45%,#0A1430_72%,#050A1A_100%)] xl:bg-[radial-gradient(90%_70%_at_78%_45%,#2F6BF0_0%,#1A3E9C_45%,#0A1430_85%)] transition-colors duration-300">
      <div className="w-full flex-1 pt-[84px] xl:pt-[96px] px-[18px] xl:px-[48px] pb-5 xl:pb-[64px] flex flex-col items-center xl:grid xl:grid-cols-[minmax(0,1fr)_440px] xl:grid-rows-[auto_auto_auto_1fr] xl:gap-x-14 xl:gap-y-[18px] xl:justify-items-start xl:items-start xl:content-center">
        
        {/* Ligne 1 : Tag Catégorie */}
        <div className="xl:col-start-1 xl:row-start-1 mb-3 xl:mb-0 self-center xl:self-start">
          <span className="px-3.5 py-1.5 rounded-[10px] bg-white text-[#2F6BF0] font-extrabold text-[13px] shadow-[0_6px_14px_rgba(10,20,48,0.1)] inline-block">
            Innovation · 4 à 6 membres
          </span>
        </div>

        {/* Ligne 2 : Titre de l'équipe (Couleur sombre sur mobile car fond clair au sommet, blanc sur desktop) */}
        <h1 className="xl:col-start-1 xl:row-start-2 m-0 text-center xl:text-left font-black text-[clamp(40px,5.4vw,72px)] leading-none tracking-[-0.03em] text-[#0A1430] xl:text-white mb-4 xl:mb-0">
          Les <span className="text-[#2F6BF0]">Bâtisseurs</span>
        </h1>

        {/* Ligne 3 : Bouton Inviter un membre (#0A1430 sur mobile, dégradé orange sur desktop) */}
        <div className="xl:col-start-1 xl:row-start-3 mb-6 xl:mb-0 self-center xl:self-start">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe/membres')}
            className="min-h-[54px] pl-5.5 pr-2 rounded-[16px] bg-[#0A1430] xl:bg-gradient-to-b xl:from-[#FF9A3D] xl:to-[#E8621A] text-white font-extrabold text-[17px] flex items-center gap-3.5 cursor-pointer shadow-[0_12px_26px_rgba(10,20,48,0.3)] xl:shadow-[0_12px_26px_rgba(232,98,26,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Inviter un membre{' '}
            <span className="w-[38px] h-[38px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-black text-[20px]">
              +
            </span>
          </button>
        </div>

        {/* ====================================================================
            ARBORESCENCE 3D DE L'ÉQUIPE (Col 2 / Row 1-4 sur Desktop)
            ==================================================================== */}
        <div className="xl:col-start-2 xl:row-start-1 xl:row-span-4 justify-self-center relative w-[440px] max-w-full h-[430px] my-3 xl:my-0 mt-1.5">
          {/* Arborescence vectorielle haute précision reliant tous les membres */}
          <svg
            viewBox="0 0 440 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          >
            {/* 1. Ligne verticale reliant l'étoile au sommet de la cheffe Aya K. */}
            <line
              x1="220"
              y1="34"
              x2="220"
              y2="60"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* 2. Arche supérieure reliant la cheffe Aya K. à Moussa D. et Fatou T. */}
            {/* Branche gauche vers Moussa D. : atterrit pile au centre supérieur de sa carte (X=74, Y=180) */}
            <path
              d="M 220 124 L 98 124 A 24 24 0 0 0 74 148 L 74 180"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Branche droite vers Fatou T. : atterrit pile au centre supérieur de sa carte (X=366, Y=180) */}
            <path
              d="M 220 124 L 342 124 A 24 24 0 0 1 366 148 L 366 180"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* 3. Ligne centrale verticale directe : relie la cheffe au 4e slot */}
            <line
              x1="220"
              y1="188"
              x2="220"
              y2="310"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* 4. Arche inférieure : relie Moussa D. et Fatou T. vers le sommet du 4e slot */}
            <path
              d="M 130 236 L 196 236 A 24 24 0 0 1 220 260 L 220 310"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M 310 236 L 244 236 A 24 24 0 0 0 220 260"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* Points d'ancrage lumineux discrets aux jonctions des cartes */}
            <circle cx="74" cy="180" r="3.5" fill="white" />
            <circle cx="366" cy="180" r="3.5" fill="white" />
            <circle cx="220" cy="310" r="3.5" fill="rgba(255, 255, 255, 0.85)" />
          </svg>

          {/* Badge étoile au-dessus du capitaine */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
            <span className="min-w-[44px] h-[44px] px-3 rounded-full bg-[#0A1430] text-white grid place-items-center font-extrabold text-[16px] shadow-[0_0_0_2px_rgba(120,160,255,0.5),0_0_24px_rgba(80,130,255,0.6)]">
              ★
            </span>
          </div>

          {/* CARTE 1 (Sommet) : Aya K. (Cheffe) */}
          <div className="absolute left-1/2 top-[60px] -translate-x-1/2 z-[2]">
            <div className="relative w-[128px] h-[128px] rounded-[26px] bg-gradient-to-br from-[#EAF1FF] to-[#A9C2FF] shadow-[0_0_0_3px_rgba(255,255,255,0.55),0_14px_30px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.04]">
              <span className="w-[58px] h-[58px] rounded-full bg-white/90 text-[#0A1430] grid place-items-center font-extrabold text-[20px] shadow-sm">
                AK
              </span>
              <span className="font-extrabold text-[14px] text-[#0A1430] leading-none">
                Aya K.
              </span>
              <span className="font-semibold text-[11px] font-mono text-[#0A1430]/65 tracking-[0.04em]">
                CHEFFE
              </span>
            </div>
          </div>

          {/* CARTE 2 (Gauche) : Moussa D. */}
          <div className="absolute left-[4%] top-[180px] z-[2]">
            <div className="relative w-[112px] h-[112px] rounded-[26px] bg-gradient-to-br from-[#E0EBFF] to-[#A9C4FF] shadow-[0_0_0_3px_rgba(255,255,255,0.55),0_14px_30px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.04]">
              <span className="w-[50px] h-[50px] rounded-full bg-white/90 text-[#0A1430] grid place-items-center font-extrabold text-[17px] shadow-sm">
                MD
              </span>
              <span className="font-extrabold text-[14px] text-[#0A1430] leading-none">
                Moussa D.
              </span>
              <span className="font-semibold text-[11px] font-mono text-[#0A1430]/65 tracking-[0.04em]">
                L2 · GC
              </span>
            </div>
          </div>

          {/* Badge validation Moussa */}
          <div className="absolute left-[calc(4%-8px)] top-[168px] z-10">
            <span className="w-[30px] h-[30px] rounded-full bg-[#17744B] border-[2.5px] border-white box-border text-white grid place-items-center font-black text-[13px] shadow-[0_6px_14px_rgba(0,0,0,0.3)]">
              ✓
            </span>
          </div>

          {/* CARTE 3 (Droite) : Fatou T. */}
          <div className="absolute right-[4%] top-[180px] z-[2]">
            <div className="relative w-[112px] h-[112px] rounded-[26px] bg-gradient-to-br from-[#DDF7E8] to-[#9EE2BC] shadow-[0_0_0_3px_rgba(255,255,255,0.55),0_14px_30px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.04]">
              <span className="w-[50px] h-[50px] rounded-full bg-white/90 text-[#0A1430] grid place-items-center font-extrabold text-[17px] shadow-sm">
                FT
              </span>
              <span className="font-extrabold text-[14px] text-[#0A1430] leading-none">
                Fatou T.
              </span>
              <span className="font-semibold text-[11px] font-mono text-[#0A1430]/65 tracking-[0.04em]">
                L1 · ÉCO
              </span>
            </div>
          </div>

          {/* Badge validation Fatou */}
          <div className="absolute right-[calc(4%+22px)] top-[168px] z-10">
            <span className="w-[30px] h-[30px] rounded-full bg-[#17744B] border-[2.5px] border-white box-border text-white grid place-items-center font-black text-[13px] shadow-[0_6px_14px_rgba(0,0,0,0.3)]">
              ✓
            </span>
          </div>

          {/* CARTE 4 (Bas) : Place requise libre */}
          <div
            onClick={() => navigate('/espace/equipe/membres')}
            className="absolute left-1/2 top-[310px] -translate-x-1/2 z-[2] w-[112px] h-[112px] rounded-[26px] border-[2.5px] border-dashed border-white/70 bg-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.04] active:scale-[0.98]"
          >
            <span className="font-extrabold text-[30px] leading-none">+</span>
            <span className="font-bold text-[12px] leading-tight text-center px-1">
              1 place requise
            </span>
          </div>
        </div>

        {/* ====================================================================
            BLOC GAUCHE INFÉRIEUR : STATUT, PROGRESSION ET 4 LIENS D'ACCÈS
            ==================================================================== */}
        <div className="xl:col-start-1 xl:row-start-4 w-full max-w-[440px] xl:max-w-[480px] flex flex-col gap-2.5 mt-6 xl:mt-[18px]">
          {/* Ligne statut brouillon & décompte membres */}
          <div className="flex flex-wrap justify-between items-center gap-2 px-1 pt-1">
            <span className="font-semibold text-[12px] font-mono tracking-[0.08em] text-[#AEB8D6] whitespace-nowrap">
              STATUT · BROUILLON
            </span>
            <span className="font-extrabold text-[18px] text-white">
              3 / 4 <span className="font-medium text-[13px] text-[#AEB8D6]">membres</span>
            </span>
          </div>

          {/* Jauge de progression (75%) */}
          <div className="h-2 rounded-full bg-white/12 overflow-hidden">
            <div className="w-[75%] h-full rounded-full bg-gradient-to-r from-[#5B9BFF] to-[#2F6BF0]" />
          </div>

          {/* Liens d'accès direct 1 : Membres */}
          <div
            onClick={() => navigate('/espace/equipe/membres')}
            className="flex items-center gap-3 p-3.5 rounded-[20px] bg-white/[0.08] border border-white/[0.14] backdrop-blur-[10px] cursor-pointer transition-all duration-250 hover:bg-white/[0.16] hover:translate-x-1"
          >
            <span className="w-[42px] h-[42px] shrink-0 rounded-[14px] bg-white/12 text-[#A9C2FF] grid place-items-center font-extrabold text-[17px]">
              ◎
            </span>
            <span className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="font-bold text-[16px] text-white">Membres</span>
              <span className="font-medium text-[13px] text-[#AEB8D6]">Gérer et inviter</span>
            </span>
            <span className="font-extrabold text-[18px] text-[#A9C2FF]">›</span>
          </div>

          {/* Liens d'accès direct 2 : Règlement et chartes */}
          <div
            onClick={() => navigate('/espace/equipe/charte')}
            className="flex items-center gap-3 p-3.5 rounded-[20px] bg-white/[0.08] border border-white/[0.14] backdrop-blur-[10px] cursor-pointer transition-all duration-250 hover:bg-white/[0.16] hover:translate-x-1"
          >
            <span className="w-[42px] h-[42px] shrink-0 rounded-[14px] bg-white/12 text-[#A9C2FF] grid place-items-center font-extrabold text-[17px]">
              ✎
            </span>
            <span className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="font-bold text-[16px] text-white">Règlement et chartes</span>
              <span className="font-medium text-[13px] text-[#AEB8D6]">1 sur 3 acceptée</span>
            </span>
            <span className="font-extrabold text-[18px] text-[#A9C2FF]">›</span>
          </div>

          {/* Liens d'accès direct 3 : Soumettre l'équipe */}
          <div
            onClick={() => navigate('/espace/equipe/soumettre')}
            className="flex items-center gap-3 p-3.5 rounded-[20px] bg-white/[0.08] border border-white/[0.14] backdrop-blur-[10px] cursor-pointer transition-all duration-250 hover:bg-white/[0.16] hover:translate-x-1"
          >
            <span className="w-[42px] h-[42px] shrink-0 rounded-[14px] bg-white/12 text-[#A9C2FF] grid place-items-center font-extrabold text-[17px]">
              ➤
            </span>
            <span className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="font-bold text-[16px] text-white">Soumettre l’équipe</span>
              <span className="font-medium text-[13px] text-[#AEB8D6]">Contrôles avant envoi</span>
            </span>
            <span className="font-extrabold text-[18px] text-[#A9C2FF]">›</span>
          </div>

          {/* Liens d'accès direct 4 : Statut d'inscription */}
          <div
            onClick={() => navigate('/espace/statut')}
            className="flex items-center gap-3 p-3.5 rounded-[20px] bg-white/[0.08] border border-white/[0.14] backdrop-blur-[10px] cursor-pointer transition-all duration-250 hover:bg-white/[0.16] hover:translate-x-1"
          >
            <span className="w-[42px] h-[42px] shrink-0 rounded-[14px] bg-white/12 text-[#A9C2FF] grid place-items-center font-extrabold text-[17px]">
              ◔
            </span>
            <span className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="font-bold text-[16px] text-white">Statut d’inscription</span>
              <span className="font-medium text-[13px] text-[#AEB8D6]">Suivre la validation</span>
            </span>
            <span className="font-extrabold text-[18px] text-[#A9C2FF]">›</span>
          </div>
        </div>

        {/* Espace de respiration inférieur pour l'appBar mobile (exactement 100px comme le prototype L19929) */}
        <div aria-hidden="true" className="h-[100px] shrink-0 w-full" />
      </div>
    </div>
  );
}
