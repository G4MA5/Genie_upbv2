import React, { useState } from 'react';
import { RideauAccueil } from '../../components/accueil/RideauAccueil';
import { HeroBanner } from '../../components/accueil/HeroBanner';
import { CategoriesGrid } from '../../components/accueil/CategoriesGrid';
import { TournamentTimeline } from '../../components/accueil/TournamentTimeline';

export default function Accueil() {
  const [curtainOpen, setCurtainOpen] = useState(false);

  const handleOpenCurtain = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurtainOpen(true);

    // Maintien strict de la vue à (0, 0) pendant l'animation d'ouverture du rideau (1000ms)
    const startTime = performance.now();
    const lockScrollToTop = () => {
      window.scrollTo(0, 0);
      if (performance.now() - startTime < 1000) {
        requestAnimationFrame(lockScrollToTop);
      }
    };
    requestAnimationFrame(lockScrollToTop);
  };

  return (
    <div className="w-full relative">
      {/* 1. Rideau d'accueil plein écran ("Welcome to Génie UPB") */}
      <RideauAccueil isOpen={!curtainOpen} onOpenSite={handleOpenCurtain} />

      {/* 2. Hero Section ("Révèle Ton Génie.") */}
      <HeroBanner />

      {/* 3. Grille Bento des Catégories (Mascotte, 4 Pôles, Compte à rebours, Campus UPB) */}
      <CategoriesGrid />

      {/* 4. Circuit Routier Interactif & Calendrier ("De l'inscription à la finale.") */}
      <TournamentTimeline />
    </div>
  );
}
