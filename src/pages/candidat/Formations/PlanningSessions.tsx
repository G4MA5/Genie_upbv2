import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5a : CALENDRIER DES FORMATIONS (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L534799 - 539468) :
 * - Bouton retour `←` rond
 * - Titre "Calendrier"
 * - Filtres par catégorie en pilules (Toutes, Innovation, Technologie, Économie)
 * - Séances groupées par jour avec heure de début, durée, titre cliquable vers P5c
 * - Badge de format (Présentiel, À distance) et formateur
 * - Bouton "★ Donner mon avis" pour les séances passées
 * 100% Tailwind CSS valide.
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
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="max-w-[560px] w-full flex flex-col gap-3.5 pt-12 md:pt-4">
        
        {/* Bouton retour en rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/formations')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Calendrier
        </h1>

        {/* Filtres par catégorie */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {['Toutes', 'Innovation', 'Technologie', 'Économie'].map((f) => {
            const isPicked = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 min-h-[40px] px-3.5 rounded-full font-semibold text-[14px] cursor-pointer transition-colors shadow-sm ${
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
        <div className="flex flex-col gap-4 mt-1">
          {SESSIONS.map((d) => (
            <div key={d.day} className="flex flex-col gap-2">
              <span className="font-semibold text-[13px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
                {d.day}
              </span>

              {d.items.map((se) => (
                <div
                  key={se.id}
                  className="bg-white rounded-[20px] p-3.5 px-4 flex gap-3 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]"
                >
                  {/* Colonne horaire */}
                  <div className="w-[52px] shrink-0 flex flex-col gap-0.5">
                    <span className="font-extrabold text-[18px] text-[#0A1430] leading-tight">
                      {se.time}
                    </span>
                    <span className="font-medium text-[13px] text-[#6A7189]">
                      {se.dur}
                    </span>
                  </div>

                  {/* Détails séance */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <span
                      onClick={() => navigate('/espace/formations/visio')}
                      className="font-bold text-[16px] leading-[1.3] text-[#121628] cursor-pointer hover:text-[#2F6BF0] transition-colors"
                    >
                      {se.title}
                    </span>

                    <div className="flex gap-1.5 items-center flex-wrap font-medium text-[13px] text-[#6A7189]">
                      <span
                        style={{ backgroundColor: se.fbg, color: se.ffg }}
                        className="px-2 py-0.5 rounded-[6px] font-bold text-[12px]"
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
                        className="self-start mt-1 min-h-[36px] px-3 rounded-full border-[1.5px] border-[#0A1430] text-[#0A1430] font-semibold text-[13px] flex items-center hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        ★ Donner mon avis
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
