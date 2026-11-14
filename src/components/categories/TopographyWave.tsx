import React from 'react';

export default function TopographyWave() {
  // 24 contour lines with undulating paths representing elevation
  const lines = Array.from({ length: 24 }, (_, i) => {
    const yBase = 20 + i * 30;
    const amp1 = 22 + (i % 5) * 8;
    const amp2 = 28 + ((i + 2) % 6) * 7;
    return {
      d: `M -50 ${yBase} Q 250 ${yBase - amp1} 550 ${yBase + amp2} T 1150 ${yBase - amp1} T 1650 ${yBase}`,
      dAlt: `M -50 ${yBase + 12} Q 250 ${yBase + amp2} 550 ${yBase - amp1} T 1150 ${yBase + amp2} T 1650 ${yBase + 12}`,
      opacity: 0.22 + (i % 4) * 0.12,
      duration: `${14 + (i % 6) * 2}s`,
    };
  });

  // Plus markers coordinates across the terrain
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
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
      viewBox="0 0 1400 780"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 24 contour lines with undulating morph */}
      {lines.map((l, idx) => (
        <path
          key={idx}
          d={l.d}
          stroke="#9FB6FF"
          strokeWidth="1.2"
          strokeOpacity={l.opacity}
        >
          <animate
            attributeName="d"
            values={`${l.d}; ${l.dAlt}; ${l.d}`}
            dur={l.duration}
            repeatCount="indefinite"
          />
        </path>
      ))}

      {/* Plus markers with subtle pulse */}
      {plusMarkers.map((pt, idx) => (
        <g key={idx} stroke="#9FB6FF" strokeWidth="1.5" opacity={0.55}>
          <line x1={pt.x - 4} y1={pt.y} x2={pt.x + 4} y2={pt.y} />
          <line x1={pt.x} y1={pt.y - 4} x2={pt.x} y2={pt.y + 4} />
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur={`${3 + (idx % 3)}s`}
            repeatCount="indefinite"
          />
        </g>
      ))}
    </svg>
  );
}
