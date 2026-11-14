import React, { useEffect, useRef } from 'react';

/**
 * InnoHeroBackground — Grille matricielle géométrique rétro animée et dégradé inférieur
 * Fidèle à 100% au balisage et aux scripts de l'écran SI (Catégorie Innovation) du prototype officiel :
 * - proto_real.html ligne 927 (data-si-bg="1")
 * - proto_real.html ligne 1635 (el.animate([{ backgroundPosition: '0 0' }, { backgroundPosition: '880px 660px' }], { duration: 90000, iterations: Infinity }))
 */
export const InnoHeroBackground: React.FC = () => {
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
        duration: 90000,
        iterations: Infinity,
        easing: 'linear',
      }
    );
    return () => {
      anim.cancel();
    };
  }, []);

  const svgDataUri = `data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27880%27%20height%3D%27660%27%3E%3Crect%20width%3D%27880%27%20height%3D%27660%27%20fill%3D%27%23B400F0%27%2F%3E%3Crect%20x%3D%27110%27%20y%3D%27110%27%20width%3D%27110%27%20height%3D%27110%27%20fill%3D%27%23A000D8%27%2F%3E%3Crect%20x%3D%27660%27%20y%3D%27330%27%20width%3D%27110%27%20height%3D%27110%27%20fill%3D%27%23A800E2%27%2F%3E%3Crect%20x%3D%27220%27%20y%3D%27440%27%20width%3D%27110%27%20height%3D%27110%27%20fill%3D%27%239C00D2%27%2F%3E%3Crect%20x%3D%27550%27%20y%3D%27440%27%20width%3D%27110%27%20height%3D%27110%27%20fill%3D%27%23A000D8%27%2F%3E%3Cg%20fill%3D%27%23D766FF%27%3E%3Crect%20x%3D%27-1%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27109%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27219%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27329%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27439%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27549%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27659%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27769%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20x%3D%27879%27%20width%3D%272%27%20height%3D%27660%27%2F%3E%3Crect%20y%3D%27-1%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3Crect%20y%3D%27109%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3Crect%20y%3D%27219%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3Crect%20y%3D%27329%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3Crect%20y%3D%27439%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3Crect%20y%3D%27549%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3Crect%20y%3D%27659%27%20width%3D%27880%27%20height%3D%272%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E`;

  return (
    <>
      {/* Grille SVG matricielle animée */}
      <div
        ref={bgRef}
        data-si-bg="1"
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${svgDataUri}')`,
          backgroundSize: '880px 660px',
          willChange: 'background-position',
        }}
      />

      {/* Dégradé inférieur vers #8E3A7A */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[55%] pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(180deg, rgba(142,58,122,0) 0%, rgba(142,58,122,0.6) 60%, #8E3A7A 100%)',
        }}
      />
    </>
  );
};

export default InnoHeroBackground;
