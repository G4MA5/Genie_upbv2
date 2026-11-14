import React, { useEffect, useRef } from 'react';

interface TeamItem {
  n: string;
  v: number;
  d: number;
  el?: HTMLDivElement;
}

interface CommodityItem {
  n: string;
  p: number;
  c: number;
}

interface Candle {
  o: number;
  c: number;
  tc: number;
  h: number;
  l: number;
}

/**
 * EcoSimulation — Plateforme de Marché en direct & Terminal de Trading
 * 100% conforme à scripts/proto_real.html (lignes 909-918 et 1705-1755) :
 * - Titre : « Un portefeuille, un capital fictif, un vrai marché. »
 * - Boîtier de terminal authentique data-mkt="1" avec bordure blanche 6px
 * - Point vert clignotant data-mkt-dot="1"
 * - Indice en direct data-mkt-idx="1" (GUPB 1 000,00 ▲ 0,00 %)
 * - Canvas chandelier japonais data-mkt-chart="1" avec mèches, corps colorés et ligne de cours actuelle
 * - Classement animé des 12 équipes data-mkt-board="1" avec seuil de qualification « SEUIL SOUTENANCE FINALE »
 * - Ruban défilant des 10 matières premières ivoiriennes data-mkt-tape="1"
 * - Grille des 3 étapes clés d'évaluation
 */
export const EcoSimulation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const tapeRef = useRef<HTMLDivElement | null>(null);
  const idxRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    const cv = canvasRef.current;
    const board = boardRef.current;
    const tape = tapeRef.current;
    const idx = idxRef.current;
    const dot = dotRef.current;
    if (!root || !cv || !board || !tape || !idx || !dot) return;

    const fmt = (v: number) =>
      v.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // 12 équipes authentiques du prototype
    const teamNames = [
      'Alpha', 'Baobab', 'Cauris', 'Delta', 'Épi', 'Faso',
      'Griot', 'Harmattan', 'Ivoire', 'Karité', 'Lagune', 'Sahel'
    ];
    const teams: TeamItem[] = teamNames.map(n => ({
      n,
      v: 100000 + Math.random() * 6000,
      d: 0,
    }));

    const RH = 30;
    const Q = 4; // Top 4 qualifiés pour la soutenance finale

    // Nettoyage préalable du board
    board.innerHTML = '';

    // Création des lignes du classement
    teams.forEach(t => {
      const r = document.createElement('div');
      r.style.cssText = `position:absolute;left:0;right:0;height:${RH - 4}px;display:flex;align-items:center;gap:10px;padding:0 10px;border-radius:8px;font:700 13px 'JetBrains Mono',ui-monospace,Menlo,monospace;transition:top .7s cubic-bezier(.3,1.2,.5,1),background .4s`;
      r.innerHTML =
        '<span data-r style="width:22px;color:#4E7A57"></span>' +
        '<span style="flex:1;color:#E6F5E8;font-family:Nunito,sans-serif;font-weight:800;font-size:14px">Équipe ' +
        t.n +
        '</span>' +
        '<span data-v style="color:#E6F5E8"></span>' +
        '<span data-d style="width:64px;text-align:right"></span>';
      board.appendChild(r);
      t.el = r;
    });

    // Ligne de seuil de qualification
    const sep = document.createElement('div');
    sep.style.cssText = `position:absolute;left:0;right:0;top:${Q * RH - 2}px;border-top:1px dashed #63D06F;font:700 10px 'JetBrains Mono',monospace;color:#63D06F;letter-spacing:.08em;text-align:right;padding-top:2px`;
    sep.textContent = 'SEUIL SOUTENANCE FINALE';
    board.appendChild(sep);

    const updateRanks = () => {
      [...teams]
        .sort((a, b) => b.v - a.v)
        .forEach((t, i) => {
          if (!t.el) return;
          const q = i < Q;
          t.el.style.top = `${i * RH + (q ? 0 : 14)}px`;
          t.el.style.background = q ? 'rgba(59,255,122,.08)' : 'transparent';
          const rEl = t.el.querySelector('[data-r]');
          if (rEl) rEl.textContent = String(i + 1).padStart(2, '0');
          const vEl = t.el.querySelector('[data-v]');
          if (vEl) vEl.textContent = fmt(t.v);
          const dEl = t.el.querySelector('[data-d]') as HTMLElement | null;
          if (dEl) {
            dEl.textContent = `${t.d >= 0 ? '▲ ' : '▼ '}${Math.abs(t.d).toFixed(2).replace('.', ',')} %`;
            dEl.style.color = t.d >= 0 ? '#3BFF7A' : '#FF5A4E';
          }
        });
    };

    updateRanks();
    board.style.height = `${teams.length * RH + 14}px`;

    // 10 matières premières officielles du prototype
    const syms = ['CACAO', 'COTON', 'OR', 'ANACARDE', 'KARITÉ', 'CAFÉ', 'MANGUE', 'SÉSAME', 'ÉNERGIE', 'TÉLÉCOM'];
    const commodities: CommodityItem[] = syms.map(n => ({
      n,
      p: 50 + Math.random() * 450,
      c: (Math.random() - 0.45) * 4,
    }));

    const drawTape = () => {
      const h = commodities
        .map(
          t =>
            `<span style="color:#E6F5E8">${t.n} <span style="color:${t.c >= 0 ? '#3BFF7A' : '#FF5A4E'}">${fmt(t.p)} ${t.c >= 0 ? '▲' : '▼'} ${Math.abs(t.c).toFixed(2).replace('.', ',')} %</span></span>`
        )
        .join('');
      tape.innerHTML = h + h;
    };

    drawTape();
    const tapeAn = tape.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-50%)' },
      ],
      { duration: 40000, iterations: Infinity }
    );

    const dotAn = dot.animate(
      [{ opacity: 1 }, { opacity: 0.25 }],
      { duration: 700, iterations: Infinity, direction: 'alternate' }
    );

    // Initialisation de la série de chandeliers (Candlestick Data)
    const candles: Candle[] = [];
    let lastPrice = 1000;
    for (let k = 0; k < 60; k++) {
      const o = lastPrice;
      const c = o + (Math.random() - 0.46) * 14;
      candles.push({
        o,
        c,
        tc: c,
        h: Math.max(o, c) + Math.random() * 6,
        l: Math.min(o, c) - Math.random() * 6,
      });
      lastPrice = c;
    }

    let t0 = performance.now();
    const ctx = cv.getContext('2d');
    let reqId: number;

    const draw = (now: number) => {
      if (!root.isConnected || !ctx) {
        tapeAn.cancel();
        dotAn.cancel();
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const W = cv.clientWidth;
      const H = cv.clientHeight;

      if (cv.width !== W * dpr || cv.height !== H * dpr) {
        cv.width = W * dpr;
        cv.height = H * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const prog = Math.min(1, (now - t0) / 900);
      const cur = candles[candles.length - 1];
      cur.c = cur.o + (cur.tc - cur.o) * prog;
      cur.h = Math.max(cur.h, cur.c);
      cur.l = Math.min(cur.l, cur.c);

      const vis = candles.slice(-48);
      const mx = Math.max(...vis.map(c => c.h)) + 8;
      const mn = Math.min(...vis.map(c => c.l)) - 8;
      const y = (v: number) => 40 + ((mx - v) / (mx - mn)) * (H - 60);
      const cw = (W - 70) / 48;

      // Lignes de grille horizontales et verticales
      ctx.strokeStyle = 'rgba(99,208,111,.09)';
      ctx.lineWidth = 1;
      for (let k = 0; k < 6; k++) {
        const yy = 40 + (k * (H - 60)) / 5;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(W, yy);
        ctx.stroke();
      }
      for (let k = 0; k < 12; k++) {
        const xx = (k * W) / 12;
        ctx.beginPath();
        ctx.moveTo(xx, 30);
        ctx.lineTo(xx, H);
        ctx.stroke();
      }

      // Courbe continue reliant les clôtures
      ctx.beginPath();
      vis.forEach((c, i) => {
        const x = 12 + i * cw + cw / 2;
        if (i === 0) ctx.moveTo(x, y(c.c));
        else ctx.lineTo(x, y(c.c));
      });
      ctx.strokeStyle = 'rgba(59,255,122,.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Rendu de chaque chandelier
      vis.forEach((c, i) => {
        const x = 12 + i * cw;
        const up = c.c >= c.o;
        const col = up ? '#3BFF7A' : '#FF5A4E';
        ctx.shadowColor = col;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = col;
        ctx.fillStyle = col;

        // Mèche haute & basse
        ctx.beginPath();
        ctx.moveTo(x + cw / 2, y(c.h));
        ctx.lineTo(x + cw / 2, y(c.l));
        ctx.stroke();

        // Corps du chandelier
        const top = y(Math.max(c.o, c.c));
        const bh = Math.max(2, Math.abs(y(c.o) - y(c.c)));
        ctx.fillRect(x + cw * 0.18, top, cw * 0.64, bh);
      });
      ctx.shadowBlur = 0;

      // Ligne horizontale pointillée du cours actuel avec étiquette
      const ly = y(cur.c);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(59,255,122,.6)';
      ctx.beginPath();
      ctx.moveTo(0, ly);
      ctx.lineTo(W - 64, ly);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#3BFF7A';
      ctx.fillRect(W - 64, ly - 11, 60, 22);
      ctx.fillStyle = '#050A07';
      ctx.font = "700 12px 'JetBrains Mono',monospace";
      ctx.fillText(cur.c.toFixed(1), W - 58, ly + 4);

      reqId = requestAnimationFrame(draw);
    };

    // Cycle d'actualisation des cotations (toutes les 1100ms)
    const tick = () => {
      if (!root.isConnected) return;
      const o = candles[candles.length - 1].c;
      const tc = o + (Math.random() - 0.46) * 16;
      candles.push({ o, c: o, tc, h: o, l: o });
      if (candles.length > 80) candles.shift();
      t0 = performance.now();

      // Fluctuations des portefeuilles équipes
      teams.forEach(t => {
        const d = (Math.random() - 0.47) * 1.4;
        t.v *= 1 + d / 100;
        t.d = d;
      });
      updateRanks();

      // Fluctuations des matières premières
      commodities.forEach(t => {
        t.c = (Math.random() - 0.45) * 4;
        t.p *= 1 + t.c / 400;
      });

      // Mise à jour de l'indice principal
      const lastCandle = candles[candles.length - 1];
      const v = lastCandle.tc;
      const ch = (v - 1000) / 10;
      idx.textContent = `GUPB ${fmt(v)}${ch >= 0 ? ' ▲ ' : ' ▼ '}${Math.abs(ch).toFixed(2).replace('.', ',')} %`;
      idx.style.color = ch >= 0 ? '#3BFF7A' : '#FF5A4E';
    };

    candles[candles.length - 1].tc = candles[candles.length - 1].c;
    const intervalId = setInterval(tick, 1100);
    reqId = requestAnimationFrame(draw);

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(reqId);
      tapeAn.cancel();
      dotAn.cancel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="simulation"
      className="relative overflow-hidden bg-[#12301A] py-[clamp(64px,8vw,112px)] px-[clamp(16px,5vw,72px)] select-none"
    >
      <div className="relative max-w-[1200px] mx-auto flex flex-col gap-[clamp(28px,4vw,48px)]">
        {/* Titre de la Section */}
        <h2 className="m-0 max-w-[22ch] font-black text-[clamp(32px,4.4vw,60px)] leading-[1.02] tracking-[-0.025em] text-white font-['Nunito',sans-serif]">
          Un portefeuille, un capital fictif,{' '}
          <span className="text-[#63D06F]">un vrai marché.</span>
        </h2>

        {/* Boîtier Terminal Financier Officiel */}
        <div
          data-mkt="1"
          className="relative rounded-[28px] border-[6px] border-white bg-[#050A07] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
        >
          {/* Header Terminal */}
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[#12301A] font-bold text-[13px] font-['JetBrains_Mono',monospace] text-[#63D06F] tracking-[0.08em]">
            <span className="flex items-center gap-2.5">
              <span
                ref={dotRef}
                data-mkt-dot="1"
                className="w-[9px] h-[9px] rounded-full bg-[#3BFF7A] shadow-[0_0_12px_#3BFF7A]"
              />
              GÉNIE MARKET · SIMULATION
            </span>
            <span ref={idxRef} data-mkt-idx="1" className="text-[#3BFF7A]">
              GUPB 1 000,00 ▲ 0,00 %
            </span>
          </div>

          {/* Grille principale : Chandelier à gauche, Classement à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-w-0">
            {/* Graphique Chandelier */}
            <div className="relative min-w-0 h-[clamp(260px,32vw,400px)] border-b lg:border-b-0 lg:border-r border-[#12301A]">
              <canvas
                ref={canvasRef}
                data-mkt-chart="1"
                className="absolute inset-0 w-full h-full block"
              />
              <span className="absolute left-[18px] top-[14px] font-bold text-xs font-['JetBrains_Mono',monospace] text-[#4E7A57] tracking-[0.08em] pointer-events-none">
                PORTEFEUILLE · VALEUR EN TEMPS RÉEL
              </span>
            </div>

            {/* Classement des Équipes */}
            <div className="flex flex-col min-w-0 p-4 sm:p-[18px] gap-1">
              <span className="font-bold text-xs font-['JetBrains_Mono',monospace] text-[#4E7A57] tracking-[0.08em] pb-2">
                CLASSEMENT · VALEUR DU PORTEFEUILLE
              </span>
              <div
                ref={boardRef}
                data-mkt-board="1"
                className="relative h-[360px] overflow-hidden"
              />
            </div>
          </div>

          {/* Bandeau inférieur défilant des matières premières (Ticker Tape) */}
          <div className="overflow-hidden border-t border-[#12301A] py-3">
            <div
              ref={tapeRef}
              data-mkt-tape="1"
              className="flex gap-10 whitespace-nowrap font-bold text-sm font-['JetBrains_Mono',monospace] w-max"
            />
          </div>
        </div>

        {/* Grille des 3 étapes clés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,3vw,40px)]">
          <div className="flex gap-4 items-start min-w-0">
            <span className="font-black text-[40px] leading-none text-[#63D06F] tracking-[-0.03em] font-['Nunito',sans-serif]">
              01
            </span>
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-black text-[21px] leading-[1.15] text-white font-['Nunito',sans-serif]">
                Simulation de marché
              </span>
              <span className="font-medium text-base leading-[1.45] text-[#A9C9AE] font-['Nunito',sans-serif]">
                Les équipes gèrent un portefeuille sur capital fictif.
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-start min-w-0">
            <span className="font-black text-[40px] leading-none text-[#63D06F] tracking-[-0.03em] font-['Nunito',sans-serif]">
              02
            </span>
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-black text-[21px] leading-[1.15] text-white font-['Nunito',sans-serif]">
                Premier classement
              </span>
              <span className="font-medium text-base leading-[1.45] text-[#A9C9AE] font-['Nunito',sans-serif]">
                Basé sur la valeur de leur portefeuille.
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-start min-w-0">
            <span className="font-black text-[40px] leading-none text-[#63D06F] tracking-[-0.03em] font-['Nunito',sans-serif]">
              03
            </span>
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-black text-[21px] leading-[1.15] text-white font-['Nunito',sans-serif]">
                Soutenance finale
              </span>
              <span className="font-medium text-base leading-[1.45] text-[#A9C9AE] font-['Nunito',sans-serif]">
                Les équipes qualifiées passent devant le jury.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSimulation;
