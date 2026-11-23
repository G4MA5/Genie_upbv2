import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEspaceCharge } from '../../contexts/EspaceContext';
import { couleurCategorie, dateLongue } from '../../lib/format';

/**
 * ============================================================================
 * P3d : RÈGLEMENT ET CHARTES (ESPACE PARTICIPANT)
 * ============================================================================
 * - Conditions d'utilisation acceptées à l'inscription (date réelle)
 * - Règles de composition de la catégorie de l'équipe (appliquées par le backend)
 * - Lien vers les documents officiels du concours
 */
export default function CharteReglement() {
  const navigate = useNavigate();
  const { espace, referentiel } = useEspaceCharge();
  const equipe = espace.equipe;
  const accepte = espace.candidat.conditions_acceptees_le;
  const categories = equipe?.concours ? [equipe.concours] : referentiel?.concours ?? [];

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Retour"
          >
            ←
          </button>
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Règlement et chartes
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Règles de la catégorie */}
          <div className="flex flex-col gap-4">
            {categories.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]"
              >
                <div className="flex items-center gap-3">
                  <span style={{ backgroundColor: couleurCategorie(c.cle) }} className="w-1.5 self-stretch rounded-full" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
                      RÈGLES D'ÉQUIPE · {c.taille.toUpperCase()}
                    </span>
                    <span className="font-black text-[20px] text-[#0A1430]">{c.categorie}</span>
                  </div>
                </div>
                <div className="p-4 rounded-[16px] bg-[#F6F8FC] flex flex-col gap-2 font-medium text-[15px] leading-[1.6] text-[#3D4459]">
                  {c.regles.map((r, i) => (
                    <p key={r} className="m-0">
                      <strong className="text-[#0A1430]">Article {i + 1}.</strong> {r}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <span className="font-medium text-[14px] leading-[1.5] text-[#6A7189] px-1">
              Ces règles sont vérifiées automatiquement à chaque invitation et avant la soumission de l'équipe.
            </span>
          </div>

          {/* Documents acceptés */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">DOCUMENTS ACCEPTÉS</span>
            <div className="bg-white rounded-[20px] p-4 px-5 flex gap-3.5 items-center shadow-sm border border-[#EEF1F7]">
              <span
                className={`w-8 h-8 shrink-0 rounded-[10px] text-white font-black text-[15px] flex items-center justify-center shadow-sm ${
                  accepte ? 'bg-[#17744B]' : 'bg-[#C8372D]'
                }`}
              >
                {accepte ? '✓' : '!'}
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="font-bold text-[16px] text-[#121628]">Conditions d'utilisation et données personnelles</span>
                <span className={`font-medium text-[14px] ${accepte ? 'text-[#17744B]' : 'text-[#B4281F]'}`}>
                  {accepte
                    ? `Accepté le ${dateLongue(accepte, true)} à ${new Date(accepte).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : 'Non accepté'}
                </span>
              </div>
            </div>

            <div
              onClick={() => navigate('/documents')}
              className="bg-white rounded-[20px] p-4 px-5 flex gap-3.5 items-center shadow-sm border border-[#EEF1F7] cursor-pointer hover:bg-[#F3F6FD] transition-colors"
            >
              <span className="w-8 h-8 shrink-0 rounded-[10px] bg-[#E3EBFB] text-[#2F6BF0] font-black text-[15px] flex items-center justify-center">
                ↓
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="font-bold text-[16px] text-[#121628]">Documents officiels du concours</span>
                <span className="font-medium text-[14px] text-[#6A7189]">Règlement général et chartes à télécharger</span>
              </div>
              <span className="font-extrabold text-[18px] text-[#2F6BF0]">›</span>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
