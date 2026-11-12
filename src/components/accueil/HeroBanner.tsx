import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0E1E4A] to-[#0A1430] text-white py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8B33D] text-xs font-extrabold uppercase tracking-wider mb-6">
          <Trophy className="w-3.5 h-3.5" />
          <span>Tournoi Inter-Filières UPB 2026-2027</span>
        </div>

        <h1 className="font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mb-6">
          Quatre catégories,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8742A] via-[#E8B33D] to-orange-300">
            un seul grand défi.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-10 leading-relaxed">
          Le concours d'excellence de l'Université Polytechnique de Bingerville. Rejoignez votre filière, formez votre équipe de choc et soutenez votre projet devant le grand jury.
        </p>

        <div className="mb-12">
          <CountdownTimer />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/inscription"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E8742A] hover:bg-[#d4651e] text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Inscrire mon équipe <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/concours"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
          >
            Découvrir les 4 catégories
          </Link>
        </div>

        {/* STATS HERO */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 pt-10 border-t border-white/10 w-full max-w-3xl">
          <div>
            <span className="font-black text-2xl sm:text-3xl text-white block">4</span>
            <span className="text-xs text-slate-400 font-bold uppercase">Catégories</span>
          </div>
          <div>
            <span className="font-black text-2xl sm:text-3xl text-[#E8B33D] block">5 Sem.</span>
            <span className="text-xs text-slate-400 font-bold uppercase">Formations</span>
          </div>
          <div>
            <span className="font-black text-2xl sm:text-3xl text-[#E8742A] block">30 Janv.</span>
            <span className="text-xs text-slate-400 font-bold uppercase">Grande Finale</span>
          </div>
        </div>
      </div>
    </section>
  );
};
