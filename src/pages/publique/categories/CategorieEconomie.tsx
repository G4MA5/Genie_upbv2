import React, { useEffect } from 'react';
import { EcoHero } from '../../../components/categories/economie/EcoHero';
import { EcoSimulation } from '../../../components/categories/economie/EcoSimulation';
import { EcoSoutenance } from '../../../components/categories/economie/EcoSoutenance';

/**
 * CategorieEconomie — Catégorie Économie officielle (is.SE)
 * Calibrée à 100% sur le prototype source scripts/proto_real.html (lignes 908-926) :
 * 1. EcoHero (Hero vert #1F4A2A avec grille matricielle animée 70s, titre sticker, tirelire inclinée à 2.5deg)
 * 2. EcoSimulation (Génie Market Simulation, terminal officiel bordure 6px blanche, chandelier temps réel, classement des 12 équipes avec seuil de qualification, ticker tape matières premières)
 * 3. EcoSoutenance (Soutenance finale #EBE7DE, 4 critères autour de l'ampoule remplie de pièces, 3 jalons chronologiques)
 */
export default function CategorieEconomie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-screen-label="Categorie Economie"
      className="w-full bg-[#1F4A2A] overflow-x-clip min-h-screen text-white select-none"
    >
      {/* 1. Hero Section avec Tirelire et Grille Animée */}
      <EcoHero />

      {/* 2. Simulation de Marché & Terminal de Trading */}
      <EcoSimulation />

      {/* 3. Soutenance Finale, Jury & Critères */}
      <EcoSoutenance />
    </div>
  );
}
