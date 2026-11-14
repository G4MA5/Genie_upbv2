import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, X, Clock, FileText, AlertCircle, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamMemberAdmin {
  initials: string;
  name: string;
  role?: string;
  field: string;
  level: string;
  charters: string;
  bg: string;
}

export default function FicheEquipeAdmin() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<'Soumise' | 'Validée' | 'Attente' | 'Refusée'>('Soumise');
  const [showRefusalModal, setShowRefusalModal] = useState<boolean>(false);
  const [refusalReason, setRefusalReason] = useState<string>('Composition non conforme');
  const [refusalComment, setRefusalComment] = useState<string>(
    'Salif Bakayoko est inscrit en Master 1 : remplacez-le par un étudiant de licence conformément au règlement UPB.'
  );

  const members: TeamMemberAdmin[] = [
    { initials: 'AK', name: 'Aya Kouassi', role: 'Chef d\'équipe', field: 'L3 Informatique', level: 'L3', charters: '2/2 Signées', bg: '#F58220' },
    { initials: 'MD', name: 'Moussa Diabaté', field: 'L2 Génie Électrique', level: 'L2', charters: '2/2 Signées', bg: '#2F6BF0' },
    { initials: 'SB', name: 'Salif Bakayoko', field: 'M1 Économie Appliquée', level: 'M1', charters: '2/2 Signées', bg: '#0D9488' },
    { initials: 'IO', name: 'Ines Ouattara', field: 'L3 Droit Privé', level: 'L3', charters: '2/2 Signées', bg: '#BE185D' },
    { initials: 'PB', name: 'Paul Brou', field: 'L3 Agronomie', level: 'L3', charters: '2/2 Signées', bg: '#6A7189' },
  ];

  const complianceChecks = [
    { label: 'Taille d\'équipe réglementaire (4 à 6 membres)', ok: true },
    { label: 'Mixité de filières (au moins 2 départements UPB)', ok: true },
    { label: 'Chartes et règlement signés par 100% des membres', ok: true },
    { label: 'Dossier de candidature PDF complet et lisible', ok: true },
  ];

  const handleValidate = () => {
    setStatus('Validée');
    toast.success('Équipe validée avec succès ! Les badges officiels ont été générés.');
  };

  const handleWaitlist = () => {
    setStatus('Attente');
    toast('Équipe placée en liste d\'attente', { icon: '⏳' });
  };

  const handleConfirmRefusal = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Refusée');
    setShowRefusalModal(false);
    toast.error('Dossier refusé. Notification transmise au chef d\'équipe.');
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR AUX ÉQUIPES */}
      <Link
        to="/admin/equipes"
        className="text-xs sm:text-sm font-extrabold text-[#0E1E4A] hover:underline flex items-center gap-1.5 self-start"
      >
        <ArrowLeft size={16} />
        <span>← Retour à la liste des équipes</span>
      </Link>

      {/* 2. EN-TÊTE DE LA FICHE ÉQUIPE */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F58220]">
            INNOVATION · SOUMISE LE 16 DÉC. 2026 À 21:14
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0E1E4A] tracking-tight">
            Les Bâtisseurs
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-extrabold flex items-center gap-2 shadow-xs ${
              status === 'Validée'
                ? 'bg-[#DFF2E7] text-[#17744B]'
                : status === 'Soumise'
                ? 'bg-[#E3EAFB] text-[#1F4BB8]'
                : status === 'Attente'
                ? 'bg-[#FBEFD2] text-[#8A5A00]'
                : 'bg-[#FBE6E3] text-[#B4281F]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'Validée'
                  ? 'bg-[#17744B]'
                  : status === 'Soumise'
                  ? 'bg-[#1F4BB8]'
                  : status === 'Attente'
                  ? 'bg-[#8A5A00]'
                  : 'bg-[#B4281F]'
              }`}
            />
            <span>{status}</span>
          </span>
        </div>
      </div>

      {/* 3. GRILLE COMPOSITION & VÉRIFICATIONS CONFORMITÉ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tableau des membres (2 colonnes de large sur grand écran) */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500 uppercase">
            <span>Membres ({members.length})</span>
            <span>Chartes</span>
          </div>

          <div className="divide-y divide-slate-100">
            {members.map((m, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full text-white font-black text-xs flex items-center justify-center shrink-0"
                    style={{ backgroundColor: m.bg }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#0E1E4A] truncate">
                        {m.name}
                      </span>
                      {m.role && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FBEFD2] text-[#8A5A00] font-bold text-[10px]">
                          Chef
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 truncate">
                      {m.field} • {m.level}
                    </span>
                  </div>
                </div>

                <span className="font-bold text-xs text-[#17744B] shrink-0 font-mono">
                  ✓ {m.charters}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Panneau Vérifications & Checklist */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
          <h3 className="font-black text-base text-[#0E1E4A]">Critères de validation</h3>

          <div className="space-y-3">
            {complianceChecks.map((chk, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs leading-snug">
                <div className="w-5 h-5 rounded-full bg-[#17744B] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{chk.label}</span>
                  <span className="text-[#17744B] font-semibold text-[11px]">Conforme</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#2F6BF0]">
            <FileText size={15} />
            <a href="#dossier" onClick={e => { e.preventDefault(); toast.success('Ouverture du dossier PDF...'); }} className="hover:underline">
              Télécharger le dossier PDF (3.2 Mo)
            </a>
          </div>
        </div>
      </div>

      {/* 4. BARRE D'ACTIONS DE DÉCISION (Exact Prototype R1a) */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={handleValidate}
          className="min-h-[50px] px-8 rounded-full bg-[#17744B] hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md hover:scale-102 active:scale-95 transition-all cursor-pointer"
        >
          <Check size={18} strokeWidth={3} />
          <span>Valider l'équipe</span>
        </button>

        <button
          onClick={() => setShowRefusalModal(true)}
          className="min-h-[50px] px-7 rounded-full border-[1.5px] border-[#C8372D] text-[#B4281F] hover:bg-red-50 font-bold text-sm sm:text-base flex items-center gap-2 transition-colors cursor-pointer"
        >
          <X size={18} />
          <span>Refuser</span>
        </button>

        <button
          onClick={handleWaitlist}
          className="min-h-[50px] px-7 rounded-full border-[1.5px] border-[#0E1E4A] text-[#0E1E4A] hover:bg-slate-100 font-bold text-sm sm:text-base flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Clock size={16} />
          <span>Mettre en liste d'attente</span>
        </button>
      </div>

      {/* 5. MODALE DE REFUS AVEC MOTIF (Exact Prototype R1a) */}
      {showRefusalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-4 border border-slate-200 animate-scaleUp">
            <h2 className="text-2xl font-black text-[#0E1E4A]">
              Refuser Les Bâtisseurs
            </h2>

            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              L'équipe recevra ce motif sur son espace candidat et disposera de 48h pour corriger son dossier.
            </p>

            <form onSubmit={handleConfirmRefusal} className="flex flex-col gap-4 pt-1">
              <label className="flex flex-col gap-1.5">
                <span className="font-bold text-xs text-[#0E1E4A]">Motif (obligatoire)</span>
                <select
                  value={refusalReason}
                  onChange={e => setRefusalReason(e.target.value)}
                  className="min-h-[48px] px-4 rounded-xl border-2 border-[#0E1E4A] bg-white font-medium text-sm text-[#0E1E4A] focus:outline-none"
                >
                  <option value="Composition non conforme">Composition non conforme</option>
                  <option value="Dossier incomplet">Dossier incomplet</option>
                  <option value="Étudiant non éligible UPB">Étudiant non éligible UPB</option>
                  <option value="Non-respect de la charte">Non-respect de la charte</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-bold text-xs text-[#0E1E4A]">Précision pour l'équipe</span>
                <textarea
                  rows={3}
                  value={refusalComment}
                  onChange={e => setRefusalComment(e.target.value)}
                  className="p-3.5 rounded-xl border border-slate-300 font-medium text-sm text-slate-700 leading-relaxed focus:outline-none focus:border-[#0E1E4A]"
                  required
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRefusalModal(false)}
                  className="min-h-[46px] px-5 rounded-full border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="min-h-[46px] px-6 rounded-full bg-[#C8372D] hover:bg-red-800 text-white font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Confirmer le refus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
