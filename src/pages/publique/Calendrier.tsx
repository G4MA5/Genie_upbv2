import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import lieuImg from '../../assets/images/44e0b199.png';
import progImg from '../../assets/images/0f212a34.png';

export default function Calendrier() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const milestones = [
    {
      dates: '23 Nov. — 18 Déc. 2026',
      badge: 'Inscriptions',
      color: '#2F63D0',
      bg: '#DCE7FB',
      title: 'Ouverture des inscriptions & constitution des équipes',
      desc: 'Formez une équipe de 4 à 6 étudiants par catégorie, complétez vos dossiers et déposez votre note d’intention.',
      lieu: 'Plateforme en ligne GÉNIE UPB',
    },
    {
      dates: '21 Déc. 2026 — 24 Janv. 2027',
      badge: 'Formations',
      color: '#E8B33D',
      bg: '#FFF3C2',
      title: '5 semaines de formations certifiantes intensives',
      desc: 'Masterclass hebdomadaires dispensées par des experts professionnels : prototypage IoT, pitch deck, procès simulé et finance de marché.',
      lieu: 'UPB Amphi A & En visio interactive',
    },
    {
      dates: '27 — 29 Janvier 2027',
      badge: 'Le Concours',
      color: '#E8742A',
      bg: '#FFE0CC',
      title: 'Les 3 Jours d’Épreuves Non-Stop',
      desc: 'Conception, simulations en temps réel, joutes juridiques et démonstrations techniques devant les jurys officiels.',
      lieu: 'Campus UPB · Laboratoires & Salle des Thèses',
    },
    {
      dates: '30 Janvier 2027',
      badge: 'Grande Finale',
      color: '#0A1430',
      bg: '#E2E8F0',
      title: 'Cérémonie de Clôture & Remise des Prix',
      desc: 'Grande finale en direct, remise des trophées, bourses d’incubation et cocktail de gala en présence des partenaires.',
      lieu: 'Palais des Congrès / Grand Amphi UPB',
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEF3FB] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* CARTE BLANCHE CENTRALE (Style Authentique Prototype) */}
        <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 shadow-[0_30px_70px_rgba(14,30,74,0.08)] flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-slate-100 pb-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#2F63D0] uppercase">
                CALENDRIER OFFICIEL
              </span>
              <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-[#0A1430] tracking-tight leading-tight">
                De l'inscription à la finale
              </h1>
              <p className="text-sm sm:text-base text-[#4A5168] max-w-xl">
                Suivez toutes les étapes clés du tournoi GÉNIE UPB 2026-2027 et préparez votre équipe pour chaque échéance.
              </p>
            </div>

            <Link
              to="/inscription"
              className="shrink-0 min-h-[50px] px-7 rounded-full bg-[#0A1430] hover:bg-[#0E1E4A] text-white font-extrabold text-[15px] flex items-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <span>S'inscrire</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* LÉGENDE DES COULEURS OFFICIELLES */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-bold">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DCE7FB] text-[#2F63D0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F63D0]" />
              Inscriptions (23 nov - 18 déc)
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF3C2] text-[#8A6A20]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8B33D]" />
              Formations (21 déc - 24 janv)
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFE0CC] text-[#E8742A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8742A]" />
              Épreuves (27 - 29 janv)
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[#0A1430]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A1430]" />
              Clôture (30 janv)
            </span>
          </div>

          {/* LES 3 MOIS DU TOURNOI DANS UNE GRILLE RESPONSIVE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. NOVEMBRE 2026 */}
            <div className="bg-[#FAFBFD] rounded-[24px] p-5 border border-slate-200/70 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                <span className="font-extrabold text-lg text-[#0A1430]">
                  Novembre <span className="font-medium text-slate-400">2026</span>
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#DCE7FB] text-[#2F63D0]">
                  Phase 1
                </span>
              </div>
              <div className="grid grid-cols-7 text-center font-bold text-xs text-slate-400 mb-1">
                <span>Lu</span><span>Ma</span><span>Me</span><span>Je</span><span>Ve</span><span>Sa</span><span>Di</span>
              </div>
              <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-bold">
                {/* 1er au 22 */}
                <span className="col-start-7 p-2 text-slate-400">1</span>
                {[...Array(21)].map((_, i) => (
                  <span key={i} className="p-2 text-slate-500">{i + 2}</span>
                ))}
                {/* 23 au 30 : Période inscriptions en bleu */}
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] rounded-l-full font-black">23</span>
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] font-black">24</span>
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] font-black">25</span>
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] font-black">26</span>
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] font-black">27</span>
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] font-black">28</span>
                <span className="p-2 bg-[#DCE7FB] text-[#2F63D0] rounded-r-full font-black">29</span>
                <span className="p-2 bg-[#2F63D0] text-white rounded-full font-black">30</span>
              </div>
            </div>

            {/* 2. DÉCEMBRE 2026 */}
            <div className="bg-[#FAFBFD] rounded-[24px] p-5 border border-slate-200/70 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                <span className="font-extrabold text-lg text-[#0A1430]">
                  Décembre <span className="font-medium text-slate-400">2026</span>
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FFF3C2] text-[#8A6A20]">
                  Phase 2
                </span>
              </div>
              <div className="grid grid-cols-7 text-center font-bold text-xs text-slate-400 mb-1">
                <span>Lu</span><span>Ma</span><span>Me</span><span>Je</span><span>Ve</span><span>Sa</span><span>Di</span>
              </div>
              <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-bold">
                {/* 1 au 18 : Inscriptions (bleu) */}
                <span className="col-start-2 p-2 bg-[#DCE7FB] text-[#2F63D0] rounded-l-full font-black">1</span>
                {[...Array(16)].map((_, i) => (
                  <span key={i} className="p-2 bg-[#DCE7FB] text-[#2F63D0] font-black">{i + 2}</span>
                ))}
                <span className="p-2 bg-[#2F63D0] text-white rounded-r-full font-black">18</span>
                <span className="p-2 text-slate-400">19</span>
                <span className="p-2 text-slate-400">20</span>
                {/* 21 au 31 : Formations (or) */}
                <span className="p-2 bg-[#E8B33D] text-white rounded-l-full font-black">21</span>
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="p-2 bg-[#FFF3C2] text-[#8A6A20] font-black">{i + 22}</span>
                ))}
                <span className="p-2 bg-[#FFF3C2] text-[#8A6A20] rounded-r-full font-black">31</span>
              </div>
            </div>

            {/* 3. JANVIER 2027 */}
            <div className="bg-[#FAFBFD] rounded-[24px] p-5 border border-slate-200/70 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                <span className="font-extrabold text-lg text-[#0A1430]">
                  Janvier <span className="font-medium text-slate-400">2027</span>
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FFE0CC] text-[#E8742A]">
                  Finales
                </span>
              </div>
              <div className="grid grid-cols-7 text-center font-bold text-xs text-slate-400 mb-1">
                <span>Lu</span><span>Ma</span><span>Me</span><span>Je</span><span>Ve</span><span>Sa</span><span>Di</span>
              </div>
              <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-bold">
                {/* 1 au 24 : Fin des formations */}
                <span className="col-start-5 p-2 bg-[#FFF3C2] text-[#8A6A20] font-black">1</span>
                <span className="p-2 bg-[#FFF3C2] text-[#8A6A20] font-black">2</span>
                <span className="p-2 bg-[#FFF3C2] text-[#8A6A20] font-black">3</span>
                {[...Array(21)].map((_, i) => (
                  <span key={i} className="p-2 bg-[#FFF3C2] text-[#8A6A20] font-black">{i + 4}</span>
                ))}
                <span className="p-2 text-slate-400">25</span>
                <span className="p-2 text-slate-400">26</span>
                {/* 27 au 29 : Concours (orange) */}
                <span className="p-2 bg-[#E8742A] text-white rounded-l-full font-black">27</span>
                <span className="p-2 bg-[#FFE0CC] text-[#E8742A] font-black">28</span>
                <span className="p-2 bg-[#FFE0CC] text-[#E8742A] rounded-r-full font-black">29</span>
                {/* 30 : Clôture (noir/or) */}
                <span className="p-2 bg-[#0A1430] text-white rounded-full font-black">30</span>
                <span className="p-2 text-slate-400">31</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION LIEU & ÉTAPE CLÉS (2 Colonnes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carte Lieu UPB Bingerville */}
          <div className="relative rounded-[32px] overflow-hidden min-h-[360px] bg-[#0A1430] shadow-md flex flex-col justify-end p-6 sm:p-8">
            <div
              style={{ backgroundImage: `url(${lieuImg})` }}
              className="absolute inset-0 bg-cover bg-[center_35%] transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1430] via-[#0A1430]/70 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-2 text-white">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#A9C2FF] uppercase tracking-wider">
                  LIEU OFFICIEL DU TOURNOI
                </span>
                <MapPin size={15} className="text-[#F58220]" />
              </div>
              <h2 className="font-black text-2xl sm:text-3xl text-white leading-tight">
                Université Polytechnique de Bingerville (UPB)
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Campus Universitaire · Grand Amphithéâtre & Pôles de Recherches Avancées. Route Principale de Bingerville, Abidjan.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-[#F58220]">
                <span>Navettes gratuites depuis Abidjan</span>
                <span>•</span>
                <span>Parking sécurisé</span>
              </div>
            </div>
          </div>

          {/* Carte Milestones & Programme Détaillé */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#2F6BF0]" />
              <h3 className="font-black text-xl text-[#0E1E4A]">Les 4 Étapes Fondamentales</h3>
            </div>

            <div className="flex flex-col gap-3">
              {milestones.map((m, idx) => (
                <div
                  key={m.badge}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedMilestone === idx
                      ? 'bg-slate-50 border-[#2F6BF0] shadow-sm'
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      style={{ color: m.color }}
                      className="font-mono font-bold text-xs"
                    >
                      {m.dates}
                    </span>
                    <span
                      style={{ backgroundColor: m.bg, color: m.color }}
                      className="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
                    >
                      {m.badge}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#0E1E4A] leading-snug">
                    {m.title}
                  </h4>
                  {selectedMilestone === idx && (
                    <p className="text-xs sm:text-sm text-[#4A5168] mt-2 leading-relaxed animate-fadeIn">
                      {m.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
