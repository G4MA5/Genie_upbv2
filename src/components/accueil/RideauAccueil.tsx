import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface RideauAccueilProps {
  isOpen: boolean;
  onOpenSite: () => void;
}

export const RideauAccueil: React.FC<RideauAccueilProps> = ({ isOpen, onOpenSite }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallaxe interactive fluide liée aux mouvements du curseur (comme dans le prototype)
  useEffect(() => {
    if (!isOpen) return;

    const cu = containerRef.current;
    if (!cu) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rafId: number;

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;

      const parElements = cu.querySelectorAll<HTMLElement>('[data-par]');
      parElements.forEach((el) => {
        const factor = Number(el.dataset.par || 1) * 14;
        el.style.transform = `translate3d(${cx * factor}px, ${cy * factor}px, 0)`;
      });

      rafId = requestAnimationFrame(loop);
    };

    loop();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = cu.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };

    // Détection de la molette de souris (scroll wheel)
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        onOpenSite();
      }
    };

    // Détection du swipe tactile vers le haut sur mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      if (touchStartY - touchEndY > 50) {
        onOpenSite();
      }
    };

    cu.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      cu.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen, onOpenSite]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center select-none bg-[#4A93FF]"
          style={{
            backgroundImage: `
              linear-gradient(118deg, rgba(255, 255, 255, 0) 18%, rgba(255, 255, 255, 0.22) 34%, rgba(255, 255, 255, 0) 50%),
              linear-gradient(118deg, rgba(255, 255, 255, 0) 58%, rgba(255, 255, 255, 0.16) 70%, rgba(255, 255, 255, 0) 82%),
              radial-gradient(circle, rgba(18, 64, 158, 0.32) 2.5px, transparent 3px),
              linear-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px),
              linear-gradient(160deg, #6AA8FF, #2F74F0)
            `,
            backgroundSize: '100% 100%, 100% 100%, 84px 84px, 84px 84px, 84px 84px, 100% 100%',
            animation: 'curtainGridDrift 9s linear infinite',
          }}
        >
          {/* === 1. RAYONS LUMINEUX / REFLETS DE VERRE (GLASS EFFECT SWEEP) === */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            {/* Faisceau 1 - Grand rayon diagonal */}
            <div
              className="absolute -top-1/2 -left-[60%] w-[70%] h-[200%] rotate-[22deg] pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28) 40%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0))',
                animation: 'glassSweep 7s cubic-bezier(0.45, 0, 0.25, 1) infinite',
              }}
            />
            {/* Faisceau 2 - Rayon secondaire décalé */}
            <div
              className="absolute -top-1/2 -left-[60%] w-[30%] h-[200%] rotate-[22deg] pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.22), rgba(255,255,255,0))',
                animation: 'glassSweep 5.2s cubic-bezier(0.45, 0, 0.25, 1) 1.6s infinite',
              }}
            />
          </div>

          {/* === 2. ÉTOILES ET ÉLÉMENTS GÉOMÉTRIQUES EN ARRIÈRE-PLAN (DATA-FX TWINKLE & FLOAT) === */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[2]">
            {/* Étoile 1 : Haut gauche (Bleu foncé UPB) */}
            <svg
              width="54"
              height="54"
              viewBox="0 0 24 24"
              className="absolute left-[9%] top-[16%] pointer-events-none"
              style={{
                animation: 'fxTwinkle 2.2s ease-in-out infinite alternate',
              }}
            >
              <path
                d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0z"
                fill="#12409E"
              />
            </svg>

            {/* Étoile 2 : Bas droite (Grande étoile Bleu foncé) */}
            <svg
              width="68"
              height="68"
              viewBox="0 0 24 24"
              className="absolute left-[84%] top-[70%] pointer-events-none"
              style={{
                animation: 'fxTwinkle 2.6s ease-in-out 0.5s infinite alternate',
              }}
            >
              <path
                d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0z"
                fill="#12409E"
              />
            </svg>

            {/* Étoile 3 : Bas droite (Petite étoile satellite) */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="absolute left-[80%] top-[76%] pointer-events-none"
              style={{
                animation: 'fxTwinkle 1.8s ease-in-out 0.9s infinite alternate',
              }}
            >
              <path
                d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0z"
                fill="#12409E"
              />
            </svg>

            {/* Étoile 4 : Haut droite (Étoile Orange UPB) */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              className="absolute left-[62%] top-[18%] pointer-events-none"
              style={{
                animation: 'fxTwinkle 2s ease-in-out 0.2s infinite alternate',
              }}
            >
              <path
                d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0z"
                fill="#F58220"
              />
            </svg>

            {/* Icône filaire Blueprint : Un seul globe en flottaison avec parallaxe */}
            <svg
              data-par="2"
              viewBox="0 0 40 40"
              className="absolute left-[48%] sm:left-[49%] top-[14%] w-[clamp(42px,4.5vw,72px)] h-auto pointer-events-none"
              fill="none"
              stroke="#12409E"
              strokeWidth="2"
              style={{
                animation: 'fxFloat 3.2s ease-in-out infinite alternate',
              }}
            >
              <circle cx="20" cy="20" r="16" />
              <ellipse cx="20" cy="20" rx="7" ry="16" />
              <path d="M4 20h32M7 11h26M7 29h26" />
            </svg>
          </div>

          {/* === 3. BLOC CENTRAL DU TITRE AVEC PARALLAXE (DATA-PAR=1) === */}
          <div
            data-par="1"
            className="relative flex flex-col items-center text-center px-4 w-full max-w-7xl z-10 -mt-6 sm:-mt-12 lg:-mt-16 pointer-events-none"
          >
            {/* "Welcome" avec contour vectoriel blanc généreux et net (sans bavure) et ombre portée */}
            <motion.span
              initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.9, 0.25, 1] }}
              className="font-black text-[#1D4FD8] text-[64px] sm:text-[110px] md:text-[145px] lg:text-[170px] xl:text-[195px] leading-none tracking-tight block pointer-events-auto mb-1 sm:mb-2 lg:mb-3"
              style={{
                paintOrder: 'stroke fill',
                WebkitTextStroke: '13px #fff',
                filter: 'drop-shadow(0 18px 28px rgba(5, 15, 50, 0.35))',
                animation: 'fxRiseIdle 2.6s ease-in-out 1.2s infinite',
              }}
            >
              Welcome
            </motion.span>

            {/* "to Génie UPB" avec encadrement technique complet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.3, 1.4, 0.5, 1] }}
              className="relative mt-1 sm:mt-2 pointer-events-auto"
              style={{
                animation: 'fxPopIdle 3.2s ease-in-out 1.5s infinite',
              }}
            >
              {/* Texte géant blanc */}
              <h1 className="font-black text-white text-[56px] sm:text-[96px] md:text-[140px] lg:text-[175px] xl:text-[205px] 2xl:text-[225px] leading-[0.95] tracking-tight drop-shadow-[0_16px_32px_rgba(5,15,50,0.35)] flex items-center justify-center gap-3 sm:gap-6 lg:gap-8">
                <span className="relative inline-block pr-1 sm:pr-2 lg:pr-3">
                  {/* Encadrement technique englobant tout "to Génie" */}
                  <span
                    aria-hidden="true"
                    className="hidden sm:block absolute -left-4 sm:-left-6 lg:-left-8 -top-2 sm:-top-3.5 lg:-top-5 -right-2 sm:-right-4 lg:-right-6 -bottom-2 sm:-bottom-3 lg:-bottom-4 border-[2.5px] lg:border-[3.5px] border-[#12409E] pointer-events-none"
                  >
                    <span className="absolute -left-2 sm:-left-2.5 lg:-left-3 -top-2 sm:-top-2.5 lg:-top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#12409E]" />
                    <span className="absolute -right-2 sm:-right-2.5 lg:-right-3 -top-2 sm:-top-2.5 lg:-top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#12409E]" />
                    <span className="absolute -left-2 sm:-left-2.5 lg:-left-3 -bottom-2 sm:-bottom-2.5 lg:-bottom-3 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#12409E]" />
                    <span className="absolute -right-2 sm:-right-2.5 lg:-right-3 -bottom-2 sm:-bottom-2.5 lg:-bottom-3 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#12409E]" />
                  </span>

                  {/* Petite flèche curseur décorative dans le coin */}
                  <svg
                    aria-hidden="true"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    className="hidden sm:block absolute -left-2 -top-1 lg:-left-3 lg:-top-2 w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 pointer-events-none z-10"
                  >
                    <path d="M3 2l18 8-8 2.5L10 21z" fill="#12409E" />
                  </svg>

                  to Génie
                </span>

                <span className="relative inline-block">
                  UPB
                </span>
              </h1>

              {/* Pastille circulaire avec étoile à droite */}
              <div
                aria-hidden="true"
                className="hidden lg:flex absolute -right-28 xl:-right-36 top-1/2 -translate-y-1/2 w-24 h-24 xl:w-28 xl:h-28 rounded-full border-[3px] border-[#12409E] items-center justify-center bg-white/10 backdrop-blur-sm pointer-events-none"
              >
                <svg
                  className="w-12 h-12 xl:w-14 xl:h-14"
                  viewBox="0 0 24 24"
                  style={{
                    animation: 'fxTwinkle 2.4s ease-in-out infinite alternate',
                  }}
                >
                  <path
                    d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0z"
                    fill="#F58220"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Date & Université */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 sm:mt-8 lg:mt-10 font-extrabold text-sm sm:text-lg md:text-2xl lg:text-[26px] text-white drop-shadow-[0_3px_12px_rgba(10,36,112,0.4)]"
            >
              « 27 – 29 janvier 2027 · Université Polytechnique »
            </motion.p>

            {/* === BOUTON PARCOURIR (JUSTE EN BAS DE LA DATE) === */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 sm:mt-8 lg:mt-10 pointer-events-auto z-20"
            >
              <button
                onClick={onOpenSite}
                className="min-h-[56px] sm:min-h-[62px] lg:min-h-[70px] px-8 sm:px-12 lg:px-14 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg sm:text-xl lg:text-2xl flex items-center gap-3 lg:gap-4 active:scale-95 transition-transform cursor-pointer group shadow-[0_16px_36px_rgba(232,98,26,0.5)]"
                style={{
                  animation: 'fxBreathe 1.4s ease-in-out infinite alternate',
                }}
              >
                <span>Parcourir</span>
                <span className="text-xl lg:text-2xl group-hover:translate-y-1 transition-transform">↓</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
