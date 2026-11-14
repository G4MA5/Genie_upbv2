import React from 'react';
import { Link } from 'react-router-dom';
import { partnerGroupsData } from '../../data/partnersData';
import { Handshake, Award, Building, Sparkles, Mail, ArrowRight, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Partenaires() {
  const handleDownloadDossier = () => {
    toast.success('Le dossier de sponsoring partenaires (PDF) a été téléchargé !');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#2F6BF0] uppercase">
              ÉCOSYSTÈME & SPONSORS
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2F6BF0]/40 rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0E1E4A] tracking-tight leading-tight">
            Ils rendent le concours possible.
          </h1>

          <p className="text-base sm:text-lg text-[#4A5168] leading-relaxed max-w-3xl">
            Grandes entreprises, cabinets juridiques, banques et institutions étatiques s'unissent aux côtés de l'Université
            Polytechnique de Bingerville pour propulser l'excellence estudiantine et doter les lauréats de moyens concrets.
          </p>
        </div>

        {/* Groupes de Partenaires */}
        <div className="flex flex-col gap-10">
          {partnerGroupsData.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
                <span className="font-mono text-xs font-bold text-[#6A7189] uppercase tracking-wider">
                  GROUPE 0{gIdx + 1}
                </span>
                <h2 className="font-extrabold text-xl sm:text-2xl text-[#0E1E4A]">
                  {group.groupName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                  {group.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {group.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-white rounded-[20px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_rgba(10,20,48,0.04)] hover:shadow-md transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Logo slot / Badge */}
                      <div className="flex items-center justify-between">
                        <div
                          style={{ borderColor: partner.badgeCol }}
                          className="w-12 h-12 rounded-xl bg-slate-50 border flex items-center justify-center font-black text-xs font-mono text-[#0E1E4A] shadow-inner"
                        >
                          {partner.nom.substring(0, 2).toUpperCase()}
                        </div>
                        <span
                          style={{ backgroundColor: `${partner.badgeCol}15`, color: partner.badgeCol }}
                          className="text-xs font-extrabold px-2.5 py-1 rounded-full font-mono"
                        >
                          {partner.badge}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h3 className="font-black text-lg text-[#0E1E4A] leading-snug">
                          {partner.nom}
                        </h3>
                        <span className="text-xs font-bold text-[#2F6BF0]">
                          {partner.type}
                        </span>
                        <p className="text-xs sm:text-sm text-[#4A5168] leading-relaxed pt-1">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bannière "Devenir Partenaire" */}
        <div className="bg-[#0E1E4A] text-white rounded-[28px] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#F58220]">
              <Handshake size={20} />
              <span className="font-bold text-xs uppercase tracking-wider font-mono">
                REJOINDRE LE TOURNOI
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Devenez partenaire officiel de l'édition 2026-2027
            </h3>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Associez votre image de marque au plus prestigieux concours inter-disciplines de Côte d'Ivoire, recrutez les meilleurs talents et participez aux jurys de soutenance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadDossier}
              className="min-h-[48px] px-6 rounded-full bg-white hover:bg-slate-100 text-[#0E1E4A] font-extrabold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Download size={16} />
              <span>Dossier de Sponsoring</span>
            </button>

            <a
              href="mailto:partenariats@genie.upb.ci"
              className="min-h-[48px] px-6 rounded-full bg-[#E8742A] hover:bg-[#d96720] text-white font-extrabold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <Mail size={16} />
              <span>Nous contacter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
