import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';

export default function StatutCandidature() {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      title: 'Constitution de l’équipe',
      desc: 'Quorum de 4 membres atteint et matricules UPB certifiés.',
      date: '14 Nov. 2026',
      status: 'complete',
    },
    {
      title: 'Signature des chartes & règlements',
      desc: 'Tous les membres de l’équipe ont signé numériquement la charte.',
      date: '14 Nov. 2026',
      status: 'complete',
    },
    {
      title: 'Instruction par la commission scientifique',
      desc: 'Revue de la note d’intention et validation des quotas de la filière Technologie.',
      date: 'En cours d’examen',
      status: 'current',
    },
    {
      title: 'Admission définitive & convocation aux épreuves',
      desc: 'Attribution du numéro officiel de stand pour la compétition de janvier.',
      date: '20 Déc. 2026',
      status: 'upcoming',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
          SUIVI COMMISSION SCIENTIFIQUE
        </span>
        <h1 className="text-3xl font-black text-[#0E1E4A]">Statut de la Candidature</h1>
        <p className="text-sm text-slate-500">
          Suivez en direct l'avancement de l'instruction de votre dossier par le jury.
        </p>
      </div>

      {/* CARTE DE STATUT PRINCIPALE */}
      <div className="bg-[#0E1E4A] text-white rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
            <CheckCircle2 size={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-bold text-[#F58220] uppercase tracking-wider">
              DOSSIER RECEVABLE
            </span>
            <h2 className="text-2xl font-black text-white">Équipe Lagune Tech</h2>
            <span className="text-xs text-slate-300">Dossier #DOS-2026-8841-TECH • Catégorie 01. Technologie</span>
          </div>
        </div>

        <span className="px-4 py-2 rounded-full bg-emerald-500 text-white font-black text-xs shadow-md">
          ÉLIGIBLE FORMATIONS
        </span>
      </div>

      {/* TIMELINE DES ÉTAPES DE VALIDATION */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        <h3 className="font-black text-xl text-[#0E1E4A]">Parcours d'instruction du dossier</h3>

        <div className="relative pl-6 sm:pl-8 flex flex-col gap-8 border-l-2 border-slate-200">
          {steps.map((st, idx) => (
            <div key={idx} className="relative flex flex-col gap-1">
              {/* Pastille sur la ligne verticale */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                  st.status === 'complete'
                    ? 'bg-emerald-500 text-white'
                    : st.status === 'current'
                    ? 'bg-[#2F6BF0] text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {st.status === 'complete' ? '✓' : idx + 1}
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <h4 className="font-extrabold text-base text-[#0E1E4A]">{st.title}</h4>
                <span className="font-mono text-xs font-bold text-slate-400">({st.date})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AVIS DE LA COMMISSION SCIENTIFIQUE */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-[#2F6BF0]" />
          <h3 className="font-black text-lg text-[#0E1E4A]">Observations de la Commission</h3>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-[#1B4DB4] leading-relaxed flex flex-col gap-2">
          <p className="font-bold">« Projet très prometteur sur la gestion hydrique connectée. »</p>
          <p className="text-slate-600">
            La commission valide l'éligibilité technique de votre équipe. Nous vous encourageons à porter une attention particulière à l'autonomie énergétique des capteurs solaires lors des ateliers de formation prévus à partir du 21 décembre.
          </p>
        </div>
      </div>

      {/* Raccourci vers les formations */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h4 className="font-extrabold text-base text-[#0E1E4A]">Préparez vos épreuves</h4>
          <p className="text-xs text-slate-500">Accédez au planning des masterclass et aux supports de cours.</p>
        </div>
        <Link
          to="/espace/formations"
          className="min-h-[44px] px-5 rounded-full bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-sm"
        >
          <span>Espace Formations</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
