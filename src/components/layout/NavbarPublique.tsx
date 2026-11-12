import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export const NavbarPublique: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Le Concours', path: '/concours' },
    { label: 'Calendrier', path: '/calendrier' },
    { label: 'Documents', path: '/documents' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'FAQ', path: '/faq-contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#0E1E4A] flex items-center justify-center text-white font-black text-xl shadow-md">
            G
          </div>
          <div>
            <span className="font-extrabold text-[#0E1E4A] text-lg tracking-tight block leading-none">GÉNIE UPB</span>
            <span className="text-[10px] text-[#E8742A] font-bold tracking-widest uppercase">Édition 2026-2027</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold transition-colors ${
                location.pathname === link.path ? 'text-[#E8742A]' : 'text-slate-600 hover:text-[#0E1E4A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/connexion"
            className="text-xs font-bold text-[#0E1E4A] hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors"
          >
            Connexion
          </Link>
          <Link
            to="/inscription"
            className="text-xs font-bold bg-[#E8742A] hover:bg-[#d4651e] text-white px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            S'inscrire <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* MOBILE BURGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#0E1E4A] hover:bg-slate-100 rounded-xl"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 bottom-0 bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-bold text-[#0E1E4A] py-2 border-b border-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
            <Link
              to="/connexion"
              className="w-full text-center py-3 rounded-xl border border-[#0E1E4A] font-bold text-sm text-[#0E1E4A]"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="w-full text-center py-3 rounded-xl bg-[#E8742A] font-bold text-sm text-white shadow-md"
            >
              Créer mon compte
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
