import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * STRUCTURE FORMATEUR & JURY (F1, F1a, F1b, F2, F2a, F3)
 * ============================================================================
 * 100% fidèle au prototype scripts/proto_real.html :
 * - Barre capsule flottante en bas (fBarOn) avec pastille active coulissante
 * - 3 onglets officiels : Séances (F1), Supports (F2), Annonces (F3)
 * - Fond #F6F8FC, design épuré, zéro invention
 */
export default function StructureFormateur() {
  const location = useLocation();
  const navigate = useNavigate();

  // Déterminer l'onglet actif : 0 = Séances, 1 = Supports, 2 = Annonces
  const getActiveTab = () => {
    const p = location.pathname;
    if (p.startsWith('/formateur/supports')) return 1;
    if (p.startsWith('/formateur/annonces')) return 2;
    return 0; // Séances, Calendrier, Scan QR
  };

  const activeTab = getActiveTab();

  // Masquer la barre sur l'écran plein-écran de scan QR (F1b) si souhaité,
  // mais dans le prototype F1b l'affiche avec index 0 et spacer 100px
  const isScanScreen = location.pathname === '/formateur/seances/scan-qr';

  return (
    <div className="relative min-h-screen bg-[#F6F8FC] flex flex-col selection:bg-[#2F6BF0]/20">
      {/* Contenu principal des écrans formateur */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* ======================================================================
          BARRE DE NAVIGATION CAPSULE FLOTTANTE FORMATEUR (fBarOn)
          scripts/proto_real.html L24886-24915
          ====================================================================== */}
      {!isScanScreen && (
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
