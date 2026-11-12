import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PlayCircle, User, CheckCircle2, FileText, LogOut } from 'lucide-react';

export const SidebarCandidat: React.FC = () => {
  const location = useLocation();

  const menu = [
    { label: 'Mon Espace', path: '/espace/dashboard', icon: Home },
    { label: 'Mon Équipe', path: '/espace/equipe', icon: Users },
    { label: 'Statut du Dossier', path: '/espace/statut', icon: CheckCircle2 },
    { label: 'Formations & Ateliers', path: '/espace/formations', icon: PlayCircle },
    { label: 'Mon Profil', path: '/espace/profil', icon: User }
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col justify-between p-6 h-[calc(100vh-4.5rem)] sticky top-18">
      <div>
        <div className="mb-8">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E8742A] block mb-1">Espace Candidat</span>
          <h2 className="font-extrabold text-base text-[#0E1E4A]">Tableau de Bord</h2>
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
                    ? 'bg-[#E3EAFB] text-[#1F4BB8] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0E1E4A]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Retour au site public</span>
        </Link>
      </div>
    </aside>
  );
};
