import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

  // ==========================================================================
  // ÉCRAN 1 : P3 SANS ÉQUIPE (?state=empty)
  // ==========================================================================
  if (state === 'empty') {
    return (
      <div className="flex-1 w-full flex flex-col justify-between min-h-[calc(100vh-80px)] p-4 sm:p-6 md:p-12 lg:p-16 animate-fadeIn">
        <div className="max-w-[560px] w-full mx-auto flex flex-col gap-4 pt-12 md:pt-4">
          <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Mon équipe
          </h1>
          <p className="m-0 font-normal text-[16px] leading-[1.5] text-[#4A5168]">
            Vous n'avez pas encore d'équipe. Créez la vôtre ou rejoignez celle qui vous a invité.
          </p>

          {/* Carte 1 : Créer une équipe (blueprint sombre) */}
          <div
            onClick={() => navigate('/espace/equipe/creer')}
            className="relative bg-[#0A1430] text-white rounded-[24px] p-[22px] flex flex-col gap-2.5 overflow-hidden cursor-pointer shadow-[0_14px_34px_rgba(10,20,48,0.18)] transition-transform duration-250 hover:-translate-y-1 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]"
          >
            <span className="w-[52px] h-[52px] rounded-[16px] bg-[#F58220] text-[#0A1430] font-extrabold text-[30px] flex items-center justify-center select-none shadow-[0_6px_16px_rgba(245,130,32,0.35)]">
              +
            </span>
            <span className="font-extrabold text-[26px] leading-tight text-white">
              Créer une équipe
            </span>
            <span className="font-normal text-[15px] leading-[1.5] text-[#C9D1E8]">
              Vous en serez le chef : vous choisissez la catégorie et invitez les membres.
            </span>
          </div>

          {/* Carte 2 : Mes invitations */}
          <div
            onClick={() => navigate('/espace/equipe/invitations')}
            className="bg-white rounded-[24px] p-[22px] flex flex-col gap-2.5 shadow-[0_10px_30px_rgba(10,20,48,0.06)] border border-[#EEF1F7] cursor-pointer transition-transform duration-250 hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <span className="w-[52px] h-[52px] rounded-[16px] bg-[#F2F0EA] font-bold text-[24px] flex items-center justify-center text-[#0A1430]">
                ✉
              </span>
              <span className="min-w-[34px] h-[34px] px-2.5 rounded-full bg-[#F58220] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center shadow-[0_4px_12px_rgba(245,130,32,0.3)]">
                2
              </span>
            </div>
            <span className="font-extrabold text-[26px] leading-tight text-[#0A1430]">
              Mes invitations
            </span>
            <span className="font-normal text-[15px] leading-[1.5] text-[#4A5168]">
              Deux équipes vous ont invité à les rejoindre.
            </span>
          </div>
        </div>

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
        <div className="relative z-10 -mt-[46px] px-4 pb-5 flex flex-col gap-3.5 flex-1 max-w-[620px] w-full mx-auto">
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
        </div>

        <div aria-hidden="true" className="h-[90px] shrink-0" />
      </div>
    );
  }

  // ==========================================================================
  // ÉCRAN 3 : P3t AVEC ÉQUIPE (PAR DÉFAUT / ?state=team)
  // ==========================================================================
  return (
    <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-[#EAF1FF] via-[#9DBBF5] via-[22%] via-[#2F6BF0] via-[45%] via-[#0A1430] via-[72%] to-[#050A1A] md:bg-[radial-gradient(90%_70%_at_78%_45%,#2F6BF0_0%,#1A3E9C_45%,#0A1430_85%)] transition-colors duration-300">
      <div className="w-full flex-1 pt-20 md:pt-24 px-4 sm:px-6 md:px-12 lg:px-16 pb-20 flex flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_440px] xl:grid-rows-[auto_auto_auto_1fr] xl:gap-x-14 xl:gap-y-[18px] items-center xl:items-start xl:content-center">
        
        {/* Ligne 1 : Tag Catégorie */}
        <div className="xl:col-start-1 xl:row-start-1 mb-3 xl:mb-0">
          <span className="px-3.5 py-1.5 rounded-[10px] bg-white text-[#2F6BF0] font-extrabold text-[13px] shadow-[0_6px_14px_rgba(10,20,48,0.1)] inline-block">
            Innovation · 4 à 6 membres
          </span>
        </div>

        {/* Ligne 2 : Titre de l'équipe */}
        <h1 className="xl:col-start-1 xl:row-start-2 m-0 text-center xl:text-left font-black text-[40px] sm:text-[48px] md:text-[56px] xl:text-[68px] leading-none tracking-[-0.03em] text-[#0A1430] md:text-white mb-5 xl:mb-0">
          Les <span className="text-[#2F6BF0]">Bâtisseurs</span>
        </h1>

        {/* Ligne 3 : Bouton Inviter un membre */}
        <div className="xl:col-start-1 xl:row-start-3 mb-8 xl:mb-0">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe/membres')}
            className="min-h-[54px] pl-5 pr-2 rounded-[16px] bg-[#0A1430] md:bg-gradient-to-b md:from-[#FF9A3D] md:to-[#E8621A] text-white font-extrabold text-[17px] flex items-center gap-3.5 cursor-pointer shadow-[0_12px_26px_rgba(10,20,48,0.3)] md:shadow-[0_12px_26px_rgba(232,98,26,0.4)] transition-all duration-300 hover:scale-[1.02]"
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
        <div className="xl:col-start-2 xl:row-start-1 xl:row-span-4 justify-self-center relative w-[440px] max-w-full h-[430px] my-4 xl:my-0">
          {/* Ligne verticale supérieure reliant l'étoile au sommet */}
          <div className="absolute left-1/2 top-[22px] w-[2px] h-[52px] -ml-[1px] bg-[#0A1430]/50" />
          
          {/* Arche horizontale intermédiaire vers Moussa D. et Fatou T. */}
          <div className="absolute left-[18%] right-[18%] top-[74px] h-[60px] border-2 border-white/60 border-b-0 rounded-t-[24px]" />
          
          {/* Arche inférieure vers le slot libre */}
          <div className="absolute left-[30%] right-[30%] top-[250px] h-[60px] border-2 border-white/45 border-b-0 rounded-t-[24px]" />

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
            className="absolute left-1/2 top-[310px] -translate-x-1/2 z-[2] w-[112px] h-[112px] rounded-[26px] border-[2.5px] border-dashed border-white/70 bg-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.04]"
          >
            <span className="font-extrabold text-[30px] leading-none">+</span>
            <span className="font-bold text-[12px] leading-tight text-center px-1">
              1 place requise
            </span>
          </div>
        </div>

        {/* ====================================================================
            BLOC GAUCHE INFÉRIEUR : STATUT, PROGRESSION ET LIENS D'ACCÈS
            ==================================================================== */}
        <div className="xl:col-start-1 xl:row-start-4 w-full max-w-[480px] flex flex-col gap-2.5 mt-4 xl:mt-[18px]">
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

        {/* Espace de respiration inférieur pour l'appBar mobile */}
        <div aria-hidden="true" className="xl:hidden h-[90px] shrink-0 w-full" />
      </div>
    </div>
  );
}
