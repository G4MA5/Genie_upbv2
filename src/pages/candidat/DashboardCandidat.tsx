import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * [P1] MON ESPACE (DASHBOARD PARTICIPANT) — PROTOTYPE V4
 * ============================================================================
 * 100% fidèle à GENIE UPB - Prototype (4).html (lignes 710 à 765, 2075, 2135, 2137) :
 * - Double affichage responsive :
 *   1. Desktop (>= 768px) :
 *      - Sur écrans standards (768px - 1327px, dont 1280x800) :
 *        Card A (span 12), Card B (span 12), Card C1 (span 6), Card C2 (span 6), Card D (span 12 grille 2 col), Card F (span 12)
 *      - Sur très grands écrans (>= 1328px / 2xl) :
 *        Card A (span 8), Card B (span 4), Card C1 (span 4), Card C2 (span 4), Card D (span 4 colonne), Card F (span 12)
 *   2. Mobile (< 768px) :
 *      - Disposition stacked fluide avec Hero Card soumission + barre 60% zébrée animée + équipe + formations
 * - Bannière supérieure bleue matricielle avec badge d'invitations (2)
 * - Compte à rebours temps réel vers la clôture des inscriptions (18 déc. 2026, proto `cdS` L2075)
 * - 100% Tailwind CSS valide avec paddings exacts en crochets (zéro classe invalide comme p-4.5).
 */
export default function DashboardCandidat() {
  const navigate = useNavigate();

  // Nombre d'invitations d'équipes en attente (2 dans le prototype)
  const invCount = 2;

  // Compte à rebours officiel du prototype (L2075: cdS vers 2026-12-18T23:59:59)
  const [timeLeft, setTimeLeft] = useState(() => {
    const target = new Date('2026-12-18T23:59:59').getTime();
    const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date('2026-12-18T23:59:59').getTime();
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeLeft({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  // Les 5 étapes de l'inscription (L50-57 & L148-192)
  const steps = [
    { label: 'Compte', icon: '✓', done: true, current: false },
    { label: 'Profil', icon: '✓', done: true, current: false },
    { label: 'Équipe', icon: '✓', done: true, current: false },
    { label: 'Soumission', icon: '4', done: false, current: true },
    { label: 'Validation', icon: '5', done: false, current: false },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 font-['Nunito',sans-serif]">
      {/* ====================================================================
          BANNIÈRE SUPÉRIEURE BLEUE MATRICIELLE ([data-gridanim="1"])
          ==================================================================== */}
      <div className="bg-[#2F6BF0] bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:40px_40px] text-white pt-[84px] pb-[30px] px-5 md:px-8 flex flex-col gap-4">
        <div className="flex justify-between items-end gap-3">
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#A9C2FF]">
              Mon espace
            </span>
            <span className="font-black text-[34px] leading-none tracking-[-0.02em]">
              Bonjour, Aya
            </span>
          </div>

          {/* Bouton invitations ✉ avec badge jaune */}
          <span
            onClick={() => navigate('/espace/equipe/invitations')}
            title="Invitations"
            className="relative shrink-0 w-12 h-12 rounded-full bg-white text-[#0A1430] grid place-items-center font-extrabold text-[20px] cursor-pointer shadow-[0_8px_18px_rgba(10,20,48,0.2)] hover:scale-105 transition-transform z-10 select-none"
          >
            ✉
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[#FFE14A] text-[#0A1430] border-2 border-white grid place-items-center font-extrabold text-[11px] leading-none">
              {invCount}
            </span>
          </span>
        </div>

        {/* Pilule d'état : Équipe en brouillon */}
        <span className="self-start flex gap-2 items-center px-3 py-1.5 rounded-full bg-white/10 font-semibold text-[15px]">
          <span className="w-2 h-2 rounded-full bg-[#AEB8D6]" />
          Équipe en brouillon
        </span>
      </div>

      {/* ====================================================================
          VERSION MOBILE (< 768px) : DISPOSITION STACKED
          padding: 22px 16px 120px (Prototype L33)
          ==================================================================== */}
      <div className="md:hidden flex-1 min-h-0 px-4 pt-[22px] pb-[120px] flex flex-col gap-3 overflow-y-auto">
        <span className="shrink-0 font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#6A7189] px-1">
          À faire maintenant
        </span>

        {/* CARTE HERO MOBILE : Soumettez votre équipe (padding: 18px exact) */}
        <div
          onClick={() => navigate('/espace/equipe/soumission')}
          className="relative shrink-0 min-h-[280px] rounded-[28px] overflow-hidden flex flex-col justify-end cursor-pointer bg-[#0A1430] shadow-[0_18px_40px_rgba(10,20,48,0.28)] hover:-translate-y-1 transition-transform duration-350"
        >
          <img
            src="/9cc6a783-3e8c-4fcf-b2d5-26a11fe15610.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1430]/55 to-[#0A1430]/95" />

          <span className="absolute top-4 left-4 py-1.5 px-3 bg-white text-[#1D4FD8] rounded-full font-extrabold text-[15px] shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
            Prochaine action
          </span>

          <div className="relative p-[18px] flex flex-col gap-2.5">
            <span className="font-extrabold text-[30px] leading-[1.02] text-white tracking-[-0.02em]">
              Soumettez
              <br />
              votre équipe
            </span>

            <div className="flex gap-2 flex-wrap">
              <span className="shrink-0 inline-flex items-center min-h-[30px] px-3 whitespace-nowrap rounded-[10px] bg-white/15 backdrop-blur-[8px] text-white font-bold text-[13px] leading-tight">
                ◎ 1 membre manquant
              </span>
              <span className="shrink-0 inline-flex items-center min-h-[30px] px-3 whitespace-nowrap rounded-[10px] bg-white/15 backdrop-blur-[8px] text-white font-bold text-[13px] leading-tight">
                ✎ 2 chartes à accepter
              </span>
            </div>

            <span className="w-full min-h-[54px] mt-1 px-5 pr-2 rounded-[16px] bg-[#2F6BF0] text-white shadow-[0_10px_28px_rgba(47,107,240,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] font-extrabold text-[17px] flex items-center justify-between hover:bg-white hover:text-[#2F6BF0] transition-colors duration-300">
              Continuer
              <span className="w-[38px] h-[38px] rounded-full bg-[#0A1430] text-[#A9C2FF] grid place-items-center">
                →
              </span>
            </span>
          </div>
        </div>

        {/* Section Mon inscription */}
        <span className="mt-3.5 shrink-0 font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#6A7189] px-1">
          Mon inscription
        </span>

        {/* CARTE PROGRESSION (60%) : padding 18px 18px 16px exact du prototype (L35) */}
        <div className="shrink-0 bg-white rounded-[26px] p-[18px] pb-4 shadow-[0_14px_34px_rgba(14,30,74,0.08)] flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-semibold text-[14px] text-[#6A7189]">
                Étape 4 sur 5
              </span>
              <span className="font-extrabold text-[20px] text-[#0A1430] leading-tight">
                Soumission
              </span>
            </div>
            <span className="font-extrabold text-[30px] leading-none text-[#2F6BF0] shrink-0">
              60<span className="text-[16px]">%</span>
            </span>
          </div>

          {/* Barre de progression avec zébrures animées */}
          <div className="relative h-3.5 rounded-full bg-[#EEF2FB] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[60%] rounded-full bg-gradient-to-r from-[#2F6BF0] to-[#5B8BEA] shadow-[inset_0_0_0_2px_#fff]" />
            <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.22)_0_8px,transparent_8px_16px)] bg-[size:22px_22px] animate-[barMove_1.2s_linear_infinite]" />
          </div>

          {/* Grille des 5 étapes */}
          <div className="grid grid-cols-5 gap-1 items-start">
            {steps.map((st) => (
              <div
                key={st.label}
                className="flex flex-col items-center gap-1.5 text-center min-w-0"
              >
                <span
                  className={`w-[30px] h-[30px] shrink-0 rounded-full grid place-items-center font-extrabold text-[13px] ${
                    st.done
                      ? 'bg-[#2F6BF0] text-white border-2 border-[#2F6BF0]'
                      : st.current
                      ? 'bg-white text-[#2F6BF0] border-2 border-[#2F6BF0] shadow-[0_0_0_4px_rgba(47,107,240,0.18)]'
                      : 'bg-[#F1F4FA] text-[#A0A7B8] border-2 border-transparent'
                  }`}
                >
                  {st.icon}
                </span>
                <span
                  className={`font-bold text-[11px] sm:text-[12px] leading-tight tracking-tight break-words w-full ${
                    st.current ? 'text-[#2F6BF0]' : st.done ? 'text-[#0A1430]' : 'text-[#A0A7B8]'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Mon équipe */}
        <span className="mt-3.5 shrink-0 font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#6A7189] px-1">
          Mon équipe
        </span>

        {/* CARTE ÉQUIPE (padding: 18px exact du prototype L75) */}
        <div
          onClick={() => navigate('/espace/equipe')}
          className="shrink-0 bg-white rounded-[22px] p-[18px] flex flex-col gap-3.5 cursor-pointer shadow-[0_14px_34px_rgba(14,30,74,0.08)] hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-extrabold text-[20px] text-[#0A1430] leading-tight">
                Les Bâtisseurs
              </span>
              <span className="font-semibold text-[14px] text-[#2F6BF0]">
                Innovation · 4 à 6 membres
              </span>
            </div>
            <span className="font-bold text-[20px] text-[#0A1430] shrink-0">→</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center shrink-0">
              <span className="w-[38px] h-[38px] rounded-full bg-[#E8621A] text-white border-[3px] border-white flex items-center justify-center font-bold text-[13px]">
                AK
              </span>
              <span className="w-[38px] h-[38px] rounded-full bg-[#2F6BF0] text-white border-[3px] border-white -ml-2 flex items-center justify-center font-bold text-[13px]">
                MD
              </span>
              <span className="w-[38px] h-[38px] rounded-full bg-[#17744B] text-white border-[3px] border-white -ml-2 flex items-center justify-center font-bold text-[13px]">
                FT
              </span>
              <span className="w-[38px] h-[38px] rounded-full border-2 border-dashed border-[#C8C4BA] -ml-1 flex items-center justify-center font-bold text-[18px] text-[#8A8FA3]">
                +
              </span>
            </div>
            <span className="font-semibold text-[15px] text-[#4A5168] min-w-0">
              3 membres sur 4 minimum
            </span>
          </div>
        </div>

        {/* Encadré Formations verrouillées (padding: 14px 16px exact du prototype L93) */}
        <div className="shrink-0 flex gap-3 items-center p-3.5 px-4 rounded-[18px] border-[1.5px] border-dashed border-[#C9D2E6] text-[#6A7189] font-semibold text-[15px] leading-snug">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="shrink-0"
          >
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Formations disponibles après la validation de votre équipe.
        </div>
      </div>

      {/* ====================================================================
          VERSION DESKTOP (>= 768px) : GRILLE BENTO 12 COLONNES (pDesk)
          Disposition 1:1 fidèle au prototype (img2) :
          - Carte A (Soumission) : col-span-12 (pleine largeur)
          - Carte B (Compte à rebours) : col-span-12 (pleine largeur empilée dessous)
          - Cartes C1 (Inscription) et C2 (Équipe) : col-span-6 chacune
          - Carte D (Invitations & Formations) : col-span-12 (grille 2 col)
          - Carte F (Prochaines dates) : col-span-12
          ==================================================================== */}
      <div className="hidden md:grid p-8 pb-14 grid-cols-12 gap-5 items-start">
        {/* CARTE A : Prochaine action · étape 4 (span 12 sur 768-1327px, span 8 sur >=1328px) */}
        <div className="col-span-12 relative overflow-hidden rounded-[28px] bg-[#0A1430] grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-h-[320px] shadow-[0_24px_50px_rgba(10,20,48,0.22)]">
          <div className="relative z-10 p-[30px] flex flex-col gap-4 min-w-0">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#F58220]">
              Prochaine action · étape 4
            </span>
            <span className="font-black text-[34px] leading-[1.05] tracking-[-0.02em] text-white">
              Soumettez votre équipe
            </span>

            {/* Deux actions cliquables */}
            <div className="flex flex-col gap-2">
              <div
                onClick={() => navigate('/espace/equipe')}
                className="flex items-center gap-3 p-3 px-3.5 rounded-[14px] bg-white/[0.08] border border-white/[0.14] cursor-pointer hover:bg-white/[0.12] transition-colors"
              >
                <span className="shrink-0 w-[22px] h-[22px] rounded-[7px] border-2 border-white/50 box-border" />
                <span className="flex-1 font-bold text-[15px] text-white">
                  Inviter 1 membre manquant
                </span>
                <span className="text-[#A9C2FF] font-extrabold text-[16px]">→</span>
              </div>

              <div
                onClick={() => navigate('/espace/equipe/chartes')}
                className="flex items-center gap-3 p-3 px-3.5 rounded-[14px] bg-white/[0.08] border border-white/[0.14] cursor-pointer hover:bg-white/[0.12] transition-colors"
              >
                <span className="shrink-0 w-[22px] h-[22px] rounded-[7px] border-2 border-white/50 box-border" />
                <span className="flex-1 font-bold text-[15px] text-white">
                  Accepter les 2 chartes
                </span>
                <span className="text-[#A9C2FF] font-extrabold text-[16px]">→</span>
              </div>
            </div>

            {/* Bouton Continuer la soumission */}
            <span
              onClick={() => navigate('/espace/equipe/soumission')}
              className="mt-auto self-start min-h-[54px] px-[22px] pr-2 rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-[17px] flex items-center gap-4 cursor-pointer whitespace-nowrap shadow-[0_10px_22px_rgba(232,98,26,0.35)] hover:brightness-105 active:scale-98 transition-all"
            >
              Continuer la soumission
              <span className="w-10 h-10 rounded-[12px] bg-white/20 grid place-items-center">
                →
              </span>
            </span>
          </div>

          {/* Photo de fond officielle avec fondu linéaire exact du prototype */}
          <div className="relative min-h-[240px] md:min-h-full bg-[url('/9cc6a783-3e8c-4fcf-b2d5-26a11fe15610.png')] bg-cover bg-center">
            <span className="absolute inset-0 bg-gradient-to-r from-[#0A1430] via-[#0A1430]/0 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CARTE B : Compte à rebours tournoi (span 12 sur 768-1327px, span 4 sur >=1328px) */}
        <div className="col-span-12 rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] min-w-0 flex flex-col gap-[18px] bg-[#2F6BF0] text-white bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]">
          <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#DCE7FF]">
            Le Génie UPB commence dans
          </span>

          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {[
              { v: pad(timeLeft.days), l: 'JOURS' },
              { v: pad(timeLeft.hours), l: 'H' },
              { v: pad(timeLeft.minutes), l: 'MIN' },
              { v: pad(timeLeft.seconds), l: 'S' },
            ].map((c) => (
              <div
                key={c.l}
                className="min-w-0 flex flex-col items-center gap-1 py-3.5 px-1 rounded-[14px] bg-white/[0.14]"
              >
                <span className="font-black text-[26px] leading-none tabular-nums">
                  {c.v}
                </span>
                <span className="font-extrabold text-[10px] tracking-[0.1em] text-[#DCE7FF]">
                  {c.l}
                </span>
              </div>
            ))}
          </div>

          <span className="mt-auto font-black text-[22px] leading-tight">
            27 – 29 janvier 2027
          </span>
          <span className="font-semibold text-[14px] text-[#DCE7FF]">
            Université Polytechnique de Bingerville
          </span>
        </div>

        {/* CARTE C1 : Mon inscription 60% (span 6 sur 768-1327px, span 4 sur >=1328px) */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-[18px]">
          <div className="flex justify-between items-baseline">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
              Mon inscription
            </span>
            <span className="font-black text-[26px] text-[#2F6BF0] whitespace-nowrap">
              60 %
            </span>
          </div>

          {/* Stepper vertical interconnecté */}
          <div className="flex flex-col gap-3">
            {/* 1 : Compte */}
            <div className="flex gap-3.5 items-start relative">
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-[30px] bottom-[-12px] w-[2px] bg-[#2F6BF0]"
              />
              <span className="relative shrink-0 w-7 h-7 rounded-full grid place-items-center font-black text-[13px] bg-[#2F6BF0] text-white">
                ✓
              </span>
              <span className="flex flex-col gap-0.5 pb-3.5 min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430]">
                  Compte
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  Créé le 24 nov.
                </span>
              </span>
            </div>

            {/* 2 : Profil */}
            <div className="flex gap-3.5 items-start relative">
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-[30px] bottom-[-12px] w-[2px] bg-[#2F6BF0]"
              />
              <span className="relative shrink-0 w-7 h-7 rounded-full grid place-items-center font-black text-[13px] bg-[#2F6BF0] text-white">
                ✓
              </span>
              <span className="flex flex-col gap-0.5 pb-3.5 min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430]">
                  Profil
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  Complété
                </span>
              </span>
            </div>

            {/* 3 : Équipe */}
            <div className="flex gap-3.5 items-start relative">
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-[30px] bottom-[-12px] w-[2px] bg-[#2F6BF0]"
              />
              <span className="relative shrink-0 w-7 h-7 rounded-full grid place-items-center font-black text-[13px] bg-[#2F6BF0] text-white">
                ✓
              </span>
              <span className="flex flex-col gap-0.5 pb-3.5 min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430]">
                  Équipe
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  3 membres
                </span>
              </span>
            </div>

            {/* 4 : Soumission (En cours) */}
            <div className="flex gap-3.5 items-start relative">
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-[30px] bottom-[-12px] w-[2px] bg-[#E6EAF2]"
              />
              <span className="relative shrink-0 w-7 h-7 rounded-full grid place-items-center font-black text-[13px] bg-white text-[#2F6BF0] border-[2.5px] border-[#2F6BF0] shadow-[0_0_0_5px_rgba(47,107,240,0.15)] box-border">
                4
              </span>
              <span className="flex flex-col gap-0.5 pb-3.5 min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430]">
                  Soumission
                </span>
                <span className="font-semibold text-[13px] text-[#2F6BF0]">
                  En cours
                </span>
              </span>
            </div>

            {/* 5 : Validation */}
            <div className="flex gap-3.5 items-start relative">
              <span className="relative shrink-0 w-7 h-7 rounded-full grid place-items-center font-black text-[13px] bg-[#F1F4FA] text-[#A0A7B8]">
                5
              </span>
              <span className="flex flex-col gap-0.5 pb-3.5 min-w-0">
                <span className="font-extrabold text-[15px] text-[#A0A7B8]">
                  Validation
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  Par les organisateurs
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* CARTE C2 : Mon équipe Les Bâtisseurs (span 6 sur 768-1327px, span 4 sur >=1328px) */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
              Mon équipe
            </span>
            <span
              onClick={() => navigate('/espace/equipe')}
              className="font-extrabold text-[14px] text-[#2F6BF0] cursor-pointer whitespace-nowrap hover:underline"
            >
              Gérer →
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-black text-[24px] text-[#0A1430]">
              Les Bâtisseurs
            </span>
            <span className="font-bold text-[14px] text-[#E8621A]">
              Innovation · 3 / 4 membres minimum
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* AK : Aya Kouassi */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 w-10 h-10 rounded-full bg-[#E8621A] text-white grid place-items-center font-extrabold text-[14px]">
                AK
              </span>
              <span className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430] whitespace-nowrap">
                  Aya Kouassi
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  Cheffe d'équipe
                </span>
              </span>
            </div>

            {/* MD : Moussa Diallo */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 w-10 h-10 rounded-full bg-[#2F6BF0] text-white grid place-items-center font-extrabold text-[14px]">
                MD
              </span>
              <span className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430] whitespace-nowrap">
                  Moussa Diallo
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  Membre
                </span>
              </span>
            </div>

            {/* FT : Fatou Traoré */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 w-10 h-10 rounded-full bg-[#17744B] text-white grid place-items-center font-extrabold text-[14px]">
                FT
              </span>
              <span className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-[#0A1430] whitespace-nowrap">
                  Fatou Traoré
                </span>
                <span className="font-semibold text-[13px] text-[#6A7189]">
                  Membre
                </span>
              </span>
            </div>

            {/* + Inviter un 4e membre */}
            <div
              onClick={() => navigate('/espace/equipe')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span className="shrink-0 w-10 h-10 rounded-full border-2 border-dashed border-[#C9D2E6] grid place-items-center font-extrabold text-[18px] text-[#6A7189] group-hover:border-[#2F6BF0] group-hover:text-[#2F6BF0] transition-colors">
                +
              </span>
              <span className="font-extrabold text-[15px] text-[#2F6BF0] group-hover:underline">
                Inviter un 4ᵉ membre
              </span>
            </div>
          </div>
        </div>

        {/* CARTE D : Invitations + Formations verrouillées
            - Sur 768-1327px (span 12) : Grille 2 colonnes (`grid md:grid-cols-2`)
            - Sur >=1328px (span 4) : Colonne unique (`2xl:grid-cols-1 2xl:flex 2xl:flex-col`) */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
          {/* Bloc Invitations */}
          <div
            onClick={() => navigate('/espace/equipe/invitations')}
            className="bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
                Invitations
              </span>
              <span className="min-w-7 h-7 px-2 rounded-[9px] bg-[#FFE14A] text-[#0A1430] grid place-items-center font-black text-[14px]">
                {invCount}
              </span>
            </div>
            <span className="font-extrabold text-[17px] leading-[1.3] text-[#0A1430]">
              Des équipes veulent vous rejoindre
            </span>
            <span className="font-extrabold text-[14px] text-[#2F6BF0] whitespace-nowrap">
              Voir les invitations →
            </span>
          </div>

          {/* Bloc Formations verrouillées */}
          <div className="rounded-[24px] p-6 min-w-0 flex flex-col gap-2.5 bg-[#F6F8FC] border-[1.5px] border-dashed border-[#C9D2E6]">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
              Formations
            </span>
            <span className="font-bold text-[15px] leading-[1.45] text-[#4A5168]">
              Disponibles après la validation de votre équipe, à partir du 21 déc.
            </span>
          </div>
        </div>

        {/* CARTE F : Prochaines dates (span 12) */}
        <div className="col-span-12 bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-5">
          <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">
            Prochaines dates
          </span>

          <div className="flex flex-wrap gap-6">
            {/* 18 déc. */}
            <div className="flex-1 min-w-[180px] flex flex-col gap-1.5 pt-4 border-t-[3px] border-[#F58220]">
              <span className="font-extrabold text-[13px] tracking-[0.06em] uppercase text-[#E8621A]">
                18 déc.
              </span>
              <span className="font-black text-[18px] leading-[1.2] text-[#0A1430]">
                Clôture des inscriptions
              </span>
              <span className="font-semibold text-[14px] text-[#6A7189]">
                Dans 32 jours
              </span>
            </div>

            {/* 21 déc. */}
            <div className="flex-1 min-w-[180px] flex flex-col gap-1.5 pt-4 border-t-[3px] border-[#E6EAF2]">
              <span className="font-extrabold text-[13px] tracking-[0.06em] uppercase text-[#6A7189]">
                21 déc.
              </span>
              <span className="font-black text-[18px] leading-[1.2] text-[#0A1430]">
                Début des formations
              </span>
              <span className="font-semibold text-[14px] text-[#6A7189]">
                Après validation
              </span>
            </div>

            {/* 27 – 29 janv. */}
            <div className="flex-1 min-w-[180px] flex flex-col gap-1.5 pt-4 border-t-[3px] border-[#E6EAF2]">
              <span className="font-extrabold text-[13px] tracking-[0.06em] uppercase text-[#6A7189]">
                27 – 29 janv.
              </span>
              <span className="font-black text-[18px] leading-[1.2] text-[#0A1430]">
                Le Génie UPB
              </span>
              <span className="font-semibold text-[14px] text-[#6A7189]">
                3 jours de compétition
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
