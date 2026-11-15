import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles, galleryImages } from '../../data/newsData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Actualites() {
  const featured = newsArticles[0];
  const secondaryNews = newsArticles.slice(1);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    setActivePhotoIdx(idx);
  };

  const closeLightbox = () => {
    setActivePhotoIdx(null);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % galleryImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex justify-center min-w-0 font-nunito">
      <div
        data-screen-label="S6 Actualites et galerie"
        className="w-full max-w-[560px] md:max-w-[860px] lg:max-w-[920px] mx-auto pt-[84px] md:pt-[124px] pb-8 md:pb-16 px-[18px] md:px-6 flex flex-col gap-4"
      >
        {/* En-tête exact du prototype */}
        <span className="font-mono text-[13px] font-semibold text-[#2F6BF0] uppercase tracking-wider">
          ACTUALITÉS
        </span>
        <h1 className="m-0 font-extrabold text-[34px] sm:text-[38px] text-[#0E1E4A] tracking-[-0.02em] leading-none">
          Les dernières nouvelles
        </h1>

        {/* 1. Article principal à la Une (image au-dessus, texte en dessous dans carte blanche arrondie) */}
        {featured && (
          <div className="bg-white rounded-[22px] overflow-hidden shadow-xs border border-slate-100 flex flex-col">
            <Link
              to={`/actualites/${featured.slug}`}
              className="block h-[200px] md:h-[280px] w-full overflow-hidden bg-[#1B2D63] group cursor-pointer"
            >
              <img
                src={featured.image}
                alt={featured.titre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-4 flex flex-col gap-1.5">
              <span className="font-mono text-[13px] font-semibold text-[#2F6BF0]">
                {featured.date}
              </span>
              <Link
                to={`/actualites/${featured.slug}`}
                className="m-0 font-extrabold text-[22px] leading-[1.15] text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors"
              >
                {featured.titre}
              </Link>
              <span className="font-normal text-[15px] leading-[1.5] text-[#4A5168]">
                {featured.resume}
              </span>
            </div>
          </div>
        )}

        {/* 2. Liste des actualités secondaires (empilées verticalement avec miniature 96x72px) */}
        <div className="flex flex-col gap-3">
          {secondaryNews.map((item) => (
            <Link
              key={item.id}
              to={`/actualites/${item.slug}`}
              className="flex gap-3 items-center group cursor-pointer"
            >
              <div className="w-[96px] h-[72px] flex-none rounded-[14px] overflow-hidden bg-slate-100 shadow-xs">
                <img
                  src={item.image}
                  alt={item.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-mono text-[12px] font-semibold text-[#2F6BF0]">
                  {item.date}
                </span>
                <span className="font-bold text-[16px] leading-[1.3] text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors">
                  {item.titre}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. Section Galerie (STRICTEMENT 3 photos par ligne : repeat(3, 1fr)) */}
        <h2 className="mt-3 mb-0 font-extrabold text-[26px] text-[#0E1E4A]">
          Galerie
        </h2>
        <div className="grid grid-cols-3 gap-1.5 md:gap-2.5">
          {galleryImages.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => openLightbox(idx)}
              aria-label={`Agrandir la photo ${idx + 1}`}
              className="aspect-square rounded-[12px] md:rounded-[14px] overflow-hidden bg-slate-200 cursor-pointer shadow-xs active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-[#2F6BF0] group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal au clic sur une photo */}
      {activePhotoIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={closeLightbox}
            aria-label="Fermer la vue"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X size={22} />
          </button>

          <button
            onClick={prevPhoto}
            aria-label="Photo précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <ChevronLeft size={26} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black flex flex-col items-center"
          >
            <img
              src={galleryImages[activePhotoIdx].src}
              alt={galleryImages[activePhotoIdx].alt}
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
            <p className="text-white/80 text-sm font-medium py-3 px-4 text-center">
              {galleryImages[activePhotoIdx].alt} ({activePhotoIdx + 1} / {galleryImages.length})
            </p>
          </div>

          <button
            onClick={nextPhoto}
            aria-label="Photo suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </div>
  );
}
