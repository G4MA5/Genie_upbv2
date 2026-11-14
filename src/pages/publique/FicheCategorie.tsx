import React from 'react';
import { useParams } from 'react-router-dom';
import CategorieTechnologie from './categories/CategorieTechnologie';
import CategorieDroit from './categories/CategorieDroit';
import CategorieEconomie from './categories/CategorieEconomie';
import CategorieInnovation from './categories/CategorieInnovation';

export default function FicheCategorie() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const currentSlug = categorySlug?.toLowerCase() || 'technologie';

  if (currentSlug === 'droit') return <CategorieDroit />;
  if (currentSlug === 'economie') return <CategorieEconomie />;
  if (currentSlug === 'innovation') return <CategorieInnovation />;
  return <CategorieTechnologie />;
}
