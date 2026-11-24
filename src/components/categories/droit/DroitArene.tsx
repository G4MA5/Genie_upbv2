import React, { useEffect, useRef, useState } from 'react';

function MobileShield({
  num,
  left,
  top,
  delay,
  revealed,
}: {
  num: number;
  left: string;
  top: string;
  delay: number;
  revealed: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: '46px',
        height: '56px',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.55))',
        opacity: revealed ? 1 : 0,
        translate: revealed ? '0 0' : '0 16px',
        transition: `opacity .6s ease ${delay}ms, translate .6s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 62%, 50% 100%, 0 62%)',
          background: '#C9A15A',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '2.5px',
          clipPath: 'polygon(0 0, 100% 0, 100% 62%, 50% 100%, 0 62%)',
          background: 'linear-gradient(180deg, #F3E2C4, #E2C793)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '6px',
          gap: '1px',
        }}
      >
        <span style={{ font: '700 8px/1 Georgia, serif', letterSpacing: '.08em', color: '#7A1A1F' }}>
          ÉQUIPE
        </span>
        <span style={{ font: '900 20px/1 Georgia, serif', color: '#7A1A1F' }}>{num}</span>
      </div>
    </div>
  );
}

function DuelShield({ num }: { num: number }) {
  return (
    <div className="relative w-8 h-9 shrink-0">
      <div
        className="absolute inset-0 bg-[#C9A15A]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 62%, 50% 100%, 0 62%)' }}
      />
      <div
        className="absolute inset-[1.5px] bg-gradient-to-b from-[#F3E2C4] to-[#E2C793] flex flex-col items-center justify-center"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 62%, 50% 100%, 0 62%)' }}
      >
        <span className="font-serif font-black text-xs text-[#7A1A1F]">{num}</span>
      </div>
    </div>
  );
}

export default function DroitArene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'arbre' | 'duels'>('arbre');

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
    backgroundImage: `url("/images/6ffa14f5-24a4-425d-9885-b8158aab4275.webp"), radial-gradient(ellipse 65% 60% at 50% 50%, #7A5634 0%, #4A311D 55%, #24160C 100%)`,
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
              font: '700 clamp(28px,7vw,80px)/.98 Georgia,serif',
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

        {/* Version Desktop (visible sur écran >= 768px / md) */}
        <div className="hidden md:block w-full overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'thin' }}>
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
                src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.webp"
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

        {/* Version Mobile (visible sur mobile < 768px, 100% visible et responsive) */}
        <div className="block md:hidden w-full">
          {/* Sélecteur d'onglets mobile */}
          <div
            style={getRevStyle(200, {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '4px',
              borderRadius: '14px',
              background: 'rgba(20, 12, 6, 0.75)',
              border: '1px solid rgba(201, 161, 90, 0.35)',
              maxWidth: '340px',
              margin: '0 auto 24px',
            })}
          >
            <button
              type="button"
              onClick={() => setMobileTab('arbre')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                font: '700 12px Georgia, serif',
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'all .25s ease',
                background: mobileTab === 'arbre' ? '#C9A15A' : 'transparent',
                color: mobileTab === 'arbre' ? '#24160C' : '#E8CFA4',
                boxShadow: mobileTab === 'arbre' ? '0 4px 12px rgba(0,0,0,.4)' : 'none',
              }}
            >
              Arbre complet
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('duels')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                font: '700 12px Georgia, serif',
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'all .25s ease',
                background: mobileTab === 'duels' ? '#C9A15A' : 'transparent',
                color: mobileTab === 'duels' ? '#24160C' : '#E8CFA4',
                boxShadow: mobileTab === 'duels' ? '0 4px 12px rgba(0,0,0,.4)' : 'none',
              }}
            >
              Confrontations
            </button>
          </div>

          {mobileTab === 'arbre' ? (
            /* Onglet 1 : Arbre visuel complet calibré pour écran mobile (ne coupe rien) */
            <div
              style={getRevStyle(300, {
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '360 / 490',
                margin: '0 auto',
              })}
            >
              {/* Étoiles de fond mobile */}
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ position: 'absolute', left: '34%', top: '22%', translate: '-50% -50%', opacity: 0.55 }}
              >
                <path d="M12 0 13.5 10.5 24 12 13.5 13.5 12 24 10.5 13.5 0 12 10.5 10.5z" fill="#2A1A10" />
              </svg>
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                style={{ position: 'absolute', left: '66%', top: '78%', translate: '-50% -50%', opacity: 0.45 }}
              >
                <path d="M12 0 13.5 10.5 24 12 13.5 13.5 12 24 10.5 13.5 0 12 10.5 10.5z" fill="#2A1A10" />
              </svg>

              {/* Lignes dorées luminescentes mobile */}
              <svg
                aria-hidden="true"
                viewBox="0 0 360 490"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'visible',
                  filter: 'drop-shadow(0 0 3px #FF9A1F) drop-shadow(0 0 10px rgba(255,140,30,.65))',
                }}
              >
                {/* Côté Gauche */}
                <path
                  d="M55 50 H90 V165 H55 M90 108 H125 M55 295 H90 V410 H55 M90 352 H125 M125 108 V352 M125 230 H148"
                  pathLength="1"
                  fill="none"
                  stroke="#FFC266"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={getPathRevStyle(600)}
                />
                {/* Côté Droit */}
                <path
                  d="M305 50 H270 V165 H305 M270 108 H235 M305 295 H270 V410 H305 M270 352 H235 M235 108 V352 M235 230 H212"
                  pathLength="1"
                  fill="none"
                  stroke="#FFC266"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={getPathRevStyle(600)}
                />
              </svg>

              {/* 8 Boucliers Équipes Mobile */}
              <MobileShield num={1} left="9%" top="10.2%" delay={300} revealed={revealed} />
              <MobileShield num={2} left="9%" top="33.7%" delay={390} revealed={revealed} />
              <MobileShield num={3} left="9%" top="60.2%" delay={480} revealed={revealed} />
              <MobileShield num={4} left="9%" top="83.7%" delay={570} revealed={revealed} />

              <MobileShield num={5} left="91%" top="10.2%" delay={300} revealed={revealed} />
              <MobileShield num={6} left="91%" top="33.7%" delay={390} revealed={revealed} />
              <MobileShield num={7} left="91%" top="60.2%" delay={480} revealed={revealed} />
              <MobileShield num={8} left="91%" top="83.7%" delay={570} revealed={revealed} />

              {/* Statue de la Justice Centrale Mobile */}
              <div
                style={getRevStyle(1200, {
                  position: 'absolute',
                  left: '50%',
                  top: '47%',
                  width: '100px',
                  height: '210px',
                  transform: 'translate(-50%, -50%)',
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
                    top: '52%',
                    width: '140px',
                    height: '140px',
                    translate: '-50% -50%',
                    borderRadius: '50%',
                    background: 'radial-gradient(closest-side, rgba(255,178,80,.5), transparent)',
                    pointerEvents: 'none',
                  }}
                />
                <img
                  src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.webp"
                  alt="Statue de la Justice"
                  style={{
                    position: 'relative',
                    display: 'block',
                    height: '140px',
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter:
                      'sepia(.6) saturate(1.6) brightness(1.05) drop-shadow(0 0 8px rgba(255,170,60,.7)) drop-shadow(0 12px 14px rgba(0,0,0,.6))',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    marginTop: '4px',
                    font: '700 9px Georgia, serif',
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    color: '#FFC266',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Génie du droit
                </span>
              </div>

              {/* Niveaux du tournoi au bas Mobile */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 6px',
                }}
              >
                <span style={{ font: '700 8px Georgia, serif', letterSpacing: '.1em', color: '#E8CFA4', textTransform: 'uppercase' }}>
                  Quarts
                </span>
                <span style={{ font: '700 8px Georgia, serif', letterSpacing: '.1em', color: '#E8CFA4', textTransform: 'uppercase' }}>
                  Demis
                </span>
                <span style={{ font: '700 8px Georgia, serif', letterSpacing: '.1em', color: '#FFC266', textTransform: 'uppercase' }}>
                  Finale
                </span>
                <span style={{ font: '700 8px Georgia, serif', letterSpacing: '.1em', color: '#FFC266', textTransform: 'uppercase' }}>
                  Finale
                </span>
                <span style={{ font: '700 8px Georgia, serif', letterSpacing: '.1em', color: '#E8CFA4', textTransform: 'uppercase' }}>
                  Demis
                </span>
                <span style={{ font: '700 8px Georgia, serif', letterSpacing: '.1em', color: '#E8CFA4', textTransform: 'uppercase' }}>
                  Quarts
                </span>
              </div>
            </div>
          ) : (
            /* Onglet 2 : Détail des confrontations par tours pour confort de lecture mobile */
            <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto px-1">
              {/* Quarts de finale */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 my-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A15A]/60 to-transparent" />
                  <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#FFC266]">
                    Quarts de finale (4 Duels)
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A15A]/60 to-transparent" />
                </div>

                {[
                  { q: 1, e1: 1, e2: 2, next: 'Vers Demi-finale A' },
                  { q: 2, e1: 3, e2: 4, next: 'Vers Demi-finale A' },
                  { q: 3, e1: 5, e2: 6, next: 'Vers Demi-finale B' },
                  { q: 4, e1: 7, e2: 8, next: 'Vers Demi-finale B' },
                ].map((duel) => (
                  <div
                    key={duel.q}
                    className="p-3 rounded-xl border border-[#C9A15A]/30 bg-[#24160C]/80 backdrop-blur-sm flex items-center justify-between shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <DuelShield num={duel.e1} />
                      <span className="font-serif font-bold text-sm text-[#E8CFA4]">Équipe {duel.e1}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black font-serif bg-[#C9A15A] text-[#24160C]">
                        VS
                      </span>
                      <span className="text-[9px] text-[#FFC266]/80 font-sans mt-0.5">{duel.next}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-row-reverse">
                      <DuelShield num={duel.e2} />
                      <span className="font-serif font-bold text-sm text-[#E8CFA4]">Équipe {duel.e2}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Demi-finales */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 my-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A15A]/60 to-transparent" />
                  <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#FFC266]">
                    Demi-finales (2 Duels)
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A15A]/60 to-transparent" />
                </div>

                <div className="p-3 rounded-xl border border-[#C9A15A]/30 bg-[#24160C]/80 backdrop-blur-sm flex items-center justify-between shadow-lg">
                  <span className="font-serif text-xs font-bold text-[#E8CFA4]">Vainqueur Q1</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black font-serif bg-[#C9A15A] text-[#24160C]">
                      VS
                    </span>
                    <span className="text-[9px] text-[#FFC266]/80 font-sans mt-0.5">Vers Finale</span>
                  </div>
                  <span className="font-serif text-xs font-bold text-[#E8CFA4]">Vainqueur Q2</span>
                </div>

                <div className="p-3 rounded-xl border border-[#C9A15A]/30 bg-[#24160C]/80 backdrop-blur-sm flex items-center justify-between shadow-lg">
                  <span className="font-serif text-xs font-bold text-[#E8CFA4]">Vainqueur Q3</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black font-serif bg-[#C9A15A] text-[#24160C]">
                      VS
                    </span>
                    <span className="text-[9px] text-[#FFC266]/80 font-sans mt-0.5">Vers Finale</span>
                  </div>
                  <span className="font-serif text-xs font-bold text-[#E8CFA4]">Vainqueur Q4</span>
                </div>
              </div>

              {/* Grande Finale */}
              <div className="mt-2 p-4 rounded-2xl border-2 border-[#FFC266]/60 bg-gradient-to-b from-[#3D2513]/90 to-[#24160C]/90 text-center shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img
                    src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.webp"
                    alt="Trophée"
                    className="w-8 h-12 object-contain filter drop-shadow(0 0 6px #FFC266)"
                  />
                  <div>
                    <h4 className="font-serif font-black text-sm uppercase tracking-widest text-[#FFC266]">
                      Grande Finale
                    </h4>
                    <p className="text-[11px] text-[#E8D5B5]">Couronnement du Génie du Droit 2027</p>
                  </div>
                </div>
                <div className="flex items-center justify-around mt-3 pt-3 border-t border-[#C9A15A]/30">
                  <span className="font-serif font-bold text-xs text-[#E8CFA4]">Finaliste A</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black font-serif bg-[#FFC266] text-[#24160C]">
                    LE DUEL FINAL
                  </span>
                  <span className="font-serif font-bold text-xs text-[#E8CFA4]">Finaliste B</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
