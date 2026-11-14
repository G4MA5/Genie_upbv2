import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sliders, Users, AlertCircle, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface WaitlistTeam {
  rank: number;
  name: string;
  category: string;
  membersSummary: string;
  date: string;
  id: string;
}

export default function GestionQuotas() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Innovation');

  const [quotas, setQuotas] = useState({
    total: 12,
    taken: 9,
    waitlistCount: 4,
  });

  const [waitlist, setWaitlist] = useState<WaitlistTeam[]>([
    {
      rank: 1,
      name: 'Kaïros',
      category: 'Innovation',
      membersSummary: '4 membres · L3 Tech + L2 Eco',
      date: '1 déc. 2026',
      id: '4',
    },
    {
      rank: 2,
      name: 'Abidjan Makers',
      category: 'Innovation',
      membersSummary: '5 membres · L3 Droit + L3 Info',
      date: '28 nov. 2026',
      id: '5',
    },
    {
      rank: 3,
      name: 'InnoTech CI',
      category: 'Innovation',
      membersSummary: '4 membres · L2 Tech + L3 Agro',
      date: '26 nov. 2026',
      id: '7',
    },
    {
      rank: 4,
      name: 'NovaTeam',
      category: 'Innovation',
      membersSummary: '6 membres · Pluridisciplinaire',
      date: '24 nov. 2026',
      id: '8',
    },
  ]);

  const handlePromote = (team: WaitlistTeam) => {
    if (quotas.taken >= quotas.total) {
      toast.error('Capacité maximale atteinte ! Augmentez le quota pour intégrer cette équipe.');
      return;
    }
    setWaitlist(prev => prev.filter(t => t.id !== team.id));
    setQuotas(prev => ({
      ...prev,
      taken: prev.taken + 1,
      waitlistCount: prev.waitlistCount - 1,
    }));
    toast.success(`Équipe "${team.name}" promue dans le tournoi officiel !`);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. EN-TÊTE & TITRE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Capacités • R1b
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Quotas et liste d'attente
          </h1>
        </div>

        {/* Sélecteur de catégorie */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-extrabold text-xs text-[#0E1E4A] shadow-xs focus:outline-none"
        >
          <option value="Innovation">Catégorie Innovation</option>
          <option value="Technologie">Catégorie Technologie</option>
          <option value="Économie">Catégorie Économie</option>
          <option value="Droit">Catégorie Droit</option>
        </select>
      </div>

      {/* 2. GRAND PANNEAU KPI QUOTA & JAUGE (Exact Prototype R1b) */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Grande jauge circulaire 180x180 */}
        <div
          className="w-44 h-44 rounded-full flex items-center justify-center shrink-0 shadow-inner"
          style={{
            background: 'conic-gradient(#F58220 0 75%, #EEECE6 75%)',
          }}
        >
          <div className="w-34 h-34 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-[#0E1E4A] leading-tight">
              {quotas.taken}/{quotas.total}
            </span>
            <span className="text-xs font-semibold text-[#6A7189]">places prises</span>
          </div>
        </div>

        {/* 3 Métriques clés */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-4xl sm:text-5xl font-black text-[#0E1E4A]">
              {quotas.total}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6A7189]">
              places au total
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-4xl sm:text-5xl font-black text-[#F58220]">
              {quotas.total - quotas.taken}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6A7189]">
              places restantes
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-4xl sm:text-5xl font-black text-[#8A5A00]">
              {waitlist.length}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6A7189]">
              en liste d'attente
            </span>
          </div>
        </div>
      </div>

      {/* 3. LISTE DES ÉQUIPES EN ATTENTE (Exact Prototype R1b) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-[#0E1E4A]">
            Ordre de priorité en liste d'attente
          </h2>
          <span className="text-xs font-mono font-bold text-slate-400">
            Automatique selon la date de soumission
          </span>
        </div>

        <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm divide-y divide-slate-100">
          {waitlist.map((w, index) => (
            <div
              key={w.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-10 h-10 rounded-full bg-[#FBEFD2] text-[#8A5A00] font-black text-sm flex items-center justify-center shrink-0">
                  #{index + 1}
                </span>

                <div className="flex flex-col min-w-0">
                  <Link
                    to={`/admin/equipes/${w.id}`}
                    className="font-extrabold text-base text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors truncate"
                  >
                    {w.name}
                  </Link>
                  <span className="text-xs text-[#4A5168] truncate">
                    {w.membersSummary}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xs font-mono text-[#6A7189]">
                  {w.date}
                </span>

                <button
                  onClick={() => handlePromote(w)}
                  className="px-3.5 py-1.5 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-bold text-xs transition-colors cursor-pointer"
                  title="Promouvoir l'équipe dans le quota principal"
                >
                  Intégrer →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
