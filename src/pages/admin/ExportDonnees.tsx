import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Check, Clock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExportDonnees() {
  const [category, setCategory] = useState<string>('Innovation');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Validée', 'Soumise']);
  const [exporting, setExporting] = useState<boolean>(false);

  const statuses = [
    { key: 'Validée', label: 'Validée', color: '#17744B', bg: '#DFF2E7' },
    { key: 'Soumise', label: 'Soumise', color: '#1F4BB8', bg: '#E3EAFB' },
    { key: 'Attente', label: 'En attente', color: '#8A5A00', bg: '#FBEFD2' },
    { key: 'Refusée', label: 'Refusée', color: '#B4281F', bg: '#FBE6E3' },
  ];

  const toggleStatus = (st: string) => {
    setSelectedStatuses(prev =>
      prev.includes(st) ? prev.filter(x => x !== st) : [...prev, st]
    );
  };

  const handleExport = (format: 'xlsx' | 'pdf') => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      const filename = `genie-upb_${category.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.${format}`;
      toast.success(`Fichier ${filename} généré avec succès !`);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. EN-TÊTE & TITRE */}
      <div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
          Génération PCO • R1c
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
          Export pour les PCO
        </h1>
      </div>

      {/* 2. GRILLE CONFIGURATION EXPORT & DERNIER HISTORIQUE (Exact Prototype R1c) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Colonne Gauche : Formulaire de filtrage et d'export */}
        <div className="lg:col-span-2 bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="font-bold text-sm text-[#0E1E4A]">Catégorie</span>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="min-h-[50px] px-4 rounded-xl border border-slate-300 bg-white font-extrabold text-sm text-[#0E1E4A] focus:outline-none"
            >
              <option value="Innovation">Innovation</option>
              <option value="Technologie">Technologie</option>
              <option value="Économie">Économie</option>
              <option value="Droit">Droit</option>
              <option value="Toutes">Toutes les catégories confondues</option>
            </select>
          </label>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm text-[#0E1E4A]">Statuts à inclure</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {statuses.map(st => {
                const active = selectedStatuses.includes(st.key);
                return (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => toggleStatus(st.key)}
                    className={`min-h-[44px] px-4 rounded-full border-[1.5px] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                      active
                        ? 'border-[#0E1E4A] bg-[#0E1E4A] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        active ? 'bg-white text-[#0E1E4A]' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {active ? '✓' : ''}
                    </span>
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleExport('xlsx')}
              disabled={exporting}
              className="flex-1 min-h-[54px] rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:scale-101 active:scale-95 transition-all cursor-pointer disabled:opacity-70"
            >
              <FileSpreadsheet size={18} />
              <span>{exporting ? 'Génération en cours...' : '↓ Exporter en tableur Excel (31 équipes)'}</span>
            </button>

            <button
              onClick={() => handleExport('pdf')}
              disabled={exporting}
              className="min-h-[54px] px-6 rounded-full border-2 border-[#0E1E4A] text-[#0E1E4A] hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileText size={18} />
              <span>Fiches Jury PDF</span>
            </button>
          </div>
        </div>

        {/* Colonne Droite : Carte sombre #0E1E4A du Dernier Export */}
        <div className="rounded-[28px] p-6 sm:p-7 bg-[#0E1E4A] text-white flex flex-col gap-3 shadow-lg">
          <span className="font-mono text-xs font-extrabold text-[#F2C45A] tracking-wider uppercase">
            DERNIER EXPORT
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white leading-tight">
            12 déc. 2026 à 18:04
          </span>
          <p className="text-sm font-medium text-[#C9D1E8] leading-relaxed">
            genie-upb_innovation_2026-12-12.xlsx · 28 équipes · généré par Dr A. Konan
          </p>
          <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-white/70">
            <Clock size={13} />
            <span>Archive disponible sur le serveur central PCO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
