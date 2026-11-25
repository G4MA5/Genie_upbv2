import React from 'react';

export const TechEvaluation: React.FC = () => {
  return (
    <section
      data-screen-label="Technologie évaluation"
      data-eval="1"
      className="relative overflow-hidden bg-[#0F3C8A] px-[clamp(20px,5vw,72px)] py-[clamp(64px,8vw,112px)]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[clamp(40px,5vw,72px)]">
        {/* Grille principale 2 colonnes */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(24px,4vw,64px)] items-center">
          {/* Colonne gauche : Titre & Panneau indicateur à trois directions */}
          <div className="relative min-w-0 flex flex-col gap-[18px]">
            <span
              className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#7FD6FF]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              [ ÉVALUATION ]
            </span>
            <h2
              className="m-0 font-silkscreen font-normal text-[clamp(40px,5.6vw,84px)] leading-[0.95] tracking-[-0.02em] text-[#E3E5EA] uppercase [text-wrap:balance]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              Ce que le jury vérifie
            </h2>
            <img
              src="/images/4a6653f4-6dfe-48dc-b2cf-7d9849e74067.webp"
              alt="Panneau indicateur à trois directions"
              loading="lazy"
              decoding="async"
              className="block w-[min(100%,420px)] h-auto mt-2 opacity-95"
            />
          </div>

          {/* Colonne droite : 3 Points critiques statiques épurés et lisibles */}
          <div className="flex flex-col min-w-0">
            {/* Point critique 01 : Rapport technique */}
            <div
              data-pt="1"
              className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
            >
              <div
                aria-hidden="true"
                className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
              >
                <div className="absolute left-[22px] top-4 w-[52px] h-16 rounded-[6px] bg-[#E3E5EA] p-2.5 box-border flex flex-col gap-1.5">
                  <span className="block h-1 w-full rounded-[2px] bg-[#113D88]" />
                  <span className="block h-1 w-[80%] rounded-[2px] bg-[#113D88]" />
                  <span className="block h-1 w-[95%] rounded-[2px] bg-[#113D88]" />
                  <span className="block h-1 w-[60%] rounded-[2px] bg-[#113D88]" />
                  <span className="block h-1 w-[85%] rounded-[2px] bg-[#113D88]" />
                </div>
                <span
                  className="absolute right-2.5 bottom-2.5 w-[26px] h-[26px] rounded-full bg-[#3BFF7A] grid place-items-center font-sans font-black text-[15px] text-[#113D88]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  ✓
                </span>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <span
                  className="font-silkscreen font-bold text-[12px] tracking-[0.08em] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  POINT CRITIQUE 01
                </span>
                <span
                  className="font-sans font-black text-[clamp(20px,2vw,26px)] leading-[1.15] text-white"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Rapport technique
                </span>
                <span
                  className="font-sans font-medium text-[15px] leading-[1.5] text-[#C9D6F5] [text-wrap:pretty]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  La conception, les choix et les résultats, documentés.
                </span>
              </div>
            </div>

            {/* Point critique 02 : Injection de données */}
            <div
              data-pt="1"
              className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
            >
              <div
                aria-hidden="true"
                className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
              >
                <div className="absolute inset-x-2 top-2 flex justify-between px-1">
                  <span className="font-silkscreen font-bold text-[11px] text-[#7FD6FF]">0</span>
                  <span className="font-silkscreen font-bold text-[11px] text-[#7FD6FF]">1</span>
                  <span className="font-silkscreen font-bold text-[11px] text-[#7FD6FF]">0</span>
                  <span className="font-silkscreen font-bold text-[11px] text-[#7FD6FF]">1</span>
                  <span className="font-silkscreen font-bold text-[11px] text-[#7FD6FF]">0</span>
                </div>

                <div className="absolute left-3.5 right-3.5 bottom-3 h-[30px] rounded-[8px] bg-[#E3E5EA] flex items-end gap-1 px-1.5 py-1.5 box-border">
                  <span className="flex-1 h-[40%] rounded-[2px] bg-[#113D88]" />
                  <span className="flex-1 h-[70%] rounded-[2px] bg-[#113D88]" />
                  <span className="flex-1 h-[55%] rounded-[2px] bg-[#113D88]" />
                  <span className="flex-1 h-[90%] rounded-[2px] bg-[#113D88]" />
                  <span className="flex-1 h-[65%] rounded-[2px] bg-[#113D88]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <span
                  className="font-silkscreen font-bold text-[12px] tracking-[0.08em] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  POINT CRITIQUE 02
                </span>
                <span
                  className="font-sans font-black text-[clamp(20px,2vw,26px)] leading-[1.15] text-white"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Injection de données
                </span>
                <span
                  className="font-sans font-medium text-[15px] leading-[1.5] text-[#C9D6F5] [text-wrap:pretty]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Des données sont injectées dans le drone pour juger la qualité de son analyse.
                </span>
              </div>
            </div>

            {/* Point critique 03 : Contrôle de la station */}
            <div
              data-pt="1"
              className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
            >
              <div
                aria-hidden="true"
                className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden flex items-center justify-center"
              >
                <span className="w-12 h-12 rounded-full border-[2px] border-[#7FD6FF]/40 flex items-center justify-center">
                  <span className="w-7 h-7 rounded-full border-[2.5px] border-[#7FD6FF] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#7FD6FF]" />
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <span
                  className="font-silkscreen font-bold text-[12px] tracking-[0.08em] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  POINT CRITIQUE 03
                </span>
                <span
                  className="font-sans font-black text-[clamp(20px,2vw,26px)] leading-[1.15] text-white"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Contrôle de la station
                </span>
                <span
                  className="font-sans font-medium text-[15px] leading-[1.5] text-[#C9D6F5] [text-wrap:pretty]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  La station au sol doit recevoir les alertes et afficher la carte en direct.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc bas : Grille de critères chiffrés */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(16px,2.5vw,32px)] pt-8 border-t border-white/15">
          <div className="flex flex-col gap-1">
            <span
              className="font-silkscreen font-bold text-[clamp(32px,4vw,56px)] leading-none text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              40%
            </span>
            <span className="font-sans font-extrabold text-[13px] uppercase tracking-[0.05em] text-[#7FD6FF]">
              Précision détection
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span
              className="font-silkscreen font-bold text-[clamp(32px,4vw,56px)] leading-none text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              25%
            </span>
            <span className="font-sans font-extrabold text-[13px] uppercase tracking-[0.05em] text-[#7FD6FF]">
              Solidité conception
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span
              className="font-silkscreen font-bold text-[clamp(32px,4vw,56px)] leading-none text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              20%
            </span>
            <span className="font-sans font-extrabold text-[13px] uppercase tracking-[0.05em] text-[#7FD6FF]">
              Autonomie & portée
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span
              className="font-silkscreen font-bold text-[clamp(32px,4vw,56px)] leading-none text-[#E3E5EA]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              15%
            </span>
            <span className="font-sans font-extrabold text-[13px] uppercase tracking-[0.05em] text-[#7FD6FF]">
              Rapport & soutenance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechEvaluation;
