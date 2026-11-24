import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';
import Avatar from '../../components/espace/Avatar';
import SelecteurEquipe from '../../components/espace/SelecteurEquipe';
import { action, useEspaceCharge } from '../../contexts/EspaceContext';
import { api } from '../../lib/api';
import { LIBELLE_ETAT, casse, dateLongue, dateRelative, nomCourt, pluriel } from '../../lib/format';
import type { MembreEquipe } from '../../types/espace';

/**
 * ============================================================================
 * P3 / P3t / P3r : MON ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * L'écran affiché dépend des données réelles :
 * - P3t : le candidat a une équipe (arborescence des membres, progression, accès).
 * - P3r : il a été retiré de sa dernière équipe (notification avec motif).
 * - P3  : il n'a pas d'équipe (créer une équipe / mes invitations).
 */

// Emplacements de l'arborescence (boîte 440 x 430) : chef en haut, 5 membres maximum dessous.
const POSITIONS = [
  { left: 18, top: 180 },
  { left: 310, top: 180 },
  { left: 164, top: 310 },
  { left: 18, top: 310 },
  { left: 310, top: 310 },
];
const TEINTES = [
  'from-[#E0EBFF] to-[#A9C4FF]',
  'from-[#DDF7E8] to-[#9EE2BC]',
  'from-[#FFF1E0] to-[#FFC98F]',
  'from-[#F1E6FF] to-[#CDB2FF]',
  'from-[#FFE4E0] to-[#FFB4A8]',
];

function CarteMembre({ m, index }: { m: MembreEquipe; index: number }) {
  const p = POSITIONS[index];
  return (
    <div style={{ left: p.left, top: p.top }} className="absolute z-[2]">
      <div
        className={`relative w-[112px] h-[112px] rounded-[26px] bg-gradient-to-br ${TEINTES[index]} shadow-[0_0_0_3px_rgba(255,255,255,0.55),0_14px_30px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.04]`}
      >
        <Avatar personne={m} couleur="rgba(255,255,255,0.9)" className="w-[50px] h-[50px] text-[17px] !text-[#0A1430] shadow-sm" />
        <span className="font-extrabold text-[14px] text-[#0A1430] leading-none max-w-[100px] truncate">{nomCourt(m)}</span>
        <span className="font-semibold text-[11px] font-mono text-[#0A1430]/65 tracking-[0.04em] max-w-[100px] truncate">
          {[m.niveau, m.filiere].filter(Boolean).join(' · ')}
        </span>
      </div>
    </div>
  );
}

export default function MonEquipe() {
  const navigate = useNavigate();
  const { espace, rafraichir } = useEspaceCharge();
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  // Suppression de l'équipe par le chef (seulement si elle ne remplit pas toutes les conditions)
  const [confirmSuppr, setConfirmSuppr] = useState(false);
  const [suppression, setSuppression] = useState(false);
  const [motifChoix, setMotifChoix] = useState<string | null>(null);
  const [motifAutre, setMotifAutre] = useState('');
  const motifSuppr = motifChoix === 'Autre' ? motifAutre.trim() : motifChoix ?? '';
  const motifValide = motifSuppr.length >= 3;
  const moi = espace.candidat;
  const equipe = espace.equipe;
  const invCount = espace.invitations_en_attente;

  const modalInvite = (
    <ModalInscriptionInvite
      isOpen={guestModalOpen}
      onClose={() => setGuestModalOpen(false)}
      initialNom={casse(moi.nom)}
      initialPrenom={casse(moi.prenom)}
      initialMatricule={moi.matricule}
    />
  );

  // ==========================================================================
  // ÉCRAN P3r : RETIRÉ DE L'ÉQUIPE
  // ==========================================================================
  if (!equipe && espace.retrait) {
    const r = espace.retrait;
    return (
      <div className="flex-1 w-full flex flex-col bg-[#F6F8FC] animate-fadeIn">
        <div className="relative pt-[84px] md:pt-14 px-[18px] pb-[70px] bg-[#0A1430] text-white flex flex-col gap-2.5 bg-[linear-gradient(rgba(255,255,255,0.08)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.08)_2px,transparent_2px)] bg-[size:40px_40px]">
          <span className="self-start px-3 py-1.5 rounded-full bg-white/10 font-bold text-[13px] text-[#FFB4A8]">● Sans équipe</span>
          <h1 className="m-0 font-black text-[32px] md:text-[38px] leading-[1.05] tracking-[-0.02em]">
            Tu ne fais plus partie
            <br />
            de l'équipe {r.equipe}
          </h1>
        </div>

        <div className="relative z-10 -mt-[46px] pb-16 flex flex-col gap-4 flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_14px_34px_rgba(14,30,74,0.12)] border border-[#EEF1F7]">
            <div className="flex gap-3 items-center p-3.5 px-4 border-b border-[#EEECE6]">
              <span className="w-11 h-11 shrink-0 rounded-full bg-[#E3ECFF] flex items-center justify-center font-black text-[#2F6BF0] text-[15px]">
                UPB
              </span>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="font-bold text-[15px] text-[#0A1430]">
                  GÉNIE UPB <span className="font-medium text-[#6A7189]">· notification</span>
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">à moi · {dateRelative(r.le)}</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8372D]" />
            </div>

            <div className="p-4 flex flex-col gap-3">
              <span className="font-extrabold text-[18px] leading-[1.25] text-[#0A1430]">
                Tu as été retiré·e de l'équipe {r.equipe}
              </span>
              <span className="font-medium text-[15px] leading-[1.55] text-[#3D4459]">
                Bonjour {casse(moi.prenom.split(' ')[0])},{' '}
                {r.par ? `le chef d'équipe ${casse(r.par)} t'a retiré·e` : 'tu as été retiré·e'} de l'équipe
                {r.categorie ? ` (catégorie ${r.categorie})` : ''}. Ton compte reste actif : tu peux rejoindre ou créer une
                autre équipe jusqu'au {dateLongue(espace.inscriptions_cloture)}.
              </span>
              {r.motif && (
                <div className="flex gap-2.5 p-3 rounded-[14px] bg-[#FFF6DA] font-semibold text-[14px] text-[#6B4E00]">
                  <span>Motif :</span>
                  <span className="font-medium">{r.motif}</span>
                </div>
              )}
            </div>
          </div>

          <span className="mt-1 font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">ET MAINTENANT ?</span>

          <div
            onClick={() => navigate('/espace/equipe/invitations')}
            className="flex items-center gap-3 p-4 rounded-[20px] bg-[#0A1430] text-white cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_28px_rgba(10,20,48,0.2)]"
          >
            <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-[#2F6BF0] text-white shadow-[0_10px_28px_rgba(47,107,240,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] flex items-center justify-center font-extrabold text-[18px]">
              ✉
            </span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-extrabold text-[17px] text-white">Mes invitations</span>
              <span className="font-medium text-[14px] text-[#AEB8D6]">
                {invCount > 0 ? `${pluriel(invCount, 'équipe')} t'attend${invCount > 1 ? 'ent' : ''}` : 'Aucune invitation pour le moment'}
              </span>
            </div>
            <span className="font-extrabold text-[20px] text-[#AEB8D6]">›</span>
          </div>

          <div
            onClick={() => navigate('/espace/equipe/creer')}
            className="flex items-center gap-3 p-4 rounded-[20px] bg-white text-[#0A1430] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_30px_rgba(10,20,48,0.06)]"
          >
            <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-[#F58220] text-[#0A1430] shadow-[0_10px_24px_rgba(245,130,32,0.3)] flex items-center justify-center font-extrabold text-[22px]">
              +
            </span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-extrabold text-[17px] text-[#0A1430]">Créer une nouvelle équipe</span>
              <span className="font-medium text-[14px] text-[#6A7189]">Deviens le chef de projet</span>
            </div>
            <span className="font-extrabold text-[20px] text-[#6A7189]">›</span>
          </div>

          <div
            onClick={() => setGuestModalOpen(true)}
            className="flex items-center gap-3 p-4 rounded-[20px] bg-white text-[#0A1430] border border-[#EEF1F7] cursor-pointer transition-transform duration-200 hover:-translate-y-1 shadow-[0_10px_30px_rgba(10,20,48,0.06)]"
          >
            <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white flex items-center justify-center font-extrabold text-[18px]">
              <UserPlus size={20} strokeWidth={2.5} />
            </span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-extrabold text-[17px] text-[#0A1430]">Participer comme invité</span>
              <span className="font-medium text-[14px] text-[#6A7189]">Assister aux présentations et cérémonies du concours</span>
            </div>
            <span className="font-extrabold text-[20px] text-[#6A7189]">›</span>
          </div>
        </div>

        {modalInvite}
        <div aria-hidden="true" className="h-[90px] shrink-0" />
      </div>
    );
  }

  // ==========================================================================
  // ÉCRAN P3 : SANS ÉQUIPE
  // ==========================================================================
  if (!equipe) {
    return (
      <div className="flex-1 w-full flex flex-col justify-between min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 animate-fadeIn">
        <div className="w-full flex flex-col gap-6">
          <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">Mon équipe</h1>
          <p className="m-0 font-normal text-[16px] leading-[1.5] text-[#4A5168]">
            Vous n'avez pas encore d'équipe. Créez la vôtre ou rejoignez celle qui vous a invité.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-full items-stretch">
            <div
              onClick={() => navigate('/espace/equipe/creer')}
              className="relative bg-[#0A1430] text-white rounded-[24px] p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[220px] overflow-hidden cursor-pointer shadow-[0_14px_34px_rgba(10,20,48,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(10,20,48,0.28)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]"
            >
              <span className="w-[52px] h-[52px] rounded-[16px] bg-[#F58220] text-[#0A1430] font-extrabold text-[30px] flex items-center justify-center select-none shadow-[0_6px_16px_rgba(245,130,32,0.35)]">
                +
              </span>
              <div className="flex flex-col gap-1.5 mt-4">
                <span className="font-extrabold text-[26px] leading-tight text-white">Créer une équipe</span>
                <span className="font-normal text-[15px] leading-[1.5] text-[#C9D1E8]">
                  Vous en serez le chef : vous choisissez la catégorie et invitez les membres.
                </span>
              </div>
            </div>

            <div
              onClick={() => navigate('/espace/equipe/invitations')}
              className="bg-white rounded-[24px] p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[220px] shadow-[0_10px_30px_rgba(10,20,48,0.06)] border border-[#EEF1F7] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(10,20,48,0.1)]"
            >
              <div className="flex justify-between items-center">
                <span className="w-[52px] h-[52px] rounded-[16px] bg-[#F2F0EA] font-bold text-[24px] flex items-center justify-center text-[#0A1430]">
                  ✉
                </span>
                {invCount > 0 && (
                  <span className="min-w-[34px] h-[34px] px-2.5 rounded-full bg-[#F58220] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center shadow-[0_4px_12px_rgba(245,130,32,0.3)]">
                    {invCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5 mt-4">
                <span className="font-extrabold text-[26px] leading-tight text-[#0A1430]">Mes invitations</span>
                <span className="font-normal text-[15px] leading-[1.5] text-[#4A5168]">
                  {invCount === 0
                    ? "Aucune équipe ne vous a encore invité. Donnez votre matricule à un chef d'équipe."
                    : invCount === 1
                    ? 'Une équipe vous a invité à la rejoindre.'
                    : `${invCount} équipes vous ont invité à les rejoindre.`}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full p-5 sm:p-6 rounded-[24px] bg-[#0A1430] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_14px_34px_rgba(10,20,48,0.18)]">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white flex items-center justify-center shrink-0 shadow-md">
                <UserPlus size={24} strokeWidth={2.5} />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-extrabold text-[19px] sm:text-[20px] text-white leading-tight">
                  Vous n'avez pas d'équipe pour concourir ?
                </span>
                <span className="text-[14px] text-[#A9C2FF] leading-snug">
                  Ne manquez pas l'événement : inscrivez-vous en tant qu'invité pour assister aux présentations et cérémonies officielles.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGuestModalOpen(true)}
              className="w-full md:w-auto px-5 py-3.5 rounded-[14px] bg-gradient-to-r from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-[15px] hover:opacity-95 active:scale-95 transition-all shadow-[0_6px_20px_rgba(232,98,26,0.35)] shrink-0 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
            >
              <UserPlus size={18} strokeWidth={2.5} />
              <span>S'inscrire en tant qu'invité</span>
            </button>
          </div>
        </div>

        {modalInvite}
        <div aria-hidden="true" className="h-[90px] shrink-0" />
      </div>
    );
  }

  // ==========================================================================
  // ÉCRAN P3t : AVEC ÉQUIPE
  // ==========================================================================
  const chef = equipe.membres.find((m) => m.est_chef) ?? equipe.membres[0];
  const autres = equipe.membres.filter((m) => m.id !== chef?.id).slice(0, POSITIONS.length);
  const max = equipe.concours?.max_membres ?? 6;
  const min = equipe.concours?.min_membres ?? 1;
  const n = equipe.membres.length;
  const peutInviter = equipe.est_chef && equipe.modifiable && equipe.places_restantes > 0;
  const slotLibre = peutInviter && autres.length < POSITIONS.length ? POSITIONS[autres.length] : null;
  const manquants = Math.max(0, min - n);
  const controlesOk = equipe.controles.filter((c) => c.ok).length;
  const [motNom, ...resteNom] = equipe.nom.split(' ');

  // Tracés de l'arborescence vers chaque emplacement occupé (ou libre)
  const traces = [...autres.map((_, i) => POSITIONS[i]), ...(slotLibre ? [slotLibre] : [])].map((p, i) => {
    const cx = p.left + 56;
    const pointille = i >= autres.length;
    const d =
      p.top === 180
        ? `M 220 124 L ${cx < 220 ? cx + 24 : cx - 24} 124 A 24 24 0 0 ${cx < 220 ? 0 : 1} ${cx} 148 L ${cx} 180`
        : cx === 220
        ? 'M 220 188 L 220 310'
        : `M ${cx} 292 L ${cx} 310`;
    return { d, pointille, cx, top: p.top };
  });

  return (
    <div className="flex-1 w-full min-h-screen bg-[linear-gradient(180deg,#EAF1FF_0%,#9DBBF5_22%,#2F6BF0_45%,#0A1430_72%,#050A1A_100%)] xl:bg-[radial-gradient(90%_70%_at_78%_45%,#2F6BF0_0%,#1A3E9C_45%,#0A1430_85%)] transition-colors duration-300">
      <div className="w-full flex-1 pt-[84px] xl:pt-[96px] px-[18px] xl:px-[48px] pb-5 xl:pb-[64px] flex flex-col items-center xl:grid xl:grid-cols-[minmax(0,1fr)_440px] xl:grid-rows-[auto_auto_auto_1fr] xl:gap-x-14 xl:gap-y-[18px] xl:justify-items-start xl:items-start xl:content-center">
        {/* Ligne 1 : Tag Catégorie (+ bascule si le candidat a 2 équipes) */}
        <div className="xl:col-start-1 xl:row-start-1 mb-3 xl:mb-0 self-center xl:self-start flex flex-wrap gap-2 items-center justify-center">
          <SelecteurEquipe theme="sombre" />
          <span className="px-3.5 py-1.5 rounded-[10px] bg-white text-[#2F6BF0] font-extrabold text-[13px] shadow-[0_6px_14px_rgba(10,20,48,0.1)] inline-block">
            {equipe.concours?.categorie} · {equipe.concours?.taille}
          </span>
        </div>

        {/* Ligne 2 : Nom de l'équipe */}
        <h1 className="xl:col-start-1 xl:row-start-2 m-0 text-center xl:text-left font-black text-[clamp(40px,5.4vw,72px)] leading-none tracking-[-0.03em] text-[#0A1430] xl:text-white mb-4 xl:mb-0 break-words max-w-full">
          {resteNom.length ? (
            <>
              {motNom} <span className="text-[#2F6BF0]">{resteNom.join(' ')}</span>
            </>
          ) : (
            <span className="text-[#2F6BF0]">{motNom}</span>
          )}
        </h1>

        {/* Ligne 3 : action principale */}
        <div className="xl:col-start-1 xl:row-start-3 mb-6 xl:mb-0 self-center xl:self-start">
          <button
            type="button"
            onClick={() => navigate(peutInviter ? '/espace/equipe/membres' : '/espace/statut')}
            className="min-h-[54px] pl-5 pr-2 rounded-[16px] bg-[#0A1430] xl:bg-gradient-to-b xl:from-[#FF9A3D] xl:to-[#E8621A] text-white font-extrabold text-[17px] flex items-center gap-3.5 cursor-pointer shadow-[0_12px_26px_rgba(10,20,48,0.3)] xl:shadow-[0_12px_26px_rgba(232,98,26,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {peutInviter ? 'Inviter un membre' : 'Suivre mon dossier'}{' '}
            <span className="w-[38px] h-[38px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-black text-[20px]">
              {peutInviter ? '+' : '→'}
            </span>
          </button>
        </div>

        {/* ARBORESCENCE DE L'ÉQUIPE */}
        <div className="xl:col-start-2 xl:row-start-1 xl:row-span-4 justify-self-center relative w-[440px] max-w-full h-[430px] my-3 xl:my-0 mt-1.5 overflow-x-auto overflow-y-hidden">
          <div className="relative w-[440px] h-[430px] mx-auto">
            <svg viewBox="0 0 440 430" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
              <line x1="220" y1="34" x2="220" y2="60" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2.5" strokeLinecap="round" />
              {traces.map((t, i) => (
                <path
                  key={i}
                  d={t.d}
                  stroke={t.pointille ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.75)'}
                  strokeWidth={t.pointille ? 2 : 2.5}
                  strokeDasharray={t.pointille ? '6 6' : undefined}
                  strokeLinecap="round"
                />
              ))}
              {traces
                .filter((t) => !t.pointille)
                .map((t, i) => (
                  <circle key={i} cx={t.cx} cy={t.top} r="3.5" fill="white" />
                ))}
            </svg>

            {/* Badge étoile au-dessus du chef */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
              <span className="min-w-[44px] h-[44px] px-3 rounded-full bg-[#0A1430] text-white grid place-items-center font-extrabold text-[16px] shadow-[0_0_0_2px_rgba(120,160,255,0.5),0_0_24px_rgba(80,130,255,0.6)]">
                ★
              </span>
            </div>

            {/* Chef d'équipe */}
            {chef && (
              <div className="absolute left-1/2 top-[60px] -translate-x-1/2 z-[2]">
                <div className="relative w-[128px] h-[128px] rounded-[26px] bg-gradient-to-br from-[#EAF1FF] to-[#A9C2FF] shadow-[0_0_0_3px_rgba(255,255,255,0.55),0_14px_30px_rgba(10,20,48,0.35)] flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.04]">
                  <Avatar personne={chef} couleur="rgba(255,255,255,0.9)" className="w-[58px] h-[58px] text-[20px] !text-[#0A1430] shadow-sm" />
                  <span className="font-extrabold text-[14px] text-[#0A1430] leading-none max-w-[116px] truncate">{nomCourt(chef)}</span>
                  <span className="font-semibold text-[11px] font-mono text-[#0A1430]/65 tracking-[0.04em]">
                    {chef.genre === 'F' ? 'CHEFFE' : 'CHEF'}
                  </span>
                </div>
              </div>
            )}

            {autres.map((m, i) => (
              <CarteMembre key={m.id} m={m} index={i} />
            ))}

            {slotLibre && (
              <div
                onClick={() => navigate('/espace/equipe/membres')}
                style={{ left: slotLibre.left, top: slotLibre.top }}
                className="absolute z-[2] w-[112px] h-[112px] rounded-[26px] border-[2.5px] border-dashed border-white/70 bg-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.04] active:scale-[0.98]"
              >
                <span className="font-extrabold text-[30px] leading-none">+</span>
                <span className="font-bold text-[12px] leading-tight text-center px-1">
                  {manquants > 0 ? `${pluriel(manquants, 'place')} requise${manquants > 1 ? 's' : ''}` : pluriel(equipe.places_restantes, 'place') + ' libre' + (equipe.places_restantes > 1 ? 's' : '')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* STATUT, PROGRESSION ET ACCÈS */}
        <div className="xl:col-start-1 xl:row-start-4 w-full max-w-[440px] xl:max-w-[480px] flex flex-col gap-2.5 mt-6 xl:mt-[18px]">
          <div className="flex flex-wrap justify-between items-center gap-2 px-1 pt-1">
            <span className="font-semibold text-[12px] font-mono tracking-[0.08em] text-[#AEB8D6] whitespace-nowrap">
              STATUT · {LIBELLE_ETAT[equipe.etat].toUpperCase()}
            </span>
            <span className="font-extrabold text-[18px] text-white">
              {n} / {max} <span className="font-medium text-[13px] text-[#AEB8D6]">membres</span>
            </span>
          </div>

          <div className="h-2 rounded-full bg-white/12 overflow-hidden">
            <div
              style={{ width: `${Math.min(100, Math.round((n / max) * 100))}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#5B9BFF] to-[#2F6BF0]"
            />
          </div>

          {[
            {
              ico: '◎',
              titre: 'Membres',
              sous: equipe.est_chef && equipe.modifiable ? 'Gérer et inviter' : 'Voir les membres',
              lien: '/espace/equipe/membres',
            },
            { ico: '✎', titre: 'Règlement et chartes', sous: 'Règles de la catégorie', lien: '/espace/equipe/charte' },
            {
              ico: '➤',
              titre: 'Soumettre l’équipe',
              sous: `Contrôles avant envoi · ${controlesOk} / ${equipe.controles.length} OK`,
              lien: '/espace/equipe/soumettre',
            },
            { ico: '◔', titre: 'Statut d’inscription', sous: 'Suivre la validation', lien: '/espace/statut' },
            // Double participation : seule la combinaison Technologie + Innovation est permise
            ...espace.categories_possibles.map((cle) => ({
              ico: '+',
              titre: `Participer aussi en ${cle === 'technologie' ? 'Technologie' : 'Innovation'}`,
              sous: invCount > 0 ? `Créer une équipe ou voir mes ${invCount} invitation(s)` : 'Créer une équipe ou attendre une invitation',
              lien: invCount > 0 ? '/espace/equipe/invitations' : '/espace/equipe/creer',
            })),
          ].map((l) => (
            <div
              key={l.titre}
              onClick={() => navigate(l.lien)}
              className="flex items-center gap-3 p-3.5 rounded-[20px] bg-white/[0.08] border border-white/[0.14] backdrop-blur-[10px] cursor-pointer transition-all duration-250 hover:bg-white/[0.16] hover:translate-x-1"
            >
              <span className="w-[42px] h-[42px] shrink-0 rounded-[14px] bg-white/12 text-[#A9C2FF] grid place-items-center font-extrabold text-[17px]">
                {l.ico}
              </span>
              <span className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[16px] text-white">{l.titre}</span>
                <span className="font-medium text-[13px] text-[#AEB8D6]">{l.sous}</span>
              </span>
              <span className="font-extrabold text-[18px] text-[#A9C2FF]">›</span>
            </div>
          ))}
        </div>

        {/* Suppression de l'équipe : réservée au chef, impossible une fois toutes les conditions remplies */}
        {equipe.est_chef && equipe.modifiable && (
          <div className="xl:col-start-2 w-full max-w-[440px] flex flex-col items-center gap-1.5 pt-4">
            <button
              type="button"
              disabled={!equipe.peut_supprimer}
              onClick={() => {
                setMotifChoix(null);
                setMotifAutre('');
                setConfirmSuppr(true);
              }}
              className="min-h-[44px] px-5 rounded-full border-2 border-[#FF8A80]/60 text-[#FFB4AD] font-extrabold text-[14px] cursor-pointer transition-colors hover:bg-[#C8372D]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              Supprimer l’équipe
            </button>
            {!equipe.peut_supprimer && (
              <span className="text-center font-medium text-[13px] leading-snug text-[#AEB8D6] px-4">
                Ton équipe remplit toutes les conditions : elle ne peut plus être supprimée.
              </span>
            )}
          </div>
        )}

        <div aria-hidden="true" className="h-[100px] shrink-0 w-full" />
      </div>

      {/* CONFIRMATION DE SUPPRESSION DE L'ÉQUIPE */}
      {confirmSuppr && (
        <div
          onClick={() => !suppression && setConfirmSuppr(false)}
          className="fixed inset-0 z-[520] bg-[#0A1430]/55 backdrop-blur-[6px] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] bg-white rounded-[28px] p-6 flex flex-col gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-scaleIn border border-[#EEF1F7]"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-14 h-14 shrink-0 rounded-full bg-[#FFE4E0] text-[#C8372D] grid place-items-center font-extrabold text-[22px]">
                !
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-extrabold text-[21px] leading-[1.15] text-[#0A1430] break-words">
                  Supprimer {equipe.nom} ?
                </span>
                <span className="font-medium text-[14px] text-[#6A7189]">Cette action est définitive.</span>
              </div>
            </div>

            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">MOTIF (OBLIGATOIRE)</span>
            <div className="flex flex-wrap gap-2">
              {['Pas assez de membres', 'Désaccord dans l’équipe', 'Changement de catégorie', 'Autre'].map((r) => {
                const choisi = motifChoix === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMotifChoix(choisi ? null : r)}
                    className={`min-h-[40px] px-4 rounded-full border-2 font-bold text-[14px] cursor-pointer transition-colors ${
                      choisi
                        ? 'border-[#0A1430] bg-[#0A1430] text-white'
                        : 'border-[#E3E8F0] bg-white text-[#0A1430] hover:border-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
            {motifChoix === 'Autre' && (
              <textarea
                value={motifAutre}
                onChange={(e) => setMotifAutre(e.target.value)}
                maxLength={500}
                rows={2}
                autoFocus
                placeholder="Précise le motif de la suppression"
                className="w-full p-3 rounded-[14px] border-2 border-[#E3E8F0] bg-[#F6F8FC] font-semibold text-[14px] text-[#0A1430] placeholder-[#9AA3B5] outline-none focus:border-[#0A1430] focus:bg-white transition-colors resize-none"
              />
            )}

            <div className="flex gap-2.5 p-3.5 rounded-[16px] bg-[#F3F6FD] font-medium text-[14px] leading-[1.45] text-[#3D4459]">
              <span className="font-extrabold text-[#2F63D0]">i</span>
              <span>
                {equipe.membres.length === 2
                  ? 'L’autre membre sera prévenu par e-mail. '
                  : equipe.membres.length > 2
                  ? `Les ${equipe.membres.length - 1} autres membres seront prévenus par e-mail. `
                  : ''}
                Tout le monde pourra créer une nouvelle équipe ou en rejoindre une autre. Les invitations et
                documents de l’équipe seront supprimés.
              </span>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                disabled={suppression}
                onClick={() => setConfirmSuppr(false)}
                className="flex-1 min-h-[52px] rounded-[16px] border-2 border-[#E3E8F0] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={suppression || !motifValide}
                onClick={async () => {
                  if (!motifValide) return;
                  setSuppression(true);
                  const r = await action(
                    () => api.supprimerEquipe(equipe.id, motifSuppr),
                    `L’équipe ${equipe.nom} a été supprimée`
                  );
                  setSuppression(false);
                  if (r) {
                    setConfirmSuppr(false);
                    await rafraichir();
                    navigate('/espace/equipe', { replace: true });
                  }
                }}
                className="flex-[1.3] min-h-[52px] rounded-[16px] bg-[#C8372D] text-white font-extrabold text-[16px] flex items-center justify-center cursor-pointer shadow-[0_8px_20px_rgba(200,55,45,0.3)] hover:bg-[#B4281F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {suppression ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
