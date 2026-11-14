import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InnoRubiksCube } from './InnoRubiksCube';

/**
 * InnoEpreuve — Section 2 de la Catégorie Innovation (SI L'epreuve)
 * Calibré à 100% sur scripts/proto_real.html (lignes 928-934 & 1568-1630) :
 * - Portes coulissantes gauche/droite avec rubans répétitifs « INNOVE »
 * - Panneau 0 : L'Épreuve avec labels verticaux PROBLÈME / SOLUTION et Cube 3D auto-résolu
 * - Panneau 1 : En Chiffres avec les 3 cartes officielles (12 équipes, 4-6 étudiants, 3 jours)
 * - Navigation fluide au scroll et aux clics tactiles.
 */
export const InnoEpreuve: React.FC = () => {
  // -1: portes fermées, 0: Panneau 0 (L'épreuve), 1: Panneau 1 (En Chiffres)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [solutionSolved, setSolutionSolved] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Compteurs animés pour le panneau 1
  const [countTeams, setCountTeams] = useState<number>(12);
  const [countDays, setCountDays] = useState<number>(3);

  const sectionRef = useRef<HTMLElement | null>(null);
  const doorLeftRef = useRef<HTMLDivElement | null>(null);
  const doorRightRef = useRef<HTMLDivElement | null>(null);

  // Fonction pour ouvrir ou fermer les portes avec l'accélération cubic-bezier
  const animateDoors = useCallback((open: boolean): Promise<void> => {
    return new Promise((resolve) => {
      const dl = doorLeftRef.current;
      const dr = doorRightRef.current;
      if (!dl || !dr) {
        resolve();
        return;
      }

      const w = window.innerWidth * 0.5;
      const x = open ? w : 0;
      const duration = open ? 950 : 650;
      const easing = 'cubic-bezier(0.7, 0, 0.2, 1)';

      const animL = dl.animate(
        [
          { transform: dl.style.transform || 'translateX(0)' },
          { transform: `translateX(${-x}px)` },
        ],
        { duration, easing, fill: 'forwards' }
      );

      dr.animate(
        [
          { transform: dr.style.transform || 'translateX(0)' },
          { transform: `translateX(${x}px)` },
        ],
        { duration, easing, fill: 'forwards' }
      );

      animL.onfinish = () => {
        dl.style.transform = `translateX(${-x}px)`;
        dr.style.transform = `translateX(${x}px)`;
        resolve();
      };
    });
  }, []);

  // Changement de panneau avec transition des portes
  const goToStep = useCallback(
    async (targetStep: number) => {
      if (isAnimating || targetStep === activeStep) return;
      setIsAnimating(true);

      // 1. Fermeture des portes
      await animateDoors(false);

      // 2. Bascule du panneau
      setActiveStep(targetStep);
      setSolutionSolved(false);

      if (targetStep === 1) {
        // Déclencheur compteurs
        setCountTeams(0);
        setCountDays(0);
        setTimeout(() => {
          let t = 0;
          const iv = setInterval(() => {
            t++;
            setCountTeams(t);
            if (t >= 12) clearInterval(iv);
          }, 60);

          let d = 0;
          const ivD = setInterval(() => {
            d++;
            setCountDays(d);
            if (d >= 3) clearInterval(ivD);
          }, 200);
        }, 500);
      }

      // 3. Ré-ouverture des portes
      await animateDoors(true);
      setIsAnimating(false);
    },
    [activeStep, animateDoors, isAnimating]
  );

  // Initialisation à l'apparition
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ouverture initiale des portes
            animateDoors(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animateDoors]);

  return (
    <section
      ref={sectionRef}
      data-inno="1"
      data-screen-label="SI L'epreuve"
      className="relative w-full min-h-[920px] lg:h-screen overflow-hidden bg-white select-none"
    >
      {/* Conteneur principal plein écran */}
      <div className="absolute inset-0 bg-[#F4F7FD] flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden">
        {/* PANNEAU 0 : L'ÉPREUVE */}
        <div
          data-ipanel="0"
          className={`w-full max-w-[860px] flex flex-col items-center gap-5 sm:gap-6 text-center transition-all duration-500 ${
            activeStep === 0
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}
        >
          {/* Badge L'ÉPREUVE */}
          <span
            data-pop="1"
            className="font-black text-[clamp(18px,1.8vw,24px)] leading-none text-[#F58220] uppercase tracking-[0.02em]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            L’ÉPREUVE
          </span>

          {/* Scène Rubik's Cube avec axes PROBLÈME / SOLUTION */}
          <div className="flex items-center gap-[clamp(16px,3vw,40px)] my-2">
            <span
              data-lbl="pb"
              className={`font-black text-[13px] sm:text-[14px] tracking-[0.1em] [writing-mode:vertical-rl] rotate-180 transition-opacity duration-500 ${
                solutionSolved ? 'opacity-25 text-[#0A1430]' : 'opacity-100 text-[#0A1430]'
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              PROBLÈME
            </span>

            {/* Rubik's Cube 3D officiel */}
            <InnoRubiksCube
              autoSolveDelay={1200}
              onSolved={() => setSolutionSolved(true)}
            />

            <span
              data-lbl="so"
              className={`font-black text-[13px] sm:text-[14px] tracking-[0.1em] [writing-mode:vertical-rl] transition-opacity duration-500 ${
                solutionSolved ? 'opacity-100 text-[#E8621A]' : 'opacity-25 text-[#E8621A]'
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              SOLUTION
            </span>
          </div>

          {/* Titre bicolore */}
          <h2
            data-pop="1"
            className="m-0 font-black text-[clamp(32px,4.4vw,64px)] leading-[0.95] tracking-[-0.02em] text-[#0A1430] text-balance"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Un vrai problème, <span className="text-[#1D4FD8]">une vraie solution</span>
          </h2>

          {/* Description */}
          <p
            data-pop="1"
            className="m-0 max-w-[46ch] font-bold text-[clamp(15px,1.5vw,19px)] leading-[1.45] text-[#3D4459] text-pretty"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Les équipes choisissent un problème réel posé par une entreprise partenaire, puis proposent une solution concrète qu’elles défendent devant un jury.
          </p>

          {/* Bouton de bascule vers le panneau 1 */}
          <button
            onClick={() => goToStep(1)}
            className="mt-4 px-6 py-3 rounded-full bg-[#0A1430] hover:bg-[#1D4FD8] text-white font-extrabold text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span>Voir les chiffres clés</span>
            <span>→</span>
          </button>
        </div>

        {/* PANNEAU 1 : EN CHIFFRES */}
        <div
          data-ipanel="1"
          className={`w-full max-w-[860px] flex flex-col items-center gap-6 sm:gap-8 text-center transition-all duration-500 ${
            activeStep === 1
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}
        >
          {/* Badge EN CHIFFRES */}
          <span
            data-pop="1"
            className="font-black text-[clamp(18px,1.8vw,24px)] leading-none text-[#F58220] uppercase tracking-[0.02em]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            EN CHIFFRES
          </span>

          {/* Les 3 Cartes Statistiques Officielles */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-left">
            {/* CARTE 1 : 12 équipes (Dégradé Orange) */}
            <div
              data-pop="1"
              className="flex flex-col justify-between gap-4 p-6 sm:p-7 rounded-[26px] bg-gradient-to-br from-[#FF9A3D] to-[#E8621A] text-white shadow-[0_16px_36px_rgba(232,98,26,0.3)] min-h-[220px]"
            >
              <div className="min-h-[56px] flex items-center">
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="w-[18px] sm:w-[22px] h-[18px] sm:h-[22px] rounded-full bg-white shadow-sm"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span
                  className="font-bold text-[14px] opacity-85"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  environ
                </span>
                <span
                  className="font-black text-[clamp(48px,5.2vw,76px)] leading-[0.9] tracking-[-0.03em]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {countTeams}
                </span>
                <span
                  className="font-extrabold text-[17px] sm:text-[18px] leading-[1.2]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  équipes
                </span>
              </div>
            </div>

            {/* CARTE 2 : 4–6 étudiants par équipe (Bleu UPB) */}
            <div
              data-pop="1"
              className="flex flex-col justify-between gap-4 p-6 sm:p-7 rounded-[26px] bg-[#1D4FD8] text-white shadow-[0_16px_36px_rgba(29,79,216,0.3)] min-h-[220px]"
            >
              <div className="min-h-[56px] flex flex-wrap gap-2 items-center">
                {/* 6 silhouettes d'étudiants */}
                {[true, true, true, true, false, false].map((filled, idx) => (
                  <span
                    key={idx}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full ${
                        filled ? 'bg-white' : 'border-2 border-white'
                      }`}
                    />
                    <span
                      className={`w-6 h-3.5 rounded-t-[10px] rounded-b-[3px] ${
                        filled ? 'bg-white' : 'border-2 border-white'
                      }`}
                    />
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-0.5">
                <span
                  className="font-bold text-[14px] opacity-85"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  de
                </span>
                <span
                  className="font-black text-[clamp(48px,5.2vw,76px)] leading-[0.9] tracking-[-0.03em]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  4–6
                </span>
                <span
                  className="font-extrabold text-[17px] sm:text-[18px] leading-[1.2]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  étudiants par équipe
                </span>
              </div>
            </div>

            {/* CARTE 3 : 3 jours de concours (Sombre #0A1430) */}
            <div
              data-pop="1"
              className="flex flex-col justify-between gap-4 p-6 sm:p-7 rounded-[26px] bg-[#0A1430] text-white shadow-[0_16px_36px_rgba(10,20,48,0.4)] min-h-[220px]"
            >
              <div className="min-h-[56px] flex gap-2 items-center">
                {['27', '28', '29'].map((day) => (
                  <span
                    key={day}
                    className="w-[42px] sm:w-[46px] rounded-[10px] overflow-hidden bg-white flex flex-col items-center shadow-sm"
                  >
                    <span
                      className="w-full py-0.5 bg-[#1D4FD8] text-white font-extrabold text-[9px] text-center"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      JANV
                    </span>
                    <span
                      className="font-black text-[18px] sm:text-[20px] leading-[1.25] text-[#0A1430]"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {day}
                    </span>
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-0.5">
                <span
                  className="font-bold text-[13px] opacity-85 whitespace-nowrap"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  du 27 au 29 janvier 2027
                </span>
                <span
                  className="font-black text-[clamp(48px,5.2vw,76px)] leading-[0.9] tracking-[-0.03em]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {countDays}
                </span>
                <span
                  className="font-extrabold text-[17px] sm:text-[18px] leading-[1.2]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  jours de concours
                </span>
              </div>
            </div>
          </div>

          {/* Bouton retour vers l'épreuve */}
          <button
            onClick={() => goToStep(0)}
            className="mt-4 px-6 py-3 rounded-full bg-[#F4F7FD] hover:bg-[#EEF1F8] border border-[#0A1430]/20 text-[#0A1430] font-extrabold text-sm sm:text-base flex items-center gap-2 cursor-pointer transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span>← Revoir l'épreuve & le cube</span>
          </button>
        </div>
      </div>

      {/* PORTE GAUCHE (« INNOVE ») */}
      <div
        ref={doorLeftRef}
        data-door="l"
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-white z-[3] will-change-transform pointer-events-none"
      >
        <div className="absolute top-0 bottom-0 left-0 w-[200%]">
          <div
            className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex flex-col gap-[0.02em] font-black text-[clamp(64px,9vw,130px)] leading-[0.95] tracking-[-0.02em] select-none"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {Array.from({ length: 9 }).map((_, rIdx) => {
              const isFilled = rIdx % 2 === 0;
              return (
                <div
                  key={rIdx}
                  data-inno-row={isFilled ? '1' : '-1'}
                  className={`flex gap-[0.35em] whitespace-nowrap ${
                    isFilled ? '-ml-[480px]' : '-ml-[640px]'
                  }`}
                  style={{
                    animation: isFilled
                      ? 'innoSlideL 28s linear infinite'
                      : 'innoSlideR 32s linear infinite',
                  }}
                >
                  {Array.from({ length: 16 }).map((_, sIdx) => (
                    <span
                      key={sIdx}
                      className={isFilled ? 'text-[#EEF1F8]' : 'text-transparent'}
                      style={
                        !isFilled
                          ? { WebkitTextStroke: '2px #DCE3F0' }
                          : undefined
                      }
                    >
                      INNOVE
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PORTE DROITE (« INNOVE ») */}
      <div
        ref={doorRightRef}
        data-door="r"
        className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden bg-white z-[3] will-change-transform pointer-events-none"
      >
        <div className="absolute top-0 bottom-0 -left-full w-[200%]">
          <div
            className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex flex-col gap-[0.02em] font-black text-[clamp(64px,9vw,130px)] leading-[0.95] tracking-[-0.02em] select-none"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {Array.from({ length: 9 }).map((_, rIdx) => {
              const isFilled = rIdx % 2 === 0;
              return (
                <div
                  key={rIdx}
                  data-inno-row={isFilled ? '1' : '-1'}
                  className={`flex gap-[0.35em] whitespace-nowrap ${
                    isFilled ? '-ml-[480px]' : '-ml-[640px]'
                  }`}
                  style={{
                    animation: isFilled
                      ? 'innoSlideL 28s linear infinite'
                      : 'innoSlideR 32s linear infinite',
                  }}
                >
                  {Array.from({ length: 16 }).map((_, sIdx) => (
                    <span
                      key={sIdx}
                      className={isFilled ? 'text-[#EEF1F8]' : 'text-transparent'}
                      style={
                        !isFilled
                          ? { WebkitTextStroke: '2px #DCE3F0' }
                          : undefined
                      }
                    >
                      INNOVE
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicateur inférieur FAITES DÉFILER ↓ */}
      <div className="absolute left-1/2 bottom-7 -translate-x-1/2 z-[4] flex items-center gap-3">
        <button
          onClick={() => goToStep(activeStep === 0 ? 1 : 0)}
          data-inno-hint="1"
          className="px-4 py-2 rounded-full bg-[#0A1430] hover:bg-[#1D4FD8] text-white font-extrabold text-[12px] tracking-[0.12em] uppercase transition-all shadow-lg cursor-pointer"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {activeStep === 0 ? 'EN CHIFFRES ↓' : 'L’ÉPREUVE ↑'}
        </button>
      </div>

      {/* Animation des rubans INNOVE en CSS */}
      <style>{`
        @keyframes innoSlideL {
          0% { transform: translateX(0); }
          100% { transform: translateX(-400px); }
        }
        @keyframes innoSlideR {
          0% { transform: translateX(-400px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default InnoEpreuve;
