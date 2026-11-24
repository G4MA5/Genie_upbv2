import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useMenuMobile } from '../../contexts/MenuMobileContext';

import logoUpb from '../../assets/images/logo_genie_upb.png';
import catTech from '../../assets/images/cat_b.png';
import catInno from '../../assets/images/cat_d.png';
import catEco from '../../assets/images/cat_a.png';
import catDroit from '../../assets/images/cat_c.png';

export const NavbarPublique: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { burgerOpen, toggleBurger } = useMenuMobile();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

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
  const isConcours = location.pathname.startsWith('/concours');

  const menuCats = [
    {
      name: '01. Technologie',
      img: catTech,
      path: '/concours/technologie',
    },
    {
      name: '02. Innovation',
      img: catInno,
      path: '/concours/innovation',
    },
    {
      name: '03. Économie',
      img: catEco,
      path: '/concours/economie',
    },
    {
      name: '04. Droit',
      img: catDroit,
      path: '/concours/droit',
    },
  ];

  return (
    <>
      {/* === 1. NAVBAR DESKTOP CAPSULE (Tailwind CSS pur) === */}
      {isDesktop ? (
        <header className="fixed top-[18px] inset-x-0 z-[200] flex justify-center pointer-events-none select-none">
          <nav className="pointer-events-auto flex items-center gap-1 p-[5px] pl-2.5 pr-[5px] rounded-full bg-[#0E1E4A] border border-white/[0.16] shadow-[0_12px_30px_rgba(10,20,48,0.35)]">
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
                  to="/concours/technologie"
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
                            <span className="font-extrabold text-[17px] text-white leading-tight group-hover:text-[#F58220] transition-colors truncate">
                              {mc.name}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
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
              onClick={toggleBurger}
              aria-label={burgerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="justify-self-start w-12 h-12 rounded-full border-2 border-white/25 bg-[#0E1E4A] shadow-[0_10px_24px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-[5px] active:scale-90 transition-transform cursor-pointer"
            >
              <span
                className={`w-5 h-[2.5px] rounded-[2px] bg-white transition-all duration-300 ${
                  burgerOpen ? 'rotate-45 translate-y-[7.5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[2.5px] rounded-[2px] bg-white transition-all duration-300 ${
                  burgerOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2.5px] rounded-[2px] bg-[#F58220] transition-all duration-300 ${
                  burgerOpen ? 'w-5 -rotate-45 -translate-y-[7.5px] mr-0' : 'w-3 mr-2 self-start ml-[14px]'
                }`}
              />
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
    </>
  );
};
