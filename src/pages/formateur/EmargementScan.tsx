import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface ScannedItem {
  i: string;
  n: string;
  t: string;
  h: string;
  bg: string;
}

/**
 * ============================================================================
 * ÉCRAN F1b : PRÉSENCE PAR SCAN QR CODE
 * ============================================================================
 * 100% fidèle au prototype scripts/proto_real.html L608915-609100 :
 * - Viseur scanner 220x220px avec bordure #E8B33D et masque sombre
 * - Bouton fermer rond "×" et bouton torche "⚡"
 * - Feuille de présence #F6F8FC avec coins supérieurs arrondis 28px
 * - Bannière verte de confirmation "Aya Kouassi · Présence enregistrée · Les Bâtisseurs"
 * - Champ de saisie manuelle fallback "N° de badge (si le scan échoue)" + bouton "OK"
 * - Compteur "Présents 12 / 18"
 * - Liste des 4 émargements récents avec avatars colorés
 * ============================================================================
 */
export default function EmargementScan() {
  const navigate = useNavigate();
  const [torch, setTorch] = useState<boolean>(false);
  const [badgeInput, setBadgeInput] = useState<string>('');

  const [attendees, setAttendees] = useState<ScannedItem[]>([
    { i: 'AK', n: 'Aya Kouassi', t: 'Les Bâtisseurs', h: '08:58', bg: '#E8742A' },
    { i: 'MD', n: 'Moussa Diabaté', t: 'Les Bâtisseurs', h: '08:57', bg: '#2F6BF0' },
    { i: 'IO', n: 'Ines Ouattara', t: 'Kora Project', h: '08:55', bg: '#17744B' },
    { i: 'PB', n: 'Paul Brou', t: 'Abidjan Makers', h: '08:52', bg: '#8E44AD' },
  ]);

  const [lastScanned, setLastScanned] = useState<{ n: string; t: string }>({
    n: 'Aya Kouassi',
    t: 'Les Bâtisseurs',
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeInput.trim()) return;

    const initials = badgeInput.trim().slice(0, 2).toUpperCase();
    const newItem: ScannedItem = {
      i: initials,
      n: `Participant (${badgeInput.trim().toUpperCase()})`,
      t: 'Équipe Innovation',
      h: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bg: '#2F6BF0',
    };

    setAttendees((prev) => [newItem, ...prev]);
    setLastScanned({ n: newItem.n, t: newItem.t });
    setBadgeInput('');
    toast.success('Badge émargé avec succès !');
  };

  const toggleTorch = () => {
    const next = !torch;
    setTorch(next);
    toast(next ? '⚡ Lampe torche activée' : 'Lampe torche éteinte');
  };

  return (
    <div
      data-screen-label="F1b Presence par scan"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#0A1430',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
      className="md:py-8"
    >
      <div
        className="w-full max-w-[440px] md:rounded-[32px] overflow-hidden flex flex-col md:shadow-[0_20px_60px_rgba(0,0,0,.6)] bg-[#0A1430]"
        style={{
          minHeight: '100vh',
        }}
      >
        {/* ==================================================================
            1. ZONE DE CAMÉRA / VISEUR (Exact Prototype F1b)
            ================================================================== */}
        <div
          style={{
            position: 'relative',
            height: '380px',
            background: 'radial-gradient(circle at 50% 45%, #2B3550, #0A1018)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Barre supérieure : Bouton ×, Titre séance, Torche ⚡ */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
              zIndex: 10,
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/formateur/seances')}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: "700 18px 'Nunito', sans-serif",
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Fermer le scanner"
            >
              ×
            </button>

            <span
              style={{
                font: "700 14px 'Nunito', sans-serif",
                letterSpacing: '.01em',
              }}
            >
              Prototypage rapide · 09:00
            </span>

            <button
              type="button"
              onClick={toggleTorch}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: torch ? '#FFD043' : 'rgba(255,255,255,.15)',
                color: torch ? '#0A1430' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: "700 16px 'Nunito', sans-serif",
                border: 'none',
                cursor: 'pointer',
                transition: 'background .2s, color .2s',
              }}
              title="Activer la torche"
            >
              ⚡
            </button>
          </div>

          {/* Cadre de visée 220x220 avec bordure jaune #E8B33D et découpe d'ombre */}
          <div
            style={{
              width: '220px',
              height: '220px',
              borderRadius: '28px',
              border: '4px solid #E8B33D',
              boxShadow: '0 0 0 999px rgba(0,0,0,.35)',
              position: 'relative',
            }}
          >
            {/* Ligne laser balayage animée */}
            <div
              className="absolute inset-x-2 h-0.5 bg-[#E8B33D] opacity-80 animate-pulse"
              style={{ top: '50%' }}
            />
          </div>

          {/* Consigne sous le cadre */}
          <span
            style={{
              position: 'absolute',
              bottom: '18px',
              color: '#fff',
              font: "600 15px 'Nunito', sans-serif",
              textAlign: 'center',
              padding: '0 20px',
            }}
          >
            Placez le QR code du badge dans le cadre
          </span>
        </div>

        {/* ==================================================================
            2. FEUILLE BLANCHE INFÉRIEURE (#F6F8FC avec rounded 28px)
            ================================================================== */}
        <div
          style={{
            flex: 1,
            background: '#F6F8FC',
            borderRadius: '28px 28px 0 0',
            marginTop: '-24px',
            position: 'relative',
            padding: '18px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Bannière de confirmation de scan verte #DFF2E7 */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 14px',
              borderRadius: '16px',
              background: '#DFF2E7',
              color: '#17744B',
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#17744B',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: "800 16px 'Nunito', sans-serif",
                flex: 'none',
              }}
            >
              ✓
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  font: "800 16px 'Nunito', sans-serif",
                }}
              >
                {lastScanned.n}
              </span>
              <span
                style={{
                  font: "500 13px 'Nunito', sans-serif",
                }}
              >
                Présence enregistrée · {lastScanned.t}
              </span>
            </div>
          </div>

          {/* Champ de saisie manuelle fallback */}
          <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={badgeInput}
              onChange={(e) => setBadgeInput(e.target.value)}
              placeholder="N° de badge (si le scan échoue)"
              style={{
                flex: 1,
                minHeight: '48px',
                borderRadius: '14px',
                border: '1.5px solid #D6D2C8',
                background: '#fff',
                padding: '0 14px',
                font: "500 15px 'Nunito', sans-serif",
                color: '#0E1E4A',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                minHeight: '48px',
                padding: '0 16px',
                borderRadius: '999px',
                background: '#0E1E4A',
                color: '#fff',
                font: "700 15px 'Nunito', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </form>

          {/* Ligne compteur Présents 12 / 18 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginTop: '4px',
            }}
          >
            <span
              style={{
                font: "800 18px 'Nunito', sans-serif",
                color: '#0E1E4A',
              }}
            >
              Présents
            </span>
            <span
              style={{
                font: "800 18px 'Nunito', sans-serif",
                color: '#17744B',
              }}
            >
              {attendees.length + 8} / 18
            </span>
          </div>

          {/* Liste des participants émargés */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {attendees.map((p, idx) => (
              <div
                key={`${p.n}-${idx}`}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    flex: 'none',
                    borderRadius: '50%',
                    background: p.bg,
                    color: '#fff',
                    font: "700 12px 'Nunito', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {p.i}
                </span>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      font: "700 15px 'Nunito', sans-serif",
                      color: '#0E1E4A',
                    }}
                  >
                    {p.n}
                  </span>
                  <span
                    style={{
                      font: "500 13px 'Nunito', sans-serif",
                      color: '#6A7189',
                    }}
                  >
                    {p.t}
                  </span>
                </div>

                <span
                  style={{
                    font: "600 13px 'JetBrains Mono', monospace",
                    color: '#6A7189',
                  }}
                >
                  {p.h}
                </span>
              </div>
            ))}
          </div>

          {/* Espaceur bas pour la navigation */}
          <div aria-hidden="true" style={{ flex: 'none', height: '80px' }} />
        </div>
      </div>
    </div>
  );
}
