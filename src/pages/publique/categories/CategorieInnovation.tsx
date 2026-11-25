import React, { useEffect } from 'react';
import { InnoHero } from '../../../components/categories/innovation/InnoHero';
import { InnoEpreuve } from '../../../components/categories/innovation/InnoEpreuve';
import { InnoJuryCriteres } from '../../../components/categories/innovation/InnoJuryCriteres';

export default function CategorieInnovation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-screen-label="Categorie Innovation"
      className="w-full bg-[#B400F0] overflow-x-clip min-h-screen text-white font-sans select-none"
    >
      {/* 1. HERO INNOVATION (Exact Prototype is.SI) */}
      <InnoHero />

      {/* 2. SI L'ÉPREUVE (Exact Prototype SI L'epreuve) */}
      <InnoEpreuve />

      {/* 3. SI JURY ET CRITÈRES (Exact Prototype SI Jury et criteres) */}
      <InnoJuryCriteres />
    </div>
  );
}
