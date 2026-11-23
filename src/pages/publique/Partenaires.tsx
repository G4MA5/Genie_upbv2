import React from 'react';
import { partnerGroups } from '../../data/partnersData';
import { toast } from 'react-hot-toast';

export default function Partenaires() {
  const handlePartnerClick = (name: string) => {
    toast(`Partenaire officiel : ${name}`, {
      icon: '🤝',
      style: {
        borderRadius: '16px',
        background: '#0E1E4A',
        color: '#fff',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 700,
      },
    });
  };

  // Badges visuels distinctifs pour chaque slot de logo du prototype
  const renderLogoPlaceholder = (id: string, name: string) => {
    switch (id) {
      case 'pt-1': // ElectroCI
        return (
          <div className="w-full h-full rounded-[10px] bg-[#EAF2FF] border border-[#2F6BF0]/20 flex flex-col items-center justify-center p-1">
            <span className="font-extrabold text-[13px] text-[#2F6BF0] tracking-tight">ElectroCI</span>
            <span className="text-[9px] font-mono font-semibold text-[#2F6BF0]/70 uppercase">Hardware</span>
          </div>
        );
      case 'pt-2': // Ivoire Labs
        return (
          <div className="w-full h-full rounded-[10px] bg-[#F0FAF4] border border-[#17744B]/20 flex flex-col items-center justify-center p-1">
            <span className="font-extrabold text-[13px] text-[#17744B] tracking-tight">Ivoire Labs</span>
            <span className="text-[9px] font-mono font-semibold text-[#17744B]/70 uppercase">FabLab 3D</span>
          </div>
        );
      case 'pt-3': // Cabinet Koné & Associés
        return (
          <div className="w-full h-full rounded-[10px] bg-[#FAF5FF] border border-[#7B5CE0]/20 flex flex-col items-center justify-center p-1">
            <span className="font-extrabold text-[12px] text-[#7B5CE0] tracking-tight text-center leading-tight">Koné & Ass.</span>
            <span className="text-[9px] font-mono font-semibold text-[#7B5CE0]/70 uppercase">Avocats</span>
          </div>
        );
      case 'pt-4': // Banque Atlantique
        return (
          <div className="w-full h-full rounded-[10px] bg-[#FFF8EB] border border-[#E8742A]/20 flex flex-col items-center justify-center p-1">
            <span className="font-extrabold text-[12px] text-[#C05621] tracking-tight text-center leading-tight">B. Atlantique</span>
            <span className="text-[9px] font-mono font-semibold text-[#C05621]/70 uppercase">Finance</span>
          </div>
        );
      case 'pt-5': // Orange Digital Center
        return (
          <div className="w-full h-full rounded-[10px] bg-[#FFF2E8] border border-[#FF7900]/30 flex flex-col items-center justify-center p-1">
            <span className="font-extrabold text-[13px] text-[#FF7900] tracking-tight">Orange</span>
            <span className="text-[9px] font-mono font-semibold text-[#FF7900]/80 uppercase">Digital Center</span>
          </div>
        );
      case 'pt-6': // Ville de Bingerville
        return (
          <div className="w-full h-full rounded-[10px] bg-[#F2F4F8] border border-[#0E1E4A]/15 flex flex-col items-center justify-center p-1">
            <span className="font-extrabold text-[12px] text-[#0E1E4A] tracking-tight text-center leading-tight">Bingerville</span>
            <span className="text-[9px] font-mono font-semibold text-[#0E1E4A]/70 uppercase">Mairie</span>
          </div>
        );
      default:
        return (
          <div className="w-full h-full rounded-[10px] bg-[#F2F4F8] border border-slate-200 flex items-center justify-center">
            <span className="font-extrabold text-xs text-[#0E1E4A] font-mono">Logo</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex justify-center min-w-0 font-nunito">
      <div
        data-screen-label="S7 Partenaires"
        className="w-full max-w-[560px] md:max-w-[1080px] lg:max-w-[1180px] mx-auto pt-[84px] md:pt-[124px] pb-12 md:pb-24 px-[18px] md:px-8 flex flex-col gap-[18px] md:gap-7"
      >
        {/* En-tête exact S7 */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[13px] md:text-[14px] font-semibold text-[#2F6BF0] uppercase tracking-wider">
            PARTENAIRES
          </span>
          <h1 className="m-0 font-extrabold text-[34px] sm:text-[38px] md:text-[46px] text-[#0E1E4A] tracking-[-0.02em] leading-tight">
            Ils rendent le concours possible.
          </h1>
        </div>

        {/* Groupes de partenaires (Matériel, Expertise, Dotations) */}
        {partnerGroups.map((pg, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-2.5 md:gap-3.5">
            <span className="font-mono text-[13px] md:text-[14px] font-semibold text-[#6A7189] tracking-[.05em] uppercase">
              {pg.g}
            </span>

            <div className="flex flex-col gap-2.5 md:gap-3.5">
              {pg.items.map((it) => (
                <div
                  key={it.a}
                  onClick={() => handlePartnerClick(it.b)}
                  className="bg-white rounded-[18px] md:rounded-[22px] p-3 md:p-4 md:px-6 flex gap-3.5 md:gap-5 items-center border border-slate-100/90 shadow-[0_2px_12px_rgba(10,20,48,0.03)] hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                >
                  {/* Slot Logo 84×56px */}
                  <div className="w-[84px] h-[56px] md:w-[96px] md:h-[64px] flex-none">
                    {renderLogoPlaceholder(it.a, it.b)}
                  </div>

                  {/* Nom + Rôle */}
                  <div className="flex-1 flex flex-col gap-0.5 md:gap-1 min-w-0">
                    <span className="font-extrabold text-[17px] md:text-[19px] text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors truncate">
                      {it.b}
                    </span>
                    <span className="font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#6A7189] line-clamp-1">
                      {it.c}
                    </span>
                  </div>

                  {/* Flèche ↗ */}
                  <span className="font-bold text-[18px] md:text-[20px] text-[#0E1E4A] group-hover:text-[#2F6BF0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all pr-1">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
