import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, QrCode, Clock, MapPin, Users } from 'lucide-react';

export default function SeancesPlanning() {
  const [selectedDay, setSelectedDay] = useState<number>(7);

  const trainingDays = [4, 7, 9, 11, 12, 14, 16, 18, 20, 23];

  // Calendrier Janvier 2027 (commence un vendredi -> 4 cases vides initiales)
  const emptyDays = [null, null, null, null];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR & TITRE AVEC CONTRÔLE MOIS */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/formateur/dashboard"
            className="w-11 h-11 rounded-full bg-white text-[#0E1E4A] border border-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
            title="Retour"
          >
            ←
          </Link>
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
              Planning • F1a
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E1E4A]">
              Janvier 2027
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-full p-1 shadow-sm">
          <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0E1E4A] font-bold">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0E1E4A] font-bold">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. GRILLE DU CALENDRIER (7 COLONNES) */}
      <div className="bg-white rounded-[24px] p-4 sm:p-6 border border-slate-100 shadow-sm flex flex-col gap-3">
        {/* En-tête des jours */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#8A8FA3]">
          <span>L</span>
          <span>M</span>
          <span>M</span>
          <span>J</span>
          <span>V</span>
          <span>S</span>
          <span>D</span>
        </div>

        {/* Cellules des jours */}
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {daysInMonth.map(d => {
            const hasSession = trainingDays.includes(d);
            const isSelected = selectedDay === d;

            return (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`aspect-square rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#0E1E4A] text-white shadow-md scale-105'
                    : hasSession
                    ? 'bg-slate-50 text-[#0E1E4A] hover:bg-slate-100'
                    : 'text-[#B5B8C4] hover:bg-slate-50'
                }`}
              >
                <span>{d}</span>
                {hasSession && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-[#E8742A]' : 'bg-[#E8742A]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DÉTAILS DU JOUR SÉLECTIONNÉ */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#6A7189] px-1">
          {selectedDay === 7 ? 'JEUDI 7 JANVIER 2027 (SÉANCE ACTUELLE)' : `SÉANCE DU ${selectedDay} JANVIER 2027`}
        </span>

        {trainingDays.includes(selectedDay) ? (
          <div className="bg-white rounded-2xl p-6 border-l-[5px] border-[#E8742A] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <span className="font-extrabold text-xl text-[#0E1E4A] block">
                Prototypage rapide et maquettes
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#6A7189]">
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-slate-400" />
                  09:00 – 12:00 (3h)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-slate-400" />
                  Fablab, bât. C
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-slate-400" />
                  18 équipes inscrites
                </span>
              </div>
            </div>

            <Link
              to="/formateur/seances/scan-qr"
              className="min-h-[46px] px-6 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-extrabold text-sm flex items-center gap-2 shadow-sm transition-all whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              <QrCode size={16} />
              <span>Prendre les présences</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center text-slate-400 text-sm italic">
            Aucune séance de formation programmée pour le {selectedDay} janvier.
          </div>
        )}
      </div>
    </div>
  );
}
