import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categoriesData } from '../../data/categoriesData';
import { ArrowLeft, Users, Trophy, Award, CheckCircle2, Mail, Phone, ArrowRight } from 'lucide-react';

export default function FicheCategorie() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const navigate = useNavigate();

  // Trouver la catégorie courante (par défaut 'technologie')
  const currentCat =
    categoriesData.find((c) => c.slug === categorySlug) || categoriesData[0];

  return (
    <div className="min-h-screen bg-[#F6F8FC] pb-28 md:pb-20">
      {/* 1. GRANDE BANNIÈRE PHOTO IMMERSIVE (Exacte Prototype) */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] bg-[#1B2D63] overflow-hidden">
        {/* Photo de couverture */}
        <div
          style={{ backgroundImage: `url(${currentCat.image})` }}
          className="absolute inset-0 bg-cover bg-[center_22%] transition-all duration-700"
        />

        {/* Dégradé sombre cinématique */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1430]/60 via-transparent to-[#0A1430]/90 pointer-events-none" />

        {/* Bouton retour circulaire */}
        <button
          onClick={() => navigate('/concours')}
          aria-label="Retour aux concours"
          className="absolute top-5 left-4 sm:left-6 md:left-8 z-10 w-11 h-11 rounded-full bg-white text-[#0E1E4A] font-extrabold text-lg flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Titre et code de la catégorie */}
        <div className="absolute left-4 sm:left-6 md:left-8 bottom-6 z-10 flex flex-col gap-1">
          <span className="font-extrabold text-sm sm:text-base md:text-lg text-[#A9C2FF] font-mono tracking-wider">
            CATÉGORIE {currentCat.code}
          </span>
          <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            {currentCat.name}
          </h1>
        </div>
      </div>

      {/* 2. ONGLETS DE SWITCHER HORIZONTAL ENTRE LES 4 DISCIPLINES */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2.5 py-3 overflow-x-auto no-scrollbar">
          {categoriesData.map((cat) => {
            const isActive = cat.slug === currentCat.slug;
            return (
              <Link
                key={cat.id}
                to={`/concours/${cat.slug}`}
                className={`flex-none min-h-[40px] px-4 rounded-full font-bold text-sm sm:text-[15px] flex items-center gap-2 border-2 transition-all ${
                  isActive
                    ? 'bg-[#0E1E4A] border-[#0E1E4A] text-white shadow-sm'
                    : 'bg-white border-slate-200 text-[#0E1E4A] hover:border-[#0E1E4A]/40'
                }`}
              >
                <span className="font-mono text-xs opacity-75">{cat.code}.</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. CORPS DE LA FICHE DÉTAILLÉE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-8">
        {/* Grille des Métriques Clés */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
          <div className="bg-white rounded-[18px] p-4 sm:p-5 flex flex-col gap-1 border border-slate-100 shadow-sm">
            <span className="font-semibold text-xs sm:text-sm text-[#6A7189] flex items-center gap-1.5">
              <Users size={15} />
              Taille de l'équipe
            </span>
            <span className="font-extrabold text-lg sm:text-2xl text-[#0E1E4A]">
              {currentCat.tailleEquipe}
            </span>
          </div>

          <div className="bg-white rounded-[18px] p-4 sm:p-5 flex flex-col gap-1 border border-slate-100 shadow-sm">
            <span className="font-semibold text-xs sm:text-sm text-[#6A7189] flex items-center gap-1.5">
              <Trophy size={15} />
              Disponibilité
            </span>
            <span
              style={{ color: currentCat.couleur }}
              className="font-extrabold text-lg sm:text-2xl"
            >
              {currentCat.placesRestantes}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white rounded-[18px] p-4 sm:p-5 flex flex-col gap-1 border border-slate-100 shadow-sm">
            <span className="font-semibold text-xs sm:text-sm text-[#6A7189] flex items-center gap-1.5">
              <Award size={15} />
              Remplissage
            </span>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{
                    width: `${currentCat.tauxRemplissage}%`,
                    backgroundColor: currentCat.couleur,
                  }}
                  className="h-full rounded-full"
                />
              </div>
              <span className="font-mono font-bold text-sm text-[#0E1E4A]">
                {currentCat.tauxRemplissage}%
              </span>
            </div>
          </div>
        </div>

        {/* Section Présentation & Enjeux */}
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col gap-3 border border-slate-100 shadow-sm">
          <h2 className="font-black text-xl sm:text-2xl text-[#0E1E4A]">
            La catégorie en détail
          </h2>
          <p className="font-normal text-base sm:text-lg leading-relaxed text-[#3D4459]">
            {currentCat.pitch}
          </p>
        </div>

        {/* Format de l'épreuve */}
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col gap-3 border border-slate-100 shadow-sm">
          <h2 className="font-black text-xl sm:text-2xl text-[#0E1E4A]">
            Format officiel de l'épreuve
          </h2>
          <div className="bg-[#FFF6DA] border-[1.5px] border-dashed border-[#E8B33D] rounded-xl p-4 sm:p-5 text-[#8A6A20] font-medium text-sm sm:text-base leading-relaxed">
            {currentCat.formatEpreuve}
          </div>
        </div>

        {/* Critères d'évaluation du Jury */}
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col gap-4 border border-slate-100 shadow-sm">
          <h2 className="font-black text-xl sm:text-2xl text-[#0E1E4A]">
            Critères d'évaluation du Jury
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentCat.criteres.map((cr) => (
              <div
                key={cr.n}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span
                  style={{ backgroundColor: currentCat.couleur }}
                  className="w-6 h-6 rounded-full text-white font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5"
                >
                  {cr.n}
                </span>
                <span className="font-semibold text-sm sm:text-base text-[#0E1E4A] leading-snug">
                  {cr.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Carte Récompenses dorée (Identique prototype) */}
        <div className="bg-[#0E1E4A] text-white rounded-[22px] p-6 sm:p-8 flex flex-col gap-3 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs tracking-wider text-[#F2C45A] uppercase">
              RÉCOMPENSES & PRIX
            </span>
            <span className="inline-block w-6 h-[2px] bg-[#F2C45A]" />
          </div>
          <p className="font-medium text-base sm:text-lg leading-relaxed text-[#C9D1E8] border-[1.5px] border-dashed border-[#F2C45A]/70 rounded-xl p-4 bg-white/5">
            {currentCat.recompenses}
          </p>
        </div>

        {/* Responsable de Catégorie */}
        <div className="bg-white rounded-[22px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div
              style={{ backgroundColor: currentCat.couleur }}
              className="w-14 h-14 rounded-full text-white font-black text-xl flex items-center justify-center shadow-md shrink-0"
            >
              {currentCat.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs text-[#6A7189]">
                Responsable de la catégorie
              </span>
              <span className="font-extrabold text-lg text-[#0E1E4A]">
                {currentCat.responsable.name}
              </span>
              <span className="text-xs sm:text-sm text-[#4A5168] font-medium">
                {currentCat.responsable.role}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs sm:text-sm text-slate-500 font-mono self-end sm:self-center">
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-[#2F6BF0]" />
              {currentCat.responsable.contact.split('·')[0].trim()}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={14} className="text-[#E8742A]" />
              {currentCat.responsable.contact.split('·')[1]?.trim()}
            </span>
          </div>
        </div>
      </div>

      {/* 4. BARRE STICKY D'INSCRIPTION INFÉRIEURE */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 sm:p-4 shadow-[0_-6px_25px_rgba(10,20,48,0.08)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-[#0E1E4A] leading-tight">
              {currentCat.placesRestantes}
            </span>
            <span className="text-xs text-[#6A7189] font-medium">
              Places limitées pour cette session
            </span>
          </div>

          <Link
            to={`/inscription?cat=${currentCat.slug}`}
            className="min-h-[48px] sm:min-h-[52px] px-6 sm:px-8 rounded-full bg-[#E8742A] hover:bg-[#d96720] text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>S'inscrire à cette catégorie</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
