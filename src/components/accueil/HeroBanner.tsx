import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import student1Img from '../../assets/images/hero_etudiante_1.webp';
import student2Img from '../../assets/images/hero_etudiant_2.webp';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallaxe interactive fluide au curseur sur les éléments d'arrière-plan et badges
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rafId: number;

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;

      const parElements = sec.querySelectorAll<HTMLElement>('[data-par]');
      parElements.forEach((el) => {
        const factor = Number(el.dataset.par || 1) * 14;
        el.style.transform = `translate3d(${cx * factor}px, ${cy * factor}px, 0)`;
      });

      rafId = requestAnimationFrame(loop);
    };

    loop();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = sec.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };

    sec.addEventListener('pointermove', handlePointerMove);
    return () => {
      cancelAnimationFrame(rafId);
      sec.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Transition automatique du diaporama étudiante UPB toutes les 4.5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-obj-sec="1"
      className="relative overflow-hidden bg-[#033F87] w-full min-h-screen lg:h-screen flex items-center justify-center select-none pt-32 sm:pt-36 lg:pt-0 pb-12 lg:pb-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='880' height='660'%3E%3Crect width='880' height='660' fill='%23033F87'/%3E%3Crect x='110' y='110' width='110' height='110' fill='%23003570'/%3E%3Crect x='660' y='330' width='110' height='110' fill='%23063A73'/%3E%3Crect x='220' y='440' width='110' height='110' fill='%2308376E'/%3E%3Crect x='550' y='440' width='110' height='110' fill='%23003570'/%3E%3Crect x='-1' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='109' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='219' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='329' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='439' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='549' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='659' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='769' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='879' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='0' y='-1' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='109' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='219' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='329' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='439' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='549' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='659' width='880' height='2' fill='%231D5BB5'/%3E%3C/svg%3E")`,
        backgroundSize: '880px 660px',
        animation: 'heroGridDrift 85s linear infinite',
      }}
    >
      {/* 1. Rayon lumineux diagonal (Glass Sweep) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div
          className="absolute -top-1/2 -left-[60%] w-[55%] h-[200%] rotate-[22deg] pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0))',
            animation: 'glassSweep 9.5s cubic-bezier(0.45, 0, 0.25, 1) infinite',
          }}
        />
      </div>

      {/* 2. Étoiles & croix techniques de repère blueprint scintillantes */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Étoile 1 - Haut gauche */}
        <div
          data-par="1.5"
          className="absolute left-[12%] top-[16%]"
          style={{ animation: 'fxTwinkle 3.2s ease-in-out infinite alternate' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#A9C2FF" opacity="0.65">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        {/* Étoile 2 - Centre haut */}
        <div
          data-par="1.2"
          className="absolute left-[45%] top-[6%] sm:top-[10%]"
          style={{ animation: 'fxTwinkle 4.1s ease-in-out 1.2s infinite alternate' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" opacity="0.5">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        {/* Croix technique 3 - Bas gauche */}
        <div
          data-par="0.8"
          className="absolute left-[7%] bottom-[22%]"
          style={{ animation: 'fxTwinkle 3.6s ease-in-out 0.6s infinite alternate' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#6AA8FF" strokeWidth="2" opacity="0.45">
            <line x1="10" y1="2" x2="10" y2="18" />
            <line x1="2" y1="10" x2="18" y2="10" />
            <circle cx="10" cy="10" r="4" stroke="#6AA8FF" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Étoile 4 - Droite au-dessus de l'étudiante */}
        <div
          data-par="1.6"
          className="absolute right-[16%] top-[14%]"
          style={{ animation: 'fxTwinkle 3.9s ease-in-out 1.8s infinite alternate' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#F58220" opacity="0.7">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        {/* Croix technique 5 - Milieu droit */}
        <div
          data-par="1.0"
          className="absolute right-[30%] top-[42%]"
          style={{ animation: 'fxTwinkle 4.5s ease-in-out 2.2s infinite alternate' }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4">
            <line x1="10" y1="3" x2="10" y2="17" />
            <line x1="3" y1="10" x2="17" y2="10" />
          </svg>
        </div>
      </div>

      {/* Fondu dégradé inférieur vers la section suivante */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[40%] z-[2] pointer-events-none bg-gradient-to-b from-transparent via-[#2F6BF0]/50 to-[#2F6BF0]"
      />

      {/* === CONTENEUR GLOBAL HERO === */}
      <div className="relative w-full max-w-[1440px] h-full mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between z-[3]">

        {/* === BLOC GAUCHE : TITRE RÉVÈLE TON GÉNIE & CAPSULES DE CATÉGORIES === */}
        <div className="relative w-full lg:w-[760px] xl:w-[820px] max-w-[820px] flex flex-col items-center lg:items-start lg:scale-[0.84] xl:scale-[0.9] 2xl:scale-95 origin-left lg:origin-center lg:-ml-2 xl:ml-4">
          
          {/* Cadre de composition (345px x 236px sur mobile, 820px x 560px sur desktop, resserré et parfaitement proportionné) */}
          <div className="relative w-[345px] sm:w-[480px] lg:w-[820px] h-[236px] sm:h-[328px] lg:h-[560px] mx-auto lg:mx-0">

            {/* --- BADGE 1 : ÉCONOMIE (-5deg) --- */}
            <motion.div
              data-par="1.1"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute left-[50px] sm:left-[70px] lg:left-[120px] top-[12px] sm:top-[18px] lg:top-[30px] z-[2]"
            >
              <Link
                to="/concours/economie"
                className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-2.5 rounded-full bg-[#1DA84A] border-2 lg:border-4 border-white text-white font-extrabold text-[13px] sm:text-base lg:text-[30px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] hover:scale-105 active:scale-95 transition-transform"
                style={{
                  animation: 'floatCapsule1 3.8s ease-in-out infinite',
                }}
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  <path d="M18 17V9" />
                  <path d="M13 17V5" />
                  <path d="M8 17v-3" />
                </svg>
                <span>Économie</span>
              </Link>
            </motion.div>

            {/* --- BADGE 2 : TECHNOLOGIE (16deg) --- */}
            <motion.div
              data-par="0.9"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute left-[215px] sm:left-[300px] lg:left-[520px] top-[36px] sm:top-[52px] lg:top-[90px] z-[2]"
            >
              <Link
                to="/concours/technologie"
                className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-2.5 rounded-full bg-[#FF6A13] border-2 lg:border-4 border-white text-white font-extrabold text-[13px] sm:text-base lg:text-[30px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] hover:scale-105 active:scale-95 transition-transform"
                style={{
                  animation: 'floatCapsule2 4.4s ease-in-out 0.4s infinite',
                }}
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                <span>Technologie</span>
              </Link>
            </motion.div>

            {/* --- TITRE : RÉVÈLE --- */}
            <motion.h2
              data-par="0.4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute left-[13px] sm:left-[20px] lg:left-[30px] top-[50px] sm:top-[70px] lg:top-[120px] z-[1] font-black text-white text-[63px] sm:text-[88px] lg:text-[150px] leading-none tracking-tight whitespace-nowrap drop-shadow-[0_8px_0_rgba(5,15,50,0.45)]"
            >
              Révèle
            </motion.h2>

            {/* --- TITRE : TON GÉNIE. (DOUBLE CONTOUR EMBLÉMATIQUE) --- */}
            <motion.h2
              data-par="0.4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute left-[29px] sm:left-[42px] lg:left-[70px] top-[113px] sm:top-[158px] lg:top-[270px] z-[1] font-black text-[63px] sm:text-[88px] lg:text-[150px] leading-none tracking-tight whitespace-nowrap hidden lg:block ton-genie-title-desktop"
            >
              Ton Génie.
            </motion.h2>

            {/* Version mobile de Ton Génie */}
            <motion.h2
              data-par="0.4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute left-[29px] sm:left-[42px] top-[113px] sm:top-[158px] z-[1] font-black text-[63px] sm:text-[88px] leading-none tracking-tight whitespace-nowrap lg:hidden ton-genie-title-mobile"
            >
              Ton Génie.
            </motion.h2>

            {/* --- BADGE 3 : DROIT (-7deg) --- */}
            <motion.div
              data-par="1.2"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-[0px] lg:left-[0px] top-[168px] sm:top-[235px] lg:top-[400px] z-[2]"
            >
              <Link
                to="/concours/droit"
                className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-2.5 rounded-full bg-[#E0284F] border-2 lg:border-4 border-white text-white font-extrabold text-[12px] sm:text-base lg:text-[28px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] hover:scale-105 active:scale-95 transition-transform"
                style={{
                  animation: 'floatCapsule3 3.5s ease-in-out 0.8s infinite',
                }}
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="M7 21h10" />
                  <path d="M12 3v18" />
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                </svg>
                <span>Droit</span>
              </Link>
            </motion.div>

            {/* --- BADGE 4 : INNOVATION (7deg) --- */}
            <motion.div
              data-par="0.85"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-[195px] sm:left-[275px] lg:left-[470px] top-[185px] sm:top-[258px] lg:top-[440px] z-[2]"
            >
              <Link
                to="/concours/innovation"
                className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-2.5 rounded-full bg-[#7B2FD9] border-2 lg:border-4 border-white text-white font-extrabold text-[12px] sm:text-base lg:text-[28px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] hover:scale-105 active:scale-95 transition-transform"
                style={{
                  animation: 'floatCapsule4 4.1s ease-in-out 0.2s infinite',
                }}
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" />
                  <path d="M20.054 15.987H3.946" />
                </svg>
                <span>Innovation</span>
              </Link>
            </motion.div>
          </div>

          {/* --- BOUTON CTA : JE M'INSCRIS → --- */}
          <motion.div
            data-par="0.6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-6 sm:mt-8 lg:mt-2 lg:ml-10 z-[4]"
          >
            <Link
              to="/inscription"
              className="inline-flex items-center gap-3 min-h-[52px] sm:min-h-[58px] lg:min-h-[60px] px-6 sm:px-8 lg:px-8 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg sm:text-xl lg:text-[22px] leading-none shadow-[0_14px_30px_rgba(232,98,26,0.45)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(232,98,26,0.6)] active:scale-95 transition-all cursor-pointer group"
              style={{
                animation: 'fxBreathe 2.4s ease-in-out infinite alternate',
              }}
            >
              <span>Je m'inscris</span>
              <span className="text-2xl group-hover:translate-x-1.5 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* === BLOC DROITE : SLIDESHOW ÉTUDIANTES UPB (Taille majestueuse & tête dégagée) === */}
        <div
          data-hero-v="1"
          className="relative lg:absolute lg:right-2 xl:right-8 2xl:right-16 bottom-[-45px] sm:bottom-[-50px] lg:bottom-[-50px] xl:bottom-[-65px] w-full max-w-[380px] sm:max-w-[480px] lg:w-[540px] xl:w-[640px] 2xl:w-[720px] h-[440px] sm:h-[540px] lg:h-[84vh] lg:max-h-[740px] xl:max-h-[790px] shrink-0 mt-8 sm:mt-10 lg:mt-0 flex items-end justify-center lg:justify-end z-[2] pointer-events-none"
        >
          <AnimatePresence mode="wait">
            {currentSlide === 0 ? (
              <motion.div
                key="student-1"
                initial={{ opacity: 0, y: 80, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: 60, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.9, 0.3, 1.1],
                }}
                className="absolute inset-0 flex items-end justify-center lg:justify-end"
              >
                <img
                  src={student1Img}
                  alt="Étudiante de l'UPB - Concours Génie"
                  className="w-auto h-full max-h-[440px] sm:max-h-[540px] lg:max-h-[84vh] xl:max-h-[790px] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(5,15,50,0.6)] scale-105 lg:scale-105 xl:scale-108 origin-bottom"
                />
              </motion.div>
            ) : (
              <motion.div
                key="student-2"
                initial={{ opacity: 0, y: 80, scale: 0.95, rotate: 2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: 60, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.9, 0.3, 1.1],
                }}
                className="absolute inset-0 flex items-end justify-center lg:justify-end"
              >
                <img
                  src={student2Img}
                  alt="Étudiante de l'UPB en blouse - Concours Génie"
                  className="w-auto h-full max-h-[440px] sm:max-h-[540px] lg:max-h-[84vh] xl:max-h-[790px] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(5,15,50,0.6)] scale-105 lg:scale-105 xl:scale-108 origin-bottom"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
