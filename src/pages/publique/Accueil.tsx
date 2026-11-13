import React, { useState } from 'react';
import { RideauAccueil } from '../../components/accueil/RideauAccueil';
import { HeroBanner } from '../../components/accueil/HeroBanner';
import { CategoriesGrid } from '../../components/accueil/CategoriesGrid';
import { TournamentTimeline } from '../../components/accueil/TournamentTimeline';
import { PresentationUpb } from '../../components/accueil/PresentationUpb';
import { NewsCarousel } from '../../components/accueil/NewsCarousel';
import { PartnersSection } from '../../components/accueil/PartnersSection';

export default function Accueil() {
  const [curtainOpen, setCurtainOpen] = useState(false);

  const handleOpenCurtain = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurtainOpen(true);
  };

  return (
    <div className="w-full relative">
      {/* Rideau d'accueil plein écran ("Welcome to Génie UPB") */}
      <RideauAccueil isOpen={!curtainOpen} onOpenSite={handleOpenCurtain} />

      {/* Reste de la page d'accueil */}
      <HeroBanner />
      <CategoriesGrid />
      <TournamentTimeline />
      <PresentationUpb />
      <NewsCarousel />
      <PartnersSection />
    </div>
  );
}
