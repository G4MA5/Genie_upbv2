import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Users, Sliders, Download, GraduationCap, Settings, ArrowLeft, Clock } from 'lucide-react';

export const SidebarAdmin: React.FC = () => {
  const location = useLocation();

  const menu = [
    { label: 'Tableau de bord', path: '/admin/dashboard', iconKey: '▦', icon: LayoutGrid },
    { label: 'Équipes à valider', path: '/admin/equipes', iconKey: '◎', icon: Users },
    { label: 'Quotas & attente', path: '/admin/quotas', iconKey: '≡', icon: Sliders },
    { label: 'Export PCO', path: '/admin/export', iconKey: '↓', icon: Download },
    { label: 'Suivi Formations', path: '/admin/formations', iconKey: '▷', icon: GraduationCap },
    { label: 'Paramètres tournoi', path: '/admin/parametres', iconKey: '⚙', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#F6F7FA] border-r border-slate-200/80 p-5 flex flex-col justify-between min-h-screen shrink-0">
      <div className="flex flex-col gap-6">
        {/* LOGO ADMIN */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-10 h-10 rounded-2xl bg-[#0E1E4A] text-white flex items-center justify-center font-black text-xl shadow-md">
            G
          </div>
          <div>
            <h2 className="font-black text-base text-[#0E1E4A] tracking-tight leading-none">
              GÉNIE UPB
            </h2>
            <span className="text-[11px] font-mono font-bold text-[#E8742A]">
              ADMINISTRATION
            </span>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <nav className="flex flex-col gap-1">
          {menu.map(item => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`min-h-[46px] px-3.5 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all ${
                  active
                    ? 'bg-white text-[#0A1430] shadow-[0_8px_20px_rgba(14,30,74,0.08)] font-extrabold'
                    : 'text-[#4A5168] hover:bg-slate-200/50 hover:text-[#0A1430]'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    active ? 'bg-[#2F63D0] text-white' : 'bg-[#E8ECF5] text-[#4A5168]'
                  }`}
                >
                  {item.iconKey}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BAS DE SIDEBAR : CARTE COMPTE À REBOURS ORANGE & LIEN RETOUR */}
      <div className="flex flex-col gap-3 pt-6">
        <div className="relative rounded-[22px] p-4 bg-[#E8742A] text-[#0A1430] overflow-hidden flex flex-col gap-2 shadow-sm">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/20 pointer-events-none" />
          <span className="font-extrabold text-sm leading-tight text-[#0A1430]">
            Clôture des inscriptions
          </span>
          <span className="font-semibold text-xs text-[#3A1A06]">
            18 décembre 2026
          </span>
          <Link
            to="/admin/export"
            className="mt-1 min-h-[34px] px-3.5 rounded-xl bg-white text-[#0A1430] font-extrabold text-xs flex items-center justify-center hover:bg-slate-50 transition-colors shadow-xs"
          >
            Préparer l'export →
          </Link>
        </div>

        <Link
          to="/"
          className="min-h-[40px] px-3 rounded-xl text-xs font-bold text-[#4A5168] hover:text-[#0E1E4A] hover:bg-slate-200/40 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>← Retour au site public</span>
        </Link>
      </div>
    </aside>
  );
};
