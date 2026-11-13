import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import logoUpb from '../../assets/images/logo_genie_upb.png';
import catTech from '../../assets/images/cat_a.png';
import catInno from '../../assets/images/cat_b.png';
import catEco from '../../assets/images/cat_c.png';
import catDroit from '../../assets/images/cat_d.png';

export const NavbarPublique: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 140);
  };

  const isAccueil = location.pathname === '/';
  const isConcours = location.pathname.startsWith('/concours') || location.pathname.startsWith('/fiche-categorie');
  const isActualites = location.pathname.startsWith('/actualites');

  const menuCats = [
    {
      name: '01. Technologie',
      size: 'Agriculture connectée · 6 places',
      img: catTech,
      path: '/fiche-categorie/technologie',
    },
    {
      name: '02. Innovation',
      size: 'Pitch startup & incubateur · 3 places',
      img: catInno,
      path: '/fiche-categorie/innovation',
    },
    {
      name: '03. Économie',
      size: 'Portefeuille simulé · 8 places',
      img: catEco,
      path: '/fiche-categorie/economie',
    },
    {
      name: '04. Droit',
      size: 'Procès simulé · Complet',
      img: catDroit,
      path: '/fiche-categorie/droit',
    },
  ];

  return (
    <>
      {/* === 1. NAVBAR DESKTOP CAPSULE (Tailwind CSS pur) === */}
      {isDesktop ? (
        <header className="fixed top-[18px] inset-x-0 z-[200] flex justify-center pointer-events-none select-none">
          <nav className="pointer-events-auto flex items-center gap-1 p-[5px] pl-2.5 pr-[5px] rounded-full bg-[#0E1E4A] shadow-[0_12px_30px_rgba(10,20,48,0.35)]">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logoUpb} alt="GÉNIE UPB" className="h-[34px] w-auto object-contain cursor-pointer" />
            </Link>

            {/* Liens */}
            <div className="relative flex items-center gap-0.5 mx-1.5">
              <Link
                to="/"
                className={`min-h-[38px] px-3.5 rounded-full font-medium text-[16px] text-white flex items-center transition-colors ${
                  isAccueil ? 'bg-white/12 font-semibold' : 'hover:bg-white/10'
                }`}
              >
                Accueil
              </Link>

              {/* Menu Concours + Dropdown fluide */}
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative flex">
                <Link
                  to="/concours"
                  className={`min-h-[38px] px-3.5 rounded-full font-medium text-[16px] text-white flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isConcours ? 'bg-white/12 font-semibold' : 'hover:bg-white/10'
                  }`}
                >
                  <span>Concours</span>
                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="text-[11px] opacity-70 inline-block"
                  >
                    ▾
                  </motion.span>
                </Link>

                <AnimatePresence>
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[210]">
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.26, ease: [0.2, 0.9, 0.25, 1] }}
                        className="w-[520px] p-2.5 rounded-[24px] bg-[#0E1E4A] border border-white/15 shadow-[0_24px_50px_rgba(10,20,48,0.45)] grid grid-cols-2 gap-1.5 origin-top"
                      >
                        {menuCats.map((mc) => (
                          <Link
                            key={mc.name}
                            to={mc.path}
                            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/10 transition-colors group"
                          >
                            <span
                              className="w-14 h-14 flex-none rounded-[14px] bg-[#E6EAF1] bg-cover bg-[center_22%] transition-transform duration-200 group-hover:scale-105"
                              style={{ backgroundImage: `url(${mc.img})` }}
                            />
                            <span className="flex flex-col gap-0.5 min-w-0">
                              <span className="font-extrabold text-[17px] text-white leading-tight group-hover:text-[#F58220] transition-colors">
                                {mc.name}
                              </span>
                              <span className="font-medium text-[13px] text-[#AEB8D6]">{mc.size}</span>
                            </span>
                          </Link>
                        ))}

                        <Link
                          to="/concours"
                          className="col-span-2 min-h-[44px] mt-1 rounded-xl bg-white/10 hover:bg-white/15 text-[#A9C2FF] hover:text-white font-bold text-[15px] flex items-center justify-center transition-colors"
                        >
                          Toutes les catégories →
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/actualites"
                className={`min-h-[38px] px-3.5 rounded-full font-medium text-[16px] text-white flex items-center transition-colors ${
                  isActualites ? 'bg-white/12 font-semibold' : 'hover:bg-white/10'
                }`}
              >
                Actualités
              </Link>
            </div>

            {/* Bouton Inscription */}
            <Link
              to="/inscription"
              className="min-h-[40px] px-5 rounded-full bg-white hover:bg-white/95 text-[#0E1E4A] font-semibold text-[16px] flex items-center justify-center shadow-sm active:scale-95 transition-all whitespace-nowrap"
            >
              Inscription
            </Link>
          </nav>
        </header>
      ) : (
        /* === 2. NAVBAR MOBILE (Tailwind CSS pur) === */
        <header className="fixed top-[18px] inset-x-0 z-[200] flex justify-center pointer-events-none md:hidden">
          <div className="pointer-events-auto w-[calc(100%-28px)] grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
              className="justify-self-start w-12 h-12 rounded-full border-2 border-white/25 bg-[#0E1E4A] shadow-[0_10px_24px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
            >
              <span className="w-5 h-[2.5px] rounded bg-white" />
              <span className="w-5 h-[2.5px] rounded bg-white" />
              <span className="w-3 h-[2.5px] rounded bg-[#F58220] self-start ml-3.5" />
            </button>

            <Link to="/" className="flex items-center justify-center">
              <img src={logoUpb} alt="GÉNIE UPB" className="h-[46px] w-auto drop-shadow-[0_6px_14px_rgba(10,20,48,0.35)]" />
            </Link>

            <Link
              to="/inscription"
              className="justify-self-end min-h-[44px] px-3.5 rounded-[14px] border-[3px] border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-sm flex items-center shadow-[0_10px_24px_rgba(232,98,26,0.35)] active:scale-95 transition-transform"
            >
              S'inscrire
            </Link>
          </div>
        </header>
      )}

      {/* === 3. MENU RIDEAU MOBILE PLEIN ÉCRAN === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[300] bg-[#0A1430] flex flex-col p-7 overflow-y-auto"
          >
            <div className="flex items-center justify-between w-full">
              <img src={logoUpb} alt="GÉNIE UPB" className="h-11 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              <Link to="/" className="flex items-center py-3 font-black text-3xl text-white hover:text-[#F58220] transition-colors">
                Accueil
              </Link>
              <Link to="/concours" className="flex items-center py-3 font-black text-3xl text-white hover:text-[#F58220] transition-colors">
                Concours
              </Link>

              {menuCats.map((mc) => (
                <Link
                  key={mc.name}
                  to={mc.path}
                  className="flex items-center gap-3 py-2 pl-4 font-extrabold text-[19px] text-[#C9D6F5] hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F58220]" />
                  {mc.name.replace(/^\d+\.\s*/, '')}
                </Link>
              ))}

              <Link to="/actualites" className="flex items-center py-3 font-black text-3xl text-white hover:text-[#F58220] transition-colors">
                Actualités
              </Link>
            </nav>

            <Link
              to="/inscription"
              className="mt-auto self-start min-h-[54px] px-6 rounded-[14px] border-[3px] border-white bg-gradient-to-r from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg flex items-center shadow-[0_10px_24px_rgba(232,98,26,0.35)] active:scale-95 transition-transform"
            >
              S'inscrire →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
