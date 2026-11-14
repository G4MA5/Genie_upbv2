import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Play, FileText, ExternalLink, Sparkles, FolderDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface SupportItem {
  kind: string;
  title: string;
  icon: '↓' | '▶';
  size?: string;
}

interface SupportGroup {
  sessionTitle: string;
  items: SupportItem[];
}

export default function SupportsCours() {
  const groups: SupportGroup[] = [
    {
      sessionTitle: 'Séance 2 · Atelier pitch : convaincre en 7 minutes',
      items: [
        { kind: 'Document', title: 'Trame officielle de pitch en 7 minutes (PDF)', icon: '↓', size: '1.4 Mo' },
        { kind: 'Vidéo', title: 'Replay intégral de la masterclass (52 min)', icon: '▶', size: 'HD 1080p' },
        { kind: 'Slide deck', title: 'Présentation PPT du formateur M. Diallo', icon: '↓', size: '4.8 Mo' },
      ],
    },
    {
      sessionTitle: 'Séance 3 · Prototypage rapide et maquettes',
      items: [
        { kind: 'Exercice', title: 'Fiche atelier maquette papier & wireframing', icon: '↓', size: '850 Ko' },
        { kind: 'Document', title: 'Checklist des critères d’évaluation prototype', icon: '↓', size: '1.1 Mo' },
        { kind: 'Template', title: 'Gabarit Figma UI Kit Mobile Génie UPB', icon: '↓', size: 'Figma Community' },
      ],
    },
    {
      sessionTitle: 'Séance 1 · Lancement et méthodologie agile',
      items: [
        { kind: 'Guide', title: 'Guide pratique de gestion de projet d’équipe', icon: '↓', size: '2.2 Mo' },
        { kind: 'Règlement', title: 'Charte d’éthique et propriété intellectuelle', icon: '↓', size: '600 Ko' },
      ],
    },
  ];

  const handleDownload = (title: string) => {
    toast.success(`Téléchargement lancé : ${title}`);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR & TITRE */}
      <div className="flex items-center gap-4">
        <Link
          to="/espace/formations"
          className="w-11 h-11 rounded-full bg-white text-[#0E1E4A] border border-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
          title="Retour aux formations"
        >
          ←
        </Link>
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Ressources • P5b
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Supports & Replays
          </h1>
        </div>
      </div>

      {/* 2. GROUPES DE SUPPORTS PAR SÉANCE */}
      <div className="space-y-6">
        {groups.map((g, idx) => (
          <div key={idx} className="bg-white rounded-[24px] p-5 sm:p-7 border border-slate-100 shadow-sm flex flex-col gap-4">
            <h3 className="font-extrabold text-base sm:text-lg text-[#0E1E4A]">
              {g.sessionTitle}
            </h3>

            <div className="divide-y divide-slate-100">
              {g.items.map((it, itemIdx) => (
                <div
                  key={itemIdx}
                  className="py-3.5 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-20 px-2 py-1 rounded-lg bg-[#F2F0EA] text-[#4A5168] font-bold text-xs text-center shrink-0">
                      {it.kind}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm sm:text-base text-[#121628] group-hover:text-[#2F6BF0] transition-colors truncate">
                        {it.title}
                      </span>
                      {it.size && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          {it.size}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(it.title)}
                    className="w-10 h-10 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={it.icon === '▶' ? 'Regarder le replay' : 'Télécharger la ressource'}
                  >
                    {it.icon === '▶' ? <Play size={15} className="fill-white ml-0.5" /> : <Download size={15} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. BANNIÈRE SPÉCIFIQUE CATÉGORIE INNOVATION (#F58220) */}
      <div className="rounded-[28px] p-6 sm:p-8 bg-[#F58220] text-[#0A1430] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="font-mono text-xs font-black uppercase tracking-wider text-[#0A1430]/80">
            VOTRE CATÉGORIE · INNOVATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A1430] leading-tight">
            Banque d'études de marché
          </h2>
          <p className="text-sm font-medium text-[#0A1430]/90 leading-relaxed">
            Données sectorielles ivoiriennes et modèles financiers certifiés fournis par nos partenaires institutionnels pour enrichir votre business plan.
          </p>
        </div>

        <button
          onClick={() => handleDownload("Banque d'études de marché - Pack Innovation")}
          className="min-h-[48px] px-6 rounded-full bg-[#0A1430] hover:bg-[#15254A] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer shrink-0"
        >
          <span>Accéder au drive</span>
          <ExternalLink size={15} />
        </button>
      </div>
    </div>
  );
}
