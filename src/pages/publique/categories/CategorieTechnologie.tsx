import React, { useEffect } from 'react';
import { TechHero } from '../../../components/categories/technologie/TechHero';
import { TechMissionAgri } from '../../../components/categories/technologie/TechMissionAgri';
import { TechDeroule } from '../../../components/categories/technologie/TechDeroule';
import { TechEvaluation } from '../../../components/categories/technologie/TechEvaluation';

export default function CategorieTechnologie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-screen-label="Categorie Technologie"
      className="w-full bg-[#0C1E4A] overflow-x-clip min-h-screen font-sans select-none"
    >
      <TechHero />
      <TechMissionAgri />
      <TechDeroule />
      <TechEvaluation />
    </div>
  );
}
