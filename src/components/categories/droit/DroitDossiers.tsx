import React, { useState } from 'react';

export default function DroitDossiers() {
  const [sdOpen, setSdOpen] = useState<number>(0);

  const toggleFolder = (index: number) => {
    setSdOpen((prev) => (prev === index ? -1 : index));
  };

  const getFolderTop = (i: number) => {
    const B = 128;
    if (sdOpen < 0 || i <= sdOpen) {
      return `${i * B}px`;
    }
    return `calc(100% - ${(3 - i) * 96}px)`;
  };

  return (
    <div
      id="dossiers"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '980px',
        display: 'flex',
        flexDirection: 'column',
        background: '#600E14',
        overflow: 'hidden',
      }}
    >
      {/* Header section */}
      <div
        style={{
          position: 'relative',
          flex: 'none',
          padding: 'clamp(56px,7vh,88px) clamp(20px,5vw,72px) 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span
            style={{
              font: "700 13px 'JetBrains Mono',monospace",
              letterSpacing: '.12em',
              color: '#E8CFA4',
            }}
          >
            LE DOSSIER
          </span>
          <h2
            style={{
              margin: 0,
              font: '400 clamp(40px,5vw,68px)/1.02 Nunito,sans-serif',
              color: '#fff',
              letterSpacing: '-.02em',
            }}
          >
            Les trois <b style={{ fontWeight: 900 }}>épreuves.</b>
          </h2>
          <span style={{ display: 'block', width: '80px', height: '6px', borderRadius: '3px', background: '#fff' }} />
        </div>
        <span
          style={{
            position: 'relative',
            font: '500 16px Nunito,sans-serif',
            color: '#F3E2C4',
            paddingBottom: '6px',
          }}
        >
          Ouvrez un dossier ↓
        </span>
      </div>

      {/* Zone des 3 dossiers physiques superposés */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {/* ==================== DOSSIER 01 ==================== */}
        <div
          onClick={() => toggleFolder(0)}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: getFolderTop(0),
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'top .7s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          {/* Onglet 01 */}
          <div
            style={{
              position: 'relative',
              flex: 'none',
              height: '54px',
              marginLeft: '5%',
              width: 'clamp(180px,22vw,280px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '22px 22px 0 0',
                background: '#2A0B0E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -8px 18px rgba(0,0,0,.18)',
              }}
            >
              <span
                style={{
                  font: '900 14px Nunito,sans-serif',
                  letterSpacing: '.16em',
                  color: '#fff',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Épreuve 01
              </span>
            </div>
            {/* Oreilles concaves gauche et droite */}
            <span
              style={{
                position: 'absolute',
                left: '-22px',
                bottom: 0,
                width: '22px',
                height: '22px',
                background: 'radial-gradient(circle at 0 0,transparent 21.5px,#2A0B0E 22px)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '-22px',
                bottom: 0,
                width: '22px',
                height: '22px',
                background: 'radial-gradient(circle at 100% 0,transparent 21.5px,#2A0B0E 22px)',
              }}
            />
          </div>

          {/* Corps de chemise 01 */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              background: '#2A0B0E',
              backgroundImage: 'radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px)',
              backgroundSize: '6px 6px',
              boxShadow: '0 -12px 34px rgba(0,0,0,.28)',
              padding: '22px clamp(20px,5vw,72px) 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              overflow: 'hidden',
            }}
          >
            {/* Photo officielle avec dégradé fondu */}
            <img
              src="/images/f3963bb8-de66-4060-9c0e-d13d9d4689d2.webp"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: 'auto',
                maxWidth: '72%',
                objectFit: 'cover',
                objectPosition: 'left top',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg,#2A0B0E 0%,#2A0B0E 34%,#2A0B0E00 72%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Numéro géant filigrane 01 */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 'clamp(20px,5vw,72px)',
                bottom: '-0.18em',
                font: '900 clamp(120px,16vw,240px)/1 Nunito,sans-serif',
                color: 'rgba(255,255,255,.05)',
                letterSpacing: '-.04em',
                pointerEvents: 'none',
              }}
            >
              01
            </span>

            {/* Titre et icône toggle 01 */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '18px', flexWrap: 'wrap', minWidth: 0 }}>
                <span
                  style={{
                    font: '900 clamp(28px,3.4vw,48px)/1 Nunito,sans-serif',
                    color: '#fff',
                    letterSpacing: '-.02em',
                  }}
                >
                  Génie en herbe
                </span>
                <span style={{ font: '600 17px Nunito,sans-serif', color: '#E8CFA4' }}>
                  Teste les connaissances
                </span>
              </div>
              <span
                style={{
                  flex: 'none',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  font: '600 24px/1 Nunito,sans-serif',
                  rotate: sdOpen === 0 ? '45deg' : '0deg',
                  transition: 'rotate .45s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                +
              </span>
            </div>

            {/* Contenu détaillé 01 */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                paddingRight: 'clamp(0px,calc((100vw - 640px) * 100),min(50%,580px))',
                boxSizing: 'border-box',
                opacity: sdOpen === 0 ? 1 : 0,
                translate: sdOpen === 0 ? '0 0' : '0 16px',
                transition: 'opacity .45s ease .1s,translate .55s cubic-bezier(.2,.8,.2,1) .05s',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                paddingBottom: '80px',
              }}
            >
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#fff',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#E8CFA4' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Jeu de questions-réponses : le modérateur pose la question, la première équipe qui appuie sur son buzzer répond.
                  </span>
                </li>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#fff',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#E8CFA4' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Les points s’affichent en temps réel sur l’application et sur l’écran.
                  </span>
                </li>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#fff',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#E8CFA4' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    150 à 200 questions préparées.
                  </span>
                </li>
              </ul>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '12px' }}>
                <div
                  style={{
                    borderRadius: '18px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      font: "700 12px 'JetBrains Mono',monospace",
                      letterSpacing: '.08em',
                      color: '#E8CFA4',
                      textTransform: 'uppercase',
                    }}
                  >
                    Évalué par
                  </span>
                  <span style={{ font: '800 18px/1.35 Nunito,sans-serif', color: '#fff' }}>
                    Le modérateur
                  </span>
                </div>
                <div
                  style={{
                    borderRadius: '18px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      font: "700 12px 'JetBrains Mono',monospace",
                      letterSpacing: '.08em',
                      color: '#E8CFA4',
                      textTransform: 'uppercase',
                    }}
                  >
                    Ce qui compte
                  </span>
                  <span style={{ font: '800 18px/1.35 Nunito,sans-serif', color: '#fff' }}>
                    Rapidité et exactitude
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== DOSSIER 02 ==================== */}
        <div
          onClick={() => toggleFolder(1)}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: getFolderTop(1),
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'top .7s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          {/* Onglet 02 */}
          <div
            style={{
              position: 'relative',
              flex: 'none',
              height: '54px',
              marginLeft: '36%',
              width: 'clamp(180px,22vw,280px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '22px 22px 0 0',
                background: '#8E2027',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -8px 18px rgba(0,0,0,.18)',
              }}
            >
              <span
                style={{
                  font: '900 14px Nunito,sans-serif',
                  letterSpacing: '.16em',
                  color: '#fff',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Épreuve 02
              </span>
            </div>
            {/* Oreilles concaves gauche et droite */}
            <span
              style={{
                position: 'absolute',
                left: '-22px',
                bottom: 0,
                width: '22px',
                height: '22px',
                background: 'radial-gradient(circle at 0 0,transparent 21.5px,#8E2027 22px)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '-22px',
                bottom: 0,
                width: '22px',
                height: '22px',
                background: 'radial-gradient(circle at 100% 0,transparent 21.5px,#8E2027 22px)',
              }}
            />
          </div>

          {/* Corps de chemise 02 */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              background: '#8E2027',
              backgroundImage: 'radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px)',
              backgroundSize: '6px 6px',
              boxShadow: '0 -12px 34px rgba(0,0,0,.28)',
              padding: '22px clamp(20px,5vw,72px) 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              overflow: 'hidden',
            }}
          >
            {/* Photo officielle avec dégradé fondu */}
            <img
              src="/images/4634aa41-81b7-4f80-9e39-6553a6c62d26.webp"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: 'auto',
                maxWidth: '72%',
                objectFit: 'cover',
                objectPosition: 'left top',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg,#8E2027 0%,#8E2027 34%,#8E202700 72%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Numéro géant filigrane 02 */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 'clamp(20px,5vw,72px)',
                bottom: '-0.18em',
                font: '900 clamp(120px,16vw,240px)/1 Nunito,sans-serif',
                color: 'rgba(255,255,255,.05)',
                letterSpacing: '-.04em',
                pointerEvents: 'none',
              }}
            >
              02
            </span>

            {/* Titre et icône toggle 02 */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '18px', flexWrap: 'wrap', minWidth: 0 }}>
                <span
                  style={{
                    font: '900 clamp(28px,3.4vw,48px)/1 Nunito,sans-serif',
                    color: '#fff',
                    letterSpacing: '-.02em',
                  }}
                >
                  Débat contradictoire
                </span>
                <span style={{ font: '600 17px Nunito,sans-serif', color: '#F3E2C4' }}>
                  Teste la capacité à convaincre
                </span>
              </div>
              <span
                style={{
                  flex: 'none',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  font: '600 24px/1 Nunito,sans-serif',
                  rotate: sdOpen === 1 ? '45deg' : '0deg',
                  transition: 'rotate .45s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                +
              </span>
            </div>

            {/* Contenu détaillé 02 */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                paddingRight: 'clamp(0px,calc((100vw - 640px) * 100),min(50%,580px))',
                boxSizing: 'border-box',
                opacity: sdOpen === 1 ? 1 : 0,
                translate: sdOpen === 1 ? '0 0' : '0 16px',
                transition: 'opacity .45s ease .1s,translate .55s cubic-bezier(.2,.8,.2,1) .05s',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                paddingBottom: '80px',
              }}
            >
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#fff',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#F3E2C4' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Deux camps défendent des idées opposées, sur un sujet d’ordre général (pas forcément juridique).
                  </span>
                </li>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#fff',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#F3E2C4' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Passage de 8 minutes : introduction (2 min), développement (3 min), conclusion (3 min).
                  </span>
                </li>
              </ul>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '12px' }}>
                <div
                  style={{
                    borderRadius: '18px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      font: "700 12px 'JetBrains Mono',monospace",
                      letterSpacing: '.08em',
                      color: '#F3E2C4',
                      textTransform: 'uppercase',
                    }}
                  >
                    Jury
                  </span>
                  <span style={{ font: '800 18px/1.35 Nunito,sans-serif', color: '#fff' }}>
                    3 personnes
                  </span>
                </div>
                <div
                  style={{
                    borderRadius: '18px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,.07)',
                    border: '1px solid rgba(255,255,255,.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      font: "700 12px 'JetBrains Mono',monospace",
                      letterSpacing: '.08em',
                      color: '#F3E2C4',
                      textTransform: 'uppercase',
                    }}
                  >
                    Critères, dans l’ordre
                  </span>
                  <span style={{ font: '800 18px/1.35 Nunito,sans-serif', color: '#fff' }}>
                    Tenue, gestuelle, occupation scénique, pertinence des arguments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== DOSSIER 03 ==================== */}
        <div
          onClick={() => toggleFolder(2)}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: getFolderTop(2),
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'top .7s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          {/* Onglet 03 */}
          <div
            style={{
              position: 'relative',
              flex: 'none',
              height: '54px',
              marginLeft: '66%',
              width: 'clamp(180px,22vw,280px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '22px 22px 0 0',
                background: '#E8CFA4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -8px 18px rgba(0,0,0,.18)',
              }}
            >
              <span
                style={{
                  font: '900 14px Nunito,sans-serif',
                  letterSpacing: '.16em',
                  color: '#5E1217',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Épreuve 03
              </span>
            </div>
            {/* Oreilles concaves gauche et droite */}
            <span
              style={{
                position: 'absolute',
                left: '-22px',
                bottom: 0,
                width: '22px',
                height: '22px',
                background: 'radial-gradient(circle at 0 0,transparent 21.5px,#E8CFA4 22px)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '-22px',
                bottom: 0,
                width: '22px',
                height: '22px',
                background: 'radial-gradient(circle at 100% 0,transparent 21.5px,#E8CFA4 22px)',
              }}
            />
          </div>

          {/* Corps de chemise 03 */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              background: '#E8CFA4',
              backgroundImage: 'radial-gradient(rgba(94,18,23,.05) 1px,transparent 1px)',
              backgroundSize: '6px 6px',
              boxShadow: '0 -12px 34px rgba(0,0,0,.28)',
              padding: '22px clamp(20px,5vw,72px) 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              overflow: 'hidden',
            }}
          >
            {/* Photo officielle avec dégradé fondu à gauche */}
            <img
              src="/images/300dfb21-0316-461e-b373-392c806a4440.webp"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: '96px',
                bottom: 0,
                height: 'calc(100% - 96px)',
                width: 'auto',
                maxWidth: '60%',
                objectFit: 'cover',
                objectPosition: 'right top',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: sdOpen === 2 ? 1 : 0,
                translate: sdOpen === 2 ? '0 0' : '-40px 0',
                transition: 'opacity .5s ease,translate .7s cubic-bezier(.2,.8,.2,1)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(270deg,#E8CFA4 0%,#E8CFA4 38%,#E8CFA400 70%)',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: sdOpen === 2 ? 1 : 0,
                transition: 'opacity .5s ease',
              }}
            />

            {/* Numéro géant filigrane 03 */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 'clamp(20px,5vw,72px)',
                bottom: '-0.18em',
                font: '900 clamp(120px,16vw,240px)/1 Nunito,sans-serif',
                color: 'rgba(94,18,23,.07)',
                letterSpacing: '-.04em',
                pointerEvents: 'none',
              }}
            >
              03
            </span>

            {/* Titre et icône toggle 03 */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '18px', flexWrap: 'wrap', minWidth: 0 }}>
                <span
                  style={{
                    font: '900 clamp(28px,3.4vw,48px)/1 Nunito,sans-serif',
                    color: '#5E1217',
                    letterSpacing: '-.02em',
                  }}
                >
                  Procès fictif
                </span>
                <span style={{ font: '600 17px Nunito,sans-serif', color: '#8E2027' }}>
                  Teste la pratique du droit
                </span>
              </div>
              <span
                style={{
                  flex: 'none',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #5E1217',
                  color: '#5E1217',
                  display: 'grid',
                  placeItems: 'center',
                  font: '600 24px/1 Nunito,sans-serif',
                  rotate: sdOpen === 2 ? '45deg' : '0deg',
                  transition: 'rotate .45s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                +
              </span>
            </div>

            {/* Contenu détaillé 03 */}
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                paddingLeft: 'clamp(0px,calc((100vw - 640px) * 100),min(46%,540px))',
                boxSizing: 'border-box',
                opacity: sdOpen === 2 ? 1 : 0,
                translate: sdOpen === 2 ? '0 0' : '0 16px',
                transition: 'opacity .45s ease .1s,translate .55s cubic-bezier(.2,.8,.2,1) .05s',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                paddingBottom: '80px',
              }}
            >
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#5E1217',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#8E2027' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Faux procès sur une affaire imaginaire, l’épreuve la plus juridique.
                  </span>
                </li>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#5E1217',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#8E2027' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Rôles d’un vrai procès : juge, avocats, accusation, défense, témoins…
                  </span>
                </li>
                <li
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10px minmax(0,1fr)',
                    gap: '12px',
                    font: '500 16px/1.5 Nunito,sans-serif',
                    color: '#5E1217',
                  }}
                >
                  <span style={{ marginTop: '8px', width: '10px', height: '10px', borderRadius: '50%', background: '#8E2027' }} />
                  <span style={{ textWrap: 'pretty' }}>
                    Toge pour chaque participant, marteau du juge pour ouvrir et rythmer l’audience.
                  </span>
                </li>
              </ul>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '12px' }}>
                <div
                  style={{
                    borderRadius: '18px',
                    padding: '14px 16px',
                    background: 'rgba(142,32,39,.08)',
                    border: '1px solid rgba(142,32,39,.22)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      font: "700 12px 'JetBrains Mono',monospace",
                      letterSpacing: '.08em',
                      color: '#8E2027',
                      textTransform: 'uppercase',
                    }}
                  >
                    Jury
                  </span>
                  <span style={{ font: '800 18px/1.35 Nunito,sans-serif', color: '#5E1217' }}>
                    3 personnes
                  </span>
                </div>
                <div
                  style={{
                    borderRadius: '18px',
                    padding: '14px 16px',
                    background: 'rgba(142,32,39,.08)',
                    border: '1px solid rgba(142,32,39,.22)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      font: "700 12px 'JetBrains Mono',monospace",
                      letterSpacing: '.08em',
                      color: '#8E2027',
                      textTransform: 'uppercase',
                    }}
                  >
                    Tenue
                  </span>
                  <span style={{ font: '800 18px/1.35 Nunito,sans-serif', color: '#5E1217' }}>
                    Toge pour chaque participant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
