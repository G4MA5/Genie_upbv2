import React, { useState } from 'react';
import { RideauAccueil } from '../../components/accueil/RideauAccueil';
import { HeroBanner } from '../../components/accueil/HeroBanner';
import { CategoriesGrid } from '../../components/accueil/CategoriesGrid';
import { TournamentTimeline } from '../../components/accueil/TournamentTimeline';

export default function Accueil() {
  const [curtainOpen, setCurtainOpen] = useState(() => {
    try {
      return sessionStorage.getItem('genie_curtain_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const handleOpenCurtain = () => {
    try {
      sessionStorage.setItem('genie_curtain_dismissed', 'true');
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurtainOpen(true);
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
