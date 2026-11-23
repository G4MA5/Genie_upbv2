import React from 'react';
import Topography from '../Topography';

export const TechMissionAgri: React.FC = () => {
  return (
    <section
      data-screen-label="ST Agriculture"
      className="relative overflow-hidden min-h-[780px] bg-[#0B3FD9] px-[clamp(20px,5vw,72px)] pt-[clamp(72px,9vw,120px)] pb-[clamp(48px,6vw,80px)] flex flex-col justify-between"
    >
      {/* 1. Arrière-plan Topographie WebGL 3D ondulante haute fidélité (identique prototype) */}
      <div className="absolute inset-0">
        <Topography
          color="#9FB6FF"
          lineCount={24}
          lineWidth={1.2}
          elevation={1.1}
          tilt={30}
          speed={0.25}
          glow={0.4}
          fog={0.2}
          markers="plus"
          hoverEffect="lift"
          clickEffect="pulse"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      {/* 2. Dégradé vertical d'atténuation (identique prototype) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,63,217,0.85) 0%, rgba(11,63,217,0) 38%, rgba(11,63,217,0) 55%, rgba(11,63,217,0.92) 85%)',
        }}
      />

      {/* 3. Conteneur de contenu principal */}
      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col justify-between gap-[clamp(48px,8vw,140px)] z-10 pointer-events-none">
        {/* Grille Mission & Descriptif */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(20px,4vw,64px)] items-start">
          <div className="flex flex-col gap-[18px] min-w-0">
            <span
              className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              [ MISSION ] [ AGRITECH ]
            </span>
            <h2
              className="m-0 font-silkscreen font-normal text-[clamp(40px,5.6vw,84px)] leading-[0.95] tracking-[-0.02em] text-[#E3E5EA] uppercase [text-wrap:balance]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              Surveiller les cultures
            </h2>
          </div>

          <div className="flex flex-col gap-[14px] min-w-0 pt-[clamp(0px,3vw,36px)]">
            <span className="w-7 h-[3px] bg-[#E3E5EA]" />
            <p
              className="m-0 max-w-[34ch] font-sans font-extrabold text-[clamp(17px,1.6vw,21px)] leading-[1.3] tracking-[0.02em] uppercase text-white [text-wrap:pretty]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Concevoir une solution de surveillance agricole pour contribuer à la souveraineté alimentaire ivoirienne.
            </p>
            <p
              className="m-0 max-w-[40ch] font-sans font-semibold text-[16px] leading-[1.5] text-[#D6E0FF] [text-wrap:pretty]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Un drone équipé et une station de contrôle au sol, conçus et montés par l'équipe.
            </p>
          </div>
        </div>

        {/* Grille 3 Statistiques clés */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(20px,3vw,40px)]">
          <div className="flex flex-col gap-[10px] pt-4 border-t-2 border-[#E3E5EA] min-w-0">
            <span
              className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              06
            </span>
            <span
              className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Personnes par équipe
            </span>
          </div>

          <div className="flex flex-col gap-[10px] pt-4 border-t-2 border-[#E3E5EA] min-w-0">
            <span
              className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              3+1
            </span>
            <span
              className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Jours de montage + expériences
            </span>
          </div>

          <div className="flex flex-col gap-[10px] pt-4 border-t-2 border-[#E3E5EA] min-w-0">
            <span
              className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              03
            </span>
            <span
              className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Membres du jury
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMissionAgri;
