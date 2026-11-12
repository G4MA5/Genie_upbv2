import React from 'react';
import { UserCheck, Clock } from 'lucide-react';
export const MemberSlot: React.FC<{ nom: string; matricule: string; isCaptain?: boolean; status: string }> = ({ nom, matricule, isCaptain, status }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
    <div>
      <span className="font-bold text-sm text-[#0A1430] block">{nom} {isCaptain && '👑'}</span>
      <span className="text-xs text-slate-400 font-mono">{matricule}</span>
    </div>
    {status === 'valide' ? <UserCheck className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-amber-500" />}
  </div>
);
