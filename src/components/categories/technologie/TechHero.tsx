import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TechHeroBackground from '../TechHeroBackground';

export const TechHero: React.FC = () => {
  const navigate = useNavigate();
  const heroDroneRef = useRef<HTMLImageElement | null>(null);
  const heroDroneMobRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Animation de flottaison du drone Hero (data-si-bot="1" authentique)
    const droneAnim = heroDroneRef.current?.animate(
      [
        { translate: '0 0' },
        { translate: '0 -18px' },
        { translate: '0 0' },
      ],
      {
        duration: 4200,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    const droneMobAnim = heroDroneMobRef.current?.animate(
      [
        { translate: '0 0' },
        { translate: '0 -14px' },
        { translate: '0 0' },
      ],
      {
        duration: 4200,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    return () => {
      droneAnim?.cancel();
      droneMobAnim?.cancel();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0C1E4A] w-full min-h-screen lg:h-screen box-border flex items-center px-5 sm:px-10 lg:px-[72px] pt-[108px] sm:pt-[120px] pb-12 lg:pb-0 select-none">
      {/* Fond Blueprint SVG animé en dérive + Cyber Tetris CRT Matrix */}
      <TechHeroBackground />

      {/* Dégradé vignette bas */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[45%] bg-gradient-to-b from-[rgba(29,79,216,0)] via-[rgba(29,79,216,0.35)] via-60% to-[#1D3E9E] pointer-events-none z-[2]"
      />

      {/* Drone Desktop avec ombre portée, contour blanc (5px), taille agrandie et centrage vertical */}
      <div className="hidden md:block absolute right-[clamp(30px,5vw,110px)] top-1/2 w-[min(48%,560px)] -translate-y-1/2 z-[2] pointer-events-none">
        <img
          ref={heroDroneRef}
          data-si-bot="1"
          src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
          alt="Drone"
          className="block w-full h-auto drop-shadow-drone drone-white-border"
        />
      </div>

      {/* Contenu textuel Hero */}
      <div className="relative w-full max-w-[1240px] mx-auto flex flex-col justify-center z-[3]">
        <div className="relative z-[2] flex flex-col items-start min-w-0 md:-translate-y-6 lg:-translate-y-8">
          <h1 className="m-0 flex flex-col items-start font-black text-[clamp(56px,7.5vw,120px)] leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]">
            <span className="whitespace-nowrap">Qui sera le</span>
            <span className="whitespace-nowrap">génie</span>
            <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-[2deg] [rotate:-2deg] text-[0.78em] origin-left font-black ton-genie-title-desktop hidden md:inline-block">
              technologique
            </span>
            <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-[2deg] [rotate:-2deg] text-[0.78em] origin-left font-black ton-genie-title-mobile inline-block md:hidden">
              technologique
            </span>
          </h1>

          <button
            onClick={() => navigate('/inscription')}
            className="self-start mt-8 sm:mt-10 min-h-[52px] sm:min-h-[58px] lg:min-h-[60px] px-6 sm:px-8 lg:px-8 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg sm:text-xl lg:text-[22px] leading-none flex items-center gap-2.5 sm:gap-3 whitespace-nowrap cursor-pointer shadow-[0_14px_30px_rgba(232,98,26,0.45)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(232,98,26,0.6)] active:scale-95 transition-all"
            style={{
              animation: 'fxBreathe 2.4s ease-in-out infinite alternate',
            }}
          >
            <span>S'inscrire</span>
            <span className="text-xl sm:text-2xl">→</span>
          </button>
        </div>

        {/* Drone Mobile sous le titre avec dimension augmentée et décalage vers le bas */}
        <div className="block md:hidden relative w-full max-w-[340px] sm:max-w-[400px] mt-10 sm:mt-12 mx-auto z-[2] pointer-events-none">
          <img
            ref={heroDroneMobRef}
            data-si-bot="1"
            src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
            alt="Drone"
            className="block w-full h-auto drop-shadow-drone drone-white-border"
          />
        </div>
      </div>
    </section>
  );
};
