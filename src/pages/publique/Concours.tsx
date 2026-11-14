import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../data/categoriesData';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

export default function Concours() {
  return (
    <div className="min-h-screen bg-[#F6F8FC] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* En-tête de section authentique */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#2F6BF0] uppercase">
              LE CONCOURS
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2F6BF0]/40 rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0E1E4A] tracking-tight leading-tight">
            Un concours, quatre terrains.
          </h1>

          <p className="text-base sm:text-lg text-[#3D4459] leading-relaxed max-w-3xl">
            GÉNIE UPB réunit les étudiants de licence autour de défis concrets. Pendant trois jours, les
            équipes conçoivent, testent et défendent leurs projets devant un jury de professionnels. Cinq
            semaines de formations intensives les y préparent.
          </p>
        </div>

        {/* Grille des 4 Catégories officielles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              style={{ borderTopColor: cat.couleur }}
              className="bg-white rounded-[22px] p-5 sm:p-6 flex flex-col gap-3.5 shadow-[0_4px_20px_rgba(10,20,48,0.05)] border border-slate-100/80 border-t-[5px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,20,48,0.09)] group"
            >
              {/* Titre & Numéro */}
              <div className="flex justify-between items-baseline">
                <span className="font-extrabold text-[24px] sm:text-[26px] text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors">
                  {cat.name}
                </span>
                <span
                  style={{ color: cat.couleur }}
                  className="font-extrabold text-[28px] sm:text-[30px] font-mono"
                >
                  {cat.code}
                </span>
              </div>

              {/* Pitch */}
              <p className="font-normal text-[15px] sm:text-[16px] leading-relaxed text-[#4A5168] min-h-[48px]">
                {cat.pitch}
              </p>

              {/* Métriques d'équipe & Places */}
              <div className="flex justify-between items-center font-semibold text-[14px] sm:text-[15px] text-[#4A5168] pt-1">
                <span className="flex items-center gap-1.5">
                  <Users size={16} className="text-slate-400" />
                  {cat.tailleEquipe}
                </span>
                <span style={{ color: cat.couleur }} className="font-bold">
                  {cat.placesRestantes}
                </span>
              </div>

              {/* Barre de remplissage */}
              <div className="h-2 rounded-full bg-[#EEECE6] overflow-hidden">
                <div
                  style={{
                    width: `${cat.tauxRemplissage}%`,
                    backgroundColor: cat.couleur,
                  }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>

              {/* Épreuves clés */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.epreuves.map((ep) => (
                  <span
                    key={ep}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
                  >
                    {ep}
                  </span>
                ))}
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-2.5 pt-3 mt-auto">
                <Link
                  to={`/concours/${cat.slug}`}
                  className="flex-1 min-h-[46px] rounded-full border-[1.5px] border-[#0E1E4A] text-[#0E1E4A] hover:bg-[#0E1E4A] hover:text-white font-semibold text-[15px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>Voir la fiche</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  to="/inscription"
                  className="flex-1 min-h-[46px] rounded-full bg-[#E8742A] hover:bg-[#d96720] text-white font-bold text-[15px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
                >
                  <span>S'inscrire</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière de réassurance / Parcours */}
        <div className="bg-[#0E1E4A] rounded-[24px] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#F58220]">
              <Sparkles size={18} />
              <span className="font-bold text-xs uppercase tracking-wider">Accompagnement d'excellence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">5 semaines de formations certifiantes offertes</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Chaque équipe inscrite accède à des masterclass en présentiel et visio animées par des experts
              du barreau, des banquiers d'affaires et des ingénieurs IoT.
            </p>
          </div>

          <Link
            to="/inscription"
            className="shrink-0 min-h-[48px] px-6 rounded-full bg-white hover:bg-slate-100 text-[#0E1E4A] font-extrabold text-[15px] flex items-center gap-2 active:scale-95 transition-all"
          >
            <span>Former mon équipe</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
