import React from 'react';
import { InnoHero } from '../../../components/categories/innovation/InnoHero';

export default function CategorieInnovation() {
  return (
    <div className="w-full bg-[#B400F0] overflow-x-hidden text-white font-sans">
      {/* 1. HERO INNOVATION (Exact Prototype is.SI) */}
      <InnoHero />

      {/* 2. SI L'ÉPREUVE (Exact Prototype SI L'epreuve) */}
      <section className="relative overflow-hidden bg-[#F4F7FD] text-[#0A1430] px-5 sm:px-10 lg:px-18 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <span className="font-black text-sm uppercase tracking-widest text-[#F58220]">
              L’ÉPREUVE
            </span>
            <div className="flex items-center gap-4 sm:gap-8 my-2">
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider text-[#0A1430]">
                PROBLÈME
              </span>
              <span className="w-12 sm:w-20 h-0.5 bg-[#0A1430]/30" />
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider text-[#E8621A]">
                SOLUTION
              </span>
            </div>
            <h2 className="m-0 font-black text-4xl sm:text-6xl text-[#0A1430]">
              Un vrai problème, <span className="text-[#1D4FD8]">une vraie solution</span>
            </h2>
            <p className="m-0 max-w-2xl font-bold text-base sm:text-lg text-[#3D4459]">
              Les équipes choisissent un problème réel posé par une entreprise partenaire, puis proposent une solution concrète qu’elles défendent devant un jury.
            </p>
          </div>

          {/* En Chiffres Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FF9A3D] to-[#E8621A] text-white flex flex-col justify-between min-h-[200px] shadow-lg">
              <span className="font-bold text-sm opacity-90">environ</span>
              <div className="flex flex-col">
                <span className="font-black text-5xl sm:text-6xl leading-none">12</span>
                <span className="font-extrabold text-lg mt-1">équipes</span>
              </div>
            </div>

            <div className="rounded-3xl p-6 sm:p-8 bg-[#1D4FD8] text-white flex flex-col justify-between min-h-[200px] shadow-lg">
              <span className="font-bold text-sm opacity-90">de</span>
              <div className="flex flex-col">
                <span className="font-black text-5xl sm:text-6xl leading-none">4–6</span>
                <span className="font-extrabold text-lg mt-1">étudiants par équipe</span>
              </div>
            </div>

            <div className="rounded-3xl p-6 sm:p-8 bg-[#0A1430] text-white flex flex-col justify-between min-h-[200px] shadow-lg">
              <span className="font-bold text-sm opacity-90">du 27 au 29 janvier 2027</span>
              <div className="flex flex-col">
                <span className="font-black text-5xl sm:text-6xl leading-none">3</span>
                <span className="font-extrabold text-lg mt-1">jours de concours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SI JURY ET CRITÈRES (Exact Prototype SI Jury et criteres) */}
      <section className="relative overflow-hidden bg-[#0A1430] text-white px-5 sm:px-10 lg:px-18 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-14">
          <div className="flex flex-col items-center gap-3">
            <span className="font-black text-sm uppercase tracking-widest text-[#F58220]">
              L’ÉVALUATION
            </span>
            <h2 className="m-0 font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white">
              Ce que le jury évalue
            </h2>
            <span className="font-extrabold text-base sm:text-lg text-[#BFD6FF] mt-2">
              Un jury de 5 membres
            </span>
            <p className="m-0 max-w-2xl text-sm sm:text-base font-semibold text-[#8EA3D6]">
              2 professionnels des entreprises partenaires · 1 président·e du jury · 2 enseignants ou experts
            </p>
          </div>

          {/* 5 Critères Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: 1, title: 'Innovation', icon: '💡' },
              { id: 2, title: 'Faisabilité technique & financière', icon: '⚙️' },
              { id: 3, title: 'Impact socio-économique', icon: '🌍' },
              { id: 4, title: 'Clarté de la présentation', icon: '🎯' },
              { id: 5, title: 'Viabilité & durabilité', icon: '🌱' },
            ].map((c) => (
              <div
                key={c.id}
                className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur flex flex-col items-center text-center gap-4 shadow-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border border-white/20">
                  {c.icon}
                </div>
                <span className="font-extrabold text-base text-white leading-snug">
                  {c.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
