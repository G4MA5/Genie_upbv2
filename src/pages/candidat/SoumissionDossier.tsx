import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/espace/Avatar';
import { action, useEspaceCharge } from '../../contexts/EspaceContext';
import { api, urlFichier } from '../../lib/api';
import { LIBELLE_ETAT, cursus, dateLongue, dateRelative, nomComplet, tailleFichier } from '../../lib/format';

/**
 * ============================================================================
 * P3e : SOUMETTRE L'ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * - Colonne 1 : récapitulatif réel de l'équipe et de ses membres
 * - Colonne 2 : contrôles calculés par le backend selon les règles de la catégorie,
 *   documents de l'équipe (catégorie Innovation uniquement, bucket « ressources ») et soumission par le chef.
 */
export default function SoumissionDossier() {
  const navigate = useNavigate();
  const { espace, majEquipe } = useEspaceCharge();
  const equipe = espace.equipe;
  const [subSent, setSubSent] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [upload, setUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!equipe) navigate('/espace/equipe', { replace: true });
  }, [equipe, navigate]);
  if (!equipe) return null;

  // Seule la catégorie Innovation fournit des documents
  const depotOuvert = equipe.documents && new Date(equipe.date_limite_ressources).getTime() > Date.now();
  const echecs = equipe.controles.filter((c) => !c.ok);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUpload(true);
    const r = await action(() => api.deposerRessource(equipe.id, file), 'Document ajouté');
    setUpload(false);
    if (r) majEquipe(r);
  };

  const ouvrir = async (id: number) => {
    const r = await action(() => api.lienRessource(equipe.id, id));
    if (r) window.open(urlFichier(r.url), '_blank', 'noopener');
  };

  const supprimer = async (id: number) => {
    const r = await action(() => api.supprimerRessource(equipe.id, id), 'Document supprimé');
    if (r) majEquipe(r);
  };

  const soumettre = async () => {
    if (!equipe.peut_soumettre || envoi) return;
    setEnvoi(true);
    const r = await action(() => api.soumettre(equipe.id));
    setEnvoi(false);
    if (r) {
      majEquipe(r);
      setSubSent(true);
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn relative">
      {/* MODAL DE SUCCÈS */}
      {subSent && (
        <div className="fixed inset-0 z-[520] bg-[#0A1430]/60 backdrop-blur-[8px] flex items-center justify-center p-4">
          <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden bg-white shadow-[0_30px_60px_rgba(0,0,0,0.35)] animate-scaleIn border border-[#EEF1F7]">
            <div className="relative h-[170px] bg-[#2F6BF0] grid place-items-center overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:32px_32px]">
              <span className="absolute w-[260px] h-[260px] rounded-full border-2 border-white/25 animate-ping opacity-30" />
              <span className="relative w-[92px] h-[92px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-black text-[40px] shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
                ✓
              </span>
            </div>
            <div className="p-6 flex flex-col gap-4 text-center items-center">
              <span className="font-black text-[26px] leading-[1.1] text-[#0A1430]">Équipe soumise !</span>
              <span className="font-medium text-[15px] leading-[1.5] text-[#3D4459]">
                Ton dossier a été transmis aux organisateurs de la catégorie {equipe.concours?.categorie}. Chaque membre
                recevra son badge QR par e-mail dès la validation.
              </span>
              <div className="w-full flex flex-col gap-2.5 p-3.5 rounded-[18px] bg-[#F3F6FD] text-left">
                {[
                  `Dossier horodaté : ${dateRelative(equipe.soumise_le)}`,
                  `${equipe.membres.length} membre(s) inscrit(s)`,
                  ...(equipe.documents ? [`${equipe.ressources.length} document(s) joint(s)`] : []),
                ].map((lg) => (
                  <div key={lg} className="flex gap-2.5 items-center font-bold text-[14px] text-[#0A1430]">
                    <span className="w-5 h-5 shrink-0 rounded-full bg-[#17744B] text-white grid place-items-center font-black text-[11px]">
                      ✓
                    </span>
                    <span className="truncate">{lg}</span>
                  </div>
                ))}
              </div>
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
            Soumettre l'équipe
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Récapitulatif */}
          <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
            <div className="flex justify-between items-baseline gap-3 pb-2 border-b border-[#F2F0EA]">
              <span className="font-black text-[24px] text-[#0A1430] truncate">{equipe.nom}</span>
              <span className="font-bold text-[14px] text-[#F58220] tracking-wide uppercase shrink-0">
                {equipe.concours?.categorie}
              </span>
            </div>

            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] pt-1">
              COMPOSITION DE L'ÉQUIPE ({equipe.membres.length} MEMBRE
              {equipe.membres.length > 1 ? 'S' : ''})
            </span>

            <div className="flex flex-col gap-2 pt-1">
              {equipe.membres.map((m) => (
                <div
                  key={m.id}
                  className="flex gap-3 items-center p-2 rounded-[14px] hover:bg-slate-50 transition-colors"
                >
                  <Avatar personne={m} className="w-10 h-10 text-[13px] shadow-sm" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[16px] text-[#0A1430] truncate">{nomComplet(m)}</span>
                    <span className="font-medium text-[13px] text-[#6A7189]">
                      {[
                        cursus(m),
                        m.genre === 'F' ? 'Fille' : m.genre === 'M' ? 'Garçon' : null,
                        m.est_chef ? 'Chef' : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents de l'équipe (catégorie Innovation uniquement) */}
            {equipe.documents && (
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] pt-4">
                DOCUMENTS ({equipe.ressources.length})
              </span>
            )}
            {equipe.documents && equipe.ressources.length === 0 && (
              <span className="font-medium text-[14px] text-[#6A7189]">Aucun document déposé pour l'instant.</span>
            )}
            {equipe.documents &&
              equipe.ressources.map((r) => (
                <div key={r.id} className="flex gap-3 items-center p-2.5 rounded-[14px] bg-[#F6F8FC]">
                  <span className="w-10 h-10 shrink-0 rounded-[12px] bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-black text-[11px] uppercase">
                    {r.file_name.split('.').pop()?.slice(0, 4)}
                  </span>
                  <div className="flex-1 flex flex-col min-w-0">
                    <button
                      type="button"
                      onClick={() => ouvrir(r.id)}
                      className="text-left font-bold text-[15px] text-[#0A1430] truncate hover:underline cursor-pointer"
                    >
                      {r.file_name}
                    </button>
                    <span className="font-medium text-[12px] text-[#6A7189] truncate">
                      {[tailleFichier(r.taille), r.depose_par, dateRelative(r.date)].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  {r.peut_supprimer && equipe.modifiable && (
                    <button
                      type="button"
                      onClick={() => supprimer(r.id)}
                      className="min-h-[34px] px-3 rounded-full text-[#B4281F] font-bold text-[13px] hover:bg-red-50 cursor-pointer shrink-0"
                    >
                      Retirer
                    </button>
                  )}
                </div>
              ))}
          </div>

          {/* Contrôles + actions */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] flex flex-col gap-1">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] pb-2">
                CRITÈRES D'ÉLIGIBILITÉ · {equipe.concours?.categorie?.toUpperCase()}
              </span>

              {equipe.controles.map((c) => (
                <div key={c.code} className="flex gap-3.5 items-center py-3.5 border-b border-[#F2F0EA]">
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full font-black text-[14px] flex items-center justify-center text-white ${
                      c.ok ? 'bg-[#17744B]' : 'bg-[#C8372D]'
                    }`}
                  >
                    {c.ok ? '✓' : '!'}
                  </span>
                  <div className="flex-1 flex flex-col min-w-0">
                    <span className="font-bold text-[16px] text-[#0A1430]">{c.libelle}</span>
                    <span className={`font-medium text-[14px] ${c.ok ? 'text-[#17744B]' : 'text-[#B4281F]'}`}>
                      {c.detail}
                    </span>
                  </div>
                  {!c.ok && equipe.est_chef && equipe.modifiable && (
                    <button
                      type="button"
                      onClick={() =>
                        c.code === 'document' ? fileInputRef.current?.click() : navigate('/espace/equipe/membres')
                      }
                      className="min-h-[38px] px-4 rounded-full border-[1.5px] border-[#0A1430] font-bold text-[14px] text-[#0A1430] flex items-center cursor-pointer hover:bg-slate-50 transition-colors shrink-0"
                    >
                      {c.code === 'document' ? 'Ajouter' : 'Corriger'}
                    </button>
                  )}
                </div>
              ))}

              <div className="flex gap-3.5 items-center py-3.5">
                <span
                  className={`w-8 h-8 shrink-0 rounded-full text-white font-black text-[14px] flex items-center justify-center ${
                    espace.inscriptions_ouvertes ? 'bg-[#17744B]' : 'bg-[#C8372D]'
                  }`}
                >
                  {espace.inscriptions_ouvertes ? '✓' : '!'}
                </span>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-[16px] text-[#0A1430]">Date limite</span>
                  <span
                    className={`font-medium text-[14px] ${espace.inscriptions_ouvertes ? 'text-[#17744B]' : 'text-[#B4281F]'}`}
                  >
                    {espace.inscriptions_ouvertes ? 'Clôture le ' : 'Clos depuis le '}
                    {dateLongue(espace.inscriptions_cloture)} à{' '}
                    {new Date(espace.inscriptions_cloture).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {equipe.documents && (
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
              />
            )}

            {depotOuvert && (
              <button
                type="button"
                disabled={upload}
                onClick={() => fileInputRef.current?.click()}
                className="w-full min-h-[54px] rounded-[18px] border-2 border-[#0A1430] bg-white text-[#0A1430] font-black text-[16px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm hover:bg-slate-50 active:scale-[0.99] disabled:opacity-60"
              >
                {upload ? 'Envoi du document…' : 'Ajouter un document (PDF, Word, PowerPoint, image · 10 Mo max.)'}
              </button>
            )}

            {equipe.etat === 'soumise' || equipe.etat === 'validee' ? (
              <div className="w-full p-4 px-5 rounded-[18px] bg-[#EBFBF2] text-[#17744B] font-bold text-[15px]">
                Équipe {LIBELLE_ETAT[equipe.etat].toLowerCase()} le{' '}
                {dateLongue(equipe.etat === 'validee' ? equipe.validee_le : equipe.soumise_le, true)}.
              </div>
            ) : equipe.est_chef ? (
              <>
                {echecs.length > 0 && (
                  <div className="p-3 px-4 rounded-[14px] bg-[#FBE6E3] text-[#B4281F] font-bold text-[14px]">
                    Corrige les critères en rouge avant de soumettre.
                  </div>
                )}
                <button
                  type="button"
                  disabled={!equipe.peut_soumettre || envoi}
                  onClick={soumettre}
                  className="w-full min-h-[58px] rounded-[18px] bg-[#0A1430] text-white font-black text-[17px] flex items-center justify-center gap-3 cursor-pointer shadow-[0_12px_26px_rgba(10,20,48,0.25)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {envoi ? 'Envoi…' : equipe.etat === 'refusee' ? 'Soumettre à nouveau →' : 'Soumettre mon équipe →'}
                </button>
              </>
            ) : (
              <div className="w-full p-4 px-5 rounded-[18px] bg-[#E9ECF5] text-[#0A1430] font-medium text-[15px]">
                Seul le chef d'équipe peut soumettre l'équipe aux organisateurs.
              </div>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
