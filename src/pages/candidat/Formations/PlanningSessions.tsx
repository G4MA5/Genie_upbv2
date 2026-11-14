import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, User, Video, Calendar, Star, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface SessionItem {
  id: string;
  time: string;
  dur: string;
  title: string;
  category: string;
  fmt: 'À distance' | 'Présentiel';
  fbg: string;
  ffg: string;
  where: string;
  who: string;
  past: boolean;
  reviewed?: boolean;
}

interface DayGroup {
  day: string;
  items: SessionItem[];
}

export default function PlanningSessions() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Toutes');
  const [ratingSessionId, setRatingSessionId] = useState<string | null>(null);

  const filters = ['Toutes', 'Innovation', 'Technologie', 'Économie', 'Droit'];

  const initialSessions: DayGroup[] = [
    {
      day: 'Lundi 4 janvier 2027',
      items: [
        {
          id: 's1',
          time: '14:00',
          dur: '2 h',
          title: 'Atelier pitch : convaincre en 7 minutes',
          category: 'Innovation',
          fmt: 'À distance',
          fbg: '#EFE9FB',
          ffg: '#5B3BB5',
          where: 'Lien Meet interactif',
          who: 'M. Ibrahim Diallo',
          past: true,
          reviewed: false,
        },
      ],
    },
    {
      day: 'Jeudi 7 janvier 2027',
      items: [
        {
          id: 's2',
          time: '09:00',
          dur: '3 h',
          title: 'Prototypage rapide et maquettes',
          category: 'Technologie',
          fmt: 'Présentiel',
          fbg: '#E9ECF5',
          ffg: '#0E1E4A',
          where: 'Fablab, bât. C',
          who: 'Mme Konan',
          past: false,
        },
        {
          id: 's3',
          time: '15:00',
          dur: '1 h 30',
          title: 'Modèle économique : les fondamentaux',
          category: 'Économie',
          fmt: 'Présentiel',
          fbg: '#E9ECF5',
          ffg: '#0E1E4A',
          where: 'Amphi B',
          who: 'M. Touré',
          past: false,
        },
      ],
    },
    {
      day: 'Mardi 12 janvier 2027',
      items: [
        {
          id: 's4',
          time: '14:00',
          dur: '2 h 30',
          title: 'Préparer sa démo technique et gestion des imprévus',
          category: 'Technologie',
          fmt: 'Présentiel',
          fbg: '#E9ECF5',
          ffg: '#0E1E4A',
          where: 'Salle 12',
          who: 'Mme Konan',
          past: false,
        },
      ],
    },
    {
      day: 'Jeudi 14 janvier 2027',
      items: [
        {
          id: 's5',
          time: '17:00',
          dur: '2 h',
          title: 'Session pitch à blanc & retours critiques',
          category: 'Innovation',
          fmt: 'À distance',
          fbg: '#EFE9FB',
          ffg: '#5B3BB5',
          where: 'Visioconférence Teams',
          who: 'M. Ibrahim Diallo & M. Touré',
          past: false,
        },
      ],
    },
  ];

  const [sessions, setSessions] = useState<DayGroup[]>(initialSessions);

  const handleReview = (id: string) => {
    toast.success('Merci pour votre retour d\'évaluation !');
    setSessions(prev =>
      prev.map(group => ({
        ...group,
        items: group.items.map(it => (it.id === id ? { ...it, reviewed: true } : it)),
      }))
    );
  };

  const filteredSessions = sessions
    .map(group => ({
      ...group,
      items: group.items.filter(it =>
        selectedFilter === 'Toutes' ? true : it.category.toLowerCase() === selectedFilter.toLowerCase()
      ),
    }))
    .filter(group => group.items.length > 0);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR & TITRE */}
      <div className="flex items-center gap-4">
        <Link
          to="/espace/formations"
          className="w-11 h-11 rounded-full bg-white text-[#0E1E4A] border border-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
          title="Retour aux formations"
        >
          ←
        </Link>
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Planning • P5a
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Calendrier des Séances
          </h1>
        </div>
      </div>

      {/* 2. FILTRE PAR CATÉGORIE HORIZONTAL */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filters.map(f => {
          const active = selectedFilter === f;
          return (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-[#0E1E4A] text-white shadow-md'
                  : 'bg-white text-[#0E1E4A] border border-slate-200 hover:border-slate-300'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* 3. GROUPES DE SÉANCES PAR JOUR */}
      <div className="space-y-6">
        {filteredSessions.map(group => (
          <div key={group.day} className="flex flex-col gap-3">
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#6A7189] px-1">
              {group.day}
            </span>

            <div className="flex flex-col gap-3">
              {group.items.map(se => (
                <div
                  key={se.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Horaires */}
                    <div className="w-16 shrink-0 flex flex-col">
                      <span className="font-black text-xl text-[#0E1E4A] leading-tight">
                        {se.time}
                      </span>
                      <span className="font-bold text-xs text-[#6A7189]">
                        {se.dur}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-col gap-1.5">
                      <Link
                        to="/espace/formations/visio"
                        className="font-extrabold text-base sm:text-lg text-[#121628] hover:text-[#2F6BF0] transition-colors leading-snug"
                      >
                        {se.title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6A7189]">
                        <span
                          className="px-2.5 py-0.5 rounded-md font-bold text-xs"
                          style={{ backgroundColor: se.fbg, color: se.ffg }}
                        >
                          {se.fmt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" />
                          {se.where}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-slate-400" />
                          {se.who}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {se.past ? (
                      se.reviewed ? (
                        <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1.5 border border-emerald-200">
                          <CheckCircle size={14} />
                          Avis envoyé
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReview(se.id)}
                          className="px-4 py-2 rounded-full border-[1.5px] border-[#0E1E4A] text-[#0E1E4A] hover:bg-[#0E1E4A] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Star size={13} />
                          <span>Donner mon avis</span>
                        </button>
                      )
                    ) : (
                      <Link
                        to="/espace/formations/visio"
                        className="px-4 py-2 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Détails & Visio</span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
