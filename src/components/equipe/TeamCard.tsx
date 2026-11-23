import React from 'react';
import { Users } from 'lucide-react';
export const TeamCard: React.FC<{ nom: string; categorie: string; statut: string }> = ({ nom, categorie, statut }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-[#0E1E4A] text-white flex items-center justify-center font-bold">
        <Users className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-black text-lg text-[#0E1E4A]">{nom}</h3>
        <p className="text-xs text-slate-400 font-bold">{categorie}</p>
      </div>
    </div>
    <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{statut}</span>
  </div>
);
