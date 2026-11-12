import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SidebarCandidat } from '../components/layout/SidebarCandidat';
import { BottomTabBar } from '../components/layout/BottomTabBar';

export default function StructureCandidat() {
  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col">
      {/* HEADER CANDIDAT */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 h-18 px-6 flex items-center justify-between">
        <Link to="/espace/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0E1E4A] flex items-center justify-center text-white font-black text-lg">
            G
          </div>
          <span className="font-extrabold text-[#0E1E4A] text-base">GÉNIE UPB</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="font-bold text-xs text-[#0A1430] block">Kouassi Ariel (Capitaine)</span>
            <span className="text-[10px] text-slate-400">UPB-2026-8841 • L3 Tech</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#E8742A] text-white flex items-center justify-center font-bold text-xs">
            KA
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <SidebarCandidat />
        <main className="flex-1 p-4 sm:p-8 pb-24 md:pb-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <BottomTabBar />
    </div>
  );
}
