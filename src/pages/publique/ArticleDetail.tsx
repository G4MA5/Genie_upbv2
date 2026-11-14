import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsArticles } from '../../data/newsData';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article =
    newsArticles.find((a) => a.slug === slug) || newsArticles[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.titre,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien de l’article copié dans le presse-papier !');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Navigation retour */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/actualites')}
            className="flex items-center gap-2 text-sm font-bold text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Toutes les actualités</span>
          </button>

          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-[#0E1E4A] hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            title="Partager cet article"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* En-tête de l'article */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="font-extrabold px-3 py-1 rounded-full bg-[#DCE7FB] text-[#2F63D0]">
              {article.categorie}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar size={13} />
              {article.date}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock size={13} />
              {article.tempsLecture}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0E1E4A] leading-tight tracking-tight">
            {article.titre}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-[#2F6BF0] pl-4 my-2">
            « {article.resume} »
          </p>
        </div>

        {/* Image Principale */}
        <div className="rounded-[24px] overflow-hidden bg-slate-100 shadow-md max-h-[420px]">
          <img
            src={article.image}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corps de l'article */}
        <article className="bg-white rounded-[24px] p-6 sm:p-10 shadow-sm border border-slate-100 flex flex-col gap-6 text-[#3D4459] text-base sm:text-lg leading-relaxed">
          {article.contenu.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="border-t border-slate-100 pt-6 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 font-bold text-slate-600">
              <User size={14} />
              {article.auteur}
            </span>
            <span>GÉNIE UPB 2026-2027</span>
          </div>
        </article>

        {/* Bannière de passage à l'action */}
        <div className="bg-[#0E1E4A] text-white rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="font-extrabold text-xl text-white">Prêt à relever le défi ?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Les inscriptions sont ouvertes pour toutes les promotions de l'UPB.
            </p>
          </div>

          <Link
            to="/inscription"
            className="shrink-0 min-h-[46px] px-6 rounded-full bg-[#E8742A] hover:bg-[#d96720] text-white font-extrabold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <span>Créer mon compte</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
