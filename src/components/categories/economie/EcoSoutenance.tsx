import React from 'react';

/**
 * EcoSoutenance — Section Soutenance finale et Évaluation officielle (is.SE)
 * 100% conforme à scripts/proto_real.html (lignes 918-926) :
 * - Fond crème authentique #EBE7DE
 * - En-tête : Badge orange « JOUR 3 · VENDREDI 29 JANVIER 2027 », H2 « Soutenance finale », sous-titre
 * - Grille à 3 colonnes encadrant l'ampoule remplie de pièces (aa59bfc9...) avec masque radial
 *   - Colonne gauche : Critères 01 (Performance ajustée du risque) et 02 (Stratégie défendue)
 *   - Colonne centre : Illustration officielle masquée
 *   - Colonne droite : Critères 03 (Respect des règles) et 04 (Qualité de la présentation)
 * - Grille des 3 jalons chronologiques avec surlignage orange sur le Jour 3
 */
export const EcoSoutenance: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#EBE7DE] py-[clamp(64px,8vw,112px)] px-[clamp(20px,5vw,72px)] select-none">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[clamp(36px,5vw,64px)]">
        {/* En-tête */}
        <div className="flex flex-col items-center gap-3.5 text-center">
          <span className="font-extrabold text-base tracking-[0.08em] uppercase text-[#E8621A] font-['Nunito',sans-serif]">
            Jour 3 · vendredi 29 janvier 2027
          </span>
          <h2 className="m-0 font-black text-[clamp(40px,5.4vw,80px)] leading-none tracking-[-0.03em] text-[#12301A] font-['Nunito',sans-serif]">
            Soutenance finale
          </h2>
          <p className="m-0 max-w-[52ch] font-semibold text-[clamp(16px,1.4vw,19px)] leading-[1.5] text-[#4A6350] font-['Nunito',sans-serif]">
            Un jury de 5 membres, dont un président, sans conflit d'intérêts avec les équipes, évalue 4 critères.
          </p>
        </div>

        {/* Grille 3 colonnes : Critères & Ampoule remplie de pièces */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,460px)_1fr] gap-[clamp(24px,3vw,48px)] items-center">
          {/* Colonne gauche (Critères 01 & 02) */}
          <div className="flex flex-col gap-[clamp(32px,5vw,72px)] text-left lg:text-right items-start lg:items-end min-w-0">
            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-black text-[clamp(40px,4vw,56px)] leading-none text-[#1B7A3E] tracking-[-0.03em] font-['Nunito',sans-serif]">
                01
              </span>
              <span className="font-extrabold text-[clamp(19px,1.7vw,24px)] leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
                Performance ajustée du risque
              </span>
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-black text-[clamp(40px,4vw,56px)] leading-none text-[#1B7A3E] tracking-[-0.03em] font-['Nunito',sans-serif]">
                02
              </span>
              <span className="font-extrabold text-[clamp(19px,1.7vw,24px)] leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
                Stratégie défendue
              </span>
            </div>
          </div>

          {/* Colonne centrale : Ampoule remplie de pièces */}
          <div className="flex justify-center items-center py-2">
            <img
              src="/images/aa59bfc9-7eb8-4d14-93e4-6514985fd071.png"
              alt="Ampoule remplie de pièces"
              className="block w-full max-w-[460px] h-auto mx-auto"
              style={{
                WebkitMaskImage: 'radial-gradient(closest-side, #000 80%, transparent)',
                maskImage: 'radial-gradient(closest-side, #000 80%, transparent)',
              }}
            />
          </div>

          {/* Colonne droite (Critères 03 & 04) */}
          <div className="flex flex-col gap-[clamp(32px,5vw,72px)] text-left items-start min-w-0">
            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-black text-[clamp(40px,4vw,56px)] leading-none text-[#1B7A3E] tracking-[-0.03em] font-['Nunito',sans-serif]">
                03
              </span>
              <span className="font-extrabold text-[clamp(19px,1.7vw,24px)] leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
                Respect des règles
              </span>
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-black text-[clamp(40px,4vw,56px)] leading-none text-[#1B7A3E] tracking-[-0.03em] font-['Nunito',sans-serif]">
                04
              </span>
              <span className="font-extrabold text-[clamp(19px,1.7vw,24px)] leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
                Qualité de la présentation
              </span>
            </div>
          </div>
        </div>

        {/* Grille des 3 jalons chronologiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,3vw,36px)] pt-2">
          {/* Jalon 1 */}
          <div className="flex flex-col gap-1.5 min-w-0 pt-[18px] border-t-[3px] border-[#12301A]">
            <span className="font-extrabold text-sm tracking-[0.06em] uppercase text-[#4A6350] font-['Nunito',sans-serif]">
              Jusqu'à la semaine précédente
            </span>
            <span className="font-black text-xl leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
              Première sélection
            </span>
            <span className="font-medium text-[15px] leading-[1.45] text-[#4A6350] font-['Nunito',sans-serif]">
              Classement des portefeuilles. La sélection se clôt la semaine avant le Génie UPB.
            </span>
          </div>

          {/* Jalon 2 */}
          <div className="flex flex-col gap-1.5 min-w-0 pt-[18px] border-t-[3px] border-[#12301A]">
            <span className="font-extrabold text-sm tracking-[0.06em] uppercase text-[#4A6350] font-['Nunito',sans-serif]">
              27 – 28 janvier
            </span>
            <span className="font-black text-xl leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
              Jours 1 et 2
            </span>
            <span className="font-medium text-[15px] leading-[1.45] text-[#4A6350] font-['Nunito',sans-serif]">
              Les équipes qualifiées prennent part aux trois jours de compétition.
            </span>
          </div>

          {/* Jalon 3 (Jour J en orange) */}
          <div className="flex flex-col gap-1.5 min-w-0 pt-[18px] border-t-[3px] border-[#F58220]">
            <span className="font-extrabold text-sm tracking-[0.06em] uppercase text-[#E8621A] font-['Nunito',sans-serif]">
              29 janvier
            </span>
            <span className="font-black text-xl leading-[1.2] text-[#12301A] font-['Nunito',sans-serif]">
              Jour 3 · Soutenance
            </span>
            <span className="font-medium text-[15px] leading-[1.45] text-[#4A6350] font-['Nunito',sans-serif]">
              Chaque équipe défend sa stratégie devant le jury.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSoutenance;
