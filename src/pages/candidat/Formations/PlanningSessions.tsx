import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

/**
 * ============================================================================
 * P5a : CALENDRIER DES FORMATIONS (ESPACE PARTICIPANT)
 * ============================================================================
 * Calendrier officiel des ateliers et formations :
 * - Filtres par catégorie en pilules (Toutes, Innovation, Technologie, Économie)
 * - Séances réelles groupées par journée
 * - État d'attente officiel avant publication du calendrier des séances
 */

interface SessionItem {
  id: string;
  time: string;
  dur: string;
  title: string;
  fmt: string;
  fbg: string;
  ffg: string;
  where: string;
  who: string;
  past?: boolean;
}

interface DayGroup {
  day: string;
  items: SessionItem[];
}

// Séances réelles programmées (initialement vide avant publication du calendrier officiel)
const SESSIONS: DayGroup[] = [];

export default function PlanningSessions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Toutes');

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond `←` */}
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
            Calendrier
          </h1>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['Toutes', 'Innovation', 'Technologie', 'Économie', 'Droit'].map((f) => {
            const isPicked = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 min-h-[42px] px-4 rounded-full font-bold text-[14px] cursor-pointer transition-colors shadow-sm ${
                  isPicked
                    ? 'bg-[#0A1430] text-white'
                    : 'bg-white text-[#0A1430] border border-[#EEF1F7] hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Liste des séances par journée ou état d'attente */}
        {SESSIONS.length > 0 ? (
          <div className="flex flex-col gap-6 mt-1 w-full">
            {SESSIONS.map((d) => (
              <div key={d.day} className="flex flex-col gap-3 w-full">
                <span className="font-semibold text-[13px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
                  {d.day}
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                  {d.items.map((se) => (
                    <div
                      key={se.id}
                      className="bg-white rounded-[22px] p-4 px-5 flex gap-4 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7] hover:shadow-[0_8px_24px_rgba(10,20,48,0.07)] transition-shadow"
                    >
                      <div className="w-[56px] shrink-0 flex flex-col gap-0.5">
                        <span className="font-black text-[18px] text-[#0A1430] leading-tight">
                          {se.time}
                        </span>
                        <span className="font-bold text-[13px] text-[#6A7189]">
                          {se.dur}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <span
                          onClick={() => navigate('/espace/formations/visio')}
                          className="font-black text-[16px] leading-[1.3] text-[#121628] cursor-pointer hover:text-[#2F6BF0] transition-colors"
                        >
                          {se.title}
                        </span>

                        <div className="flex gap-2 items-center flex-wrap font-medium text-[13px] text-[#6A7189]">
                          <span
                            style={{ backgroundColor: se.fbg, color: se.ffg }}
                            className="px-2.5 py-0.5 rounded-[8px] font-bold text-[12px]"
                          >
                            {se.fmt}
                          </span>
                          <span>·</span>
                          <span>{se.where}</span>
                          <span>·</span>
                          <span className="text-[#0A1430] font-semibold">{se.who}</span>
                        </div>

                        {se.past && (
                          <button
                            type="button"
                            className="self-start mt-1 px-3 py-1.5 rounded-[12px] bg-[#F2F0EA] text-[#0A1430] font-bold text-[13px] cursor-pointer hover:bg-[#E5E2D8] transition-colors"
                          >
                            ★ Donner mon avis
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-white rounded-[26px] p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-3 border border-[#EEF1F7] shadow-[0_6px_20px_rgba(10,20,48,0.04)]">
            <div className="w-14 h-14 rounded-full bg-[#FFF4E5] text-[#F58220] flex items-center justify-center">
              <Calendar size={28} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-black text-[20px] text-[#0A1430]">
                Calendrier officiel des ateliers en cours de programmation
              </span>
              <span className="font-medium text-[15px] text-[#6A7189] max-w-[480px] leading-relaxed">
                Les dates, horaires et liens d'accès aux ateliers méthodologiques et techniques seront affichés ici dès la clôture des inscriptions.
              </span>
            </div>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
