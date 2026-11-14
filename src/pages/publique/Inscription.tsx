import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const [matOk, setMatOk] = useState<boolean>(false); // Case à cocher consentement (false au départ)

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

  // Fonction de direction des pupilles vers un point (x, y) de l'écran
  const look = (x: number, y: number) => {
    const pupils = document.querySelectorAll<HTMLElement>('[data-pupil]');
    pupils.forEach((p) => {
      const parent = p.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2);
      const dy = y - (r.top + r.height / 2);
      const dd = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dd / 220) * (Number(p.dataset.k) || 6);
      p.style.transform = `translate(${(dx / dd * k).toFixed(1)}px, ${(dy / dd * k).toFixed(1)}px)`;
    });
  };

  // Initialisation des animations interactives
  useEffect(() => {
    const face = faceRef.current;
    if (!face) return;

    // 1. Flottement doux vertical du visage (3s infini)
    const floatAnim = face.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: 'translate(0, -6px)' },
        { transform: 'translate(0, 0)' },
      ],
      { duration: 3000, iterations: Infinity, easing: 'ease-in-out' }
    );

    // 2. Rotation continue de la roue dentée (36s)
    let wheelAnim: Animation | undefined;
    if (wheelRef.current) {
      wheelAnim = wheelRef.current.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        { duration: 36000, iterations: Infinity }
      );
    }

    // 3. Clignement périodique des yeux (toutes les 2.5s à 5s)
    let blinkTimer: ReturnType<typeof setTimeout>;
    const triggerBlink = () => {
      const eyes = document.querySelectorAll<HTMLElement>('[data-eye]');
      eyes.forEach((el) => {
        el.animate(
          [
            { transform: 'scale(1, 1)' },
            { transform: 'scale(1, 0.08)' },
            { transform: 'scale(1, 1)' },
          ],
          { duration: 180 }
        );
      });
      blinkTimer = setTimeout(triggerBlink, 2500 + Math.random() * 2500);
    };
    blinkTimer = setTimeout(triggerBlink, 1500);

    // 4. Suivi de la souris (PointerMove)
    const onMove = (ev: PointerEvent) => {
      const inp = inputRef.current;
      if (inp && document.activeElement === inp) return;
      look(ev.clientX, ev.clientY);
    };
    window.addEventListener('pointermove', onMove);

    // 5. Suivi de la frappe au clavier dans l'input
    const onKey = () => {
      const inp = inputRef.current;
      if (!inp || document.activeElement !== inp) return;
      const r = inp.getBoundingClientRect();
      look(r.left + 20 + Math.min(inp.value.length, 14) * 15, r.top + r.height / 2);
    };
    document.addEventListener('input', onKey, true);
    document.addEventListener('focusin', onKey, true);

    return () => {
      floatAnim.cancel();
      if (wheelAnim) wheelAnim.cancel();
      clearTimeout(blinkTimer);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('input', onKey, true);
      document.removeEventListener('focusin', onKey, true);
    };
  }, []);

  // Animation orbitale des yeux pendant l'état 'think' (loading)
  useEffect(() => {
    if (matStep !== 'loading') return;
    const interval = setInterval(() => {
      const face = faceRef.current;
      if (!face) return;
      const t = Date.now() / 300;
      const r = face.getBoundingClientRect();
      look(r.left + r.width / 2 + Math.cos(t) * 300, r.top + Math.sin(t) * 300);
    }, 60);
    return () => clearInterval(interval);
  }, [matStep]);

  // Validation du matricule (Exact prototype matNext)
  const handleMatNext = () => {
    const v = matricule.trim();
    // Regex stricte : 6 à 14 caractères alphanumériques
    if (!/^[A-Z0-9-]{6,14}$/i.test(v)) {
      // Animation de la tête secouant "non"
      headRef.current?.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(-14deg)' },
          { transform: 'rotate(12deg)' },
          { transform: 'rotate(-8deg)' },
          { transform: 'rotate(5deg)' },
          { transform: 'rotate(0deg)' },
        ],
        { duration: 560, easing: 'ease-in-out' }
      );
      setMatErr(
        v
          ? 'Format invalide : 6 à 12 lettres ou chiffres, sans espace.'
          : 'Saisis ton matricule pour continuer.'
      );
      return;
    }

    setMatStep('loading');
    setMatErr(null);

    setTimeout(() => {
      setMatStep('found');

      // Rebond d'enthousiasme du robot
      faceRef.current?.animate(
        [
          { transform: 'translate(0, 0) scale(1, 1)' },
          { transform: 'translate(0, 4px) scale(1.06, 0.92)', offset: 0.15 },
          { transform: 'translate(0, -34px) scale(0.96, 1.06)', offset: 0.45 },
          { transform: 'translate(0, 0) scale(1.05, 0.94)', offset: 0.75 },
          { transform: 'translate(0, 0) scale(1, 1)' },
        ],
        { duration: 760, easing: 'ease-out' }
      );

      // Agitation triomphante du bras
      armRef.current?.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(-22deg)' },
          { transform: 'rotate(10deg)' },
          { transform: 'rotate(-22deg)' },
          { transform: 'rotate(10deg)' },
          { transform: 'rotate(0deg)' },
        ],
        { duration: 900 }
      );
    }, 1300);
  };

  const handleReset = () => {
    setMatStep('input');
    setMatricule('');
    setMatErr(null);
    setMatOk(false);
  };

  const handleFinalSubmit = () => {
    if (!matOk) return;
    navigate('/espace/dashboard');
  };

  return (
    <div
      data-screen-label="S8 Creer un compte"
      className="w-full min-h-screen bg-[#BFD6FF] flex items-center justify-center pt-[100px] pb-10 px-5 relative select-none box-border"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.55), transparent 70%)',
      }}
    >
      {/* CARTE BLANCHE CENTRALE AUTHENTIQUE (S8 Prototype exact) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '360px',
          borderRadius: '36px',
          padding: '10px 10px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(20,60,150,0.22), 0 8px 20px rgba(20,60,150,0.08)',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Bouton retour circulaire ← */}
        <Link
          to="/"
          data-go="BACK"
          aria-label="Retour au site"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 3,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '700 20px Nunito, sans-serif',
            color: '#0A1430',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(10,20,48,0.1)',
            textDecoration: 'none',
          }}
        >
          ←
        </Link>

        {/* 1. VOLET SUPÉRIEUR BLEU GRISÉ #E7EDF7 AVEC MASCOTTE ANIMÉE */}
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            background: '#E7EDF7',
            padding: '22px 12px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Titre et Sous-titre dynamiques pilotés par l'humeur */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 40px',
            }}
          >
            <h1
              style={{
                margin: 0,
                font: '800 24px/1.1 Nunito, sans-serif',
                color: '#0A1430',
                letterSpacing: '-.02em',
              }}
            >
              {cfg.title}
            </h1>
            <span
              style={{
                font: '600 14px/1.4 Nunito, sans-serif',
                color: '#4A5168',
                textWrap: 'pretty',
              }}
            >
              {cfg.sub}
            </span>
          </div>

          {/* Mascotte Robot UPB Interactive */}
          <div
            role="img"
            aria-label="Mascotte GÉNIE UPB"
            style={{
              position: 'relative',
              alignSelf: 'center',
              marginTop: '10px',
              marginBottom: '-6px',
              width: '169px',
              height: '195px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '260px',
                height: '300px',
                transform: 'scale(0.65)',
                transformOrigin: '0 0',
              }}
            >
              {/* Roue dentée de fond avec rotation continue 36s */}
              <svg
                ref={wheelRef}
                data-wheel="1"
                viewBox="0 0 260 260"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '260px',
                  height: '260px',
                  overflow: 'visible',
                  transformOrigin: '50% 50%',
                }}
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
              <svg
                viewBox="0 0 260 260"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '260px',
                  height: '260px',
                }}
              >
                <path
                  d="M62 190 A78 78 0 1 1 198 190"
                  fill="none"
                  stroke="#78B4DA"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>

              {/* Éléments de structure robotique base / livre ouvert */}
              <svg
                viewBox="0 0 260 50"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '250px',
                  width: '260px',
                  height: '50px',
                }}
              >
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
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '260px',
                  height: '300px',
                }}
              >
                {/* Barres réseau gauche */}
                <div
                  style={{
                    position: 'absolute',
                    left: '30px',
                    top: '96px',
                    width: '34px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '12px',
                      background: '#10357E',
                      borderRadius: '2px',
                    }}
                  />
                  <span
                    style={{
                      width: '8px',
                      height: '20px',
                      background: '#10357E',
                      borderRadius: '2px',
                    }}
                  />
                  <span
                    style={{
                      width: '8px',
                      height: '30px',
                      background: '#10357E',
                      borderRadius: '2px',
                    }}
                  />
                </div>

                {/* Torse */}
                <div
                  style={{
                    position: 'absolute',
                    left: '92px',
                    top: '146px',
                    width: '76px',
                    height: '92px',
                    borderRadius: '50% 50% 50% 50% / 36% 36% 64% 64%',
                    background: '#10357E',
                  }}
                />

                {/* Bras avec data-arm="1" */}
                <div
                  ref={armRef}
                  data-arm="1"
                  style={{
                    position: 'absolute',
                    left: '87px',
                    top: '122px',
                    width: '17px',
                    height: '54px',
                    borderRadius: '9px',
                    background: '#10357E',
                    transformOrigin: '50% 100%',
                    rotate: '-38deg',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: '-12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#10357E',
                    }}
                  />
                </div>

                {/* Badge étudiant */}
                <div
                  style={{
                    position: 'absolute',
                    left: '134px',
                    top: '168px',
                    width: '38px',
                    height: '48px',
                    boxSizing: 'border-box',
                    border: '3px solid #10357E',
                    borderRadius: '5px',
                    background: '#fff',
                    rotate: '-5deg',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '12px 6px 0',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '9px',
                      top: '-8px',
                      width: '14px',
                      height: '9px',
                      borderRadius: '3px',
                      background: '#10357E',
                    }}
                  />
                  <span
                    style={{
                      height: '3px',
                      width: '20px',
                      borderRadius: '2px',
                      background: '#10357E',
                    }}
                  />
                  <span
                    style={{
                      height: '3px',
                      width: '14px',
                      borderRadius: '2px',
                      background: '#10357E',
                    }}
                  />
                  <span
                    style={{
                      height: '3px',
                      width: '18px',
                      borderRadius: '2px',
                      background: '#78B4DA',
                    }}
                  />
                </div>

                {/* Bouton blanc torse */}
                <span
                  style={{
                    position: 'absolute',
                    left: '158px',
                    top: '194px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#10357E',
                    border: '2px solid #fff',
                  }}
                />

                {/* Tête robot avec data-head="1" */}
                <div
                  ref={headRef}
                  data-head="1"
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    width: '260px',
                    height: '170px',
                    transformOrigin: '130px 160px',
                  }}
                >
                  {/* Antenne */}
                  <span
                    style={{
                      position: 'absolute',
                      left: '128px',
                      top: '42px',
                      width: '4px',
                      height: '24px',
                      background: '#10357E',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '123px',
                      top: '30px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#10357E',
                    }}
                  />

                  {/* Oreilles casque */}
                  <span
                    style={{
                      position: 'absolute',
                      left: '58px',
                      top: '98px',
                      width: '16px',
                      height: '32px',
                      borderRadius: '6px',
                      background: '#10357E',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '186px',
                      top: '98px',
                      width: '16px',
                      height: '32px',
                      borderRadius: '6px',
                      background: '#10357E',
                    }}
                  />

                  {/* Casque bleu foncé */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '68px',
                      top: '62px',
                      width: '124px',
                      height: '96px',
                      borderRadius: '50% 50% 44% 44% / 56% 56% 44% 44%',
                      background: '#10357E',
                    }}
                  />

                  {/* Visage blanc */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '82px',
                      top: '74px',
                      width: '96px',
                      height: '70px',
                      borderRadius: '50% 50% 42% 42% / 58% 58% 42% 42%',
                      background: '#fff',
                    }}
                  />

                  {/* Yeux interactifs qui suivent la souris (data-eye & data-pupil) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '82px',
                      top: '90px',
                      width: '96px',
                      height: '26px',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '22px',
                    }}
                  >
                    <div
                      data-eye="1"
                      style={{
                        position: 'relative',
                        width: '22px',
                        height: '26px',
                        transform: `scaleY(${cfg.eyeSq})`,
                        transition: 'transform .3s cubic-bezier(.3,1.5,.5,1)',
                      }}
                    >
                      <div
                        data-pupil="1"
                        data-k="6"
                        style={{
                          position: 'absolute',
                          left: '2px',
                          top: '2px',
                          width: '18px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#10357E',
                          transition: 'transform .12s ease-out',
                        }}
                      />
                    </div>

                    <div
                      data-eye="1"
                      style={{
                        position: 'relative',
                        width: '22px',
                        height: '26px',
                        transform: `scaleY(${cfg.eyeSq})`,
                        transition: 'transform .3s cubic-bezier(.3,1.5,.5,1)',
                      }}
                    >
                      <div
                        data-pupil="1"
                        data-k="6"
                        style={{
                          position: 'absolute',
                          left: '2px',
                          top: '2px',
                          width: '18px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#10357E',
                          transition: 'transform .12s ease-out',
                        }}
                      />
                    </div>
                  </div>

                  {/* Joues roses avec opacité dynamique selon humeur (cheekOp) */}
                  <span
                    style={{
                      position: 'absolute',
                      left: '91px',
                      top: '120px',
                      width: '14px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#F29A9A',
                      opacity: cfg.cheekOp,
                      transition: 'opacity .3s',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '155px',
                      top: '120px',
                      width: '14px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#F29A9A',
                      opacity: cfg.cheekOp,
                      transition: 'opacity .3s',
                    }}
                  />

                  {/* Bouche animée réactive à l'humeur */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '82px',
                      top: '124px',
                      width: '96px',
                      height: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        width: cfg.mouthW,
                        height: cfg.mouthH,
                        borderRadius: cfg.mouthR,
                        background: '#10357E',
                        transition: 'all .35s cubic-bezier(.3,1.5,.5,1)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dégradé doux vers le bas du volet */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '46px',
              background: 'linear-gradient(rgba(231,237,247,0), #E7EDF7)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* 2. FORMULAIRE ET ACTIONS AUTHENTIQUES (Exact Prototype) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 8px' }}>
          {matStep === 'input' && (
            <>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  style={{
                    minHeight: '52px',
                    borderRadius: '14px',
                    border: `2px solid ${matErr ? '#C8372D' : 'transparent'}`,
                    textAlign: 'center',
                    background: 'rgba(10,20,48,.07)',
                    padding: '0 20px',
                    font: '700 17px Nunito, sans-serif',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: '#0A1430',
                    outline: 'none',
                    transition: 'border-color .25s, background .25s',
                  }}
                  onFocus={(e) => (e.target.style.background = '#fff')}
                  onBlur={(e) => (e.target.style.background = 'rgba(10,20,48,.07)')}
                />
                <span
                  style={{
                    font: '600 14px/1.4 Nunito, sans-serif',
                    color: matErr ? '#B4281F' : '#6A7189',
                  }}
                >
                  {matErr || '6 à 12 lettres ou chiffres, sans espace.'}
                </span>
              </label>

              <span
                onClick={handleMatNext}
                data-shine="1"
                style={{
                  minHeight: '52px',
                  padding: '0 6px 0 20px',
                  borderRadius: '16px',
                  background: '#0A1430',
                  boxShadow: '0 12px 24px rgba(10,20,48,.22)',
                  color: '#fff',
                  font: '800 16px Nunito, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all .3s cubic-bezier(.3,1.5,.5,1)',
                }}
              >
                C'est parti{' '}
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(180deg, #FF9A3D, #E8621A)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '18px',
                  }}
                >
                  →
                </span>
              </span>
            </>
          )}

          {matStep === 'loading' && (
            <div
              style={{
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#0A1430',
                  animation: 'dotb 1s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#0A1430',
                  animation: 'dotb 1s ease-in-out .15s infinite',
                }}
              />
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#0A1430',
                  animation: 'dotb 1s ease-in-out .3s infinite',
                }}
              />
            </div>
          )}

          {matStep === 'found' && (
            <>
              {/* Carte identité étudiante trouvée */}
              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '16px',
                  background: '#F1F4FA',
                }}
              >
                <span
                  style={{
                    width: '52px',
                    height: '52px',
                    flex: 'none',
                    borderRadius: '50%',
                    background: '#2F63D0',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    font: '800 19px Nunito, sans-serif',
                  }}
                >
                  AK
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <span style={{ font: '800 19px Nunito, sans-serif', color: '#0A1430' }}>
                    Aya Kouassi
                  </span>
                  <span style={{ font: '500 14px Nunito, sans-serif', color: '#4A5168' }}>
                    {matricule} · L2 · MIAGE
                  </span>
                </div>
              </div>

              {/* Consentement d'utilisation des données */}
              <div
                onClick={() => setMatOk(!matOk)}
                style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}
              >
                <span
                  style={{
                    flex: 'none',
                    width: '28px',
                    height: '28px',
                    borderRadius: '9px',
                    border: '2.5px solid #0A1430',
                    background: matOk ? '#0E1E4A' : '#fff',
                    color: matOk ? '#A9C2FF' : 'transparent',
                    display: 'grid',
                    placeItems: 'center',
                    font: '800 15px Nunito, sans-serif',
                    transition: 'background .2s',
                  }}
                >
                  ✓
                </span>
                <span style={{ font: '500 14px/1.45 Nunito, sans-serif', color: '#3A3415' }}>
                  J'accepte l'utilisation de mes données pour le concours et le suivi de présence
                  par QR code.{' '}
                  <span style={{ color: '#0A1430', fontWeight: 800, textDecoration: 'underline' }}>
                    En savoir plus
                  </span>
                </span>
              </div>

              {/* Bouton Créer mon compte */}
              <span
                onClick={handleFinalSubmit}
                data-shine="1"
                style={{
                  minHeight: '52px',
                  padding: '0 6px 0 20px',
                  borderRadius: '16px',
                  background: matOk ? '#0A1430' : 'rgba(10,20,48,.12)',
                  color: matOk ? '#fff' : '#8A8260',
                  font: '800 16px Nunito, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: matOk ? 'pointer' : 'default',
                  transition: 'all .3s cubic-bezier(.3,1.5,.5,1)',
                }}
              >
                Créer mon compte{' '}
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(180deg, #FF9A3D, #E8621A)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '18px',
                  }}
                >
                  →
                </span>
              </span>

              {/* Réinitialisation */}
              <span
                onClick={handleReset}
                style={{
                  textAlign: 'center',
                  font: '700 15px Nunito, sans-serif',
                  color: '#3A3415',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Ce n'est pas moi
              </span>
            </>
          )}

          {/* Lien se connecter */}
          <span
            style={{
              textAlign: 'center',
              font: '500 14px Nunito, sans-serif',
              color: '#4A5168',
              marginTop: '4px',
            }}
          >
            Déjà inscrit ?{' '}
            <Link
              to="/connexion"
              data-go="S9"
              style={{
                color: '#0A1430',
                fontWeight: 800,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Se connecter
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
