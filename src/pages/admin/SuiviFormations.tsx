import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, CheckCircle2, AlertTriangle, Users, Search, ChevronRight } from 'lucide-react';

interface TeamAttendanceRow {
  team: string;
  rate: number;
  missed: number;
  color: string;
}

export default function SuiviFormations() {
  const [activeTab, setActiveTab] = useState<'hub' | 'planning' | 'supports' | 'assiduite'>('hub');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterThreshold, setFilterThreshold] = useState<string>('all');

  const upcomingSessions = [
    { day: 'Auj.', time: '09:00', title: 'Prototypage rapide et maquettes', room: 'Fablab, bât. C · Mme Konan' },
    { day: 'Mar. 12', time: '14:00', title: 'Préparer sa démo & crash test', room: 'Salle 12 · M. Diallo' },
    { day: 'Jeu. 14', time: '17:00', title: 'Pitch blanc devant jurys mentors', room: 'À distance (Visio Teams)' },
  ];

  const teamAttendanceList: TeamAttendanceRow[] = [
    { team: 'Les Bâtisseurs', rate: 88, missed: 1, color: '#17744B' },
    { team: 'Lagune Lab', rate: 85, missed: 1, color: '#17744B' },
    { team: 'NeoSahel', rate: 74, missed: 2, color: '#E8B33D' },
    { team: 'Kaïros', rate: 68, missed: 3, color: '#B4281F' },
    { team: 'Abidjan Makers', rate: 64, missed: 3, color: '#B4281F' },
    { team: 'Kora Project', rate: 92, missed: 0, color: '#17744B' },
  ];

  const filteredAttendance = teamAttendanceList.filter(t => {
    const matchSearch = t.team.toLowerCase().includes(searchQuery.toLowerCase());
    const matchThreshold = filterThreshold === 'under75' ? t.rate < 75 : true;
    return matchSearch && matchThreshold;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. EN-TÊTE & TITRE AVEC TABS DE NAVIGATION (R2, R2a, R2b, R2c) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Coordination • R2
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Suivi des Formations
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-[#F6F7FA] p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('hub')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hub' ? 'bg-[#0E1E4A] text-white shadow-xs' : 'text-slate-600 hover:text-[#0E1E4A]'
            }`}
          >
            Vue globale
          </button>
          <button
            onClick={() => setActiveTab('assiduite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'assiduite' ? 'bg-[#0E1E4A] text-white shadow-xs' : 'text-slate-600 hover:text-[#0E1E4A]'
            }`}
          >
            Assiduité (R2c)
          </button>
        </div>
      </div>

      {activeTab === 'hub' ? (
        /* VUE GLOBALE R2 */
        <div className="flex flex-col gap-6">
          {/* Grille 2 colonnes : Prochaines séances & Jauge Assiduité Catégorie */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Prochaines séances (3 colonnes) */}
            <div className="lg:col-span-3 bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col gap-3">
              <h3 className="font-black text-lg text-[#0E1E4A] mb-1">
                Prochaines séances
              </h3>

              <div className="divide-y divide-slate-100">
                {upcomingSessions.map((s, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-4">
                    <span className="font-mono font-bold text-xs text-[#2F6BF0] shrink-0 w-20">
                      {s.day} {s.time}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-extrabold text-sm text-[#0E1E4A] truncate">
                        {s.title}
                      </span>
                      <span className="text-xs text-slate-400 truncate">
                        {s.room}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jauge globale catégorie (2 colonnes) - Exact Prototype R2 */}
            <div className="lg:col-span-2 bg-[#0E1E4A] text-white rounded-[24px] p-6 shadow-sm flex flex-col justify-between gap-4">
              <span className="font-mono text-xs font-bold text-[#F2C45A] uppercase tracking-wider">
                ASSIDUITÉ DE LA CATÉGORIE
              </span>

              <div className="flex flex-col gap-2">
                <span className="text-5xl sm:text-6xl font-black text-white leading-none">
                  82 %
                </span>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full rounded-full bg-[#F2C45A] w-[82%]" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#C9D1E8]">
                <AlertTriangle size={14} className="text-amber-400" />
                <span>2 équipes actuellement sous le seuil de 70 %</span>
              </div>
            </div>
          </div>

          {/* Grille 3 Raccourcis Sous-Sections (R2a, R2b, R2c) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold text-[#2F6BF0]">R2a</span>
              <h4 className="font-black text-lg text-[#0E1E4A]">Planning</h4>
              <span className="text-xs text-slate-400">12 séances programmées</span>
            </div>

            <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold text-[#2F6BF0]">R2b</span>
              <h4 className="font-black text-lg text-[#0E1E4A]">Supports</h4>
              <span className="text-xs text-slate-400">8 supports publiés</span>
            </div>

            <button
              onClick={() => setActiveTab('assiduite')}
              className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm flex flex-col gap-1.5 text-left hover:border-blue-200 transition-colors cursor-pointer group"
            >
              <span className="font-mono text-xs font-bold text-[#2F6BF0]">R2c</span>
              <h4 className="font-black text-lg text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors flex items-center justify-between">
                <span>Assiduité</span>
                <ChevronRight size={16} />
              </h4>
              <span className="text-xs text-slate-400">Suivi individuel par équipe</span>
            </button>
          </div>
        </div>
      ) : (
        /* VUE ASSIDUITÉ PAR ÉQUIPE R2c (Exact Prototype R2c) */
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0E1E4A]">
              Assiduité par équipe
            </h2>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Rechercher une équipe..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-medium focus:outline-none bg-white"
              />

              <button
                onClick={() => setFilterThreshold(prev => (prev === 'all' ? 'under75' : 'all'))}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                  filterThreshold === 'under75'
                    ? 'bg-[#0E1E4A] text-white border-[#0E1E4A]'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                {filterThreshold === 'under75' ? 'Filtre : < 75%' : 'Tous les taux'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm divide-y divide-slate-100">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500 uppercase">
              <span className="w-48">Équipe</span>
              <span className="flex-1 px-4">Taux de présence</span>
              <span className="w-24 text-right">Manquées</span>
            </div>

            {filteredAttendance.map((t, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50">
                <span className="font-extrabold text-sm text-[#0E1E4A] w-48 truncate">
                  {t.team}
                </span>

                <div className="flex-1 flex items-center gap-3 px-4">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${t.rate}%`, backgroundColor: t.color }}
                    />
                  </div>
                  <span className="font-black text-sm w-12 text-right" style={{ color: t.color }}>
                    {t.rate}%
                  </span>
                </div>

                <span className="font-bold text-xs text-slate-600 w-24 text-right font-mono">
                  {t.missed} séance{t.missed > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
