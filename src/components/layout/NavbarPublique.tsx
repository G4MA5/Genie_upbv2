import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ArrowRight } from 'lucide-react';

import logoUpb from '../../assets/images/logo_genie_upb.png';
import catTech from '../../assets/images/cat_a.png';
import catInno from '../../assets/images/cat_b.png';
import catEco from '../../assets/images/cat_c.png';
import catDroit from '../../assets/images/cat_d.png';

export const NavbarPublique: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open (UX standard)
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

  const categories = [
    {
      id: 'technologie',
      name: '01. Technologie',
      subtitle: 'AgriTech & IoT · 6 places',
      img: catTech,
      path: '/fiche-categorie/technologie',
    },
    {
      id: 'innovation',
      name: '02. Innovation',
      subtitle: 'Pitch & Startups · 3 places',
      img: catInno,
      path: '/fiche-categorie/innovation',
    },
    {
      id: 'economie',
      name: '03. Économie',
      subtitle: 'Finance & Crise · 8 places',
      img: catEco,
      path: '/fiche-categorie/economie',
    },
    {
      id: 'droit',
      name: '04. Droit',
      subtitle: 'Mini-Procès · Complet',
      img: catDroit,
      path: '/fiche-categorie/droit',
    },
  ];

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP FLOATING PILL NAVBAR (md:flex)
          ======================================================== */}
      <header className="fixed top-4 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center gap-1.5 p-1.5 pl-3.5 pr-2 rounded-full bg-[#0E1E4A] border border-white/20 shadow-[0_12px_30px_rgba(10,20,48,0.35)] backdrop-blur-md transition-all">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center select-none mr-2 group">
            <img
              src={logoUpb}
              alt="GÉNIE UPB"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* LIENS PRINCIPAUX */}
          <div className="flex items-center gap-1 relative">
            
            {/* ACCUEIL */}
            <Link
              to="/"
              className={`min-h-[38px] px-3.5 rounded-full font-medium text-[15px] flex items-center transition-colors ${
                isCurrent('/')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Accueil
            </Link>

            {/* CONCOURS + DROPDOWN SURVOL */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/concours"
                className={`min-h-[38px] px-3.5 rounded-full font-medium text-[15px] flex items-center gap-1.5 transition-colors ${
                  isCurrent('/concours') || isCurrent('/fiche-categorie')
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Concours</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              {/* CARTE DÉROULANTE DES 4 CATÉGORIES */}
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[530px]">
                  <div className="p-3 rounded-[24px] bg-[#0E1E4A] border border-white/20 shadow-[0_24px_50px_rgba(10,20,48,0.45)] backdrop-blur-xl animate-fadeIn">
                    
                    {/* Grille 2x2 des 4 pôles */}
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={cat.path}
                          className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/10 transition-colors group"
                        >
                          <img
                            src={cat.img}
                            alt={cat.name}
                            className="w-14 h-14 rounded-xl object-cover bg-slate-800 flex-shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-[16px] text-white leading-tight group-hover:text-[#F58220] transition-colors truncate">
                              {cat.name}
                            </span>
                            <span className="font-medium text-[12px] text-[#AEB8D6] truncate mt-0.5">
                              {cat.subtitle}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Bouton toutes les catégories */}
                    <Link
                      to="/concours"
                      className="mt-2.5 w-full min-h-[42px] rounded-xl bg-white/10 hover:bg-white/20 text-[#A9C2FF] hover:text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Toutes les catégories <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ACTUALITÉS */}
            <Link
              to="/actualites"
              className={`min-h-[38px] px-3.5 rounded-full font-medium text-[15px] flex items-center transition-colors ${
                isCurrent('/actualites')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Actualités
            </Link>

            {/* CALENDRIER */}
            <Link
              to="/calendrier"
              className={`min-h-[38px] px-3.5 rounded-full font-medium text-[15px] flex items-center transition-colors ${
                isCurrent('/calendrier')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Calendrier
            </Link>
          </div>

          {/* SÉPARATEUR & BOUTONS D'ACTION */}
          <div className="flex items-center gap-1.5 ml-2">
            <Link
              to="/connexion"
              className="text-white/75 hover:text-white text-xs font-bold px-3 py-2 rounded-full transition-colors"
            >
              Connexion
            </Link>
            
            <Link
              to="/inscription"
              className="min-h-[38px] px-5 rounded-full bg-white text-[#0E1E4A] hover:bg-white/90 font-extrabold text-sm flex items-center shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Inscription
            </Link>
          </div>
        </nav>
      </header>

      {/* ========================================================
          2. MOBILE FIXED TOP BAR (md:hidden)
          ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden pt-3 pb-2 px-3.5 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          
          {/* BOUTON BURGER STYLE PROTOTYPE */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu de navigation"
            className="justify-self-start w-12 h-12 rounded-full border-2 border-white/25 bg-[#0E1E4A] shadow-[0_10px_24px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 active:scale-90 transition-transform"
          >
            <span className="w-5 h-[2.5px] rounded-full bg-white block"></span>
            <span className="w-5 h-[2.5px] rounded-full bg-white block"></span>
            <span className="w-3 h-[2.5px] rounded-full bg-[#F58220] block self-start ml-3.5"></span>
          </button>

          {/* LOGO CENTRÉ */}
          <Link to="/" className="flex items-center justify-center">
            <img
              src={logoUpb}
              alt="GÉNIE UPB"
              className="h-11 w-auto object-contain drop-shadow-[0_6px_14px_rgba(10,20,48,0.35)] select-none"
            />
          </Link>

          {/* BOUTON S'INSCRIRE DÉGRADÉ ORANGE */}
          <Link
            to="/inscription"
            className="justify-self-end min-h-[42px] px-3.5 rounded-xl border-[2.5px] border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-xs tracking-wide shadow-[0_10px_24px_rgba(232,98,26,0.35)] flex items-center active:scale-95 transition-transform"
          >
            S'inscrire
          </Link>
        </div>
      </header>

      {/* ========================================================
          3. MOBILE FULLSCREEN OVERLAY MENU
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#0A1430] bg-[radial-gradient(rgba(29,91,181,0.35)_1.5px,transparent_1.5px)] bg-[size:28px_28px] text-white animate-fadeIn">
          
          {/* Header du tiroir mobile */}
          <div className="flex items-center justify-between p-6 pb-2">
            <img src={logoUpb} alt="GÉNIE UPB" className="h-10 w-auto" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Liste des liens avec design typographique affirmé */}
          <nav className="flex-1 flex flex-col justify-center px-8 py-4 gap-2 overflow-y-auto">
            <Link
              to="/"
              className="text-3xl font-black text-white hover:text-[#F58220] py-2 transition-colors flex items-center gap-3"
            >
              Accueil
            </Link>

            <Link
              to="/concours"
              className="text-3xl font-black text-white hover:text-[#F58220] py-2 transition-colors flex items-center gap-3"
            >
              Concours
            </Link>

            {/* Sous-liens des 4 pôles avec pastille orange */}
            <div className="flex flex-col gap-2 pl-3 py-1 border-l-2 border-white/10 my-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="flex items-center gap-2.5 text-lg font-bold text-[#C9D6F5] hover:text-white py-1 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F58220]"></span>
                  {cat.name.replace(/^\d+\.\s*/, '')}
                </Link>
              ))}
            </div>

            <Link
              to="/actualites"
              className="text-3xl font-black text-white hover:text-[#F58220] py-2 transition-colors flex items-center gap-3"
            >
              Actualités
            </Link>

            <Link
              to="/calendrier"
              className="text-xl font-bold text-white/80 hover:text-white py-1.5 transition-colors"
            >
              Calendrier du Tournoi
            </Link>

            <Link
              to="/documents"
              className="text-xl font-bold text-white/80 hover:text-white py-1.5 transition-colors"
            >
              Règlement & Documents
            </Link>

            <Link
              to="/faq-contact"
              className="text-xl font-bold text-white/80 hover:text-white py-1.5 transition-colors"
            >
              FAQ & Contact
            </Link>
          </nav>

          {/* Footer d'action mobile */}
          <div className="p-6 pt-2 flex flex-col gap-3">
            <Link
              to="/inscription"
              className="w-full min-h-[52px] rounded-2xl border-2 border-white bg-gradient-to-r from-[#FF9A3D] to-[#E8621A] text-white font-black text-base flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(232,98,26,0.35)] active:scale-98 transition-transform"
            >
              S'inscrire au Tournoi <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/connexion"
              className="w-full text-center py-2.5 text-white/70 hover:text-white font-bold text-sm transition-colors"
            >
              Déjà inscrit ? Se connecter
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
