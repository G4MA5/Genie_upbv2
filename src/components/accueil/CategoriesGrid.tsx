import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import catTech from '../../assets/images/cat_a.png';
import catInno from '../../assets/images/cat_b.png';
import catEco from '../../assets/images/cat_c.png';
import catDroit from '../../assets/images/cat_d.png';
import campusImg from '../../assets/images/44e0b199.png';

export const CategoriesGrid: React.FC = () => {
  // Compte à rebours dynamique jusqu'au 27 janvier 2027 à 08:00
  const [timeLeft, setTimeLeft] = useState({
    days: '74',
    hours: '14',
    minutes: '32',
    seconds: '08',
  });

  useEffect(() => {
    const targetDate = new Date('2027-01-27T08:00:00').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-bento="1"
      className="relative z-[6] -mt-16 sm:-mt-24 bg-[#F8F6F1] rounded-t-[32px] sm:rounded-t-[44px] px-4 sm:px-10 pt-10 sm:pt-16 pb-16 shadow-[0_-30px_60px_rgba(10,20,48,0.18)] select-none"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* ============================================================== */}
        {/* === 1. VERSION DESKTOP : GRILLE BENTO 5 COLONNES EXACTE ====== */}
        {/* ============================================================== */}
        <div className="hidden lg:grid grid-cols-5 grid-rows-[300px_150px_300px] gap-5 [grid-template-areas:'y_y_y_p_d'_'y_y_y_p_t'_'b_r_l_l_t']">
          {/* --- CARTE Y : MASCOTTE GÉNIE UPB (3 colonnes, 2 lignes) --- */}
          <div
            style={{ gridArea: 'y' }}
            className="relative bg-[#FFE14A] rounded-[28px] p-8 flex flex-col justify-between overflow-hidden min-w-0 shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:-translate-y-1.5 transition-all duration-300 group"
          >
            {/* Mascotte animée (vectorielle) */}
            <div
              role="img"
              aria-label="Mascotte GÉNIE UPB"
              className="absolute right-5 top-12 w-[180px] h-[208px] z-[2] pointer-events-none"
            >
              <div className="relative w-[260px] h-[300px] scale-[0.69] origin-top-left">
                {/* 1. Roue dentée en rotation continue */}
                <svg
                  data-wheel="1"
                  viewBox="0 0 260 260"
                  className="absolute left-0 top-0 w-[260px] h-[260px] overflow-visible origin-center"
                  style={{ animation: 'mascotWheelSpin 36s linear infinite' }}
                >
                  <path
                    d="M109.8 25.9L116.7 3.7L143.3 3.7L150.2 25.9L174.8 33.9L174.8 33.9L193.5 20.0L215.0 35.6L207.5 57.7L222.7 78.6L222.7 78.6L246.0 78.3L254.2 103.6L235.2 117.1L235.2 142.9L235.2 142.9L254.2 156.4L246.0 181.7L222.7 181.4L207.5 202.3L207.5 202.3L215.0 224.4L193.5 240.0L174.8 226.1L150.2 234.1L150.2 234.1L143.3 256.3L116.7 256.3L109.8 234.1L85.2 226.1L85.2 226.1L66.5 240.0L45.0 224.4L52.5 202.3L37.3 181.4L37.3 181.4L14.0 181.7L5.8 156.4L24.8 142.9L24.8 117.1L24.8 117.1L5.8 103.6L14.0 78.3L37.3 78.6L52.5 57.7L52.5 57.7L45.0 35.6L66.5 20.0L85.2 33.9L109.8 25.9Z M130 42 A88 88 0 1 0 130 218 A88 88 0 1 0 130 42Z"
                    fill="#78B4DA"
                    fillRule="evenodd"
                    stroke="#78B4DA"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Arceau supérieur */}
                <svg viewBox="0 0 260 260" className="absolute left-0 top-0 w-[260px] h-[260px]">
                  <path d="M62 190 A78 78 0 1 1 198 190" fill="none" stroke="#78B4DA" strokeWidth="7" strokeLinecap="round" />
                </svg>

                {/* Ruban / base */}
                <svg viewBox="0 0 260 50" className="absolute left-0 top-[250px] w-[260px] h-[50px]">
                  <path d="M128 16 Q96 0 46 6 L40 28 Q92 20 128 34 Z M132 16 Q164 0 214 6 L220 28 Q168 20 132 34 Z" fill="#78B4DA" />
                  <path d="M18 32 Q78 26 130 42 Q182 26 242 32 L242 40 Q182 34 130 50 Q78 34 18 40 Z" fill="#78B4DA" />
                </svg>

                {/* 2. Corps du Robot (Mascot Bot) */}
                <div
                  data-mascot-bot="1"
                  className="absolute left-0 top-0 w-[260px] h-[300px]"
                  style={{ animation: 'mascotBob 3.2s ease-in-out infinite' }}
                >
                  {/* Barette latérale */}
                  <div className="absolute left-[30px] top-[96px] w-[34px] h-[30px] flex items-end gap-1">
                    <span className="w-2 h-3 bg-[#10357E] rounded-[2px]" />
                    <span className="w-2 h-5 bg-[#10357E] rounded-[2px]" />
                    <span className="w-2 h-7 bg-[#10357E] rounded-[2px]" />
                  </div>

                  {/* Buste bleu */}
                  <div className="absolute left-[92px] top-[146px] w-[76px] h-[92px] rounded-[50%_50%_50%_50%_/_36%_36%_64%_64%] bg-[#10357E]" />

                  {/* Bras gauche qui balance */}
                  <div
                    data-arm="1"
                    className="absolute left-[87px] top-[122px] w-[17px] h-[54px] rounded-[9px] bg-[#10357E] origin-bottom -rotate-[38deg]"
                    style={{ animation: 'mascotWave 4.2s ease-in-out infinite' }}
                  >
                    <span className="absolute -left-1 -top-3 w-6 h-6 rounded-full bg-[#10357E]" />
                  </div>

                  {/* Bloc dossier / badge */}
                  <div className="absolute left-[134px] top-[168px] w-[38px] h-[48px] border-[3px] border-[#10357E] rounded-[5px] bg-white -rotate-[5deg] flex flex-col gap-1.5 pt-3 px-1.5">
                    <span className="absolute left-[9px] -top-2 w-3.5 h-[9px] rounded-[3px] bg-[#10357E]" />
                    <span className="h-[3px] w-5 rounded-[2px] bg-[#10357E]" />
                    <span className="h-[3px] w-3.5 rounded-[2px] bg-[#10357E]" />
                    <span className="h-[3px] w-[18px] rounded-[2px] bg-[#78B4DA]" />
                  </div>
                  <span className="absolute left-[158px] top-[194px] w-5 h-5 rounded-full bg-[#10357E] border-2 border-white" />

                  {/* Tête & Visage */}
                  <div data-head="1" className="absolute left-0 top-0 w-[260px] h-[170px] origin-[130px_160px]">
                    <span className="absolute left-[128px] top-[42px] w-1 h-6 bg-[#10357E]" />
                    <span className="absolute left-[123px] top-[30px] w-3.5 h-3.5 rounded-full bg-[#10357E]" />
                    <span className="absolute left-[58px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
                    <span className="absolute left-[186px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
                    
                    {/* Casque bleu */}
                    <div className="absolute left-[68px] top-[62px] w-[124px] h-[96px] rounded-[50%_50%_44%_44%_/_56%_56%_44%_44%] bg-[#10357E]" />
                    {/* Écran blanc */}
                    <div className="absolute left-[82px] top-[74px] w-[96px] h-[70px] rounded-[50%_50%_42%_42%_/_58%_58%_42%_42%] bg-white" />

                    {/* Yeux qui clignent */}
                    <div className="absolute left-[82px] top-[90px] w-[96px] h-[26px] flex justify-center gap-5">
                      <div
                        data-blink="1"
                        className="relative w-[22px] h-[26px]"
                        style={{ animation: 'mascotEyeBlink 3.8s ease-in-out infinite' }}
                      >
                        <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
                      </div>
                      <div
                        data-blink="1"
                        className="relative w-[22px] h-[26px]"
                        style={{ animation: 'mascotEyeBlink 3.8s ease-in-out infinite' }}
                      >
                        <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
                      </div>
                    </div>

                    {/* Sourire */}
                    <div className="absolute left-[82px] top-[124px] w-[96px] h-4 flex justify-center items-start">
                      <span className="w-5 h-2 rounded-b-[10px] bg-[#10357E]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Titre Mascotte */}
            <h3 className="mt-8 font-extrabold text-[56px] xl:text-[76px] 2xl:text-[84px] leading-[0.95] tracking-tight text-[#0A1430]">
              Quatre<br />
              catégories,<br />
              <span className="inline-block mt-2 px-4 py-1.5 rounded-2xl bg-[#0A1430] text-[#FFE14A]">
                un seul défi.
              </span>
            </h3>

            {/* Description & Boutons d'action */}
            <div className="mt-auto flex justify-between items-end gap-6 pt-6">
              <p className="max-w-[360px] font-semibold text-[17px] leading-[1.45] text-[#0A1430]/90">
                Formez votre équipe, choisissez votre terrain et mettez vos compétences à l'épreuve du 27 au 29 janvier.
              </p>

              <div className="flex flex-col gap-2.5 items-end shrink-0">
                <Link
                  to="/inscription"
                  className="min-h-[48px] px-6 rounded-full border-[3px] border-white bg-[#0A1430] text-white font-extrabold text-base flex items-center gap-2.5 -rotate-2 shadow-[0_10px_22px_rgba(5,15,50,0.3)] hover:rotate-0 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>S'inscrire</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/concours"
                  className="min-h-[48px] px-6 rounded-full border-[3px] border-[#0A1430] bg-transparent text-[#0A1430] font-extrabold text-base flex items-center rotate-2 shadow-[0_10px_22px_rgba(5,15,50,0.15)] hover:rotate-0 hover:scale-105 active:scale-95 transition-all"
                >
                  Toutes les catégories
                </Link>
              </div>
            </div>
          </div>

          {/* --- CARTE P : TECHNOLOGIE (1 colonne, 2 lignes) --- */}
          <Link
            to="/fiche-categorie/technologie"
            style={{ gridArea: 'p' }}
            className="group relative rounded-[28px] overflow-hidden min-w-0 bg-[#E4E2DE] shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(14,30,74,0.2)] transition-all duration-300"
          >
            <img
              src={catTech}
              alt="Visuel de la catégorie Technologie"
              className="absolute inset-0 w-full h-full object-cover object-[50%_30%] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <span className="absolute left-4 bottom-4 z-[2] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-4 border-white text-white font-extrabold text-[20px] leading-none whitespace-nowrap -rotate-3 shadow-[0_10px_22px_rgba(5,15,50,0.4)] flex items-center gap-2 group-hover:rotate-0 group-hover:scale-105 transition-transform">
              <span>Voir</span>
              <span className="text-[22px]">→</span>
            </span>
          </Link>

          {/* --- CARTE D : ÉCONOMIE (1 colonne, 1 ligne) --- */}
          <Link
            to="/fiche-categorie/economie"
            style={{ gridArea: 'd' }}
            className="group relative rounded-[28px] overflow-hidden min-w-0 bg-[#E4E2DE] shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(14,30,74,0.2)] transition-all duration-300"
          >
            <img
              src={catEco}
              alt="Visuel de la catégorie Économie"
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <span className="absolute left-4 bottom-4 z-[2] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-4 border-white text-white font-extrabold text-[20px] leading-none whitespace-nowrap -rotate-3 shadow-[0_10px_22px_rgba(5,15,50,0.4)] flex items-center gap-2 group-hover:rotate-0 group-hover:scale-105 transition-transform">
              <span>Voir</span>
              <span className="text-[22px]">→</span>
            </span>
          </Link>

          {/* --- CARTE T : COMPTE À REBOURS JOUR J − (1 colonne, 2 lignes) --- */}
          <div
            style={{ gridArea: 't' }}
            className="relative bg-[#FF8A80] rounded-[28px] p-6 flex flex-col justify-between overflow-hidden min-w-0 shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="flex items-baseline gap-2.5 my-auto">
              <span className="font-black text-[30px] leading-none text-[#1A0806] tracking-tight">
                Jour J −
              </span>
            </div>

            <div className="my-auto grid grid-cols-2 gap-3">
              {[
                { v: timeLeft.days, l: 'JOURS' },
                { v: timeLeft.hours, l: 'HEURES' },
                { v: timeLeft.minutes, l: 'MIN' },
                { v: timeLeft.seconds, l: 'SEC' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 min-w-0">
                  <div className="relative w-full h-[78px] rounded-2xl bg-[#1A0806] shadow-[0_6px_0_rgba(26,8,6,0.25)] grid place-items-center overflow-hidden">
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-white/5 pointer-events-none" />
                    <span className="font-extrabold text-[44px] 2xl:text-[52px] leading-none text-[#FFD9D4] tracking-tight tabular-nums relative z-[1]">
                      {item.v}
                    </span>
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -mt-[1px] bg-[#FF8A80] z-[2]" />
                    <span className="absolute -left-1 top-1/2 w-2 h-2 -mt-1 rounded-full bg-[#FF8A80] z-[3]" />
                    <span className="absolute -right-1 top-1/2 w-2 h-2 -mt-1 rounded-full bg-[#FF8A80] z-[3]" />
                  </div>
                  <span className="font-mono font-bold text-[10px] tracking-widest text-[#3A0F0B]">
                    {item.l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- CARTE B : INNOVATION (1 colonne, 1 ligne) --- */}
          <Link
            to="/fiche-categorie/innovation"
            style={{ gridArea: 'b' }}
            className="group relative rounded-[28px] overflow-hidden min-w-0 bg-[#E4E2DE] shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(14,30,74,0.2)] transition-all duration-300"
          >
            <img
              src={catInno}
              alt="Visuel de la catégorie Innovation"
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <span className="absolute left-4 bottom-4 z-[2] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-4 border-white text-white font-extrabold text-[20px] leading-none whitespace-nowrap -rotate-3 shadow-[0_10px_22px_rgba(5,15,50,0.4)] flex items-center gap-2 group-hover:rotate-0 group-hover:scale-105 transition-transform">
              <span>Voir</span>
              <span className="text-[22px]">→</span>
            </span>
          </Link>

          {/* --- CARTE R : DROIT (1 colonne, 1 ligne) --- */}
          <Link
            to="/fiche-categorie/droit"
            style={{ gridArea: 'r' }}
            className="group relative rounded-[28px] overflow-hidden min-w-0 bg-[#E4E2DE] shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(14,30,74,0.2)] transition-all duration-300"
          >
            <img
              src={catDroit}
              alt="Visuel de la catégorie Droit"
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <span className="absolute left-4 bottom-4 z-[2] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-4 border-white text-white font-extrabold text-[20px] leading-none whitespace-nowrap -rotate-3 shadow-[0_10px_22px_rgba(5,15,50,0.4)] flex items-center gap-2 group-hover:rotate-0 group-hover:scale-105 transition-transform">
              <span>Voir</span>
              <span className="text-[22px]">→</span>
            </span>
          </Link>

          {/* --- CARTE L : CAMPUS UPB BINGERVILLE (2 colonnes, 1 ligne) --- */}
          <Link
            to="/concours"
            style={{ gridArea: 'l' }}
            className="group relative rounded-[30px] p-1.5 bg-white shadow-[0_18px_40px_rgba(10,20,48,0.16)] min-w-0 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_rgba(10,20,48,0.24)] transition-all duration-300"
          >
            <div
              className="relative h-full rounded-[25px] overflow-hidden bg-[#1C3561] bg-right bg-cover no-repeat flex flex-col justify-between p-7"
              style={{ backgroundImage: `url("${campusImg}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F3B67] via-[#264673]/90 via-[38%] to-transparent to-[75%] pointer-events-none" />

              <div className="relative z-[1] flex flex-col gap-2 max-w-[62%]">
                <span className="font-bold text-[24px] xl:text-[26px] leading-[1.15] text-white tracking-tight">
                  Université Polytechnique de Bingerville
                </span>
                <span className="font-medium text-[15px] leading-normal text-white/85">
                  Grand amphithéâtre et campus moderne
                </span>
              </div>

              <div className="relative z-[1] mt-auto flex items-center justify-between">
                <span className="font-extrabold text-[24px] text-white">
                  27 – 30{' '}
                  <span className="font-semibold text-[16px] text-white/85">
                    janv. 2027
                  </span>
                </span>
                <span className="px-4 py-2 rounded-full bg-white/15 border border-white/30 text-white font-bold text-xs group-hover:bg-white group-hover:text-[#0E1E4A] transition-colors">
                  En savoir plus →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* === 2. VERSION MOBILE : GRILLE 2 COLONNES HARMONIEUSE ======== */}
        {/* ============================================================== */}
        <div className="grid lg:hidden grid-cols-2 gap-3.5">
          {/* CARTE 1 MOBILE : Mascotte Jaune (Pleine largeur) */}
          <div className="col-span-2 relative bg-[#FFE14A] rounded-[24px] p-4 xs:p-5 flex flex-col justify-between overflow-hidden shadow-sm">
            {/* Mascotte complète en haut à droite avec TOUS les détails du prototype */}
            <div
              role="img"
              aria-label="Mascotte GÉNIE UPB"
              className="absolute -right-2 top-1.5 w-[130px] h-[150px] z-[2] pointer-events-none"
            >
              <div className="relative w-[260px] h-[300px] scale-[0.48] origin-top-left">
                {/* 1. Roue dentée en rotation continue */}
                <svg
                  data-wheel="1"
                  viewBox="0 0 260 260"
                  className="absolute left-0 top-0 w-[260px] h-[260px] overflow-visible origin-center"
                  style={{ animation: 'mascotWheelSpin 36s linear infinite' }}
                >
                  <path
                    d="M109.8 25.9L116.7 3.7L143.3 3.7L150.2 25.9L174.8 33.9L174.8 33.9L193.5 20.0L215.0 35.6L207.5 57.7L222.7 78.6L222.7 78.6L246.0 78.3L254.2 103.6L235.2 117.1L235.2 142.9L235.2 142.9L254.2 156.4L246.0 181.7L222.7 181.4L207.5 202.3L207.5 202.3L215.0 224.4L193.5 240.0L174.8 226.1L150.2 234.1L150.2 234.1L143.3 256.3L116.7 256.3L109.8 234.1L85.2 226.1L85.2 226.1L66.5 240.0L45.0 224.4L52.5 202.3L37.3 181.4L37.3 181.4L14.0 181.7L5.8 156.4L24.8 142.9L24.8 117.1L24.8 117.1L5.8 103.6L14.0 78.3L37.3 78.6L52.5 57.7L52.5 57.7L45.0 35.6L66.5 20.0L85.2 33.9L109.8 25.9Z M130 42 A88 88 0 1 0 130 218 A88 88 0 1 0 130 42Z"
                    fill="#78B4DA"
                    fillRule="evenodd"
                    stroke="#78B4DA"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Arceau supérieur */}
                <svg viewBox="0 0 260 260" className="absolute left-0 top-0 w-[260px] h-[260px]">
                  <path d="M62 190 A78 78 0 1 1 198 190" fill="none" stroke="#78B4DA" strokeWidth="7" strokeLinecap="round" />
                </svg>

                {/* Ruban / base */}
                <svg viewBox="0 0 260 50" className="absolute left-0 top-[250px] w-[260px] h-[50px]">
                  <path d="M128 16 Q96 0 46 6 L40 28 Q92 20 128 34 Z M132 16 Q164 0 214 6 L220 28 Q168 20 132 34 Z" fill="#78B4DA" />
                  <path d="M18 32 Q78 26 130 42 Q182 26 242 32 L242 40 Q182 34 130 50 Q78 34 18 40 Z" fill="#78B4DA" />
                </svg>

                {/* 2. Corps du Robot (Mascot Bot) */}
                <div
                  data-mascot-bot="1"
                  className="absolute left-0 top-0 w-[260px] h-[300px]"
                  style={{ animation: 'mascotBob 3.2s ease-in-out infinite' }}
                >
                  {/* Barette latérale */}
                  <div className="absolute left-[30px] top-[96px] w-[34px] h-[30px] flex items-end gap-1">
                    <span className="w-2 h-3 bg-[#10357E] rounded-[2px]" />
                    <span className="w-2 h-5 bg-[#10357E] rounded-[2px]" />
                    <span className="w-2 h-7 bg-[#10357E] rounded-[2px]" />
                  </div>

                  {/* Buste bleu */}
                  <div className="absolute left-[92px] top-[146px] w-[76px] h-[92px] rounded-[50%_50%_50%_50%_/_36%_36%_64%_64%] bg-[#10357E]" />

                  {/* Bras gauche qui balance */}
                  <div
                    data-arm="1"
                    className="absolute left-[87px] top-[122px] w-[17px] h-[54px] rounded-[9px] bg-[#10357E] origin-bottom -rotate-[38deg]"
                    style={{ animation: 'mascotWave 4.2s ease-in-out infinite' }}
                  >
                    <span className="absolute -left-1 -top-3 w-6 h-6 rounded-full bg-[#10357E]" />
                  </div>

                  {/* Bloc dossier / badge */}
                  <div className="absolute left-[134px] top-[168px] w-[38px] h-[48px] border-[3px] border-[#10357E] rounded-[5px] bg-white -rotate-[5deg] flex flex-col gap-1.5 pt-3 px-1.5">
                    <span className="absolute left-[9px] -top-2 w-3.5 h-[9px] rounded-[3px] bg-[#10357E]" />
                    <span className="h-[3px] w-5 rounded-[2px] bg-[#10357E]" />
                    <span className="h-[3px] w-3.5 rounded-[2px] bg-[#10357E]" />
                    <span className="h-[3px] w-[18px] rounded-[2px] bg-[#78B4DA]" />
                  </div>
                  <span className="absolute left-[158px] top-[194px] w-5 h-5 rounded-full bg-[#10357E] border-2 border-white" />

                  {/* Tête & Visage */}
                  <div data-head="1" className="absolute left-0 top-0 w-[260px] h-[170px] origin-[130px_160px]">
                    <span className="absolute left-[128px] top-[42px] w-1 h-6 bg-[#10357E]" />
                    <span className="absolute left-[123px] top-[30px] w-3.5 h-3.5 rounded-full bg-[#10357E]" />
                    <span className="absolute left-[58px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
                    <span className="absolute left-[186px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
                    
                    {/* Casque bleu */}
                    <div className="absolute left-[68px] top-[62px] w-[124px] h-[96px] rounded-[50%_50%_44%_44%_/_56%_56%_44%_44%] bg-[#10357E]" />
                    {/* Écran blanc */}
                    <div className="absolute left-[82px] top-[74px] w-[96px] h-[70px] rounded-[50%_50%_42%_42%_/_58%_58%_42%_42%] bg-white" />

                    {/* Yeux qui clignent */}
                    <div className="absolute left-[82px] top-[90px] w-[96px] h-[26px] flex justify-center gap-5">
                      <div
                        data-blink="1"
                        className="relative w-[22px] h-[26px]"
                        style={{ animation: 'mascotEyeBlink 3.8s ease-in-out infinite' }}
                      >
                        <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
                      </div>
                      <div
                        data-blink="1"
                        className="relative w-[22px] h-[26px]"
                        style={{ animation: 'mascotEyeBlink 3.8s ease-in-out infinite' }}
                      >
                        <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
                      </div>
                    </div>

                    {/* Sourire */}
                    <div className="absolute left-[82px] top-[124px] w-[96px] h-4 flex justify-center items-start">
                      <span className="w-5 h-2 rounded-b-[10px] bg-[#10357E]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-[1] max-w-[62%]">
              <h3 className="font-extrabold text-[26px] xs:text-[30px] sm:text-[36px] leading-[0.98] tracking-tight text-[#0A1430]">
                Quatre catégories,
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-xl bg-[#0A1430] text-[#FFE14A] text-[18px] xs:text-[22px] sm:text-[26px]">
                  un seul défi.
                </span>
              </h3>
            </div>

            <Link
              to="/inscription"
              className="relative z-[1] mt-4 self-start min-h-[42px] px-5 rounded-full border-[3px] border-white bg-[#0A1430] text-white font-extrabold text-xs xs:text-sm flex items-center gap-2 -rotate-2 shadow-md active:scale-95 hover:rotate-0 transition-transform"
            >
              <span>S'inscrire</span>
              <span>→</span>
            </Link>
          </div>

          {/* CARTE 2 MOBILE : Technologie */}
          <Link
            to="/fiche-categorie/technologie"
            className="group relative rounded-[22px] overflow-hidden min-h-[190px] sm:min-h-[220px] bg-[#E4E2DE] shadow-sm active:scale-95 transition-transform"
          >
            <img
              src={catTech}
              alt="Technologie"
              className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <span className="absolute left-2.5 bottom-2.5 z-[2] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-2 border-white text-white font-extrabold text-sm whitespace-nowrap -rotate-3 shadow-md flex items-center gap-1.5">
              <span>Voir</span>
              <span className="text-base">→</span>
            </span>
          </Link>

          {/* CARTE 3 MOBILE : Innovation */}
          <Link
            to="/fiche-categorie/innovation"
            className="group relative rounded-[22px] overflow-hidden min-h-[190px] sm:min-h-[220px] bg-[#E4E2DE] shadow-sm active:scale-95 transition-transform"
          >
            <img
              src={catInno}
              alt="Innovation"
              className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <span className="absolute left-2.5 bottom-2.5 z-[2] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-2 border-white text-white font-extrabold text-sm whitespace-nowrap -rotate-3 shadow-md flex items-center gap-1.5">
              <span>Voir</span>
              <span className="text-base">→</span>
            </span>
          </Link>

          {/* CARTE 4 MOBILE : Économie */}
          <Link
            to="/fiche-categorie/economie"
            className="group relative rounded-[22px] overflow-hidden min-h-[190px] sm:min-h-[220px] bg-[#E4E2DE] shadow-sm active:scale-95 transition-transform"
          >
            <img
              src={catEco}
              alt="Économie"
              className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <span className="absolute left-2.5 bottom-2.5 z-[2] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-2 border-white text-white font-extrabold text-sm whitespace-nowrap -rotate-3 shadow-md flex items-center gap-1.5">
              <span>Voir</span>
              <span className="text-base">→</span>
            </span>
          </Link>

          {/* CARTE 5 MOBILE : Droit */}
          <Link
            to="/fiche-categorie/droit"
            className="group relative rounded-[22px] overflow-hidden min-h-[190px] sm:min-h-[220px] bg-[#E4E2DE] shadow-sm active:scale-95 transition-transform"
          >
            <img
              src={catDroit}
              alt="Droit"
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <span className="absolute left-2.5 bottom-2.5 z-[2] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#5B9BFF] via-[#2F6BF0] to-[#1D4FD8] border-2 border-white text-white font-extrabold text-sm whitespace-nowrap -rotate-3 shadow-md flex items-center gap-1.5">
              <span>Voir</span>
              <span className="text-base">→</span>
            </span>
          </Link>

          {/* CARTE 6 MOBILE : Compte à rebours Jour J − (Pleine largeur) */}
          <div className="col-span-2 relative bg-[#FF8A80] rounded-[24px] p-5 flex flex-col gap-4 overflow-hidden shadow-sm">
            <span className="font-black text-2xl text-[#1A0806] tracking-tight">
              Jour J −
            </span>

            <div className="grid grid-cols-4 gap-2">
              {[
                { v: timeLeft.days, l: 'JOURS' },
                { v: timeLeft.hours, l: 'HEURES' },
                { v: timeLeft.minutes, l: 'MIN' },
                { v: timeLeft.seconds, l: 'SEC' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-0">
                  <div className="relative w-full h-[62px] rounded-xl bg-[#1A0806] shadow-[0_4px_0_rgba(26,8,6,0.25)] grid place-items-center overflow-hidden">
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-white/5 pointer-events-none" />
                    <span className="font-extrabold text-2xl leading-none text-[#FFD9D4] tracking-tight tabular-nums relative z-[1]">
                      {item.v}
                    </span>
                    <span className="absolute inset-x-0 top-1/2 h-[1.5px] -mt-[0.75px] bg-[#FF8A80] z-[2]" />
                  </div>
                  <span className="font-mono font-bold text-[9px] tracking-wider text-[#3A0F0B]">
                    {item.l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CARTE 7 MOBILE : Campus UPB Bingerville (Pleine largeur) */}
          <Link
            to="/concours"
            className="col-span-2 group relative rounded-[24px] p-1 bg-white shadow-md overflow-hidden active:scale-95 transition-transform"
          >
            <div
              className="relative h-[150px] rounded-[20px] overflow-hidden bg-[#1C3561] bg-right bg-cover no-repeat flex flex-col justify-between p-4"
              style={{ backgroundImage: `url("${campusImg}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F3B67] via-[#264673]/90 via-[42%] to-transparent pointer-events-none" />

              <div className="relative z-[1] flex flex-col gap-1 max-w-[70%]">
                <span className="font-bold text-lg leading-snug text-white tracking-tight">
                  Université Polytechnique de Bingerville
                </span>
                <span className="font-medium text-xs text-white/80">
                  Salle et accès à confirmer
                </span>
              </div>

              <div className="relative z-[1] mt-auto flex items-center justify-between">
                <span className="font-extrabold text-lg text-white">
                  27 – 30{' '}
                  <span className="font-semibold text-xs text-white/80">
                    janv. 2027
                  </span>
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/30 text-white font-bold text-[11px]">
                  Détails →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
