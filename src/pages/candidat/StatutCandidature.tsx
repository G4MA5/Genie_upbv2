import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEspaceCharge } from '../../contexts/EspaceContext';
import { urlFichier } from '../../lib/api';
import { dateCourte, dateLongue } from '../../lib/format';

/**
 * ============================================================================
 * P4 : STATUT DE CANDIDATURE (ESPACE PARTICIPANT)
 * ============================================================================
 * Statut réel de l'équipe (brouillon, soumise, validée, refusée) tel qu'enregistré
 * par les organisateurs, avec motif de refus et badge QR une fois l'équipe validée.
 */

interface StatusConfig {
  k: string;
  bg: string;
  fg: string;
  msg: string;
  cta: string;
  go: string;
}

export default function StatutCandidature() {
  const navigate = useNavigate();
  const { espace, referentiel } = useEspaceCharge();
  const equipe = espace.equipe;
  const cloture = dateLongue(espace.inscriptions_cloture);

  let s: StatusConfig;
  if (!equipe) {
    s = {
      k: 'Sans équipe',
      bg: '#F2F0EA',
      fg: '#4A5168',
      msg: `Vous n'avez pas encore d'équipe. Créez-en une ou acceptez une invitation avant le ${cloture}.`,
      cta: 'Créer ou rejoindre une équipe',
      go: '/espace/equipe',
    };
  } else if (equipe.etat === 'brouillon') {
    const echecs = equipe.controles.filter((c) => !c.ok).length;
    s = {
      k: 'Brouillon',
      bg: '#F2F0EA',
      fg: '#4A5168',
      msg:
        `Votre équipe n'est pas encore soumise aux organisateurs` +
        (echecs ? ` : ${echecs} critère${echecs > 1 ? 's' : ''} à compléter` : ' : elle remplit tous les critères') +
        `. Date limite : ${cloture}.`,
      cta: equipe.est_chef ? 'Compléter et soumettre' : "Voir l'équipe",
      go: equipe.est_chef ? '/espace/equipe/soumettre' : '/espace/equipe',
    };
  } else if (equipe.etat === 'soumise') {
    s = {
      k: 'Soumise',
      bg: '#EAF1FF',
      fg: '#2F6BF0',
      msg: `Votre dossier a été transmis le ${dateLongue(equipe.soumise_le, true)} aux responsables de la catégorie ${equipe.concours?.categorie ?? ''}. Vous serez notifié·e par e-mail de leur décision.`,
      cta: 'Voir mon équipe',
      go: '/espace/equipe',
    };
  } else if (equipe.etat === 'validee') {
    s = {
      k: 'Validée',
      bg: '#DDF7E8',
      fg: '#17744B',
      msg: `Félicitations ! L'équipe ${equipe.nom} est officiellement inscrite au concours GÉNIE UPB (validée le ${dateLongue(equipe.validee_le, true)}).`,
      cta: 'Voir mon badge',
      go: '/espace/profil',
    };
  } else {
    s = {
      k: 'À corriger',
      bg: '#FBE6E3',
      fg: '#B4281F',
      msg: "Votre dossier n'a pas été validé en l'état. Le chef d'équipe peut corriger la composition puis soumettre à nouveau.",
      cta: equipe.est_chef ? 'Corriger le dossier' : "Voir l'équipe",
      go: equipe.est_chef ? '/espace/equipe/soumettre' : '/espace/equipe',
    };
  }

  const debut = referentiel?.evenement.date_debut;
  const fin = referentiel?.evenement.date_fin;

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            ←
          </button>
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Statut d'inscription
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div
            style={{ borderTopColor: s.fg }}
            className="bg-white rounded-[24px] p-6 flex flex-col gap-4 shadow-[0_12px_30px_rgba(14,30,74,0.08)] border border-[#EEF1F7] border-t-[6px]"
          >
            <span
              style={{ backgroundColor: s.bg, color: s.fg }}
              className="self-start flex gap-2.5 items-center px-4 py-2 rounded-full font-black text-[16px]"
            >
              <span style={{ backgroundColor: s.fg }} className="w-2.5 h-2.5 rounded-full" />
              {s.k}
            </span>

            {equipe && (
              <span className="font-bold text-[15px] text-[#6A7189]">
                {equipe.nom} · {equipe.concours?.categorie} · {equipe.membres.length} membre
                {equipe.membres.length > 1 ? 's' : ''}
              </span>
            )}

            <span className="font-medium text-[16px] leading-[1.6] text-[#3D4459]">{s.msg}</span>

            {equipe?.etat === 'refusee' && equipe.motif_refus && (
              <div className="p-4 rounded-[16px] bg-[#FBE6E3] flex flex-col gap-1">
                <span className="font-black text-[14px] text-[#B4281F]">Motif</span>
                <span className="font-medium text-[15px] leading-[1.5] text-[#5A1A14]">{equipe.motif_refus}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate(s.go)}
              className="mt-2 min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-black text-[16px] flex items-center justify-center cursor-pointer shadow-md hover:bg-[#1A2649] transition-colors"
            >
              {s.cta} →
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {equipe?.etat === 'validee' ? (
              <div className="border-2 border-dashed border-[#2F6BF0] rounded-[24px] p-5 flex gap-4 items-center bg-white shadow-sm">
                {espace.badge_url ? (
                  <img
                    src={urlFichier(espace.badge_url)}
                    alt="Mon badge"
                    className="w-[80px] h-[136px] rounded-[12px] shrink-0 object-cover shadow-md"
                  />
                ) : (
                  <div className="w-[80px] h-[80px] rounded-[16px] shrink-0 bg-[repeating-linear-gradient(45deg,#EEECE6_0_6px,#E3E8F0_6px_12px)] flex items-center justify-center text-[28px] shadow-inner">
                    📱
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-black text-[16px] text-[#0A1430]">Badge numérique officiel</span>
                  <span className="font-medium text-[14px] leading-[1.45] text-[#6A7189]">
                    {espace.badge_url
                      ? 'Ton badge QR personnel t’a été envoyé par e-mail. Présente-le à l’entrée, aux repas et aux formations.'
                      : 'Ton badge QR est en cours de génération ; il te sera envoyé par e-mail.'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-sm border border-[#EEF1F7]">
                <span className="font-black text-[18px] text-[#0A1430]">Comment se passe la validation ?</span>
                <span className="font-medium text-[15px] leading-[1.55] text-[#6A7189]">
                  Le chef d'équipe soumet l'équipe une fois tous les critères de la catégorie remplis. Les organisateurs
                  examinent ensuite le dossier ; à la validation, chaque membre reçoit par e-mail son badge avec un QR code
                  unique.
                </span>
              </div>
            )}

            <div className="bg-white rounded-[24px] p-5 flex flex-col gap-2.5 shadow-sm border border-[#EEF1F7]">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">PROCHAINES ÉCHÉANCES</span>
              <div className="flex justify-between items-center py-1.5 border-b border-[#F2F0EA]">
                <span className="font-bold text-[15px] text-[#0A1430]">Clôture des inscriptions</span>
                <span className="font-bold text-[14px] text-[#2F6BF0]">
                  {dateCourte(espace.inscriptions_cloture)} {new Date(espace.inscriptions_cloture).getFullYear()}
                </span>
              </div>
              {debut && (
                <div className="flex justify-between items-center py-1.5">
                  <span className="font-bold text-[15px] text-[#0A1430]">Le Génie UPB</span>
                  <span className="font-bold text-[14px] text-[#17744B]">
                    {fin && fin !== debut ? `${new Date(debut).getDate()} – ` : ''}
                    {dateCourte(fin ?? debut)} {new Date(fin ?? debut).getFullYear()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
