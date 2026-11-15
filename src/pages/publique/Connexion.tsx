import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logoUpb from '../../assets/images/logo_genie_upb.png';

export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('aya.kouassi@upb.ci');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const em = email.toLowerCase().trim();

      if (em.includes('admin')) {
        toast.success('Connexion Administrateur réussie !');
        navigate('/admin/dashboard');
      } else if (em.includes('formateur') || em.includes('jury')) {
        toast.success('Connexion Formateur & Jury réussie !');
        navigate('/formateur/dashboard');
      } else {
        toast.success('Bienvenue dans votre espace candidat !');
        navigate('/espace/dashboard');
      }
    }, 400);
  };

  const handleForgotPassword = () => {
    toast('Un e-mail de réinitialisation a été envoyé à votre adresse.', {
      icon: '✉️',
      style: {
        borderRadius: '16px',
        background: '#0E1E4A',
        color: '#fff',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 700,
      },
    });
  };

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
      className="min-h-screen w-full bg-[#0E1E4A] flex flex-col justify-center items-center py-6 sm:py-12 px-0 sm:px-4 font-nunito relative overflow-x-hidden"
    >
      {/* Bouton retour accueil officiel */}
      <Link
        to="/"
        aria-label="Retour à l'accueil"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Conteneur principal (mobile plein écran, desktop carte centrée élégante) */}
      <div
        data-screen-label="S9 Connexion"
        className="w-full max-w-[480px] min-h-screen sm:min-h-0 flex flex-col justify-between sm:justify-start bg-transparent sm:bg-[#0E1E4A] sm:border sm:border-white/10 sm:rounded-[32px] sm:shadow-[0_24px_60px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        {/* 1. Zone supérieure bleu nuit avec Logo et Titre */}
        <div className="pt-14 sm:pt-8 pb-6 px-[22px] flex flex-col gap-4 text-white flex-1 sm:flex-none justify-center">
          <Link to="/" className="inline-block self-start">
            <img
              src={logoUpb}
              alt="GÉNIE UPB"
              className="h-[44px] sm:h-[50px] w-auto object-contain"
            />
          </Link>

          <h1 className="m-0 font-extrabold text-[36px] sm:text-[44px] leading-[0.98] tracking-[-0.025em]">
            Bon retour <span className="text-[#E8742A]">parmi nous.</span>
          </h1>

          <span className="font-normal text-[16px] text-[#C9D1E8]">
            Connectez-vous pour suivre votre équipe.
          </span>

          {/* Raccourcis rôles pour démo rapide */}
          <div className="flex items-center gap-2 pt-1 text-xs font-mono">
            <span className="text-[#C9D1E8]/70 text-[11px]">Rôle test :</span>
            <button
              type="button"
              onClick={() => {
                setEmail('aya.kouassi@upb.ci');
                setHasError(false);
              }}
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#A9C2FF] font-bold text-[11px] transition-colors cursor-pointer"
            >
              Candidat
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('formateur@upb.ci');
                setHasError(false);
              }}
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8B33D] font-bold text-[11px] transition-colors cursor-pointer"
            >
              Formateur
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@genie-upb.ci');
                setHasError(false);
              }}
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8742A] font-bold text-[11px] transition-colors cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* 2. Feuille inférieure blanche officielle (Prototype S9) */}
        <div className="bg-[#F6F8FC] rounded-t-[28px] sm:rounded-[28px] p-[24px_18px_28px] sm:p-7 flex flex-col gap-[14px]">
          {/* Message d'erreur éventuel (conforme au prototype) */}
          {hasError && (
            <div className="flex items-center gap-2.5 p-[12px_14px] rounded-[14px] bg-[#FBE6E3] text-[#B4281F] font-semibold text-[15px] leading-[1.4]">
              <span className="w-5 h-5 rounded-full bg-[#B4281F] text-white text-xs font-black flex items-center justify-center flex-none">
                !
              </span>
              <span>E-mail ou mot de passe incorrect. Vérifiez vos informations.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
            {/* Champ E-mail */}
            <label className="flex flex-col gap-1.5 cursor-pointer">
              <span className="font-semibold text-[15px] text-[#0E1E4A]">E-mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setHasError(false);
                }}
                placeholder="aya.kouassi@upb.ci"
                className="min-h-[50px] rounded-[14px] border-[1.5px] border-[#D6D2C8] bg-white px-3.5 flex items-center font-medium text-[16px] text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0] transition-colors"
              />
            </label>

            {/* Champ Mot de passe */}
            <label className="flex flex-col gap-1.5 cursor-pointer">
              <span className="font-semibold text-[15px] text-[#0E1E4A]">Mot de passe</span>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setHasError(false);
                  }}
                  placeholder="••••••••"
                  className={`w-full min-h-[50px] rounded-[14px] border-[1.5px] bg-white px-3.5 pr-11 font-medium text-[16px] text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0] transition-colors ${
                    hasError
                      ? 'border-[2px] border-[#C8372D] bg-[#FFF6F5]'
                      : 'border-[#D6D2C8]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-3.5 text-slate-400 hover:text-[#0E1E4A] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {/* Lien Mot de passe oublié */}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="self-end font-bold text-[15px] text-[#0E1E4A] underline hover:text-[#2F6BF0] transition-colors cursor-pointer"
            >
              Mot de passe oublié ?
            </button>

            {/* Bouton Se connecter officiel */}
            <button
              type="submit"
              disabled={loading}
              data-shine="1"
              className="min-h-[54px] rounded-full bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-extrabold text-[17px] flex items-center justify-center active:scale-98 transition-all cursor-pointer shadow-sm"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Lien Créer un compte officiel */}
          <span className="text-center font-medium text-[15px] text-[#4A5168] pt-1">
            Pas encore de compte ?{' '}
            <Link
              to="/inscription"
              className="text-[#0E1E4A] font-bold underline hover:text-[#E8742A] transition-colors"
            >
              Créer un compte
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
