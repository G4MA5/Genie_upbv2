import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * ÉCRAN P3a : CRÉER UNE ÉQUIPE
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19940).
 * Pleine largeur fluide sur grand écran avec disposition équilibrée en 2 colonnes.
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
    id: 'technologie',
    name: 'Technologie',
    size: 'Taille à confirmer',
    left: '6 places',
    leftColor: '#17744B',
    col: '#2F6BF0',
    isFull: false,
  },
  {
    id: 'innovation',
    name: 'Innovation',
    size: '4 à 6 membres',
    left: '3 places',
    leftColor: '#17744B',
    col: '#FF9A3D',
    isFull: false,
  },
  {
    id: 'economie',
    name: 'Économie',
    size: '4 membres',
    left: '8 places',
    leftColor: '#17744B',
    col: '#0E9F6E',
    isFull: false,
  },
  {
    id: 'droit',
    name: 'Droit',
    size: '4 à 6 membres',
    left: "Complet · liste d'attente",
    leftColor: '#B4281F',
    col: '#9061F9',
    isFull: true,
  },
];

export default function CreerEquipe() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('Les Bâtisseurs');
  const [selectedCat, setSelectedCat] = useState('innovation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    try {
      localStorage.setItem(
        'genie-my-team',
        JSON.stringify({
          name: teamName.trim(),
          category: selectedCat,
          status: 'brouillon',
          created: new Date().toISOString(),
        })
      );
    } catch (_) {}

    navigate('/espace/equipe/membres');
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour × et Titre */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Fermer et retourner"
          >
            ×
          </button>
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Créer une équipe
          </h1>
        </div>

        {/* Formulaire pleine largeur en 2 colonnes sur grand écran (>=lg) */}
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Colonne Gauche : Nom de l'équipe + Bouton de création */}
          <div className="flex flex-col gap-5 bg-white rounded-[24px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
            <label className="flex flex-col gap-2">
              <span className="font-extrabold text-[17px] text-[#0A1430]">
                Nom de l'équipe
              </span>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Les Bâtisseurs"
                className="min-h-[54px] rounded-[16px] border-2 border-[#0A1430] bg-white px-4 font-extrabold text-[18px] text-[#0A1430] outline-none shadow-sm focus:border-[#2F6BF0] transition-colors"
              />
              <span className="font-medium text-[14px] text-[#6A7189]">
                Modifiable jusqu'à la soumission officielle.
              </span>
            </label>

            <button
              type="submit"
              className="mt-2 min-h-[54px] rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-extrabold text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              Créer et inviter mes membres
            </button>
          </div>

          {/* Colonne Droite : Sélection de la Catégorie */}
          <div className="flex flex-col gap-3.5">
            <span className="font-extrabold text-[18px] text-[#0A1430] px-1">
              Catégorie du concours
            </span>

            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCat === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`bg-white rounded-[20px] p-4 px-5 flex gap-4 items-center border-2 cursor-pointer transition-all duration-200 shadow-sm ${
                      isSelected
                        ? 'border-[#0A1430] shadow-[0_6px_20px_rgba(10,20,48,0.1)]'
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
                      <span className="font-extrabold text-[19px] text-[#0A1430] leading-snug">
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

                    {/* Radio indicator officiel avec anneau et ombre interne */}
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#0A1430] bg-[#0A1430] shadow-[inset_0_0_0_4px_#fff]'
                          : 'border-[#D6D2C8] bg-white shadow-[inset_0_0_0_4px_#fff]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
