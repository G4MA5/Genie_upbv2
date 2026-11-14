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
    <section className="relative overflow-hidden bg-[#0C1E4A] min-h-[820px] box-border flex items-stretch px-5 sm:px-10 lg:px-[72px] pt-[120px] pb-10">
      {/* Fond Blueprint SVG animé en dérive + Cyber Tetris CRT Matrix */}
      <TechHeroBackground />

      {/* Dégradé vignette bas */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[55%] bg-gradient-to-b from-[rgba(29,79,216,0)] via-[rgba(29,79,216,0.35)] via-60% to-[#1D3E9E] pointer-events-none z-[2]"
      />

      {/* Drone Desktop avec ombre portée, contour blanc (5px) et animation de flottement */}
      <div className="hidden md:block absolute right-[clamp(-60px,-1vw,20px)] top-1/2 w-[min(46%,600px)] -translate-y-[46%] z-[2] pointer-events-none">
        <img
          ref={heroDroneRef}
          data-si-bot="1"
          src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
          alt="Drone"
          className="block w-full h-auto drop-shadow-[5px_0_0_#fff] drop-shadow-[-5px_0_0_#fff] drop-shadow-[0_5px_0_#fff] drop-shadow-[0_-5px_0_#fff] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* Contenu textuel Hero */}
      <div className="relative w-full max-w-[1280px] mx-auto flex flex-col justify-between gap-12 z-[3]">
        <div className="relative z-[2] flex flex-col items-start min-w-0 pt-[clamp(40px,8vw,110px)]">
          <h1 className="m-0 flex flex-col items-start font-black text-[clamp(60px,9vw,150px)] leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]">
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
            className="self-start mt-14 min-h-[60px] px-[30px] rounded-[16px] border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[22px] flex items-center gap-2.5 whitespace-nowrap cursor-pointer shadow-[0_14px_30px_rgba(20,10,80,0.4)] hover:-translate-y-1 transition-transform"
          >
            S'inscrire →
          </button>
        </div>

        {/* Drone Mobile sous le titre avec animation de flottement */}
        <div className="block md:hidden relative w-full max-w-[440px] mt-2 mx-auto z-[2] pointer-events-none">
          <img
            ref={heroDroneMobRef}
            data-si-bot="1"
            src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
            alt="Drone"
            className="block w-full h-auto drop-shadow-[5px_0_0_#fff] drop-shadow-[-5px_0_0_#fff] drop-shadow-[0_5px_0_#fff] drop-shadow-[0_-5px_0_#fff] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </section>
  );
};
