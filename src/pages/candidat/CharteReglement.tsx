import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, FileText, Lock, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CharteReglement() {
  const [signed, setSigned] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const teamSignatures = [
    { nom: 'Aya Kouassi (Capitaine)', date: '14 Nov. 2026 à 10:14', signed: true },
    { nom: 'Jean-Marc Bamba', date: '14 Nov. 2026 à 11:20', signed: true },
    { nom: 'Sarah Ouattara', date: '14 Nov. 2026 à 14:05', signed: true },
    { nom: 'David Koffi', date: '14 Nov. 2026 à 15:42', signed: true },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Retour */}
      <Link
        to="/espace/equipe"
        className="flex items-center gap-2 text-sm font-bold text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Retour à mon équipe</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
          ENGAGEMENT OFFICIEL
        </span>
        <h1 className="text-3xl font-black text-[#0E1E4A]">Règlement & Chartes du Tournoi</h1>
        <p className="text-sm text-slate-500">
          Chaque membre d'équipe doit parapher individuellement la charte de déontologie.
        </p>
      </div>

      {/* Cadre de lecture du règlement */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#2F6BF0]" />
            <h2 className="font-black text-xl text-[#0E1E4A]">Charte de Déontologie & Propriété Intellectuelle</h2>
          </div>
          <button
            onClick={() => toast.success('Téléchargement du PDF officiel...')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#2F6BF0] hover:underline cursor-pointer"
          >
            <Download size={14} />
            <span>PDF (850 Ko)</span>
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 text-xs sm:text-sm text-[#3D4459] leading-relaxed flex flex-col gap-4 max-h-[360px] overflow-y-auto border border-slate-100">
          <div>
            <h4 className="font-bold text-[#0E1E4A] mb-1">Article 1 — Intégrité & Travail d'équipe</h4>
            <p>
              Les projets présentés doivent être le fruit exclusif du travail des étudiants inscrits dans l'équipe. Tout recours à des tiers rémunérés ou tout plagiat de code source ou de conclusions juridiques entraîne la disqualification immédiate.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0E1E4A] mb-1">Article 2 — Propriété Intellectuelle (PI)</h4>
            <p>
              Les étudiants conservent l'intégralité de la propriété intellectuelle de leurs créations, prototypes, algorithmes et business plans. L'Université Polytechnique de Bingerville et ses partenaires s'interdisent toute exploitation commerciale sans accord écrit préalable.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0E1E4A] mb-1">Article 3 — Obligation d'Assiduité</h4>
            <p>
              La validation de l'inscription pour l'accès aux épreuves finales de janvier 2027 est subordonnée à un taux de présence effectif d'au moins 80% aux ateliers de formation organisés du 21 décembre au 24 janvier.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0E1E4A] mb-1">Article 4 — Décisions du Jury</h4>
            <p>
              Les jurys officiels sont souverains et leurs délibérations sont sans appel. La courtoisie et le respect mutuel au prétoire et sur scène constituent un critère d'évaluation déterminant.
            </p>
          </div>
        </div>

        {/* Bloc de signature */}
        <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span className="font-black text-sm text-[#0E1E4A] block">
                Votre signature numérique est certifiée
              </span>
              <span className="text-xs text-emerald-700 font-mono">
                Signé par Aya Kouassi le 14 Nov. 2026 à 10:14 • Empreinte #UPB-SIG-8841-A
              </span>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black">
            VALIDE
          </span>
        </div>
      </div>

      {/* État des signatures dans l'équipe */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
        <h3 className="font-black text-lg text-[#0E1E4A]">Suivi des signatures de l'équipe</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teamSignatures.map((sig, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-[#0E1E4A]">{sig.nom}</span>
              <span className="text-[11px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} />
                Signé ({sig.date.split(' ')[0]} {sig.date.split(' ')[1]})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
