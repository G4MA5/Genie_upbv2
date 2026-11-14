import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopographyWave from '../../../components/categories/TopographyWave';
import { TECH_BLUEPRINT_GRID } from '../../../assets/techBlueprintGrid';
import { TECH_PIXEL_TRANSITION } from '../../../assets/techPixelTransition';

export default function CategorieTechnologie() {
  const navigate = useNavigate();
  const evalRef = useRef<HTMLElement | null>(null);
  const droneDerouleRef = useRef<HTMLImageElement | null>(null);
  const signpostRef = useRef<HTMLImageElement | null>(null);

  // Animations Web Animations API authentiques du prototype
  useEffect(() => {
    // 1. Animation de flottaison du drone dans le déroulé
    const droneAnim = droneDerouleRef.current?.animate(
      [
        { transform: 'translateY(-8px) rotate(-1.5deg)' },
        { transform: 'translateY(8px) rotate(1.5deg)' },
      ],
      {
        duration: 4000,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    // 2. Animation de flottaison du panneau indicateur dans l'évaluation
    const signAnim = signpostRef.current?.animate(
      [
        { transform: 'translateY(-8px) rotate(-1.5deg)' },
        { transform: 'translateY(8px) rotate(1.5deg)' },
      ],
      {
        duration: 4200,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    // 3. Animations des 3 points critiques d'évaluation
    const sec = evalRef.current;
    const anims: Animation[] = [];

    if (sec) {
      const inf = { iterations: Infinity };

      // Point critique 01: Rapport technique (lignes du document + coche verte)
      sec.querySelectorAll('[data-anim="doc"] [data-line]').forEach((l, i) => {
        const a = l.animate(
          [
            { transform: 'scaleX(0)' },
            { transform: 'scaleX(1)', offset: 0.25 },
            { transform: 'scaleX(1)', offset: 0.85 },
            { transform: 'scaleX(0)' },
          ],
          { ...inf, duration: 3200, delay: i * 180, easing: 'ease-out' }
        );
        anims.push(a);
      });

      sec.querySelectorAll('[data-anim="doc"] [data-check]').forEach((c) => {
        const a = c.animate(
          [
            { transform: 'scale(0)' },
            { transform: 'scale(0)', offset: 0.45 },
            { transform: 'scale(1.2)', offset: 0.55 },
            { transform: 'scale(1)', offset: 0.62 },
            { transform: 'scale(1)', offset: 0.9 },
            { transform: 'scale(0)' },
          ],
          { ...inf, duration: 3200 }
        );
        anims.push(a);
      });

      // Point critique 02: Injection de données (flux de bits descendants + barres égaliseur)
      sec.querySelectorAll('[data-anim="inject"] [data-bit]').forEach((b, i) => {
        const a = b.animate(
          [
            { transform: 'translateY(0)', opacity: 0 },
            { opacity: 1, offset: 0.2 },
            { transform: 'translateY(62px)', opacity: 0 },
          ],
          { ...inf, duration: 1300, delay: i * 210, easing: 'ease-in' }
        );
        anims.push(a);
      });

      sec.querySelectorAll('[data-anim="inject"] [data-bar]').forEach((b, i) => {
        const a = b.animate(
          [{ transform: 'scaleY(.3)' }, { transform: 'scaleY(1)' }],
          {
            ...inf,
            direction: 'alternate',
            duration: 700 + i * 130,
            easing: 'ease-in-out',
          }
        );
        anims.push(a);
      });

      // Point critique 03: Contrôle de la station (ondes radar concentriques)
      sec.querySelectorAll('[data-anim="signal"] [data-wave]').forEach((w, i) => {
        const a = w.animate(
          [
            { transform: 'scale(.4)', opacity: 1 },
            { transform: 'scale(3.4)', opacity: 0 },
          ],
          { ...inf, duration: 2100, delay: i * 700, easing: 'ease-out' }
        );
        anims.push(a);
      });
    }

    return () => {
      droneAnim?.cancel();
      signAnim?.cancel();
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden font-sans">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION TECHNOLOGIE                                               */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#0C1E4A] min-h-[820px] box-border flex items-stretch px-5 sm:px-10 lg:px-[72px] pt-[120px] pb-10">
        {/* Fond Blueprint SVG */}
        <div
          data-si-bg="1"
          aria-hidden="true"
          className="absolute inset-0 bg-repeat bg-[length:880px_660px] pointer-events-none"
          style={{ backgroundImage: `url("${TECH_BLUEPRINT_GRID}")` }}
        />

        {/* Dégradé vignette bas */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0 h-[55%] bg-gradient-to-b from-[rgba(29,79,216,0)] via-[rgba(29,79,216,0.35)] via-60% to-[#1D3E9E] pointer-events-none z-[2]"
        />

        {/* Drone Desktop avec ombre portée et contour blanc (5px) */}
        <div className="hidden md:block absolute right-[clamp(-60px,-1vw,20px)] top-1/2 w-[min(46%,600px)] -translate-y-[46%] z-[1] pointer-events-none">
          <img
            data-si-bot="1"
            src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
            alt="Drone"
            className="block w-full h-auto drop-shadow-[5px_0_0_#fff] drop-shadow-[-5px_0_0_#fff] drop-shadow-[0_5px_0_#fff] drop-shadow-[0_-5px_0_#fff] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* Contenu textuel Hero */}
        <div className="relative w-full max-w-[1280px] mx-auto flex flex-col justify-between gap-12 z-[3]">
          <div className="relative z-[2] flex flex-col min-w-0 pt-[clamp(40px,8vw,110px)]">
            <h1 className="m-0 flex flex-col items-start font-black text-[clamp(60px,9vw,150px)] leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]">
              <span className="whitespace-nowrap">Qui sera le</span>
              <span className="whitespace-nowrap">génie</span>
              <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 text-[0.78em] origin-left font-black ton-genie-title-desktop hidden md:inline-block">
                technologique
              </span>
              <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 text-[0.78em] origin-left font-black ton-genie-title-mobile inline-block md:hidden">
                technologique
              </span>
            </h1>

            <button
              onClick={() => navigate('/inscription')}
              className="self-start mt-14 min-h-[60px] px-[30px] rounded-[16px] border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[22px] flex items-center gap-2.5 whitespace-nowrap cursor-pointer shadow-[0_14px_30px_rgba(20,10,80,0.4)] hover:-translate-y-1 transition-transform"
            >
              S'inscrire →
            </button>
          </div>

          {/* Drone Mobile sous le titre */}
          <div className="block md:hidden relative w-full max-w-[440px] mt-2 mx-auto z-[1] pointer-events-none">
            <img
              src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
              alt="Drone"
              className="block w-full h-auto drop-shadow-[5px_0_0_#fff] drop-shadow-[-5px_0_0_#fff] drop-shadow-[0_5px_0_#fff] drop-shadow-[0_-5px_0_#fff] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION ST AGRICULTURE (MISSION AGRITECH)                              */}
      {/* ========================================================================= */}
      <section
        data-screen-label="ST Agriculture"
        className="relative overflow-hidden min-h-[780px] bg-[#0B3FD9] px-5 sm:px-10 lg:px-[72px] py-[clamp(72px,9vw,120px)] flex flex-col justify-between"
      >
        {/* Composant Topographie vectorielle d'élévation */}
        <div className="absolute inset-0 pointer-events-none">
          <TopographyWave />
        </div>

        {/* Dégradé vertical d'atténuation */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[rgba(11,63,217,0.85)] via-[rgba(11,63,217,0)] via-50% to-[rgba(11,63,217,0.92)] pointer-events-none"
        />

        <div className="relative w-full max-w-[1200px] mx-auto flex flex-col justify-between gap-[clamp(48px,8vw,140px)] z-10 pointer-events-none">
          {/* Grille Mission & Descriptif */}
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(20px,4vw,64px)] items-start">
            <div className="flex flex-col gap-4.5 min-w-0">
              <span className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]">
                [ MISSION ] [ AGRITECH ]
              </span>
              <h2 className="m-0 font-silkscreen font-normal text-[clamp(40px,5.6vw,84px)] leading-[0.95] tracking-[-0.02em] text-[#E3E5EA] uppercase text-balance">
                Surveiller les cultures
              </h2>
            </div>

            <div className="flex flex-col gap-3.5 min-w-0 pt-[clamp(0px,3vw,36px)]">
              <span className="w-7 h-[3px] bg-[#E3E5EA]" />
              <p className="m-0 max-w-[34ch] font-sans font-extrabold text-[clamp(17px,1.6vw,21px)] leading-[1.3] tracking-[0.02em] uppercase text-white">
                Concevoir une solution de surveillance agricole pour contribuer à la souveraineté alimentaire ivoirienne.
              </p>
              <p className="m-0 max-w-[40ch] font-sans font-semibold text-[16px] leading-[1.5] text-[#D6E0FF]">
                Un drone équipé et une station de contrôle au sol, conçus et montés par l'équipe.
              </p>
            </div>
          </div>

          {/* Grille 3 Statistiques clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(20px,3vw,40px)]">
            <div className="flex flex-col gap-2.5 pt-4 border-t-2 border-[#E3E5EA] min-w-0">
              <span className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]">
                06
              </span>
              <span className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white">
                Personnes par équipe
              </span>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t-2 border-[#E3E5EA] min-w-0">
              <span className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]">
                3+1
              </span>
              <span className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white">
                Jours de montage + expériences
              </span>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t-2 border-[#E3E5EA] min-w-0">
              <span className="font-silkscreen font-normal text-[clamp(56px,7vw,104px)] leading-[0.85] text-[#E3E5EA]">
                03
              </span>
              <span className="font-sans font-extrabold text-[14px] leading-[1.3] tracking-[0.06em] uppercase text-white">
                Membres du jury
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION TECHNOLOGIE DÉROULÉ (CONSTRUIRE PUIS PROUVER)                  */}
      {/* ========================================================================= */}
      <section
        data-screen-label="Technologie déroulé"
        className="relative overflow-hidden bg-[#E3E5EA]"
      >
        {/* Bloc d'en-tête bleu avec titre et drone flottant */}
        <div className="relative bg-[#0B3FD9] px-5 sm:px-10 lg:px-[72px] pt-[clamp(72px,9vw,120px)] pb-[clamp(40px,5vw,72px)] text-center">
          <span className="block font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF] mb-[clamp(20px,3vw,36px)]">
            [ DÉROULÉ ]
          </span>
          <h2 className="relative z-[1] m-0 font-silkscreen font-normal text-[clamp(48px,10.5vw,170px)] leading-[0.92] tracking-[-0.02em] text-[#E3E5EA] uppercase">
            Construire<br />puis prouver
          </h2>
          <img
            ref={droneDerouleRef}
            data-fx="float"
            src="/images/5729093f-e077-43a9-82bd-20da50f01660.png"
            alt=""
            aria-hidden="true"
            className="relative z-[2] block w-[min(56%,460px)] h-auto mx-auto mt-[clamp(-120px,-9vw,-40px)] drop-shadow-[0_30px_30px_rgba(0,10,60,0.45)]"
          />
        </div>

        {/* Transition de pixels SVG authentique du prototype */}
        <div
          aria-hidden="true"
          className="h-[320px] bg-repeat-x bg-[length:1200px_320px] -mt-[1px]"
          style={{ backgroundImage: `url("${TECH_PIXEL_TRANSITION}")` }}
        />

        {/* Grille des 4 étapes sur fond clair */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-[72px] pt-[clamp(24px,4vw,56px)] flex flex-col-reverse gap-[clamp(40px,5vw,64px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(24px,3vw,40px)]">
            {/* Étape 01 */}
            <div className="flex flex-col gap-3 min-w-0">
              <span className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]">
                01
              </span>
              <span className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]">
                Montage
              </span>
              <span className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256]">
                Assemblage du drone et de ses capteurs.
              </span>
            </div>

            {/* Étape 02 */}
            <div className="flex flex-col gap-3 min-w-0">
              <span className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]">
                02
              </span>
              <span className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]">
                Intégration
              </span>
              <span className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256]">
                Mise en place de la station de contrôle au sol.
              </span>
            </div>

            {/* Étape 03 */}
            <div className="flex flex-col gap-3 min-w-0">
              <span className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]">
                03
              </span>
              <span className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]">
                Calibrage
              </span>
              <span className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256]">
                Liaison drone–station et tests de signal.
              </span>
            </div>

            {/* Étape 04 */}
            <div className="flex flex-col gap-3 min-w-0">
              <span className="font-silkscreen font-bold text-[clamp(44px,5vw,72px)] leading-[0.9] text-[#0B3FD9]">
                04
              </span>
              <span className="font-sans font-extrabold text-[15px] leading-[1.15] tracking-[0.04em] uppercase text-[#0A1430]">
                Expériences
              </span>
              <span className="font-sans font-medium text-[14px] leading-[1.45] text-[#3A4256]">
                Vols, collecte et analyse des données devant le jury.
              </span>
            </div>
          </div>

          {/* En-tête 3+1 Jours */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <span className="font-silkscreen font-normal text-[clamp(40px,6vw,88px)] leading-[0.9] text-[#0B3FD9]">
              3+1<br />JOURS
            </span>
            <span className="max-w-[30ch] font-sans font-extrabold text-[15px] leading-[1.3] tracking-[0.03em] uppercase text-[#0A1430]">
              Trois jours pour monter le drone et la station, un jour pour faire les expériences.
            </span>
          </div>
        </div>

        {/* Ligne méta inférieure Déroulé */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-[72px] mt-[clamp(32px,4vw,56px)] pb-7">
          <div className="border-t-2 border-[#0A1430] pt-3.5 flex flex-wrap justify-between gap-3 font-silkscreen font-bold text-[11px] tracking-[0.06em] text-[#0A1430]">
            <span>© GÉNIE UPB</span>
            <span>[ TECHNOLOGIE ] [ AGRITECH ]</span>
            <span>ÉQUIPES DE 6</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION TECHNOLOGIE ÉVALUATION (CE QUE LE JURY VÉRIFIE)                 */}
      {/* ========================================================================= */}
      <section
        ref={evalRef}
        data-screen-label="Technologie évaluation"
        data-eval="1"
        className="relative overflow-hidden bg-[#0F3C8A] px-5 sm:px-10 lg:px-[72px] py-[clamp(64px,8vw,112px)]"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col gap-[clamp(40px,5vw,72px)]">
          {/* Grille principale 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,4vw,64px)] items-center">
            {/* Colonne gauche : Titre & Panneau indicateur à trois directions */}
            <div className="relative min-w-0 flex flex-col gap-4.5">
              <span className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]">
                [ ÉVALUATION ]
              </span>
              <h2 className="m-0 font-silkscreen font-normal text-[clamp(40px,5.4vw,80px)] leading-[0.95] tracking-[-0.02em] text-[#E3E5EA] uppercase">
                Ce que le jury vérifie
              </h2>
              <img
                ref={signpostRef}
                data-fx="float"
                src="/images/4a6653f4-6dfe-48dc-b2cf-7d9849e74067.png"
                alt="Panneau indicateur à trois directions"
                className="block w-[min(100%,420px)] h-auto mt-2 [mask-image:radial-gradient(70%_75%_at_50%_50%,#000_55%,transparent_100%)]"
              />
            </div>

            {/* Colonne droite : 3 Points critiques avec animations dédiées */}
            <div className="flex flex-col min-w-0">
              {/* Point critique 01 : Rapport technique */}
              <div
                data-pt="1"
                className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
              >
                <div
                  data-anim="doc"
                  aria-hidden="true"
                  className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
                >
                  <div className="absolute left-[22px] top-4 w-[52px] h-16 rounded-[6px] bg-[#E3E5EA] p-2.5 box-border flex flex-col gap-1.5">
                    <span
                      data-line="1"
                      className="block h-1 w-full rounded-[2px] bg-[#113D88] origin-left"
                    />
                    <span
                      data-line="1"
                      className="block h-1 w-[80%] rounded-[2px] bg-[#113D88] origin-left"
                    />
                    <span
                      data-line="1"
                      className="block h-1 w-[95%] rounded-[2px] bg-[#113D88] origin-left"
                    />
                    <span
                      data-line="1"
                      className="block h-1 w-[60%] rounded-[2px] bg-[#113D88] origin-left"
                    />
                    <span
                      data-line="1"
                      className="block h-1 w-[85%] rounded-[2px] bg-[#113D88] origin-left"
                    />
                  </div>
                  <span
                    data-check="1"
                    className="absolute right-2.5 bottom-2.5 w-[26px] h-[26px] rounded-full bg-[#3BFF7A] grid place-items-center font-sans font-black text-[15px] text-[#113D88]"
                  >
                    ✓
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="font-silkscreen font-bold text-[12px] tracking-[0.08em] text-[#7FD6FF]">
                    POINT CRITIQUE 01
                  </span>
                  <span className="font-sans font-black text-[clamp(20px,2vw,26px)] leading-[1.15] text-white">
                    Rapport technique
                  </span>
                  <span className="font-sans font-medium text-[15px] leading-[1.5] text-[#C9D6F5]">
                    La conception, les choix et les résultats, documentés.
                  </span>
                </div>
              </div>

              {/* Point critique 02 : Injection de données */}
              <div
                data-pt="1"
                className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
              >
                <div
                  data-anim="inject"
                  aria-hidden="true"
                  className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
                >
                  <span
                    data-bit="1"
                    className="absolute left-4 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  >
                    0
                  </span>
                  <span
                    data-bit="1"
                    className="absolute left-7 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  >
                    1
                  </span>
                  <span
                    data-bit="1"
                    className="absolute left-10 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  >
                    0
                  </span>
                  <span
                    data-bit="1"
                    className="absolute left-[52px] -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  >
                    1
                  </span>
                  <span
                    data-bit="1"
                    className="absolute left-16 -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  >
                    0
                  </span>
                  <span
                    data-bit="1"
                    className="absolute left-[76px] -top-3.5 font-silkscreen font-bold text-[12px] text-[#7FD6FF]"
                  >
                    1
                  </span>

                  <div className="absolute left-3.5 right-3.5 bottom-3 h-[30px] rounded-[8px] bg-[#E3E5EA] flex items-end gap-1 px-1.5 py-1.5 box-border">
                    <span
                      data-bar="1"
                      className="flex-1 h-[40%] rounded-[2px] bg-[#113D88] origin-bottom"
                    />
                    <span
                      data-bar="1"
                      className="flex-1 h-[70%] rounded-[2px] bg-[#113D88] origin-bottom"
                    />
                    <span
                      data-bar="1"
                      className="flex-1 h-[55%] rounded-[2px] bg-[#113D88] origin-bottom"
                    />
                    <span
                      data-bar="1"
                      className="flex-1 h-[90%] rounded-[2px] bg-[#113D88] origin-bottom"
                    />
                    <span
                      data-bar="1"
                      className="flex-1 h-[65%] rounded-[2px] bg-[#113D88] origin-bottom"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="font-silkscreen font-bold text-[12px] tracking-[0.08em] text-[#7FD6FF]">
                    POINT CRITIQUE 02
                  </span>
                  <span className="font-sans font-black text-[clamp(20px,2vw,26px)] leading-[1.15] text-white">
                    Injection de données
                  </span>
                  <span className="font-sans font-medium text-[15px] leading-[1.5] text-[#C9D6F5]">
                    Des données sont injectées dans le drone pour juger la qualité de son analyse.
                  </span>
                </div>
              </div>

              {/* Point critique 03 : Contrôle de la station */}
              <div
                data-pt="1"
                className="flex gap-5 items-center py-[22px] border-t-2 border-[rgba(227,229,234,0.3)] min-w-0"
              >
                <div
                  data-anim="signal"
                  aria-hidden="true"
                  className="relative shrink-0 w-24 h-24 rounded-[18px] bg-white/[0.07] border-[1.5px] border-[rgba(227,229,234,0.35)] overflow-hidden"
                >
                  <span
                    data-wave="1"
                    className="absolute left-1/2 top-[44%] w-6 h-6 -ml-3 -mt-3 rounded-full border-[2.5px] border-[#7FD6FF] box-border"
                  />
                  <span
                    data-wave="1"
                    className="absolute left-1/2 top-[44%] w-6 h-6 -ml-3 -mt-3 rounded-full border-[2.5px] border-[#7FD6FF] box-border"
                  />
                  <span
                    data-wave="1"
                    className="absolute left-1/2 top-[44%] w-6 h-6 -ml-3 -mt-3 rounded-full border-[2.5px] border-[#7FD6FF] box-border"
                  />
                  <span className="absolute left-1/2 top-[44%] w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-[#E3E5EA]" />
                  <span className="absolute left-[calc(50%-2px)] top-[calc(44%+5px)] w-1 h-[34px] bg-[#E3E5EA]" />
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="font-silkscreen font-bold text-[12px] tracking-[0.08em] text-[#7FD6FF]">
                    POINT CRITIQUE 03
                  </span>
                  <span className="font-sans font-black text-[clamp(20px,2vw,26px)] leading-[1.15] text-white">
                    Contrôle de la station
                  </span>
                  <span className="font-sans font-medium text-[15px] leading-[1.5] text-[#C9D6F5]">
                    La station de signal est mise à l'épreuve : liaison, stabilité, réactivité.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Barre inférieure Jury */}
          <div className="flex flex-wrap items-center justify-between gap-7 pt-7 border-t-2 border-[#E3E5EA]">
            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-silkscreen font-bold text-[13px] tracking-[0.1em] text-[#9FB6FF]">
                [ JURY ]
              </span>
              <span className="font-sans font-black text-[clamp(24px,2.8vw,36px)] leading-[1.1] text-white">
                3 membres évaluent chaque équipe.
              </span>
            </div>

            <div className="flex gap-3.5">
              {[1, 2, 3].map((_, idx) => (
                <span
                  key={idx}
                  data-juror="1"
                  className="w-[60px] h-[60px] rounded-full bg-[#E3E5EA] grid place-items-center text-[#113D88]"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="8.5" r="3.6" />
                    <path d="M4.5 20c.9-3.8 3.9-6 7.5-6s6.6 2.2 7.5 6" />
                  </svg>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
