import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CategorieTechnologie from './categories/CategorieTechnologie';
import CategorieDroit from './categories/CategorieDroit';
import CategorieEconomie from './categories/CategorieEconomie';
import CategorieInnovation from './categories/CategorieInnovation';

export default function FicheCategorie() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const navigate = useNavigate();

  const currentSlug = categorySlug?.toLowerCase() || 'technologie';

  const categories = [
    { slug: 'technologie', name: 'Technologie', code: '01', color: '#2F6BF0' },
    { slug: 'droit', name: 'Droit', code: '02', color: '#7A1A1F' },
    { slug: 'economie', name: 'Économie', code: '03', color: '#1B7A3E' },
    { slug: 'innovation', name: 'Innovation', code: '04', color: '#FF7A00' },
  ];

  return (
    <div className="min-h-screen bg-[#0A1430] text-white">
      {/* Barre de navigation et Switcher Catégories Fixe */}
      <div className="sticky top-0 z-40 bg-[#0A1430]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/concours')}
            className="flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm sm:text-base transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Tous les concours</span>
          </button>

          {/* Onglets 4 disciplines */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = cat.slug === currentSlug;
              return (
                <Link
                  key={cat.slug}
                  to={`/concours/${cat.slug}`}
                  className={`flex-none px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-white text-[#0A1430] shadow-md scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span className="opacity-70 font-mono mr-1.5">{cat.code}.</span>
                  {cat.name}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => navigate('/inscription')}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-sm shadow-md hover:brightness-110 transition-all cursor-pointer"
          >
            S'inscrire
          </button>
        </div>
      </div>

      {/* Rendu Authentique de la Catégorie Active */}
      <div>
        {currentSlug === 'technologie' && <CategorieTechnologie />}
        {currentSlug === 'droit' && <CategorieDroit />}
        {currentSlug === 'economie' && <CategorieEconomie />}
        {currentSlug === 'innovation' && <CategorieInnovation />}
        {!['technologie', 'droit', 'economie', 'innovation'].includes(currentSlug) && (
          <CategorieTechnologie />
        )}
      </div>
    </div>
  );
}
