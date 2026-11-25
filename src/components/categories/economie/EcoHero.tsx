import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EcoHero — Hero officiel de la Catégorie Économie (is.SE)
 * 100% conforme au prototype scripts/proto_real.html (lignes 908-909) :
 * - Fond vert #1F4A2A avec grille matricielle SVG animée en continu (70s) [data-sd-bg]
 * - Dégradé inférieur vers #12301A
 * - H1 « Qui sera le génie économique ? » avec le mot « économique ? » incliné à -4deg
 *   et paré du double contour sticker officiel (blanc 7px, orange #F58220 13px)
 * - Bouton « S'inscrire → » avec effet data-shine="1" et redirection vers /inscription
 * - Bouton « Découvrir les épreuves » avec scroll fluide vers la section simulation
 * - Illustration authentique Tirelire (0ca0cb24...) inclinée à 2.5deg avec bordure blanche 8px
 */
export const EcoHero: React.FC = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const anim = el.animate(
      [
        { backgroundPosition: '0px 0px' },
        { backgroundPosition: '880px 660px' },
      ],
      {
        duration: 70000,
        iterations: Infinity,
        easing: 'linear',
      }
    );
    return () => {
      anim.cancel();
    };
  }, []);

  const svgDataUri = `data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27768%27%20height%3D%27576%27%3E%3Crect%20width%3D%27768%27%20height%3D%27576%27%20fill%3D%27%231F4A2A%27%2F%3E%3Crect%20x%3D%2796%27%20y%3D%2796%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%2363D06F%27%20fill-opacity%3D%27.55%27%2F%3E%3Crect%20x%3D%27576%27%20y%3D%27288%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%234FB860%27%20fill-opacity%3D%27.55%27%2F%3E%3Crect%20x%3D%27192%27%20y%3D%27384%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%233E8B47%27%20fill-opacity%3D%27.55%27%2F%3E%3Crect%20x%3D%27480%27%20y%3D%27384%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%2363D06F%27%20fill-opacity%3D%27.55%27%2F%3E%3Crect%20x%3D%27-1%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%2795%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27191%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27287%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27383%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27479%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27575%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27671%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%27767%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27-1%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%2795%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27191%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27287%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27383%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27479%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27575%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%232D6339%27%2F%3E%3C%2Fsvg%3E`;

  return (
    <div
      data-sd-bg="1"
      className="relative overflow-hidden bg-[#1F4A2A] box-border pt-[130px] pb-[72px] px-[clamp(20px,5vw,72px)] select-none"
    >
      {/* Grille SVG matricielle animée */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${svgDataUri}')`,
          backgroundSize: '880px 660px',
        }}
      />

      {/* Dégradé atmosphérique inférieur vers #12301A */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[42%] pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,48,26,0) 0%, rgba(18,48,26,0.55) 55%, #12301A 100%)',
        }}
      />

      {/* Contenu Hero en grille responsive */}
      <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,3vw,48px)] items-center z-[2]">
        {/* Colonne gauche : Titre & CTAs */}
        <div className="relative z-[2] flex flex-col gap-[clamp(28px,3vw,40px)] min-w-0 pt-5">
          <h1 className="m-0 flex flex-col items-start font-black text-[clamp(46px,6.2vw,118px)] leading-[0.88] tracking-[-0.02em] text-white drop-shadow-[0_7px_0_rgba(0,20,8,0.45)] font-['Nunito',sans-serif]">
            <span className="whitespace-nowrap">Qui sera le</span>
            <span className="whitespace-nowrap">génie</span>
            <span
              className="mt-[0.26em] whitespace-nowrap inline-block -rotate-4 origin-left text-[#1D4FD8]"
              style={{
                textShadow:
                  '3px 0 0 #fff, -3px 0 0 #fff, 0 3px 0 #fff, 0 -3px 0 #fff, 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 6px 6px 0 #F58220, -6px 6px 0 #F58220, 6px -6px 0 #F58220, -6px -6px 0 #F58220, 0 16px 20px rgba(0,20,8,0.45)',
              }}
            >
              économique&nbsp;?
            </span>
          </h1>

          <div className="flex flex-col gap-[22px] max-w-[460px] mt-[clamp(8px,1.4vw,20px)]">
            <p className="m-0 font-semibold text-[clamp(17px,1.4vw,20px)] leading-[1.5] text-[#E3F3E5] font-['Nunito',sans-serif]">
              Analyse, stratégie et sens des chiffres : montrez que vous savez transformer une crise en opportunité.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                data-go="S8"
                data-shine="1"
                onClick={() => navigate('/inscription')}
                className="min-h-[52px] px-6 rounded-[14px] border-[3px] border-white bg-gradient-to-b from-[#63D06F] to-[#3E9E4C] text-white font-extrabold text-[17px] flex items-center gap-2.5 whitespace-nowrap cursor-pointer shadow-[0_12px_26px_rgba(27,122,62,0.4)] inset-shadow-[0_1px_0_rgba(255,255,255,0.18)] hover:-translate-y-0.5 transition-transform font-['Nunito',sans-serif]"
              >
                <span>S'inscrire</span>
                <span>→</span>
              </button>

              <a
                href="#simulation"
                className="min-h-[52px] px-[22px] rounded-[14px] bg-white/10 border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-[14px] text-white font-extrabold text-[17px] flex items-center whitespace-nowrap cursor-pointer hover:bg-white/15 transition-colors font-['Nunito',sans-serif]"
              >
                Découvrir les épreuves
              </a>
            </div>
          </div>
        </div>

        {/* Colonne droite Desktop : Tirelire authentique */}
        <div className="hidden lg:flex relative min-w-0 pt-6 pb-10 pl-10 justify-end">
          <div className="rotate-[2.5deg] w-[min(100%,480px)]">
            <img
              src="/images/0ca0cb24-f6a7-4ecf-99aa-ee8e059f5ae8.webp"
              alt="Tirelire et graphique"
              className="block w-full h-auto aspect-square object-cover rounded-[22px] border-[8px] border-white box-border shadow-[0_30px_60px_rgba(10,48,20,0.28)]"
            />
          </div>
        </div>

        {/* Version Mobile : Tirelire centrée */}
        <div className="flex lg:hidden justify-center min-w-0 pt-2 px-1">
          <div className="rotate-[2deg] w-[min(100%,360px)]">
            <img
              src="/images/0ca0cb24-f6a7-4ecf-99aa-ee8e059f5ae8.webp"
              alt="Tirelire et graphique"
              className="block w-full h-auto aspect-square object-cover rounded-[22px] border-[8px] border-white box-border shadow-[0_30px_60px_rgba(10,48,20,0.28)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoHero;
