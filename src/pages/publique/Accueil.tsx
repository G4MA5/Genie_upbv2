import React from 'react';
import { HeroBanner } from '../../components/accueil/HeroBanner';
import { CategoriesGrid } from '../../components/accueil/CategoriesGrid';
import { TournamentTimeline } from '../../components/accueil/TournamentTimeline';
import { PresentationUpb } from '../../components/accueil/PresentationUpb';
import { NewsCarousel } from '../../components/accueil/NewsCarousel';
import { PartnersSection } from '../../components/accueil/PartnersSection';

export default function Accueil() {
  return (
    <div className="w-full">
      <HeroBanner />
      <CategoriesGrid />
      <TournamentTimeline />
      <PresentationUpb />
      <NewsCarousel />
      <PartnersSection />
    </div>
  );
}
