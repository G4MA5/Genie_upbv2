import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, FileText, Send, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SoumissionDossier() {
  const navigate = useNavigate();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [githubUrl, setGithubUrl] = useState('https://github.com/upb-lagune/irrigation-iot');
  const [submitting, setSubmitting] = useState(false);
  const [submittedModal, setSubmittedModal] = useState(false);

  const checklist = [
    { label: 'Effectif d’équipe complet (4 à 6 membres)', done: true },
    { label: 'Signature de la charte par tous les membres', done: true },
    { label: 'Note d’intention rédigée selon la trame officielle', done: fileUploaded },
    { label: 'Dépôt du code source ou dossier technique', done: !!githubUrl },
  ];

  const allReady = checklist.every((c) => c.done);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(true);
      toast.success(`Fichier « ${e.target.files[0].name} » importé avec succès !`);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allReady) {
      toast.error('Veuillez compléter toutes les pièces requises de la checklist.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedModal(true);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 animate-fadeIn">
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
        <span className="font-mono text-xs font-bold text-[#E8742A] uppercase tracking-wider">
          ÉTAPE DÉCISIVE
        </span>
        <h1 className="text-3xl font-black text-[#0E1E4A]">Soumission Finale du Dossier</h1>
        <p className="text-sm text-slate-500">
          Vérifiez chaque élément de conformité avant d'adresser votre candidature au comité de validation.
        </p>
      </div>

      {/* Checklist de conformité */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
        <h3 className="font-black text-lg text-[#0E1E4A]">Checklist d’éligibilité officielle</h3>
        <div className="flex flex-col gap-3">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-bold transition-colors ${
                item.done
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <span>{item.label}</span>
              {item.done ? (
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-slate-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire de dépôt */}
      <form onSubmit={handleFinalSubmit} className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Note d’intention & Présentation (PDF obligatoire, max 15 Mo) *
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:border-[#2F6BF0] transition-colors bg-slate-50/50 cursor-pointer relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-full bg-blue-100 text-[#2F6BF0] flex items-center justify-center">
              <Upload size={22} />
            </div>
            {fileUploaded ? (
              <div className="flex flex-col items-center gap-1">
                <span className="font-extrabold text-sm text-emerald-700">
                  Note_Intention_Equipe_Lagune.pdf
                </span>
                <span className="text-xs text-slate-400">Fichier prêt pour transmission (3.2 Mo)</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-extrabold text-sm text-[#0E1E4A]">
                  Cliquez ou glissez votre document PDF ici
                </span>
                <span className="text-xs text-slate-400">Trame officielle 2026-2027</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Lien vers le dépôt GitHub / Maquettes en ligne *
          </label>
          <input
            type="url"
            required
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-mono text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
          />
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed font-semibold">
          Attention : après validation définitive, le dossier sera verrouillé pour l'instruction par le jury. Seul un administrateur pourra débloquer une modification.
        </div>

        <button
          type="submit"
          disabled={submitting || !allReady}
          className={`min-h-[52px] rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer ${
            allReady
              ? 'bg-[#E8742A] hover:bg-[#d96720] text-white shadow-orange-500/25'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Send size={18} />
          <span>{submitting ? 'Transmission en cours...' : 'Soumettre définitivement mon dossier'}</span>
        </button>
      </form>

      {/* MODALE DE FÉLICITATIONS (Prototype P3e subSent) */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 bg-[#0A1430]/65 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center gap-5 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Sparkles size={32} />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-black text-2xl text-[#0E1E4A]">Dossier Soumis avec Succès !</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Votre candidature pour l'<strong>Équipe Lagune Tech</strong> est désormais enregistrée. La commission scientifique examinera vos pièces avant le 21 décembre.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 w-full text-xs font-mono text-slate-500">
              Accusé de réception : #DOS-2026-8841-TECH
            </div>

            <button
              onClick={() => navigate('/espace/statut')}
              className="w-full min-h-[48px] rounded-2xl bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <span>Suivre le statut de mon dossier</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
