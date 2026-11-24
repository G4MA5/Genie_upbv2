import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logoUpb from '../../assets/images/logo_genie_upb.webp';

interface SessionItem {
  id: string;
  d: string;
  h: string;
  t: string;
  m: string;
  now: boolean;
  bg: string;
  fg: string;
  sub: string;
}

/**
 * ============================================================================
 * SÉANCES FORMATEUR (ÉCRANS F1 & F1a DU PROTOTYPE)
 * ============================================================================
 * F1 Séances :
 *   - En-tête officiel avec Logo GÉNIE UPB + Badge "Formatrice · Innovation" (#E8742A)
 *   - "Bonjour, Mme Konan"
 *   - Liste des séances avec carte active sombre #0E1E4A & bouton orange "Prendre les présences"
 * F1a Calendrier :
 *   - Bouton retour rond "←"
 *   - "Janvier 2027" + sélecteur de mois "‹ ›"
 *   - Grille 7 colonnes (L M M J V S D) avec indicateurs orange #E8742A
 *   - Détail de la séance sélectionnée avec bordure orange gauche
 * ============================================================================
 */
export default function SeancesPlanning() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mode d'affichage : 'seances' (F1) ou 'calendrier' (F1a)
  const initialView = searchParams.get('view') === 'calendrier' ? 'calendrier' : 'seances';
  const [view, setView] = useState<'seances' | 'calendrier'>(initialView);

  // Synchronisation avec l'URL (si le dev drawer active ?view=calendrier)
  useEffect(() => {
    if (searchParams.get('view') === 'calendrier') {
      setView('calendrier');
    }
  }, [searchParams]);

  const switchView = (newView: 'seances' | 'calendrier') => {
    setView(newView);
    if (newView === 'calendrier') {
      setSearchParams({ view: 'calendrier' });
    } else {
      setSearchParams({});
    }
  };

  // 1. Données authentiques des séances F1
  const fSessions: SessionItem[] = [
    {
      id: 's1',
      d: 'Auj.',
      h: '09:00',
      t: 'Prototypage rapide et maquettes',
      m: 'Fablab, bât. C · 18 inscrits',
      now: true,
      bg: '#0E1E4A',
      fg: '#ffffff',
      sub: '#C9D1E8',
    },
    {
      id: 's2',
      d: 'Mar. 12',
      h: '14:00',
      t: 'Préparer sa démo',
      m: 'Salle 12 · 18 inscrits',
      now: false,
      bg: '#ffffff',
      fg: '#0E1E4A',
      sub: '#6A7189',
    },
    {
      id: 's3',
      d: 'Jeu. 14',
      h: '17:00',
      t: 'Pitch blanc',
      m: 'À distance · 18 inscrits',
      now: false,
      bg: '#ffffff',
      fg: '#0E1E4A',
      sub: '#6A7189',
    },
  ];

  // 2. Données authentiques du calendrier Janvier 2027 (F1a)
  const [selectedDay, setSelectedDay] = useState<number>(7);
  const trainingDays = [4, 7, 9, 11, 12, 14, 16, 18, 20, 23];

  // 4 cases vides initiales (janvier 2027 démarre un vendredi)
  const emptyDays = [null, null, null, null];
  const janDays = Array.from({ length: 31 }, (_, i) => {
    const d = i + 1;
    const hasSession = trainingDays.includes(d);
    const isSelected = d === selectedDay;
    return {
      n: d,
      hasSession,
      isSelected,
      bg: isSelected ? '#0E1E4A' : hasSession ? '#fff' : 'transparent',
      fg: isSelected ? '#fff' : hasSession ? '#0E1E4A' : '#B5B8C4',
      dot: isSelected ? '#E8742A' : hasSession ? '#E8742A' : 'transparent',
    };
  });

  return (
    <div
      data-screen-label={view === 'calendrier' ? 'F1a Calendrier' : 'F1 Seances'}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#F6F8FC',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="p-4 sm:p-6 md:py-8 md:px-8"
    >
      <div className="w-full max-w-[560px] md:max-w-[880px] lg:max-w-[1020px] mx-auto flex flex-col gap-4">
        {/* ==================================================================
            VUE 1 : F1 SÉANCES (LISTE DES SÉANCES)
            ================================================================== */}
        {view === 'seances' && (
          <div className="flex flex-col gap-4">
            {/* Ligne haute : Logo GÉNIE UPB + Badge Formatrice Innovation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img
                src={logoUpb}
                alt="GÉNIE UPB"
                style={{ height: '38px', width: 'auto', display: 'block' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => switchView('calendrier')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '999px',
                    background: '#fff',
                    font: "700 13px 'Nunito', sans-serif",
                    color: '#0E1E4A',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="hover:bg-slate-50 transition-colors"
                  title="Afficher la vue calendrier mensuel (F1a)"
                >
                  <span>Calendrier</span>
                  <span style={{ fontSize: '11px' }}>↗</span>
                </button>

                <span
                  style={{
                    padding: '5px 12px',
                    borderRadius: '999px',
                    background: '#fff',
                    font: "700 13px 'Nunito', sans-serif",
                    color: '#E8742A',
                    boxShadow: '0 2px 8px rgba(0,0,0,.04)',
                  }}
                >
                  Formatrice · Innovation
                </span>
              </div>
            </div>

            {/* Titre Bonjour, Mme Konan */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
              <span
                style={{
                  font: "500 16px 'Nunito', sans-serif",
                  color: '#6A7189',
                }}
              >
                Bonjour,
              </span>
              <h1
                style={{
                  margin: 0,
                  font: "800 36px/1 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  letterSpacing: '-.02em',
                }}
              >
                Mme Konan
              </h1>
            </div>

            {/* Liste des cartes Séances du prototype */}
            <div className="flex flex-col gap-3.5 md:gap-5 mt-1">
              {fSessions.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: s.bg,
                    color: s.fg,
                    borderRadius: '22px',
                    boxShadow: s.now
                      ? '0 12px 30px rgba(14,30,74,.18)'
                      : '0 4px 16px rgba(14,30,74,.04)',
                  }}
                  className="p-4 md:p-6 flex flex-col gap-2.5 md:gap-3.5 transition-shadow"
                >
                  {/* Date et Heure en monospace */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      font: "700 13px 'JetBrains Mono', monospace",
                      color: s.sub,
                    }}
                  >
                    <span>
                      {s.d} · {s.h}
                    </span>
                    {s.now && (
                      <span
                        style={{
                          background: 'rgba(255,255,255,.15)',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          color: '#fff',
                        }}
                      >
                        En cours
                      </span>
                    )}
                  </div>

                  {/* Titre de la séance */}
                  <span
                    style={{
                      font: "800 20px/1.15 'Nunito', sans-serif",
                    }}
                    className="md:text-[22px]"
                  >
                    {s.t}
                  </span>

                  {/* Lieu & Inscrits */}
                  <span
                    style={{
                      font: "500 14px 'Nunito', sans-serif",
                      color: s.sub,
                    }}
                    className="md:text-[15px]"
                  >
                    {s.m}
                  </span>

                  {/* Bouton d'action orange authentique Prendre les présences (si en cours) */}
                  {s.now && (
                    <button
                      type="button"
                      onClick={() => navigate('/formateur/seances/scan-qr')}
                      style={{
                        minHeight: '50px',
                        borderRadius: '14px',
                        border: '3px solid #fff',
                        background: 'linear-gradient(180deg, #FF9A3D, #E8621A)',
                        color: '#fff',
                        boxShadow: '0 10px 22px rgba(232,98,26,.35)',
                        font: "800 16px 'Nunito', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '4px',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'transform .15s, box-shadow .15s',
                      }}
                      className="hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Prendre les présences</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            VUE 2 : F1a CALENDRIER MENSUEL
            ================================================================== */}
        {view === 'calendrier' && (
          <div className="flex flex-col gap-3.5">
            {/* Bouton retour rond exact du prototype */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => switchView('seances')}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: "700 20px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(14,30,74,.05)',
                  cursor: 'pointer',
                }}
                className="hover:bg-slate-50 transition-colors"
                title="Retour aux séances (F1)"
              >
                ←
              </button>

              <span
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  background: '#fff',
                  font: "700 13px 'Nunito', sans-serif",
                  color: '#E8742A',
                }}
              >
                Formatrice · Innovation
              </span>
            </div>

            {/* En-tête mois : Janvier 2027 + chevrons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: '4px',
              }}
            >
              <h1
                style={{
                  margin: 0,
                  font: "800 32px/1 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  letterSpacing: '-.02em',
                }}
              >
                Janvier 2027
              </h1>
              <div style={{ display: 'flex', gap: '8px', font: "700 18px 'Nunito', sans-serif", color: '#0E1E4A' }}>
                <span style={{ cursor: 'pointer', padding: '0 6px' }}>‹</span>
                <span style={{ cursor: 'pointer', padding: '0 6px' }}>›</span>
              </div>
            </div>

            {/* Grille du calendrier exacte du prototype */}
            <div
              style={{
                background: '#fff',
                borderRadius: '22px',
                padding: '16px',
                boxShadow: '0 4px 20px rgba(14,30,74,.04)',
              }}
              className="md:p-6"
            >
              {/* Ligne des jours de la semaine */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '4px',
                  marginBottom: '6px',
                }}
              >
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((j, idx) => (
                  <span
                    key={`${j}-${idx}`}
                    style={{
                      textAlign: 'center',
                      font: "600 13px 'Nunito', sans-serif",
                      color: '#8A8FA3',
                    }}
                  >
                    {j}
                  </span>
                ))}
              </div>

              {/* Cellules des jours */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '4px',
                }}
              >
                {/* 4 cases d'alignement pour le début le vendredi */}
                {emptyDays.map((_, idx) => (
                  <div key={`empty-${idx}`} style={{ aspectRatio: '1' }} />
                ))}

                {janDays.map((c) => (
                  <button
                    key={c.n}
                    type="button"
                    onClick={() => setSelectedDay(c.n)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '12px',
                      background: c.bg,
                      color: c.fg,
                      font: "700 15px 'Nunito', sans-serif",
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                      boxShadow: 'inset 0 0 0 1px #F2F0EA',
                      border: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'background .15s, color .15s',
                    }}
                  >
                    <span>{c.n}</span>
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: c.dot,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Fiche détaillée de la séance sélectionnée F1a */}
            <span
              style={{
                font: "600 13px 'JetBrains Mono', monospace",
                color: '#6A7189',
                marginTop: '6px',
              }}
            >
              {selectedDay === 7 ? 'JEUDI 7 JANVIER' : `JOURNÉE DU ${selectedDay} JANVIER`}
            </span>

            <div
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                borderLeft: '5px solid #E8742A',
                boxShadow: '0 4px 16px rgba(14,30,74,.04)',
              }}
              className="md:p-6"
            >
              <span
                style={{
                  font: "800 18px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                }}
                className="md:text-[20px]"
              >
                {selectedDay === 7
                  ? 'Prototypage rapide et maquettes'
                  : selectedDay === 12
                  ? 'Préparer sa démo'
                  : selectedDay === 14
                  ? 'Pitch blanc'
                  : 'Session de mentorat technique'}
              </span>

              <span
                style={{
                  font: "500 14px 'Nunito', sans-serif",
                  color: '#6A7189',
                }}
              >
                09:00 – 12:00 · Fablab, bât. C · 18 inscrits
              </span>

              <button
                type="button"
                onClick={() => navigate('/formateur/seances/scan-qr')}
                style={{
                  font: "700 15px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  marginTop: '6px',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                className="hover:text-[#E8742A] transition-colors"
              >
                <span>Prendre les présences →</span>
              </button>
            </div>
          </div>
        )}

        {/* Espaceur bas transparent pour dégager la barre de navigation capsule */}
        <div aria-hidden="true" style={{ flex: 'none', height: '100px' }} />
      </div>
    </div>
  );
}
