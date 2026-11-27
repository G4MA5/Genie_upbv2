import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, ArrowLeft, ArrowRight, Download, ExternalLink, Play } from 'lucide-react';

/**
 * ============================================================================
 * P5b : SUPPORTS DE FORMATION (ESPACE PARTICIPANT)
 * ============================================================================
 * Supports de cours et ressources pédagogiques réels :
 * - Liste des supports par séance (état d'attente avant la tenue des ateliers)
 * - Lien vers les documents et règlements officiels du concours
 */

interface SupportItem {
  id: string;
  k: string; // format: PDF, SLIDES, CODE, VIDÉO
  t: string; // title
  ic: string; // icon: ↓, ↗, ▶
  url?: string;
}

interface SupportGroup {
  s: string; // Session name
  items: SupportItem[];
}

// Supports réels mis à disposition (initialement vide avant le premier atelier)
const SUPPORTS_DATA: SupportGroup[] = [];

export default function SupportsCours() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Supports
          </h1>
        </div>

        {/* Grille des supports ou état d'attente officiel */}
        {SUPPORTS_DATA.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
            {SUPPORTS_DATA.map((g) => (
              <div
                key={g.s}
                className="bg-white rounded-[24px] p-5 sm:p-6 flex flex-col gap-2 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]"
              >
                <span className="font-black text-[18px] text-[#0A1430] mb-2">
                  {g.s}
                </span>

                {g.items.map((it) => (
                  <div
                    key={it.id}
                    className="flex gap-3.5 items-center min-h-[56px] border-t border-[#F2F0EA] pt-2"
                  >
                    <span className="w-[76px] py-1 rounded-[8px] bg-[#F2F0EA] font-extrabold text-[12px] text-[#4A5168] text-center shrink-0">
                      {it.k}
                    </span>
                    <span className="flex-1 font-bold text-[15px] text-[#121628] leading-snug">
                      {it.t}
                    </span>
                    {it.url ? (
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 shrink-0 rounded-full bg-[#0A1430] text-white flex items-center justify-center cursor-pointer hover:bg-[#1A2649] transition-colors"
                      >
                        <Download size={17} strokeWidth={2.5} />
                      </a>
                    ) : (
                      <span className="w-11 h-11 shrink-0 rounded-full bg-[#F2F0EA] text-[#6A7189] flex items-center justify-center">
                        <Download size={17} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Carte principale d'état d'attente */}
            <div className="lg:col-span-2 w-full bg-white rounded-[26px] p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-3 border border-[#EEF1F7] shadow-[0_6px_20px_rgba(10,20,48,0.04)]">
              <div className="w-14 h-14 rounded-full bg-[#EAF1FF] text-[#2F6BF0] flex items-center justify-center">
                <FolderOpen size={28} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-black text-[20px] text-[#0A1430]">
                  Supports de formation bientôt disponibles
                </span>
                <span className="font-medium text-[15px] text-[#6A7189] max-w-[460px] leading-relaxed">
                  Les guides méthodologiques, fiches pratiques, présentations et replays des formateurs seront mis en ligne ici dès le lancement des premières séances.
                </span>
              </div>
            </div>

            {/* Carte Ressources & Règlements officiels */}
            <div className="bg-[#0A1430] text-white rounded-[26px] p-6 flex flex-col gap-3 shadow-[0_12px_30px_rgba(10,20,48,0.15)]">
              <span className="font-bold text-[11px] font-mono tracking-[0.06em] text-[#F2C45A] uppercase">
                DOCUMENTS OFFICIELS
              </span>
              <span className="font-black text-[20px] leading-tight text-white">
                Règlements & Fiches d'engagement
              </span>
              <p className="font-medium text-[14px] text-[#C9D1E8] leading-relaxed m-0">
                Consultez dès maintenant le règlement intérieur du concours et téléchargez votre fiche d'engagement.
              </p>
              <button
                type="button"
                onClick={() => navigate('/documents')}
                className="self-start mt-2 px-5 min-h-[44px] rounded-[14px] bg-[#2F6BF0] text-white font-extrabold text-[14px] flex items-center gap-2 cursor-pointer hover:bg-[#1D4FD8] transition-colors"
              >
                <span>Accéder aux documents</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
