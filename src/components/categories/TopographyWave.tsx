import React from 'react';

export default function TopographyWave() {
  // 24 contour lines with undulating paths representing elevation
  const lines = Array.from({ length: 24 }, (_, i) => {
    const yBase = 30 + i * 28;
    const amp1 = 20 + (i % 5) * 8;
    const amp2 = 25 + ((i + 2) % 6) * 7;
    return `M -50 ${yBase} Q 250 ${yBase - amp1} 550 ${yBase + amp2} T 1150 ${yBase - amp1} T 1650 ${yBase}`;
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      viewBox="0 0 1400 780"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 24 contour lines */}
      {lines.map((d, idx) => (
        <path
          key={idx}
          d={d}
          stroke="#9FB6FF"
          strokeWidth="1.2"
          strokeOpacity={0.25 + (idx % 4) * 0.15}
        />
      ))}

      {/* Plus markers */}
      {plusMarkers.map((pt, idx) => (
        <g key={idx} stroke="#9FB6FF" strokeWidth="1.5" opacity={0.5}>
          <line x1={pt.x - 4} y1={pt.y} x2={pt.x + 4} y2={pt.y} />
          <line x1={pt.x} y1={pt.y - 4} x2={pt.x} y2={pt.y + 4} />
        </g>
      ))}
    </svg>
  );
}
