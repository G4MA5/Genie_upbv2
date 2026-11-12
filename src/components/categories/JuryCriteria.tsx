import React from 'react';
export const JuryCriteria: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-6">
    <h3 className="font-black text-lg text-[#0E1E4A] mb-2">Critères d'Évaluation du Jury</h3>
    <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
      <li>Pertinence et originalité de la solution</li>
      <li>Faisabilité technique et solidité du prototype</li>
      <li>Clarté de la présentation et joute oratoire</li>
    </ul>
  </div>
);
