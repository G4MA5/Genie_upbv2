import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5a : CALENDRIER DES FORMATIONS (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19974886) :
 * - Bouton retour `←` rond
 * - Titre "Calendrier"
 * - Filtres par catégorie en pilules (Toutes, Innovation, Technologie, Économie)
 * - Séances groupées par jour avec heure de début, durée, titre cliquable vers P5c
 * - Badge de format (Présentiel, À distance) et formateur
 * - Grille fluide 2 colonnes sur grand écran
 * - Bouton "★ Donner mon avis" pour les séances passées
 * 100% pleine largeur sur grand écran.
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

const SESSIONS: DayGroup[] = [
  {
    day: 'JEU. 7 JANVIER',
    items: [
      {
        id: 's1',
        time: '09:00',
        dur: '3h',
        title: 'Prototypage rapide et maquettes',
        fmt: 'Présentiel',
        fbg: '#E3ECFF',
        ffg: '#1D4FD8',
        where: 'Fablab, bât. C',
        who: 'Mme Konan',
      },
      {
        id: 's2',
        time: '14:30',
        dur: '2h',
        title: 'Business model & proposition de valeur',
        fmt: 'À distance',
        fbg: '#FBEFD2',
        ffg: '#8A5A00',
        where: 'Google Meet',
        who: 'M. Touré',
      },
    ],
  },
  {
    day: 'LUN. 11 JANVIER',
    items: [
      {
        id: 's3',
        time: '18:00',
        dur: '1h30',
        title: 'Atelier pitch : convaincre en 7 minutes',
        fmt: 'À distance',
        fbg: '#FBEFD2',
        ffg: '#8A5A00',
        where: 'Google Meet',
        who: 'M. Koffi',
      },
    ],
  },
  {
    day: 'MER. 16 DÉCEMBRE (PASSÉE)',
    items: [
      {
        id: 's4',
        time: '10:00',
        dur: '2h',
        title: 'Introduction au concours & critères du jury',
        fmt: 'Présentiel',
        fbg: '#EAF1FF',
        ffg: '#2F6BF0',
        where: 'Amphi A',
        who: 'Dr. Kouadio',
        past: true,
      },
    ],
  },
];

export default function PlanningSessions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Innovation');

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond `←` */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            ←
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Calendrier
          </h1>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['Toutes', 'Innovation', 'Technologie', 'Économie'].map((f) => {
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

        {/* Liste des séances par journée */}
        <div className="flex flex-col gap-6 mt-1 w-full">
          {SESSIONS.map((d) => (
            <div key={d.day} className="flex flex-col gap-3 w-full">
              <span className="font-semibold text-[13px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
                {d.day}
              </span>

              {/* Grille 2 colonnes sur desktop pour les séances */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {d.items.map((se) => (
                  <div
                    key={se.id}
                    className="bg-white rounded-[22px] p-4 px-5 flex gap-4 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7] hover:shadow-[0_8px_24px_rgba(10,20,48,0.07)] transition-shadow"
                  >
                    {/* Colonne horaire */}
                    <div className="w-[56px] shrink-0 flex flex-col gap-0.5">
                      <span className="font-black text-[18px] text-[#0A1430] leading-tight">
                        {se.time}
                      </span>
                      <span className="font-bold text-[13px] text-[#6A7189]">
                        {se.dur}
                      </span>
                    </div>

                    {/* Détails séance */}
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
                          className="px-2.5 py-0.5 rounded-[6px] font-bold text-[12px]"
                        >
                          {se.fmt}
                        </span>
                        <span>
                          {se.where} · {se.who}
                        </span>
                      </div>

                      {se.past && (
                        <button
                          type="button"
                          onClick={() => alert('Formulaire d’évaluation de la séance ouvert.')}
                          className="self-start mt-1 min-h-[36px] px-3.5 rounded-full border-[1.5px] border-[#0A1430] text-[#0A1430] font-bold text-[13px] flex items-center hover:bg-slate-50 transition-colors cursor-pointer"
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
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
