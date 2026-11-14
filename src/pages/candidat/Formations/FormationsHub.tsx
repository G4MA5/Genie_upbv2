import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, CheckCircle2, MessageSquare, ArrowRight, Play, Moon, Sparkles } from 'lucide-react';

export default function FormationsHub() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-12">
      {/* 1. ENTÊTE & TITRE */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Espace Candidat • P5
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Formations
          </h1>
        </div>
        <Link
          to="/espace/dashboard"
          className="text-xs font-bold text-slate-500 hover:text-[#0E1E4A] transition-colors flex items-center gap-1.5"
        >
          ← Tableau de bord
        </Link>
      </div>

      {/* 2. BANNIÈRE ALERTE PÉRIODE ALLÉGÉE (Du 24 déc. au 3 janv.) */}
      <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FBEFD2] border border-[#F3DFC1] text-[#7A4F00] shadow-sm">
        <span className="text-xl leading-none mt-0.5 select-none font-black text-[#E8B33D]">☾</span>
        <div className="text-sm leading-relaxed">
          <strong className="font-extrabold text-[#5A3A00]">Du 24 déc. au 3 janv. :</strong> format allégé, séances à distance en fin de journée, disponibles en replay vidéo.
        </div>
      </div>

      {/* 3. PROCHAINE SÉANCE (CARTE BLUEPRINT BLEUE #0E1E4A) */}
      <div
        className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#0E1E4A] text-white p-6 sm:p-8 shadow-xl flex flex-col gap-4"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2C45A] animate-pulse" />
          <span className="font-mono text-xs font-extrabold text-[#F2C45A] tracking-wider uppercase">
            PROCHAINE SÉANCE · JEU. 7 JANV.
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Prototypage rapide et maquettes
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#C9D1E8]">
            09:00 – 12:00 · Fablab, bât. C · Mme Konan
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            to="/espace/formations/visio"
            className="min-h-[46px] px-6 rounded-full bg-[#E8742A] hover:bg-[#D4651D] text-[#0A1430] font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Play size={16} className="fill-[#0A1430]" />
            <span>Voir la séance</span>
          </Link>
          <Link
            to="/espace/formations/planning"
            className="min-h-[46px] px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Voir tout le planning</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 4. GRILLE 2x2 RACCOURCIS BENTO FORMATIONS (P5a, P5b, P5d, P5e) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* P5a Calendrier */}
        <Link
          to="/espace/formations/planning"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between min-h-[120px] group"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl sm:text-4xl font-black text-[#E8742A]">12</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E8742A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="font-extrabold text-base sm:text-lg text-[#0E1E4A] group-hover:text-[#E8742A] transition-colors">
              Calendrier des séances
            </span>
            <span className="text-[#0E1E4A] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* P5b Supports */}
        <Link
          to="/espace/formations/supports"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between min-h-[120px] group"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl sm:text-4xl font-black text-[#E8742A]">8</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E8742A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="font-extrabold text-base sm:text-lg text-[#0E1E4A] group-hover:text-[#E8742A] transition-colors">
              Supports & Replays
            </span>
            <span className="text-[#0E1E4A] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* P5d Assiduité */}
        <Link
          to="/espace/formations/presence"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between min-h-[120px] group"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl sm:text-4xl font-black text-[#17744B]">88 %</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#17744B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="font-extrabold text-base sm:text-lg text-[#0E1E4A] group-hover:text-[#17744B] transition-colors">
              Mon assiduité
            </span>
            <span className="text-[#0E1E4A] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* P5e Annonces */}
        <Link
          to="/espace/formations/annonces"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between min-h-[120px] group"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl sm:text-4xl font-black text-[#E8742A]">2</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E8742A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="font-extrabold text-base sm:text-lg text-[#0E1E4A] group-hover:text-[#E8742A] transition-colors">
              Annonces & Questions
            </span>
            <span className="text-[#0E1E4A] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>
      </div>

      {/* 5. RESSOURCES COMPLÉMENTAIRES & GUIDE */}
      <div className="bg-[#F0F4FC] rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#2F63D0] text-white flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A]">Règlement d'éligibilité aux épreuves</h4>
            <p className="text-xs text-slate-500">Un minimum de 80% d'assiduité est requis pour présenter le projet au jury final.</p>
          </div>
        </div>
        <Link
          to="/espace/formations/presence"
          className="px-4 py-2 rounded-xl bg-white text-[#2F63D0] font-bold text-xs border border-blue-200 hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm"
        >
          Consulter les critères
        </Link>
      </div>
    </div>
  );
}
