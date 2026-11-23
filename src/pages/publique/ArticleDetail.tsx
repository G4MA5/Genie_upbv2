import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsArticles } from '../../data/newsData';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article =
    newsArticles.find((a) => a.slug === slug) || newsArticles[0];

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex justify-center min-w-0 font-nunito">
      <div
        data-screen-label="Article"
        className="w-full max-w-[560px] md:max-w-[1080px] lg:max-w-[1180px] mx-auto md:my-8 bg-transparent md:bg-white md:rounded-[28px] md:shadow-[0_8px_32px_rgba(10,20,48,0.06)] md:border md:border-slate-100 overflow-hidden"
      >
        {/* Bannière Hero (260px sur mobile, 420px sur desktop) */}
        <div className="relative h-[260px] md:h-[420px] bg-[#1B2D63] overflow-hidden">
          <img
            src={article.image}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
          {/* Bouton retour rond exact du prototype */}
          <button
            onClick={() => navigate('/actualites')}
            aria-label="Retour aux actualités"
            className="absolute top-4 left-4 md:top-6 md:left-6 w-[46px] h-[46px] rounded-full bg-white shadow-md flex items-center justify-center font-bold text-[20px] text-[#0E1E4A] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer z-10"
          >
            <ArrowLeft size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Contenu textuel fidèle 100% au prototype Screen A */}
        <div className="p-[20px_20px_36px] md:p-10 flex flex-col gap-[14px] md:gap-5">
          {/* Tag de date et catégorie */}
          <span className="font-mono text-[13px] font-semibold text-[#2F6BF0] uppercase tracking-wider">
            {article.date} · {article.tag}
          </span>

          {/* Titre H1 */}
          <h1 className="m-0 font-extrabold text-[30px] sm:text-[32px] md:text-[38px] leading-[1.05] text-[#0E1E4A] tracking-[-0.02em]">
            {article.titre}
          </h1>

          {/* Chapeau bold */}
          <p className="m-0 font-semibold text-[17px] md:text-[18px] leading-[1.55] text-[#121628]">
            {article.chapeau}
          </p>

          {/* Premier paragraphe explicatif */}
          <p className="m-0 font-normal text-[16px] md:text-[17px] leading-[1.65] text-[#3D4459]">
            {article.paragraphe1}
          </p>

          {/* Citation mise en valeur orange */}
          <div className="border-l-4 border-[#E8742A] pl-4 py-1 font-extrabold text-[20px] md:text-[22px] leading-[1.3] text-[#0E1E4A] my-1">
            {article.citation}
          </div>

          {/* Deuxième paragraphe */}
          <p className="m-0 font-normal text-[16px] md:text-[17px] leading-[1.65] text-[#3D4459]">
            {article.paragraphe2}
          </p>

          {/* Bouton CTA d'inscription officiel */}
          <Link
            to="/inscription"
            data-shine="1"
            className="mt-2 min-h-[52px] rounded-full bg-[#E8742A] hover:bg-[#d96720] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center active:scale-98 transition-all shadow-sm"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
