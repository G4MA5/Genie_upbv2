import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logoUpb from '../../assets/images/logo_genie_upb.png';

export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Veuillez renseigner votre e-mail et votre mot de passe.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Détection de rôle selon l'e-mail ou redirection candidat par défaut
      if (email.includes('admin')) {
        toast.success('Connexion Administrateur réussie !');
        navigate('/admin/dashboard');
      } else if (email.includes('formateur') || email.includes('jury')) {
        toast.success('Connexion Formateur & Jury réussie !');
        navigate('/formateur/dashboard');
      } else {
        toast.success('Connexion Candidat réussie !');
        navigate('/espace/dashboard');
      }
    }, 600);
  };

  // Connexion rapide pour tests / démo
  const handleQuickLogin = (role: 'candidat' | 'formateur' | 'admin') => {
    if (role === 'candidat') {
      setEmail('jean.kouassi@etudiant.upb.ci');
      setPassword('password123');
      toast.success('Profil Candidat chargé');
      navigate('/espace/dashboard');
    } else if (role === 'formateur') {
      setEmail('dr.konan@formateur.upb.ci');
      setPassword('password123');
      toast.success('Profil Formateur / Jury chargé');
      navigate('/formateur/dashboard');
    } else {
      setEmail('admin@genie.upb.ci');
      setPassword('password123');
      toast.success('Profil Administrateur chargé');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
      className="min-h-screen bg-[#0E1E4A] flex flex-col justify-between relative overflow-hidden"
    >
      {/* Bouton retour accueil */}
      <Link
        to="/"
        aria-label="Retour accueil"
        className="absolute top-6 left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* 1. EN-TÊTE HAUT (Exact Prototype) */}
      <div className="pt-24 pb-8 px-6 sm:px-10 max-w-lg mx-auto w-full flex flex-col gap-3 text-white">
        <Link to="/" className="self-start mb-2">
          <img src={logoUpb} alt="GÉNIE UPB" className="h-10 w-auto object-contain" />
        </Link>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
          Bon retour <span className="text-[#E8742A]">parmi nous.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#C9D1E8] font-normal">
          Connectez-vous pour suivre votre équipe, accéder aux formations et épreuves.
        </p>

        {/* Pilules d'accès rapide pour démo */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
          <span className="text-slate-400">Accès rapide test :</span>
          <button
            type="button"
            onClick={() => handleQuickLogin('candidat')}
            className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[#A9C2FF] font-bold cursor-pointer transition-colors"
          >
            Candidat
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('formateur')}
            className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[#E8B33D] font-bold cursor-pointer transition-colors"
          >
            Formateur
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[#E8742A] font-bold cursor-pointer transition-colors"
          >
            Admin
          </button>
        </div>
      </div>

      {/* 2. FORMULAIRE EN FEUILLE INFÉRIEURE BLANCHE (Exact Prototype) */}
      <div className="bg-[#F6F8FC] rounded-t-[32px] sm:rounded-[32px] sm:mb-12 p-6 sm:p-10 max-w-lg mx-auto w-full shadow-2xl flex flex-col gap-5">
        {/* Message d'erreur éventuel */}
        {errorMsg && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FBE6E3] text-[#B4281F] text-xs sm:text-sm font-semibold border border-[#B4281F]/20 animate-shake">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom.prenom@etudiant.upb.ci"
                className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => toast('Un e-mail de réinitialisation a été simulé.')}
                className="text-xs font-bold text-[#2F6BF0] hover:underline cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full min-h-[50px] rounded-2xl bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-black text-base flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="border-t border-slate-200/80 pt-4 text-center text-xs text-slate-500">
          Vous n’avez pas encore de compte ?{' '}
          <Link to="/inscription" className="text-[#E8742A] font-extrabold hover:underline">
            Créer un compte candidat →
          </Link>
        </div>
      </div>
    </div>
  );
}
