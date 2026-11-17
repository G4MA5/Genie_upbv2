import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P3e : SOUMETTRE L'ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L517605 - 524979) :
 * - Bouton retour `←` rond
 * - Titre "Soumettre l'équipe"
 * - Carte Récapitulatif : nom de l'équipe "Les Bâtisseurs", catégorie "Innovation", liste des membres
 * - Carte Contrôles de validation (checks) : effectif, chartes, date limite avec bouton "Corriger"
 * - Bouton "Soumettre mon équipe" (#0A1430) déclenchant la modal officielle de soumission réussie
 * - Modal officielle avec bandeau bleu blueprint animé, cercles radio, log d'envoi et bouton vers P4
 * 100% Tailwind CSS valide.
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
];

export default function SoumissionDossier() {
  const navigate = useNavigate();
  const [subSent, setSubSent] = useState(false);

  // Pour la simulation de soumission
  const [effectifOk, setEffectifOk] = useState(false);
  const [chartesOk, setChartesOk] = useState(false);

  const handleSimulateSubmit = () => {
    setSubSent(true);
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn relative">
      
      {/* ====================================================================
          MODAL DE SUCCÈS OFFICIELLE (subSent — L517605)
          ==================================================================== */}
      {subSent && (
        <div className="fixed inset-0 z-[520] bg-[#0A1430]/60 backdrop-blur-[8px] flex items-center justify-center p-4.5 p-4">
          <div className="w-full max-w-[380px] rounded-[30px] overflow-hidden bg-white shadow-[0_30px_60px_rgba(0,0,0,0.35)] animate-scaleIn border border-[#EEF1F7]">
            {/* Header bleu blueprint avec cercles d'ondes */}
            <div className="relative h-[170px] bg-[#2F6BF0] grid place-items-center overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:32px_32px]">
              <span className="absolute w-[260px] h-[260px] rounded-full border-2 border-white/25 animate-ping opacity-30" />
              <span className="relative w-[92px] h-[92px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-extrabold text-[40px] shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                ✓
              </span>
            </div>

            {/* Corps du message de confirmation */}
            <div className="p-[22px] flex flex-col gap-3 text-center items-center">
              <span className="font-extrabold text-[26px] leading-[1.1] text-[#0A1430]">
                Équipe soumise !
              </span>
              <span className="font-medium text-[15px] leading-[1.5] text-[#3D4459]">
                Ta demande a été envoyée au responsable de la catégorie Innovation. Chaque membre reçoit une copie par e-mail.
              </span>

              {/* Journal des actions horodatées */}
              <div className="w-full flex flex-col gap-2 p-3 rounded-[16px] bg-[#F3F6FD] text-left">
                {[
                  'Dossier horodaté enregistré',
                  'Notification envoyée au jury',
                  'Copies transmises à 3 membres',
                ].map((lg) => (
                  <div
                    key={lg}
                    className="flex gap-2.5 items-center font-semibold text-[14px] text-[#0A1430]"
                  >
                    <span className="w-[22px] h-[22px] shrink-0 rounded-full bg-[#17744B] text-white grid place-items-center font-extrabold text-[11px]">
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
                className="w-full min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-extrabold text-[17px] flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_10px_24px_rgba(10,20,48,0.25)] hover:bg-[#1A2649] transition-colors"
              >
                Suivre mon statut →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          PAGE PRINCIPALE : CONTRÔLES ET RÉCAPITULATIF
          ==================================================================== */}
      <div className="max-w-[560px] w-full flex flex-col gap-3.5 pt-12 md:pt-4">
        
        {/* Bouton retour rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/equipe')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Titre */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Soumettre l'équipe
        </h1>

        {/* Carte 1 : Récapitulatif équipe & membres */}
        <div className="bg-white rounded-[22px] p-4 flex flex-col gap-2.5 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
          <div className="flex justify-between items-baseline pb-1">
            <span className="font-extrabold text-[22px] text-[#0A1430]">
              Les Bâtisseurs
            </span>
            <span className="font-bold text-[14px] text-[#F58220]">
              Innovation
            </span>
          </div>

          {RECAP_MEMBERS.map((r) => (
            <div
              key={r.name}
              className="flex gap-2.5 items-center pt-2 border-t border-[#F2F0EA]"
            >
              <span
                style={{ backgroundColor: r.bg }}
                className="w-[34px] h-[34px] shrink-0 rounded-full text-white font-bold text-[12px] flex items-center justify-center shadow-sm"
              >
                {r.i}
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-[15px] text-[#0A1430]">
                  {r.name}
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  {r.meta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carte 2 : Contrôles de validation pré-soumission */}
        <div className="bg-white rounded-[22px] px-4 py-1.5 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] flex flex-col">
          {/* Contrôle 1 : Effectif minimum */}
          <div className="flex gap-3 items-center py-3 border-b border-[#F2F0EA]">
            <span
              className={`w-[30px] h-[30px] shrink-0 rounded-full font-extrabold text-[14px] flex items-center justify-center text-white ${
                effectifOk ? 'bg-[#17744B]' : 'bg-[#C8372D]'
              }`}
            >
              {effectifOk ? '✓' : '!'}
            </span>
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-[15px] text-[#0A1430]">
                Effectif minimum
              </span>
              <span
                className={`font-medium text-[14px] ${
                  effectifOk ? 'text-[#17744B]' : 'text-[#B4281F]'
                }`}
              >
                {effectifOk ? '4 membres validés' : '3 membres sur 4 requis'}
              </span>
            </div>
            {!effectifOk && (
              <button
                type="button"
                onClick={() => navigate('/espace/equipe/membres')}
                className="min-h-[38px] px-3.5 rounded-full border-[1.5px] border-[#0A1430] font-semibold text-[14px] text-[#0A1430] flex items-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                Corriger
              </button>
            )}
          </div>

          {/* Contrôle 2 : Chartes et règlement */}
          <div className="flex gap-3 items-center py-3 border-b border-[#F2F0EA]">
            <span
              className={`w-[30px] h-[30px] shrink-0 rounded-full font-extrabold text-[14px] flex items-center justify-center text-white ${
                chartesOk ? 'bg-[#17744B]' : 'bg-[#C8372D]'
              }`}
            >
              {chartesOk ? '✓' : '!'}
            </span>
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-[15px] text-[#0A1430]">
                Chartes et règlement
              </span>
              <span
                className={`font-medium text-[14px] ${
                  chartesOk ? 'text-[#17744B]' : 'text-[#B4281F]'
                }`}
              >
                {chartesOk ? '3 sur 3 acceptées' : '2 sur 3 acceptées'}
              </span>
            </div>
            {!chartesOk && (
              <button
                type="button"
                onClick={() => navigate('/espace/equipe/charte')}
                className="min-h-[38px] px-3.5 rounded-full border-[1.5px] border-[#0A1430] font-semibold text-[14px] text-[#0A1430] flex items-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                Corriger
              </button>
            )}
          </div>

          {/* Contrôle 3 : Date limite */}
          <div className="flex gap-3 items-center py-3">
            <span className="w-[30px] h-[30px] shrink-0 rounded-full bg-[#17744B] text-white font-extrabold text-[14px] flex items-center justify-center">
              ✓
            </span>
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-[15px] text-[#0A1430]">
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
          className="min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-extrabold text-[17px] flex items-center justify-center gap-3 cursor-pointer shadow-[0_12px_26px_rgba(10,20,48,0.25)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        >
          Soumettre mon équipe
        </button>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
