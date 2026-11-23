import React from 'react';
import { Link } from 'react-router-dom';

export const NewsCarousel: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-[#E8742A] uppercase tracking-wider block mb-1">Actualités</span>
          <h2 className="font-black text-xl text-[#0E1E4A]">Dernières annonces du tournoi</h2>
        </div>
        <Link to="/actualites" className="text-xs font-bold text-[#0E1E4A] hover:underline">Voir tout →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { date: '04 NOV. 2026', title: 'Les catégories de GÉNIE UPB 2026 dévoilées' },
          { date: '28 OCT. 2026', title: 'Publication de la grille d\'évaluation du Jury' },
          { date: '15 OCT. 2026', title: 'Ouverture des sessions de masterclasses avec nos formateurs' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-mono text-[10px] font-bold text-[#E8742A] block mb-2">{item.date}</span>
            <h3 className="font-bold text-sm text-[#0E1E4A] mb-4">{item.title}</h3>
            <Link to="/actualites" className="text-xs font-bold text-slate-500 hover:text-[#0E1E4A]">Lire l'article →</Link>
          </div>
        ))}
      </div>
    </section>
  );
};
