import React, { useEffect, useRef } from 'react';

/**
 * InnoEpreuve — Section 2 de la Catégorie Innovation (SI L'epreuve)
 * Calibré à 100% SANS AUCUNE INVENTION sur scripts/proto_real.html (lignes 928-934 & 1568-1632) :
 * - Zéro bouton inventé (pas de "Voir les chiffres", pas de "Revenir à l'épreuve")
 * - Contrôleur de défilement immersif par étapes au scroll (wheel / touch / click)
 * - Double portes battantes avec 9 rangées de texte INNOVE défilant continuellement
 * - Panneau 0 : L'Épreuve avec Cube 3D officiel (27 cubies, scramble 11 coups, auto-solve, spin 360°)
 *   et transition d'opacité entre PROBLÈME (1 -> 0.25) et SOLUTION (0.25 -> 1)
 * - Panneau 1 : En Chiffres avec pop-in dynamique, 12 pastilles, 6 silhouettes, 3 calendriers et compteurs animés
 * - Indicateur inférieur "FAITES DÉFILER ↓"
 */
export const InnoEpreuve: React.FC = () => {
  const secRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const pin = sec.querySelector<HTMLElement>('[data-inno-pin]');
    const dl = sec.querySelector<HTMLElement>('[data-door="l"]');
    const dr = sec.querySelector<HTMLElement>('[data-door="r"]');
    const hint = sec.querySelector<HTMLElement>('[data-inno-hint]');
    if (!pin || !dl || !dr || !hint) return;

    const panels = Array.from(sec.querySelectorAll<HTMLElement>('[data-ipanel]'));

    // 1. Animation continue des 9 rangées de filigrane INNOVE sur les portes
    sec.querySelectorAll('[data-door]').forEach((dd) =>
      dd.querySelectorAll<HTMLElement>('[data-inno-row]').forEach((el, ri) => {
        const sp = el.children as HTMLCollectionOf<HTMLElement>;
        const u = sp.length > 2 ? sp[2].offsetLeft - sp[0].offsetLeft || 900 : 900;
        const d = +(el.dataset.innoRow || 1);
        el.animate(
          [
            { transform: 'translateX(' + (d > 0 ? 0 : -u) + 'px)' },
            { transform: 'translateX(' + (d > 0 ? -u : 0) + 'px)' },
          ],
          { duration: 14000 + ri * 900, iterations: Infinity }
        );
      })
    );

    const E = 'cubic-bezier(.7,0,.2,1)';
    const B = 'cubic-bezier(.3,1.5,.5,1)';
    let isOpen = false;
    let shown = -1;
    let target = -1;
    let busy = false;

    // Animation d'ouverture et de fermeture des portes
    const doors = (open: boolean): Promise<void> =>
      new Promise((res) => {
        const w = Math.min(pin.offsetWidth * 0.5, 470);
        const x = open ? w : 0;
        const o: KeyframeAnimationOptions = {
          duration: open ? 950 : 650,
          easing: E,
          fill: 'forwards',
        };
        const a1 = dl.animate(
          [
            {
              transform:
                getComputedStyle(dl).transform === 'none'
                  ? 'translateX(0)'
                  : getComputedStyle(dl).transform,
            },
            { transform: 'translateX(' + -x + 'px)' },
          ],
          o
        );
        dr.animate(
          [
            {
              transform:
                getComputedStyle(dr).transform === 'none'
                  ? 'translateX(0)'
                  : getComputedStyle(dr).transform,
            },
            { transform: 'translateX(' + x + 'px)' },
          ],
          o
        );
        isOpen = open;
        a1.onfinish = () => res();
      });

    // Auto-fit responsive
    const fit = (p: HTMLElement) => {
      const f = p.querySelector<HTMLElement>('[data-ifit]');
      if (!f) return;
      f.style.scale = '1';
      const av = pin.offsetHeight - 100;
      const h = f.offsetHeight;
      f.style.scale = h > av ? String(Math.max(0.5, av / h)) : '1';
    };

    // Construction du Rubik's Cube 3D officiel du prototype
    interface CubeController {
      scramble: () => void;
      solve: (delay: number, done?: () => void) => Promise<void>;
    }

    const buildCube = (host: HTMLElement): CubeController => {
      host.innerHTML = '';
      const S = 56;
      const H = S / 2;
      const COL: Record<string, string> = {
        px: '#F58220',
        nx: '#1D4FD8',
        py: '#F2C230',
        ny: '#FFFFFF',
        pz: '#E0284F',
        nz: '#1DA84A',
      };
      host.style.perspective = '1000px';
      const sway = document.createElement('div');
      sway.style.cssText = 'position:absolute;inset:0;transform-style:preserve-3d';
      const stage = document.createElement('div');
      stage.style.cssText =
        'position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(-26deg) rotateY(-36deg)';
      sway.appendChild(stage);
      host.appendChild(sway);

      sway.animate(
        [
          { transform: 'rotateY(-12deg) rotateX(4deg)' },
          { transform: 'rotateY(12deg) rotateX(-4deg)' },
        ],
        { duration: 4200, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
      );

      const FT: Record<string, string> = {
        pz: 'translateZ(' + H + 'px)',
        nz: 'rotateY(180deg) translateZ(' + H + 'px)',
        px: 'rotateY(90deg) translateZ(' + H + 'px)',
        nx: 'rotateY(-90deg) translateZ(' + H + 'px)',
        py: 'rotateX(90deg) translateZ(' + H + 'px)',
        ny: 'rotateX(-90deg) translateZ(' + H + 'px)',
      };

      interface Cubie {
        el: HTMLElement;
        pos: [number, number, number];
        ops: string[];
        home: string;
        p0: [number, number, number];
      }

      const cubies: Cubie[] = [];
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const el = document.createElement('div');
            el.style.cssText =
              'position:absolute;left:50%;top:50%;width:' +
              S +
              'px;height:' +
              S +
              'px;margin:' +
              -H +
              'px 0 0 ' +
              -H +
              'px;transform-style:preserve-3d';
            const out: Record<string, boolean> = {
              px: x === 1,
              nx: x === -1,
              py: y === -1,
              ny: y === 1,
              pz: z === 1,
              nz: z === -1,
            };
            Object.keys(FT).forEach((f) => {
              const fa = document.createElement('div');
              fa.style.cssText =
                'position:absolute;inset:0;box-sizing:border-box;padding:4px;background:#0A1430;backface-visibility:hidden;transform:' +
                FT[f];
              const st = document.createElement('div');
              st.style.cssText =
                'width:100%;height:100%;border-radius:9px;background:' +
                (out[f] ? COL[f] : '#0A1430') +
                (out[f]
                  ? ';box-shadow:inset 0 -4px 0 rgba(0,0,0,.18),inset 0 3px 0 rgba(255,255,255,.35)'
                  : '');
              fa.appendChild(st);
              el.appendChild(fa);
            });
            const c: Cubie = {
              el,
              pos: [x, y, z],
              ops: [],
              home: 'translate3d(' + x * S + 'px,' + y * S + 'px,' + z * S + 'px)',
              p0: [x, y, z],
            };
            el.style.transform = c.home;
            stage.appendChild(el);
            cubies.push(c);
          }
        }
      }

      const tf = (c: Cubie) => (c.ops.length ? c.ops.join(' ') + ' ' : '') + c.home;
      const rot = (q: [number, number, number], ax: number, d: number): [number, number, number] => {
        const [x, y, z] = q;
        return ax === 0
          ? [x, -z * d, y * d]
          : ax === 1
          ? [z * d, y, -x * d]
          : [-y * d, x * d, z];
      };
      const AX = ['X', 'Y', 'Z'];

      const move = (m: [number, number, number], dur: number): Promise<void> =>
        new Promise((res) => {
          const [ax, l, d] = m;
          const r = 'rotate' + AX[ax] + '(' + d * 90 + 'deg)';
          const sel = cubies.filter((c) => c.pos[ax] === l);
          let left = sel.length;
          sel.forEach((c) => {
            const rest = tf(c);
            c.ops.unshift(r);
            c.pos = rot(c.pos, ax, d);
            const fin = () => {
              c.el.style.transform = tf(c);
              if (--left === 0) res();
            };
            if (!dur) return fin();
            const an = c.el.animate(
              [
                { transform: 'rotate' + AX[ax] + '(0deg) ' + rest },
                { transform: r + ' ' + rest },
              ],
              { duration: dur, easing: 'cubic-bezier(.55,0,.25,1)', fill: 'forwards' }
            );
            an.onfinish = () => {
              c.el.style.transform = tf(c);
              an.cancel();
              fin();
            };
          });
        });

      let hist: [number, number, number][] = [];
      let tok = 0;

      const scramble = () => {
        tok++;
        cubies.forEach((c) => {
          c.el.getAnimations().forEach((a) => a.cancel());
          c.ops = [];
          c.pos = c.p0.slice() as [number, number, number];
          c.el.style.transform = c.home;
        });
        hist = [];
        let prev: [number, number, number] | null = null;
        for (let k = 0; k < 11; k++) {
          let m: [number, number, number];
          do {
            m = [
              Math.floor(Math.random() * 3),
              Math.floor(Math.random() * 3) - 1,
              Math.random() < 0.5 ? 1 : -1,
            ];
          } while (prev && m[0] === prev[0] && m[1] === prev[1]);
          prev = m;
          hist.push(m);
          move(m, 0);
        }
      };

      const solve = async (delay: number, done?: () => void) => {
        const t = ++tok;
        await new Promise((r) => setTimeout(r, delay));
        for (let k = hist.length - 1; k >= 0; k--) {
          if (t !== tok) return;
          const [ax, l, d] = hist[k];
          await move([ax, l, -d], 300);
          await new Promise((r) => setTimeout(r, 30));
        }
        if (t !== tok) return;
        hist = [];
        stage.animate(
          [
            { transform: 'rotateX(-26deg) rotateY(-36deg) scale(1)' },
            { transform: 'rotateX(-26deg) rotateY(144deg) scale(1.08)', offset: 0.5 },
            { transform: 'rotateX(-26deg) rotateY(324deg) scale(1)' },
          ],
          { duration: 1100, easing: 'cubic-bezier(.3,0,.2,1)' }
        );
        done && done();
      };

      scramble();
      return { scramble, solve };
    };

    // Réinitialisation des panneaux
    const reset = (p: HTMLElement) => {
      const cv = p.querySelector<HTMLElement & { _cube?: CubeController }>('[data-p1vis]');
      if (cv && cv._cube) cv._cube.scramble();
      p.querySelectorAll<HTMLElement>('[data-pop]').forEach((el) =>
        el.getAnimations().forEach((x) => x.cancel())
      );
      p.querySelectorAll<HTMLElement & { _iv?: ReturnType<typeof setInterval> }>('[data-count]').forEach((el) => {
        if (el._iv) clearInterval(el._iv);
        el.textContent = el.dataset.fmt || '';
      });
    };

    // Déclenchement des animations d'un panneau
    const play = (i: number) => {
      const p = panels[i];
      if (!p) return;
      fit(p);
      const A = (el: HTMLElement, kf: Keyframe[], o: KeyframeAnimationOptions) =>
        el.animate(kf, Object.assign({ fill: 'both', easing: B }, o));

      // Pop in des blocs principaux
      p.querySelectorAll<HTMLElement>('[data-pop]').forEach((el, n) =>
        A(el, [{ opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 }], {
          duration: 600,
          delay: 150 + n * 110,
        })
      );

      // Panneau 0 : Résolution automatique du cube et labels
      if (i === 0) {
        const v = p.querySelector<HTMLElement & { _cube?: CubeController }>('[data-p1vis]');
        if (v) {
          if (!v._cube) v._cube = buildCube(v);
          const pb = p.querySelector<HTMLElement>('[data-lbl="pb"]');
          const so = p.querySelector<HTMLElement>('[data-lbl="so"]');
          if (pb) pb.style.opacity = '1';
          if (so) so.style.opacity = '.25';

          v._cube.solve(900, () => {
            if (pb) {
              pb.style.transition = 'opacity .4s';
              pb.style.opacity = '.25';
            }
            if (so) {
              so.style.transition = 'opacity .4s';
              so.style.opacity = '1';
            }
          });
        }
      }

      // Panneau 1 : Pop-in des pastilles/silhouettes/calendriers et compteurs
      if (i === 1) {
        p.querySelectorAll<HTMLElement>('[data-pop]').forEach((c, ci) =>
          c.querySelectorAll<HTMLElement>('[data-dot]').forEach((el, n) =>
            A(el, [{ opacity: 0, scale: 0 }, { opacity: 1, scale: 1 }], {
              duration: 400,
              delay: 700 + ci * 150 + n * 80,
            })
          )
        );

        p.querySelectorAll<HTMLElement & { _iv?: ReturnType<typeof setInterval> }>('[data-count]').forEach((el) => {
          const to = +(el.dataset.count || 0);
          const fmt = el.dataset.fmt || '';
          const dash = fmt.includes('–');
          let v = 0;
          el.textContent = dash ? '0–0' : '0';
          setTimeout(() => {
            el._iv = setInterval(() => {
              v++;
              el.textContent = dash ? Math.min(v, 4) + '–' + v : String(v);
              if (v >= to) {
                if (el._iv) clearInterval(el._iv);
                el.textContent = fmt;
              }
            }, 1000 / to);
          }, 600);
        });
      }
    };

    // Transition des portes et affichage du panneau ciblé
    const go = async () => {
      if (busy) return;
      busy = true;
      let guard = 0;
      while ((shown !== target || (target >= 0) !== isOpen) && sec.isConnected && guard++ < 8) {
        const t = target;
        if (isOpen) await doors(false);
        if (shown >= 0 && panels[shown]) {
          panels[shown].style.visibility = 'hidden';
          reset(panels[shown]);
        }
        shown = t;
        if (t >= 0 && panels[t]) {
          panels[t].style.visibility = 'visible';
          play(t);
          await doors(true);
        }
      }
      busy = false;
    };

    const n = panels.length;
    let step = -1;
    let locked = false;
    let cool = 0;

    const scroller = (() => {
      let el = sec.parentElement;
      while (el && el !== document.body) {
        const o = getComputedStyle(el).overflowY;
        if ((o === 'auto' || o === 'scroll') && el.scrollHeight > el.clientHeight + 4) return el;
        el = el.parentElement;
      }
      return null;
    })();

    const scTop = () => (scroller ? scroller.getBoundingClientRect().top : 0);

    const align = () => {
      const d = sec.getBoundingClientRect().top - scTop();
      if (Math.abs(d) < 2) return;
      if (scroller) scroller.scrollBy({ top: d, behavior: 'smooth' });
      else window.scrollBy({ top: d, behavior: 'smooth' });
    };

    const k = () => sec.getBoundingClientRect().height / sec.offsetHeight || 1;

    const size = () => {
      const raw = scroller ? scroller.clientHeight : window.innerHeight;
      if (raw < 200) {
        sec.style.height = pin.style.height = '';
        return;
      }
      const vh = raw / k();
      sec.style.height = vh + 'px';
      pin.style.height = vh + 'px';
    };

    const setStep = (v: number) => {
      step = v;
      target = v;
      hint.style.opacity = v < 0 ? '1' : '0';
      go();
      cool = Date.now() + 1100;
    };

    const onDir = (dir: number, e: Event | null) => {
      if (!sec.isConnected) return;
      const top = sec.getBoundingClientRect().top - scTop();
      const vh = scroller ? scroller.clientHeight : window.innerHeight;

      if (locked) {
        if (e && e.cancelable) e.preventDefault();
        if (Date.now() < cool) return;
        const nx = step + dir;
        if (nx >= n) {
          locked = false;
          return;
        }
        if (nx < 0) {
          locked = false;
          setStep(-1);
          return;
        }
        setStep(nx);
        return;
      }

      if (dir > 0 && top > 2 && top < vh * 0.75 && step < n - 1) {
        if (e && e.cancelable) e.preventDefault();
        align();
        locked = true;
        setStep(Math.max(0, step + 1));
        return;
      }

      if (dir < 0 && top <= 2 && top > -vh * 0.75 && step >= 0) {
        if (e && e.cancelable) e.preventDefault();
        if (Math.abs(top) > 2) {
          align();
          locked = true;
          cool = Date.now() + 700;
          return;
        }
        locked = true;
        if (Date.now() < cool) return;
        setStep(step - 1);
        if (step < 0) locked = false;
        return;
      }
    };

    const wheel = (e: WheelEvent) => {
      if (!sec.isConnected) return;
      if (Math.abs(e.deltaY) < 4) return;
      onDir(e.deltaY > 0 ? 1 : -1, e);
    };

    let ty: number | null = null;
    const ts = (e: TouchEvent) => {
      ty = e.touches[0].clientY;
    };
    const tm = (e: TouchEvent) => {
      if (locked && e.cancelable) e.preventDefault();
    };
    const te = (e: TouchEvent) => {
      if (ty == null) return;
      const dy = ty - e.changedTouches[0].clientY;
      ty = null;
      if (Math.abs(dy) > 40) onDir(dy > 0 ? 1 : -1, null);
    };

    // Permettre également le clic sur le hint pour avancer
    const onHintClick = () => {
      onDir(1, null);
    };

    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('touchstart', ts, { passive: true });
    window.addEventListener('touchmove', tm, { passive: false });
    window.addEventListener('touchend', te, { passive: true });
    window.addEventListener('resize', size);
    hint.addEventListener('click', onHintClick);

    size();

    return () => {
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('touchstart', ts);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', te);
      window.removeEventListener('resize', size);
      hint.removeEventListener('click', onHintClick);
    };
  }, []);

  return (
    <section
      ref={secRef}
      data-inno="1"
      data-screen-label="SI L'epreuve"
      style={{ position: 'relative', height: '100vh', background: '#fff' }}
    >
      <div
        data-inno-pin="1"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#fff',
          willChange: 'transform',
        }}
      >
        {/* Conteneur des 2 panneaux */}
        <div style={{ position: 'absolute', inset: 0, background: '#F4F7FD' }}>
          {/* PANNEAU 0 : L’ÉPREUVE */}
          <div
            data-ipanel="0"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '70px clamp(16px, 4vw, 48px) 30px',
              visibility: 'hidden',
            }}
          >
            <div
              data-ifit="1"
              style={{
                width: '100%',
                maxWidth: '860px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'center',
              }}
            >
              <span
                data-pop="1"
                style={{
                  font: '900 clamp(18px, 1.8vw, 24px)/1 Nunito, sans-serif',
                  letterSpacing: '.02em',
                  color: '#F58220',
                  textTransform: 'uppercase',
                  opacity: 0,
                  scale: '.6',
                }}
              >
                L’ÉPREUVE
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)' }}>
                <span
                  data-lbl="pb"
                  style={{
                    font: "900 14px 'JetBrains Mono', monospace",
                    letterSpacing: '.1em',
                    color: '#0A1430',
                    writingMode: 'vertical-rl',
                    rotate: '180deg',
                  }}
                >
                  PROBLÈME
                </span>

                <div
                  data-p1vis="1"
                  style={{ position: 'relative', width: '260px', height: '260px', flex: 'none' }}
                />

                <span
                  data-lbl="so"
                  style={{
                    font: "900 14px 'JetBrains Mono', monospace",
                    letterSpacing: '.1em',
                    color: '#E8621A',
                    writingMode: 'vertical-rl',
                    opacity: 0.25,
                  }}
                >
                  SOLUTION
                </span>
              </div>

              <h2
                data-pop="1"
                style={{
                  margin: 0,
                  font: '900 clamp(36px, 4.8vw, 68px)/.95 Nunito, sans-serif',
                  letterSpacing: '-.02em',
                  color: '#0A1430',
                  textWrap: 'balance',
                  opacity: 0,
                  scale: '.6',
                }}
              >
                Un vrai problème, <span style={{ color: '#1D4FD8' }}>une vraie solution</span>
              </h2>

              <p
                data-pop="1"
                style={{
                  margin: 0,
                  maxWidth: '46ch',
                  font: '700 clamp(16px, 1.5vw, 20px)/1.45 Nunito, sans-serif',
                  color: '#3D4459',
                  textWrap: 'pretty',
                  opacity: 0,
                  scale: '.6',
                }}
              >
                Les équipes choisissent un problème réel posé par une entreprise partenaire, puis
                proposent une solution concrète qu’elles défendent devant un jury.
              </p>
            </div>
          </div>

          {/* PANNEAU 1 : EN CHIFFRES */}
          <div
            data-ipanel="1"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '70px clamp(16px, 4vw, 48px) 30px',
              visibility: 'hidden',
            }}
          >
            <div
              data-ifit="1"
              style={{
                width: '100%',
                maxWidth: '860px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'center',
              }}
            >
              <span
                data-pop="1"
                style={{
                  font: '900 clamp(18px, 1.8vw, 24px)/1 Nunito, sans-serif',
                  letterSpacing: '.02em',
                  color: '#F58220',
                  textTransform: 'uppercase',
                  opacity: 0,
                  scale: '.6',
                }}
              >
                EN CHIFFRES
              </span>

              <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                {/* Carte 1 : Équipes */}
                <div
                  data-pop="1"
                  style={{
                    flex: '1 1 220px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '22px',
                    borderRadius: '26px',
                    background: 'linear-gradient(160deg, #FF9A3D, #E8621A)',
                    color: '#fff',
                    textAlign: 'left',
                    opacity: 0,
                    scale: '.6',
                  }}
                >
                  <div
                    style={{
                      minHeight: '56px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 22px)', gap: '6px' }}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={i}
                          data-dot="1"
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: '#fff',
                            opacity: 0,
                            scale: '0',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ font: '700 14px Nunito, sans-serif', opacity: 0.85 }}>environ</span>
                    <span
                      data-count="12"
                      data-fmt="12"
                      style={{
                        font: '900 clamp(52px, 5.4vw, 80px)/.9 Nunito, sans-serif',
                        letterSpacing: '-.03em',
                      }}
                    >
                      12
                    </span>
                    <span style={{ font: '800 18px/1.2 Nunito, sans-serif' }}>équipes</span>
                  </span>
                </div>

                {/* Carte 2 : Étudiants */}
                <div
                  data-pop="1"
                  style={{
                    flex: '1 1 220px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '22px',
                    borderRadius: '26px',
                    background: '#1D4FD8',
                    color: '#fff',
                    textAlign: 'left',
                    opacity: 0,
                    scale: '.6',
                  }}
                >
                  <div
                    style={{
                      minHeight: '56px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    {[0, 1, 2, 3].map((idx) => (
                      <span
                        key={idx}
                        data-dot="1"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px',
                          opacity: 0,
                          scale: '0',
                        }}
                      >
                        <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff' }} />
                        <span
                          style={{
                            width: '26px',
                            height: '16px',
                            borderRadius: '13px 13px 4px 4px',
                            background: '#fff',
                          }}
                        />
                      </span>
                    ))}
                    {[4, 5].map((idx) => (
                      <span
                        key={idx}
                        data-dot="1"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px',
                          opacity: 0,
                          scale: '0',
                        }}
                      >
                        <span
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: '2px solid #fff',
                            boxSizing: 'border-box',
                          }}
                        />
                        <span
                          style={{
                            width: '26px',
                            height: '16px',
                            borderRadius: '13px 13px 4px 4px',
                            border: '2px solid #fff',
                            boxSizing: 'border-box',
                          }}
                        />
                      </span>
                    ))}
                  </div>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ font: '700 14px Nunito, sans-serif', opacity: 0.85 }}>de</span>
                    <span
                      data-count="6"
                      data-fmt="4–6"
                      style={{
                        font: '900 clamp(52px, 5.4vw, 80px)/.9 Nunito, sans-serif',
                        letterSpacing: '-.03em',
                      }}
                    >
                      4–6
                    </span>
                    <span style={{ font: '800 18px/1.2 Nunito, sans-serif' }}>étudiants par équipe</span>
                  </span>
                </div>

                {/* Carte 3 : Jours de concours */}
                <div
                  data-pop="1"
                  style={{
                    flex: '1 1 220px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '22px',
                    borderRadius: '26px',
                    background: '#0A1430',
                    color: '#fff',
                    textAlign: 'left',
                    opacity: 0,
                    scale: '.6',
                  }}
                >
                  <div
                    style={{
                      minHeight: '56px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    {[27, 28, 29].map((day) => (
                      <span
                        key={day}
                        data-dot="1"
                        style={{
                          width: '44px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          background: '#fff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          opacity: 0,
                          scale: '0',
                        }}
                      >
                        <span
                          style={{
                            width: '100%',
                            padding: '2px 0',
                            background: '#1D4FD8',
                            color: '#fff',
                            font: "800 9px 'JetBrains Mono', monospace",
                            textAlign: 'center',
                          }}
                        >
                          JANV
                        </span>
                        <span style={{ font: '900 20px/1.3 Nunito, sans-serif', color: '#0A1430' }}>
                          {day}
                        </span>
                      </span>
                    ))}
                  </div>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ font: '700 14px Nunito, sans-serif', opacity: 0.85 }}>
                      du 27 au 29 janvier 2027
                    </span>
                    <span
                      data-count="3"
                      data-fmt="3"
                      style={{
                        font: '900 clamp(52px, 5.4vw, 80px)/.9 Nunito, sans-serif',
                        letterSpacing: '-.03em',
                      }}
                    >
                      3
                    </span>
                    <span style={{ font: '800 18px/1.2 Nunito, sans-serif' }}>jours de concours</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Porte Battante Gauche */}
        <div
          data-door="l"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '50%',
            overflow: 'hidden',
            background: '#fff',
            zIndex: 3,
            willChange: 'transform',
          }}
        >
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '200%' }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                translate: '0 -50%',
                display: 'flex',
                flexDirection: 'column',
                gap: '.02em',
                font: '900 clamp(64px, 9vw, 130px)/.95 Nunito, sans-serif',
                letterSpacing: '-.02em',
                userSelect: 'none',
              }}
            >
              {[1, -1, 1, -1, 1, -1, 1, -1, 1].map((dir, rIdx) => (
                <div
                  key={rIdx}
                  data-inno-row={dir}
                  style={{
                    display: 'flex',
                    gap: '.35em',
                    whiteSpace: 'nowrap',
                    marginLeft: dir > 0 ? '-480px' : '-640px',
                  }}
                >
                  {Array.from({ length: 16 }).map((_, sIdx) => (
                    <span
                      key={sIdx}
                      style={
                        dir > 0
                          ? { color: '#EEF1F8' }
                          : { color: 'transparent', WebkitTextStroke: '2px #DCE3F0' }
                      }
                    >
                      INNOVE
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Porte Battante Droite */}
        <div
          data-door="r"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '50%',
            overflow: 'hidden',
            background: '#fff',
            zIndex: 3,
            willChange: 'transform',
          }}
        >
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '-100%', width: '200%' }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                translate: '0 -50%',
                display: 'flex',
                flexDirection: 'column',
                gap: '.02em',
                font: '900 clamp(64px, 9vw, 130px)/.95 Nunito, sans-serif',
                letterSpacing: '-.02em',
                userSelect: 'none',
              }}
            >
              {[1, -1, 1, -1, 1, -1, 1, -1, 1].map((dir, rIdx) => (
                <div
                  key={rIdx}
                  data-inno-row={dir}
                  style={{
                    display: 'flex',
                    gap: '.35em',
                    whiteSpace: 'nowrap',
                    marginLeft: dir > 0 ? '-480px' : '-640px',
                  }}
                >
                  {Array.from({ length: 16 }).map((_, sIdx) => (
                    <span
                      key={sIdx}
                      style={
                        dir > 0
                          ? { color: '#EEF1F8' }
                          : { color: 'transparent', WebkitTextStroke: '2px #DCE3F0' }
                      }
                    >
                      INNOVE
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pill indicateur inférieur officiel */}
        <span
          data-inno-hint="1"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '28px',
            translate: '-50% 0',
            zIndex: 4,
            padding: '8px 14px',
            borderRadius: '999px',
            background: '#0A1430',
            color: '#fff',
            font: "800 12px 'JetBrains Mono', monospace",
            letterSpacing: '.12em',
            transition: 'opacity .4s',
            cursor: 'pointer',
          }}
        >
          FAITES DÉFILER ↓
        </span>
      </div>
    </section>
  );
};
