import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import actionHeroImg from '../../assets/images/9cc6a783-3e8c-4fcf-b2d5-26a11fe15610.webp';
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';
import Avatar from '../../components/espace/Avatar';
import SelecteurEquipe from '../../components/espace/SelecteurEquipe';
import { useEspaceCharge } from '../../contexts/EspaceContext';
import {
  LIBELLE_ETAT,
  PASTILLE_ETAT,
  casse,
  dateCourte,
  dateLongue,
  joursRestants,
  nomComplet,
  pluriel,
} from '../../lib/format';

/**
 * ============================================================================
 * [P1] MON ESPACE (DASHBOARD PARTICIPANT) — PROTOTYPE V4
 * ============================================================================
 * Mise en page du prototype ; toutes les valeurs viennent du backend :
 * étapes de l'inscription, prochaine action, équipe, invitations, dates du concours.
 */

interface Action {
  surtitre: string;
  titre: string;
  lien: string;
  bouton: string;
  taches: { label: string; lien: string }[];
}

export default function DashboardCandidat() {
  const navigate = useNavigate();
  const { espace, referentiel } = useEspaceCharge();
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const moi = espace.candidat;
  const equipe = espace.equipe;
  const invCount = espace.invitations_en_attente;

  // Compte à rebours vers le début du concours (date_debut des concours)
  const debut = referentiel?.evenement.date_debut ?? null;
  const fin = referentiel?.evenement.date_fin ?? null;
  const calcul = () => {
    const diff = debut ? Math.max(0, Math.floor((new Date(debut).getTime() - Date.now()) / 1000)) : 0;
    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
  };
  const [timeLeft, setTimeLeft] = useState(calcul);
  useEffect(() => {
    setTimeLeft(calcul());
    const timer = setInterval(() => setTimeLeft(calcul()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debut]);
  const pad = (n: number) => String(n).padStart(2, '0');

  // Les 5 étapes de l'inscription
  const etat = equipe?.etat;
  const faits = [
    true,
    true,
    !!equipe,
    etat === 'soumise' || etat === 'validee',
    etat === 'validee',
  ];
  const courant = faits.findIndex((f) => !f);
  const steps = ['Compte', 'Profil', 'Équipe', 'Soumission', 'Validation'].map((label, i) => ({
    label,
    done: faits[i],
    current: i === courant,
    icon: faits[i] ? '✓' : String(i + 1),
  }));
  const pct = faits.filter(Boolean).length * 20;
  const detailsEtapes = [
    `Créé le ${dateCourte(moi.inscrit_le)}`,
    moi.photo_url ? 'Complété' : 'Ajoutez votre photo',
    equipe ? pluriel(equipe.membres.length, 'membre') : 'À créer ou rejoindre',
    etat === 'soumise' || etat === 'validee' ? `Envoyée le ${dateCourte(equipe?.soumise_le)}` : equipe ? 'En cours' : 'À venir',
    etat === 'validee' ? `Validée le ${dateCourte(equipe?.validee_le)}` : etat === 'refusee' ? 'Dossier à corriger' : 'Par les organisateurs',
  ];

  // Prochaine action selon l'état réel de l'inscription
  const echecs = equipe?.controles.filter((c) => !c.ok) ?? [];
  const tachesChef = echecs.map((c) => ({
    label: `${c.libelle} : ${c.detail}`,
    lien: c.code === 'document' ? '/espace/equipe/soumettre' : '/espace/equipe/membres',
  }));
  let action: Action;
  if (!equipe) {
    action = {
      surtitre: 'Prochaine action · étape 3',
      titre: 'Formez votre équipe',
      lien: '/espace/equipe',
      bouton: 'Créer ou rejoindre',
      taches: [
        ...(invCount > 0
          ? [{ label: `Répondre à ${pluriel(invCount, 'invitation')}`, lien: '/espace/equipe/invitations' }]
          : []),
        { label: 'Créer une équipe et devenir chef', lien: '/espace/equipe/creer' },
      ],
    };
  } else if (etat === 'validee') {
    action = {
      surtitre: 'Inscription terminée',
      titre: 'Équipe validée !',
      lien: '/espace/profil',
      bouton: 'Voir mon badge',
      taches: [{ label: 'Votre badge QR vous a été envoyé par e-mail', lien: '/espace/profil' }],
    };
  } else if (etat === 'soumise') {
    action = {
      surtitre: 'Étape 5 · en attente',
      titre: 'Dossier en cours de validation',
      lien: '/espace/statut',
      bouton: 'Suivre le statut',
      taches: [],
    };
  } else if (equipe.est_chef) {
    action = {
      surtitre: etat === 'refusee' ? 'Dossier à corriger' : 'Prochaine action · étape 4',
      titre: etat === 'refusee' ? 'Corrigez et soumettez à nouveau' : 'Soumettez votre équipe',
      lien: '/espace/equipe/soumettre',
      bouton: 'Continuer la soumission',
      taches: tachesChef,
    };
  } else {
    action = {
      surtitre: 'Étape 4 · chef d’équipe',
      titre: 'Votre chef prépare la soumission',
      lien: '/espace/equipe',
      bouton: 'Voir mon équipe',
      taches: [],
    };
  }

  const pillLabel = equipe ? `Équipe ${LIBELLE_ETAT[equipe.etat].toLowerCase()}` : 'Sans équipe';
  const pillCouleur = equipe ? PASTILLE_ETAT[equipe.etat] : '#AEB8D6';
  const clotureJours = joursRestants(espace.inscriptions_cloture);
  const periode =
    debut && fin && debut !== fin
      ? `${new Date(debut).getDate()} – ${dateLongue(fin, true)}`
      : dateLongue(debut, true);
  const peutInviter = !!equipe && equipe.est_chef && equipe.modifiable && equipe.places_restantes > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 font-['Nunito',sans-serif]">
      {/* BANNIÈRE SUPÉRIEURE BLEUE MATRICIELLE */}
      <div
        data-gridanim="1"
        className="bg-[#2F6BF0] bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:40px_40px] animate-gridanim text-white pt-[84px] pb-[30px] px-5 md:px-8 flex flex-col gap-4"
      >
        <div className="flex justify-between items-end gap-3">
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#A9C2FF]">Mon espace</span>
            <span className="font-black text-[30px] md:text-[34px] leading-none tracking-[-0.02em] break-words">
              Bonjour, {casse((moi.prenom || '').split(' ')[0])}
            </span>
          </div>

          {/* Bouton invitations ✉ avec badge jaune */}
          <span
            onClick={() => navigate('/espace/equipe/invitations')}
            title="Invitations"
            className="relative shrink-0 w-12 h-12 rounded-full bg-white text-[#0A1430] grid place-items-center font-extrabold text-[20px] cursor-pointer shadow-[0_8px_18px_rgba(10,20,48,0.2)] hover:scale-105 transition-transform z-10 select-none"
          >
            ✉
            {invCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[#FFE14A] text-[#0A1430] border-2 border-white grid place-items-center font-extrabold text-[11px] leading-none">
                {invCount}
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="self-start flex gap-2 items-center px-3 py-1.5 rounded-full bg-white/10 font-semibold text-[15px]">
            <span style={{ backgroundColor: pillCouleur }} className="w-2 h-2 rounded-full" />
            {pillLabel}
          </span>
          <SelecteurEquipe theme="sombre" />
        </div>
      </div>

      {/* VERSION MOBILE (< 768px) */}
      <div className="md:hidden flex-1 min-h-0 px-4 pt-[22px] pb-[120px] flex flex-col gap-3 overflow-y-auto">
        <span className="shrink-0 font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#6A7189] px-1">
          À faire maintenant
        </span>

        <div
          onClick={() => navigate(action.lien)}
          className="relative shrink-0 min-h-[280px] rounded-[28px] overflow-hidden flex flex-col justify-end cursor-pointer bg-[#0A1430] shadow-[0_18px_40px_rgba(10,20,48,0.28)] hover:-translate-y-1 transition-transform duration-350"
        >
          <img
            src={actionHeroImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1430]/55 to-[#0A1430]/95" />

          <span className="absolute top-4 left-4 py-1.5 px-3 bg-white text-[#1D4FD8] rounded-full font-extrabold text-[15px] shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
            Prochaine action
          </span>

          <div className="relative p-[18px] flex flex-col gap-2.5">
            <span className="font-extrabold text-[30px] leading-[1.02] text-white tracking-[-0.02em]">
              {action.titre}
            </span>

            {action.taches.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {action.taches.slice(0, 2).map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center min-h-[30px] px-3 rounded-[10px] bg-white/15 backdrop-blur-[8px] text-white font-bold text-[13px] leading-tight"
                  >
                    ◎ {t.label}
                  </span>
                ))}
              </div>
            )}

            <span className="w-full min-h-[54px] mt-1 px-5 pr-2 rounded-[16px] bg-[#2F6BF0] text-white shadow-[0_10px_28px_rgba(47,107,240,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] font-extrabold text-[17px] flex items-center justify-between hover:bg-white hover:text-[#2F6BF0] transition-colors duration-300">
              {action.bouton}
              <span className="w-[38px] h-[38px] rounded-full bg-[#0A1430] text-[#A9C2FF] grid place-items-center">→</span>
            </span>
          </div>
        </div>

        <span className="mt-3.5 shrink-0 font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#6A7189] px-1">
          Mon inscription
        </span>

        <div className="shrink-0 bg-white rounded-[26px] p-[18px] pb-4 shadow-[0_14px_34px_rgba(14,30,74,0.08)] flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-semibold text-[14px] text-[#6A7189]">
                {courant === -1 ? 'Inscription terminée' : `Étape ${courant + 1} sur 5`}
              </span>
              <span className="font-extrabold text-[20px] text-[#0A1430] leading-tight">
                {courant === -1 ? 'Validation' : steps[courant].label}
              </span>
            </div>
            <span className="font-extrabold text-[30px] leading-none text-[#2F6BF0] shrink-0">
              {pct}
              <span className="text-[16px]">%</span>
            </span>
          </div>

          <div className="relative h-3.5 rounded-full bg-[#EEF2FB] overflow-hidden">
            <div
              style={{ width: `${pct}%` }}
              className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#2F6BF0] to-[#5B8BEA] shadow-[inset_0_0_0_2px_#fff]"
            />
            <div
              style={{ width: `${pct}%` }}
              className="absolute left-0 top-0 bottom-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.22)_0_8px,transparent_8px_16px)] bg-[size:22px_22px] animate-[barMove_1.2s_linear_infinite]"
            />
          </div>

          <div className="grid grid-cols-5 gap-1 items-start">
            {steps.map((st) => (
              <div key={st.label} className="flex flex-col items-center gap-1.5 text-center min-w-0">
                <span
                  className={`w-[30px] h-[30px] shrink-0 rounded-full grid place-items-center font-extrabold text-[13px] ${
                    st.done
                      ? 'bg-[#2F6BF0] text-white border-2 border-[#2F6BF0]'
                      : st.current
                      ? 'bg-white text-[#2F6BF0] border-2 border-[#2F6BF0] shadow-[0_0_0_4px_rgba(47,107,240,0.18)]'
                      : 'bg-[#F1F4FA] text-[#A0A7B8] border-2 border-transparent'
                  }`}
                >
                  {st.icon}
                </span>
                <span
                  className={`font-bold text-[11px] sm:text-[12px] leading-tight tracking-tight break-words w-full ${
                    st.current ? 'text-[#2F6BF0]' : st.done ? 'text-[#0A1430]' : 'text-[#A0A7B8]'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <span className="mt-3.5 shrink-0 font-extrabold text-[13px] tracking-[0.1em] uppercase text-[#6A7189] px-1">
          Mon équipe
        </span>

        <div
          onClick={() => navigate('/espace/equipe')}
          className="shrink-0 bg-white rounded-[22px] p-[18px] flex flex-col gap-3.5 cursor-pointer shadow-[0_14px_34px_rgba(14,30,74,0.08)] hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-extrabold text-[20px] text-[#0A1430] leading-tight truncate">
                {equipe ? equipe.nom : 'Aucune équipe'}
              </span>
              <span className="font-semibold text-[14px] text-[#2F6BF0]">
                {equipe
                  ? `${equipe.concours?.categorie ?? ''} · ${equipe.concours?.taille ?? ''}`
                  : invCount > 0
                  ? `${pluriel(invCount, 'invitation')} en attente`
                  : 'Créez la vôtre ou rejoignez-en une'}
              </span>
            </div>
            <span className="font-bold text-[20px] text-[#0A1430] shrink-0">→</span>
          </div>

          {equipe && (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center shrink-0">
                {equipe.membres.slice(0, 6).map((m, i) => (
                  <Avatar
                    key={m.id}
                    personne={m}
                    className={`w-[38px] h-[38px] text-[13px] border-[3px] border-white ${i ? '-ml-2' : ''}`}
                  />
                ))}
                {peutInviter && (
                  <span className="w-[38px] h-[38px] rounded-full border-2 border-dashed border-[#C8C4BA] -ml-1 flex items-center justify-center font-bold text-[18px] text-[#8A8FA3]">
                    +
                  </span>
                )}
              </div>
              <span className="font-semibold text-[15px] text-[#4A5168] min-w-0">
                {pluriel(equipe.membres.length, 'membre')} sur {equipe.concours?.max_membres ?? '?'} max.
              </span>
            </div>
          )}
        </div>

        <div className="shrink-0 flex gap-3 items-center p-3.5 px-4 rounded-[18px] border-[1.5px] border-dashed border-[#C9D2E6] text-[#6A7189] font-semibold text-[15px] leading-snug">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Formations disponibles après la validation de votre équipe.
        </div>

        {!equipe && (
          <div className="shrink-0 rounded-[22px] bg-gradient-to-br from-[#0A1430] via-[#0E1A3D] to-[#14234D] p-4 text-white shadow-[0_12px_30px_rgba(10,20,48,0.18)] border border-white/10 flex flex-col gap-3 mt-1">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF9A3D] to-[#E8621A] text-white shadow-sm">
                <UserPlus size={20} strokeWidth={2.4} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#FF9A3D]">
                  Sans équipe pour concourir ?
                </span>
                <h4 className="font-extrabold text-[15px] text-white leading-tight">Participez en tant qu'invité</h4>
                <p className="text-[12px] text-white/70 mt-1 leading-snug">
                  Assistez aux cérémonies officielles et découvrez les projets présentés.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGuestModalOpen(true)}
              className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/15 text-white font-extrabold text-[13px] transition-all cursor-pointer"
            >
              <span className="text-[#FF9A3D]">S'inscrire en tant qu'invité</span>
              <span className="w-7 h-7 rounded-[8px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] flex items-center justify-center text-white text-[13px] shadow-sm">
                →
              </span>
            </button>
          </div>
        )}
      </div>

      {/* VERSION DESKTOP (>= 768px) : GRILLE BENTO 12 COLONNES */}
      <div className="hidden md:grid p-8 pb-14 grid-cols-12 gap-5 items-start">
        {/* CARTE A : Prochaine action */}
        <div className="col-span-12 relative overflow-hidden rounded-[28px] bg-[#0A1430] grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-h-[320px] shadow-[0_24px_50px_rgba(10,20,48,0.22)]">
          <div className="relative z-10 p-[30px] flex flex-col gap-4 min-w-0">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#F58220]">{action.surtitre}</span>
            <span className="font-black text-[34px] leading-[1.05] tracking-[-0.02em] text-white">{action.titre}</span>

            {action.taches.length > 0 && (
              <div className="flex flex-col gap-2">
                {action.taches.map((t) => (
                  <div
                    key={t.label}
                    onClick={() => navigate(t.lien)}
                    className="flex items-center gap-3 p-3 px-3.5 rounded-[14px] bg-white/[0.08] border border-white/[0.14] cursor-pointer hover:bg-white/[0.12] transition-colors"
                  >
                    <span className="shrink-0 w-[22px] h-[22px] rounded-[7px] border-2 border-white/50 box-border" />
                    <span className="flex-1 font-bold text-[15px] text-white">{t.label}</span>
                    <span className="text-[#A9C2FF] font-extrabold text-[16px]">→</span>
                  </div>
                ))}
              </div>
            )}
            {etat === 'refusee' && equipe?.motif_refus && (
              <span className="font-semibold text-[14px] text-[#FFB4A8]">Motif : {equipe.motif_refus}</span>
            )}

            <span
              onClick={() => navigate(action.lien)}
              className="mt-auto self-start min-h-[54px] px-[22px] pr-2 rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-[17px] flex items-center gap-4 cursor-pointer whitespace-nowrap shadow-[0_10px_22px_rgba(232,98,26,0.35)] hover:brightness-105 active:scale-98 transition-all"
            >
              {action.bouton}
              <span className="w-10 h-10 rounded-[12px] bg-white/20 grid place-items-center">→</span>
            </span>
          </div>

          <div
            className="relative min-h-[240px] md:min-h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${actionHeroImg})` }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#0A1430] via-[#0A1430]/0 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CARTE B : Compte à rebours */}
        <div className="col-span-12 rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] min-w-0 flex flex-col gap-[18px] bg-[#2F6BF0] text-white bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] animate-gridanim32">
          <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#DCE7FF]">Le Génie UPB commence dans</span>

          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {[
              { v: pad(timeLeft.days), l: 'JOURS' },
              { v: pad(timeLeft.hours), l: 'H' },
              { v: pad(timeLeft.minutes), l: 'MIN' },
              { v: pad(timeLeft.seconds), l: 'S' },
            ].map((c) => (
              <div key={c.l} className="min-w-0 flex flex-col items-center gap-1 py-3.5 px-1 rounded-[14px] bg-white/[0.14]">
                <span className="font-black text-[26px] leading-none tabular-nums">{c.v}</span>
                <span className="font-extrabold text-[10px] tracking-[0.1em] text-[#DCE7FF]">{c.l}</span>
              </div>
            ))}
          </div>

          {periode && <span className="mt-auto font-black text-[22px] leading-tight">{periode}</span>}
          <span className="font-semibold text-[14px] text-[#DCE7FF]">Université Polytechnique de Bingerville</span>
        </div>

        {/* CARTE C1 : Mon inscription */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-[18px]">
          <div className="flex justify-between items-baseline">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">Mon inscription</span>
            <span className="font-black text-[26px] text-[#2F6BF0] whitespace-nowrap">{pct} %</span>
          </div>

          <div className="flex flex-col gap-3">
            {steps.map((st, i) => (
              <div key={st.label} className="flex gap-3.5 items-start relative">
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-[13px] top-[30px] bottom-[-12px] w-[2px] ${st.done ? 'bg-[#2F6BF0]' : 'bg-[#E6EAF2]'}`}
                  />
                )}
                <span
                  className={`relative shrink-0 w-7 h-7 rounded-full grid place-items-center font-black text-[13px] box-border ${
                    st.done
                      ? 'bg-[#2F6BF0] text-white'
                      : st.current
                      ? 'bg-white text-[#2F6BF0] border-[2.5px] border-[#2F6BF0] shadow-[0_0_0_5px_rgba(47,107,240,0.15)]'
                      : 'bg-[#F1F4FA] text-[#A0A7B8]'
                  }`}
                >
                  {st.icon}
                </span>
                <span className="flex flex-col gap-0.5 pb-3.5 min-w-0">
                  <span className={`font-extrabold text-[15px] ${st.done || st.current ? 'text-[#0A1430]' : 'text-[#A0A7B8]'}`}>
                    {st.label}
                  </span>
                  <span className={`font-semibold text-[13px] ${st.current ? 'text-[#2F6BF0]' : 'text-[#6A7189]'}`}>
                    {detailsEtapes[i]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CARTE C2 : Mon équipe */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">Mon équipe</span>
            <span
              onClick={() => navigate('/espace/equipe')}
              className="font-extrabold text-[14px] text-[#2F6BF0] cursor-pointer whitespace-nowrap hover:underline"
            >
              {equipe ? 'Gérer →' : 'Commencer →'}
            </span>
          </div>

          {equipe ? (
            <>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-black text-[24px] text-[#0A1430] truncate">{equipe.nom}</span>
                <span className="font-bold text-[14px] text-[#E8621A]">
                  {equipe.concours?.categorie} · {equipe.membres.length} / {equipe.concours?.max_membres} membres ·{' '}
                  {equipe.concours?.taille}
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {equipe.membres.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 min-w-0">
                    <Avatar personne={m} className="w-10 h-10 text-[14px]" />
                    <span className="flex flex-col min-w-0">
                      <span className="font-extrabold text-[15px] text-[#0A1430] truncate">{nomComplet(m)}</span>
                      <span className="font-semibold text-[13px] text-[#6A7189]">
                        {m.est_chef ? (m.genre === 'F' ? "Cheffe d'équipe" : "Chef d'équipe") : 'Membre'}
                      </span>
                    </span>
                  </div>
                ))}

                {peutInviter && (
                  <div onClick={() => navigate('/espace/equipe/membres')} className="flex items-center gap-3 cursor-pointer group">
                    <span className="shrink-0 w-10 h-10 rounded-full border-2 border-dashed border-[#C9D2E6] grid place-items-center font-extrabold text-[18px] text-[#6A7189] group-hover:border-[#2F6BF0] group-hover:text-[#2F6BF0] transition-colors">
                      +
                    </span>
                    <span className="font-extrabold text-[15px] text-[#2F6BF0] group-hover:underline">
                      Inviter un membre ({pluriel(equipe.places_restantes, 'place')})
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="font-bold text-[15px] leading-[1.45] text-[#4A5168]">
                Vous n'avez pas encore d'équipe. Créez la vôtre ou acceptez une invitation.
              </span>
              <span
                onClick={() => navigate('/espace/equipe/creer')}
                className="self-start min-h-[44px] px-4 rounded-[14px] bg-[#0A1430] text-white font-extrabold text-[15px] flex items-center cursor-pointer"
              >
                + Créer une équipe
              </span>
            </div>
          )}
        </div>

        {/* CARTE D : Invitations + Formations verrouillées */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
          <div
            onClick={() => navigate('/espace/equipe/invitations')}
            className="bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">Invitations</span>
              <span
                className={`min-w-7 h-7 px-2 rounded-[9px] grid place-items-center font-black text-[14px] ${
                  invCount > 0 ? 'bg-[#FFE14A] text-[#0A1430]' : 'bg-[#F1F4FA] text-[#A0A7B8]'
                }`}
              >
                {invCount}
              </span>
            </div>
            <span className="font-extrabold text-[17px] leading-[1.3] text-[#0A1430]">
              {invCount > 0
                ? `${invCount > 1 ? 'Des équipes veulent' : 'Une équipe veut'} vous accueillir`
                : 'Aucune invitation en attente'}
            </span>
            <span className="font-extrabold text-[14px] text-[#2F6BF0] whitespace-nowrap">Voir les invitations →</span>
          </div>

          <div className="rounded-[24px] p-6 min-w-0 flex flex-col gap-2.5 bg-[#F6F8FC] border-[1.5px] border-dashed border-[#C9D2E6]">
            <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">Formations</span>
            <span className="font-bold text-[15px] leading-[1.45] text-[#4A5168]">
              Disponibles après la validation de votre équipe.
            </span>
          </div>
        </div>

        {/* CARTE F : Prochaines dates */}
        <div className="col-span-12 bg-white rounded-[24px] p-6 shadow-[0_1px_0_rgba(10,20,48,0.04),0_12px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7] min-w-0 flex flex-col gap-5">
          <span className="font-extrabold text-[12px] tracking-[0.1em] uppercase text-[#6A7189]">Prochaines dates</span>

          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[180px] flex flex-col gap-1.5 pt-4 border-t-[3px] border-[#F58220]">
              <span className="font-extrabold text-[13px] tracking-[0.06em] uppercase text-[#E8621A]">
                {dateCourte(espace.inscriptions_cloture)}
              </span>
              <span className="font-black text-[18px] leading-[1.2] text-[#0A1430]">Clôture des inscriptions</span>
              <span className="font-semibold text-[14px] text-[#6A7189]">
                {clotureJours !== null && clotureJours > 0
                  ? `Dans ${pluriel(clotureJours, 'jour')}`
                  : clotureJours === 0
                  ? "Aujourd'hui"
                  : 'Inscriptions closes'}
              </span>
            </div>

            {periode && (
              <div className="flex-1 min-w-[180px] flex flex-col gap-1.5 pt-4 border-t-[3px] border-[#E6EAF2]">
                <span className="font-extrabold text-[13px] tracking-[0.06em] uppercase text-[#6A7189]">
                  {debut && fin && debut !== fin
                    ? `${new Date(debut).getDate()} – ${dateCourte(fin)}`
                    : dateCourte(debut)}
                </span>
                <span className="font-black text-[18px] leading-[1.2] text-[#0A1430]">Le Génie UPB</span>
                <span className="font-semibold text-[14px] text-[#6A7189]">
                  {debut && fin
                    ? `${pluriel(Math.round((new Date(fin).getTime() - new Date(debut).getTime()) / 86400000) + 1, 'jour')} de compétition`
                    : 'Compétition'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalInscriptionInvite
        isOpen={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
        initialNom={casse(moi.nom)}
        initialPrenom={casse(moi.prenom)}
        initialMatricule={moi.matricule}
      />
    </div>
  );
}
