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
    <section className="relative overflow-hidden bg-[#0C1E4A] min-h-[660px] lg:min-h-[740px] box-border flex items-stretch px-5 sm:px-10 lg:px-[72px] pt-[108px] pb-10">
      {/* Fond Blueprint SVG animé en dérive + Cyber Tetris CRT Matrix */}
      <TechHeroBackground />

      {/* Dégradé vignette bas */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[55%] bg-gradient-to-b from-[rgba(29,79,216,0)] via-[rgba(29,79,216,0.35)] via-60% to-[#1D3E9E] pointer-events-none z-[2]"
      />

      {/* Drone Desktop avec ombre portée, contour blanc (4px) et animation de flottement calibré */}
      <div className="hidden md:block absolute right-[clamp(-20px,1vw,40px)] top-1/2 w-[min(42%,460px)] -translate-y-[45%] z-[2] pointer-events-none">
        <img
          ref={heroDroneRef}
          data-si-bot="1"
          src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
          alt="Drone"
          className="block w-full h-auto drop-shadow-[4px_0_0_#fff] drop-shadow-[-4px_0_0_#fff] drop-shadow-[0_4px_0_#fff] drop-shadow-[0_-4px_0_#fff] drop-shadow-[0_24px_34px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* Contenu textuel Hero */}
      <div className="relative w-full max-w-[1240px] mx-auto flex flex-col justify-between gap-8 z-[3]">
        <div className="relative z-[2] flex flex-col items-start min-w-0 pt-[clamp(24px,5vw,72px)]">
          <h1 className="m-0 flex flex-col items-start font-black text-[clamp(42px,5.5vw,96px)] leading-[0.88] tracking-[-0.02em] text-white drop-shadow-[0_6px_0_rgba(5,15,50,0.45)]">
            <span className="whitespace-nowrap">Qui sera le</span>
            <span className="whitespace-nowrap">génie</span>
            <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 text-[0.78em] origin-left font-black ton-genie-title-desktop hidden md:inline-block">
              technologique
            </span>
            <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 text-[0.78em] origin-left font-black ton-genie-title-mobile inline-block md:hidden">
              technologique
            </span>
          </h1>

          <button
            onClick={() => navigate('/inscription')}
            className="self-start mt-8 sm:mt-10 min-h-[52px] sm:min-h-[56px] px-6 sm:px-7 rounded-[14px] border-[3px] border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[18px] sm:text-[20px] flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[0_12px_26px_rgba(20,10,80,0.4)] hover:-translate-y-1 transition-transform active:scale-95"
          >
            S'inscrire →
          </button>
        </div>

        {/* Drone Mobile sous le titre avec dimension proportionnée */}
        <div className="block md:hidden relative w-full max-w-[320px] sm:max-w-[360px] mt-4 mx-auto z-[2] pointer-events-none">
          <img
            ref={heroDroneMobRef}
            data-si-bot="1"
            src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
            alt="Drone"
            className="block w-full h-auto drop-shadow-[4px_0_0_#fff] drop-shadow-[-4px_0_0_#fff] drop-shadow-[0_4px_0_#fff] drop-shadow-[0_-4px_0_#fff] drop-shadow-[0_24px_34px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </section>
  );
};
