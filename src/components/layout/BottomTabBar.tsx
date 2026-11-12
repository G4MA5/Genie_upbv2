import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PlayCircle, User } from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { label: 'Espace', path: '/espace/dashboard', icon: Home },
    { label: 'Équipe', path: '/espace/equipe', icon: Users, isHighlight: true },
    { label: 'Formations', path: '/espace/formations', icon: PlayCircle },
    { label: 'Profil', path: '/espace/profil', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-3 py-2 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = location.pathname.startsWith(tab.path);

        if (tab.isHighlight) {
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all shadow-md ${
                active
                  ? 'bg-gradient-to-r from-[#2F6BF0] to-[#6FA2FF] text-white shadow-blue-500/40'
                  : 'bg-[#0E1E4A] text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-bold py-1 px-2.5 rounded-lg transition-colors ${
              active ? 'text-[#2F6BF0]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
