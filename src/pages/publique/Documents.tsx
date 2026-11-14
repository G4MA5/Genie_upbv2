import React, { useState } from 'react';
import { documentsData, DocumentItem } from '../../data/documentsData';
import { Download, FileText, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Documents() {
  const [selectedCat, setSelectedCat] = useState<string>('Tous');

  const categories = ['Tous', 'Règlement', 'Charte', 'Évaluation', 'Modèle'];

  const filteredDocs =
    selectedCat === 'Tous'
      ? documentsData
      : documentsData.filter((d) => d.categorie === selectedCat);

  const handleDownload = (doc: DocumentItem) => {
    toast.success(`Téléchargement de « ${doc.titre} » lancé !`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header authentique */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#2F6BF0] uppercase">
              DOCUMENTS OFFICIELS
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2F6BF0]/40 rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0E1E4A] tracking-tight leading-tight">
            Règlement et documents
          </h1>

          <p className="text-base sm:text-lg text-[#4A5168] leading-relaxed max-w-3xl">
            À lire impérativement avant de soumettre votre équipe. Chaque membre devra valider et signer
            numériquement le règlement et les chartes depuis son espace candidat.
          </p>
        </div>

        {/* Filtres de catégorie de documents */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`flex-none min-h-[38px] px-4 rounded-full text-sm font-bold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#0E1E4A] text-white shadow-sm'
                  : 'bg-white text-[#4A5168] border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Liste des Documents avec icône PDF prototype */}
        <div className="flex flex-col gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-[20px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-slate-100 shadow-[0_4px_20px_rgba(10,20,48,0.04)] hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Icône PDF / DOCX prototype */}
                <div
                  className={`flex-none w-12 h-14 rounded-xl flex flex-col items-center justify-between py-1.5 px-1 font-mono font-black text-[11px] shadow-sm ${
                    doc.format === 'PDF'
                      ? 'bg-[#FBE6E3] text-[#B4281F] border border-[#B4281F]/20'
                      : 'bg-[#E3EDFB] text-[#1B4DB4] border border-[#1B4DB4]/20'
                  }`}
                >
                  <FileText size={18} className="mt-1" />
                  <span>{doc.format}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {doc.categorie}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {doc.pages} · {doc.taille}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors leading-snug">
                    {doc.titre}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5168] leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Bouton de téléchargement */}
              <button
                onClick={() => handleDownload(doc)}
                className="shrink-0 min-h-[44px] px-5 rounded-full border-[1.5px] border-[#0E1E4A] hover:bg-[#0E1E4A] text-[#0E1E4A] hover:text-white font-bold text-sm flex items-center gap-2 active:scale-95 transition-all self-end sm:self-center cursor-pointer shadow-sm"
              >
                <Download size={16} />
                <span>Télécharger</span>
              </button>
            </div>
          ))}
        </div>

        {/* Encadré d'assistance juridique / Charte */}
        <div className="bg-[#FAFBFD] rounded-[24px] p-6 sm:p-7 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#E7EDF7] text-[#2F6BF0] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="font-extrabold text-base text-[#0E1E4A]">
                Une question sur le règlement ?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Consultez notre foire aux questions ou contactez le comité d'organisation.
              </p>
            </div>
          </div>

          <a
            href="/faq-contact"
            className="shrink-0 font-bold text-sm text-[#2F6BF0] hover:text-[#0E1E4A] flex items-center gap-1.5 transition-colors"
          >
            <span>Consulter la FAQ</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
