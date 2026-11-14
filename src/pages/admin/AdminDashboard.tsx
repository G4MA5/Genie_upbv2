import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle2, Clock, BarChart2, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface AdminTeam {
  id: string;
  initials: string;
  name: string;
  meta: string;
  status: 'Soumise' | 'Validée' | 'Attente' | 'Rejetée';
  c: string;
  fc: string;
  sb: string;
  sf: string;
}

export default function AdminDashboard() {
  const [filter, setFilter] = useState<string>('Toutes');

  const teams: AdminTeam[] = [
    {
      id: '1',
      initials: 'LB',
      name: 'Les Bâtisseurs',
      meta: '5 membres · il y a 2 h',
      status: 'Soumise',
      c: '#DCE7FF',
      fc: '#1D4FD8',
      sb: '#E3EAFB',
      sf: '#1F4BB8',
    },
    {
      id: '2',
      initials: 'NS',
      name: 'NeoSahel',
      meta: '4 membres · hier',
      status: 'Soumise',
      c: '#2F63D0',
      fc: '#ffffff',
      sb: '#E3EAFB',
      sf: '#1F4BB8',
    },
    {
      id: '3',
      initials: 'LG',
      name: 'Lagune Lab',
      meta: '6 membres · 3 déc.',
      status: 'Validée',
      c: '#E8742A',
      fc: '#ffffff',
      sb: '#DFF2E7',
      sf: '#17744B',
    },
    {
      id: '4',
      initials: 'KA',
      name: 'Kaïros',
      meta: '4 membres · 1 déc.',
      status: 'Attente',
      c: '#0E1E4A',
      fc: '#ffffff',
      sb: '#FBEFD2',
      sf: '#8A5A00',
    },
  ];

  const filteredTeams = teams.filter(t => (filter === 'Toutes' ? true : t.status === filter));

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-6xl mx-auto w-full animate-fadeIn pb-12">
      {/* 1. TITRE DE LA PAGE */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A1430] tracking-tight">
          Vue d'ensemble
        </h1>
        <span className="font-mono text-xs font-bold text-slate-400">
          PROMOTION 2026-2027
        </span>
      </div>

      {/* 2. BANNIÈRE BLUEPRINT BLEUE #2F63D0 (Exact Prototype R1) */}
      <div
        className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#2F63D0] text-white p-6 sm:p-9 shadow-lg flex flex-col justify-center gap-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.16) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
      >
        <span className="self-start px-4 py-1.5 rounded-full bg-white text-[#1D4FD8] font-black text-xl sm:text-2xl shadow-md">
          12 équipes à valider
        </span>

        <p className="font-medium text-sm sm:text-base text-white/90 max-w-lg leading-relaxed">
          Catégorie Innovation · les validations de dossiers sont ouvertes jusqu'au 18 décembre.
        </p>

        <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#E8742A] text-white flex items-center justify-center font-black text-base shadow-sm">
              ◎
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white leading-tight">Équipes</span>
              <span className="font-bold text-xs text-[#D5E0F7]">18 inscrites</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#DCE7FF] text-[#1D4FD8] flex items-center justify-center font-black text-base shadow-sm">
              ▲
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white leading-tight">Places</span>
              <span className="font-bold text-xs text-[#D5E0F7]">3 restantes sur 12</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BENTO EN 2 COLONNES : ÉQUIPES À VALIDER & ACTIVITÉ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne Gauche : Équipes à valider */}
        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-[#0A1430]">Équipes à valider</h3>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Toutes">Toutes les équipes</option>
              <option value="Soumise">Soumises</option>
              <option value="Validée">Validées</option>
              <option value="Attente">En attente</option>
            </select>
          </div>

          <div className="bg-[#F6F7FA] rounded-[24px] p-2.5 flex flex-col gap-2">
            {filteredTeams.map(t => (
              <Link
                key={t.id}
                to={`/admin/equipes/${t.id}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white hover:shadow-md hover:translate-x-1 transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs"
                  style={{ backgroundColor: t.c, color: t.fc }}
                >
                  {t.initials}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-sm text-[#0A1430] group-hover:text-[#2F6BF0] transition-colors truncate">
                    {t.name}
                  </span>
                  <span className="text-xs text-[#8A8FA3] truncate">
                    {t.meta}
                  </span>
                </div>

                <span
                  className="px-3 py-1 rounded-xl font-bold text-xs shrink-0"
                  style={{ backgroundColor: t.sb, color: t.sf }}
                >
                  {t.status}
                </span>
              </Link>
            ))}
          </div>

          <Link
            to="/admin/equipes"
            className="text-xs font-bold text-[#2F6BF0] hover:underline self-end pt-1 flex items-center gap-1"
          >
            <span>Voir toute la liste ({teams.length} équipes)</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Colonne Droite : Activité & KPIs */}
        <div className="flex flex-col gap-4 min-w-0">
          <h3 className="font-black text-lg text-[#0A1430]">Activité du tournoi</h3>

          {/* Graphique hebdomadaire sombre #0A1430 */}
          <div className="rounded-[24px] p-5 bg-[#0A1430] text-white flex flex-col gap-2 shadow-sm">
            <span className="font-black text-base">Soumissions par semaine</span>
            <span className="text-xs text-[#AEB8D6] font-mono">
              Depuis l'ouverture officielle le 23 nov. 2026
            </span>

            {/* Bâtons du graphique */}
            <div className="h-24 flex items-end gap-3 pt-3">
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full rounded-t-lg bg-white/20 h-[30%]" />
                <span className="text-[10px] text-slate-400 font-mono">S1</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full rounded-t-lg bg-white/20 h-[55%]" />
                <span className="text-[10px] text-slate-400 font-mono">S2</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full rounded-t-lg bg-white/20 h-[45%]" />
                <span className="text-[10px] text-slate-400 font-mono">S3</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full rounded-t-lg bg-[#5B9BFF] h-[90%] shadow-md" />
                <span className="text-[10px] text-[#5B9BFF] font-bold font-mono">S4</span>
              </div>
            </div>
          </div>

          {/* 2 Cartes Raccourcis Rapides */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/quotas"
              className="rounded-[24px] p-5 bg-[#E3ECFF] hover:bg-[#D5E4FF] transition-all flex flex-col gap-1 group shadow-xs hover:-translate-y-0.5"
            >
              <span className="font-black text-3xl text-[#0A1430]">3</span>
              <span className="font-bold text-xs text-[#4A3A00]">
                En liste d'attente →
              </span>
            </Link>

            <Link
              to="/admin/formations"
              className="rounded-[24px] p-5 bg-[#E8742A] hover:bg-[#D4651D] text-white transition-all flex flex-col gap-1 group shadow-xs hover:-translate-y-0.5"
            >
              <span className="font-black text-3xl text-[#0A1430]">88%</span>
              <span className="font-bold text-xs text-[#3A1A06]">
                Taux d'assiduité →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
