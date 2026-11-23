import React from 'react';
import { partnersData } from '../../data/partnersData';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 bg-white text-center">
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-6">Avec le soutien institutionnel et partenaires</span>
      <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto opacity-75">
        {partnersData.map((p) => (
          <div key={p.id} className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 font-bold text-xs text-slate-600">
            {p.nom}
          </div>
        ))}
      </div>
    </section>
  );
};
