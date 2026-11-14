import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, CheckCircle2, FileText, UploadCloud, X, Link2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface PublishedSupport {
  id: string;
  kind: string;
  date: string;
  title: string;
  sessionName: string;
}

export default function PublicationSupports() {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [newTitle, setNewTitle] = useState<string>('Checklist prototype');
  const [selectedSession, setSelectedSession] = useState<string>('Prototypage rapide · 7 janv.');
  const [selectedCategory, setSelectedCategory] = useState<string>('Innovation');

  const [supports, setSupports] = useState<PublishedSupport[]>([
    {
      id: 's1',
      kind: 'Document',
      date: '7 janv. 2027',
      title: 'Checklist d\'homologation prototype',
      sessionName: 'Prototypage rapide et maquettes',
    },
    {
      id: 's2',
      kind: 'Fiche',
      date: '4 janv. 2027',
      title: 'Trame officielle de pitch en 7 minutes',
      sessionName: 'Atelier pitch : convaincre en 7 minutes',
    },
    {
      id: 's3',
      kind: 'Vidéo',
      date: '28 déc. 2026',
      title: 'Enregistrement masterclass étude de marché',
      sessionName: 'Étude de marché & validation terrain',
    },
  ]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSupport: PublishedSupport = {
      id: `sup-${Date.now()}`,
      kind: uploadType === 'file' ? 'Document' : 'Lien',
      date: 'Aujourd’hui',
      title: newTitle.trim(),
      sessionName: selectedSession,
    };

    setSupports(prev => [newSupport, ...prev]);
    setShowUploadModal(false);
    toast.success('Support publié avec succès ! Les équipes ont été notifiées.');
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR & TITRE AVEC BOUTON + PUBLIER */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Pédagogie • F2
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0E1E4A] tracking-tight">
            Supports de cours
          </h1>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="min-h-[46px] px-6 rounded-full bg-[#E8742A] hover:bg-[#D4651D] text-[#0A1430] font-black text-sm flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={18} strokeWidth={3} />
          <span>+ Publier</span>
        </button>
      </div>

      {/* 2. BANNIÈRE DE STATUT DE PUBLICATION */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#DFF2E7] text-[#17744B] font-semibold text-sm border border-emerald-200 shadow-xs">
        <CheckCircle2 size={18} className="shrink-0" />
        <span>Supports en ligne accessibles à l'ensemble des candidats inscrits à vos sessions.</span>
      </div>

      {/* 3. LISTE DES SUPPORTS EXISTANTS */}
      <div className="space-y-3.5">
        {supports.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2 hover:border-slate-200 transition-colors"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="px-2.5 py-1 rounded-md bg-[#F2F0EA] font-extrabold text-[#4A5168]">
                {item.kind}
              </span>
              <span className="text-slate-400 font-mono">{item.date}</span>
            </div>

            <h3 className="font-extrabold text-base sm:text-lg text-[#0E1E4A]">
              {item.title}
            </h3>

            <span className="text-xs font-medium text-[#6A7189]">
              Séance : {item.sessionName}
            </span>
          </div>
        ))}
      </div>

      {/* 4. MODALE / VOLET DE PUBLICATION (Exact Prototype F2a) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F6F8FC] rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-5 border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0E1E4A]">
                Publier un support
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-10 h-10 rounded-full bg-white text-[#0E1E4A] flex items-center justify-center font-bold text-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePublish} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-bold text-sm text-[#0E1E4A]">Titre du document</span>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Ex: Checklist prototype"
                  className="min-h-[50px] px-4 rounded-xl border-2 border-[#0E1E4A] bg-white font-medium text-sm text-[#0E1E4A] focus:outline-none"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-bold text-sm text-[#0E1E4A]">Séance rattachée</span>
                <select
                  value={selectedSession}
                  onChange={e => setSelectedSession(e.target.value)}
                  className="min-h-[50px] px-4 rounded-xl border border-slate-300 bg-white font-medium text-sm text-[#0E1E4A] focus:outline-none"
                >
                  <option value="Prototypage rapide · 7 janv.">Prototypage rapide · 7 janv.</option>
                  <option value="Atelier pitch · 4 janv.">Atelier pitch · 4 janv.</option>
                  <option value="Préparer sa démo · 12 janv.">Préparer sa démo · 12 janv.</option>
                  <option value="Modèle économique · 7 janv.">Modèle économique · 7 janv.</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-bold text-sm text-[#0E1E4A]">Catégorie ciblée</span>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="min-h-[50px] px-4 rounded-xl border border-slate-300 bg-white font-medium text-sm text-[#0E1E4A] focus:outline-none"
                >
                  <option value="Innovation">Innovation</option>
                  <option value="Technologie">Technologie</option>
                  <option value="Économie">Économie</option>
                  <option value="Droit">Droit</option>
                  <option value="Toutes">Toutes les catégories</option>
                </select>
              </label>

              {/* Sélecteur Fichier ou Lien */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setUploadType('file')}
                  className={`min-h-[46px] rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    uploadType === 'file'
                      ? 'bg-[#0E1E4A] text-white shadow-sm'
                      : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  Fichier PDF / Doc
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('link')}
                  className={`min-h-[46px] rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    uploadType === 'link'
                      ? 'bg-[#0E1E4A] text-white shadow-sm'
                      : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  Lien Web / Drive
                </button>
              </div>

              {/* Aperçu PDF du prototype */}
              {uploadType === 'file' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3.5">
                  <div className="w-10 h-12 rounded-lg bg-[#FBE6E3] text-[#B4281F] flex items-end justify-center pb-1.5 font-mono font-black text-xs shrink-0">
                    PDF
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                    <span className="font-bold text-sm text-[#0E1E4A] truncate">
                      checklist-prototype.pdf
                    </span>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#17744B] w-[70%]" />
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">70 %</span>
                </div>
              )}

              <button
                type="submit"
                className="mt-2 min-h-[54px] rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-black text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Publier le support</span>
                <Check size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
