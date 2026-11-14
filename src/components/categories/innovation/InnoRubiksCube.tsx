import React, { useEffect, useRef } from 'react';

interface InnoRubiksCubeProps {
  onSolved?: () => void;
  autoSolveDelay?: number;
}

export interface InnoCubeHandle {
  scramble: () => void;
  solve: (delay?: number, done?: () => void) => Promise<void>;
}

/**
 * InnoRubiksCube — Cube 3D Rubik interactif officiel
 * Extrait directement du prototype officiel scripts/proto_real.html (lignes 1580-1602)
 * Réalisé en 100% CSS 3D avec 27 cubies et résolution algorithmique automatique.
 */
export const InnoRubiksCube: React.FC<InnoRubiksCubeProps> = ({
  onSolved,
  autoSolveDelay = 1000,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    // Nettoyage préalable
    host.innerHTML = '';

    const S = 56;
    const H = S / 2;
    const COL: Record<string, string> = {
      px: '#F58220', // Orange UPB
      nx: '#1D4FD8', // Bleu UPB
      py: '#F2C230', // Jaune
      ny: '#FFFFFF', // Blanc
      pz: '#E0284F', // Rouge
      nz: '#1DA84A', // Vert
    };

    host.style.perspective = '1000px';

    const sway = document.createElement('div');
    sway.style.cssText = 'position:absolute;inset:0;transform-style:preserve-3d;';

    const stage = document.createElement('div');
    stage.style.cssText =
      'position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(-26deg) rotateY(-36deg);';
    sway.appendChild(stage);
    host.appendChild(sway);

    // Flottaison pendulaire continue
    const swayAnim = sway.animate(
      [
        { transform: 'rotateY(-12deg) rotateX(4deg)' },
        { transform: 'rotateY(12deg) rotateX(-4deg)' },
      ],
      {
        duration: 4200,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
      }
    );

    const FT: Record<string, string> = {
      pz: `translateZ(${H}px)`,
      nz: `rotateY(180deg) translateZ(${H}px)`,
      px: `rotateY(90deg) translateZ(${H}px)`,
      nx: `rotateY(-90deg) translateZ(${H}px)`,
      py: `rotateX(90deg) translateZ(${H}px)`,
      ny: `rotateX(-90deg) translateZ(${H}px)`,
    };

    interface Cubie {
      el: HTMLDivElement;
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
          el.style.cssText = `position:absolute;left:50%;top:50%;width:${S}px;height:${S}px;margin:${-H}px 0 0 ${-H}px;transform-style:preserve-3d;`;

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
            fa.style.cssText = `position:absolute;inset:0;box-sizing:border-box;padding:4px;background:#0A1430;backface-visibility:hidden;transform:${FT[f]};`;

            const st = document.createElement('div');
            st.style.cssText = `width:100%;height:100%;border-radius:9px;background:${
              out[f] ? COL[f] : '#0A1430'
            };${
              out[f]
                ? 'box-shadow:inset 0 -4px 0 rgba(0,0,0,0.18),inset 0 3px 0 rgba(255,255,255,0.35);'
                : ''
            }`;

            fa.appendChild(st);
            el.appendChild(fa);
          });

          const c: Cubie = {
            el,
            pos: [x, y, z],
            ops: [],
            home: `translate3d(${x * S}px,${y * S}px,${z * S}px)`,
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
    let isMounted = true;

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
      if (!isMounted || t !== tok) return;

      for (let k = hist.length - 1; k >= 0; k--) {
        if (!isMounted || t !== tok) return;
        const [ax, l, d] = hist[k];
        await move([ax, l, -d], 280);
        await new Promise((r) => setTimeout(r, 30));
      }

      if (!isMounted || t !== tok) return;
      hist = [];

      // Célébration finale par rotation triomphale 360°
      const spin = stage.animate(
        [
          { transform: 'rotateX(-26deg) rotateY(-36deg) scale(1)' },
          { transform: 'rotateX(-26deg) rotateY(144deg) scale(1.08)', offset: 0.5 },
          { transform: 'rotateX(-26deg) rotateY(324deg) scale(1)' },
        ],
        { duration: 1100, easing: 'cubic-bezier(.3,0,.2,1)' }
      );

      spin.onfinish = () => {
        stage.style.transform = 'rotateX(-26deg) rotateY(-36deg)';
        done && done();
        onSolved && onSolved();
      };
    };

    // Scramble initial puis résolution automatique
    scramble();
    const solveTimer = setTimeout(() => {
      solve(200);
    }, autoSolveDelay);

    return () => {
      isMounted = false;
      tok++;
      clearTimeout(solveTimer);
      swayAnim.cancel();
    };
  }, [onSolved, autoSolveDelay]);

  return (
    <div
      ref={containerRef}
      data-p1vis="1"
      className="relative w-[220px] sm:w-[260px] h-[220px] sm:h-[260px] flex-none select-none"
    />
  );
};

export default InnoRubiksCube;
