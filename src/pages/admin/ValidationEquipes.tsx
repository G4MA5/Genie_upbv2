import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Clock, Eye, SlidersHorizontal, Search, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamRow {
  id: string;
  initials: string;
  name: string;
  category: string;
  membersCount: number;
  submittedAt: string;
  status: 'Soumise' | 'Validée' | 'Attente' | 'Refusée';
  c: string;
  fc: string;
}

export default function ValidationEquipes() {
  const [selectedStatus, setSelectedStatus] = useState<string>('Toutes');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [teams, setTeams] = useState<TeamRow[]>([
    {
      id: '1',
      initials: 'LB',
      name: 'Les Bâtisseurs',
      category: 'Innovation',
      membersCount: 5,
      submittedAt: '16 déc. 2026 à 21:14',
      status: 'Soumise',
      c: '#DCE7FF',
      fc: '#1D4FD8',
    },
    {
      id: '2',
      initials: 'NS',
      name: 'NeoSahel',
      category: 'Innovation',
      membersCount: 4,
      submittedAt: '15 déc. 2026 à 18:30',
      status: 'Soumise',
      c: '#2F63D0',
      fc: '#ffffff',
    },
    {
      id: '3',
      initials: 'LG',
      name: 'Lagune Lab',
      category: 'Technologie',
      membersCount: 6,
      submittedAt: '3 déc. 2026 à 10:15',
      status: 'Validée',
      c: '#E8742A',
      fc: '#ffffff',
    },
    {
      id: '4',
      initials: 'KA',
      name: 'Kaïros',
      category: 'Innovation',
      membersCount: 4,
      submittedAt: '1 déc. 2026 à 14:00',
      status: 'Attente',
      c: '#0E1E4A',
      fc: '#ffffff',
    },
    {
      id: '5',
      initials: 'AM',
      name: 'Abidjan Makers',
      category: 'Droit',
      membersCount: 5,
      submittedAt: '28 nov. 2026 à 16:45',
      status: 'Validée',
      c: '#BE185D',
      fc: '#ffffff',
    },
    {
      id: '6',
      initials: 'KP',
      name: 'Kora Project',
      category: 'Économie',
      membersCount: 4,
      submittedAt: '25 nov. 2026 à 09:20',
      status: 'Validée',
      c: '#0D9488',
      fc: '#ffffff',
    },
  ]);

  const handleQuickValidate = (id: string, name: string) => {
    setTeams(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'Validée' } : t))
    );
    toast.success(`Équipe "${name}" validée avec succès !`);
  };

  const filteredTeams = teams.filter(t => {
    const matchStatus = selectedStatus === 'Toutes' || t.status === selectedStatus;
    const matchCategory = selectedCategory === 'Toutes' || t.category === selectedCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-6xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. EN-TÊTE & TITRE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Modération • R1
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Équipes à valider
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-[#E3EAFB] text-[#1F4BB8] font-bold text-xs font-mono">
            {teams.filter(t => t.status === 'Soumise').length} en attente de décision
          </span>
        </div>
      </div>

      {/* 2. FILTRES MULTI-CRITÈRES */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filtre par statut */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {['Toutes', 'Soumise', 'Validée', 'Attente', 'Refusée'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === st
                  ? 'bg-[#0E1E4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Filtre par catégorie & recherche */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="Toutes">Toutes les catégories</option>
            <option value="Technologie">Technologie</option>
            <option value="Innovation">Innovation</option>
            <option value="Économie">Économie</option>
            <option value="Droit">Droit</option>
          </select>

          <input
            type="text"
            placeholder="Filtrer..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-32 sm:w-40 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
          />
        </div>
      </div>

      {/* 3. TABLEAU / CARTES DES ÉQUIPES */}
      <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm divide-y divide-slate-100">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500 uppercase">
          <span>Équipe & Catégorie</span>
          <span className="hidden sm:inline">Soumission</span>
          <span>Statut & Actions</span>
        </div>

        {filteredTeams.map(t => (
          <div
            key={t.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs"
                style={{ backgroundColor: t.c, color: t.fc }}
              >
                {t.initials}
              </div>

              <div className="flex flex-col min-w-0">
                <Link
                  to={`/admin/equipes/${t.id}`}
                  className="font-extrabold text-base text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors truncate"
                >
                  {t.name}
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-bold text-[#E8742A]">{t.category}</span>
                  <span>•</span>
                  <span>{t.membersCount} membres</span>
                </div>
              </div>
            </div>

            <span className="hidden sm:inline text-xs font-mono text-slate-500">
              {t.submittedAt}
            </span>

            <div className="flex items-center gap-2.5 self-end sm:self-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  t.status === 'Validée'
                    ? 'bg-emerald-50 text-emerald-700'
                    : t.status === 'Soumise'
                    ? 'bg-blue-50 text-[#1D4FD8]'
                    : t.status === 'Attente'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {t.status}
              </span>

              {t.status === 'Soumise' && (
                <button
                  onClick={() => handleQuickValidate(t.id, t.name)}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  title="Valider immédiatement"
                >
                  <Check size={13} strokeWidth={3} />
                  <span>Valider</span>
                </button>
              )}

              <Link
                to={`/admin/equipes/${t.id}`}
                className="px-3 py-1 rounded-xl bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-bold text-xs flex items-center gap-1 transition-colors"
                title="Consulter la fiche complète"
              >
                <Eye size={13} />
                <span>Fiche</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
