import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * ============================================================================
 * P4 : STATUT DE CANDIDATURE (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L524979 - 529640) :
 * - Bouton retour `←` rond
 * - Titre "Statut d'inscription"
 * - Sélecteur ou paramètre de statut (?status=soumise | validee | attente | refusee)
 * - Carte de statut principale avec bordure supérieure colorée (6px)
 * - Badge pastille avec puce ronde colorée
 * - Message officiel et explicatif
 * - Bloc motif (si refusée) ou bloc rang (si liste d'attente)
 * - Bloc badge QR code officiel (si validée)
 * - Boutons d'action adaptés (Retour à mon équipe, Accéder aux formations, etc.)
 * 100% Tailwind CSS valide.
 */

interface StatusConfig {
  k: string;
  fg: string;
  bg: string;
  msg: string;
  hasMotif?: boolean;
  motif?: string;
  hasRank?: boolean;
  rank?: string;
  isOk?: boolean;
  cta: string;
  go: string;
}

const STATUSES: Record<string, StatusConfig> = {
  soumise: {
    k: 'Soumise',
    fg: '#2F6BF0',
    bg: '#EAF1FF',
    msg: 'Ton équipe Les Bâtisseurs a été soumise le 24 novembre. Le responsable de la catégorie Innovation examine actuellement la conformité des membres et des chartes. Réponse sous 48h.',
    cta: 'Retour à mon équipe',
    go: '/espace/equipe?state=team',
  },
  validee: {
    k: 'Validée',
    fg: '#17744B',
    bg: '#DDF7E8',
    msg: 'Félicitations ! L’équipe Les Bâtisseurs est officiellement retenue pour concourir dans la catégorie Innovation. Vos accès aux ateliers de préparation sont désormais ouverts.',
    isOk: true,
    cta: 'Accéder aux formations',
    go: '/espace/formations',
  },
  attente: {
    k: 'Liste d’attente',
    fg: '#8A5A00',
    bg: '#FBEFD2',
    msg: 'Votre dossier est complet et conforme. En raison du quota maximal atteint dans la catégorie, votre équipe est inscrite sur la liste prioritaire en cas de désistement.',
    hasRank: true,
    rank: '3',
    cta: 'Retour à mon équipe',
    go: '/espace/equipe?state=team',
  },
  refusee: {
    k: 'Non retenue',
    fg: '#B4281F',
    bg: '#FBE6E3',
    msg: 'La candidature de l’équipe Les Bâtisseurs n’a pas pu être validée par le comité d’organisation.',
    hasMotif: true,
    motif: 'Deux membres de l’équipe sont déjà inscrits dans une autre formation concurrente sans dérogation.',
    cta: 'Créer une autre équipe',
    go: '/espace/equipe/creer',
  },
};

export default function StatutCandidature() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKey = searchParams.get('status') || 'soumise';
  const currentStatus = STATUSES[currentKey] || STATUSES.soumise;

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* Bouton retour en rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/equipe?state=team')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0E1E4A] cursor-pointer hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Titre */}
        <h1 className="m-0 font-extrabold text-[30px] leading-none text-[#0E1E4A]">
          Statut d'inscription
        </h1>

        {/* Sélecteur rapide de statut (utile pour les tests et démos) */}
        <div className="flex gap-1.5 p-1 bg-white rounded-full shadow-sm border border-[#EEF1F7] self-start">
          {Object.entries(STATUSES).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSearchParams({ status: key })}
              className={`px-3 py-1 rounded-full text-[12px] font-bold transition-colors ${
                currentKey === key
                  ? 'bg-[#0A1430] text-white'
                  : 'text-[#6A7189] hover:text-[#0A1430]'
              }`}
            >
              {cfg.k}
            </button>
          ))}
        </div>

        {/* Carte principale de statut */}
        <div
          style={{ borderTopColor: currentStatus.fg }}
          className="bg-white rounded-[22px] p-[18px] flex flex-col gap-3 shadow-[0_12px_30px_rgba(14,30,74,0.08)] border border-[#EEF1F7] border-t-[6px]"
        >
          {/* Badge pastille */}
          <span
            style={{ backgroundColor: currentStatus.bg, color: currentStatus.fg }}
            className="self-start flex gap-2 items-center px-3.5 py-1.5 rounded-full font-extrabold text-[16px]"
          >
            <span
              style={{ backgroundColor: currentStatus.fg }}
              className="w-2.5 h-2.5 rounded-full"
            />
            {currentStatus.k}
          </span>

          {/* Message explicatif */}
          <span className="font-normal text-[16px] leading-[1.55] text-[#3D4459]">
            {currentStatus.msg}
          </span>

          {/* Motif si refusée */}
          {currentStatus.hasMotif && (
            <div className="p-3 px-3.5 rounded-[14px] bg-[#FBE6E3] flex flex-col gap-1">
              <span className="font-bold text-[14px] text-[#B4281F]">Motif</span>
              <span className="font-medium text-[15px] leading-[1.45] text-[#5A1A14]">
                {currentStatus.motif}
              </span>
            </div>
          )}

          {/* Rang si liste d'attente */}
          {currentStatus.hasRank && (
            <div className="flex gap-3 items-center p-3 px-3.5 rounded-[14px] bg-[#FBEFD2]">
              <span className="font-extrabold text-[36px] leading-none text-[#8A5A00]">
                {currentStatus.rank}
              </span>
              <span className="font-semibold text-[15px] text-[#7A4F00]">
                e dans la liste d'attente
              </span>
            </div>
          )}

          {/* Bouton d'action CTA */}
          <button
            type="button"
            onClick={() => navigate(currentStatus.go)}
            className="mt-1 min-h-[50px] rounded-full bg-[#0E1E4A] text-white font-bold text-[16px] flex items-center justify-center cursor-pointer shadow-sm hover:bg-[#1A2649] transition-colors"
          >
            {currentStatus.cta} →
          </button>
        </div>

        {/* Bloc QR code personnel si validée */}
        {currentStatus.isOk && (
          <div className="border-2 border-dashed border-[#D6D2C8] rounded-[22px] p-4 flex gap-3.5 items-center bg-white/70">
            <div className="w-[72px] h-[72px] rounded-[12px] shrink-0 bg-[repeating-linear-gradient(45deg,#EEECE6_0_6px,#E3E8F0_6px_12px)] flex items-center justify-center text-[22px]">
              📱
            </div>
            <span className="font-semibold text-[14px] leading-[1.4] text-[#6A7189]">
              Votre QR code personnel apparaîtra ici (module M7).
            </span>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
