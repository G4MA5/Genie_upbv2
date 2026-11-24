import React, { useEffect, useRef } from 'react';

interface JurorSilhouetteProps {
  width: number;
  height: number;
  marginLeft: number;
  marginBottom: number;
  zIndex: number;
  rotateDeg: number;
  questionMarkSize: number;
  questionMarkColor: string;
  delay: number;
}

const JurorSilhouette: React.FC<JurorSilhouetteProps> = ({
  width,
  height,
  marginLeft,
  marginBottom,
  zIndex,
  rotateDeg,
  questionMarkSize,
  questionMarkColor,
  delay,
}) => {
  return (
    <div
      data-jrev={delay}
      style={{
        opacity: 0,
        translate: '0 30px',
        transition: `opacity 0.7s ease ${delay}ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
        position: 'relative',
        flex: 'none',
        width: `${width}px`,
        height: `${height}px`,
        marginLeft: `${marginLeft}px`,
        marginBottom: `${marginBottom}px`,
        zIndex,
        rotate: `${rotateDeg}deg`,
      }}
    >
      {/* Dark Silhouette with 7px solid white sticker contour + deep drop-shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter:
            'drop-shadow(7px 0 0 #F4F4F0) drop-shadow(-7px 0 0 #F4F4F0) drop-shadow(0 7px 0 #F4F4F0) drop-shadow(0 -7px 0 #F4F4F0) drop-shadow(0 20px 26px rgba(2,8,30,.55))',
        }}
      >
        {/* Head */}
        <span
          style={{
            position: 'absolute',
            left: '27%',
            top: 0,
            width: '46%',
            height: '44%',
            borderRadius: '48% 48% 42% 42%',
            background: '#050508',
          }}
        />
        {/* Neck */}
        <span
          style={{
            position: 'absolute',
            left: '40%',
            top: '38%',
            width: '20%',
            height: '14%',
            background: '#050508',
          }}
        />
        {/* Bust */}
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '52%',
            borderRadius: '46% 46% 0 0',
            background: '#050508',
          }}
        />
      </div>

      {/* Mystery Question Mark - EXACT PROTOTYPE POSITIONING */}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '21%',
          translate: '-50% -50%',
          font: `900 ${questionMarkSize}px/1 Nunito, sans-serif`,
          color: questionMarkColor,
          userSelect: 'none',
        }}
      >
        ?
      </span>
    </div>
  );
};

export const InnoJuryCriteres: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const els = Array.from(sec.querySelectorAll<HTMLElement>('[data-jrev]'));

    const chk = () => {
      const vh = window.innerHeight || 800;
      els.forEach((el) => {
        if (el.dataset.on === '1') return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.88) {
          el.dataset.on = '1';
          el.style.opacity = '1';
          el.style.translate = '0 0';
          el.style.strokeDashoffset = '0';
        }
      });
    };

    window.addEventListener('scroll', chk, { passive: true });
    window.addEventListener('resize', chk, { passive: true });
    chk();

    const iv = setInterval(() => {
      chk();
      if (els.every((e) => e.dataset.on === '1')) clearInterval(iv);
    }, 300);

    return () => {
      window.removeEventListener('scroll', chk);
      window.removeEventListener('resize', chk);
      clearInterval(iv);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-jury="1"
      data-screen-label="SI Jury et criteres"
      className="relative bg-[#0A1430] text-white"
    >
      {/* 1. TOP DOME SECTION (RADIAL BLUE GRADIENT + RETRO PAPER TEXTURE + JURORS SILHOUETTES) */}
      <div
        className="relative overflow-hidden pt-[clamp(80px,9vw,120px)] px-[clamp(16px,4vw,56px)] pb-0"
        style={{
          backgroundImage: `url('/images/6ffa14f5-24a4-425d-9885-b8158aab4275.webp'), radial-gradient(ellipse 70% 60% at 50% 58%, #3C8BFF 0%, #1D4FD8 38%, #0A2470 72%, #06123A 100%)`,
          backgroundSize: '160px 160px, 100% 100%',
          backgroundBlendMode: 'overlay, normal',
        }}
      >
        {/* Top-Left Date Stamp */}
        <div
          className="absolute left-[clamp(16px,4vw,56px)] top-[clamp(24px,3vw,40px)] flex flex-col font-black italic text-[clamp(20px,2.4vw,34px)] leading-[0.95] tracking-[-0.01em] uppercase z-[2]"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          <span className="text-white">27–29</span>
          <span className="text-[#F58220]">Janv.</span>
          <span className="text-[#F58220]">2027</span>
        </div>

        {/* Top-Right Category Branding */}
        <div
          className="absolute right-[clamp(16px,4vw,56px)] top-[clamp(24px,3vw,40px)] flex flex-col items-end gap-1 uppercase z-[2]"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          <span className="font-black italic text-[clamp(18px,2vw,28px)] leading-[1.05] text-white whitespace-nowrap">
            Génie UPB
          </span>
          <span className="font-black italic text-[clamp(12px,1.1vw,15px)] leading-[1.2] text-[#F58220] whitespace-nowrap">
            Catégorie Innovation
          </span>
        </div>

        {/* Center Title & Jurors Group */}
        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center gap-3.5">
          {/* Eyebrow Tag */}
          <span
            data-jrev="0"
            className="font-black text-[clamp(18px,1.8vw,24px)] leading-none tracking-[0.02em] text-[#F58220] uppercase"
            style={{
              opacity: 0,
              translate: '0 30px',
              transition:
                'opacity 0.7s ease 0ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0ms',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            L’évaluation
          </span>

          {/* H2 Title with dual gradient lines and tilted angle */}
          <h2
            data-jrev="80"
            className="m-0 flex flex-col items-center font-black text-[clamp(56px,10vw,170px)] leading-[0.82] tracking-[-0.045em] uppercase select-none"
            style={{
              opacity: 0,
              translate: '0 30px',
              transition:
                'opacity 0.7s ease 80ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 80ms',
              rotate: '-4deg',
              transform: 'scaleY(1.12)',
              filter: 'drop-shadow(0 10px 0 rgba(4,12,40,.45))',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            <span
              style={{
                paddingTop: '0.14em',
                marginTop: '-0.14em',
                background: 'linear-gradient(90deg, #DCE9FF, #FFFFFF 45%, #FFC48A)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Ce que
            </span>
            <span
              style={{
                paddingTop: '0.14em',
                marginTop: '-0.14em',
                background: 'linear-gradient(90deg, #FFFFFF, #BFD6FF 50%, #FF9A3D)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              le jury évalue
            </span>
          </h2>

          {/* Subtitle */}
          <span
            data-jrev="140"
            className="mt-3.5 font-black italic text-[clamp(16px,1.6vw,22px)] tracking-[0.04em] uppercase text-white"
            style={{
              opacity: 0,
              translate: '0 30px',
              transition:
                'opacity 0.7s ease 140ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 140ms',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            Un jury de 5 membres
          </span>

          {/* 5 Mystery Jurors Staggered Row - EXACT PROTOTYPE DIMENSIONS & CENTERING */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: 'clamp(16px, 3vw, 32px)',
              marginBottom: '-70px',
              paddingLeft: '40px',
            }}
          >
            {/* Juror 1 (Left) */}
            <JurorSilhouette
              width={200}
              height={250}
              marginLeft={0}
              marginBottom={0}
              zIndex={2}
              rotateDeg={-3}
              questionMarkSize={60}
              questionMarkColor="#ffffff"
              delay={200}
            />

            {/* Juror 2 */}
            <JurorSilhouette
              width={185}
              height={231}
              marginLeft={-70}
              marginBottom={90}
              zIndex={1}
              rotateDeg={2}
              questionMarkSize={56}
              questionMarkColor="#ffffff"
              delay={280}
            />

            {/* Juror 3 (Center - President with Orange ?) */}
            <JurorSilhouette
              width={230}
              height={288}
              marginLeft={-60}
              marginBottom={0}
              zIndex={4}
              rotateDeg={0}
              questionMarkSize={69}
              questionMarkColor="#F58220"
              delay={360}
            />

            {/* Juror 4 */}
            <JurorSilhouette
              width={185}
              height={231}
              marginLeft={-60}
              marginBottom={90}
              zIndex={1}
              rotateDeg={-2}
              questionMarkSize={56}
              questionMarkColor="#ffffff"
              delay={440}
            />

            {/* Juror 5 (Right) */}
            <JurorSilhouette
              width={200}
              height={250}
              marginLeft={-70}
              marginBottom={0}
              zIndex={3}
              rotateDeg={3}
              questionMarkSize={60}
              questionMarkColor="#ffffff"
              delay={520}
            />
          </div>
        </div>
      </div>

      {/* 2. BOTTOM CRITERIA CONTAINER (DARK NAVY GRADIENT + RETRO PAPER TEXTURE) */}
      <div
        style={{
          backgroundImage: `url('/images/6ffa14f5-24a4-425d-9885-b8158aab4275.webp'), linear-gradient(180deg, #06123A, #0A1430)`,
          backgroundSize: '160px 160px, 100% 100%',
          backgroundBlendMode: 'overlay, normal',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-[clamp(16px,4vw,56px)] pt-[clamp(40px,5vw,64px)] pb-[clamp(64px,8vw,100px)] flex flex-col gap-[clamp(40px,5vw,64px)]">
          {/* Juror Composition Text */}
          <p
            data-jrev="100"
            className="m-0 text-center font-extrabold text-[clamp(17px,1.7vw,22px)] leading-[1.5] text-[#C9D6F5] text-balance"
            style={{
              opacity: 0,
              translate: '0 20px',
              transition:
                'opacity 0.7s ease 100ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 100ms',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            <b className="text-[#F58220] font-black">2</b> professionnels des entreprises partenaires ·{' '}
            <b className="text-[#F58220] font-black">1</b> président·e du jury ·{' '}
            <b className="text-[#F58220] font-black">2</b> enseignants ou experts
          </p>

          {/* The 5 Criteria Glassmorphic Card */}
          <div
            className="relative flex flex-col gap-[18px] p-[clamp(20px,3vw,32px)] rounded-[32px] overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <span
              data-jrev="150"
              className="font-black text-[13px] tracking-[0.14em] uppercase text-[#8EA3D6] relative text-center"
              style={{
                opacity: 0,
                translate: '0 20px',
                transition:
                  'opacity 0.7s ease 150ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 150ms',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              Les 5 critères
            </span>

            {/* Grid of 5 Authentic Glass Cards */}
            <div
              className="relative grid gap-3"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 138px), 1fr))',
              }}
            >
              {/* Criterion 1: Innovation */}
              <div
                data-jrev="200"
                className="flex flex-col items-center text-center gap-3.5 p-[22px_14px] rounded-[22px] min-w-0 transition-transform hover:-translate-y-1"
                style={{
                  opacity: 0,
                  translate: '0 20px',
                  transition:
                    'opacity 0.7s ease 200ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 200ms',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px rgba(2, 8, 30, 0.35)',
                  backdropFilter: 'blur(18px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                }}
              >
                <span
                  className="w-[52px] h-[52px] rounded-[16px] grid place-items-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F58220"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                  </svg>
                </span>
                <span
                  className="font-extrabold text-[16px] leading-[1.3] text-[#E4ECFF] text-balance"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Innovation
                </span>
              </div>

              {/* Criterion 2: Faisabilité technique et financière */}
              <div
                data-jrev="290"
                className="flex flex-col items-center text-center gap-3.5 p-[22px_14px] rounded-[22px] min-w-0 transition-transform hover:-translate-y-1"
                style={{
                  opacity: 0,
                  translate: '0 20px',
                  transition:
                    'opacity 0.7s ease 290ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 290ms',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px rgba(2, 8, 30, 0.35)',
                  backdropFilter: 'blur(18px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                }}
              >
                <span
                  className="w-[52px] h-[52px] rounded-[16px] grid place-items-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F58220"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
                  </svg>
                </span>
                <span
                  className="font-extrabold text-[16px] leading-[1.3] text-[#E4ECFF] text-balance"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Faisabilité technique et financière
                </span>
              </div>

              {/* Criterion 3: Impact socio-économique */}
              <div
                data-jrev="380"
                className="flex flex-col items-center text-center gap-3.5 p-[22px_14px] rounded-[22px] min-w-0 transition-transform hover:-translate-y-1"
                style={{
                  opacity: 0,
                  translate: '0 20px',
                  transition:
                    'opacity 0.7s ease 380ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 380ms',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px rgba(2, 8, 30, 0.35)',
                  backdropFilter: 'blur(18px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                }}
              >
                <span
                  className="w-[52px] h-[52px] rounded-[16px] grid place-items-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F58220"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
                  </svg>
                </span>
                <span
                  className="font-extrabold text-[16px] leading-[1.3] text-[#E4ECFF] text-balance"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Impact socio-économique
                </span>
              </div>

              {/* Criterion 4: Clarté de la présentation */}
              <div
                data-jrev="470"
                className="flex flex-col items-center text-center gap-3.5 p-[22px_14px] rounded-[22px] min-w-0 transition-transform hover:-translate-y-1"
                style={{
                  opacity: 0,
                  translate: '0 20px',
                  transition:
                    'opacity 0.7s ease 470ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 470ms',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px rgba(2, 8, 30, 0.35)',
                  backdropFilter: 'blur(18px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                }}
              >
                <span
                  className="w-[52px] h-[52px] rounded-[16px] grid place-items-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F58220"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 4h18" />
                    <path d="M5 4v10h14V4" />
                    <path d="M12 14v4" />
                    <path d="m8 21 4-3 4 3" />
                  </svg>
                </span>
                <span
                  className="font-extrabold text-[16px] leading-[1.3] text-[#E4ECFF] text-balance"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Clarté de la présentation
                </span>
              </div>

              {/* Criterion 5: Viabilité et durabilité */}
              <div
                data-jrev="560"
                className="flex flex-col items-center text-center gap-3.5 p-[22px_14px] rounded-[22px] min-w-0 transition-transform hover:-translate-y-1"
                style={{
                  opacity: 0,
                  translate: '0 20px',
                  transition:
                    'opacity 0.7s ease 560ms, translate 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 560ms',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px rgba(2, 8, 30, 0.35)',
                  backdropFilter: 'blur(18px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                }}
              >
                <span
                  className="w-[52px] h-[52px] rounded-[16px] grid place-items-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F58220"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20a7 7 0 0 1-7-7c0-6 6-10 16-10 0 10-4 17-9 17z" />
                    <path d="M4 21c4-4 7-7 11-11" />
                  </svg>
                </span>
                <span
                  className="font-extrabold text-[16px] leading-[1.3] text-[#E4ECFF] text-balance"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Viabilité et durabilité
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
