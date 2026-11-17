import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * ÉCRAN P3a : CRÉER UNE ÉQUIPE
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19940).
 * Permet au candidat de choisir le nom de son équipe et sa catégorie.
 * Redirige vers P3c (Membres) avec l'équipe créée.
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

// 4 Catégories officielles exactes du prototype (L20153)
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
  // Valeur par défaut officielle : Les Bâtisseurs (L19942)
  const [teamName, setTeamName] = useState('Les Bâtisseurs');
  // Catégorie sélectionnée par défaut officielle : Innovation (L20153)
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

    // Redirige vers P3c (Membres) comme dans le prototype (data-go="P3c!team")
    navigate('/espace/equipe/membres');
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col justify-start items-center font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur fluide responsive : padding 80px 18px 120px sur mobile (L20153), 40px 32px 64px sur desktop */}
      <div className="w-full max-w-4xl mx-auto px-[18px] md:px-8 pt-20 md:pt-10 pb-[120px] md:pb-16 flex flex-col gap-4">
        
        {/* Bouton retour en rond `×` officiel du prototype */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
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
              placeholder="Les Bâtisseurs"
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

            {/* Grille responsive : 1 colonne mobile, 2 colonnes desktop */}
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

                    {/* Radio indicator officiel avec anneau et ombre interne (L19942) */}
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

          {/* Bouton officiel : Créer et inviter mes membres */}
          <button
            type="submit"
            className="mt-2 min-h-[54px] rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-extrabold text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            Créer et inviter mes membres
          </button>
        </form>
      </div>
    </div>
  );
}
