import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategorieTechnologie() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0C1E4A] overflow-x-hidden text-white font-sans">
      {/* 1. HERO TECHNOLOGIE (Exact Prototype is.ST) */}
      <section className="relative overflow-hidden bg-[#0C1E4A] min-h-[720px] lg:min-h-[820px] flex items-stretch px-5 sm:px-10 lg:px-18 pt-28 pb-12">
        {/* Background Grid Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(#2B3B68 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* Radial Vignette */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0 h-[55%] pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(29,79,216,0) 0%, rgba(29,79,216,0.35) 60%, #1D3E9E 100%)',
          }}
        />

        {/* Content Container */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-20">
          <div className="flex flex-col items-start min-w-0 pt-8 lg:pt-16 max-w-2xl">
            <h1 className="m-0 flex flex-col items-start font-black text-5xl sm:text-7xl lg:text-[115px] leading-[0.88] tracking-tight text-white drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]">
              <span className="whitespace-nowrap">Qui sera le</span>
              <span className="whitespace-nowrap">génie</span>
              <span
                className="mt-3 whitespace-nowrap inline-block -rotate-4 origin-left text-[0.78em] text-[#FF9A3D]"
                style={{
                  textShadow:
                    '3px 3px 0 #0E1E4A, -2px -2px 0 #0E1E4A, 2px -2px 0 #0E1E4A, -2px 2px 0 #0E1E4A, 0 10px 20px rgba(0,0,0,0.5)',
                }}
              >
                technologique
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-[#D6E0FF] font-semibold max-w-lg">
              Surveillance agricole par drone, capteurs IoT et station sol : concevez, assemblez et pilotez votre solution face au jury.
            </p>

            <button
              onClick={() => navigate('/inscription')}
              className="mt-10 min-h-[58px] px-8 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-xl flex items-center gap-3 whitespace-nowrap shadow-[0_14px_30px_rgba(20,10,80,0.4)] hover:-translate-y-1 transition-transform cursor-pointer"
            >
              S'inscrire →
            </button>
          </div>

          {/* Drone 3D Image */}
          <div className="relative w-full max-w-[480px] lg:max-w-[580px] flex items-center justify-center">
            <motion.img
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
              alt="Drone de surveillance agricole"
              className="w-full h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* 2. ST AGRICULTURE (Exact Prototype ST Agriculture) */}
      <section className="relative overflow-hidden min-h-[680px] bg-[#0B3FD9] px-5 sm:px-10 lg:px-18 py-20 lg:py-28 flex flex-col justify-between">
        {/* Topography vector wave overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #9FB6FF 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,63,217,.85) 0%, rgba(11,63,217,0) 38%, rgba(11,63,217,0) 55%, rgba(11,63,217,.92) 85%)',
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-between gap-16 lg:gap-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-4">
              <span className="font-silkscreen font-bold text-xs sm:text-sm tracking-widest text-[#9FB6FF]">
                [ MISSION ] [ AGRITECH ]
              </span>
              <h2 className="m-0 font-silkscreen font-normal text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[#E3E5EA] uppercase">
                Surveiller les cultures
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:pt-8">
              <span className="w-10 h-1 bg-[#E3E5EA]" />
              <p className="m-0 font-extrabold text-lg sm:text-xl lg:text-2xl leading-snug uppercase tracking-wide text-white">
                Concevoir une solution de surveillance agricole pour contribuer à la souveraineté alimentaire ivoirienne.
              </p>
              <p className="m-0 font-semibold text-base sm:text-lg text-[#D6E0FF]">
                Un drone équipé et une station de contrôle au sol, conçus et montés par l'équipe.
              </p>
            </div>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-8 border-t-2 border-[#E3E5EA]/40">
            <div className="flex flex-col gap-2 pt-4">
              <span className="font-silkscreen font-normal text-6xl sm:text-7xl lg:text-8xl leading-none text-[#E3E5EA]">
                06
              </span>
              <span className="font-black text-sm uppercase tracking-wider text-white">
                Personnes par équipe
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <span className="font-silkscreen font-normal text-6xl sm:text-7xl lg:text-8xl leading-none text-[#E3E5EA]">
                3+1
              </span>
              <span className="font-black text-sm uppercase tracking-wider text-white">
                Jours de montage + expériences
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <span className="font-silkscreen font-normal text-6xl sm:text-7xl lg:text-8xl leading-none text-[#E3E5EA]">
                03
              </span>
              <span className="font-black text-sm uppercase tracking-wider text-white">
                Membres du jury
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGIE DÉROULÉ (Exact Prototype Technologie déroulé) */}
      <section className="relative overflow-hidden bg-[#E3E5EA] text-[#0A1430]">
        {/* Blue Top Box */}
        <div className="relative bg-[#0B3FD9] px-5 sm:px-10 lg:px-18 pt-20 lg:pt-28 pb-12 sm:pb-16 text-center text-white">
          <span className="inline-block font-silkscreen font-bold text-xs sm:text-sm tracking-widest text-[#9FB6FF] mb-6">
            [ DÉROULÉ ]
          </span>
          <h2 className="relative z-10 m-0 font-silkscreen font-normal text-4xl sm:text-6xl lg:text-8xl leading-[0.92] tracking-tight text-[#E3E5EA] uppercase">
            Construire
            <br />
            puis prouver
          </h2>

          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
            alt="Drone"
            className="relative z-20 block w-full max-w-sm sm:max-w-md mx-auto -mb-16 sm:-mb-24 drop-shadow-[0_24px_24px_rgba(0,10,60,0.45)]"
          />
        </div>

        {/* Pixel Art Divider Graphic */}
        <div
          aria-hidden="true"
          className="h-24 sm:h-32 w-full opacity-90"
          style={{
            backgroundImage: `radial-gradient(#0B3FD9 2px, transparent 2px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* 4 Steps Container */}
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-18 pt-6 pb-16 flex flex-col gap-12 sm:gap-16">
          <div className="flex flex-wrap items-baseline justify-between gap-6 border-b-2 border-[#0A1430]/20 pb-8">
            <span className="font-silkscreen font-normal text-4xl sm:text-6xl lg:text-7xl leading-none text-[#0B3FD9]">
              3+1
              <br />
              JOURS
            </span>
            <span className="max-w-md font-black text-sm sm:text-base uppercase tracking-wider text-[#0A1430]">
              Trois jours pour monter le drone et la station, un jour pour faire les expériences.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-silkscreen font-bold text-4xl sm:text-5xl text-[#0B3FD9]">
                01
              </span>
              <span className="font-black text-base uppercase tracking-wider text-[#0A1430]">
                Montage
              </span>
              <p className="m-0 text-sm sm:text-[15px] font-semibold text-[#3A4256] leading-relaxed">
                Assemblage du drone et de ses capteurs.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-silkscreen font-bold text-4xl sm:text-5xl text-[#0B3FD9]">
                02
              </span>
              <span className="font-black text-base uppercase tracking-wider text-[#0A1430]">
                Intégration
              </span>
              <p className="m-0 text-sm sm:text-[15px] font-semibold text-[#3A4256] leading-relaxed">
                Mise en place de la station de contrôle au sol.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-silkscreen font-bold text-4xl sm:text-5xl text-[#0B3FD9]">
                03
              </span>
              <span className="font-black text-base uppercase tracking-wider text-[#0A1430]">
                Calibrage
              </span>
              <p className="m-0 text-sm sm:text-[15px] font-semibold text-[#3A4256] leading-relaxed">
                Liaison drone–station et tests de signal.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-silkscreen font-bold text-4xl sm:text-5xl text-[#0B3FD9]">
                04
              </span>
              <span className="font-black text-base uppercase tracking-wider text-[#0A1430]">
                Expériences
              </span>
              <p className="m-0 text-sm sm:text-[15px] font-semibold text-[#3A4256] leading-relaxed">
                Vols, collecte et analyse des données devant le jury.
              </p>
            </div>
          </div>

          {/* Footer Badge Strip */}
          <div className="border-t-2 border-[#0A1430] pt-4 flex flex-wrap justify-between items-center gap-4 font-silkscreen font-bold text-xs text-[#0A1430]">
            <span>© GÉNIE UPB</span>
            <span>[ TECHNOLOGIE ] [ AGRITECH ]</span>
            <span>ÉQUIPES DE 6</span>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGIE ÉVALUATION (Exact Prototype Technologie évaluation) */}
      <section className="relative overflow-hidden bg-[#0F3C8A] px-5 sm:px-10 lg:px-18 py-20 lg:py-28 text-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Title & Signpost Image */}
            <div className="flex flex-col gap-6">
              <span className="font-silkscreen font-bold text-xs sm:text-sm tracking-widest text-[#9FB6FF]">
                [ ÉVALUATION ]
              </span>
              <h2 className="m-0 font-silkscreen font-normal text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[#E3E5EA] uppercase">
                Ce que le jury vérifie
              </h2>
              <img
                src="/images/4a6653f4-6dfe-48dc-b2cf-7d9849e74067.png"
                alt="Panneau indicateur 3 directions"
                className="w-full max-w-sm h-auto mt-4 drop-shadow-xl"
              />
            </div>

            {/* 3 Points Critiques */}
            <div className="flex flex-col">
              {/* Point Critique 01 */}
              <div className="flex gap-5 items-center py-6 border-t-2 border-[#E3E5EA]/30">
                <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center overflow-hidden">
                  <div className="w-12 h-14 rounded-md bg-[#E3E5EA] p-2 flex flex-col gap-1.5 shadow-sm">
                    <span className="h-1 w-full bg-[#113D88] rounded-full" />
                    <span className="h-1 w-4/5 bg-[#113D88] rounded-full" />
                    <span className="h-1 w-full bg-[#113D88] rounded-full" />
                    <span className="h-1 w-3/5 bg-[#113D88] rounded-full" />
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-[#3BFF7A] text-[#113D88] font-black text-xs flex items-center justify-center shadow">
                    ✓
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-silkscreen font-bold text-xs tracking-wider text-[#7FD6FF]">
                    POINT CRITIQUE 01
                  </span>
                  <span className="font-black text-xl sm:text-2xl text-white">
                    Rapport technique
                  </span>
                  <p className="m-0 text-sm sm:text-base font-semibold text-[#C9D6F5]">
                    La conception, les choix et les résultats, documentés.
                  </p>
                </div>
              </div>

              {/* Point Critique 02 */}
              <div className="flex gap-5 items-center py-6 border-t-2 border-[#E3E5EA]/30">
                <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center overflow-hidden">
                  <div className="flex items-end gap-1 h-8 w-12 px-1 pb-1 bg-[#E3E5EA] rounded">
                    <span className="w-2 h-3 bg-[#113D88] rounded-xs" />
                    <span className="w-2 h-6 bg-[#113D88] rounded-xs" />
                    <span className="w-2 h-4 bg-[#113D88] rounded-xs" />
                    <span className="w-2 h-7 bg-[#113D88] rounded-xs" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-silkscreen font-bold text-xs tracking-wider text-[#7FD6FF]">
                    POINT CRITIQUE 02
                  </span>
                  <span className="font-black text-xl sm:text-2xl text-white">
                    Injection de données
                  </span>
                  <p className="m-0 text-sm sm:text-base font-semibold text-[#C9D6F5]">
                    Des données sont injectées dans le drone pour juger la qualité de son analyse.
                  </p>
                </div>
              </div>

              {/* Point Critique 03 */}
              <div className="flex gap-5 items-center py-6 border-t-2 border-[#E3E5EA]/30">
                <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center overflow-hidden">
                  <div className="relative flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full border-2 border-[#7FD6FF] animate-ping opacity-75" />
                    <span className="absolute w-3 h-3 rounded-full bg-[#E3E5EA]" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-silkscreen font-bold text-xs tracking-wider text-[#7FD6FF]">
                    POINT CRITIQUE 03
                  </span>
                  <span className="font-black text-xl sm:text-2xl text-white">
                    Contrôle de la station
                  </span>
                  <p className="m-0 text-sm sm:text-base font-semibold text-[#C9D6F5]">
                    La station de signal est mise à l'épreuve : liaison, stabilité, réactivité.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Jury 3 Membres */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t-2 border-[#E3E5EA]">
            <div className="flex flex-col gap-2">
              <span className="font-silkscreen font-bold text-xs sm:text-sm tracking-widest text-[#9FB6FF]">
                [ JURY ]
              </span>
              <span className="font-black text-2xl sm:text-3xl text-white">
                3 membres évaluent chaque équipe.
              </span>
            </div>

            <div className="flex gap-3 sm:gap-4">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="w-14 h-14 rounded-full bg-[#E3E5EA] text-[#113D88] flex items-center justify-center shadow-md font-black text-xl"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
