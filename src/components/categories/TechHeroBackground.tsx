import React from 'react';
import { TECH_BLUEPRINT_GRID } from '../../assets/techBlueprintGrid';

/**
 * TechHeroBackground — Arrière-plan grille Blueprint statique
 * Aligné à 100% sur le modèle ultra-léger et instantané de Droit (zéro canvas, zéro animation CPU/GPU)
 */
export default function TechHeroBackground() {
  return (
    <div
      data-si-bg="1"
      aria-hidden="true"
      className="absolute inset-0 bg-repeat bg-[length:880px_660px] pointer-events-none"
      style={{ backgroundImage: `url("${TECH_BLUEPRINT_GRID}")` }}
    />
  );
}
