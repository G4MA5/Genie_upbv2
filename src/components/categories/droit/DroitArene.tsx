import React, { useEffect, useRef, useState } from 'react';

export default function DroitArene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || revealed) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (rect.top < vh * 0.88) {
        setRevealed(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Vérification initiale
    handleScroll();
    const timer = setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [revealed]);

  const getRevStyle = (delayMs: number, extraStyle: React.CSSProperties = {}): React.CSSProperties => {
    return {
      opacity: revealed ? 1 : 0,
      translate: revealed ? '0 0' : '0 24px',
      transition: `opacity .8s ease ${delayMs}ms, translate .8s cubic-bezier(.2,.8,.2,1) ${delayMs}ms`,
      ...extraStyle,
    };
  };

  const getPathRevStyle = (delayMs: number): React.CSSProperties => {
    return {
      opacity: revealed ? 1 : 0,
      strokeDasharray: 1,
      strokeDashoffset: revealed ? 0 : 1,
      transition: `opacity .4s ease ${delayMs}ms, stroke-dashoffset 1.8s cubic-bezier(.5,0,.2,1) ${delayMs}ms`,
    };
  };

  const bgStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url("/images/6ffa14f5-24a4-425d-9885-b8158aab4275.png"), radial-gradient(ellipse 65% 60% at 50% 50%, #7A5634 0%, #4A311D 55%, #24160C 100%)`,
    backgroundSize: '160px 160px, auto',
    backgroundPosition: '0 0, 50% 50%',
    backgroundBlendMode: 'overlay, normal',
    padding: 'clamp(72px,9vw,120px) clamp(16px,4vw,56px)',
  };

  return (
    <section ref={sectionRef} data-jury="1" style={bgStyle}>
      {/* Ombre portée interne sur le pourtour */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 160px rgba(0,0,0,.65)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(28px,4vw,48px)',
        }}
      >
        {/* Titre & Entête */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
            maxWidth: '760px',
          }}
        >
          <span
            data-jrev="0"
            style={getRevStyle(0, {
              font: '700 clamp(14px,1.3vw,17px) Georgia,serif',
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#FFC266',
            })}
          >
            L’arène des idées
          </span>

          <h2
            data-jrev="80"
            style={getRevStyle(80, {
              margin: 0,
              font: '700 clamp(40px,5.6vw,80px)/.95 Georgia,serif',
              letterSpacing: '.01em',
              textTransform: 'uppercase',
              color: '#E8CFA4',
              textShadow: '0 2px 0 #24160C, 0 -1px 0 rgba(255,230,180,.25)',
              textWrap: 'balance',
            })}
          >
            Éliminatoires 2027
          </h2>

          <p
            data-jrev="160"
            style={getRevStyle(160, {
              margin: 0,
              font: '600 clamp(16px,1.5vw,19px)/1.5 Nunito,sans-serif',
              color: '#E8D5B5',
              textWrap: 'pretty',
            })}
          >
            8 équipes entrent dans l’arène. Quarts, demi-finales, finale : à chaque duel, une seule équipe avance vers la statue.
          </p>
        </div>

        {/* Tableau du tournoi avec scroll horizontal si nécessaire */}
        <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'thin' }}>
          <div style={{ position: 'relative', minWidth: '720px', height: '560px', marginBottom: '28px' }}>
            {/* 4 Étoiles dorées de fond */}
            <svg
              aria-hidden="true"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              style={{ position: 'absolute', left: '36%', top: '22%', translate: '-50% -50%', opacity: 0.55 }}
            >
              <path d="M12 0 13.5 10.5 24 12 13.5 13.5 12 24 10.5 13.5 0 12 10.5 10.5z" fill="#2A1A10" />
            </svg>
            <svg
              aria-hidden="true"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              style={{ position: 'absolute', left: '64%', top: '78%', translate: '-50% -50%', opacity: 0.45 }}
            >
              <path d="M12 0 13.5 10.5 24 12 13.5 13.5 12 24 10.5 13.5 0 12 10.5 10.5z" fill="#2A1A10" />
            </svg>
            <svg
              aria-hidden="true"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              style={{ position: 'absolute', left: '70%', top: '30%', translate: '-50% -50%', opacity: 0.4 }}
            >
              <path d="M12 0 13.5 10.5 24 12 13.5 13.5 12 24 10.5 13.5 0 12 10.5 10.5z" fill="#2A1A10" />
            </svg>
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              style={{ position: 'absolute', left: '28%', top: '74%', translate: '-50% -50%', opacity: 0.4 }}
            >
              <path d="M12 0 13.5 10.5 24 12 13.5 13.5 12 24 10.5 13.5 0 12 10.5 10.5z" fill="#2A1A10" />
            </svg>

            {/* Arbre SVG Brackets Luminescents */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                filter: 'drop-shadow(0 0 4px #FF9A1F) drop-shadow(0 0 14px rgba(255,140,30,.65))',
              }}
            >
              {/* Côté Gauche */}
              <path
                d="M110 70H200V200H110M200 135H300M110 360H200V490H110M200 425H300M300 135V425M300 280H410"
                pathLength="1"
                fill="none"
                stroke="#FFC266"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={getPathRevStyle(600)}
              />
              {/* Côté Droit */}
              <path
                d="M890 70H800V200H890M800 135H700M890 360H800V490H890M800 425H700M700 135V425M700 280H590"
                pathLength="1"
                fill="none"
                stroke="#FFC266"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={getPathRevStyle(600)}
              />
            </svg>

            {/* 8 Boucliers Équipes */}
            {/* ÉQUIPE 1 */}
            <div
              style={getRevStyle(300, {
                position: 'absolute',
                left: '6%',
                top: '12.5%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>1</span>
              </div>
            </div>

            {/* ÉQUIPE 2 */}
            <div
              style={getRevStyle(390, {
                position: 'absolute',
                left: '6%',
                top: '35.714285714285715%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>2</span>
              </div>
            </div>

            {/* ÉQUIPE 3 */}
            <div
              style={getRevStyle(480, {
                position: 'absolute',
                left: '6%',
                top: '64.28571428571429%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>3</span>
              </div>
            </div>

            {/* ÉQUIPE 4 */}
            <div
              style={getRevStyle(570, {
                position: 'absolute',
                left: '6%',
                top: '87.5%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>4</span>
              </div>
            </div>

            {/* ÉQUIPE 5 */}
            <div
              style={getRevStyle(300, {
                position: 'absolute',
                left: '94%',
                top: '12.5%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>5</span>
              </div>
            </div>

            {/* ÉQUIPE 6 */}
            <div
              style={getRevStyle(390, {
                position: 'absolute',
                left: '94%',
                top: '35.714285714285715%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>6</span>
              </div>
            </div>

            {/* ÉQUIPE 7 */}
            <div
              style={getRevStyle(480, {
                position: 'absolute',
                left: '94%',
                top: '64.28571428571429%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>7</span>
              </div>
            </div>

            {/* ÉQUIPE 8 */}
            <div
              style={getRevStyle(570, {
                position: 'absolute',
                left: '94%',
                top: '87.5%',
                width: '92px',
                height: '108px',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.5))',
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: '#C9A15A',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '4px',
                  clipPath: 'polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)',
                  background: 'linear-gradient(180deg,#F3E2C4,#E2C793)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '14px',
                  gap: '2px',
                }}
              >
                <span style={{ font: '700 11px Georgia,serif', letterSpacing: '.14em', color: '#7A1A1F' }}>
                  ÉQUIPE
                </span>
                <span style={{ font: '900 38px/1 Georgia,serif', color: '#7A1A1F' }}>8</span>
              </div>
            </div>

            {/* Statue de la Justice Centrale Trophée */}
            <div
              style={getRevStyle(1600, {
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 'min(22%,220px)',
                height: '88%',
                transform: 'translate(-50%,-50%)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              {/* Aura dorée radiale */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '55%',
                  width: '240px',
                  height: '240px',
                  translate: '-50% -50%',
                  borderRadius: '50%',
                  background: 'radial-gradient(closest-side,rgba(255,178,80,.55),transparent)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.png"
                alt="Statue de la Justice, trophée du tournoi"
                style={{
                  position: 'relative',
                  display: 'block',
                  height: '86%',
                  width: 'auto',
                  maxWidth: '180%',
                  objectFit: 'contain',
                  filter:
                    'sepia(.6) saturate(1.6) brightness(1.05) drop-shadow(0 0 10px rgba(255,170,60,.7)) drop-shadow(0 18px 20px rgba(0,0,0,.6))',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  marginTop: '-6px',
                  font: '700 13px Georgia,serif',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: '#FFC266',
                  whiteSpace: 'nowrap',
                }}
              >
                Génie du droit
              </span>
            </div>

            {/* Niveaux du tournoi au bas */}
            <span
              style={getRevStyle(500, {
                position: 'absolute',
                left: '6%',
                bottom: '-6px',
                transform: 'translateX(-50%)',
                font: '700 13px Georgia,serif',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#E8CFA4',
                whiteSpace: 'nowrap',
              })}
            >
              Quarts
            </span>
            <span
              style={getRevStyle(700, {
                position: 'absolute',
                left: '25%',
                bottom: '-6px',
                transform: 'translateX(-50%)',
                font: '700 13px Georgia,serif',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#E8CFA4',
                whiteSpace: 'nowrap',
              })}
            >
              Demi-finales
            </span>
            <span
              style={getRevStyle(900, {
                position: 'absolute',
                left: '39%',
                bottom: '-6px',
                transform: 'translateX(-50%)',
                font: '700 13px Georgia,serif',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#E8CFA4',
                whiteSpace: 'nowrap',
              })}
            >
              Finale
            </span>
            <span
              style={getRevStyle(900, {
                position: 'absolute',
                left: '61%',
                bottom: '-6px',
                transform: 'translateX(-50%)',
                font: '700 13px Georgia,serif',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#E8CFA4',
                whiteSpace: 'nowrap',
              })}
            >
              Finale
            </span>
            <span
              style={getRevStyle(700, {
                position: 'absolute',
                left: '75%',
                bottom: '-6px',
                transform: 'translateX(-50%)',
                font: '700 13px Georgia,serif',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#E8CFA4',
                whiteSpace: 'nowrap',
              })}
            >
              Demi-finales
            </span>
            <span
              style={getRevStyle(500, {
                position: 'absolute',
                left: '94%',
                bottom: '-6px',
                transform: 'translateX(-50%)',
                font: '700 13px Georgia,serif',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#E8CFA4',
                whiteSpace: 'nowrap',
              })}
            >
              Quarts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
