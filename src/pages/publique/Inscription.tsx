import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, X, CheckCircle2 } from 'lucide-react';
import { invitesApi } from '../../services/invites';
import { ApiError, messageErreur } from '../../services/api';
import { InviteForm } from '../../components/invites/InviteForm';
import { RenvoiBadge } from '../../components/invites/RenvoiBadge';
import { toast } from 'react-hot-toast';

type MascotMood = 'idle' | 'focus' | 'err' | 'think' | 'happy' | 'joy';

const MOOD_CONFIGS: Record<
  MascotMood,
  {
    title: string;
    sub: string;
    mouthW: string;
    mouthH: string;
    mouthR: string;
    cheekOp: number;
    eyeSq: number;
  }
> = {
  idle: {
    title: 'Prêt pour le défi ?',
    sub: 'Entre ton matricule, on s’occupe du reste.',
    mouthW: '20px',
    mouthH: '8px',
    mouthR: '0 0 10px 10px',
    cheekOp: 0,
    eyeSq: 1,
  },
  focus: {
    title: 'Super, continue…',
    sub: 'Il figure sur ta carte d’étudiant.',
    mouthW: '10px',
    mouthH: '10px',
    mouthR: '50%',
    cheekOp: 0,
    eyeSq: 1,
  },
  err: {
    title: 'Oups !',
    sub: 'Ce matricule ne semble pas correct.',
    mouthW: '18px',
    mouthH: '6px',
    mouthR: '6px 6px 2px 2px',
    cheekOp: 0,
    eyeSq: 0.85,
  },
  think: {
    title: 'Je cherche…',
    sub: 'Une seconde, on vérifie ton matricule.',
    mouthW: '8px',
    mouthH: '4px',
    mouthR: '4px',
    cheekOp: 0,
    eyeSq: 1,
  },
  happy: {
    title: 'Te voilà !',
    sub: 'Vérifie que c’est bien toi.',
    mouthW: '26px',
    mouthH: '12px',
    mouthR: '0 0 14px 14px',
    cheekOp: 0.9,
    eyeSq: 1,
  },
  joy: {
    title: 'Génial !',
    sub: 'Il ne reste qu’à créer ton compte.',
    mouthW: '30px',
    mouthH: '15px',
    mouthR: '0 0 16px 16px',
    cheekOp: 0.9,
    eyeSq: 0.55,
  },
};

export default function Inscription() {
  const navigate = useNavigate();

  // État du matricule et navigation étape S8 (vide au départ comme dans le prototype)
  const [matricule, setMatricule] = useState<string>('');
  const [matStep, setMatStep] = useState<'input' | 'loading' | 'found'>('input');
  const [matErr, setMatErr] = useState<string | null>(null);
  const [matOk, setMatOk] = useState<boolean>(false); // Case à cocher consentement

  // Fenetre d'inscription des autres invites (particulier, entreprise, compte UPB)
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Etudiant UPB sans compte : resultat de la verification du matricule + coordonnees
  const [matInfo, setMatInfo] = useState<{ initiales: string; debut_nom: string; token: string } | null>(null);
  const [etuEmail, setEtuEmail] = useState('');
  const [etuNumero, setEtuNumero] = useState('');
  const [etuCode, setEtuCode] = useState('');
  const [etuLoading, setEtuLoading] = useState(false);
  const [etuInfo, setEtuInfoState] = useState<string | null>(null);
  const setEtuInfo = (m: string | null) => {
    setEtuInfoState(m);
    if (m) toast.success(m);
  };
  const [etuErr, setEtuErrState] = useState<string | null>(null);
  const setEtuErr = (m: string | null) => {
    setEtuErrState(m);
    if (m) toast.error(m);
  };
  const [etuCodeInvalide, setEtuCodeInvalide] = useState(false);
  const [etuCompteExistant, setEtuCompteExistant] = useState(false);
  const [etuSucces, setEtuSucces] = useState<{ emailEnvoye: boolean } | null>(null);

  const envoyerCodeEtudiant = async () => {
    setEtuErr(null);
    setEtuInfo(null);
    try {
      const r = await invitesApi.envoyerCode(etuEmail.trim());
      setEtuCodeInvalide(false);
      setEtuInfo(r.message);
    } catch (e) {
      setEtuErr(messageErreur(e));
    }
  };

  // Références DOM pour les animations
  const faceRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const armRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<SVGSVGElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Calcul de l'humeur active
  const mood: MascotMood =
    matStep === 'found'
      ? matOk
        ? 'joy'
        : 'happy'
      : matStep === 'loading'
      ? 'think'
      : matErr
      ? 'err'
      : matricule.trim().length > 0
      ? 'focus'
      : 'idle';

  const cfg = MOOD_CONFIGS[mood];

  // 1. Animation continue de la roue dentée (36s rotation)
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const anim = el.animate([{ rotate: '0deg' }, { rotate: '360deg' }], {
      duration: 36000,
      iterations: Infinity,
      easing: 'linear',
    });
    return () => anim.cancel();
  }, []);

  // 2. Clignement périodique des yeux (toutes les 2.5s à 5s)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let active = true;

    const blink = () => {
      const eyes = document.querySelectorAll<HTMLElement>('[data-eye="1"]');
      eyes.forEach((eye) => {
        eye.animate(
          [
            { transform: 'scale(1, 1)' },
            { transform: 'scale(1, 0.08)', offset: 0.45 },
            { transform: 'scale(1, 1)' },
          ],
          { duration: 220, easing: 'ease-in-out' }
        );
      });
      if (active) {
        timer = setTimeout(blink, 2500 + Math.random() * 2500);
      }
    };

    timer = setTimeout(blink, 1500);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  // 3. Suivi du regard (Souris / Curseur trigonométrique)
  useEffect(() => {
    const look = (cx: number, cy: number) => {
      const pupils = document.querySelectorAll<HTMLElement>('[data-pupil="1"]');
      pupils.forEach((p) => {
        const k = Number(p.dataset.k || 6);
        const rect = p.getBoundingClientRect();
        const ox = rect.left + rect.width / 2;
        const oy = rect.top + rect.height / 2;
        const dx = cx - ox;
        const dy = cy - oy;
        const dist = Math.hypot(dx, dy) || 1;
        const r = Math.min(dist / 30, k);
        p.style.transform = `translate(${((dx / dist) * r).toFixed(1)}px, ${((dy / dist) * r).toFixed(1)}px)`;
      });
    };

    // Lors de la frappe, les yeux se concentrent vers l'input
    if (mood === 'focus') {
      const inp = inputRef.current;
      if (inp) {
        const r = inp.getBoundingClientRect();
        look(r.left + r.width / 2, r.top + r.height / 2);
        return;
      }
    }

    // Regard de réflexion circulaire pendant le chargement
    if (mood === 'think') {
      let t = 0;
      let raf: number;
      const spin = () => {
        t += 0.06;
        const face = faceRef.current;
        if (face) {
          const r = face.getBoundingClientRect();
          look(
            r.left + r.width / 2 + Math.cos(t) * 300,
            r.top + r.height / 2 + Math.sin(t) * 300
          );
        }
        raf = requestAnimationFrame(spin);
      };
      raf = requestAnimationFrame(spin);
      return () => cancelAnimationFrame(raf);
    }

    // Suivi par défaut du pointeur souris
    const handlePointerMove = (ev: PointerEvent) => {
      look(ev.clientX, ev.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mood]);

  // Validation et transition vers loading puis found
  const handleMatNext = () => {
    const v = matricule.trim();
    // Validation du matricule (lettres, chiffres, tirets : 6 à 14 caractères)
    if (!/^[A-Z0-9-]{6,14}$/i.test(v)) {
      const head = headRef.current;
      if (head) {
        head.animate(
          [
            { rotate: '0deg' },
            { rotate: '-14deg' },
            { rotate: '12deg' },
            { rotate: '-8deg' },
            { rotate: '5deg' },
            { rotate: '0deg' },
          ],
          { duration: 560, easing: 'ease-in-out' }
        );
      }
      setMatErr(
        v ? 'Format invalide : 6 à 12 lettres ou chiffres, sans espace.' : 'Saisis ton matricule pour continuer.'
      );
      return;
    }

    setMatErr(null);
    setMatStep('loading');

    invitesApi.verifierMatricule(v).then((info) => {
      setMatInfo(info);
      setMatStep('found');

      // Animation festive de célébration : rebond du visage et salut du bras
      const face = faceRef.current;
      if (face) {
        face.animate(
          [
            { translate: '0 0', scale: '1 1' },
            { translate: '0 4px', scale: '1.06 0.92', offset: 0.15 },
            { translate: '0 -34px', scale: '0.96 1.06', offset: 0.45 },
            { translate: '0 0', scale: '1.05 0.94', offset: 0.75 },
            { translate: '0 0', scale: '1 1' },
          ],
          { duration: 760, easing: 'ease-out' }
        );
      }

      const arm = armRef.current;
      if (arm) {
        arm.animate(
          [
            { rotate: '0deg' },
            { rotate: '-22deg' },
            { rotate: '10deg' },
            { rotate: '-22deg' },
            { rotate: '10deg' },
            { rotate: '0deg' },
          ],
          { duration: 900 }
        );
      }
    }).catch((err) => {
      setMatStep('input');
      setEtuCompteExistant(err instanceof ApiError && err.code === 'compte_existant');
      setMatErr(messageErreur(err));
      toast.error(messageErreur(err));
    });
  };

  const handleReset = () => {
    setMatStep('input');
    setMatricule('');
    setMatErr(null);
    setMatOk(false);
    setMatInfo(null);
    setEtuErr(null);
    setEtuInfo(null);
    setEtuSucces(null);
  };

  const handleFinalSubmit = async () => {
    if (!matOk || !matInfo || etuLoading) return;
    if (!etuEmail.trim() || !etuNumero.trim() || etuCode.length !== 6) {
      setEtuErr('Renseignez votre e-mail, votre téléphone et le code à 6 chiffres reçu par e-mail.');
      return;
    }
    setEtuLoading(true);
    setEtuErr(null);
    setEtuInfo(null);
    try {
      const r = await invitesApi.inscrire({
        type_invite: 'etudiant_upb',
        token: matInfo.token,
        email: etuEmail.trim(),
        numero: etuNumero.trim(),
        code: etuCode.trim(),
        consentement: true,
      });
      setEtuSucces({ emailEnvoye: r.email_envoye });
      toast.success('Inscription validée !');
    } catch (err) {
      setEtuErr(messageErreur(err));
      if (err instanceof ApiError) {
        setEtuCodeInvalide(err.code === 'code_invalide');
        setEtuCompteExistant(err.code === 'compte_existant');
      }
    } finally {
      setEtuLoading(false);
    }
  };

  return (
    <div
      data-screen-label="S8 Creer un compte"
      className="w-full min-h-screen bg-[#BFD6FF] bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(255,255,255,0.55),transparent_70%)] flex items-center justify-center pt-[100px] pb-10 px-5 relative select-none box-border"
    >
      {/* CARTE BLANCHE CENTRALE AUTHENTIQUE (S8 Prototype exact en Tailwind CSS) */}
      <div className="relative w-full max-w-[360px] rounded-[36px] p-[10px_10px_20px] flex flex-col gap-4 overflow-hidden shadow-[0_40px_80px_rgba(20,60,150,0.22),0_8px_20px_rgba(20,60,150,0.08)] bg-white">
        {/* Bouton retour circulaire ← */}
        <Link
          to="/"
          data-go="BACK"
          aria-label="Retour au site"
          className="absolute top-5 left-5 z-[3] w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer shadow-[0_4px_12px_rgba(10,20,48,0.1)] no-underline hover:scale-105 active:scale-95 transition-transform"
        >
          ←
        </Link>

        {/* 1. VOLET SUPÉRIEUR BLEU GRISÉ #E7EDF7 AVEC MASCOTTE ANIMÉE */}
        <div className="relative rounded-[28px] bg-[#E7EDF7] pt-[22px] px-3 pb-0 flex flex-col items-center overflow-hidden">
          {/* Titre et Sous-titre dynamiques pilotés par l'humeur */}
          <div className="flex flex-col gap-1.5 items-center text-center px-10">
            <h1 className="m-0 font-extrabold text-[24px] leading-[1.1] text-[#0A1430] tracking-[-0.02em] font-sans">
              {cfg.title}
            </h1>
            <span className="font-semibold text-[14px] leading-[1.4] text-[#4A5168] [text-wrap:pretty] font-sans">
              {cfg.sub}
            </span>
          </div>

          {/* Mascotte Robot UPB Interactive */}
          <div
            role="img"
            aria-label="Mascotte GÉNIE UPB"
            className="relative self-center mt-2.5 -mb-1.5 w-[169px] h-[195px] overflow-hidden"
          >
            <div className="relative w-[260px] h-[300px] scale-[0.65] origin-top-left">
              {/* Roue dentée de fond avec rotation continue 36s */}
              <svg
                ref={wheelRef}
                data-wheel="1"
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
                <path
                  d="M62 190 A78 78 0 1 1 198 190"
                  fill="none"
                  stroke="#78B4DA"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>

              {/* Éléments de structure robotique base / livre ouvert */}
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

              {/* Visage et corps du Robot avec data-face="1" */}
              <div
                ref={faceRef}
                data-face="1"
                className="absolute left-0 top-0 w-[260px] h-[300px]"
              >
                {/* Barres réseau gauche */}
                <div className="absolute left-[30px] top-[96px] w-[34px] h-[30px] flex items-end gap-1">
                  <span className="w-2 h-3 bg-[#10357E] rounded-[2px]" />
                  <span className="w-2 h-5 bg-[#10357E] rounded-[2px]" />
                  <span className="w-2 h-[30px] bg-[#10357E] rounded-[2px]" />
                </div>

                {/* Torse */}
                <div className="absolute left-[92px] top-[146px] w-[76px] h-[92px] rounded-[50%_50%_50%_50%_/_36%_36%_64%_64%] bg-[#10357E]" />

                {/* Bras avec data-arm="1" */}
                <div
                  ref={armRef}
                  data-arm="1"
                  className="absolute left-[87px] top-[122px] w-[17px] h-[54px] rounded-[9px] bg-[#10357E] origin-[50%_100%] -rotate-[38deg]"
                >
                  <span className="absolute -left-1 -top-3 w-6 h-6 rounded-full bg-[#10357E]" />
                </div>

                {/* Badge étudiant */}
                <div className="absolute left-[134px] top-[168px] w-[38px] h-[48px] box-border border-[3px] border-[#10357E] rounded-[5px] bg-white -rotate-[5deg] flex flex-col gap-1 pt-3 px-1.5">
                  <span className="absolute left-[9px] -top-2 w-3.5 h-[9px] rounded-[3px] bg-[#10357E]" />
                  <span className="h-[3px] w-5 rounded-[2px] bg-[#10357E]" />
                  <span className="h-[3px] w-3.5 rounded-[2px] bg-[#10357E]" />
                  <span className="h-[3px] w-4 rounded-[2px] bg-[#10357E]" />
                  <span className="h-[3px] w-2.5 rounded-[2px] bg-[#10357E]" />
                </div>

                {/* Tête robot avec data-head="1" */}
                <div
                  ref={headRef}
                  data-head="1"
                  className="absolute left-0 top-0 w-[260px] h-[170px] origin-[130px_160px]"
                >
                  {/* Antenne */}
                  <span className="absolute left-[128px] top-[42px] w-1 h-6 bg-[#10357E]" />
                  <span className="absolute left-[123px] top-[30px] w-3.5 h-3.5 rounded-full bg-[#10357E]" />

                  {/* Oreilles casque */}
                  <span className="absolute left-[58px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />
                  <span className="absolute left-[186px] top-[98px] w-4 h-8 rounded-[6px] bg-[#10357E]" />

                  {/* Casque bleu foncé */}
                  <div className="absolute left-[68px] top-[62px] w-[124px] h-[96px] rounded-[50%_50%_44%_44%_/_56%_56%_44%_44%] bg-[#10357E]" />

                  {/* Visage blanc */}
                  <div className="absolute left-[82px] top-[74px] w-[96px] h-[70px] rounded-[50%_50%_42%_42%_/_58%_58%_42%_42%] bg-white" />

                  {/* Yeux interactifs qui suivent la souris (data-eye & data-pupil) */}
                  <div className="absolute left-[82px] top-[90px] w-[96px] h-[26px] flex justify-center gap-[22px]">
                    <div
                      data-eye="1"
                      className="relative w-[22px] h-[26px] transition-transform duration-300"
                      style={{ transform: `scaleY(${cfg.eyeSq})` }}
                    >
                      <div
                        data-pupil="1"
                        data-k="6"
                        className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E] transition-transform duration-[120ms] ease-out"
                      />
                    </div>

                    <div
                      data-eye="1"
                      className="relative w-[22px] h-[26px] transition-transform duration-300"
                      style={{ transform: `scaleY(${cfg.eyeSq})` }}
                    >
                      <div
                        data-pupil="1"
                        data-k="6"
                        className="absolute left-0.5 top-0.5 w-[18px] h-[22px] rounded-full bg-[#10357E] transition-transform duration-[120ms] ease-out"
                      />
                    </div>
                  </div>

                  {/* Joues roses rougissantes (#F29A9A) */}
                  <span
                    className="absolute left-[91px] top-[120px] w-3.5 h-[7px] rounded-[50%] bg-[#F29A9A] transition-opacity duration-300"
                    style={{ opacity: cfg.cheekOp }}
                  />
                  <span
                    className="absolute left-[155px] top-[120px] w-3.5 h-[7px] rounded-[50%] bg-[#F29A9A] transition-opacity duration-300"
                    style={{ opacity: cfg.cheekOp }}
                  />

                  {/* Bouche morphing selon l'humeur */}
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

          {/* Dégradé doux bas du volet bleu grisé */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 bottom-0 h-[46px] bg-gradient-to-b from-[rgba(231,237,247,0)] to-[#E7EDF7] pointer-events-none"
          />
        </div>

        {/* 2. FORMULAIRE D'ACTION DE LA CARTE S8 (Strictement conforme au prototype - aucun trait inventé) */}
        <div className="flex flex-col gap-3 px-2">
          {/* Étape 1 : Saisie du matricule */}
          {matStep === 'input' && (
            <>
              <label className="flex flex-col gap-2 text-center">
                <input
                  ref={inputRef}
                  data-mat-input="1"
                  value={matricule}
                  onChange={(e) => {
                    setMatricule(e.target.value);
                    if (matErr) setMatErr(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleMatNext();
                  }}
                  placeholder="Ton matricule"
                  autoComplete="off"
                  className={`min-h-[52px] rounded-[14px] border-2 text-center px-5 font-bold text-[17px] tracking-[0.12em] uppercase text-[#0A1430] outline-none transition-all duration-200 focus:bg-white font-sans ${
                    matErr
                      ? 'border-[#C8372D] bg-white'
                      : 'border-transparent bg-[#0A1430]/[0.07]'
                  }`}
                />
                <span
                  className={`font-semibold text-[14px] leading-[1.4] font-sans ${
                    matErr ? 'text-[#B4281F]' : 'text-[#6A7189]'
                  }`}
                >
                  {matErr || '6 à 12 lettres ou chiffres, sans espace.'}
                  {etuCompteExistant && matErr && (
                    <>
                      {' '}
                      <Link to="/connexion" className="underline font-extrabold">
                        Se connecter
                      </Link>
                    </>
                  )}
                </span>
              </label>

              <span
                onClick={handleMatNext}
                data-shine="1"
                className="min-h-[52px] pl-5 pr-1.5 rounded-[16px] bg-[#0A1430] shadow-[0_12px_24px_rgba(10,20,48,0.22)] text-white font-extrabold text-[16px] flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] font-sans"
              >
                C'est parti{' '}
                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[18px]">
                  →
                </span>
              </span>
            </>
          )}

          {/* Étape 2 : Chargement / Réflexion (3 points rebondissants) */}
          {matStep === 'loading' && (
            <div className="min-h-[100px] flex items-center justify-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1430] animate-bounce" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1430] animate-bounce [animation-delay:0.15s]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#0A1430] animate-bounce [animation-delay:0.3s]" />
            </div>
          )}

          {/* Étape 3 : Étudiant identifié */}
          {matStep === 'found' && etuSucces && (
            <div className="flex flex-col gap-3 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 size={30} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-[18px] text-[#0A1430] font-sans">Inscription validée</span>
              <span className="font-medium text-[14px] text-[#4A5168] font-sans">
                {etuSucces.emailEnvoye
                  ? 'Votre badge a été envoyé par e-mail, avec le lien pour définir le mot de passe de votre compte Genie UPB.'
                  : 'Votre inscription est valable, mais l\'e-mail n\'a pas pu être envoyé. Demandez le renvoi du badge ci-dessous.'}
              </span>
              {!etuSucces.emailEnvoye && <RenvoiBadge emailInitial={etuEmail} />}
              <Link to="/connexion" className="font-extrabold text-[15px] text-[#0A1430] underline font-sans">
                Aller à la connexion
              </Link>
            </div>
          )}

          {matStep === 'found' && !etuSucces && (
            <>
              {/* Carte identité étudiante trouvée */}
              <div className="flex gap-3.5 items-center p-2.5 rounded-[16px] bg-[#F1F4FA]">
                <span className="w-[52px] h-[52px] shrink-0 rounded-full bg-[#2F63D0] text-white grid place-items-center font-extrabold text-[13px] tracking-tight font-sans">
                  {matInfo?.initiales ?? ''}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-extrabold text-[19px] text-[#0A1430] font-sans">
                    {matInfo?.debut_nom ?? ''}
                  </span>
                  <span className="font-medium text-[14px] text-[#4A5168] font-sans">
                    {matricule.toUpperCase()}
                  </span>
                </div>
              </div>

              <input type="email" value={etuEmail} onChange={(e) => setEtuEmail(e.target.value)} placeholder="Ton e-mail" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-transparent bg-[#0A1430]/[0.07] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:bg-white focus:border-[#0A1430] transition-all font-sans" />
              <input type="tel" value={etuNumero} onChange={(e) => setEtuNumero(e.target.value)} placeholder="Ton numéro de téléphone" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-transparent bg-[#0A1430]/[0.07] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:bg-white focus:border-[#0A1430] transition-all font-sans" />
              <div className="flex gap-2">
                <input value={etuCode} onChange={(e) => setEtuCode(e.target.value.replace(/\D/g, ''))} inputMode="numeric" maxLength={6} placeholder="Code reçu par e-mail" className="w-full h-11 px-3.5 rounded-[12px] border-2 border-transparent bg-[#0A1430]/[0.07] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:bg-white focus:border-[#0A1430] transition-all font-sans" />
                <button
                  type="button"
                  onClick={envoyerCodeEtudiant}
                  disabled={!etuEmail.trim()}
                  className="shrink-0 px-3 rounded-[12px] bg-[#0A1430] text-white font-bold text-[13px] font-sans disabled:opacity-50"
                >
                  {etuInfo || etuCodeInvalide ? 'Nouveau code' : 'Envoyer le code'}
                </button>
              </div>
              {etuCompteExistant && (
                <Link to="/connexion" className="text-center font-extrabold text-[14px] text-[#0A1430] underline font-sans">
                  Se connecter
                </Link>
              )}

              {/* Consentement d'utilisation des données */}
              <div
                onClick={() => setMatOk(!matOk)}
                className="flex gap-3 cursor-pointer items-start select-none"
              >
                <span
                  className={`shrink-0 w-7 h-7 rounded-[9px] border-[2.5px] border-[#0A1430] grid place-items-center font-extrabold text-[15px] transition-colors duration-200 ${
                    matOk ? 'bg-[#0E1E4A] text-[#A9C2FF]' : 'bg-white text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span className="font-medium text-[14px] leading-[1.45] text-[#3A3415] font-sans">
                  J'accepte l'utilisation de mes données pour le concours et le suivi de présence
                  par QR code.{' '}
                  <span className="text-[#0A1430] font-extrabold underline">
                    En savoir plus
                  </span>
                </span>
              </div>

              {/* Bouton Créer mon compte */}
              <span
                onClick={handleFinalSubmit}
                data-shine="1"
                className={`min-h-[52px] pl-5 pr-1.5 rounded-[16px] font-extrabold text-[16px] flex items-center justify-between gap-3 transition-all duration-300 font-sans ${
                  matOk
                    ? 'bg-[#0A1430] text-white cursor-pointer shadow-[0_12px_24px_rgba(10,20,48,0.22)] hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-[#0A1430]/[0.12] text-[#8A8260] cursor-default'
                }`}
              >
                {etuLoading ? 'Création...' : 'Créer mon compte'}{' '}
                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[18px]">
                  →
                </span>
              </span>

              {/* Réinitialisation */}
              <span
                onClick={handleReset}
                className="text-center font-bold text-[15px] text-[#3A3415] cursor-pointer underline font-sans hover:opacity-80 transition-opacity"
              >
                Ce n'est pas moi
              </span>
            </>
          )}

          {/* Lien connexion */}
          <div className="text-center text-[13px] text-[#6A7189] font-sans">
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="text-[#0A1430] font-extrabold underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      {/* Bouton flottant en bas à droite : S'inscrire en tant qu'invité */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30">
        <button
          type="button"
          onClick={() => setInviteModalOpen(true)}
          className="group flex items-center gap-3 rounded-full bg-[#0A1430] pl-4 pr-5 py-3 text-white font-extrabold text-[14px] shadow-[0_12px_30px_rgba(10,20,48,0.28)] border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] hover:bg-[#14234b] hover:shadow-[0_16px_36px_rgba(10,20,48,0.38)]"
          title="Vous n'avez pas de matricule ? Inscrivez-vous en tant qu'invité"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white shadow-sm transition-transform duration-300 group-hover:rotate-12">
            <UserPlus size={18} strokeWidth={2.5} />
          </span>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase font-bold text-[#FF9A3D] tracking-wider">
              Accès Visiteur
            </span>
            <span className="text-[13px] sm:text-[14px] font-extrabold text-white">
              S'inscrire en tant qu'invité
            </span>
          </div>
        </button>
      </div>

      {/* Fenetre d'inscription des autres invites */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0A1430]/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-[480px] bg-white rounded-[28px] shadow-2xl p-6 sm:p-8 border border-white/40 my-auto text-[#0A1430]">
            <button
              type="button"
              onClick={() => setInviteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6A7189] hover:text-[#0A1430] hover:bg-slate-100 transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
            <InviteForm onClose={() => setInviteModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
