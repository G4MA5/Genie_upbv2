import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import logoUpb from '../assets/images/logo_genie_upb.png';
import ModalInscriptionInvite from '../components/common/ModalInscriptionInvite';
import { PageLoader } from '../components/ui/PageLoader';
import Avatar from '../components/espace/Avatar';
import SelecteurEquipe from '../components/espace/SelecteurEquipe';
import { EspaceProvider, useEspace } from '../contexts/EspaceContext';
import { casse, cursus, nomComplet, pluriel } from '../lib/format';

/**
 * ============================================================================
 * STRUCTURE PARTICIPANT (P1 à P5e) — PROTOTYPE V4
 * ============================================================================
 * - Desktop (>= 768px) : Sidebar fixe gauche 248px (pDesk) + conteneur max-width 1180px
 * - Mobile (< 768px)   : Barre capsule floating 4 onglets en bas (appBarOn)
 * - Barre supérieure floating : "← Retour au site" + Logo (mobile) + menu "Pages ▾"
 * Les données (candidat, équipe) viennent du backend via EspaceProvider.
 */
export default function StructureCandidat() {
  return (
    <EspaceProvider>
      <CoqueCandidat />
    </EspaceProvider>
  );
}

function CoqueCandidat() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const { espace } = useEspace();
  const moi = espace?.candidat;
  const equipe = espace?.equipe;

  // Déterminer l'onglet actif : 0 = Mon espace, 1 = Mon équipe, 2 = Formations, 3 = Profil
  const getActiveTab = (): number => {
    const p = location.pathname;
    if (p.startsWith('/espace/profil')) return 3;
    if (p.startsWith('/espace/formations')) return 2;
    if (p === '/espace/equipe/soumettre') return 0; // P3e est rattaché à 0 dans pDesk
    if (p.startsWith('/espace/equipe') || p.startsWith('/espace/statut')) return 1;
    return 0; // /espace/dashboard (P1)
  };

  const activeTab = getActiveTab();

  // Masquer la barre flottante supérieure sur P3c Membres si P3c a son propre header retour
  const isMembresScreen = location.pathname === '/espace/equipe/membres';

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif]">
      {/* ====================================================================
          1. SIDEBAR DESKTOP FIXE GAUCHE 248px (pDesk — Prototype v4 L17-23)
          ==================================================================== */}
      {isDesktop && (
        <aside className="fixed left-0 top-0 bottom-0 w-[248px] z-[300] box-border p-6 px-4 bg-white border-r border-[#E6EAF2] flex flex-col gap-5 overflow-y-auto">
          {/* Logo + Espace participant */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 px-1.5 cursor-pointer select-none"
          >
            <img
              src={logoUpb}
              alt="GÉNIE UPB"
              className="h-10 w-auto block"
            />
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189] leading-[1.15]">
              Espace
              <br />
              participant
            </span>
          </div>

          {/* Navigation 4 entrées */}
          <nav className="flex flex-col gap-1">
            {/* 0 : Mon espace */}
            <div
              onClick={() => navigate('/espace/dashboard')}
              className={`min-h-[48px] px-3.5 rounded-[14px] flex items-center gap-3 cursor-pointer select-none font-extrabold text-[15px] transition-colors duration-200 ${
                activeTab === 0
                  ? 'bg-[#2F6BF0] text-white'
                  : 'bg-transparent text-[#4A5168] hover:bg-[#F1F4FA]'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
                <path d="M9.5 20.5v-5.5h5v5.5" />
              </svg>
              <span>Mon espace</span>
            </div>

            {/* 1 : Mon équipe */}
            <div
              onClick={() => navigate('/espace/equipe')}
              className={`min-h-[48px] px-3.5 rounded-[14px] flex items-center gap-3 cursor-pointer select-none font-extrabold text-[15px] transition-colors duration-200 ${
                activeTab === 1
                  ? 'bg-[#2F6BF0] text-white'
                  : 'bg-transparent text-[#4A5168] hover:bg-[#F1F4FA]'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <circle cx="9" cy="8.5" r="3.2" />
                <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
                <circle cx="17" cy="9.5" r="2.4" />
                <path d="M16 14.6c2.4-.2 4.1 1.4 4.6 4.4" />
              </svg>
              <span>Mon équipe</span>
            </div>

            {/* 2 : Formations */}
            <div
              onClick={() => navigate('/espace/formations')}
              className={`min-h-[48px] px-3.5 rounded-[14px] flex items-center gap-3 cursor-pointer select-none font-extrabold text-[15px] transition-colors duration-200 ${
                activeTab === 2
                  ? 'bg-[#2F6BF0] text-white'
                  : 'bg-transparent text-[#4A5168] hover:bg-[#F1F4FA]'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect x="3.5" y="5" width="17" height="13" rx="3" />
                <path d="M10.5 9.3v5.4l4.4-2.7z" />
              </svg>
              <span>Formations</span>
            </div>

            {/* 3 : Profil */}
            <div
              onClick={() => navigate('/espace/profil')}
              className={`min-h-[48px] px-3.5 rounded-[14px] flex items-center gap-3 cursor-pointer select-none font-extrabold text-[15px] transition-colors duration-200 ${
                activeTab === 3
                  ? 'bg-[#2F6BF0] text-white'
                  : 'bg-transparent text-[#4A5168] hover:bg-[#F1F4FA]'
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <circle cx="12" cy="8.5" r="3.6" />
                <path d="M4.5 20c.9-3.8 3.9-6 7.5-6s6.6 2.2 7.5 6" />
              </svg>
              <span>Profil</span>
            </div>
          </nav>

          {/* Encart résumé Mon équipe */}
          <div
            onClick={() => navigate('/espace/equipe')}
            className="flex flex-col gap-1.5 p-4 rounded-[18px] bg-[#F3F6FD] cursor-pointer hover:bg-[#eaf0fb] transition-colors"
          >
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
              {espace && espace.equipes.length > 1 ? 'Mes équipes' : 'Mon équipe'}
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <SelecteurEquipe className="flex-col !rounded-[14px] w-full [&>button]:max-w-none" />
            </span>
            <span className="font-black text-[17px] text-[#0A1430] truncate">
              {equipe ? equipe.nom : 'Aucune équipe'}
            </span>
            <span className="font-semibold text-[13px] text-[#E8621A]">
              {equipe
                ? `${equipe.concours?.categorie ?? ''} · ${pluriel(equipe.membres.length, 'membre')} / ${equipe.concours?.max_membres ?? '?'}`
                : espace && espace.invitations_en_attente > 0
                ? pluriel(espace.invitations_en_attente, 'invitation') + ' en attente'
                : 'Créer ou rejoindre une équipe'}
            </span>
          </div>

          {/* Option invité si l'étudiant n'a pas d'équipe */}
          {!equipe && (
          <div
            onClick={() => setGuestModalOpen(true)}
            className="flex items-center gap-2.5 p-2.5 rounded-[14px] bg-[#0A1430] text-white cursor-pointer hover:bg-[#14234b] active:scale-[0.98] transition-all shadow-sm group select-none"
            title="Vous n'avez pas d'équipe ? Participez en tant qu'invité"
          >
            <span className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:rotate-6 transition-transform">
              <UserPlus size={15} strokeWidth={2.5} />
            </span>
            <div className="flex flex-col text-left leading-tight min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#FF9A3D] tracking-wider">
                Sans équipe ?
              </span>
              <span className="text-[12px] font-extrabold text-white truncate">
                Accès Invité
              </span>
            </div>
          </div>
          )}

          {/* Bas de sidebar : profil du candidat + Retour au site */}
          <div className="mt-auto flex flex-col gap-3">
            <div
              onClick={() => navigate('/espace/profil')}
              className="flex items-center gap-3 p-2 mb-[52px] rounded-[14px] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              {moi && <Avatar personne={moi} couleur="#2F6BF0" className="w-[42px] h-[42px] text-[15px]" />}
              <span className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430] truncate">
                  {moi ? nomComplet(moi) : ''}
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189] truncate">
                  {moi ? cursus(moi) : ''}
                </span>
              </span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="absolute left-[72px] right-4 bottom-6 min-h-[44px] rounded-[14px] border-[1.5px] border-[#E6EAF2] flex items-center justify-center gap-2 font-extrabold text-[14px] text-[#0A1430] cursor-pointer bg-white hover:bg-slate-50 transition-colors"
            >
              ← Retour au site
            </button>
          </div>
        </aside>
      )}

      {/* ====================================================================
          2. CONTENEUR SHELL PARTICIPANT (pSideL = 248px sur desktop, pleine largeur fluide)
          ==================================================================== */}
      <div className="flex flex-col min-w-0 md:pl-[248px] bg-[#F6F8FC] flex-1 w-full">
        <div className="relative w-full min-h-screen bg-[#F6F8FC] flex flex-col">
          {/* Barre supérieure mobile (← Retour au site + Logo sur mobile) */}
          {!isMembresScreen && !isDesktop && (
            <div className="absolute top-0 left-0 right-0 z-[60] flex justify-between items-center gap-2.5 p-3 px-3.5 pointer-events-none">
              <span
                onClick={() => navigate('/')}
                className="pointer-events-auto min-h-[42px] px-4 rounded-full bg-white/90 backdrop-blur-[10px] text-[#0A1430] font-bold text-[14px] flex items-center gap-2 cursor-pointer shadow-[0_6px_16px_rgba(10,20,48,0.18)] transition-all"
              >
                ← Retour au site
              </span>

              <img
                src={logoUpb}
                alt="GÉNIE UPB"
                className="h-8 w-auto block drop-shadow-[0_4px_10px_rgba(10,20,48,0.3)]"
              />
            </div>
          )}

          {/* Contenu de l'écran participant (affiché une fois les données chargées) */}
          {espace ? <Outlet /> : <PageLoader />}
        </div>
      </div>

      {/* ====================================================================
          3. BARRE CAPSULE FLOTTANTE MOBILE (appBarOn — Prototype v4 L27)
          ==================================================================== */}
      {!isDesktop && (
        <nav className="fixed left-1/2 -translate-x-1/2 bottom-[max(14px,env(safe-area-inset-bottom))] z-[400] w-[calc(100%-28px)] max-w-[460px] box-border p-2 rounded-full bg-white/80 backdrop-blur-[20px] backdrop-saturate-[1.6] border border-white/90 flex items-center shadow-[0_24px_50px_rgba(10,20,48,0.18),0_4px_12px_rgba(10,20,48,0.06),inset_0_1px_0_#fff]">
          {/* Pastille bleue active coulissante (position dynamique autorisée) */}
          <span
            aria-hidden="true"
            style={{
              left: `calc(8px + (100% - 16px) * (${activeTab} / 4))`,
            }}
            className="absolute top-2 bottom-2 w-[calc((100%-16px)/4)] rounded-full bg-[radial-gradient(circle_at_50%_30%,#6FA2FF,#2F6BF0_70%)] border-2 border-white/85 box-border shadow-[0_10px_26px_rgba(47,107,240,0.55),0_0_34px_rgba(47,107,240,0.35),inset_0_1px_0_rgba(255,255,255,0.5)] transition-[left] duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]"
          />

          {/* 0 : Mon espace */}
          <div
            onClick={() => navigate('/espace/dashboard')}
            title="Mon espace"
            className={`relative z-10 flex-1 min-w-0 h-[58px] flex flex-col items-center justify-center gap-[3px] cursor-pointer font-bold text-[12px] whitespace-nowrap transition-colors duration-350 active:scale-[0.94] ${
              activeTab === 0 ? 'text-white' : 'text-[#8A90A2]'
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
              <path d="M9.5 20.5v-5.5h5v5.5" />
            </svg>
            <span>Mon espace</span>
          </div>

          {/* 1 : Mon équipe */}
          <div
            onClick={() => navigate('/espace/equipe')}
            title="Mon équipe"
            className={`relative z-10 flex-1 min-w-0 h-[58px] flex flex-col items-center justify-center gap-[3px] cursor-pointer font-bold text-[12px] whitespace-nowrap transition-colors duration-350 active:scale-[0.94] ${
              activeTab === 1 ? 'text-white' : 'text-[#8A90A2]'
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="8.5" r="3.2" />
              <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
              <circle cx="17" cy="9.5" r="2.4" />
              <path d="M16 14.6c2.4-.2 4.1 1.4 4.6 4.4" />
            </svg>
            <span>Mon équipe</span>
          </div>

          {/* 2 : Formations */}
          <div
            onClick={() => navigate('/espace/formations')}
            title="Formations"
            className={`relative z-10 flex-1 min-w-0 h-[58px] flex flex-col items-center justify-center gap-[3px] cursor-pointer font-bold text-[12px] whitespace-nowrap transition-colors duration-350 active:scale-[0.94] ${
              activeTab === 2 ? 'text-white' : 'text-[#8A90A2]'
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3.5" y="5" width="17" height="13" rx="3" />
              <path d="M10.5 9.3v5.4l4.4-2.7z" />
            </svg>
            <span>Formations</span>
          </div>

          {/* 3 : Profil */}
          <div
            onClick={() => navigate('/espace/profil')}
            title="Profil"
            className={`relative z-10 flex-1 min-w-0 h-[58px] flex flex-col items-center justify-center gap-[3px] cursor-pointer font-bold text-[12px] whitespace-nowrap transition-colors duration-350 active:scale-[0.94] ${
              activeTab === 3 ? 'text-white' : 'text-[#8A90A2]'
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8.5" r="3.6" />
              <path d="M4.5 20c.9-3.8 3.9-6 7.5-6s6.6 2.2 7.5 6" />
            </svg>
            <span>Profil</span>
          </div>
        </nav>
      )}


      {/* Modal d'inscription invité */}
      <ModalInscriptionInvite
        isOpen={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
        initialNom={casse(moi?.nom)}
        initialPrenom={casse(moi?.prenom)}
        initialMatricule={moi?.matricule ?? ''}
      />
    </div>
  );
}