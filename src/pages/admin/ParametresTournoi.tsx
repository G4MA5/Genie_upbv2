import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Calendar, Save, CheckCircle2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ParametresTournoi() {
  const [inscriptionsOpen, setInscriptionsOpen] = useState<boolean>(true);
  const [deadline, setDeadline] = useState<string>('2026-12-18');
  const [minAttendance, setMinAttendance] = useState<number>(80);
  const [juryPin, setJuryPin] = useState<string>('UPB-JURY-2027');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Paramètres du tournoi mis à jour avec succès !');
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. EN-TÊTE & TITRE */}
      <div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
          Configuration • R-Cfg
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
          Paramètres du Tournoi
        </h1>
      </div>

      {/* 2. FORMULAIRE DE PARAMÉTRAGE OFFICIEL */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Phase des Inscriptions */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
          <h3 className="font-black text-lg text-[#0E1E4A] flex items-center gap-2">
            <Calendar size={18} className="text-[#2F6BF0]" />
            <span>Phase et Calendrier Officiel</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F6F8FC] border border-slate-200/60">
            <div>
              <span className="font-extrabold text-sm text-[#0E1E4A] block">
                Statut des inscriptions en ligne
              </span>
              <span className="text-xs text-slate-500">
                Active ou désactive le formulaire d'inscription sur le portail public.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setInscriptionsOpen(!inscriptionsOpen)}
              className={`min-h-[42px] px-5 rounded-full font-black text-xs transition-all cursor-pointer ${
                inscriptionsOpen
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-red-600 text-white'
              }`}
            >
              {inscriptionsOpen ? 'Inscriptions Ouvertes' : 'Inscriptions Closes'}
            </button>
          </div>

          <label className="flex flex-col gap-1.5 pt-1">
            <span className="font-bold text-xs text-[#0E1E4A]">Date limite de clôture</span>
            <input
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="min-h-[46px] px-4 rounded-xl border border-slate-300 font-mono text-sm text-[#0E1E4A] bg-white max-w-xs focus:outline-none"
            />
          </label>
        </div>

        {/* Règles d'Assiduité et Éligibilité */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
          <h3 className="font-black text-lg text-[#0E1E4A] flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Critères d'Éligibilité au Grand Jury</span>
          </h3>

          <label className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-[#0E1E4A]">
                Seuil minimum d'assiduité requis
              </span>
              <span className="font-black text-base text-[#17744B] font-mono">
                {minAttendance} %
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              step={5}
              value={minAttendance}
              onChange={e => setMinAttendance(Number(e.target.value))}
              className="w-full accent-[#0E1E4A] cursor-pointer"
            />
            <span className="text-xs text-slate-400">
              Les équipes dont l'assiduité est inférieure à ce seuil seront déclarées inéligibles pour la soutenance finale.
            </span>
          </label>
        </div>

        {/* Codes d'accès Jury & Sécurité */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
          <h3 className="font-black text-lg text-[#0E1E4A] flex items-center gap-2">
            <Key size={18} className="text-[#E8742A]" />
            <span>Sécurité & Accès PCO / Jurys</span>
          </h3>

          <label className="flex flex-col gap-1.5">
            <span className="font-bold text-xs text-[#0E1E4A]">Code d'invitation jury</span>
            <input
              type="text"
              value={juryPin}
              onChange={e => setJuryPin(e.target.value)}
              className="min-h-[46px] px-4 rounded-xl border border-slate-300 font-mono text-sm text-[#0E1E4A] bg-white max-w-sm focus:outline-none"
            />
          </label>
        </div>

        {/* Bouton de sauvegarde */}
        <button
          type="submit"
          className="self-end min-h-[50px] px-8 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-lg hover:scale-101 active:scale-95 transition-all cursor-pointer"
        >
          <Save size={18} />
          <span>Enregistrer les paramètres</span>
        </button>
      </form>
    </div>
  );
}
