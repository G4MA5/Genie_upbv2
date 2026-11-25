import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';
import { AvisRedirectionUpb, URL_BASE_ETUDIANTS_UPB, useRedirectionBaseUpb } from '../../hooks/useRedirectionBaseUpb';
import { api, ApiError, session } from '../../lib/api';
import { casse, cursus } from '../../lib/format';
import type { Etudiant } from '../../types/espace';

type MascotMood = 'idle' | 'focus' | 'err' | 'think' | 'happy' | 'joy' | 'retour' | 'courrier';

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
    sub: 'Plus qu’à confirmer ton e-mail.',
    mouthW: '30px',
    mouthH: '15px',
    mouthR: '0 0 16px 16px',
    cheekOp: 0.9,
    eyeSq: 0.55,
  },
  retour: {
    title: 'Content de te revoir !',
    sub: 'Confirme ton e-mail pour te connecter.',
    mouthW: '26px',
    mouthH: '12px',
    mouthR: '0 0 14px 14px',
    cheekOp: 0.9,
    eyeSq: 1,
  },
  courrier: {
    title: 'Regarde tes e-mails',
    sub: 'Entre le code à 5 chiffres reçu.',
    mouthW: '22px',
    mouthH: '10px',
    mouthR: '0 0 12px 12px',
    cheekOp: 0.5,
    eyeSq: 1,
  },
};

const CODE_LONGUEUR = 5;
const DELAI_RENVOI_S = 30;

export default function Inscription() {
  const navigate = useNavigate();

  // État du matricule et navigation étape S8 (vide au départ comme dans le prototype)
  const [matricule, setMatricule] = useState<string>('');
  const [matStep, setMatStep] = useState<'input' | 'loading' | 'found' | 'code'>('input');
  const [matErr, setMatErr] = useState<string | null>(null);
  const [matOk, setMatOk] = useState<boolean>(false); // Case à cocher consentement
  const [hebergement, setHebergement] = useState<boolean>(false); // Besoin d'être logé sur place
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null); // Étudiant trouvé dans la base UPB
  const [envoi, setEnvoi] = useState(false);
  // Confirmation de l'e-mail du dossier puis code à 5 chiffres
  const [statutCompte, setStatutCompte] = useState<'existant' | 'nouveau'>('nouveau');
  const [emailMasque, setEmailMasque] = useState<string | null>(null);
  // Dossier UPB sans e-mail, nom, filière… : on propose seulement de le compléter sur dbupb
  const [dossierIncomplet, setDossierIncomplet] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [etapeErr, setEtapeErr] = useState<string | null>(null);
  const [renvoiDans, setRenvoiDans] = useState(0);
  const codeRef = useRef<HTMLInputElement | null>(null);
  // Matricule inconnu : redirection vers la base des étudiants UPB
  const redirectionUpb = useRedirectionBaseUpb();

  // État du modal d'inscription invité
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Références DOM pour les animations
  const faceRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const armRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<SVGSVGElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Calcul de l'humeur active
  const mood: MascotMood =
    matStep === 'code'
      ? 'courrier'
      : matStep === 'found'
      ? statutCompte === 'existant'
        ? 'retour'
        : matOk
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

  // Déjà connecté (session encore valable) : directement l'espace, pas de nouvelle saisie du matricule.
  useEffect(() => {
    if (session.get()) navigate('/espace/dashboard', { replace: true });
  }, [navigate]);

  // Compte à rebours avant de pouvoir redemander un code
  useEffect(() => {
    if (renvoiDans <= 0) return;
    const t = setTimeout(() => setRenvoiDans((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [renvoiDans]);

  // Le champ du code prend le focus dès qu'il apparaît
  useEffect(() => {
    if (matStep === 'code') codeRef.current?.focus();
  }, [matStep]);

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

  const secouerTete = () => {
    headRef.current?.animate(
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
  };

  // Animation festive de célébration : rebond du visage et salut du bras
  const celebrer = () => {
    faceRef.current?.animate(
      [
        { translate: '0 0', scale: '1 1' },
        { translate: '0 4px', scale: '1.06 0.92', offset: 0.15 },
        { translate: '0 -34px', scale: '0.96 1.06', offset: 0.45 },
        { translate: '0 0', scale: '1.05 0.94', offset: 0.75 },
        { translate: '0 0', scale: '1 1' },
      ],
      { duration: 760, easing: 'ease-out' }
    );
    armRef.current?.animate(
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
  };

  // Vérification du matricule auprès du backend (base des étudiants UPB)
  const handleMatNext = async () => {
    const v = matricule.replace(/\s+/g, '').toUpperCase();
    if (!/^[A-Z0-9]{6,40}$/.test(v)) {
      secouerTete();
      setMatErr(v ? 'Format invalide : lettres et chiffres uniquement, sans espace.' : 'Saisis ton matricule pour continuer.');
      return;
    }

    setMatErr(null);
    setMatStep('loading');
    try {
      const rep = await api.identifier(v);
      // Aucune session à ce stade : il faut d'abord confirmer l'e-mail du dossier par un code.
      setEtudiant(rep.etudiant);
      setStatutCompte(rep.statut);
      setEmailMasque(rep.email_masque);
      setDossierIncomplet(rep.dossier_incomplet);
      if (rep.dossier_incomplet) redirectionUpb.lancer();
      setMatricule(rep.etudiant.matricule);
      setEmail('');
      setCode('');
      setEtapeErr(null);
      setMatStep('found');
      celebrer();
    } catch (err) {
      setMatStep('input');
      secouerTete();
      setMatErr(
        err instanceof ApiError && err.status === 404
          ? 'Ce matricule n’est pas dans la base des étudiants UPB.'
          : err instanceof Error
          ? err.message
          : 'Une erreur est survenue.'
      );
      if (err instanceof ApiError && err.status === 404) redirectionUpb.lancer();
    }
  };

  const handleReset = () => {
    redirectionUpb.annuler();
    setMatStep('input');
    setMatricule('');
    setMatErr(null);
    setMatOk(false);
    setHebergement(false);
    setEtudiant(null);
    setEmail('');
    setCode('');
    setEmailMasque(null);
    setDossierIncomplet(false);
    setEtapeErr(null);
    setRenvoiDans(0);
  };

  const messageErreur = (err: unknown) => (err instanceof Error ? err.message : 'Une erreur est survenue.');

  // L'e-mail retapé est comparé côté serveur à celui du dossier ; s'il correspond, un code est envoyé.
  const peutDemanderCode =
    !!etudiant && !!emailMasque && email.trim().length > 3 && (statutCompte === 'existant' || matOk) && !envoi;

  const handleDemanderCode = async () => {
    if (!etudiant || !peutDemanderCode) return;
    setEnvoi(true);
    setEtapeErr(null);
    try {
      await api.demanderCode(etudiant.matricule, email.trim());
      setCode('');
      setRenvoiDans(DELAI_RENVOI_S);
      setMatStep('code');
      celebrer();
    } catch (err) {
      secouerTete();
      setEtapeErr(messageErreur(err));
      if (err instanceof ApiError && (err.status === 400 || err.status === 409)) redirectionUpb.lancer();
    } finally {
      setEnvoi(false);
    }
  };

  const handleRenvoyer = async () => {
    if (!etudiant || renvoiDans > 0 || envoi) return;
    setEnvoi(true);
    setEtapeErr(null);
    try {
      await api.demanderCode(etudiant.matricule, email.trim());
      setCode('');
      setRenvoiDans(DELAI_RENVOI_S);
      codeRef.current?.focus();
    } catch (err) {
      setEtapeErr(messageErreur(err));
    } finally {
      setEnvoi(false);
    }
  };

  const handleVerifier = async (valeur: string = code) => {
    if (!etudiant || valeur.length !== CODE_LONGUEUR || envoi) return;
    setEnvoi(true);
    setEtapeErr(null);
    try {
      const rep = await api.verifierCode(etudiant.matricule, email.trim(), valeur, matOk, hebergement);
      session.set(rep.token);
      navigate('/espace/dashboard', { replace: true });
    } catch (err) {
      secouerTete();
      setCode('');
      setEtapeErr(messageErreur(err));
      codeRef.current?.focus();
    } finally {
      setEnvoi(false);
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
                    redirectionUpb.annuler();
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
                  {matErr || 'Lettres et chiffres, sans espace.'}
                </span>
                <AvisRedirectionUpb reste={redirectionUpb.reste} annuler={redirectionUpb.annuler} />
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
          {matStep === 'found' && (
            <>
              {/* Carte identité étudiante trouvée */}
              <div className="flex gap-3.5 items-center p-2.5 rounded-[16px] bg-[#F1F4FA]">
                <span className="w-[52px] h-[52px] shrink-0 rounded-full bg-[#2F63D0] text-white grid place-items-center font-extrabold text-[19px] font-sans">
                  {etudiant?.initiales}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-extrabold text-[19px] text-[#0A1430] font-sans">
                    {casse(etudiant?.prenoms)} {casse(etudiant?.nom)}
                  </span>
                  <span className="font-medium text-[14px] text-[#4A5168] font-sans break-words">
                    {[etudiant?.matricule, etudiant ? cursus(etudiant) : ''].filter(Boolean).join(' · ')}
                  </span>
                </div>
              </div>

              {dossierIncomplet ? (
                <a
                  href={URL_BASE_ETUDIANTS_UPB}
                  data-shine="1"
                  className="min-h-[52px] pl-5 pr-1.5 rounded-[16px] bg-[#0A1430] text-white font-extrabold text-[16px] flex items-center justify-between gap-3 cursor-pointer shadow-[0_12px_24px_rgba(10,20,48,0.22)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] font-sans no-underline"
                >
                  Compléter mon dossier UPB{' '}
                  <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[18px]">
                    →
                  </span>
                </a>
              ) : null}
              {dossierIncomplet && (
                <AvisRedirectionUpb
                  reste={redirectionUpb.reste}
                  annuler={redirectionUpb.annuler}
                  className="text-center"
                />
              )}
              {dossierIncomplet ? null : (
              <>
              {/* E-mail du dossier semi-masqué : le candidat le retape en entier pour le confirmer */}
              {emailMasque ? (
                <label className="flex flex-col gap-2 text-center">
                  <span className="font-semibold text-[14px] leading-[1.4] text-[#6A7189] font-sans">
                    Ton e-mail : <span className="font-extrabold text-[#0A1430] break-all">{emailMasque}</span>
                  </span>
                  <input
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (etapeErr) setEtapeErr(null);
                      redirectionUpb.annuler();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleDemanderCode();
                    }}
                    placeholder="Retape ton adresse e-mail"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    className={`min-h-[52px] rounded-[14px] border-2 text-center px-4 font-bold text-[16px] text-[#0A1430] outline-none transition-all duration-200 focus:bg-white font-sans ${
                      etapeErr ? 'border-[#C8372D] bg-white' : 'border-transparent bg-[#0A1430]/[0.07]'
                    }`}
                  />
                  {etapeErr && (
                    <span className="font-semibold text-[14px] leading-[1.4] text-[#B4281F] font-sans">{etapeErr}</span>
                  )}
                  <AvisRedirectionUpb reste={redirectionUpb.reste} annuler={redirectionUpb.annuler} />
                </label>
              ) : null}

              {statutCompte === 'nouveau' && (
              <>
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
                  J'accepte les conditions d'utilisation et l'utilisation de mes données pour le
                  concours et le suivi de présence par QR code.{' '}
                  <Link
                    to="/documents"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#0A1430] font-extrabold underline"
                  >
                    En savoir plus
                  </Link>
                </span>
              </div>

              {/* Hébergement : besoin d'être logé sur place pendant le concours */}
              <div
                onClick={() => setHebergement(!hebergement)}
                className="flex gap-3 cursor-pointer items-start select-none"
              >
                <span
                  className={`shrink-0 w-7 h-7 rounded-[9px] border-[2.5px] border-[#0A1430] grid place-items-center font-extrabold text-[15px] transition-colors duration-200 ${
                    hebergement ? 'bg-[#0E1E4A] text-[#A9C2FF]' : 'bg-white text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span className="font-medium text-[14px] leading-[1.45] text-[#3A3415] font-sans">
                  J'ai besoin d'être hébergé·e et de me loger sur place pendant le concours.
                </span>
              </div>
              </>
              )}

              {/* Bouton : recevoir le code de confirmation par e-mail */}
              <span
                onClick={handleDemanderCode}
                data-shine="1"
                className={`min-h-[52px] pl-5 pr-1.5 rounded-[16px] font-extrabold text-[16px] flex items-center justify-between gap-3 transition-all duration-300 font-sans ${
                  peutDemanderCode
                    ? 'bg-[#0A1430] text-white cursor-pointer shadow-[0_12px_24px_rgba(10,20,48,0.22)] hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-[#0A1430]/[0.12] text-[#8A8260] cursor-default'
                }`}
              >
                {envoi ? 'Envoi du code…' : 'Recevoir mon code'}{' '}
                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[18px]">
                  →
                </span>
              </span>

              </>
              )}

              {/* Réinitialisation */}
              <span
                onClick={handleReset}
                className="text-center font-bold text-[15px] text-[#3A3415] cursor-pointer underline font-sans hover:opacity-80 transition-opacity"
              >
                Ce n'est pas moi
              </span>
            </>
          )}

          {/* Code à 5 chiffres reçu par e-mail */}
          {matStep === 'code' && (
            <>
              <label className="flex flex-col gap-2 text-center">
                <span className="font-semibold text-[14px] leading-[1.4] text-[#6A7189] font-sans">
                  Code envoyé à <span className="font-extrabold text-[#0A1430] break-all">{emailMasque}</span>
                </span>
                <input
                  ref={codeRef}
                  value={code}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, CODE_LONGUEUR);
                    setCode(v);
                    if (etapeErr) setEtapeErr(null);
                    if (v.length === CODE_LONGUEUR) handleVerifier(v);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleVerifier();
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={CODE_LONGUEUR}
                  placeholder="• • • • •"
                  aria-label="Code à 5 chiffres reçu par e-mail"
                  className={`min-h-[58px] rounded-[14px] border-2 text-center px-5 font-extrabold text-[26px] tracking-[0.5em] text-[#0A1430] outline-none transition-all duration-200 focus:bg-white font-sans ${
                    etapeErr ? 'border-[#C8372D] bg-white' : 'border-transparent bg-[#0A1430]/[0.07]'
                  }`}
                />
                <span
                  className={`font-semibold text-[14px] leading-[1.4] font-sans ${
                    etapeErr ? 'text-[#B4281F]' : 'text-[#6A7189]'
                  }`}
                >
                  {etapeErr || 'Pense à regarder dans les spams.'}
                </span>
              </label>

              <span
                onClick={() => handleVerifier()}
                data-shine="1"
                className={`min-h-[52px] pl-5 pr-1.5 rounded-[16px] font-extrabold text-[16px] flex items-center justify-between gap-3 transition-all duration-300 font-sans ${
                  code.length === CODE_LONGUEUR && !envoi
                    ? 'bg-[#0A1430] text-white cursor-pointer shadow-[0_12px_24px_rgba(10,20,48,0.22)] hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-[#0A1430]/[0.12] text-[#8A8260] cursor-default'
                }`}
              >
                {envoi
                  ? 'Vérification…'
                  : statutCompte === 'existant'
                  ? 'Accéder à mon espace'
                  : 'Créer mon compte'}{' '}
                <span className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[18px]">
                  →
                </span>
              </span>

              <div className="flex justify-center gap-5 flex-wrap">
                <span
                  onClick={handleRenvoyer}
                  className={`text-center font-bold text-[15px] font-sans transition-opacity ${
                    renvoiDans > 0 || envoi
                      ? 'text-[#9AA3B5] cursor-default'
                      : 'text-[#3A3415] underline cursor-pointer hover:opacity-80'
                  }`}
                >
                  {renvoiDans > 0 ? `Renvoyer le code (${renvoiDans} s)` : 'Renvoyer le code'}
                </span>
                <span
                  onClick={() => {
                    setMatStep('found');
                    setCode('');
                    setEtapeErr(null);
                  }}
                  className="text-center font-bold text-[15px] text-[#3A3415] cursor-pointer underline font-sans hover:opacity-80 transition-opacity"
                >
                  Changer d’adresse
                </span>
              </div>
            </>
          )}
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

      {/* Modal d'inscription invité en 2 étapes */}
      <ModalInscriptionInvite
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
}
