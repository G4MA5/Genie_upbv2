import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InnoHeroBackground } from './InnoHeroBackground';

/**
 * InnoHero — Hero officiel de la Catégorie Innovation (is.SI)
 * Calibré à 100% sur le prototype source scripts/proto_real.html (ligne 927) :
 * - Titre géant H1 « Qui sera le génie de l'innovation »
 * - Ligne inclinée « l'innovation » à -4deg avec double contour emblématique
 * - Ampoule dans la main 3D avec étoile géométrique polygonale d'arrière-plan et contour blanc
 * - Bouton CTA standardisé Accueil « S'inscrire → »
 */
export const InnoHero: React.FC = () => {
  const navigate = useNavigate();
  const bulbDesktopRef = useRef<HTMLDivElement | null>(null);
  const bulbMobileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Micro-animation de flottaison subtile sur l'ampoule
    const animDesk = bulbDesktopRef.current?.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-14px)' },
      ],
      {
        duration: 4000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
      }
    );

    const animMob = bulbMobileRef.current?.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-10px)' },
      ],
      {
        duration: 4000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
      }
    );

    return () => {
      animDesk?.cancel();
      animMob?.cancel();
    };
  }, []);

  return (
    <section
      data-screen-label="Catégorie Innovation - Hero"
      className="relative overflow-hidden bg-[#B400F0] w-full min-h-screen lg:h-screen box-border flex items-center px-5 sm:px-10 lg:px-[72px] pt-[108px] sm:pt-[120px] pb-12 lg:pb-0 select-none"
    >
      {/* Fond matriciel géométrique SVG et dégradé inférieur */}
      <InnoHeroBackground />

      {/* Illustration Desktop (Étoile polygonale + Main tenant l'ampoule allumée) */}
      <div
        ref={bulbDesktopRef}
        className="hidden md:block absolute right-[clamp(-20px,3vw,80px)] bottom-0 w-[min(46%,600px)] aspect-[546/598] z-[1] pointer-events-none"
      >
        {/* Étoile géométrique polygonale */}
        <div className="absolute left-[52%] top-[28%] w-[115%] aspect-square -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] drop-shadow-[0_18px_24px_rgba(60,0,80,0.3)]">
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                'polygon(50% 0%, 58.4% 29.7%, 81.1% 18.9%, 70.3% 41.6%, 98% 50%, 70.3% 58.4%, 79.7% 79.7%, 58.4% 70.3%, 50% 100%, 41.6% 70.3%, 17.5% 82.5%, 29.7% 58.4%, 6% 50%, 29.7% 41.6%, 15.4% 15.4%, 41.6% 29.7%)',
              backgroundColor: '#F3F2EF',
              backgroundImage: `url('/images/6ffa14f5-24a4-425d-9885-b8158aab4275.png'), radial-gradient(60% 40% at 30% 35%, rgba(0,0,0,0.06), transparent 70%), radial-gradient(50% 35% at 70% 65%, rgba(0,0,0,0.07), transparent 70%), linear-gradient(115deg, transparent 48%, rgba(0,0,0,0.05) 50%, transparent 52%), linear-gradient(rgba(60,60,70,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(60,60,70,0.16) 1px, transparent 1px)`,
              backgroundSize: '140px 140px, 100% 100%, 100% 100%, 100% 100%, 18px 18px, 18px 18px',
              backgroundBlendMode: 'multiply',
            }}
          />
        </div>

        {/* Main avec ampoule allumée et contour sticker blanc */}
        <img
          src="/images/6d19b41b-839b-4ff2-9c71-73696990215c.png"
          alt="Une main tient une ampoule allumée"
          className="absolute inset-0 w-full h-full object-contain object-right-bottom inno-bulb-border"
        />
      </div>

      {/* Contenu principal : Titre & Bouton CTA */}
      <div className="relative w-full max-w-[1280px] mx-auto flex flex-col justify-center z-[3]">
        <div className="relative z-[2] flex flex-col items-start min-w-0 md:-translate-y-6 lg:-translate-y-8">
          <h1
            className="m-0 flex flex-col items-start font-black text-[clamp(56px,7.5vw,120px)] leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span className="whitespace-nowrap">Qui sera le</span>
            <span className="whitespace-nowrap">génie de</span>
            <span
              className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 [rotate:-4deg] text-[0.78em] origin-left font-black ton-genie-title-desktop hidden md:inline-block"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              l'innovation
            </span>
            <span
              className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 [rotate:-4deg] text-[0.78em] origin-left font-black ton-genie-title-mobile inline-block md:hidden"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              l'innovation
            </span>
          </h1>

          <button
            onClick={() => navigate('/inscription')}
            className="self-start mt-8 sm:mt-10 min-h-[52px] sm:min-h-[58px] lg:min-h-[60px] px-6 sm:px-8 lg:px-8 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg sm:text-xl lg:text-[22px] leading-none flex items-center gap-2.5 sm:gap-3 whitespace-nowrap cursor-pointer shadow-[0_14px_30px_rgba(20,10,80,0.4)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,10,80,0.6)] active:scale-95 transition-all"
            style={{
              animation: 'fxBreathe 2.4s ease-in-out infinite alternate',
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            <span>S'inscrire</span>
            <span className="text-xl sm:text-2xl">→</span>
          </button>
        </div>

        {/* Illustration Mobile (Placée sous le bouton CTA dans le flux) */}
        <div
          ref={bulbMobileRef}
          className="block md:hidden relative w-[min(100%,340px)] aspect-[546/598] mx-auto mt-8 -mb-4 z-[1] pointer-events-none"
        >
          <div className="absolute left-[52%] top-[28%] w-[115%] aspect-square -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] drop-shadow-[0_18px_24px_rgba(60,0,80,0.3)]">
            <div
              className="absolute inset-0"
              style={{
                clipPath:
                  'polygon(50% 0%, 58.4% 29.7%, 81.1% 18.9%, 70.3% 41.6%, 98% 50%, 70.3% 58.4%, 79.7% 79.7%, 58.4% 70.3%, 50% 100%, 41.6% 70.3%, 17.5% 82.5%, 29.7% 58.4%, 6% 50%, 29.7% 41.6%, 15.4% 15.4%, 41.6% 29.7%)',
                backgroundColor: '#F3F2EF',
                backgroundImage: `url('/images/6ffa14f5-24a4-425d-9885-b8158aab4275.png'), radial-gradient(60% 40% at 30% 35%, rgba(0,0,0,0.06), transparent 70%), radial-gradient(50% 35% at 70% 65%, rgba(0,0,0,0.07), transparent 70%), linear-gradient(115deg, transparent 48%, rgba(0,0,0,0.05) 50%, transparent 52%), linear-gradient(rgba(60,60,70,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(60,60,70,0.16) 1px, transparent 1px)`,
                backgroundSize: '140px 140px, 100% 100%, 100% 100%, 100% 100%, 18px 18px, 18px 18px',
                backgroundBlendMode: 'multiply',
              }}
            />
          </div>

          <img
            src="/images/6d19b41b-839b-4ff2-9c71-73696990215c.png"
            alt="Une main tient une ampoule allumée"
            className="absolute inset-0 w-full h-full object-contain object-right-bottom inno-bulb-border"
          />
        </div>
      </div>
    </section>
  );
};

export default InnoHero;
