import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import student1Img from '../../assets/images/144a752c.png';
import student2Img from '../../assets/images/e388fda3.png';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Transition automatique du diaporama étudiante UPB toutes les 4.5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      data-obj-sec="1"
      className="relative overflow-hidden bg-[#033F87] w-full min-h-screen lg:h-screen flex items-center justify-center select-none pt-20 sm:pt-24 lg:pt-0 pb-8 lg:pb-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='880' height='660'%3E%3Crect width='880' height='660' fill='%23033F87'/%3E%3Crect x='110' y='110' width='110' height='110' fill='%23003570'/%3E%3Crect x='660' y='330' width='110' height='110' fill='%23063A73'/%3E%3Crect x='220' y='440' width='110' height='110' fill='%2308376E'/%3E%3Crect x='550' y='440' width='110' height='110' fill='%23003570'/%3E%3Crect x='-1' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='109' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='219' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='329' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='439' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='549' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='659' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='769' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='879' y='0' width='2' height='660' fill='%231D5BB5'/%3E%3Crect x='0' y='-1' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='109' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='219' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='329' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='439' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='549' width='880' height='2' fill='%231D5BB5'/%3E%3Crect x='0' y='659' width='880' height='2' fill='%231D5BB5'/%3E%3C/svg%3E")`,
        backgroundSize: '880px 660px',
      }}
    >
      {/* Fondu dégradé inférieur vers la section suivante */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[40%] z-[2] pointer-events-none bg-gradient-to-b from-transparent via-[#2F6BF0]/50 to-[#2F6BF0]"
      />

      {/* === CONTENEUR GLOBAL HERO === */}
      <div className="relative w-full max-w-[1440px] h-full mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between z-[3]">

        {/* === BLOC GAUCHE : TITRE RÉVÈLE TON GÉNIE & CAPSULES DE CATÉGORIES === */}
        <div className="relative w-full lg:w-[760px] xl:w-[820px] max-w-[820px] flex flex-col items-center lg:items-start lg:scale-[0.84] xl:scale-[0.9] 2xl:scale-95 origin-left lg:origin-center lg:-ml-2 xl:ml-4">
          
          {/* Cadre de composition (820px x 560px sur desktop, fluide sur mobile) */}
          <div className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[820px] h-[340px] sm:h-[420px] lg:h-[560px] mx-auto lg:mx-0">

            {/* --- BADGE 1 : ÉCONOMIE (-5deg) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute left-[8%] sm:left-[12%] lg:left-[120px] top-[4%] sm:top-[6%] lg:top-[30px] z-[2]"
            >
              <Link
                to="/concours"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full bg-[#1DA84A] border-2 sm:border-4 border-white text-white font-extrabold text-xs sm:text-base lg:text-[30px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] -rotate-[5deg] hover:scale-105 active:scale-95 transition-transform"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
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
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute right-[4%] sm:right-[8%] lg:right-auto lg:left-[520px] top-[14%] sm:top-[16%] lg:top-[90px] z-[2]"
            >
              <Link
                to="/concours"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full bg-[#FF6A13] border-2 sm:border-4 border-white text-white font-extrabold text-xs sm:text-base lg:text-[30px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] rotate-[16deg] hover:scale-105 active:scale-95 transition-transform"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute left-[4%] sm:left-[8%] lg:left-[30px] top-[26%] sm:top-[24%] lg:top-[120px] z-[1] font-black text-white text-[56px] sm:text-[90px] lg:text-[150px] leading-none tracking-tight whitespace-nowrap drop-shadow-[0_8px_0_rgba(5,15,50,0.45)]"
            >
              Révèle
            </motion.h2>

            {/* --- TITRE : TON GÉNIE. (DOUBLE CONTOUR EMBLÉMATIQUE) --- */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute left-[6%] sm:left-[10%] lg:left-[70px] top-[48%] sm:top-[46%] lg:top-[270px] z-[1] font-black text-[56px] sm:text-[90px] lg:text-[150px] leading-none tracking-tight whitespace-nowrap hidden lg:block ton-genie-title-desktop"
            >
              Ton Génie.
            </motion.h2>

            {/* Version mobile de Ton Génie */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute left-[6%] sm:left-[10%] top-[48%] sm:top-[46%] z-[1] font-black text-[56px] sm:text-[90px] leading-none tracking-tight whitespace-nowrap lg:hidden ton-genie-title-mobile"
            >
              Ton Génie.
            </motion.h2>

            {/* --- BADGE 3 : DROIT (-7deg) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-[2%] sm:left-[4%] lg:left-[0px] top-[72%] sm:top-[70%] lg:top-[400px] z-[2]"
            >
              <Link
                to="/concours"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full bg-[#E0284F] border-2 sm:border-4 border-white text-white font-extrabold text-xs sm:text-base lg:text-[28px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] -rotate-[7deg] hover:scale-105 active:scale-95 transition-transform"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
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
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute right-[2%] sm:right-[4%] lg:right-auto lg:left-[470px] top-[76%] sm:top-[74%] lg:top-[440px] z-[2]"
            >
              <Link
                to="/concours"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full bg-[#7B2FD9] border-2 sm:border-4 border-white text-white font-extrabold text-xs sm:text-base lg:text-[28px] leading-none whitespace-nowrap shadow-[0_10px_22px_rgba(5,15,50,0.4)] rotate-[7deg] hover:scale-105 active:scale-95 transition-transform"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 shrink-0"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-4 sm:mt-6 lg:mt-2 lg:ml-10 z-[4]"
          >
            <Link
              to="/inscription"
              className="inline-flex items-center gap-3 min-h-[52px] sm:min-h-[58px] lg:min-h-[60px] px-6 sm:px-8 lg:px-8 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg sm:text-xl lg:text-[22px] leading-none shadow-[0_14px_30px_rgba(232,98,26,0.45)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(232,98,26,0.6)] active:scale-95 transition-all cursor-pointer group"
            >
              <span>Je m'inscris</span>
              <span className="text-2xl group-hover:translate-x-1.5 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* === BLOC DROITE : SLIDESHOW ÉTUDIANTES UPB (Taille réajustée avec tête dégagée et coupe nette en bas) === */}
        <div
          data-hero-v="1"
          className="relative lg:absolute lg:right-4 xl:right-10 2xl:right-20 bottom-[-20px] lg:bottom-[-40px] xl:bottom-[-50px] w-full max-w-[340px] sm:max-w-[420px] lg:w-[480px] xl:w-[560px] 2xl:w-[620px] h-[380px] sm:h-[460px] lg:h-[600px] xl:h-[660px] 2xl:h-[700px] shrink-0 mt-6 lg:mt-0 flex items-end justify-center lg:justify-end z-[2] pointer-events-none"
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
                  className="w-auto h-full max-h-[580px] xl:max-h-[640px] 2xl:max-h-[680px] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(5,15,50,0.6)] scale-100 lg:scale-[1.02] xl:scale-[1.04] origin-bottom"
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
                  className="w-auto h-full max-h-[580px] xl:max-h-[640px] 2xl:max-h-[680px] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(5,15,50,0.6)] scale-100 lg:scale-[1.02] xl:scale-[1.04] origin-bottom"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
