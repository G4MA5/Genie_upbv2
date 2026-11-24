import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowLeft, GraduationCap, Building2, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { invitesApi } from '../../services/invites';
import { ApiError, jeton, messageErreur } from '../../services/api';
import { JoursPrevus } from '../invites/JoursPrevus';
import { RenvoiBadge } from '../invites/RenvoiBadge';

export type MascotMood = 'idle' | 'focus' | 'err' | 'think' | 'happy' | 'joy';

const MOOD_CONFIGS: Record<
  MascotMood,
  {
    mouthW: string;
    mouthH: string;
    mouthR: string;
    cheekOp: number;
    eyeSq: number;
  }
> = {
  idle: {
    mouthW: '20px',
    mouthH: '8px',
    mouthR: '0 0 10px 10px',
    cheekOp: 0,
    eyeSq: 1,
  },
  focus: {
    mouthW: '10px',
    mouthH: '10px',
    mouthR: '50%',
    cheekOp: 0,
    eyeSq: 1,
  },
  err: {
    mouthW: '18px',
    mouthH: '6px',
    mouthR: '6px 6px 2px 2px',
    cheekOp: 0,
    eyeSq: 0.85,
  },
  think: {
    mouthW: '8px',
    mouthH: '4px',
    mouthR: '4px',
    cheekOp: 0,
    eyeSq: 1,
  },
  happy: {
    mouthW: '26px',
    mouthH: '12px',
    mouthR: '0 0 14px 14px',
    cheekOp: 0.9,
    eyeSq: 1,
  },
  joy: {
    mouthW: '30px',
    mouthH: '15px',
    mouthR: '0 0 16px 16px',
    cheekOp: 0.9,
    eyeSq: 0.55,
  },
};

// Mini-Mascotte Robot pour le Modal d'inscription invité
export function ModalRobotMascot({ mood = 'idle' }: { mood?: MascotMood }) {
  const cfg = MOOD_CONFIGS[mood] || MOOD_CONFIGS.idle;
  return (
    <div
      role="img"
      aria-label="Mascotte GÉNIE UPB"
      className="relative w-[130px] h-[142px] overflow-hidden select-none pointer-events-none mt-1 -mb-1"
    >
      <div className="relative w-[260px] h-[300px] scale-[0.48] origin-top-left -ml-1">
        {/* Roue dentée animée */}
        <svg
          viewBox="0 0 260 260"
          className="absolute left-0 top-0 w-[260px] h-[260px] overflow-visible origin-center animate-[spin_36s_linear_infinite]"
        >
          <path
            d="M109.8 25.9L116.7 3.7L143.3 3.7L150.2 25.9L174.8 33.9L174.8 33.9L193.5 20.0L215.0 35.6L207.5 57.7L222.7 78.6L222.7 78.6L246.0 78.3L254.2 103.6L235.2 117.1L235.2 142.9L235.2 142.9L254.2 156.4L246.0 181.7L222.7 181.4L207.5 202.3L207.5 202.3L215.0 224.4L193.5 240.0L174.8 226.1L150.2 234.1L150.2 234.1L143.3 256.3L116.7 256.3L109.8 234.1L85.2 226.1L85.2 226.1L66.5 240.0L45.0 224.4L52.5 202.3L37.3 181.4L37.3 181.4L14.0 181.7L5.8 156.4L24.8 142.9L24.8 117.1L24.8 117.1L5.8 103.6L14.0 78.3L37.3 78.6L52.5 57.7L52.5 57.7L45.0 35.6L66.5 20.0L85.2 33.9L109.8 25.9Z M130 42 A88 88 0 1 0 130 218 A88 88 0 1 0 130 42Z"
            fill="#78B4DA"
            fillRule="evenodd"
            stroke="#78B4DA"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </svg>

        {/* Arc halo bleu */}
        <svg viewBox="0 0 260 260" className="absolute left-0 top-0 w-[260px] h-[260px]">
          <path d="M62 190 A78 78 0 1 1 198 190" fill="none" stroke="#78B4DA" strokeWidth="7" strokeLinecap="round" />
        </svg>

        {/* Base robotique / livre */}
        <svg viewBox="0 0 260 50" className="absolute left-0 top-[250px] w-[260px] h-[50px]">
          <path d="M128 16 Q96 0 46 6 L40 28 Q92 20 128 34 Z M132 16 Q164 0 214 6 L220 28 Q168 20 132 34 Z" fill="#78B4DA" />
          <path d="M18 32 Q78 26 130 42 Q182 26 242 32 L242 40 Q182 34 130 50 Q78 34 18 40 Z" fill="#78B4DA" />
        </svg>

        {/* Corps et tête */}
        <div className="absolute left-0 top-0 w-[260px] h-[300px]">
          <div className="absolute left-[30px] top-[96px] w-[34px] h-[30px] flex items-end gap-1">
            <span className="w-2 h-3 bg-[#10357E] rounded-[2px]" />
            <span className="w-2 h-5 bg-[#10357E] rounded-[2px]" />
            <span className="w-2 h-[30px] bg-[#10357E] rounded-[2px]" />
          </div>
          <div className="absolute left-[92px] top-[146px] w-[76px] h-[92px] rounded-[50%_50%_50%_50%_/_36%_36%_64%_64%] bg-[#10357E]" />
          <div className="absolute left-[87px] top-[122px] w-[17px] h-[54px] rounded-[9px] bg-[#10357E] origin-bottom -rotate-[38deg]">
            <span className="absolute -left-1 -top-3 w-6 h-6 rounded-full bg-[#10357E]" />
          </div>
          <div className="absolute left-[134px] top-[168px] w-[38px] h-[48px] border-[3px] border-[#10357E] rounded-[5px] bg-white -rotate-[5deg] flex flex-col gap-1 pt-3 px-1.5">
            <span className="absolute left-[9px] -top-2 w-3.5 h-[9px] rounded-[3px] bg-[#10357E]" />
            <span className="h-[3px] w-5 rounded-[2px] bg-[#10357E]" />
            <span className="h-[3px] w-3.5 rounded-[2px] bg-[#10357E]" />
            <span className="h-[3px] w-4 rounded-[2px] bg-[#10357E]" />
            <span className="h-[3px] w-2.5 rounded-[2px] bg-[#10357E]" />
          </div>

          <div className="absolute left-0 top-0 w-[260px] h-[170px] origin-[130px_160px]">
            <span className="absolute left-[128px] top-[42px] w-1 h-6 bg-[#10357E]" />
            <span className="absolute left-[123px] top-[30px] w-3.5 h-3.5 rounded-full bg-[#10357E]" />
            <span className="absolute left-[58px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
            <span className="absolute left-[186px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
            <div className="absolute left-[68px] top-[62px] w-[124px] h-[96px] rounded-[50%_50%_44%_44%_/_56%_56%_44%_44%] bg-[#10357E]" />
            <div className="absolute left-[82px] top-[74px] w-[96px] h-[70px] rounded-[50%_50%_42%_42%_/_58%_58%_42%_42%] bg-white" />

            <div className="absolute left-[82px] top-[90px] w-[96px] h-[26px] flex justify-center gap-[22px]">
              <div
                className="relative w-[22px] h-[26px] transition-transform duration-300"
                style={{ transform: `scaleY(${cfg.eyeSq})` }}
              >
                <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
              </div>
              <div
                className="relative w-[22px] h-[26px] transition-transform duration-300"
                style={{ transform: `scaleY(${cfg.eyeSq})` }}
              >
                <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
              </div>
            </div>

            <span
              className="absolute left-[91px] top-[120px] w-3.5 h-[7px] rounded-[50%] bg-[#F29A9A] transition-opacity duration-300"
              style={{ opacity: cfg.cheekOp }}
            />
            <span
              className="absolute left-[155px] top-[120px] w-3.5 h-[7px] rounded-[50%] bg-[#F29A9A] transition-opacity duration-300"
              style={{ opacity: cfg.cheekOp }}
            />

            <div className="absolute left-[82px] top-[124px] w-[96px] h-4 flex justify-center items-start">
              <span
                className="bg-[#10357E] transition-all duration-[350ms]"
                style={{
                  width: cfg.mouthW,
                  height: cfg.mouthH,
                  borderRadius: cfg.mouthR,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ModalInscriptionInviteProps {
  isOpen: boolean;
  onClose: () => void;
  initialNom?: string;
  initialPrenom?: string;
  initialMatricule?: string;
}

export default function ModalInscriptionInvite({
  isOpen,
  onClose,
  initialNom = '',
  initialPrenom = '',
  initialMatricule = '',
}: ModalInscriptionInviteProps) {
  type InviteStep = 1 | 2 | 3 | 'success';
  const [inviteStep, setInviteStep] = useState<InviteStep>(1);
  const [inviteNom, setInviteNom] = useState(initialNom);
  const [invitePrenom, setInvitePrenom] = useState(initialPrenom);
  const [inviteType, setInviteType] = useState<'UPB' | 'Autre'>('UPB');
  const [inviteMatricule, setInviteMatricule] = useState(initialMatricule);
  const [inviteEtablissement, setInviteEtablissement] = useState('');
  const [inviteAmbition, setInviteAmbition] = useState('');
  const [inviteErr, setInviteErrState] = useState<string | null>(null);
  // Les erreurs s'affichent aussi en notification en haut de l'ecran.
  const setInviteErr = (m: string | null) => {
    setInviteErrState(m);
    if (m) toast.error(m);
  };

  // Champs demandes par l'API (etape 3)
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteNumero, setInviteNumero] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteJours, setInviteJours] = useState<string[]>([]);
  const [inviteConsent, setInviteConsent] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [matToken, setMatToken] = useState<string | null>(null);
  const [compteExistant, setCompteExistant] = useState(false);
  const [emailEnvoye, setEmailEnvoye] = useState(true);
  const connecte = !!jeton.lire();
  // Un etudiant UPB connecte s'inscrit avec son compte (pas de code e-mail).
  const modeCompte = connecte && inviteType === 'UPB';

  useEffect(() => {
    if (isOpen) {
      if (initialNom && !inviteNom) setInviteNom(initialNom);
      if (initialPrenom && !invitePrenom) setInvitePrenom(initialPrenom);
      if (initialMatricule && !inviteMatricule) setInviteMatricule(initialMatricule);
    }
  }, [isOpen, initialNom, initialPrenom, initialMatricule]);

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteNom.trim() || !invitePrenom.trim()) {
      setInviteErr('Veuillez renseigner votre nom et votre prénom.');
      return;
    }
    setInviteErr(null);
    setInviteStep(2);
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompteExistant(false);
    if (inviteType === 'UPB') {
      if (!inviteMatricule.trim()) {
        setInviteErr('Veuillez saisir votre matricule UPB.');
        return;
      }
      if (!modeCompte) {
        setInviteLoading(true);
        try {
          const info = await invitesApi.verifierMatricule(inviteMatricule.trim());
          setMatToken(info.token);
        } catch (err) {
          setCompteExistant(err instanceof ApiError && err.code === 'compte_existant');
          setInviteErr(messageErreur(err));
          return;
        } finally {
          setInviteLoading(false);
        }
      }
    } else {
      if (!inviteEtablissement.trim() || !inviteAmbition.trim()) {
        setInviteErr('Veuillez renseigner votre établissement et votre ambition.');
        return;
      }
    }
    setInviteErr(null);
    setInviteStep(3);
  };

  const demanderCode = async () => {
    setInviteLoading(true);
    try {
      const r = await invitesApi.envoyerCode(inviteEmail.trim());
      toast.success(r.message);
    } catch (err) {
      toast.error(messageErreur(err));
    } finally {
      setInviteLoading(false);
    }
  };

  const handleSubmitStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteConsent) {
      setInviteErr("Vous devez accepter l'utilisation de vos données pour continuer.");
      return;
    }
    if (!modeCompte && (!inviteEmail.trim() || !inviteNumero.trim() || inviteCode.length !== 6)) {
      setInviteErr('Renseignez votre e-mail, votre téléphone et le code à 6 chiffres reçu par e-mail.');
      return;
    }
    const jours = inviteJours.length ? { jours_prevus: inviteJours } : {};
    setInviteLoading(true);
    try {
      let r;
      if (modeCompte) {
        r = await invitesApi.inscrireAvecCompte({
          consentement: true,
          ...jours,
          ...(inviteNumero.trim() ? { numero: inviteNumero.trim() } : {}),
        });
      } else if (inviteType === 'UPB') {
        r = await invitesApi.inscrire({
          type_invite: 'etudiant_upb',
          token: matToken,
          email: inviteEmail.trim(),
          numero: inviteNumero.trim(),
          code: inviteCode.trim(),
          consentement: true,
          ...jours,
        });
      } else {
        r = await invitesApi.inscrire({
          type_invite: 'particulier',
          nom: inviteNom.trim(),
          prenom: invitePrenom.trim(),
          statut: inviteEtablissement.trim(),
          email: inviteEmail.trim(),
          numero: inviteNumero.trim(),
          code: inviteCode.trim(),
          consentement: true,
          ...jours,
        });
      }
      setEmailEnvoye(r.email_envoye);
      setInviteErrState(null);
      setInviteStep('success');
      toast.success('Inscription validée !');
    } catch (err) {
      const m =
        err instanceof ApiError && err.code === 'code_invalide'
          ? `${messageErreur(err)} Demandez un nouveau code.`
          : messageErreur(err);
      setInviteErr(m);
    } finally {
      setInviteLoading(false);
    }
  };

  const handleResetInvite = () => {
    setInviteNom(initialNom);
    setInvitePrenom(initialPrenom);
    setInviteType('UPB');
    setInviteMatricule(initialMatricule);
    setInviteEtablissement('');
    setInviteAmbition('');
    setInviteEmail('');
    setInviteNumero('');
    setInviteCode('');
    setInviteJours([]);
    setInviteConsent(false);
    setMatToken(null);
    setCompteExistant(false);
    setEmailEnvoye(true);
    setInviteErrState(null);
    setInviteStep(1);
    onClose();
  };

  const modalMood: MascotMood =
    inviteStep === 'success'
      ? 'joy'
      : inviteStep === 3
      ? (inviteErr ? 'err' : 'focus')
      : inviteStep === 2
      ? (inviteMatricule.trim() || inviteEtablissement.trim() ? 'focus' : 'happy')
      : inviteErr
      ? 'err'
      : (inviteNom.trim() || invitePrenom.trim() ? 'focus' : 'idle');

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0A1430]/75 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-[400px] rounded-[36px] p-[10px_10px_20px] flex flex-col gap-3.5 overflow-hidden shadow-[0_40px_80px_rgba(20,60,150,0.32)] bg-white my-auto animate-in zoom-in-95 duration-200 text-[#0A1430]">
        {/* Volet supérieur authentique #E7EDF7 avec Mascotte et Navigation */}
        <div className="relative rounded-[28px] bg-[#E7EDF7] pt-5 px-3 pb-0 flex flex-col items-center overflow-hidden">
          {/* Bouton retour précédent (étape 2) */}
          {(inviteStep === 2 || inviteStep === 3) && (
            <button
              type="button"
              onClick={() => {
                setInviteErrState(null);
                setInviteStep(inviteStep === 3 ? 2 : 1);
              }}
              className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0A1430] cursor-pointer shadow-[0_4px_12px_rgba(10,20,48,0.1)] hover:scale-105 active:scale-95 transition-transform"
              aria-label="Retour"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </button>
          )}

          {/* Bouton de fermeture */}
          <button
            type="button"
            onClick={handleResetInvite}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6A7189] hover:text-[#0A1430] cursor-pointer shadow-[0_4px_12px_rgba(10,20,48,0.1)] hover:scale-105 active:scale-95 transition-transform"
            aria-label="Fermer"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* Titre et Sous-titre concis */}
          <div className="flex flex-col gap-0.5 items-center text-center px-4 pt-1">
            <h2 className="m-0 font-extrabold text-[19px] sm:text-[21px] leading-[1.2] text-[#0A1430] tracking-[-0.02em] font-sans [text-wrap:balance]">
              {inviteStep === 1 && 'Vos coordonnées'}
              {inviteStep === 2 && 'Votre établissement'}
              {inviteStep === 3 && 'Vérification'}
              {inviteStep === 'success' && `Bienvenue, ${invitePrenom}\u00A0!`}
            </h2>
            <p className="font-semibold text-[13px] leading-[1.3] text-[#4A5168] font-sans [text-wrap:pretty]">
              {inviteStep === 1 && 'Nom et prénom pour votre pass.'}
              {inviteStep === 2 && 'UPB ou établissement extérieur.'}
              {inviteStep === 3 && (modeCompte ? 'Confirmez votre inscription.' : 'Un code vous est envoyé par e-mail.')}
              {inviteStep === 'success' && (emailEnvoye ? 'Votre pass officiel vous sera envoyé par e-mail.' : 'Demandez le renvoi de votre pass.')}
            </p>
          </div>

          {/* Mascotte Robot UPB */}
          <ModalRobotMascot mood={modalMood} />

          {/* Dégradé bas du volet */}
          <div className="w-full h-2.5 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Corps du formulaire */}
        <div className="px-3 sm:px-4 pb-1 flex flex-col gap-3">
          {/* ÉTAPE 1 : Identité (Nom, Prénom) - SANS ASTÉRISQUE */}
          {inviteStep === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-3">
              <div>
                <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={inviteNom}
                  onChange={(e) => {
                    setInviteNom(e.target.value);
                    if (inviteErr) setInviteErr(null);
                  }}
                  placeholder="Ex: Kouassi"
                  className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={invitePrenom}
                  onChange={(e) => {
                    setInvitePrenom(e.target.value);
                    if (inviteErr) setInviteErr(null);
                  }}
                  placeholder="Ex: Jean-Eudes"
                  className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all"
                />
              </div>

              {inviteErr && (
                <div className="p-2.5 rounded-[10px] bg-red-50 border border-red-200 text-red-700 text-[12px] font-medium">
                  {inviteErr}
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[48px] pl-5 pr-1.5 rounded-[14px] bg-[#0A1430] text-white font-extrabold text-[15px] flex items-center justify-between gap-3 shadow-[0_8px_18px_rgba(10,20,48,0.2)] hover:bg-[#14234b] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Continuer</span>
                <span className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[16px] text-white shadow-sm">
                  →
                </span>
              </button>
            </form>
          )}

          {/* ÉTAPE 2 : Établissement (UPB ou Autre) - SANS ASTÉRISQUE */}
          {inviteStep === 2 && (
            <form onSubmit={handleSubmitStep2} className="space-y-3">
              {/* Sélecteur 2 boutons très simple : UPB ou Autre */}
              <div className="grid grid-cols-2 gap-2 bg-[#F1F4FA] p-1 rounded-[14px]">
                <button
                  type="button"
                  onClick={() => {
                    setInviteType('UPB');
                    if (inviteErr) setInviteErr(null);
                  }}
                  className={`py-2 px-3 rounded-[11px] font-extrabold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    inviteType === 'UPB'
                      ? 'bg-[#0A1430] text-white shadow-sm'
                      : 'text-[#555E77] hover:text-[#0A1430]'
                  }`}
                >
                  <GraduationCap size={16} />
                  <span>UPB</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInviteType('Autre');
                    if (inviteErr) setInviteErr(null);
                  }}
                  className={`py-2 px-3 rounded-[11px] font-extrabold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    inviteType === 'Autre'
                      ? 'bg-[#0A1430] text-white shadow-sm'
                      : 'text-[#555E77] hover:text-[#0A1430]'
                  }`}
                >
                  <Building2 size={16} />
                  <span>Autre</span>
                </button>
              </div>

              {/* Si UPB : Matricule UPB uniquement (pas d'ambition) */}
              {inviteType === 'UPB' ? (
                <div>
                  <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">
                    Matricule UPB
                  </label>
                  <input
                    type="text"
                    value={inviteMatricule}
                    onChange={(e) => {
                      setInviteMatricule(e.target.value);
                      if (inviteErr) setInviteErr(null);
                    }}
                    placeholder="Ex: UPB-2024-0012"
                    className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all uppercase"
                    autoFocus
                  />
                </div>
              ) : (
                /* Si Autre : Établissement + Ambition */
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">
                      Établissement
                    </label>
                    <input
                      type="text"
                      value={inviteEtablissement}
                      onChange={(e) => {
                        setInviteEtablissement(e.target.value);
                        if (inviteErr) setInviteErr(null);
                      }}
                      placeholder="Ex: ESATIC, INP-HB, UFHB, Entreprise..."
                      className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">
                      Ambition
                    </label>
                    <textarea
                      rows={2}
                      value={inviteAmbition}
                      onChange={(e) => {
                        setInviteAmbition(e.target.value);
                        if (inviteErr) setInviteErr(null);
                      }}
                      placeholder="Ex: Découvrir les projets et innovations..."
                      className="w-full p-2.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[13px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {inviteErr && (
                <div className="p-2.5 rounded-[10px] bg-red-50 border border-red-200 text-red-700 text-[12px] font-medium">
                  {inviteErr}
                </div>
              )}

              {compteExistant && (
                <Link to="/connexion" onClick={onClose} className="block text-center font-extrabold text-[14px] text-[#0A1430] underline">
                  Se connecter
                </Link>
              )}

              <button
                type="submit"
                disabled={inviteLoading}
                className="w-full min-h-[48px] pl-5 pr-1.5 rounded-[14px] bg-[#0A1430] text-white font-extrabold text-[15px] flex items-center justify-between gap-3 shadow-[0_8px_18px_rgba(10,20,48,0.2)] hover:bg-[#14234b] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
              >
                <span>{inviteLoading ? 'Vérification...' : 'Continuer'}</span>
                <span className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[16px] text-white shadow-sm">
                  →
                </span>
              </button>
            </form>
          )}

          {/* ETAPE 3 : Verification (e-mail, code, jours, consentement) demandes par l'API */}
          {inviteStep === 3 && (
            <form onSubmit={handleSubmitStep3} className="space-y-3">
              {modeCompte ? (
                <>
                  <p className="text-[13px] text-[#4A5168] font-semibold">Vous êtes connecté : votre inscription utilise votre compte Genie UPB.</p>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">Téléphone (facultatif)</label>
                  <input type="tel" value={inviteNumero} onChange={(e) => setInviteNumero(e.target.value)} placeholder="Seulement si absent de votre profil" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all" />
                </div>
                </>
              ) : (
                <>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">E-mail</label>
                  <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="nom@exemple.com" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all" autoFocus />
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">Téléphone</label>
                  <input type="tel" value={inviteNumero} onChange={(e) => setInviteNumero(e.target.value)} placeholder="Ex: 0707070707" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#3A4053] uppercase tracking-wider mb-1">Code de vérification</label>
                  <div className="flex gap-2">
                    <input type="text" inputMode="numeric" maxLength={6} value={inviteCode} onChange={(e) => setInviteCode(e.target.value.replace(/\D/g, ''))} placeholder="6 chiffres" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all" />
                    <button
                      type="button"
                      onClick={demanderCode}
                      disabled={inviteLoading || !inviteEmail.trim()}
                      className="shrink-0 px-3 rounded-[12px] bg-[#0A1430] text-white font-bold text-[13px] disabled:opacity-50 cursor-pointer"
                    >
                      Envoyer le code
                    </button>
                  </div>
                </div>
                </>
              )}

              <JoursPrevus valeur={inviteJours} onChange={setInviteJours} />

              <label className="flex gap-2.5 items-start cursor-pointer select-none">
                <input type="checkbox" checked={inviteConsent} onChange={(e) => setInviteConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-[#0A1430]" />
                <span className="text-[12px] text-[#3A4053] leading-snug">
                  J'accepte l'utilisation de mes données pour le concours et le suivi de présence par QR code.
                </span>
              </label>

              {inviteErr && (
                <div className="p-2.5 rounded-[10px] bg-red-50 border border-red-200 text-red-700 text-[12px] font-medium">
                  {inviteErr}
                </div>
              )}

              <button
                type="submit"
                disabled={inviteLoading}
                className="w-full min-h-[48px] pl-5 pr-1.5 rounded-[14px] bg-[#0A1430] text-white font-extrabold text-[15px] flex items-center justify-between gap-3 shadow-[0_8px_18px_rgba(10,20,48,0.2)] hover:bg-[#14234b] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
              >
                <span>{inviteLoading ? 'Envoi en cours...' : 'Valider mon inscription'}</span>
                <span className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[16px] text-white shadow-sm">
                  →
                </span>
              </button>
            </form>
          )}

          {/* ÉTAPE SUCCÈS : Confirmation & Envoi du Pass par e-mail */}
          {inviteStep === 'success' && (
            <div className="space-y-3 pt-0.5">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[18px] p-3.5 text-left space-y-2 text-[13px]">
                <div className="flex justify-between items-center border-b border-[#EDF2F7] pb-1.5">
                  <span className="text-[#64748B] font-bold text-[11px] uppercase tracking-wider">
                    Nom complet
                  </span>
                  <span className="font-extrabold text-[#0A1430] text-[13px]">
                    {inviteNom} {invitePrenom}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#EDF2F7] pb-1.5">
                  <span className="text-[#64748B] font-bold text-[11px] uppercase tracking-wider">
                    Statut
                  </span>
                  <span className="font-extrabold px-2 py-0.5 rounded-full text-[10px] bg-[#E7EDF7] text-[#10357E]">
                    {inviteType === 'UPB' ? 'Invité Campus UPB' : 'Invité Extérieur'}
                  </span>
                </div>

                {inviteType === 'UPB' ? (
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B] font-bold text-[11px] uppercase tracking-wider">
                      Matricule UPB
                    </span>
                    <span className="font-extrabold text-[#10357E] font-mono text-[13px]">
                      {inviteMatricule}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center border-b border-[#EDF2F7] pb-1.5">
                      <span className="text-[#64748B] font-bold text-[11px] uppercase tracking-wider">
                        Établissement
                      </span>
                      <span className="font-bold text-[#0A1430]">
                        {inviteEtablissement}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#64748B] font-bold text-[11px] uppercase tracking-wider block mb-0.5">
                        Ambition
                      </span>
                      <p className="font-medium text-[#1E293B] italic leading-tight text-[12px] bg-white p-2 rounded-[10px] border border-[#E2E8F0]">
                        "{inviteAmbition}"
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Information d'envoi du pass par e-mail */}
              {emailEnvoye ? (
                <div className="flex items-center gap-3 p-3.5 rounded-[14px] bg-[#EBF3FF] border border-[#C5DCFA] text-left">
                  <span className="w-9 h-9 rounded-full bg-[#10357E] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail size={18} strokeWidth={2.4} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-extrabold text-[13px] text-[#0A1430] leading-tight">Pass envoyé par e-mail</p>
                    <p className="text-[12px] text-[#4A5168] mt-0.5 leading-snug">
                      Votre pass officiel nominatif avec QR code d'accès vous a été envoyé par e-mail.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-[14px] bg-[#EBF3FF] border border-[#C5DCFA] text-left space-y-2">
                  <p className="font-extrabold text-[13px] text-[#0A1430] leading-tight">L'e-mail n'a pas pu être envoyé</p>
                  <p className="text-[12px] text-[#4A5168] leading-snug">Votre inscription est enregistrée. Demandez le renvoi de votre pass.</p>
                  <RenvoiBadge emailInitial={inviteEmail} />
                </div>
              )}

              <button
                type="button"
                onClick={handleResetInvite}
                className="w-full min-h-[46px] px-4 rounded-[12px] bg-[#0A1430] hover:bg-[#14234b] text-white font-extrabold text-[14px] flex items-center justify-center transition-all cursor-pointer shadow-[0_6px_16px_rgba(10,20,48,0.2)] active:scale-[0.99]"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
