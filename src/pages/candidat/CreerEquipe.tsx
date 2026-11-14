import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { categoriesData } from '../../data/categoriesData';

export default function CreerEquipe() {
  const navigate = useNavigate();
  const [nomEquipe, setNomEquipe] = useState('');
  const [categorie, setCategorie] = useState('technologie');
  const [descriptionProjet, setDescriptionProjet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomEquipe.trim()) {
      toast.error('Veuillez renseigner le nom de votre équipe.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Équipe « ${nomEquipe} » créée avec succès !`);
      navigate('/espace/equipe/invitations');
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-fadeIn">
      {/* Bouton retour */}
      <Link
        to="/espace/equipe"
        className="flex items-center gap-2 text-sm font-bold text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Retour à mon équipe</span>
      </Link>

      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
          <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
            ÉTAPE 1 SUR 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0E1E4A]">Créer mon Équipe</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            En tant que fondateur, vous devenez automatiquement le Capitaine de l'équipe.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nom officiel de l'équipe *
            </label>
            <input
              type="text"
              required
              value={nomEquipe}
              onChange={(e) => setNomEquipe(e.target.value)}
              placeholder="Ex: Équipe Lagune Tech, Les Juristes d'Éburnie..."
              className="w-full h-12 px-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Discipline / Catégorie du concours *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoriesData.map((cat) => {
                const isSelected = categorie === cat.slug;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setCategorie(cat.slug)}
                    style={{ borderColor: isSelected ? cat.couleur : undefined }}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-1 ${
                      isSelected ? 'bg-slate-50/80 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-black text-sm text-[#0E1E4A]">{cat.name}</span>
                      <span style={{ color: cat.couleur }} className="font-mono font-bold text-xs">
                        {cat.code}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{cat.placesRestantes}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Idée générale ou projet envisagé (Facultatif)
            </label>
            <textarea
              rows={3}
              value={descriptionProjet}
              onChange={(e) => setDescriptionProjet(e.target.value)}
              placeholder="Décrivez brièvement la thématique que vous souhaitez aborder..."
              className="w-full p-3 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
            />
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 text-xs text-[#2F6BF0] leading-relaxed">
            <Sparkles size={18} className="shrink-0 mt-0.5" />
            <span>
              Après création, vous pourrez inviter vos coéquipiers par matricule UPB jusqu'à atteindre les 4 à 6 membres requis.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[50px] rounded-2xl bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-black text-base flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer mt-2"
          >
            <span>{loading ? 'Création en cours...' : 'Valider et inviter mes coéquipiers →'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
