import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

export const CountdownTimer: React.FC = () => {
  const { days, hours, minutes, seconds } = useCountdown('2026-12-18T23:59:59');

  const blocks = [
    { val: days, label: 'Jours' },
    { val: hours, label: 'Heures' },
    { val: minutes, label: 'Min' },
    { val: seconds, label: 'Sec' }
  ];

  return (
    <div className="bg-[#0A1430] border border-slate-800 text-white p-6 rounded-2xl shadow-xl inline-flex flex-col items-center">
      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E8742A] mb-3">
        Clôture des inscriptions dans :
      </span>
      <div className="flex items-center gap-3">
        {blocks.map((b, i) => (
          <React.Fragment key={b.label}>
            <div className="flex flex-col items-center">
              <span className="font-mono font-black text-2xl sm:text-3xl text-white bg-slate-800/80 px-3 py-2 rounded-xl">
                {b.val}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">{b.label}</span>
            </div>
            {i < blocks.length - 1 && <span className="text-xl text-[#E8742A] font-bold -mt-4">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
