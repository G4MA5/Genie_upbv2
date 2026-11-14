import React, { useEffect, useRef } from 'react';

export const TechEvaluation: React.FC = () => {
  const evalRef = useRef<HTMLElement | null>(null);
  const signpostRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // 1. Animation de flottaison du panneau indicateur (data-fx="float")
    const signAnim = signpostRef.current?.animate(
      [
        { transform: 'translateY(-8px) rotate(-1.5deg)' },
        { transform: 'translateY(8px) rotate(1.5deg)' },
      ],
      {
        duration: 3400,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    // 2. Animations des 3 points critiques d'évaluation (Web Animations API)
    const sec = evalRef.current;
    const anims: Animation[] = [];

    if (sec) {
      const inf = { iterations: Infinity };

      // Point critique 01: Rapport technique (lignes du document + coche verte)
      sec.querySelectorAll('[data-anim="doc"] [data-line]').forEach((l, i) => {
        const a = l.animate(
          [
            { transform: 'scaleX(0)' },
            { transform: 'scaleX(1)', offset: 0.25 },
            { transform: 'scaleX(1)', offset: 0.85 },
            { transform: 'scaleX(0)' },
          ],
          { ...inf, duration: 3200, delay: i * 180, easing: 'ease-out' }
        );
        anims.push(a);
      });

      sec.querySelectorAll('[data-anim="doc"] [data-check]').forEach((c) => {
        const a = c.animate(
          [
            { transform: 'scale(0)' },
            { transform: 'scale(0)', offset: 0.45 },
            { transform: 'scale(1.2)', offset: 0.55 },
            { transform: 'scale(1)', offset: 0.62 },
            { transform: 'scale(1)', offset: 0.9 },
            { transform: 'scale(0)' },
          ],
          { ...inf, duration: 3200 }
        );
        anims.push(a);
      });

      // Point critique 02: Injection de données (flux de bits descendants + barres égaliseur)
      sec.querySelectorAll('[data-anim="inject"] [data-bit]').forEach((b, i) => {
        const a = b.animate(
          [
            { transform: 'translateY(0)', opacity: 0 },
            { opacity: 1, offset: 0.2 },
            { transform: 'translateY(62px)', opacity: 0 },
          ],
          { ...inf, duration: 1300, delay: i * 210, easing: 'ease-in' }
        );
        anims.push(a);
      });

      sec.querySelectorAll('[data-anim="inject"] [data-bar]').forEach((b, i) => {
        const a = b.animate(
          [{ transform: 'scaleY(.3)' }, { transform: 'scaleY(1)' }],
          {
            ...inf,
            direction: 'alternate',
            duration: 700 + i * 130,
            easing: 'ease-in-out',
          }
        );
        anims.push(a);
      });

      // Point critique 03: Contrôle de la station (ondes radar concentriques)
      sec.querySelectorAll('[data-anim="signal"] [data-wave]').forEach((w, i) => {
        const a = w.animate(
          [
            { transform: 'scale(.4)', opacity: 1 },
            { transform: 'scale(3.4)', opacity: 0 },
          ],
          { ...inf, duration: 2100, delay: i * 700, easing: 'ease-out' }
        );
        anims.push(a);
      });
    }

    return () => {
      signAnim?.cancel();
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <section
      ref={evalRef}
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
              className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              [ ÉVALUATION ]
            </span>
            <h2
              className="m-0 font-silkscreen font-normal text-[clamp(40px,5.4vw,80px)] leading-[0.95] tracking-[-0.02em] text-[#E3E5EA] uppercase"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              Ce que le jury vérifie
            </h2>
            <img
              ref={signpostRef}
              data-fx="float"
              src="/images/4a6653f4-6dfe-48dc-b2cf-7d9849e74067.png"
              alt="Panneau indicateur à trois directions"
              className="block w-[min(100%,420px)] h-auto mt-2"
              style={{
                WebkitMaskImage: 'radial-gradient(70% 75% at 50% 50%, #000 55%, transparent 100%)',
                maskImage: 'radial-gradient(70% 75% at 50% 50%, #000 55%, transparent 100%)',
              }}
            />
          </div>

          {/* Colonne droite : 3 Points critiques avec animations dédiées (épuré sans boîtes artificielles) */}
          <div className="flex flex-col min-w-0">
            {/* Point critique 01 : Rapport technique */}
            <div
              data-pt="1"
              className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
            >
              <div
                data-anim="doc"
                aria-hidden="true"
                className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
              >
                <div className="absolute left-[22px] top-4 w-[52px] h-16 rounded-[6px] bg-[#E3E5EA] p-2.5 box-border flex flex-col gap-1.5">
                  <span
                    data-line="1"
                    className="block h-1 w-full rounded-[2px] bg-[#113D88] origin-left"
                  />
                  <span
                    data-line="1"
                    className="block h-1 w-[80%] rounded-[2px] bg-[#113D88] origin-left"
                  />
                  <span
                    data-line="1"
                    className="block h-1 w-[95%] rounded-[2px] bg-[#113D88] origin-left"
                  />
                  <span
                    data-line="1"
                    className="block h-1 w-[60%] rounded-[2px] bg-[#113D88] origin-left"
                  />
                  <span
                    data-line="1"
                    className="block h-1 w-[85%] rounded-[2px] bg-[#113D88] origin-left"
                  />
                </div>
                <span
                  data-check="1"
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
                data-anim="inject"
                aria-hidden="true"
                className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
              >
                <span
                  data-bit="1"
                  className="absolute left-4 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  0
                </span>
                <span
                  data-bit="1"
                  className="absolute left-7 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  1
                </span>
                <span
                  data-bit="1"
                  className="absolute left-10 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  0
                </span>
                <span
                  data-bit="1"
                  className="absolute left-[52px] -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  1
                </span>
                <span
                  data-bit="1"
                  className="absolute left-16 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  0
                </span>
                <span
                  data-bit="1"
                  className="absolute left-[76px] -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  style={{ fontFamily: "'Silkscreen', monospace" }}
                >
                  1
                </span>

                <div className="absolute left-3.5 right-3.5 bottom-3 h-[30px] rounded-[8px] bg-[#E3E5EA] flex items-end gap-1 px-1.5 py-1.5 box-border">
                  <span
                    data-bar="1"
                    className="flex-1 h-[40%] rounded-[2px] bg-[#113D88] origin-bottom"
                  />
                  <span
                    data-bar="1"
                    className="flex-1 h-[70%] rounded-[2px] bg-[#113D88] origin-bottom"
                  />
                  <span
                    data-bar="1"
                    className="flex-1 h-[55%] rounded-[2px] bg-[#113D88] origin-bottom"
                  />
                  <span
                    data-bar="1"
                    className="flex-1 h-[90%] rounded-[2px] bg-[#113D88] origin-bottom"
                  />
                  <span
                    data-bar="1"
                    className="flex-1 h-[65%] rounded-[2px] bg-[#113D88] origin-bottom"
                  />
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
                data-anim="signal"
                aria-hidden="true"
                className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
              >
                <span
                  data-wave="1"
                  className="absolute left-1/2 top-[44%] w-6 h-6 -ml-3 -mt-3 rounded-full border-[2.5px] border-[#7FD6FF] box-border"
                />
                <span
                  data-wave="1"
                  className="absolute left-1/2 top-[44%] w-6 h-6 -ml-3 -mt-3 rounded-full border-[2.5px] border-[#7FD6FF] box-border"
                />
                <span
                  data-wave="1"
                  className="absolute left-1/2 top-[44%] w-6 h-6 -ml-3 -mt-3 rounded-full border-[2.5px] border-[#7FD6FF] box-border"
                />
                <span className="absolute left-1/2 top-[44%] w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-[#E3E5EA]" />
                <span className="absolute left-[calc(50%-2px)] top-[calc(44%+5px)] w-1 h-[34px] bg-[#E3E5EA]" />
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
                  La station de signal est mise à l'épreuve : liaison, stabilité, réactivité.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barre inférieure Jury (border-top 2px solid #E3E5EA) */}
        <div className="flex flex-wrap items-center justify-between gap-7 pt-7 border-t-2 border-[#E3E5EA]">
          <div className="flex flex-col gap-2 min-w-0">
            <span
              className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              [ JURY ]
            </span>
            <span
              className="font-sans font-black text-[clamp(24px,2.8vw,36px)] leading-[1.1] text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              3 membres évaluent chaque équipe.
            </span>
          </div>

          <div className="flex gap-3.5">
            {[1, 2, 3].map((_, idx) => (
              <span
                key={idx}
                data-juror="1"
                className="w-[60px] h-[60px] rounded-full bg-[#E3E5EA] grid place-items-center text-[#113D88]"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="8.5" r="3.6" />
                  <path d="M4.5 20c.9-3.8 3.9-6 7.5-6s6.6 2.2 7.5 6" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechEvaluation;
