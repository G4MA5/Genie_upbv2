import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategorieEconomie() {
  const navigate = useNavigate();
  const [marketValue, setMarketValue] = useState<number>(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketValue((prev) => {
        const delta = (Math.random() - 0.48) * 8;
        return Math.max(900, +(prev + delta).toFixed(2));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#1F4A2A] overflow-x-hidden text-white font-sans">
      {/* 1. HERO ÉCONOMIE (Exact Prototype is.SE) */}
      <section className="relative overflow-hidden bg-[#1F4A2A] px-5 sm:px-10 lg:px-18 pt-28 pb-16">
        {/* Background Grid Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(#63D06F 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <h1 className="m-0 flex flex-col items-start font-black text-5xl sm:text-7xl lg:text-[100px] leading-[0.88] tracking-tight text-white drop-shadow-[0_7px_0_rgba(0,20,8,0.45)]">
              <span className="whitespace-nowrap">Qui sera le</span>
              <span className="whitespace-nowrap">génie</span>
              <span
                className="mt-3 whitespace-nowrap inline-block -rotate-4 origin-left text-[#1D4FD8]"
                style={{
                  textShadow:
                    '3px 3px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 10px 20px rgba(0,0,0,0.45)',
                }}
              >
                économique ?
              </span>
            </h1>

            <p className="m-0 text-lg sm:text-xl font-bold text-[#E3F3E5] leading-relaxed">
              Analyse, stratégie et sens des chiffres : montrez que vous savez transformer une crise en opportunité.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/inscription')}
                className="min-h-[52px] px-8 rounded-xl border-2 border-white bg-gradient-to-b from-[#63D06F] to-[#3E9E4C] text-white font-black text-base flex items-center gap-2 shadow-[0_12px_26px_rgba(27,122,62,0.4)] hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                S'inscrire →
              </button>

              <a
                href="#simulation"
                className="min-h-[52px] px-6 rounded-xl bg-white/10 border border-white/30 backdrop-blur text-white font-extrabold text-base flex items-center shadow hover:-translate-y-0.5 transition-transform"
              >
                Découvrir les épreuves
              </a>
            </div>
          </div>

          {/* Tirelire Image */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: [1.5, 3.5, 1.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[420px] lg:max-w-[480px] rounded-3xl overflow-hidden border-8 border-white shadow-[0_30px_60px_rgba(10,48,20,0.4)]"
            >
              <img
                src="/images/0ca0cb24-f6a7-4ecf-99aa-ee8e059f5ae8.png"
                alt="Tirelire et graphiques financiers"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. GÉNIE MARKET SIMULATION */}
      <section id="simulation" className="relative overflow-hidden bg-[#12301A] px-5 sm:px-10 lg:px-18 py-20 lg:py-28">
        <div className="relative max-w-7xl mx-auto flex flex-col gap-12 z-10">
          <div className="flex flex-col gap-3">
            <span className="font-mono font-bold text-xs tracking-widest text-[#63D06F]">
              PLATEFORME EN DIRECT
            </span>
            <h2 className="m-0 font-black text-4xl sm:text-6xl text-white">
              Un portefeuille, un capital fictif,{' '}
              <span className="text-[#63D06F]">un vrai marché.</span>
            </h2>
          </div>

          {/* Terminal Screen Container */}
          <div className="rounded-3xl border-4 border-white/80 bg-[#050A07] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            {/* Header Terminal */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#12301A] font-mono text-xs sm:text-sm text-[#63D06F]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3BFF7A] animate-pulse shadow-[0_0_10px_#3BFF7A]" />
                <span className="font-bold tracking-wider">GÉNIE MARKET · SIMULATION</span>
              </div>
              <span className="font-bold text-[#3BFF7A]">
                GUPB {marketValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} ▲ +{(marketValue - 1000 > 0 ? ((marketValue - 1000) / 10).toFixed(2) : '0.00')} %
              </span>
            </div>

            {/* Terminal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#12301A] p-6 gap-6">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#4E7A57]">PORTEFEUILLE · VALEUR EN TEMPS RÉEL</span>
                <div className="h-56 sm:h-64 rounded-xl bg-[#09150E] p-4 flex flex-col justify-between border border-[#1B4A28]">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-white">
                      {marketValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} XOF
                    </span>
                    <span className="font-mono text-xs text-[#3BFF7A]">ACTIF · MARCHÉ OUVERT</span>
                  </div>
                  {/* Fake sparkline bars */}
                  <div className="flex items-end gap-1.5 h-28 pt-4">
                    {[40, 55, 38, 62, 70, 58, 75, 82, 69, 88, 92, 85, 96].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 bg-gradient-to-t from-[#1F4A2A] to-[#63D06F] rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#4E7A57]">CLASSEMENT · ÉQUIPES EN TÊTE</span>
                <div className="flex flex-col gap-2">
                  {[
                    { rank: '01', team: 'Alpha Capital UPB', pnl: '+18.4 %', val: '1 184 200 XOF' },
                    { rank: '02', team: 'Finance Titans', pnl: '+14.1 %', val: '1 141 500 XOF' },
                    { rank: '03', team: 'Quantum Traders', pnl: '+9.8 %', val: '1 098 000 XOF' },
                    { rank: '04', team: 'Bingerville Assets', pnl: '+6.2 %', val: '1 062 100 XOF' },
                  ].map((row) => (
                    <div
                      key={row.rank}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 font-mono text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-black text-[#63D06F]">{row.rank}</span>
                        <span className="font-bold text-white">{row.team}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#3BFF7A] font-bold">{row.pnl}</span>
                        <span className="text-white/60">{row.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            <div className="flex gap-4 items-start">
              <span className="font-black text-4xl text-[#63D06F]">01</span>
              <div className="flex flex-col gap-1">
                <span className="font-black text-xl text-white">Simulation de marché</span>
                <p className="m-0 text-sm font-medium text-[#A9C9AE]">
                  Les équipes gèrent un portefeuille sur capital fictif.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-black text-4xl text-[#63D06F]">02</span>
              <div className="flex flex-col gap-1">
                <span className="font-black text-xl text-white">Premier classement</span>
                <p className="m-0 text-sm font-medium text-[#A9C9AE]">
                  Basé sur la valeur et le risque de leur portefeuille.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-black text-4xl text-[#63D06F]">03</span>
              <div className="flex flex-col gap-1">
                <span className="font-black text-xl text-white">Soutenance finale</span>
                <p className="m-0 text-sm font-medium text-[#A9C9AE]">
                  Les équipes qualifiées passent devant le jury d'experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOUTENANCE FINALE & CRITÈRES */}
      <section className="relative overflow-hidden bg-[#EBE7DE] text-[#12301A] px-5 sm:px-10 lg:px-18 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="font-extrabold text-sm uppercase tracking-wider text-[#E8621A]">
              Jour 3 · vendredi 29 janvier 2027
            </span>
            <h2 className="m-0 font-black text-4xl sm:text-6xl text-[#12301A]">
              Soutenance finale
            </h2>
            <p className="m-0 max-w-2xl font-bold text-base sm:text-lg text-[#4A6350]">
              Un jury de 5 membres, dont un président, sans conflit d'intérêts avec les équipes, évalue 4 critères.
            </p>
          </div>

          {/* 4 Criteria Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col gap-2">
              <span className="font-black text-4xl text-[#1B7A3E]">01</span>
              <h4 className="m-0 font-black text-lg text-[#12301A]">Performance ajustée</h4>
              <p className="m-0 text-sm font-semibold text-[#4A6350]">
                Rendement net pondéré par la volatilité et les risques pris pendant la simulation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col gap-2">
              <span className="font-black text-4xl text-[#1B7A3E]">02</span>
              <h4 className="m-0 font-black text-lg text-[#12301A]">Stratégie défendue</h4>
              <p className="m-0 text-sm font-semibold text-[#4A6350]">
                Logique macroéconomique, cohérence des choix d'arbitrage et hedging.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col gap-2">
              <span className="font-black text-4xl text-[#1B7A3E]">03</span>
              <h4 className="m-0 font-black text-lg text-[#12301A]">Respect des règles</h4>
              <p className="m-0 text-sm font-semibold text-[#4A6350]">
                Limites d'exposition, diversification sectorielle et conformité réglementaire.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col gap-2">
              <span className="font-black text-4xl text-[#1B7A3E]">04</span>
              <h4 className="m-0 font-black text-lg text-[#12301A]">Qualité de présentation</h4>
              <p className="m-0 text-sm font-semibold text-[#4A6350]">
                Clarté des visuels, aisance oratoire et pertinence des réponses aux questions du jury.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
