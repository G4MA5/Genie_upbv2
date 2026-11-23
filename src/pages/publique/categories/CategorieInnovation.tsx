import React from 'react';
import { InnoHero } from '../../../components/categories/innovation/InnoHero';
import { InnoEpreuve } from '../../../components/categories/innovation/InnoEpreuve';
import { InnoJuryCriteres } from '../../../components/categories/innovation/InnoJuryCriteres';

export default function CategorieInnovation() {
  return (
    <div className="w-full bg-[#B400F0] overflow-x-hidden text-white font-sans">
      {/* 1. HERO INNOVATION (Exact Prototype is.SI) */}
      <InnoHero />

      {/* 2. SI L'ÉPREUVE (Exact Prototype SI L'epreuve) */}
      <InnoEpreuve />

      {/* 3. SI JURY ET CRITÈRES (Exact Prototype SI Jury et criteres) */}
      <InnoJuryCriteres />
    </div>
  );
}
