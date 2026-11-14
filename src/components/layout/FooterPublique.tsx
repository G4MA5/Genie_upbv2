import React from 'react';
import { Link } from 'react-router-dom';

import gamaLabsLogo from '../../assets/images/f808f292.png';
import genieUpbLogo from '../../assets/images/logo_genie_upb.png';

export const FooterPublique: React.FC = () => {
  return (
    <footer className="relative bg-[#0A1430] text-white overflow-hidden select-none">
      {/* Halo radial bleu incandescent du footer officiel */}
      <div
        className="relative pt-16 sm:pt-28 lg:pt-36 px-4 sm:px-10 lg:px-16"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 100%, #6AA6FF 0%, #2F6BF0 32%, #1D4FD8 50%, rgba(16,40,120,0.6) 66%, rgba(10,20,48,0) 80%)',
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          {/* ============================================================== */}
          {/* 1. COLONNES DE LIENS & MARQUE                                   */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 sm:gap-10 lg:gap-8">
            {/* Colonne 1 : Marque, Accroche & Réseaux Sociaux */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <span className="font-extrabold text-2xl sm:text-3xl text-white tracking-[-0.02em]">
                GÉNIE UPB
              </span>
              <p className="font-normal text-sm sm:text-base lg:text-[19px] leading-relaxed text-white/85 max-w-sm">
                <span className="block sm:hidden">Le concours des étudiants de l'UPB.</span>
                <span className="hidden sm:block">
                  Le concours des étudiants de l'Université Polytechnique de Bingerville.
                </span>
              </p>

              {/* Pastilles réseaux sociaux interactives */}
              <div className="flex items-center gap-2.5 mt-1 sm:mt-2">
                {[
                  { label: 'IG', href: 'https://instagram.com', title: 'Instagram' },
                  { label: 'FB', href: 'https://facebook.com', title: 'Facebook' },
                  { label: 'in', href: 'https://linkedin.com', title: 'LinkedIn' },
                  { label: 'TT', href: 'https://tiktok.com', title: 'TikTok' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.title}
                    className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border border-white/40 grid place-items-center font-bold text-xs sm:text-sm text-white hover:bg-white hover:text-[#1D4FD8] hover:border-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Grille de 2 colonnes sur mobile, intégrée sur desktop */}
            <div className="grid grid-cols-2 lg:contents gap-6 sm:gap-8 mt-2 lg:mt-0">
              {/* Colonne 2 : Concours */}
              <div className="flex flex-col gap-3 min-w-0">
                <span className="font-bold text-sm sm:text-base text-white">Concours</span>
                <div className="flex flex-col gap-2.5 text-sm sm:text-[15px] font-medium text-white/75">
                  <Link
                    to="/concours"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Catégories
                  </Link>
                  <Link
                    to="/calendrier"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Calendrier
                  </Link>
                  <Link
                    to="/documents"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Documents
                  </Link>
                </div>
              </div>

              {/* Colonne 3 : Aide */}
              <div className="flex flex-col gap-3 min-w-0">
                <span className="font-bold text-sm sm:text-base text-white">Aide</span>
                <div className="flex flex-col gap-2.5 text-sm sm:text-[15px] font-medium text-white/75">
                  <Link
                    to="/faq-contact"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/faq-contact"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Contacts
                  </Link>
                  <Link
                    to="/partenaires"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Partenaires
                  </Link>
                </div>
              </div>
            </div>

            {/* Colonne 4 : Contact (visible sur desktop & tablette) */}
            <div className="hidden sm:flex flex-col gap-3 min-w-0">
              <span className="font-bold text-sm sm:text-base text-white">Contact</span>
              <div className="flex flex-col gap-2 text-sm sm:text-[15px] font-medium text-white/75">
                <span className="hover:text-white transition-colors cursor-pointer">
                  contact@genieupb.ci
                </span>
                <span className="text-white/60">
                  Lun–Ven · 08h00 – 17h00
                </span>
                <span className="text-white/60 text-xs sm:text-sm">
                  Campus UPB, Bingerville
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. BARRE LÉGALE, CRÉDITS GAMA_LABS & COPYRIGHT                 */}
          {/* ============================================================== */}
          <div className="mt-10 sm:mt-14 pt-4 sm:pt-5 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 font-medium text-xs sm:text-sm text-white/75">
            <div>
              <span className="block sm:inline">© 2026 GÉNIE UPB · </span>
              <span className="block sm:inline">Université Polytechnique de Bingerville</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <Link to="/documents" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/documents" className="hover:text-white transition-colors">
                Confidentialité
              </Link>
              <div className="flex items-center gap-2">
                <img
                  src={gamaLabsLogo}
                  alt="Gama_labs"
                  className="h-4 sm:h-5 w-auto object-contain opacity-90"
                />
                <span className="text-white/80">Conçu par Gama_labs</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. SIGNATURE MAJESTUEUSE « GENIE UPB » (100% VISIBLE & NON COUPÉE) */}
          {/* ============================================================== */}
          {/* Version Desktop & Tablette : Grand lettrage architectural centré, complet et non tronqué */}
          <div className="hidden sm:flex items-center justify-center pt-8 sm:pt-12 pb-6 sm:pb-10 select-none">
            <span className="font-black text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] 2xl:text-[190px] leading-none tracking-[-0.04em] text-white/95 text-center whitespace-nowrap block drop-shadow-[0_10px_30px_rgba(10,20,80,0.35)]">
              GENIE UPB
            </span>
          </div>

          {/* Version Mobile : Logo UPB officiel en relief + lettrage complet « GÉNIE UPB » bien dégagé */}
          <div className="flex sm:hidden items-center justify-center gap-3 pt-6 pb-8 select-none">
            {/* Boîte icône UPB en relief */}
            <div className="flex-none w-12 h-12 rounded-[18px] p-1 bg-white/20 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.35),0_10px_24px_rgba(10,20,80,0.35)]">
              <div className="w-full h-full rounded-[14px] bg-white grid place-items-center shadow-sm">
                <img
                  src={genieUpbLogo}
                  alt="GÉNIE UPB"
                  className="w-[80%] h-[80%] object-contain"
                />
              </div>
            </div>
            <span className="font-black text-3xl sm:text-4xl leading-none tracking-tight text-white whitespace-nowrap drop-shadow-[0_4px_16px_rgba(10,20,80,0.3)]">
              GÉNIE UPB
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
