import React, { useEffect, useRef } from 'react';
import { TechHero } from '../../../components/categories/technologie/TechHero';
import { TechMissionAgri } from '../../../components/categories/technologie/TechMissionAgri';
import { TechDeroule } from '../../../components/categories/technologie/TechDeroule';
import { TechEvaluation } from '../../../components/categories/technologie/TechEvaluation';

export default function CategorieTechnologie() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll reveal global pour les cartes et blocs de la page
    const elementsToReveal = pageRef.current?.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.animate(
              [
                { opacity: 0, transform: 'translateY(24px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              {
                duration: 650,
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                fill: 'forwards',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elementsToReveal?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="w-full overflow-x-hidden font-sans">
      <TechHero />
      <TechMissionAgri />
      <TechDeroule />
      <TechEvaluation />
    </div>
  );
}
