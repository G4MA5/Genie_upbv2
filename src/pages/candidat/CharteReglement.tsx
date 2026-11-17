import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P3d : RÈGLEMENT ET CHARTES (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L512789 - 517605) :
 * - Bouton retour `←` rond
 * - Titre "Règlement et chartes"
 * - Indicateur "2 documents sur 3 acceptés" (1 restant en rouge)
 * - Carte de lecture de la charte en attente avec scroll, fondu dégradé et lien "↓ Télécharger le PDF"
 * - Case à cocher "J'ai lu et j'accepte" validant la charte
 * - Liste des chartes déjà validées avec badge vert `✓` et date d'émargement
 * 100% Tailwind CSS valide.
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
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 pt-16 md:pt-6">
        
        {/* Bouton retour en rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/equipe')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105"
          aria-label="Retour"
        >
          ←
        </button>

        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Règlement et chartes
        </h1>

        {/* Compteur documents */}
        <div className="flex justify-between font-semibold text-[15px] text-[#4A5168] px-1">
          <span>{acceptedCharters.length} document{acceptedCharters.length > 1 ? 's' : ''} sur 3 acceptés</span>
          {hasPending ? (
            <span className="text-[#B4281F] font-bold">1 restant</span>
          ) : (
            <span className="text-[#17744B] font-bold">Tous acceptés ✓</span>
          )}
        </div>

        {/* Carte de lecture active (Charte en attente) */}
        {hasPending && (
          <div className="bg-white rounded-[22px] p-4 flex flex-col gap-3 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
            <span className="font-extrabold text-[19px] text-[#0A1430]">
              Charte d'éthique — Technologie
            </span>

            {/* Cadre de lecture avec dégradé inférieur */}
            <div className="relative max-h-[200px] overflow-hidden p-3.5 rounded-[14px] bg-[#F6F8FC] font-normal text-[15px] leading-[1.6] text-[#3D4459]">
              <p className="m-0 mb-1.5">
                <strong>Article 1 — Code.</strong> Tout code présenté au jury est écrit par l'équipe pendant le concours ou déclaré à l'avance.
              </p>
              <p className="m-0 mb-1.5">
                <strong>Article 2 — Données.</strong> Les équipes n'utilisent que des données publiques ou fournies par les organisateurs.
              </p>
              <p className="m-0 mb-1.5">
                <strong>Article 3 — Outils d'IA.</strong> Leur usage est permis s'il est déclaré au jury, avec le rôle exact de chaque outil.
              </p>
              <p className="m-0">
                <strong>Article 4 — Respect.</strong> Aucun contenu ne porte atteinte aux personnes ou à l'Université.
              </p>
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-0 h-[60px] bg-gradient-to-t from-[#F6F8FC] to-transparent pointer-events-none"
              />
            </div>

            {/* Lien PDF */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Téléchargement du document officiel de la charte.');
              }}
              className="font-bold text-[15px] text-[#0A1430] underline hover:text-[#2F6BF0] transition-colors"
            >
              ↓ Télécharger le PDF
            </a>

            {/* Bouton d'acceptation */}
            <div
              onClick={handleAcceptPending}
              className="flex gap-3 items-center min-h-[48px] px-3.5 rounded-[14px] border-2 border-[#0A1430] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="w-[26px] h-[26px] rounded-[7px] border-2 border-[#B5B8C4] flex items-center justify-center font-bold text-transparent hover:border-[#0A1430]" />
              <span className="font-bold text-[16px] text-[#0A1430]">
                J'ai lu et j'accepte
              </span>
            </div>
          </div>
        )}

        {/* Liste des chartes déjà validées */}
        <div className="flex flex-col gap-2.5">
          {acceptedCharters.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[18px] p-3.5 px-4 flex gap-3 items-center shadow-sm border border-[#EEF1F7]"
            >
              <span className="w-7 h-7 shrink-0 rounded-[8px] bg-[#17744B] text-white font-bold text-[15px] flex items-center justify-center shadow-sm">
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

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
