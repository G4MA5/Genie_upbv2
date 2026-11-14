import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, User, Mail, Lock, School, Sparkles, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { categoriesData } from '../../data/categoriesData';

type InscriptionState = 'ouvertes' | 'bientot' | 'closes';

export default function Inscription() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'technologie';

  // État du concours (par défaut 'ouvertes', peut basculer pour prévisualiser les 3 états du prototype GB / GC)
  const [concoursState, setConcoursState] = useState<InscriptionState>('ouvertes');

  // Formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    matricule: '',
    filiere: 'Licence Informatique & Réseaux',
    niveau: 'L2',
    categorie: initialCat,
    email: '',
    password: '',
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.matricule || !formData.email || !formData.password) {
      toast.error('Veuillez renseigner tous les champs obligatoires.');
      return;
    }
    if (!formData.terms) {
      toast.error('Veuillez accepter le règlement du concours.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Compte créé avec succès ! Bienvenue sur GÉNIE UPB.');
      navigate('/espace/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#BFD6FF] flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.65), transparent 70%)',
      }}
    >
      {/* Sélecteur d'état rapide (Permet de tester les états 'Bientôt' et 'Clôturé' du prototype) */}
      <div className="absolute top-4 right-4 z-40 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm flex items-center gap-2 text-xs font-bold text-slate-700">
        <span className="text-[11px] text-slate-500 font-mono">État :</span>
        <button
          onClick={() => setConcoursState('ouvertes')}
          className={`px-2 py-0.5 rounded cursor-pointer ${concoursState === 'ouvertes' ? 'bg-[#2F6BF0] text-white' : 'hover:bg-slate-100'}`}
        >
          Ouvertes
        </button>
        <button
          onClick={() => setConcoursState('bientot')}
          className={`px-2 py-0.5 rounded cursor-pointer ${concoursState === 'bientot' ? 'bg-[#E8B33D] text-white' : 'hover:bg-slate-100'}`}
        >
          Bientôt (GB)
        </button>
        <button
          onClick={() => setConcoursState('closes')}
          className={`px-2 py-0.5 rounded cursor-pointer ${concoursState === 'closes' ? 'bg-[#B4281F] text-white' : 'hover:bg-slate-100'}`}
        >
          Clôturé (GC)
        </button>
      </div>

      {/* CARTE CENTRALE AUTHENTIQUE (S8 Prototype) */}
      <div className="relative w-full max-w-[460px] rounded-[36px] p-3 sm:p-5 flex flex-col gap-5 overflow-hidden shadow-[0_40px_80px_rgba(20,60,150,0.22),0_8px_20px_rgba(20,60,150,0.08)] bg-white my-8">
        {/* Bouton retour circulaire */}
        <Link
          to="/"
          aria-label="Retour accueil"
          className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-white text-[#0A1430] font-bold flex items-center justify-center shadow-md hover:bg-slate-50 active:scale-90 transition-transform"
        >
          <ArrowLeft size={18} />
        </Link>

        {/* EN-TÊTE BLEU ILLUSTRÉ AVEC TITRE ET MASCOTTE */}
        <div className="relative rounded-[28px] bg-[#E7EDF7] pt-8 px-6 pb-4 flex flex-col items-center text-center overflow-hidden">
          <div className="flex flex-col gap-1 items-center max-w-[280px]">
            <h1 className="font-black text-2xl text-[#0A1430] tracking-tight leading-tight">
              {concoursState === 'ouvertes' && 'Créer mon compte'}
              {concoursState === 'bientot' && 'Inscriptions bientôt ouvertes'}
              {concoursState === 'closes' && 'Inscriptions closes'}
            </h1>
            <span className="font-semibold text-xs sm:text-sm text-[#4A5168] leading-relaxed">
              {concoursState === 'ouvertes' && 'Rejoins ton équipe ou crée la tienne pour concourir à GÉNIE UPB.'}
              {concoursState === 'bientot' && 'Lancement officiel le 23 novembre 2026 à 08h00. Prépare ton équipe !'}
              {concoursState === 'closes' && 'La phase d’inscription 2026 est terminée. Suivez les épreuves en direct.'}
            </span>
          </div>

          {/* Logo mascotte Génie UPB */}
          <div className="mt-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0E1E4A] text-white flex items-center justify-center shadow-md">
              <Sparkles size={28} className="text-[#F58220]" />
            </div>
          </div>
        </div>

        {/* 1. ÉTAT : INSCRIPTIONS OUVERTES */}
        {concoursState === 'ouvertes' && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-2">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nom</label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Kouassi"
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Prénoms</label>
                <input
                  type="text"
                  required
                  value={formData.prenoms}
                  onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                  placeholder="Jean-Marc"
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Matricule Étudiant UPB</label>
              <input
                type="text"
                required
                value={formData.matricule}
                onChange={(e) => setFormData({ ...formData, matricule: e.target.value.toUpperCase() })}
                placeholder="Ex: UPB-2024-8841"
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm font-mono text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Catégorie visée</label>
              <select
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-[#0E1E4A] bg-white focus:outline-none focus:border-[#2F6BF0]"
              >
                {categoriesData.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.code}. {c.name} ({c.placesRestantes})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">E-mail universitaire ou personnel</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jean.kouassi@etudiant.upb.ci"
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Au moins 8 caractères"
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>

            <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="mt-0.5 rounded text-[#2F6BF0] focus:ring-0"
              />
              <span>
                J'accepte le <Link to="/documents" className="text-[#2F6BF0] underline font-bold">règlement officiel</Link> du concours et la charte d'engagement UPB.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full min-h-[50px] rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-base flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(232,98,26,0.35)] active:scale-95 transition-all cursor-pointer"
            >
              <span>{loading ? 'Création en cours...' : 'Créer mon compte →'}</span>
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Déjà inscrit ?{' '}
              <Link to="/connexion" className="text-[#2F6BF0] font-extrabold hover:underline">
                Se connecter
              </Link>
            </div>
          </form>
        )}

        {/* 2. ÉTAT : INSCRIPTIONS BIENTÔT OUVERTES (GB) */}
        {concoursState === 'bientot' && (
          <div className="flex flex-col gap-4 text-center px-4 py-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-[#FFF6DA] border border-[#E8B33D] text-[#8A6A20] text-xs leading-relaxed font-semibold">
              <Clock size={20} className="mx-auto mb-1 text-[#E8B33D]" />
              Les serveurs d'inscription ouvriront le <strong>23 Novembre 2026 à 08h00</strong>.
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-extrabold text-sm text-[#0E1E4A]">Pré-alerte par e-mail</h4>
              <p className="text-xs text-slate-500">
                Laissez votre e-mail pour recevoir une notification dès l'ouverture des places :
              </p>
              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  placeholder="votre.email@upb.ci"
                  className="flex-1 h-11 px-3 rounded-xl border border-slate-200 text-sm"
                />
                <button
                  onClick={() => toast.success('Vous serez prévenu dès l’ouverture !')}
                  className="px-4 rounded-xl bg-[#0E1E4A] text-white font-bold text-xs cursor-pointer"
                >
                  M'alerter
                </button>
              </div>
            </div>

            <Link
              to="/concours"
              className="mt-2 text-xs font-bold text-[#2F6BF0] hover:underline"
            >
              Découvrir les 4 catégories en attendant →
            </Link>
          </div>
        )}

        {/* 3. ÉTAT : INSCRIPTIONS CLOSES (GC) */}
        {concoursState === 'closes' && (
          <div className="flex flex-col gap-4 text-center px-4 py-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-[#FBE6E3] border border-[#B4281F]/30 text-[#B4281F] text-xs leading-relaxed font-semibold">
              <AlertTriangle size={20} className="mx-auto mb-1 text-[#B4281F]" />
              La phase des inscriptions est officiellement close depuis le <strong>18 Décembre 2026</strong>.
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Les quotas de chaque catégorie ont été atteints. Si vous avez déjà un compte, connectez-vous pour suivre votre équipe.
            </p>

            <Link
              to="/connexion"
              className="w-full min-h-[46px] rounded-xl bg-[#0E1E4A] text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <span>Accéder à mon espace candidat</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
