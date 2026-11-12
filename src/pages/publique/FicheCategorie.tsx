import React from 'react';
import { Link } from 'react-router-dom';


export default function FicheCategorie() {
  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto w-full animate-fadeIn">
      {/* BANDEAU INDICATEUR POUR DÉVELOPPEUR & AGENT IA */}
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-black px-2.5 py-1 bg-[#0E1E4A] text-white rounded-md">
            S2a
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Portail Public
          </span>
        </div>
        <h1 className="font-black text-2xl sm:text-3xl text-[#0A1430] mb-2">Fiche de Catégorie</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">Détail de la filière (Droit SD, Innovation SI, Technologie ST, Économie SE), épreuves et critères du jury.</p>
      </div>

      {/* ZONE D'INTÉGRATION FUTURE */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center text-slate-400 text-xs italic">Section prête pour l'intégration des composants Figma / Prototype.</div>
      </div>
    </div>
  );
}
