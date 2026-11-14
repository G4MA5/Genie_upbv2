import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Inscription() {
  const navigate = useNavigate();

  // Valeur du matricule
  const [matricule, setMatricule] = useState<string>('UPB-2026-8841');
  const [step, setStep] = useState<'input' | 'loading' | 'found'>('input');
  const [consent, setConsent] = useState<boolean>(true);

  // Mascotte interactive : sourire
  const [mouthHappy, setMouthHappy] = useState<boolean>(false);

  const handleMatriculeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricule.trim()) {
      toast.error('Veuillez entrer votre matricule étudiant UPB.');
      return;
    }
    setStep('loading');
    setTimeout(() => {
      setStep('found');
      setMouthHappy(true);
      toast.success('Étudiant(e) identifié(e) dans l’annuaire UPB !');
    }, 800);
  };

  const handleFinalSubmit = () => {
    if (!consent) {
      toast.error('Veuillez accepter l’utilisation de vos données.');
      return;
    }
    toast.success('Bienvenue Aya Kouassi ! Votre compte est créé.');
    navigate('/espace/dashboard');
  };

  const handleReset = () => {
    setStep('input');
    setMatricule('');
    setMouthHappy(false);
  };

  return (
    <div
      className="w-full min-h-screen bg-[#BFD6FF] flex items-center justify-center pt-[100px] pb-10 px-5 relative select-none box-border"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.55), transparent 70%)',
      }}
    >
      {/* CARTE BLANCHE CENTRALE AUTHENTIQUE (S8 Prototype exact) */}
      <div className="relative w-full max-w-[360px] rounded-[36px] p-[10px_10px_20px] flex flex-col gap-4 overflow-hidden shadow-[0_40px_80px_rgba(20,60,150,0.22),0_8px_20px_rgba(20,60,150,0.08)] bg-white my-auto animate-scaleUp">
        {/* Bouton retour circulaire ← */}
        <Link
          to="/"
          aria-label="Retour au site"
          className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-white text-[#0A1430] font-bold text-xl flex items-center justify-center shadow-md hover:bg-slate-50 active:scale-95 transition-transform"
        >
          ←
        </Link>

        {/* 1. VOLET SUPÉRIEUR BLEU GRISÉ #E7EDF7 AVEC MASCOTTE ANIMÉE */}
        <div className="relative rounded-[28px] bg-[#E7EDF7] pt-[22px] px-3 pb-0 flex flex-col items-center overflow-hidden">
          {/* Titre et Sous-titre */}
          <div className="flex flex-col gap-1.5 items-center text-center px-10">
            <h1 className="m-0 font-black text-[24px] leading-[1.1] text-[#0A1430] tracking-tight">
              Rejoins l'aventure !
            </h1>
            <span className="font-semibold text-[14px] leading-[1.4] text-[#4A5168]">
              {step === 'found'
                ? "Confirme tes informations d'inscription"
                : 'Saisis ton matricule UPB pour commencer.'}
            </span>
          </div>

          {/* Mascotte Robot UPB Interactive */}
          <div
            role="img"
            aria-label="Mascotte GÉNIE UPB"
            className="relative self-center mt-2.5 -mb-1.5 w-[169px] h-[195px]"
          >
            <div className="relative w-[260px] h-[300px] scale-[0.65] origin-top-left">
              {/* Roue dentée de fond avec rotation continue */}
              <svg
                viewBox="0 0 260 260"
                className="absolute left-0 top-0 w-[260px] h-[260px] overflow-visible origin-center animate-spin"
                style={{ animationDuration: '24s' }}
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
                <path
                  d="M62 190 A78 78 0 1 1 198 190"
                  fill="none"
                  stroke="#78B4DA"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>

              {/* Éléments de structure robotique */}
              <svg viewBox="0 0 260 50" className="absolute left-0 top-[250px] w-[260px] h-[50px]">
                <path
                  d="M128 16 Q96 0 46 6 L40 28 Q92 20 128 34 Z M132 16 Q164 0 214 6 L220 28 Q168 20 132 34 Z"
                  fill="#78B4DA"
                />
                <path
                  d="M18 32 Q78 26 130 42 Q182 26 242 32 L242 40 Q182 34 130 50 Q78 34 18 40 Z"
                  fill="#78B4DA"
                />
              </svg>

              {/* Corps et tête de la Mascotte */}
              <div className="absolute left-0 top-0 w-[260px] h-[300px]">
                {/* Barres d'ondes gauche */}
                <div className="absolute left-[30px] top-[96px] w-[34px] h-[30px] flex items-end gap-1">
                  <span className="w-2 h-3 bg-[#10357E] rounded-xs" />
                  <span className="w-2 h-5 bg-[#10357E] rounded-xs" />
                  <span className="w-2 h-7 bg-[#10357E] rounded-xs" />
                </div>

                {/* Torse */}
                <div className="absolute left-[92px] top-[146px] w-[76px] h-[92px] rounded-[50%_50%_50%_50%/36%_36%_64%_64%] bg-[#10357E]" />

                {/* Bras */}
                <div className="absolute left-[87px] top-[122px] w-[17px] h-[54px] rounded-[9px] bg-[#10357E] origin-bottom -rotate-[38deg]">
                  <span className="absolute -left-1 -top-3 w-6 h-6 rounded-full bg-[#10357E]" />
                </div>

                {/* Badge poitrine */}
                <div className="absolute left-[134px] top-[168px] w-[38px] h-[48px] box-border border-[3px] border-[#10357E] rounded-[5px] bg-white -rotate-[5deg] flex flex-col gap-1.5 pt-3 px-1.5">
                  <span className="absolute left-[9px] -top-2 w-3.5 h-2 rounded-xs bg-[#10357E]" />
                  <span className="h-0.5 w-5 rounded-xs bg-[#10357E]" />
                  <span className="h-0.5 w-3.5 rounded-xs bg-[#10357E]" />
                  <span className="h-0.5 w-4.5 rounded-xs bg-[#78B4DA]" />
                </div>

                {/* Bouton bleu clair */}
                <span className="absolute left-[158px] top-[194px] w-5 h-5 rounded-full bg-[#10357E] border-2 border-white" />

                {/* Tête */}
                <div className="absolute left-0 top-0 w-[260px] h-[170px] origin-[130px_160px]">
                  {/* Antenne */}
                  <span className="absolute left-[128px] top-[42px] w-1 h-6 bg-[#10357E]" />
                  <span className="absolute left-[123px] top-[30px] w-3.5 h-3.5 rounded-full bg-[#10357E]" />

                  {/* Oreilles casque */}
                  <span className="absolute left-[58px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
                  <span className="absolute left-[186px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />

                  {/* Casque bleu foncé */}
                  <div className="absolute left-[68px] top-[62px] w-[124px] h-[96px] rounded-[50%_50%_44%_44%/56%_56%_44%_44%] bg-[#10357E]" />

                  {/* Visage blanc */}
                  <div className="absolute left-[82px] top-[74px] w-[96px] h-[70px] rounded-[50%_50%_42%_42%/58%_58%_42%_42%] bg-white" />

                  {/* Yeux animés */}
                  <div className="absolute left-[82px] top-[90px] w-[96px] h-[26px] flex justify-center gap-5.5">
                    <div className="relative w-[22px] h-[26px]">
                      <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
                    </div>
                    <div className="relative w-[22px] h-[26px]">
                      <div className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E]" />
                    </div>
                  </div>

                  {/* Joues roses */}
                  <span className="absolute left-[91px] top-[120px] w-3.5 h-[7px] rounded-full bg-[#F29A9A] opacity-80" />
                  <span className="absolute left-[155px] top-[120px] w-3.5 h-[7px] rounded-full bg-[#F29A9A] opacity-80" />

                  {/* Bouche interactive */}
                  <div className="absolute left-[82px] top-[124px] w-[96px] h-[16px] flex justify-center items-start">
                    <span
                      style={{
                        width: mouthHappy ? '18px' : '10px',
                        height: mouthHappy ? '6px' : '3px',
                        borderRadius: mouthHappy ? '0 0 10px 10px' : '2px',
                      }}
                      className="bg-[#10357E] transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dégradé doux vers le bas du volet */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 bottom-0 h-11 pointer-events-none"
            style={{
              background: 'linear-gradient(rgba(231,237,247,0), #E7EDF7)',
            }}
          />
        </div>

        {/* 2. FORMULAIRE INTERACTIF AUTHENTIQUE */}
        <div className="flex flex-col gap-3 px-2">
          {step === 'input' && (
            <form onSubmit={handleMatriculeSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col gap-2">
                <input
                  type="text"
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  placeholder="Ton matricule"
                  autoComplete="off"
                  className="min-h-[52px] rounded-[14px] border-2 border-[#0A1430]/20 text-center bg-[#0A1430]/[0.07] px-5 font-bold text-[17px] tracking-[0.12em] uppercase text-[#0A1430] outline-none transition-all focus:bg-white focus:border-[#2F6BF0]"
                />
                <span className="font-semibold text-[13px] leading-[1.4] text-[#4A5168] text-center">
                  Ex. : UPB-2026-8841 · Trouve-le sur ta carte d'étudiant
                </span>
              </label>

              <button
                type="submit"
                className="min-h-[52px] pl-5 pr-1.5 rounded-[16px] bg-[#0A1430] hover:bg-[#15254A] shadow-[0_12px_24px_rgba(10,20,48,0.22)] text-white font-extrabold text-[16px] flex items-center justify-between gap-3 cursor-pointer hover:scale-[1.01] active:scale-95 transition-all"
              >
                <span>C'est parti</span>
                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] flex items-center justify-center text-white text-lg font-bold">
                  →
                </span>
              </button>
            </form>
          )}

          {step === 'loading' && (
            <div className="min-h-[100px] flex items-center justify-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1430] animate-bounce" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1430] animate-bounce [animation-delay:150ms]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1430] animate-bounce [animation-delay:300ms]" />
            </div>
          )}

          {step === 'found' && (
            <div className="flex flex-col gap-3.5 animate-fadeIn">
              {/* Carte Étudiant Identifié UPB */}
              <div className="flex items-center gap-3.5 p-2.5 rounded-[16px] bg-[#F1F4FA]">
                <div className="w-[52px] h-[52px] rounded-full bg-[#2F63D0] text-white flex items-center justify-center font-extrabold text-[19px] shrink-0 shadow-sm">
                  AK
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-extrabold text-[18px] text-[#0A1430] leading-tight">
                    Aya Kouassi
                  </span>
                  <span className="font-medium text-[13px] text-[#4A5168] truncate">
                    {matricule} · L2 · MIAGE
                  </span>
                </div>
              </div>

              {/* Consentement règlement */}
              <div
                onClick={() => setConsent(!consent)}
                className="flex items-start gap-3 cursor-pointer select-none pt-1"
              >
                <span
                  className={`w-7 h-7 rounded-[9px] border-[2.5px] border-[#0A1430] flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                    consent ? 'bg-[#0A1430] text-white' : 'bg-white'
                  }`}
                >
                  {consent && <Check size={16} strokeWidth={3} />}
                </span>
                <span className="font-medium text-[13px] leading-[1.45] text-[#3A3415]">
                  J'accepte l'utilisation de mes données pour le concours et le suivi de présence par QR code.{' '}
                  <span className="text-[#0A1430] font-extrabold underline">
                    En savoir plus
                  </span>
                </span>
              </div>

              {/* Bouton Créer mon compte */}
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="min-h-[52px] pl-5 pr-1.5 rounded-[16px] bg-[#0A1430] hover:bg-[#15254A] shadow-[0_12px_24px_rgba(10,20,48,0.22)] text-white font-extrabold text-[16px] flex items-center justify-between gap-3 cursor-pointer hover:scale-[1.01] active:scale-95 transition-all mt-1"
              >
                <span>Créer mon compte</span>
                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] flex items-center justify-center text-white text-lg font-bold">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="text-center font-bold text-[14px] text-[#3A3415] hover:text-[#0A1430] underline cursor-pointer"
              >
                Ce n'est pas moi
              </button>
            </div>
          )}

          {/* Lien Déjà inscrit */}
          <div className="text-center font-medium text-[14px] text-[#4A5168] pt-1">
            Déjà inscrit ?{' '}
            <Link
              to="/connexion"
              className="text-[#0A1430] font-extrabold underline hover:text-[#2F6BF0]"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
