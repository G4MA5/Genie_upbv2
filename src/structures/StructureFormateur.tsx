import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function StructureFormateur() {
  const location = useLocation();

  const links = [
    { label: 'Planning Séances', path: '/formateur/seances' },
    { label: 'Émargement QR Scan', path: '/formateur/seances/scan-qr' },
    { label: 'Supports de Cours', path: '/formateur/supports' },
    { label: 'Questions & Annonces', path: '/formateur/annonces' }
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col">
      <header className="bg-[#0E1E4A] text-white h-18 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8B33D] flex items-center justify-center text-[#0A1430] font-black text-lg">
            F
          </div>
          <div>
            <span className="font-extrabold text-sm block leading-none">ESPACE FORMATEUR & JURY</span>
            <span className="text-[10px] text-slate-300">GÉNIE UPB 2026-2027</span>
          </div>
        </div>
        <Link to="/" className="text-xs font-bold text-slate-300 hover:text-white">
          Quitter →
        </Link>
      </header>

      <div className="bg-white border-b border-slate-200 px-6 py-2 flex gap-4 overflow-x-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              location.pathname === link.path ? 'bg-[#0E1E4A] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
