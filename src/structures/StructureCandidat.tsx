import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import logoUpb from '../assets/images/logo_genie_upb.png';
import ModalInscriptionInvite from '../components/common/ModalInscriptionInvite';

/**
 * ============================================================================
 * STRUCTURE PARTICIPANT (P1 à P5e) — PROTOTYPE V4
 * ============================================================================
 * 100% fidèle à GENIE UPB - Prototype (4).html :
 * - Desktop (>= 768px) : Sidebar fixe gauche 248px (pDesk) + conteneur max-width 1180px
 * - Mobile (< 768px)   : Barre capsule floating 4 onglets en bas (appBarOn)
 * - Barre supérieure floating : "← Retour au site" + Logo (mobile) + menu "Pages ▾"
 * 
 * Strictement en classes Tailwind CSS (zéro inline style statique).
 */
export default function StructureCandidat() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [pagesOpen, setPagesOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [guestModalOpen, setGuestModalOpen] = useState(false);

  useEffect(() => {
    setPagesOpen(false);
    try {
      const saved = localStorage.getItem('genie-avatar') || '';
      setAvatarUrl(saved);
    } catch (_) {
      // ignore
    }
  }, [location.pathname, location.search]);

  // Écouter les changements d'avatar depuis la page Profil (P2)
  useEffect(() => {
    const onAvatarUpdate = () => {
      try {
        setAvatarUrl(localStorage.getItem('genie-avatar') || '');
      } catch (_) {
        // ignore
      }
    };
    window.addEventListener('genie-avatar-updated', onAvatarUpdate);
    return () => window.removeEventListener('genie-avatar-updated', onAvatarUpdate);
  }, []);

  // Déterminer l'onglet actif : 0 = Mon espace, 1 = Mon équipe, 2 = Formations, 3 = Profil
  const getActiveTab = (): number => {
    const p = location.pathname;
    if (p.startsWith('/espace/profil')) return 3;
    if (p.startsWith('/espace/formations')) return 2;
    if (p === '/espace/equipe/soumission') return 0; // P3e est rattaché à 0 dans pDesk
    if (p.startsWith('/espace/equipe') || p.startsWith('/espace/statut')) return 1;
    return 0; // /espace/dashboard (P1)
  };

  const activeTab = getActiveTab();

  // Liste officielle PN du menu rapide "Pages ▾" (Prototype v4)
  const pNavItems = [
    { label: 'Mon espace', path: '/espace/dashboard' },
    { label: 'Créer une équipe', path: '/espace/equipe/creer' },
    { label: 'Invitations', path: '/espace/equipe/invitations' },
    { label: 'Mon équipe', path: '/espace/equipe' },
    { label: 'Membres', path: '/espace/equipe/membres' },
    { label: 'Retiré de l’équipe', path: '/espace/equipe?state=removed' },
    { label: 'Chartes', path: '/espace/equipe/chartes' },
    { label: 'Soumettre', path: '/espace/equipe/soumission' },
    { label: 'Statut', path: '/espace/statut' },
    { label: 'Formations', path: '/espace/formations' },
    { label: 'Profil', path: '/espace/profil' },
  ];

  const currentFullUrl = location.pathname + location.search;

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
              Mon équipe
            </span>
            <span className="font-black text-[17px] text-[#0A1430]">
              Les Bâtisseurs
            </span>
            <span className="font-semibold text-[13px] text-[#E8621A]">
              Innovation · 3 / 4 membres
            </span>
          </div>

          {/* Option invité si l'étudiant n'a pas d'équipe */}
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

          {/* Bas de sidebar : Profil Aya Kouassi + Retour au site */}
          <div className="mt-auto flex flex-col gap-3">
            <div
              onClick={() => navigate('/espace/profil')}
              className="flex items-center gap-3 p-2 mb-[52px] rounded-[14px] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span
                style={{
                  backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                }}
                className="w-[42px] h-[42px] shrink-0 rounded-full bg-[#2F6BF0] bg-cover bg-center text-white grid place-items-center font-extrabold text-[15px]"
              >
                {avatarUrl ? '' : 'AK'}
              </span>
              <span className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430] whitespace-nowrap">
                  Aya Kouassi
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189] whitespace-nowrap">
                  L2 · MIAGE
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
          {/* Barre supérieure flottante (← Retour au site + Logo sur mobile, Pages ▾ partout) */}
          {!isMembresScreen && (
            <div className="absolute top-0 left-0 right-0 z-[60] flex justify-between md:justify-end items-center gap-2.5 p-3 px-3.5 md:py-5 md:px-8 pointer-events-none">
              {!isDesktop && (
                <>
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
                </>
              )}

              {/* Menu déroulant Pages ▾ */}
              <div className="relative pointer-events-auto">
                <span
                  onClick={() => setPagesOpen((v) => !v)}
                  className="min-h-[42px] px-3.5 rounded-full bg-[#0A1430]/80 backdrop-blur-[10px] text-white font-bold text-[13px] flex items-center gap-1.5 cursor-pointer select-none"
                >
                  Pages <span className="text-[10px]">▾</span>
                </span>

                {pagesOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-[210px] p-1.5 rounded-[18px] bg-white shadow-[0_18px_40px_rgba(10,20,48,0.25)] flex flex-col gap-0.5 z-[100] animate-[badgeIn_0.3s_cubic-bezier(0.3,1.4,0.5,1)]">
                    {pNavItems.map((pn) => {
                      const isActive =
                        currentFullUrl === pn.path ||
                        (pn.path !== '/espace/equipe' && location.pathname === pn.path && !location.search);
                      return (
                        <span
                          key={pn.path}
                          onClick={() => {
                            setPagesOpen(false);
                            navigate(pn.path);
                          }}
                          className={`min-h-[38px] px-3 rounded-[12px] font-bold text-[14px] flex items-center cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-[#0A1430] text-white'
                              : 'bg-[#F3F1EC] text-[#0A1430] hover:bg-slate-200'
                          }`}
                        >
                          {pn.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contenu de l'écran participant */}
          <Outlet />
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
        initialNom="Kouassi"
        initialPrenom="Aya"
        initialMatricule="UPB-2024-0012"
      />
    </div>
  );
}