import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';

type PhaseState = 'ouvertes' | 'bientot' | 'closes';

export default function Inscription() {
  const navigate = useNavigate();

  // Phase du concours (par défaut ouvertes, avec bascule de test GB/GC du prototype)
  const [phase, setPhase] = useState<PhaseState>('ouvertes');

  // Valeur du matricule
  const [matricule, setMatricule] = useState<string>('UPB-2026-8841');
  const [step, setStep] = useState<'input' | 'loading' | 'found'>('input');
  const [consent, setConsent] = useState<boolean>(true);

  // Mascotte interactive : clignement et sourire
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
      className="min-h-screen bg-[#BFD6FF] flex items-center justify-center p-4 sm:p-6 relative select-none"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.55), transparent 70%)',
      }}
    >
      {/* 0. DISCRET SÉLECTEUR D'ÉTATS PROTOTYPE (Ouvertes / Bientôt ouvertes GB / Closes GC) */}
      <div className="absolute top-4 right-4 z-40 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm flex items-center gap-1.5 text-xs font-bold text-slate-700">
        <span className="text-[10px] text-slate-400 font-mono">Phase :</span>
        <button
          type="button"
          onClick={() => setPhase('ouvertes')}
          className={`px-2 py-0.5 rounded cursor-pointer ${
            phase === 'ouvertes' ? 'bg-[#0E1E4A] text-white' : 'hover:bg-slate-100'
          }`}
        >
          Ouvertes
        </button>
        <button
          type="button"
          onClick={() => setPhase('bientot')}
          className={`px-2 py-0.5 rounded cursor-pointer ${
            phase === 'bientot' ? 'bg-[#E8B33D] text-[#0A1430]' : 'hover:bg-slate-100'
          }`}
        >
          Bientôt (GB)
        </button>
        <button
          type="button"
          onClick={() => setPhase('closes')}
          className={`px-2 py-0.5 rounded cursor-pointer ${
            phase === 'closes' ? 'bg-[#B4281F] text-white' : 'hover:bg-slate-100'
          }`}
        >
          Closes (GC)
        </button>
      </div>

      {/* 1. CARTE BLANCHE CENTRALE AUTHENTIQUE (S8 Prototype exact) */}
      <div className="relative w-full max-w-[360px] rounded-[36px] p-[10px_10px_20px] flex flex-col gap-4 overflow-hidden shadow-[0_40px_80px_rgba(20,60,150,0.22),0_8px_20px_rgba(20,60,150,0.08)] bg-white my-auto animate-scaleUp">
        {/* Bouton retour circulaire ← */}
        <Link
          to="/"
          aria-label="Retour au site"
          className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-white text-[#0A1430] font-bold text-xl flex items-center justify-center shadow-md hover:bg-slate-50 active:scale-95 transition-transform"
        >
          ←
        </Link>

        {/* 2. VOLET SUPÉRIEUR BLEU GRISÉ #E7EDF7 AVEC MASCOTTE ANIMÉE */}
        <div className="relative rounded-[28px] bg-[#E7EDF7] pt-[22px] px-3 pb-0 flex flex-col items-center overflow-hidden">
          {/* Titre et Sous-titre */}
          <div className="flex flex-col gap-1.5 items-center text-center px-10">
            <h1 className="m-0 font-black text-[24px] leading-[1.1] text-[#0A1430] tracking-tight">
              {phase === 'ouvertes' && "Rejoins l'aventure !"}
              {phase === 'bientot' && 'Inscriptions bientôt ouvertes'}
              {phase === 'closes' && 'Inscriptions closes'}
            </h1>
            <span className="font-semibold text-[14px] leading-[1.4] text-[#4A5168]">
              {phase === 'ouvertes' &&
                'Entre ton matricule étudiant UPB pour créer ton compte'}
              {phase === 'bientot' &&
                'Ouverture officielle de la plateforme le 23 novembre 2026 à 00h00.'}
              {phase === 'closes' &&
                'La période de dépôt des candidatures pour cette édition est terminée.'}
            </span>
          </div>

          {/* Mascotte Officielle SVG Animée GÉNIE UPB */}
          <div
            role="img"
            aria-label="Mascotte GÉNIE UPB"
            className="relative self-center mt-2.5 -mb-1.5 w-[169px] h-[195px] overflow-visible"
          >
            <div className="relative w-[260px] h-[300px] scale-[0.65] origin-top-left">
              {/* Roue dentée animée */}
              <svg
                viewBox="0 0 260 260"
                className="absolute left-0 top-0 w-[260px] h-[260px] overflow-visible origin-center animate-[spin_24s_linear_infinite]"
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

              {/* Corps et tête du robot */}
              <svg viewBox="0 0 260 260" className="absolute left-0 top-0 w-[260px] h-[260px]">
                <path
                  d="M62 190 A78 78 0 1 1 198 190"
                  fill="none"
                  stroke="#78B4DA"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>

              {/* Visage et expression */}
              <div className="absolute left-0 top-0 w-[260px] h-[300px]">
                {/* Torse */}
                <div className="absolute left-[92px] top-[146px] w-[76px] h-[92px] rounded-[50%_50%_50%_50%/36%_36%_64%_64%] bg-[#10357E]" />

                {/* Bras articulé */}
                <div className="absolute left-[87px] top-[122px] w-[17px] h-[54px] rounded-[9px] bg-[#10357E] origin-bottom -rotate-[38deg]">
                  <span className="absolute -left-[4px] -top-[12px] w-[24px] h-[24px] rounded-full bg-[#10357E]" />
                </div>

                {/* Bloc-notes */}
                <div className="absolute left-[134px] top-[168px] w-[38px] h-[48px] border-[3px] border-[#10357E] rounded-[5px] bg-white -rotate-[5deg] flex flex-col gap-[5px] pt-3 px-1.5">
                  <span className="absolute left-[9px] -top-[8px] w-[14px] h-[9px] rounded-[3px] bg-[#10357E]" />
                  <span className="h-[3px] w-[20px] rounded-[2px] bg-[#10357E]" />
                  <span className="h-[3px] w-[14px] rounded-[2px] bg-[#10357E]" />
                  <span className="h-[3px] w-[18px] rounded-[2px] bg-[#78B4DA]" />
                </div>
                <span className="absolute left-[158px] top-[194px] w-[20px] h-[20px] rounded-full bg-[#10357E] border-2 border-white" />

                {/* Tête */}
                <div className="absolute left-0 top-0 w-[260px] h-[170px]">
                  {/* Antenne */}
                  <span className="absolute left-[128px] top-[42px] w-[4px] h-[24px] bg-[#10357E]" />
                  <span className="absolute left-[123px] top-[30px] w-[14px] h-[14px] rounded-full bg-[#10357E]" />
                  {/* Oreilles */}
                  <span className="absolute left-[58px] top-[98px] w-[16px] h-[32px] rounded-[6px] bg-[#10357E]" />
                  <span className="absolute left-[186px] top-[98px] w-[16px] h-[32px] rounded-[6px] bg-[#10357E]" />
                  {/* Contour tête */}
                  <div className="absolute left-[68px] top-[62px] w-[124px] h-[96px] rounded-[50%_50%_44%_44%/56%_56%_44%_44%] bg-[#10357E]" />
                  <div className="absolute left-[82px] top-[74px] w-[96px] h-[70px] rounded-[50%_50%_42%_42%/58%_58%_42%_42%] bg-white" />

                  {/* Yeux expressifs */}
                  <div className="absolute left-[82px] top-[90px] w-[96px] h-[26px] flex justify-center gap-[22px]">
                    <div className="relative w-[22px] h-[26px]">
                      <div className="absolute left-[2px] top-[2px] w-[18px] h-[22px] rounded-full bg-[#10357E] animate-pulse" />
                    </div>
                    <div className="relative w-[22px] h-[26px]">
                      <div className="absolute left-[2px] top-[2px] w-[18px] h-[22px] rounded-full bg-[#10357E] animate-pulse" />
                    </div>
                  </div>

                  {/* Joues roses */}
                  <span className="absolute left-[91px] top-[120px] w-[14px] h-[7px] rounded-full bg-[#F29A9A]" />
                  <span className="absolute left-[155px] top-[120px] w-[14px] h-[7px] rounded-full bg-[#F29A9A]" />

                  {/* Bouche souriante */}
                  <div className="absolute left-[82px] top-[124px] w-[96px] h-[16px] flex justify-center items-start">
                    <span
                      className={`h-[4px] rounded-full bg-[#10357E] transition-all duration-300 ${
                        mouthHappy ? 'w-[28px] h-[6px] rounded-b-full' : 'w-[18px]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dégradé doux vers le bas du volet */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 bottom-0 h-[46px] bg-gradient-to-b from-transparent to-[#E7EDF7] pointer-events-none"
          />
        </div>

        {/* 3. FLUX DU FORMULAIRE SELON LA PHASE ET L'ÉTAT */}
        {phase === 'ouvertes' ? (
          <div className="flex flex-col gap-3 px-2">
            {step === 'input' && (
              <form onSubmit={handleMatriculeSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value.toUpperCase())}
                    placeholder="Ton matricule"
                    autoComplete="off"
                    className="min-h-[52px] rounded-[14px] border-2 border-[#D6D2C8] text-center bg-[#0A1430]/[0.07] px-5 font-bold text-[17px] tracking-[0.12em] uppercase text-[#0A1430] outline-none focus:bg-white focus:border-[#0A1430] transition-colors"
                  />
                  <span className="text-center font-semibold text-[13px] text-[#6A7189]">
                    Format : UPB-XXXX-XXXX (ex: UPB-2026-8841)
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
        ) : phase === 'bientot' ? (
          /* ÉTAT : INSCRIPTIONS BIENTÔT OUVERTES (GB) */
          <div className="flex flex-col gap-4 px-2 text-center py-2 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[#8A5A00] text-xs font-semibold leading-relaxed">
              Les serveurs d'inscription ouvrent le <strong>23 novembre 2026</strong>. Préparez votre matricule UPB et constituez votre équipe.
            </div>

            <Link
              to="/concours"
              className="min-h-[50px] px-6 rounded-[16px] bg-[#0A1430] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#15254A] transition-colors"
            >
              <span>Découvrir les 4 catégories</span>
              <span>→</span>
            </Link>

            <Link
              to="/connexion"
              className="text-xs font-bold text-[#0A1430] underline"
            >
              Accès administration & formateurs
            </Link>
          </div>
        ) : (
          /* ÉTAT : INSCRIPTIONS CLOSES (GC) */
          <div className="flex flex-col gap-4 px-2 text-center py-2 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-[#B4281F] text-xs font-semibold leading-relaxed">
              Les inscriptions sont officiellement clôturées. Les équipes retenues débutent les masterclasses le <strong>21 décembre 2026</strong>.
            </div>

            <Link
              to="/calendrier"
              className="min-h-[50px] px-6 rounded-[16px] bg-[#0A1430] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#15254A] transition-colors"
            >
              <span>Consulter le calendrier du tournoi</span>
              <span>→</span>
            </Link>

            <Link
              to="/connexion"
              className="text-xs font-bold text-[#0A1430] underline"
            >
              Espace candidat (Connexion)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
