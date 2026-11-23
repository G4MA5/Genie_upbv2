import React from 'react';
import { useEspace } from '../../contexts/EspaceContext';
import { couleurCategorie } from '../../lib/format';

interface Props {
  /** clair : sur fond blanc ; sombre : sur fond bleu / nuit */
  theme?: 'clair' | 'sombre';
  className?: string;
}

/**
 * Bascule entre les deux équipes d'un candidat inscrit à la fois en Technologie et en Innovation.
 * Ne s'affiche que s'il a plus d'une équipe.
 */
export default function SelecteurEquipe({ theme = 'clair', className = '' }: Props) {
  const { espace, choisirEquipe } = useEspace();
  if (!espace || espace.equipes.length < 2) return null;
  return (
    <div
      role="tablist"
      aria-label="Choisir l'équipe"
      className={`flex gap-1 p-1 rounded-full self-start ${theme === 'clair' ? 'bg-[#EEF1F7]' : 'bg-white/15 backdrop-blur-[8px]'} ${className}`}
    >
      {espace.equipes.map((e) => {
        const actif = e.id === espace.equipe?.id;
        return (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={actif}
            onClick={() => choisirEquipe(e.id)}
            className={`min-h-[34px] px-3.5 rounded-full font-extrabold text-[13px] flex items-center gap-2 cursor-pointer transition-colors max-w-[200px] ${
              actif
                ? 'bg-white text-[#0A1430] shadow-sm'
                : theme === 'clair'
                ? 'text-[#6A7189] hover:text-[#0A1430]'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <span style={{ backgroundColor: couleurCategorie(e.concours?.cle) }} className="w-2 h-2 rounded-full shrink-0" />
            <span className="truncate">{e.concours?.categorie ?? e.nom}</span>
          </button>
        );
      })}
    </div>
  );
}
