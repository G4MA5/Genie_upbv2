import React, { useEffect, useRef } from 'react';
import { TECH_BLUEPRINT_GRID } from '../../assets/techBlueprintGrid';

export default function TechHeroBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const tetrisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Dérive diagonale continue de la grille blueprint (880px x 660px sur 90s)
    const bgAnim = bgRef.current?.animate(
      [
        { backgroundPosition: '0 0' },
        { backgroundPosition: '880px 660px' },
      ],
      { duration: 90000, iterations: Infinity }
    );

    // 2. Animation cyber tetris / terminaux CRT Matrix (data-tetris authentique)
    const host = tetrisRef.current;
    if (!host) return;

    const C = 110;
    const layer = document.createElement('div');
    layer.style.cssText =
      'position:absolute;left:-880px;top:-660px;right:0;bottom:0;pointer-events:none';
    host.appendChild(layer);

    const layerAnim = layer.animate(
      [
        { transform: 'translate(0,0)' },
        { transform: 'translate(880px,660px)' },
      ],
      { duration: 90000, iterations: Infinity }
    );

    const cell = (x: number, y: number, col: string) => {
      const d = document.createElement('div');
      d.style.cssText = `position:absolute;left:${x * C + 1}px;top:${y * C + 1}px;width:${C - 2}px;height:${C - 2}px;background:${col};`;
      return d;
    };

    const GL = '01{}<>=;()[]/*+-#$&abcdefxyz'.split('').concat(['if', 'fn', '=>', '&&', '!=']);

    const TV = (sc: HTMLElement) => {
      sc.style.background = '#020A08';
      const cv = document.createElement('canvas');
      const S = 96;
      cv.width = cv.height = S * 2;
      cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
      sc.appendChild(cv);

      const ctx = cv.getContext('2d');
      if (!ctx) return;
      ctx.scale(2, 2);
      const fs = 9;
      const nc = Math.ceil(S / 7);
      const ys = Array.from({ length: nc }, () => Math.random() * -S);
      const sp = Array.from({ length: nc }, () => 0.5 + Math.random() * 1.4);
      ctx.font = `700 ${fs}px 'JetBrains Mono',monospace`;
      let last = 0;

      const step = (t: number) => {
        if (!sc.isConnected) return;
        requestAnimationFrame(step);
        if (t - last < 45) return;
        last = t;
        ctx.fillStyle = 'rgba(2,10,8,.22)';
        ctx.fillRect(0, 0, S, S);
        for (let c = 0; c < nc; c++) {
          const g = GL[Math.floor(Math.random() * GL.length)];
          const yy = ys[c];
          ctx.fillStyle = '#E6FFF0';
          ctx.fillText(g, c * 7, yy);
          ctx.fillStyle = Math.random() < 0.08 ? '#F58220' : '#36F27E';
          ctx.fillText(GL[Math.floor(Math.random() * GL.length)], c * 7, yy - fs);
          ys[c] += fs * sp[c] * 0.6;
          if (ys[c] > S + 20 && Math.random() > 0.9) ys[c] = Math.random() * -30;
        }
      };
      requestAnimationFrame(step);
    };

    const vis = (): [number, number] => {
      const m = new DOMMatrixReadOnly(getComputedStyle(layer).transform);
      const ox = 880 - m.m41;
      const oy = 660 - m.m42;
      return [
        Math.floor((ox + Math.random() * host.offsetWidth) / C),
        Math.floor((oy + Math.random() * host.offsetHeight) / C),
      ];
    };

    const live = new Set<string>();
    const blink = setInterval(() => {
      if (!host.isConnected) return clearInterval(blink);
      const [vx, vy] = vis();
      const key = `${vx},${vy}`;
      if (live.has(key) || live.size > 5) return;
      live.add(key);

      const d = cell(vx, vy, '#0B1430');
      d.style.padding = '7px';
      d.style.boxSizing = 'border-box';
      d.style.boxShadow =
        'inset 0 0 0 2px #2B3B68, 0 0 24px rgba(47,107,240,0.35)';
      layer.appendChild(d);

      const sc = document.createElement('div');
      sc.style.cssText =
        'position:relative;width:100%;height:100%;border-radius:14px/12px;overflow:hidden';
      d.appendChild(sc);
      TV(sc);

      const fx = document.createElement('span');
      fx.style.cssText =
        'position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:repeating-linear-gradient(180deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px),radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,0,.55) 100%),linear-gradient(135deg,rgba(255,255,255,.18),transparent 40%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)';
      sc.appendChild(fx);

      const line = document.createElement('span');
      line.style.cssText =
        'position:absolute;left:0;right:0;top:50%;height:2px;margin-top:-1px;background:#fff;box-shadow:0 0 10px #fff,0 0 20px #7FB2FF;pointer-events:none';
      d.appendChild(line);

      const life = 4200 + Math.random() * 2600;

      line.animate(
        [
          { opacity: 1, transform: 'scaleX(0)' },
          { opacity: 1, transform: 'scaleX(1)', offset: 0.04 },
          { opacity: 0, transform: 'scaleX(1)', offset: 0.08 },
          { opacity: 0, offset: 0.9 },
          { opacity: 1, transform: 'scaleX(1)', offset: 0.95 },
          { opacity: 1, transform: 'scaleX(0)' },
        ],
        { duration: life, fill: 'both' }
      );

      sc.animate(
        [
          { transform: 'scaleY(.01)', filter: 'brightness(4)' },
          { transform: 'scaleY(.01)', offset: 0.04 },
          { transform: 'scaleY(1)', filter: 'brightness(1.6)', offset: 0.08 },
          { transform: 'scaleY(1)', filter: 'brightness(1)', offset: 0.12 },
          { transform: 'scaleY(1)', filter: 'brightness(1)', offset: 0.9 },
          { transform: 'scaleY(.01)', filter: 'brightness(4)', offset: 0.95 },
          { transform: 'scaleY(.01)', filter: 'brightness(4)' },
        ],
        { duration: life, fill: 'both' }
      );

      const dAnim = d.animate(
        [
          { opacity: 0 },
          { opacity: 1, offset: 0.02 },
          { opacity: 1, offset: 0.97 },
          { opacity: 0 },
        ],
        { duration: life }
      );

      dAnim.onfinish = () => {
        d.remove();
        live.delete(key);
      };
    }, 450);

    return () => {
      bgAnim?.cancel();
      layerAnim?.cancel();
      clearInterval(blink);
      layer.remove();
    };
  }, []);

  return (
    <>
      {/* 1. Grille Blueprint SVG animée en dérive */}
      <div
        ref={bgRef}
        data-si-bg="1"
        aria-hidden="true"
        className="absolute inset-0 bg-repeat bg-[length:880px_660px] pointer-events-none"
        style={{ backgroundImage: `url("${TECH_BLUEPRINT_GRID}")` }}
      />

      {/* 2. Cyber Tetris CRT terminal spawner */}
      <div
        ref={tetrisRef}
        data-tetris="1"
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
    </>
  );
}
