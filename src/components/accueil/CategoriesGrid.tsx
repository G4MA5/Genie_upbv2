import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';

export const CategoriesGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8742A] block mb-2">Les Pôles d'Excellence</span>
        <h2 className="font-black text-2xl sm:text-4xl text-[#0E1E4A]">Choisissez votre terrain de jeu</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesData.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                  {cat.code}
                </span>
                <span className="text-[11px] font-bold text-[#E8742A] bg-orange-50 px-2 py-0.5 rounded-full">
                  {cat.placesRestantes}
                </span>
              </div>
              <h3 className="font-extrabold text-xl text-[#0E1E4A] mb-2">{cat.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">{cat.pitch}</p>
            </div>

            <div>
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-slate-400 font-bold mb-1">
                  <span>Inscriptions</span>
                  <span>{cat.tauxRemplissage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#E8742A] h-2 rounded-full" style={{ width: `${cat.tauxRemplissage}%` }}></div>
                </div>
              </div>
              <Link
                to={`/concours/${cat.slug}`}
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-[#0E1E4A] text-[#0E1E4A] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Détail de l'épreuve <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
