import React, { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import logoUpb from '../assets/images/logo_genie_upb.webp';
import { PageLoader } from '../components/ui/PageLoader';

/**
 * ============================================================================
 * STRUCTURE FORMATEUR & JURY (F1, F1a, F1b, F2, F2a, F3)
 * ============================================================================
 * - Desktop (>= 768px) : Sidebar fixe gauche 248px identique à l'espace participant (pDesk)
 * - Mobile (< 768px)   : Barre capsule flottante en bas (fBarOn) avec pastille active coulissante
 *                        (strictement intouchée, 100% fidèle au mobile actuel)
 * - 3 onglets officiels : Séances (F1), Supports (F2), Annonces (F3)
 * - Décalage md:pl-[248px] sur desktop pour que le contenu ne soit pas masqué par la sidebar
 */
export default function StructureFormateur() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Déterminer l'onglet actif : 0 = Séances, 1 = Supports, 2 = Annonces
  const getActiveTab = () => {
    const p = location.pathname;
    if (p.startsWith('/formateur/supports')) return 1;
    if (p.startsWith('/formateur/annonces')) return 2;
    return 0; // Séances, Calendrier, Scan QR, Dashboard
  };

  const activeTab = getActiveTab();

  // Masquer la barre sur l'écran plein-écran de scan QR (F1b) si souhaité,
  // mais dans le prototype F1b l'affiche avec index 0 et spacer 100px
  const isScanScreen = location.pathname === '/formateur/seances/scan-qr';

  return (
    <div className="relative min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] selection:bg-[#2F6BF0]/20">
      {/* ====================================================================
          1. SIDEBAR DESKTOP FIXE GAUCHE 248px (identique à l'espace participant)
          ==================================================================== */}
      {isDesktop && (
        <aside className="fixed left-0 top-0 bottom-0 w-[248px] z-[300] box-border p-6 px-4 bg-white border-r border-[#E6EAF2] flex flex-col gap-5 overflow-y-auto">
          {/* Logo + Espace formateur */}
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
              formateur
            </span>
          </div>

          {/* Navigation 3 entrées formateur */}
          <nav className="flex flex-col gap-1">
            {/* 0 : Séances */}
            <div
              onClick={() => navigate('/formateur/seances')}
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
                <rect x="3.5" y="5" width="17" height="15" rx="3" />
                <path d="M3.5 10h17M8 3v4M16 3v4" />
              </svg>
              <span>Séances</span>
            </div>

            {/* 1 : Supports */}
            <div
              onClick={() => navigate('/formateur/supports')}
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
                <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20z" />
                <path d="M14 3.5V8h4" />
              </svg>
              <span>Supports</span>
            </div>

            {/* 2 : Annonces */}
            <div
              onClick={() => navigate('/formateur/annonces')}
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
                <path d="M4 10v4h3l6 4V6L7 10z" />
                <path d="M17 9.5a3.5 3.5 0 0 1 0 5" />
              </svg>
              <span>Annonces</span>
            </div>
          </nav>

          {/* Encart résumé Formateur */}
          <div
            onClick={() => navigate('/formateur/seances')}
            className="flex flex-col gap-1.5 p-4 rounded-[18px] bg-[#F3F6FD] cursor-pointer hover:bg-[#eaf0fb] transition-colors"
          >
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
              Session en cours
            </span>
            <span className="font-black text-[17px] text-[#0A1430]">
              Formations UPB
            </span>
            <span className="font-semibold text-[13px] text-[#E8742A]">
              Innovation · Édition 2026-2027
            </span>
          </div>

          {/* Bas de sidebar : Profil Mme Konan + Bouton Retour au site */}
          <div className="mt-auto flex flex-col gap-3">
            <div
              onClick={() => navigate('/formateur/seances')}
              className="flex items-center gap-3 p-2 mb-[52px] rounded-[14px] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span
                className="w-[42px] h-[42px] shrink-0 rounded-full bg-[#E8742A] text-white grid place-items-center font-extrabold text-[15px] shadow-sm"
              >
                MK
              </span>
              <span className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430] whitespace-nowrap">
                  Mme Konan
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189] whitespace-nowrap">
                  Formatrice · Innovation
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="absolute left-4 right-4 bottom-6 min-h-[44px] rounded-[14px] border-[1.5px] border-[#E6EAF2] flex items-center justify-center gap-2 font-extrabold text-[14px] text-[#0A1430] cursor-pointer bg-white hover:bg-slate-50 transition-colors"
            >
              ← Retour au site
            </button>
          </div>
        </aside>
      )}

      {/* Contenu principal des écrans formateur (décalé à gauche sur desktop par la sidebar) */}
      <div className="flex flex-col min-w-0 md:pl-[248px] bg-[#F6F8FC] flex-1 w-full">
        <main className="flex-1 w-full">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      {/* ======================================================================
          BARRE DE NAVIGATION CAPSULE FLOTTANTE FORMATEUR MOBILE (fBarOn)
          scripts/proto_real.html L24886-24915
          STRICTEMENT IDENTIQUE — Visible UNIQUEMENT sur mobile (< 768px)
          ====================================================================== */}
      {!isDesktop && !isScanScreen && (
        <nav
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 'max(14px, env(safe-area-inset-bottom))',
            zIndex: 400,
            width: 'calc(100% - 28px)',
            maxWidth: '380px',
            boxSizing: 'border-box',
            padding: '8px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, .86)',
            backdropFilter: 'blur(20px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
            border: '1px solid rgba(255, 255, 255, .9)',
            display: 'flex',
            alignItems: 'center',
            boxShadow:
              '0 24px 50px rgba(10, 20, 48, .18), 0 4px 12px rgba(10, 20, 48, .06), inset 0 1px 0 #fff',
          }}
        >
          {/* Pastille bleue active coulissante exacte du prototype */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '8px',
              bottom: '8px',
              left: `calc(8px + (100% - 16px) * (${activeTab} / 3))`,
              width: 'calc((100% - 16px) / 3)',
              borderRadius: '999px',
              background: 'radial-gradient(circle at 50% 30%, #6FA2FF, #2F6BF0 70%)',
              border: '2px solid rgba(255, 255, 255, .85)',
              boxSizing: 'border-box',
              boxShadow:
                '0 10px 26px rgba(47, 107, 240, .55), 0 0 34px rgba(47, 107, 240, .35), inset 0 1px 0 rgba(255, 255, 255, .5)',
              transition: 'left .5s cubic-bezier(.3, 1.3, .5, 1)',
            }}
          />

          {/* Onglet 1 : Séances (F1) */}
          <button
            type="button"
            onClick={() => navigate('/formateur/seances')}
            title="Séances"
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              minWidth: 0,
              height: '58px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              cursor: 'pointer',
              userSelect: 'none',
              color: activeTab === 0 ? '#fff' : '#8A90A2',
              font: "700 12px 'Nunito', sans-serif",
              whiteSpace: 'nowrap',
              transition: 'color .35s ease',
              background: 'transparent',
              border: 'none',
              outline: 'none',
            }}
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
              <rect x="3.5" y="5" width="17" height="15" rx="3" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
            <span>Séances</span>
          </button>

          {/* Onglet 2 : Supports (F2) */}
          <button
            type="button"
            onClick={() => navigate('/formateur/supports')}
            title="Supports"
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              minWidth: 0,
              height: '58px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              cursor: 'pointer',
              userSelect: 'none',
              color: activeTab === 1 ? '#fff' : '#8A90A2',
              font: "700 12px 'Nunito', sans-serif",
              whiteSpace: 'nowrap',
              transition: 'color .35s ease',
              background: 'transparent',
              border: 'none',
              outline: 'none',
            }}
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
              <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20z" />
              <path d="M14 3.5V8h4" />
            </svg>
            <span>Supports</span>
          </button>

          {/* Onglet 3 : Annonces (F3) */}
          <button
            type="button"
            onClick={() => navigate('/formateur/annonces')}
            title="Annonces"
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              minWidth: 0,
              height: '58px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              cursor: 'pointer',
              userSelect: 'none',
              color: activeTab === 2 ? '#fff' : '#8A90A2',
              font: "700 12px 'Nunito', sans-serif",
              whiteSpace: 'nowrap',
              transition: 'color .35s ease',
              background: 'transparent',
              border: 'none',
              outline: 'none',
            }}
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
              <path d="M4 10v4h3l6 4V6L7 10z" />
              <path d="M17 9.5a3.5 3.5 0 0 1 0 5" />
            </svg>
            <span>Annonces</span>
          </button>
        </nav>
      )}
    </div>
  );
}
