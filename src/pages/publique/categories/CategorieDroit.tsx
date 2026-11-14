import React, { useEffect } from 'react';
import DroitHero from '../../../components/categories/droit/DroitHero';
import DroitCitationStats from '../../../components/categories/droit/DroitCitationStats';
import DroitDossiers from '../../../components/categories/droit/DroitDossiers';
import DroitArene from '../../../components/categories/droit/DroitArene';

export default function CategorieDroit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-screen-label="Categorie Droit"
      style={{
        position: 'relative',
        width: '100%',
        background: '#F8F6F1',
        overflowX: 'clip',
        minHeight: '100vh',
      }}
    >
      {/* 1. HERO DROIT */}
      <DroitHero />

      {/* 2. CITATION CRIMSON & STATS 2x2 */}
      <DroitCitationStats />

      {/* 3. DOSSIERS INTERACTIFS (ACCORDION VERTICAL DES TROIS ÉPREUVES) */}
      <DroitDossiers />

      {/* 4. SD DÉROULEMENT TOURNOI (L'ARÈNE DES IDÉES & BRACKET TREE) */}
      <DroitArene />
    </div>
  );
}
