import React from 'react';

export default function TopographyWave() {
  // 24 lignes de contours topographiques
  const lines = Array.from({ length: 24 }, (_, i) => {
    const yBase = 20 + i * 30;
    const amp1 = 22 + (i % 5) * 8;
    const amp2 = 28 + ((i + 2) % 6) * 7;
    return {
      d: `M -50 ${yBase} Q 250 ${yBase - amp1} 550 ${yBase + amp2} T 1150 ${yBase - amp1} T 1650 ${yBase}`,
      opacity: 0.22 + (i % 4) * 0.12,
      isEven: i % 2 === 0,
    };
  });

  // Coordonnées des marqueurs « plus »
  const plusMarkers = [
    { x: 140, y: 120 },
    { x: 380, y: 220 },
    { x: 720, y: 160 },
    { x: 960, y: 280 },
    { x: 260, y: 440 },
    { x: 580, y: 520 },
    { x: 880, y: 460 },
    { x: 1120, y: 560 },
    { x: 200, y: 650 },
    { x: 760, y: 680 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-45">
      <style>{`
        @keyframes topoWaveEven {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes topoWaveOdd {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .topo-group-even {
          animation: topoWaveEven 10s ease-in-out infinite;
          will-change: transform;
        }
        .topo-group-odd {
          animation: topoWaveOdd 12s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 780"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Groupe de lignes paires ondulant via GPU */}
        <g className="topo-group-even">
          {lines
            .filter((l) => l.isEven)
            .map((l, idx) => (
              <path
                key={idx}
                d={l.d}
                stroke="#9FB6FF"
                strokeWidth="1.2"
                strokeOpacity={l.opacity}
              />
            ))}
        </g>

        {/* Groupe de lignes impaires ondulant en opposition de phase via GPU */}
        <g className="topo-group-odd">
          {lines
            .filter((l) => !l.isEven)
            .map((l, idx) => (
              <path
                key={idx}
                d={l.d}
                stroke="#9FB6FF"
                strokeWidth="1.2"
                strokeOpacity={l.opacity}
              />
            ))}
        </g>

        {/* Marqueurs plus statiques très légers (zéro recalcul CPU) */}
        {plusMarkers.map((pt, idx) => (
          <g key={idx} stroke="#9FB6FF" strokeWidth="1.5" opacity={0.5}>
            <line x1={pt.x - 4} y1={pt.y} x2={pt.x + 4} y2={pt.y} />
            <line x1={pt.x} y1={pt.y - 4} x2={pt.x} y2={pt.y + 4} />
          </g>
        ))}
      </svg>
    </div>
  );
}
