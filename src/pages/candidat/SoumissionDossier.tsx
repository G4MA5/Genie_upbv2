import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P3e : SOUMETTRE L'ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19956657) :
 * - Bouton retour `←` rond
 * - Titre "Soumettre l'équipe"
 * - Grille fluide 2 colonnes sur grand écran :
 *   - Colonne 1 : Récapitulatif équipe & membres (Les Bâtisseurs · Innovation)
 *   - Colonne 2 : Contrôles de validation (Effectif, Chartes, Date limite) + Bouton "Soumettre mon équipe"
 * - Modal officielle de soumission réussie avec bandeau bleu blueprint, check animé, journal d'envoi et bouton P4
 * 100% pleine largeur sur grand écran.
 */

interface TeamMemberRecap {
  name: string;
  meta: string;
  i: string;
  bg: string;
}

const RECAP_MEMBERS: TeamMemberRecap[] = [
  { name: 'Aya Kouassi', meta: 'L2 · MIAGE · Cheffe', i: 'AK', bg: '#F58220' },
  { name: 'Moussa Diallo', meta: 'L2 · Génie Civil', i: 'MD', bg: '#2F6BF0' },
  { name: 'Fatou Touré', meta: 'L1 · Économie', i: 'FT', bg: '#00875A' },
  { name: 'Koffi Jean-Luc', meta: 'L2 · Informatique', i: 'KJ', bg: '#8E44AD' },
];

export default function SoumissionDossier() {
  const navigate = useNavigate();
  const [subSent, setSubSent] = useState(false);

  // Indicateurs de conformité
  const [effectifOk] = useState(true);
  const [chartesOk] = useState(true);

  const handleSimulateSubmit = () => {
    setSubSent(true);
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn relative">
      
      {/* ====================================================================
          MODAL DE SUCCÈS OFFICIELLE (subSent)
          ==================================================================== */}
      {subSent && (
        <div className="fixed inset-0 z-[520] bg-[#0A1430]/60 backdrop-blur-[8px] flex items-center justify-center p-4">
          <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden bg-white shadow-[0_30px_60px_rgba(0,0,0,0.35)] animate-scaleIn border border-[#EEF1F7]">
            {/* Header bleu blueprint avec cercles d'ondes */}
            <div className="relative h-[170px] bg-[#2F6BF0] grid place-items-center overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:32px_32px]">
              <span className="absolute w-[260px] h-[260px] rounded-full border-2 border-white/25 animate-ping opacity-30" />
              <span className="relative w-[92px] h-[92px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-black text-[40px] shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                ✓
              </span>
            </div>

            {/* Corps du message de confirmation */}
            <div className="p-6 flex flex-col gap-4 text-center items-center">
              <span className="font-black text-[26px] leading-[1.1] text-[#0A1430]">
                Équipe soumise !
              </span>
              <span className="font-medium text-[15px] leading-[1.5] text-[#3D4459]">
                Ta demande a été envoyée au responsable de la catégorie Innovation. Chaque membre reçoit une copie par e-mail.
              </span>

              {/* Journal des actions horodatées */}
              <div className="w-full flex flex-col gap-2.5 p-3.5 rounded-[18px] bg-[#F3F6FD] text-left">
                {[
                  'Dossier horodaté enregistré',
                  'Notification envoyée au jury',
                  'Copies transmises aux membres',
                ].map((lg) => (
                  <div
                    key={lg}
                    className="flex gap-2.5 items-center font-bold text-[14px] text-[#0A1430]"
                  >
                    <span className="w-5 h-5 shrink-0 rounded-full bg-[#17744B] text-white grid place-items-center font-black text-[11px]">
                      ✓
                    </span>
                    <span>{lg}</span>
                  </div>
                ))}
              </div>

              {/* Bouton Suivre mon statut */}
              <button
                type="button"
                onClick={() => navigate('/espace/statut')}
                className="w-full min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-black text-[17px] flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_10px_24px_rgba(10,20,48,0.25)] hover:bg-[#1A2649] transition-colors"
              >
                Suivre mon statut →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CONTENU DE LA PAGE : 100% pleine largeur fluide
          ==================================================================== */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour rond `←` */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe?state=team')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            ←
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Soumettre l'équipe
          </h1>
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran : Récapitulatif à gauche, Contrôles à droite */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne Gauche : Carte Récapitulatif équipe & membres */}
          <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
            <div className="flex justify-between items-baseline pb-2 border-b border-[#F2F0EA]">
              <span className="font-black text-[24px] text-[#0A1430]">
                Les Bâtisseurs
              </span>
              <span className="font-bold text-[14px] text-[#F58220] tracking-wide uppercase">
                Innovation
              </span>
            </div>

            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] pt-1">
              COMPOSITION DE L'ÉQUIPE ({RECAP_MEMBERS.length} MEMBRES)
            </span>

            <div className="flex flex-col gap-2 pt-1">
              {RECAP_MEMBERS.map((r) => (
                <div
                  key={r.name}
                  className="flex gap-3 items-center p-2 rounded-[14px] hover:bg-slate-50 transition-colors"
                >
                  <span
                    style={{ backgroundColor: r.bg }}
                    className="w-10 h-10 shrink-0 rounded-full text-white font-black text-[13px] flex items-center justify-center shadow-sm"
                  >
                    {r.i}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-[16px] text-[#0A1430]">
                      {r.name}
                    </span>
                    <span className="font-medium text-[13px] text-[#6A7189]">
                      {r.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne Droite : Carte Contrôles de validation pré-soumission + Bouton d'action */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] flex flex-col gap-1">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] pb-2">
                CRITÈRES D'ÉLIGIBILITÉ
              </span>

              {/* Contrôle 1 : Effectif minimum */}
              <div className="flex gap-3.5 items-center py-3.5 border-b border-[#F2F0EA]">
                <span
                  className={`w-8 h-8 shrink-0 rounded-full font-black text-[14px] flex items-center justify-center text-white ${
                    effectifOk ? 'bg-[#17744B]' : 'bg-[#C8372D]'
                  }`}
                >
                  {effectifOk ? '✓' : '!'}
                </span>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-[16px] text-[#0A1430]">
                    Effectif minimum
                  </span>
                  <span
                    className={`font-medium text-[14px] ${
                      effectifOk ? 'text-[#17744B]' : 'text-[#B4281F]'
                    }`}
                  >
                    {effectifOk ? '4 membres validés (conforme)' : '3 membres sur 4 requis'}
                  </span>
                </div>
                {!effectifOk && (
                  <button
                    type="button"
                    onClick={() => navigate('/espace/equipe/membres')}
                    className="min-h-[38px] px-4 rounded-full border-[1.5px] border-[#0A1430] font-bold text-[14px] text-[#0A1430] flex items-center cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    Corriger
                  </button>
                )}
              </div>

              {/* Contrôle 2 : Chartes et règlement */}
              <div className="flex gap-3.5 items-center py-3.5 border-b border-[#F2F0EA]">
                <span
                  className={`w-8 h-8 shrink-0 rounded-full font-black text-[14px] flex items-center justify-center text-white ${
                    chartesOk ? 'bg-[#17744B]' : 'bg-[#C8372D]'
                  }`}
                >
                  {chartesOk ? '✓' : '!'}
                </span>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-[16px] text-[#0A1430]">
                    Chartes et règlement
                  </span>
                  <span
                    className={`font-medium text-[14px] ${
                      chartesOk ? 'text-[#17744B]' : 'text-[#B4281F]'
                    }`}
                  >
                    {chartesOk ? '3 sur 3 acceptées (conforme)' : '2 sur 3 acceptées'}
                  </span>
                </div>
                {!chartesOk && (
                  <button
                    type="button"
                    onClick={() => navigate('/espace/equipe/charte')}
                    className="min-h-[38px] px-4 rounded-full border-[1.5px] border-[#0A1430] font-bold text-[14px] text-[#0A1430] flex items-center cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    Corriger
                  </button>
                )}
              </div>

              {/* Contrôle 3 : Date limite */}
              <div className="flex gap-3.5 items-center py-3.5">
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#17744B] text-white font-black text-[14px] flex items-center justify-center">
                  ✓
                </span>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-[16px] text-[#0A1430]">
                    Date limite
                  </span>
                  <span className="font-medium text-[14px] text-[#17744B]">
                    Clôture le 18 décembre à 23h59
                  </span>
                </div>
              </div>
            </div>

            {/* Bouton Soumettre mon équipe */}
            <button
              type="button"
              onClick={handleSimulateSubmit}
              className="w-full min-h-[58px] rounded-[18px] bg-[#0A1430] text-white font-black text-[17px] flex items-center justify-center gap-3 cursor-pointer shadow-[0_12px_26px_rgba(10,20,48,0.25)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              Soumettre mon équipe →
            </button>
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
