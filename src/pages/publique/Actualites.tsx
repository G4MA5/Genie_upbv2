import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles, galleryImages } from '../../data/newsData';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

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
        className="w-full max-w-[560px] md:max-w-[1080px] lg:max-w-[1180px] mx-auto pt-[84px] md:pt-[124px] pb-12 md:pb-20 px-[18px] md:px-8 flex flex-col gap-4 md:gap-7"
      >
        {/* En-tête officiel du prototype */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[13px] font-semibold text-[#2F6BF0] uppercase tracking-wider">
            ACTUALITÉS
          </span>
          <h1 className="m-0 font-extrabold text-[34px] sm:text-[38px] md:text-[44px] text-[#0E1E4A] tracking-[-0.02em] leading-tight">
            Les dernières nouvelles
          </h1>
        </div>

        {/* 1. Article à la Une (Featured card) */}
        {featured && (
          <Link
            to={`/actualites/${featured.slug}`}
            className="group bg-white rounded-[22px] md:rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgba(10,20,48,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-stretch"
          >
            {/* Slot image principale */}
            <div className="relative h-[200px] md:h-auto md:w-1/2 overflow-hidden bg-[#1B2D63] flex-shrink-0">
              <img
                src={featured.image}
                alt={featured.titre}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Contenu textuel */}
            <div className="p-4 md:p-8 md:w-1/2 flex flex-col justify-center gap-1.5 md:gap-3">
              <span className="font-mono text-[13px] font-semibold text-[#2F6BF0]">
                {featured.date}
              </span>
              <h2 className="m-0 font-extrabold text-[22px] md:text-[28px] leading-[1.15] text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors">
                {featured.titre}
              </h2>
              <p className="m-0 font-normal text-[15px] md:text-[16px] leading-[1.5] text-[#4A5168]">
                {featured.resume}
              </p>
            </div>
          </Link>
        )}

        {/* 2. Liste des actualités secondaires */}
        <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-5">
          {secondaryNews.map((item) => (
            <Link
              key={item.id}
              to={`/actualites/${item.slug}`}
              className="group flex gap-3 md:gap-4 items-center bg-transparent md:bg-white md:p-3.5 md:rounded-[20px] md:border md:border-slate-100 md:shadow-xs md:hover:shadow-md md:hover:border-slate-200 transition-all cursor-pointer"
            >
              <div className="w-[96px] md:w-[110px] h-[72px] md:h-[80px] flex-none rounded-[14px] overflow-hidden bg-slate-100 shadow-xs">
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
                <span className="font-bold text-[16px] md:text-[17px] leading-[1.3] text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors line-clamp-2">
                  {item.titre}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. Section Galerie (Prototype S6) */}
        <div className="flex flex-col gap-3 mt-2 md:mt-4">
          <h2 className="m-0 font-extrabold text-[26px] text-[#0E1E4A]">Galerie</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-[6px] md:gap-3.5">
            {galleryImages.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={`Agrandir la photo ${idx + 1}`}
                className="group relative aspect-square rounded-[12px] md:rounded-[18px] overflow-hidden bg-slate-200 cursor-pointer shadow-xs active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-[#2F6BF0]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0E1E4A]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye size={20} className="text-white drop-shadow-md" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal interactif pour la galerie */}
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
