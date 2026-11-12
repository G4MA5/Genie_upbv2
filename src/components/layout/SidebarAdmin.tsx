import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart3, Download, GraduationCap, Settings, LogOut } from 'lucide-react';

export const SidebarAdmin: React.FC = () => {
  const location = useLocation();

  const menu = [
    { label: 'Vue Globale', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Équipes à Valider', path: '/admin/equipes', icon: CheckSquare },
    { label: 'Gestion Quotas', path: '/admin/quotas', icon: BarChart3 },
    { label: 'Export PCO', path: '/admin/export', icon: Download },
    { label: 'Suivi Formations', path: '/admin/formations', icon: GraduationCap },
    { label: 'Paramètres Tournoi', path: '/admin/parametres', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0A1430] text-white flex flex-col justify-between p-6 min-h-screen">
      <div>
        <div className="mb-8">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E8B33D] block mb-1">Administration</span>
          <h2 className="font-extrabold text-base text-white">Comité d'Organisation</h2>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  active
                    ? 'bg-[#E8742A] text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Quitter l'administration</span>
        </Link>
      </div>
    </aside>
  );
};
