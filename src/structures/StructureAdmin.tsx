import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SidebarAdmin } from '../components/layout/SidebarAdmin';
import { Search, Mail, Menu, X, Bell } from 'lucide-react';

export default function StructureAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#E9EBF0] p-2 sm:p-5 flex flex-col md:flex-row gap-4 font-sans text-slate-800">
      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block rounded-[28px] overflow-hidden shadow-xl">
        <SidebarAdmin />
      </div>

      {/* SIDEBAR MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex md:hidden">
          <div className="w-72 bg-[#F6F7FA] h-full shadow-2xl overflow-y-auto">
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarAdmin />
          </div>
        </div>
      )}

      {/* MAIN CONTAINER AVEC EN-TÊTE ADMIN */}
      <div className="flex-1 rounded-[28px] sm:rounded-[32px] bg-white shadow-2xl flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR RECHERCHE & PROFIL */}
        <header className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 rounded-2xl bg-[#0A1430] text-[#A9C2FF] flex items-center justify-center font-bold"
            >
              <Menu size={20} />
            </button>

            <div className="relative flex-1 sm:w-80 min-w-[200px]">
              <input
                type="text"
                placeholder="Rechercher une équipe, un étudiant…"
                className="w-full min-h-[46px] px-4 pr-10 rounded-full bg-[#F6F7FA] border border-transparent focus:border-slate-300 text-xs sm:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none"
              />
              <Search
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              className="relative w-11 h-11 rounded-full bg-[#F6F7FA] hover:bg-slate-200 flex items-center justify-center text-[#0A1430] transition-colors"
              title="Notifications"
            >
              <Mail size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E8742A]" />
            </button>

            <div className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-[#F6F7FA] border border-slate-200/60 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#DCE7FF] text-[#1D4FD8] flex items-center justify-center font-black text-xs">
                AK
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-extrabold text-xs text-[#0A1430] leading-tight">
                  Dr Konan
                </span>
                <span className="text-[10px] text-[#8A8FA3] font-medium leading-tight">
                  Responsable Innovation
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENU DES PAGES ADMIN */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
