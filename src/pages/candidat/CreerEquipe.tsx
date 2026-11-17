import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P3a : CRÉER UNE ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L502073) :
 * - Bouton retour `×` rond
 * - Titre "Créer une équipe"
 * - Champ "Nom de l'équipe" avec valeur par défaut "Les Bâtisseurs" et mention "Modifiable jusqu'à la soumission"
 * - Choix de catégorie avec barre verticale colorée, effectif d'équipe et places restantes
 * - Bouton d'action orange vif "Créer et inviter mes membres"
 * 100% Tailwind CSS valide.
 */

interface CategoryChoice {
  id: string;
  name: string;
  size: string;
  left: string;
  leftColor: string;
  col: string;
  isFull?: boolean;
}

const CATEGORIES: CategoryChoice[] = [
  {
    id: 'innovation',
    name: 'Innovation',
    size: '4 à 6 membres',
    left: '4 places restantes',
    leftColor: '#F58220',
    col: '#F58220',
  },
  {
    id: 'technologie',
    name: 'Technologie',
    size: '3 à 5 membres',
    left: 'complet (liste d’attente)',
    leftColor: '#C8372D',
    col: '#2F6BF0',
    isFull: true,
  },
  {
    id: 'economie',
    name: 'Économie',
    size: '3 à 5 membres',
    left: '7 places',
    leftColor: '#00875A',
    col: '#00875A',
  },
  {
    id: 'droit',
    name: 'Droit & Éthique',
    size: '2 à 4 membres',
    left: '11 places',
    leftColor: '#8E44AD',
    col: '#8E44AD',
  },
];

export default function CreerEquipe() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('Les Bâtisseurs');
  const [selectedCat, setSelectedCat] = useState('innovation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enregistrement dans localStorage et redirection vers la gestion des membres
    try {
      localStorage.setItem('genie_team_name', teamName);
      localStorage.setItem('genie_team_category', selectedCat);
    } catch (_) {}
    navigate('/espace/equipe/membres');
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 pt-16 md:pt-6">
        
        {/* Bouton retour en rond `×` */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105"
          aria-label="Fermer et retourner"
        >
          ×
        </button>

        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Créer une équipe
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Champ Nom de l'équipe */}
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-[15px] text-[#0A1430]">
              Nom de l'équipe
            </span>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Ex: Les Bâtisseurs..."
              className="min-h-[54px] rounded-[16px] border-2 border-[#0A1430] bg-white px-3.5 font-extrabold text-[17px] text-[#0A1430] outline-none shadow-sm focus:border-[#2F6BF0] transition-colors"
            />
            <span className="font-normal text-[14px] text-[#6A7189]">
              Modifiable jusqu'à la soumission.
            </span>
          </label>

          {/* Choix de Catégorie */}
          <div className="flex flex-col gap-2 mt-1">
            <span className="font-semibold text-[15px] text-[#0A1430]">
              Catégorie
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCat === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`bg-white rounded-[18px] p-3.5 px-4 flex gap-3.5 items-center border-2 cursor-pointer transition-all duration-200 shadow-sm ${
                      isSelected
                        ? 'border-[#0A1430] shadow-[0_4px_16px_rgba(10,20,48,0.08)]'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    {/* Barre verticale colorée */}
                    <span
                      style={{ backgroundColor: cat.col }}
                      className="w-1.5 self-stretch rounded-full"
                    />

                    {/* Détails */}
                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                      <span className="font-extrabold text-[18px] text-[#0A1430] leading-snug">
                        {cat.name}
                      </span>
                      <span className="font-medium text-[14px] text-[#6A7189] leading-tight">
                        {cat.size} ·{' '}
                        <span
                          style={{ color: cat.leftColor }}
                          className="font-bold"
                        >
                          {cat.left}
                        </span>
                      </span>
                    </div>

                    {/* Radio indicator */}
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#0A1430] bg-[#0A1430]'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bouton Créer et inviter mes membres */}
          <button
            type="submit"
            className="mt-2 min-h-[54px] rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-extrabold text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            Créer et inviter mes membres
          </button>
        </form>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
