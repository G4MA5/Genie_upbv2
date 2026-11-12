import React from 'react';
import { timelineData } from '../../data/timelineData';

export const TournamentTimeline: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8742A] block mb-2">Calendrier Officiel</span>
          <h2 className="font-black text-2xl sm:text-4xl text-[#0E1E4A]">De l'inscription à la finale</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {timelineData.map((step, idx) => (
            <div key={step.date} className="bg-[#F6F8FC] p-6 rounded-2xl border border-slate-100 relative">
              <span className="w-8 h-8 rounded-full bg-[#0E1E4A] text-white flex items-center justify-center font-bold text-xs mb-4">
                0{idx + 1}
              </span>
              <span className="font-mono text-xs font-bold text-[#E8742A] block mb-1">{step.date}</span>
              <h3 className="font-extrabold text-base text-[#0E1E4A] mb-2">{step.titre}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
