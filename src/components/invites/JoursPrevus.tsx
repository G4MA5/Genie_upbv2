import React from 'react';

// Jours du concours proposes aux invites (indicatif, comme INVITES_JOURS du backend).
export const JOURS_CONCOURS = [
  { date: '2027-01-27', libelle: 'Mer. 27 janvier' },
  { date: '2027-01-28', libelle: 'Jeu. 28 janvier' },
  { date: '2027-01-29', libelle: 'Ven. 29 janvier' },
];

/** Choix facultatif des jours de presence (champ `jours_prevus`). */
export function JoursPrevus({
  valeur,
  onChange,
  compact = false,
}: {
  valeur: string[];
  onChange: (v: string[]) => void;
  compact?: boolean;
}) {
  const basculer = (d: string) => onChange(valeur.includes(d) ? valeur.filter((x) => x !== d) : [...valeur, d]);
  return (
    <div>
      <span className="block text-[12px] font-bold text-[#3A4053] uppercase mb-1.5">Jours de présence (facultatif)</span>
      <div className="flex flex-wrap gap-2">
        {JOURS_CONCOURS.map((j) => {
          const actif = valeur.includes(j.date);
          return (
            <button
              key={j.date}
              type="button"
              onClick={() => basculer(j.date)}
              aria-pressed={actif}
              className={`px-3 ${compact ? 'min-h-[36px]' : 'min-h-[38px]'} rounded-[10px] text-[13px] font-bold border-2 transition-colors ${
                actif
                  ? 'bg-[#0A1430] border-[#0A1430] text-white'
                  : 'bg-[#F8FAFC] border-[#D9E1EC] text-[#0A1430] hover:border-[#0A1430]'
              }`}
            >
              {j.libelle}
            </button>
          );
        })}
      </div>
    </div>
  );
}
