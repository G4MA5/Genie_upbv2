import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P3d : RÈGLEMENT ET CHARTES (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19951566) :
 * - Bouton retour `←` rond
 * - Titre "Règlement et chartes"
 * - Indicateur "2 documents sur 3 acceptés" (1 restant en rouge)
 * - Carte de lecture de la charte en attente avec scroll, fondu dégradé et lien "↓ Télécharger le PDF"
 * - Case à cocher "J'ai lu et j'accepte" validant la charte
 * - Liste des chartes déjà validées avec badge vert `✓` et date d'émargement
 * Grille 2 colonnes fluide et 100% pleine largeur sur grand écran.
 */

interface AcceptedCharter {
  id: string;
  title: string;
  when: string;
}

const ALREADY_ACCEPTED: AcceptedCharter[] = [
  {
    id: 'ch-1',
    title: 'Règlement général du concours',
    when: 'Accepté le 24 nov. à 14:10',
  },
  {
    id: 'ch-2',
    title: 'Charte d’intégrité académique UPB',
    when: 'Accepté le 24 nov. à 14:12',
  },
];

export default function CharteReglement() {
  const navigate = useNavigate();
  const [acceptedCharters, setAcceptedCharters] = useState<AcceptedCharter[]>(ALREADY_ACCEPTED);
  const [hasPending, setHasPending] = useState(true);

  const handleAcceptPending = () => {
    setAcceptedCharters((prev) => [
      ...prev,
      {
        id: 'ch-3',
        title: 'Charte d’éthique — Technologie',
        when: 'Accepté à l’instant',
      },
    ]);
    setHasPending(false);
    setTimeout(() => {
      navigate('/espace/equipe?state=team');
    }, 400);
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond `←` */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe?state=team')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Retour"
          >
            ←
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Règlement et chartes
          </h1>
        </div>

        {/* Compteur documents */}
        <div className="flex justify-between items-center font-semibold text-[15px] text-[#4A5168] px-1">
          <span>{acceptedCharters.length} document{acceptedCharters.length > 1 ? 's' : ''} sur 3 acceptés</span>
          {hasPending ? (
            <span className="text-[#B4281F] font-black px-3 py-1 rounded-full bg-[#FBE6E3]">1 restant</span>
          ) : (
            <span className="text-[#17744B] font-black px-3 py-1 rounded-full bg-[#DDF7E8]">Tous acceptés ✓</span>
          )}
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran : Charte active à gauche, Validées à droite */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne Gauche : Charte de lecture active en attente */}
          {hasPending ? (
            <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
              <span className="font-black text-[20px] text-[#0A1430]">
                Charte d'éthique — Technologie
              </span>

              {/* Cadre de lecture avec dégradé inférieur */}
              <div className="relative max-h-[220px] overflow-hidden p-4 rounded-[16px] bg-[#F6F8FC] font-medium text-[15px] leading-[1.65] text-[#3D4459]">
                <p className="m-0 mb-2">
                  <strong className="text-[#0A1430]">Article 1 — Code.</strong> Tout code présenté au jury est écrit par l'équipe pendant le concours ou déclaré à l'avance.
                </p>
                <p className="m-0 mb-2">
                  <strong className="text-[#0A1430]">Article 2 — Données.</strong> Les équipes n'utilisent que des données publiques ou fournies par les organisateurs.
                </p>
                <p className="m-0 mb-2">
                  <strong className="text-[#0A1430]">Article 3 — Outils d'IA.</strong> Leur usage est permis s'il est déclaré au jury, avec le rôle exact de chaque outil.
                </p>
                <p className="m-0">
                  <strong className="text-[#0A1430]">Article 4 — Respect.</strong> Aucun contenu ne porte atteinte aux personnes ou à l'Université.
                </p>
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-0 h-[70px] bg-gradient-to-t from-[#F6F8FC] to-transparent pointer-events-none"
                />
              </div>

              {/* Lien PDF */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Téléchargement du document officiel de la charte.');
                }}
                className="font-bold text-[15px] text-[#0A1430] underline hover:text-[#2F6BF0] transition-colors self-start"
              >
                ↓ Télécharger le PDF
              </a>

              {/* Bouton d'acceptation */}
              <div
                onClick={handleAcceptPending}
                className="flex gap-3.5 items-center min-h-[52px] px-4 rounded-[16px] border-2 border-[#0A1430] cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="w-7 h-7 rounded-[8px] border-2 border-[#B5B8C4] flex items-center justify-center font-bold text-transparent hover:border-[#0A1430]" />
                <span className="font-bold text-[16px] text-[#0A1430]">
                  J'ai lu et j'accepte
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[24px] p-8 text-center flex flex-col gap-3 items-center shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
              <span className="w-14 h-14 rounded-full bg-[#DDF7E8] text-[#17744B] grid place-items-center font-black text-[24px]">
                ✓
              </span>
              <span className="font-extrabold text-[20px] text-[#0A1430]">
                Toutes les chartes sont signées
              </span>
              <span className="font-medium text-[15px] text-[#6A7189]">
                Votre dossier réglementaire est complet pour la soumission.
              </span>
            </div>
          )}

          {/* Colonne Droite : Liste des chartes déjà validées */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
              DOCUMENTS ACCEPTÉS ({acceptedCharters.length})
            </span>
            {acceptedCharters.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[20px] p-4 px-5 flex gap-3.5 items-center shadow-sm border border-[#EEF1F7]"
              >
                <span className="w-8 h-8 shrink-0 rounded-[10px] bg-[#17744B] text-white font-black text-[15px] flex items-center justify-center shadow-sm">
                  ✓
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="font-bold text-[16px] text-[#121628] truncate">
                    {c.title}
                  </span>
                  <span className="font-medium text-[14px] text-[#17744B] truncate">
                    {c.when}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
