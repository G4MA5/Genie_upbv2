import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * ============================================================================
 * P4 : STATUT DE CANDIDATURE (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19964456) :
 * - Bouton retour `←` rond
 * - Titre "Statut d'inscription"
 * - Sélecteur interactif des 5 statuts :
 *   1. Brouillon
 *   2. Soumise (en attente)
 *   3. Validée
 *   4. Liste d'attente
 *   5. Refusée
 * - Grille 2 colonnes fluide sur grand écran :
 *   - Colonne 1 : Carte principale de statut avec badge pastille colorée, message explicatif,
 *     motif de rejet ou rang de liste d'attente, et bouton CTA officiel
 *   - Colonne 2 : Carte complémentaire avec encart QR code personnel (module M7) ou aide & calendrier
 * 100% pleine largeur sur grand écran.
 */

interface StatusConfig {
  k: string;
  bg: string;
  fg: string;
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
  brouillon: {
    k: 'Brouillon',
    bg: '#F2F0EA',
    fg: '#4A5168',
    msg: "Votre équipe n'est pas encore soumise. Complétez les membres et les chartes avant le 18 décembre.",
    cta: "Compléter l'équipe",
    go: '/espace/equipe/membres',
  },
  soumise: {
    k: 'Soumise',
    bg: '#EAF1FF',
    fg: '#2F6BF0',
    msg: 'Votre dossier a été transmis aux responsables de catégorie. Décision sous 48h ouvrées.',
    cta: 'Voir mon équipe',
    go: '/espace/equipe?state=team',
  },
  validee: {
    k: 'Validée',
    bg: '#DDF7E8',
    fg: '#17744B',
    msg: 'Félicitations ! Votre équipe est officiellement inscrite au concours GÉNIE UPB 2026.',
    isOk: true,
    cta: 'Accéder aux formations',
    go: '/espace/formations',
  },
  attente: {
    k: "Liste d'attente",
    bg: '#FBEFD2',
    fg: '#8A5A00',
    msg: "La catégorie Innovation est temporairement complète. Votre place sera réattribuée si une équipe se désiste.",
    hasRank: true,
    rank: '2',
    cta: 'Changer de catégorie',
    go: '/espace/equipe/creer',
  },
  refusee: {
    k: 'Refusée',
    bg: '#FBE6E3',
    fg: '#B4281F',
    msg: "Votre dossier n'a pas pu être retenu pour cette édition.",
    hasMotif: true,
    motif: 'Dossier incomplet : manque 1 membre requis avant la date limite.',
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
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond `←` */}
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
            Statut d'inscription
          </h1>
        </div>

        {/* Sélecteur rapide de statut pour la simulation et la vérification */}
        <div className="flex gap-2 p-1.5 bg-white rounded-full shadow-sm border border-[#EEF1F7] self-start flex-wrap">
          {Object.entries(STATUSES).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSearchParams({ status: key })}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors cursor-pointer ${
                currentKey === key
                  ? 'bg-[#0A1430] text-white shadow-sm'
                  : 'text-[#6A7189] hover:text-[#0A1430]'
              }`}
            >
              {cfg.k}
            </button>
          ))}
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne 1 : Carte principale de statut */}
          <div
            style={{ borderTopColor: currentStatus.fg }}
            className="bg-white rounded-[24px] p-6 flex flex-col gap-4 shadow-[0_12px_30px_rgba(14,30,74,0.08)] border border-[#EEF1F7] border-t-[6px]"
          >
            {/* Badge pastille */}
            <span
              style={{ backgroundColor: currentStatus.bg, color: currentStatus.fg }}
              className="self-start flex gap-2.5 items-center px-4 py-2 rounded-full font-black text-[16px]"
            >
              <span
                style={{ backgroundColor: currentStatus.fg }}
                className="w-2.5 h-2.5 rounded-full"
              />
              {currentStatus.k}
            </span>

            {/* Message explicatif */}
            <span className="font-medium text-[16px] leading-[1.6] text-[#3D4459]">
              {currentStatus.msg}
            </span>

            {/* Motif si refusée */}
            {currentStatus.hasMotif && (
              <div className="p-4 rounded-[16px] bg-[#FBE6E3] flex flex-col gap-1">
                <span className="font-black text-[14px] text-[#B4281F]">Motif</span>
                <span className="font-medium text-[15px] leading-[1.5] text-[#5A1A14]">
                  {currentStatus.motif}
                </span>
              </div>
            )}

            {/* Rang si liste d'attente */}
            {currentStatus.hasRank && (
              <div className="flex gap-3.5 items-center p-4 rounded-[16px] bg-[#FBEFD2]">
                <span className="font-black text-[38px] leading-none text-[#8A5A00]">
                  {currentStatus.rank}
                </span>
                <span className="font-bold text-[16px] text-[#7A4F00]">
                  e dans la liste d'attente
                </span>
              </div>
            )}

            {/* Bouton d'action CTA */}
            <button
              type="button"
              onClick={() => navigate(currentStatus.go)}
              className="mt-2 min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-black text-[16px] flex items-center justify-center cursor-pointer shadow-md hover:bg-[#1A2649] transition-colors"
            >
              {currentStatus.cta} →
            </button>
          </div>

          {/* Colonne 2 : Informations complémentaires & QR code */}
          <div className="flex flex-col gap-4">
            {/* Bloc QR code personnel si validée */}
            {currentStatus.isOk ? (
              <div className="border-2 border-dashed border-[#2F6BF0] rounded-[24px] p-5 flex gap-4 items-center bg-white shadow-sm">
                <div className="w-[80px] h-[80px] rounded-[16px] shrink-0 bg-[repeating-linear-gradient(45deg,#EEECE6_0_6px,#E3E8F0_6px_12px)] flex items-center justify-center text-[28px] shadow-inner">
                  📱
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-black text-[16px] text-[#0A1430]">
                    Badge numérique officiel
                  </span>
                  <span className="font-medium text-[14px] leading-[1.45] text-[#6A7189]">
                    Votre QR code personnel apparaîtra ici (module M7). Il permettra d'émarger aux séances en présentiel.
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-sm border border-[#EEF1F7]">
                <span className="font-black text-[18px] text-[#0A1430]">
                  Besoin d'aide ou d'informations ?
                </span>
                <span className="font-medium text-[15px] leading-[1.55] text-[#6A7189]">
                  Les jurys et formateurs examinent les dossiers de façon continue. Pour toute question sur les statuts ou les quotas de catégorie, contactez le comité d'organisation.
                </span>
                <div className="flex items-center gap-2 pt-1 font-bold text-[14px] text-[#2F6BF0]">
                  <span>support@genieupb.ci</span>
                  <span>·</span>
                  <span>Bâtiment Central UPB</span>
                </div>
              </div>
            )}

            {/* Échéances importantes */}
            <div className="bg-white rounded-[24px] p-5 flex flex-col gap-2.5 shadow-sm border border-[#EEF1F7]">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
                PROCHAINES ÉCHÉANCES
              </span>
              <div className="flex justify-between items-center py-1.5 border-b border-[#F2F0EA]">
                <span className="font-bold text-[15px] text-[#0A1430]">Clôture des inscriptions</span>
                <span className="font-bold text-[14px] text-[#2F6BF0]">18 déc. 2026</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="font-bold text-[15px] text-[#0A1430]">Début des formations</span>
                <span className="font-bold text-[14px] text-[#17744B]">7 janv. 2027</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
