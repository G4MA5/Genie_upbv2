import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/espace/Avatar';
import { action, useEspaceCharge } from '../../contexts/EspaceContext';
import { api, ApiError } from '../../lib/api';
import { cursus, dateRelative, nomComplet, pluriel } from '../../lib/format';
import type { Etudiant, MembreEquipe } from '../../types/espace';

/**
 * ============================================================================
 * P3c : GESTION DES MEMBRES DE L'ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * - Jauge d'effectif réelle (min / max de la catégorie)
 * - Membres actifs ; le chef peut retirer un membre (motif facultatif)
 * - Invitations envoyées en attente ; le chef peut les annuler
 * - Invitation par matricule UNIQUEMENT (l'étudiant doit avoir créé son compte)
 */

type Trouve = Etudiant & { id: number; prenom: string; disponible: boolean; raison: string | null };

export default function MembresEquipe() {
  const navigate = useNavigate();
  const { espace, majEquipe, rafraichir } = useEspaceCharge();
  const equipe = espace.equipe;

  // Modal de retrait
  const [rmTarget, setRmTarget] = useState<MembreEquipe | null>(null);
  const [rmReason, setRmReason] = useState<string | null>('Plus de nouvelles');
  // Feuille d'invitation
  const [invOpen, setInvOpen] = useState(false);
  const [matricule, setMatricule] = useState('');
  const [recherche, setRecherche] = useState<'idle' | 'loading' | 'done'>('idle');
  const [trouve, setTrouve] = useState<Trouve | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!equipe) navigate('/espace/equipe', { replace: true });
  }, [equipe, navigate]);
  if (!equipe) return null;

  const gere = equipe.est_chef && equipe.modifiable;
  const min = equipe.concours?.min_membres ?? 1;
  const max = equipe.concours?.max_membres ?? 6;
  const n = equipe.membres.length;
  const pct = Math.min(100, Math.round((n / max) * 100));
  const manque = Math.max(0, min - n);
  const placesLibres = max - n - equipe.invitations_envoyees.length;

  const fermerInvitation = () => {
    setInvOpen(false);
    setMatricule('');
    setTrouve(null);
    setErreur(null);
    setRecherche('idle');
  };

  const chercher = async () => {
    const m = matricule.replace(/\s+/g, '').toUpperCase();
    if (!/^[A-Z0-9]{6,40}$/.test(m)) {
      setErreur('Saisis un matricule valide (lettres et chiffres, sans espace).');
      return;
    }
    setRecherche('loading');
    setErreur(null);
    setTrouve(null);
    try {
      setTrouve(await api.chercherEtudiant(m, equipe.id));
    } catch (err) {
      setErreur(err instanceof ApiError ? err.message : 'Recherche impossible.');
    } finally {
      setRecherche('done');
    }
  };

  const handleSendInvite = async () => {
    if (!trouve?.disponible || envoi) return;
    setEnvoi(true);
    try {
      majEquipe(await api.inviter(equipe.id, trouve.matricule));
      fermerInvitation();
      toastOk(`Invitation envoyée à ${nomComplet(trouve)}`);
    } catch (err) {
      setErreur(err instanceof ApiError ? err.message : "L'invitation n'a pas pu être envoyée.");
    } finally {
      setEnvoi(false);
    }
  };

  const handleConfirmRemove = async () => {
    if (!rmTarget) return;
    const cible = rmTarget;
    const r = await action(() => api.retirerMembre(equipe.id, cible.id, rmReason), `${nomComplet(cible)} a été retiré·e de l'équipe`);
    if (r) {
      majEquipe(r);
      setRmTarget(null);
    }
  };

  const annuler = async (id: number) => {
    const r = await action(() => api.annulerInvitation(equipe.id, id), 'Invitation annulée');
    if (r) majEquipe(r);
  };

  // Toast local du prototype
  function toastOk(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
    rafraichir();
  }

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn relative">
      {/* MODAL DE RETRAIT DE MEMBRE */}
      {rmTarget && (
        <div
          onClick={() => setRmTarget(null)}
          className="fixed inset-0 z-[520] bg-[#0A1430]/55 backdrop-blur-[6px] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] bg-white rounded-[28px] p-6 flex flex-col gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-scaleIn border border-[#EEF1F7]"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-14 h-14 rounded-full bg-[#FFE4E0] text-[#C8372D] grid place-items-center font-extrabold text-[18px]">
                {rmTarget.initiales}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-extrabold text-[21px] leading-[1.15] text-[#0A1430]">Retirer {nomComplet(rmTarget)} ?</span>
                <span className="font-medium text-[14px] text-[#6A7189] truncate">de l'équipe {equipe.nom}</span>
              </div>
            </div>

            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">MOTIF (FACULTATIF)</span>
            <div className="flex flex-wrap gap-2">
              {['Plus de nouvelles', 'Changement d’équipe', 'Autre'].map((r) => {
                const isPicked = rmReason === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRmReason(isPicked ? null : r)}
                    className={`min-h-[40px] px-4 rounded-full border-2 font-bold text-[14px] cursor-pointer transition-colors ${
                      isPicked
                        ? 'border-[#0A1430] bg-[#0A1430] text-white'
                        : 'border-[#E3E8F0] bg-white text-[#0A1430] hover:border-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2.5 p-3.5 rounded-[16px] bg-[#F3F6FD] font-medium text-[14px] leading-[1.45] text-[#3D4459]">
              <span className="font-extrabold text-[#2F63D0]">i</span>
              <span>
                {nomComplet(rmTarget)} recevra une notification et pourra rejoindre une autre équipe. L'équipe repassera à{' '}
                {pluriel(n - 1, 'membre')}
                {min > 1 ? ` sur ${min} requis` : ''}.
              </span>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setRmTarget(null)}
                className="flex-1 min-h-[52px] rounded-[16px] border-2 border-[#E3E8F0] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmRemove}
                className="flex-[1.3] min-h-[52px] rounded-[16px] bg-[#C8372D] text-white font-extrabold text-[16px] flex items-center justify-center cursor-pointer shadow-[0_8px_20px_rgba(200,55,45,0.3)] hover:bg-[#B4281F] transition-colors"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FEUILLE D'INVITATION PAR MATRICULE */}
      {invOpen && (
        <div onClick={fermerInvitation} className="fixed inset-0 z-[500] bg-[#0A1430]/55 backdrop-blur-[6px] flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[580px] max-h-[86vh] overflow-y-auto bg-[#F6F8FC] rounded-[32px] p-6 pb-8 flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-fadeIn"
          >
            <div className="flex justify-between items-center">
              <h3 className="m-0 font-black text-[26px] text-[#0A1430]">Inviter un membre</h3>
              <button
                type="button"
                onClick={fermerInvitation}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#EEF1F7] grid place-items-center font-bold text-[18px] text-[#0A1430] cursor-pointer hover:bg-slate-50"
              >
                ×
              </button>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[18px] text-[#6A7189]">⌕</span>
                <input
                  type="text"
                  autoFocus
                  value={matricule}
                  onChange={(e) => {
                    setMatricule(e.target.value);
                    setErreur(null);
                    setTrouve(null);
                    setRecherche('idle');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && chercher()}
                  placeholder="Matricule UPB de l'étudiant"
                  autoComplete="off"
                  className="w-full min-h-[56px] rounded-[18px] border-2 border-transparent bg-white pl-11 pr-4 font-semibold text-[17px] uppercase tracking-[0.06em] text-[#0A1430] outline-none shadow-[0_6px_16px_rgba(14,30,74,0.06)] focus:border-[#2F63D0] placeholder:normal-case placeholder:tracking-normal"
                />
              </div>
              <button
                type="button"
                onClick={chercher}
                disabled={recherche === 'loading'}
                className="min-h-[56px] px-5 rounded-[18px] bg-[#0E1E4A] text-white font-extrabold text-[15px] cursor-pointer disabled:opacity-60"
              >
                {recherche === 'loading' ? '…' : 'Chercher'}
              </button>
            </div>

            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
              L'ÉTUDIANT DOIT AVOIR CRÉÉ SON COMPTE GÉNIE UPB
            </span>

            <div className="min-h-[110px] flex flex-col gap-2">
              {erreur && (
                <div className="py-4 px-4 rounded-[18px] bg-[#FFF1EF] text-[#B4281F] font-semibold text-[15px] leading-snug">{erreur}</div>
              )}
              {trouve && (
                <div
                  className={`flex gap-3.5 items-center p-3 px-4 rounded-[18px] bg-white border-2 ${
                    trouve.disponible ? 'border-[#2F63D0] shadow-sm' : 'border-transparent opacity-80'
                  }`}
                >
                  <Avatar personne={trouve} className="w-11 h-11 text-[15px]" />
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="font-bold text-[16px] text-[#0A1430] truncate">{nomComplet(trouve)}</span>
                    <span className="font-medium text-[13px] text-[#6A7189] truncate">
                      {[cursus(trouve), trouve.matricule].filter(Boolean).join(' · ')}
                    </span>
                    {trouve.raison && <span className="font-bold text-[13px] text-[#B4281F]">{trouve.raison}</span>}
                  </div>
                  {trouve.disponible && (
                    <span className="w-7 h-7 rounded-full border-2 border-[#2F63D0] bg-[#2F63D0] text-white grid place-items-center font-extrabold text-[12px]">
                      ✓
                    </span>
                  )}
                </div>
              )}
              {!erreur && !trouve && (
                <div className="py-6 px-4 text-center font-medium text-[15px] text-[#6A7189]">
                  Saisis le matricule de l'étudiant puis appuie sur « Chercher ».
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={!trouve?.disponible || envoi}
              onClick={handleSendInvite}
              className={`min-h-[58px] rounded-[20px] font-extrabold text-[17px] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
                trouve?.disponible && !envoi
                  ? 'bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] shadow-[0_10px_22px_rgba(232,98,26,0.3)] hover:scale-[1.01] cursor-pointer'
                  : 'bg-[#E3E8F0] text-[#8E9BBF] cursor-not-allowed'
              }`}
            >
              {envoi ? 'Envoi…' : "Envoyer l'invitation"}
            </button>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed left-1/2 bottom-[100px] -translate-x-1/2 z-[600] px-5 py-3.5 rounded-full bg-[#0A1430] text-white font-bold text-[15px] shadow-[0_14px_30px_rgba(0,0,0,0.3)] whitespace-nowrap animate-badgeIn">
          ✓ {toastMsg}
        </div>
      )}

      {/* CONTENU */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        <div className="flex justify-between items-center w-full">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0E1E4A] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            ←
          </button>
          {gere && placesLibres > 0 && (
            <button
              type="button"
              onClick={() => setInvOpen(true)}
              className="min-h-[46px] px-5 rounded-full bg-[#0E1E4A] text-white font-bold text-[16px] flex items-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform"
            >
              + Inviter
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-bold text-[14px] text-[#F58220] tracking-wider uppercase">
            {equipe.nom} · {equipe.concours?.categorie}
          </span>
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-none text-[#0E1E4A] tracking-[-0.02em]">Membres</h1>
        </div>

        {/* Jauge d'effectif */}
        <div className="w-full bg-white rounded-[22px] p-5 flex gap-5 items-center shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
          <div
            style={{ background: `conic-gradient(#E8B33D 0 ${pct}%, #EEECE6 ${pct}%)` }}
            className="relative w-[76px] h-[76px] rounded-full flex items-center justify-center shrink-0"
          >
            <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center font-black text-[22px] text-[#0E1E4A]">
              {n}/{max}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-extrabold text-[17px] text-[#0E1E4A]">
              {manque > 0 ? `Encore ${pluriel(manque, 'membre')}` : n >= max ? 'Effectif complet' : 'Effectif suffisant'}
            </span>
            <span className="font-medium text-[15px] leading-[1.4] text-[#6A7189]">
              Il faut {equipe.concours?.taille ?? `${min} à ${max} membres`} pour soumettre l'équipe.
            </span>
          </div>
        </div>

        {!equipe.modifiable && (
          <div className="w-full flex gap-3 p-4 px-5 rounded-[18px] bg-[#E9ECF5] text-[#0A1430] font-medium text-[15px] leading-[1.5]">
            <span className="font-black text-[16px] text-[#2F6BF0]">i</span>
            <span>L'équipe a été soumise : sa composition ne peut plus être modifiée.</span>
          </div>
        )}

        {/* Membres actifs */}
        <div className="w-full flex flex-col gap-3">
          <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
            MEMBRES ACTIFS ({n})
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {equipe.membres.map((mb) => (
              <div
                key={mb.id}
                className="bg-white rounded-[20px] p-4 flex gap-3.5 items-center shadow-sm border border-[#EEF1F7] hover:shadow-[0_8px_20px_rgba(10,20,48,0.06)] transition-shadow"
              >
                <Avatar personne={mb} className="w-12 h-12 text-[16px] shadow-sm" />
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="font-bold text-[16px] text-[#121628] truncate">
                    {nomComplet(mb)}
                    {mb.id === espace.candidat.id ? ' (moi)' : ''}
                  </span>
                  <span className="font-medium text-[14px] text-[#6A7189] truncate">
                    {[cursus(mb), mb.matricule].filter(Boolean).join(' · ')}
                  </span>
                </div>
                {mb.est_chef ? (
                  <span className="px-3 py-1 rounded-full bg-[#FBEFD2] text-[#8A5A00] font-black text-[13px] shrink-0">
                    {mb.genre === 'F' ? 'Cheffe' : 'Chef'}
                  </span>
                ) : (
                  gere && (
                    <button
                      type="button"
                      onClick={() => setRmTarget(mb)}
                      className="min-h-[40px] px-3.5 rounded-[12px] border-[1.5px] border-[#F0C9C4] text-[#B4281F] font-bold text-[14px] flex items-center justify-center cursor-pointer hover:bg-red-50 active:scale-95 transition-all"
                    >
                      Retirer
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Invitations envoyées */}
        {equipe.est_chef && equipe.invitations_envoyees.length > 0 && (
          <div className="w-full flex flex-col gap-3 mt-2">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
              INVITATIONS ENVOYÉES ({equipe.invitations_envoyees.length})
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {equipe.invitations_envoyees.map((pv) => (
                <div
                  key={pv.id}
                  className="bg-white border-[1.5px] border-dashed border-[#C9D3EA] rounded-[20px] p-4 flex gap-3.5 items-center shadow-sm"
                >
                  <span className="w-11 h-11 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F63D0] grid place-items-center font-black text-[15px]">
                    {pv.invite.initiales}
                  </span>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="font-bold text-[16px] text-[#0A1430] truncate">{nomComplet(pv.invite)}</span>
                    <span className="font-medium text-[13px] text-[#6A7189] truncate">
                      {[cursus(pv.invite), `Invité ${dateRelative(pv.cree_le)}`].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="px-3 py-1 rounded-full bg-[#FFF3C2] text-[#8A5A00] font-black text-[13px]">En attente</span>
                    {gere && (
                      <button
                        type="button"
                        onClick={() => annuler(pv.id)}
                        className="font-bold text-[13px] text-[#B4281F] underline cursor-pointer"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
