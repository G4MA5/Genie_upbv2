import React from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../../data/newsData';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';

export default function Actualites() {
  const featured = newsArticles[0];
  const others = newsArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#F6F8FC] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#2F6BF0] uppercase">
              ACTUALITÉS OFFICIELLES
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2F6BF0]/40 rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0E1E4A] tracking-tight leading-tight">
            Les dernières nouvelles
          </h1>

          <p className="text-base sm:text-lg text-[#4A5168] leading-relaxed max-w-2xl">
            Toute l'actualité du tournoi, les annonces de partenariats, les interviews des lauréats et les conseils pratiques de préparation.
          </p>
        </div>

        {/* Article à la Une (Featured Card) */}
        {featured && (
          <Link
            to={`/actualites/${featured.slug}`}
            className="group bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgba(10,20,48,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
          >
            <div className="relative md:w-1/2 h-[240px] md:h-auto min-h-[260px] overflow-hidden bg-slate-100">
              <img
                src={featured.image}
                alt={featured.titre}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0E1E4A]/80 backdrop-blur-md text-white text-xs font-bold font-mono">
                À LA UNE
              </span>
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                  <span className="font-bold text-[#2F6BF0]">{featured.date}</span>
                  <span>•</span>
                  <span>{featured.tempsLecture} de lecture</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors leading-snug">
                  {featured.titre}
                </h2>

                <p className="text-sm sm:text-base text-[#4A5168] leading-relaxed line-clamp-3">
                  {featured.resume}
                </p>
              </div>

              <div className="flex items-center gap-2 font-bold text-sm text-[#2F6BF0] group-hover:translate-x-1 transition-transform pt-2">
                <span>Lire l’article complet</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        )}

        {/* Grille des autres articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((article) => (
            <Link
              key={article.id}
              to={`/actualites/${article.slug}`}
              className="group bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative h-[180px] overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.titre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#0E1E4A] text-xs font-extrabold">
                  {article.categorie}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs font-bold text-[#2F6BF0]">
                    {article.date}
                  </span>
                  <h3 className="font-extrabold text-lg text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors leading-snug line-clamp-2">
                    {article.titre}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5168] line-clamp-3 leading-relaxed">
                    {article.resume}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 font-bold text-xs text-[#2F6BF0] pt-2">
                  <span>En savoir plus</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
