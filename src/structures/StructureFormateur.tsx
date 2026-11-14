import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, QrCode, FileText, MessageSquare, LogOut, Sparkles } from 'lucide-react';

export default function StructureFormateur() {
  const location = useLocation();

  const navLinks = [
    { label: 'Mes Séances', path: '/formateur/dashboard', icon: Sparkles },
    { label: 'Calendrier', path: '/formateur/seances', icon: Calendar },
    { label: 'Émargement QR', path: '/formateur/seances/scan-qr', icon: QrCode },
    { label: 'Supports de Cours', path: '/formateur/supports', icon: FileText },
    { label: 'Questions & Annonces', path: '/formateur/annonces', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col">
      {/* 1. HEADER FORMATEUR OFFICIEL */}
      <header className="sticky top-0 z-30 bg-[#0E1E4A] text-white h-18 px-4 sm:px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/formateur/dashboard"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8B33D] text-[#0A1430] flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
              F
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight block leading-tight text-white">
                ESPACE FORMATEUR & JURY
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                GÉNIE UPB 2026-2027
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white">Mme Konan (Innovation)</span>
          </div>

          <Link
            to="/"
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            title="Quitter vers le site public"
          >
            <span>Quitter</span>
            <LogOut size={14} />
          </Link>
        </div>
      </header>

      {/* 2. BARRE DE NAVIGATION SOUS HEADER */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto shadow-xs scrollbar-none sticky top-18 z-20">
        {navLinks.map(link => {
          const Icon = link.icon;
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                active
                  ? 'bg-[#0E1E4A] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0E1E4A]'
              }`}
            >
              <Icon size={14} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* 3. CONTENU PRINCIPAL */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full pb-20">
        <Outlet />
      </main>
    </div>
  );
}
