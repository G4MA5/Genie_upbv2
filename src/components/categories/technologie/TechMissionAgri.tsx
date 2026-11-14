import React from 'react';
import TopographyWave from '../TopographyWave';

export const TechMissionAgri: React.FC = () => {
  return (
    <section
      data-screen-label="ST Agriculture"
      className="relative overflow-hidden min-h-[780px] bg-[#0B3FD9] px-5 sm:px-10 lg:px-[72px] py-[clamp(72px,9vw,120px)] flex flex-col justify-between"
    >
      {/* Composant Topographie vectorielle d'élévation ondulante */}
      <div className="absolute inset-0 pointer-events-none">
        <TopographyWave />
      </div>

      {/* Dégradé vertical d'atténuation */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[rgba(11,63,217,0.85)] via-[rgba(11,63,217,0)] via-50% to-[rgba(11,63,217,0.92)] pointer-events-none"
      />

      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col justify-between gap-[clamp(48px,8vw,140px)] z-10 pointer-events-none">
        {/* Grille Mission & Descriptif */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(20px,4vw,64px)] items-start">
          <div className="flex flex-col gap-4.5 min-w-0">
            <span className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]">
              [ MISSION ] [ AGRITECH ]
            </span>
            <h2 className="m-0 font-silkscreen font-normal text-[clamp(40px,5.6vw,84px)] leading-[0.95] tracking-[-0.02em] text-[#E3E5EA] uppercase text-balance">
              Surveiller les cultures
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 min-w-0 pt-[clamp(0px,3vw,36px)]">
            <span className="w-7 h-[3px] bg-[#E3E5EA]" />
            <p className="m-0 max-w-[34ch] font-sans font-extrabold text-[clamp(17px,1.6vw,21px)] leading-[1.3] tracking-[0.02em] uppercase text-white">
              Concevoir une solution de surveillance agricole pour contribuer à la souveraineté alimentaire ivoirienne.
            </p>
            <p className="m-0 max-w-[40ch] font-sans font-semibold text-[16px] leading-[1.5] text-[#D6E0FF]">
              Un drone équipé et une station de contrôle au sol, conçus et montés par l'équipe.
            </p>
          </div>
        </div>

        {/* Grille 3 Statistiques clés */}
        <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(20px,3vw,40px)]">
          <div className="flex flex-col gap-2.5 pt-4 border-t-2 border-[#E3E5EA] min-w-0">
            <span className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]">
              06
            </span>
            <span className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white">
              Personnes par équipe
            </span>
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t-2 border-[#E3E5EA] min-w-0">
            <span className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]">
              3+1
            </span>
            <span className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white">
              Jours de montage + expériences
            </span>
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t-2 border-[#E3E5EA] min-w-0">
            <span className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]">
              03
            </span>
            <span className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white">
              Membres du jury
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
