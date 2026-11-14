import React, { useEffect, useRef } from 'react';
import { TECH_PIXEL_TRANSITION } from '../../../assets/techPixelTransition';

export const TechDeroule: React.FC = () => {
  const droneDerouleRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Animation de flottaison officielle data-fx="float"
    const anim = droneDerouleRef.current?.animate(
      [
        { transform: 'translateY(-8px) rotate(-1.5deg)' },
        { transform: 'translateY(8px) rotate(1.5deg)' },
      ],
      {
        duration: 3000,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    return () => anim?.cancel();
  }, []);

  return (
    <section
      data-screen-label="Technologie déroulé"
      className="relative overflow-hidden bg-[#E3E5EA]"
    >
      {/* 1. Bloc haut bleu avec Titre et Drone qui chevauche la transition */}
      <div className="relative bg-[#0B3FD9] px-[clamp(20px,5vw,72px)] pt-[clamp(72px,9vw,120px)] pb-[clamp(40px,5vw,72px)] text-center">
        <span
          className="block font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF] mb-[clamp(20px,3vw,36px)]"
          style={{ fontFamily: "'Silkscreen', monospace" }}
        >
          [ DÉROULÉ ]
        </span>
        <h2
          className="relative z-[1] m-0 font-silkscreen font-normal text-[clamp(48px,10.5vw,170px)] leading-[0.92] tracking-[-0.02em] text-[#E3E5EA] uppercase"
          style={{ fontFamily: "'Silkscreen', monospace" }}
        >
          Construire<br />puis prouver
        </h2>
        <img
          ref={droneDerouleRef}
          data-fx="float"
          src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
          alt=""
          aria-hidden="true"
          className="relative z-[2] block w-[min(56%,460px)] h-auto mx-auto mt-[clamp(-120px,-9vw,-40px)] drop-shadow-[0_30px_30px_rgba(0,10,60,0.45)]"
        />
      </div>

      {/* 2. Transition pixel art / dithering SVG authentique du prototype */}
      <div
        aria-hidden="true"
        className="h-[320px] bg-repeat-x bg-[length:1200px_320px] -mt-[1px]"
        style={{ backgroundImage: `url("${TECH_PIXEL_TRANSITION}")` }}
      />

      {/* 3. Conteneur principal (flex-col-reverse pour afficher le titre 3+1 JOURS en haut) */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,72px)] pt-[clamp(24px,4vw,56px)] flex flex-col-reverse gap-[clamp(40px,5vw,64px)]">
        {/* Grille des 4 jours (2 colonnes sur mobile, 4 colonnes sur desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(24px,3vw,40px)]">
          {/* Jour 01 */}
          <div className="flex flex-col gap-3 min-w-0">
            <span
              className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              01
            </span>
            <span
              className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Montage
            </span>
            <span
              className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256] [text-wrap:pretty]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Assemblage du drone et de ses capteurs.
            </span>
          </div>

          {/* Jour 02 */}
          <div className="flex flex-col gap-3 min-w-0">
            <span
              className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              02
            </span>
            <span
              className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Intégration
            </span>
            <span
              className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256] [text-wrap:pretty]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Mise en place de la station de contrôle au sol.
            </span>
          </div>

          {/* Jour 03 */}
          <div className="flex flex-col gap-3 min-w-0">
            <span
              className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              03
            </span>
            <span
              className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Calibrage
            </span>
            <span
              className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256] [text-wrap:pretty]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Liaison drone–station et tests de signal.
            </span>
          </div>

          {/* Jour 04 */}
          <div className="flex flex-col gap-3 min-w-0">
            <span
              className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              04
            </span>
            <span
              className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Expériences
            </span>
            <span
              className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256] [text-wrap:pretty]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Vols, collecte et analyse des données devant le jury.
            </span>
          </div>
        </div>

        {/* En-tête 3+1 JOURS */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <span
            className="font-silkscreen font-normal text-[clamp(40px,6vw,88px)] leading-[0.9] text-[#0B3FD9]"
            style={{ fontFamily: "'Silkscreen', monospace" }}
          >
            3+1<br />JOURS
          </span>
          <span
            className="max-w-[30ch] font-sans font-extrabold text-[15px] leading-[1.3] tracking-[0.03em] uppercase text-[#0A1430]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Trois jours pour monter le drone et la station, un jour pour faire les expériences.
          </span>
        </div>
      </div>

      {/* 4. Ligne méta inférieure du Déroulé */}
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,72px)] mt-[clamp(32px,4vw,56px)] pb-7">
        <div
          className="border-t-2 border-[#0A1430] pt-3.5 flex flex-wrap justify-between gap-3 font-silkscreen font-bold text-[11px] tracking-[0.06em] text-[#0A1430]"
          style={{ fontFamily: "'Silkscreen', monospace" }}
        >
          <span>© GÉNIE UPB</span>
          <span>[ TECHNOLOGIE ] [ AGRITECH ]</span>
          <span>ÉQUIPES DE 6</span>
        </div>
      </div>
    </section>
  );
};

export default TechDeroule;
