import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUpb from '../../assets/images/logo_genie_upb.png';

/**
 * ============================================================================
 * P2 MON PROFIL — PARTICIPANT (PROTOTYPE V4)
 * ============================================================================
 * 100% fidèle au prototype officiel GENIE UPB - Prototype (4).html (is.P2 L19878855) :
 * - Carte Hero bleue matricielle avec photo avatar modifiable (upload dynamique)
 * - Nom : Aya Kouassi, L2 · MIAGE · 23UPB0457
 * - Encadrés Équipe (Les Bâtisseurs) & Statut (Soumise)
 * - Bouton "Voir mon badge numérique" ouvrant le modal officiel
 * - Sections "Accès rapide", "Mon compte", "Aide" et "Se déconnecter"
 * - Modal Badge interactif avec QR code et statut de validation
 * - 100% Tailwind CSS valide (zéro inline static style).
 */
export default function MonProfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('genie-avatar');
      if (saved) setAvatarUrl(saved);
    } catch (_) {
      // ignore
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        try {
          localStorage.setItem('genie-avatar', result);
          window.dispatchEvent(new Event('genie-avatar-updated'));
        } catch (_) {
          // ignore
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 font-['Nunito',sans-serif]">
      {/* Conteneur scrollable centré */}
      <div className="w-full max-w-[720px] mx-auto px-4 pt-20 md:pt-10 pb-28 md:pb-16 flex flex-col gap-[18px]">
        {/* Titre de page */}
        <h1 className="font-black text-[32px] leading-[1.05] tracking-[-0.02em] text-[#0A1430]">
          Profil
        </h1>

        {/* ====================================================================
            CARTE HERO BLEUE MATRICIELLE AVEC AVATAR INTERACTIF
            ==================================================================== */}
        <div className="relative rounded-[28px] p-[18px] flex flex-col gap-4 overflow-hidden bg-[#2F6BF0] text-white bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:40px_40px] animate-gridanim shadow-[0_18px_40px_rgba(47,107,240,0.25)]">
          <div className="flex items-center gap-4">
            {/* Avatar avec bouton caméra */}
            <div
              onClick={() => fileInputRef.current?.click()}
              title="Changer ma photo"
              className="relative w-[92px] h-[92px] shrink-0 cursor-pointer group"
            >
              <span
                style={{
                  backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                }}
                className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_18px_rgba(0,0,0,0.2)] bg-[#2F6BF0] bg-cover bg-center text-white grid place-items-center font-extrabold text-[33px] box-border group-hover:brightness-105 transition-all"
              >
                {!avatarUrl && 'AK'}
              </span>

              {/* Pastille caméra orange */}
              <span className="absolute -right-1 -bottom-1 w-[34px] h-[34px] rounded-full bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] border-[3px] border-white grid place-items-center text-white shadow-[0_6px_14px_rgba(232,98,26,0.4)] group-hover:scale-105 transition-transform">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
              </span>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Infos Aya Kouassi */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-black text-[28px] leading-[1.05] tracking-[-0.02em] text-white">
                Aya Kouassi
              </span>
              <span className="font-semibold text-[15px] text-white">
                L2 · MIAGE · 23UPB0457
              </span>
            </div>
          </div>

          {/* Grille 2 encarts internes blancs */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Mon équipe */}
            <div
              onClick={() => navigate('/espace/equipe')}
              className="bg-white rounded-[18px] p-3 flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                ◎
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-[16px] text-[#0A1430] truncate">
                  Les Bâtisseurs
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Mon équipe
                </span>
              </div>
            </div>

            {/* Statut candidature */}
            <div
              onClick={() => navigate('/espace/statut')}
              className="bg-white rounded-[18px] p-3 flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-[#FFF3C2] text-[#8A5A00] grid place-items-center font-extrabold text-[16px]">
                ◷
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-[16px] text-[#0A1430] truncate">
                  Soumise
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Statut
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            BOUTON VOIR MON BADGE NUMÉRIQUE
            ==================================================================== */}
        <div
          onClick={() => setBadgeModalOpen(true)}
          className="min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-extrabold text-[17px] flex items-center justify-between pl-5 pr-2.5 cursor-pointer shadow-[0_12px_24px_rgba(10,20,48,0.25)] hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <span>Voir mon badge numérique</span>
          <span className="w-11 h-11 rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-extrabold text-[18px]">
            ▦
          </span>
        </div>

        {/* ====================================================================
            SECTION : ACCÈS RAPIDE
            ==================================================================== */}
        <div className="flex flex-col gap-2.5">
          <h2 className="font-extrabold text-[22px] text-[#0A1430]">
            Accès rapide
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Mon équipe */}
            <div
              onClick={() => navigate('/espace/equipe')}
              className="relative bg-white rounded-[22px] p-3.5 flex flex-col gap-2 shadow-[0_10px_24px_rgba(14,30,74,0.08)] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="w-[42px] h-[42px] rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[18px]">
                ◎
              </span>
              <span className="font-extrabold text-[17px] text-[#0A1430]">
                Mon équipe
              </span>
              <span className="font-medium text-[13px] leading-[1.35] text-[#6A7189] pr-8">
                Membres et invitations
              </span>
              <span className="absolute right-3 bottom-3 w-[30px] h-[30px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-extrabold text-[16px]">
                ›
              </span>
            </div>

            {/* Formations */}
            <div
              onClick={() => navigate('/espace/formations')}
              className="relative bg-white rounded-[22px] p-3.5 flex flex-col gap-2 shadow-[0_10px_24px_rgba(14,30,74,0.08)] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="w-[42px] h-[42px] rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[18px]">
                ▶
              </span>
              <span className="font-extrabold text-[17px] text-[#0A1430]">
                Formations
              </span>
              <span className="font-medium text-[13px] leading-[1.35] text-[#6A7189] pr-8">
                Séances et supports
              </span>
              <span className="absolute right-3 bottom-3 w-[30px] h-[30px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-extrabold text-[16px]">
                ›
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            SECTION : MON COMPTE
            ==================================================================== */}
        <div className="flex flex-col gap-2.5">
          <h2 className="font-extrabold text-[22px] text-[#0A1430]">
            Mon compte
          </h2>

          <div className="bg-white rounded-[22px] overflow-hidden shadow-[0_10px_24px_rgba(14,30,74,0.06)] flex flex-col">
            {/* Informations personnelles */}
            <div
              onClick={() => {}}
              className="flex items-center gap-3.5 p-3.5 px-4 cursor-pointer hover:bg-[#F3F6FD] transition-colors"
            >
              <span className="w-10 h-10 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                ✎
              </span>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[16px] text-[#0A1430]">
                  Informations personnelles
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Filière, niveau, téléphone
                </span>
              </div>
              <span className="font-extrabold text-[18px] text-[#2F6BF0]">›</span>
            </div>

            <div className="h-px bg-[#EEECE6] mx-4" />

            {/* Photo du badge */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3.5 p-3.5 px-4 cursor-pointer hover:bg-[#F3F6FD] transition-colors"
            >
              <span className="w-10 h-10 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                ◐
              </span>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[16px] text-[#0A1430]">
                  Photo du badge
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Recadrer ma photo
                </span>
              </div>
              <span className="font-extrabold text-[18px] text-[#2F6BF0]">›</span>
            </div>

            <div className="h-px bg-[#EEECE6] mx-4" />

            {/* Statut d’inscription */}
            <div
              onClick={() => navigate('/espace/statut')}
              className="flex items-center gap-3.5 p-3.5 px-4 cursor-pointer hover:bg-[#F3F6FD] transition-colors"
            >
              <span className="w-10 h-10 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                ◔
              </span>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[16px] text-[#0A1430]">
                  Statut d’inscription
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Suivre la validation
                </span>
              </div>
              <span className="font-extrabold text-[18px] text-[#2F6BF0]">›</span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            SECTION : AIDE
            ==================================================================== */}
        <div className="flex flex-col gap-2.5">
          <h2 className="font-extrabold text-[22px] text-[#0A1430]">
            Aide
          </h2>

          <div className="bg-white rounded-[22px] overflow-hidden shadow-[0_10px_24px_rgba(14,30,74,0.06)] flex flex-col">
            {/* FAQ et contacts */}
            <div
              onClick={() => navigate('/faq')}
              className="flex items-center gap-3.5 p-3.5 px-4 cursor-pointer hover:bg-[#F3F6FD] transition-colors"
            >
              <span className="w-10 h-10 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                ?
              </span>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[16px] text-[#0A1430]">
                  FAQ et contacts
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Trouver une réponse
                </span>
              </div>
              <span className="font-extrabold text-[18px] text-[#2F6BF0]">›</span>
            </div>

            <div className="h-px bg-[#EEECE6] mx-4" />

            {/* Règlement et chartes */}
            <div
              onClick={() => navigate('/espace/equipe/chartes')}
              className="flex items-center gap-3.5 p-3.5 px-4 cursor-pointer hover:bg-[#F3F6FD] transition-colors"
            >
              <span className="w-10 h-10 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                i
              </span>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[16px] text-[#0A1430]">
                  Règlement et chartes
                </span>
                <span className="font-medium text-[13px] text-[#6A7189]">
                  Documents du concours
                </span>
              </div>
              <span className="font-extrabold text-[18px] text-[#2F6BF0]">›</span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            BOUTON DÉCONNEXION
            ==================================================================== */}
        <div
          onClick={() => navigate('/connexion')}
          className="min-h-[54px] rounded-[16px] bg-white text-[#C8372D] font-extrabold text-[17px] flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_10px_24px_rgba(14,30,74,0.06)] hover:bg-red-50/50 active:scale-[0.99] transition-all"
        >
          <span>⇥</span>
          <span>Se déconnecter</span>
        </div>
      </div>

      {/* ====================================================================
          MODAL OFFICIEL DU BADGE NUMÉRIQUE UPB
          ==================================================================== */}
      {badgeModalOpen && (
        <div
          onClick={() => setBadgeModalOpen(false)}
          className="fixed inset-0 z-[500] bg-[#0A1430]/60 backdrop-blur-[6px] flex items-center justify-center p-5 animate-[fadeIn_0.25s_ease-out]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[340px] bg-white rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.35)] animate-[badgeIn_0.4s_cubic-bezier(0.3,1.4,0.5,1)]"
          >
            {/* Header bleu matriciel avec logo */}
            <div className="relative bg-[#2F6BF0] bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:40px_40px] animate-gridanim p-[18px] pb-[54px] flex justify-between items-center text-white">
              <span className="font-black text-[18px] tracking-tight">
                GÉNIE UPB
              </span>
              <span className="w-[42px] h-[42px] rounded-full bg-white grid place-items-center overflow-hidden p-1 shadow-sm">
                <img
                  src={logoUpb}
                  alt="UPB"
                  className="w-full h-full object-contain"
                />
              </span>
            </div>

            {/* Corps du badge */}
            <div className="relative z-10 -mt-11 px-5 pb-5 flex flex-col items-center gap-2.5 text-center">
              {/* Avatar rond */}
              <div
                style={{
                  backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                }}
                className="w-[88px] h-[88px] rounded-full overflow-hidden border-4 border-white shadow-[0_8px_18px_rgba(0,0,0,0.2)] bg-[#2F6BF0] bg-cover bg-center text-white grid place-items-center font-extrabold text-[32px]"
              >
                {!avatarUrl && 'AK'}
              </div>

              {/* Nom & formation */}
              <span className="font-extrabold text-[22px] text-[#0A1430]">
                Aya Kouassi
              </span>
              <span className="font-semibold text-[14px] text-[#4A5168]">
                23UPB0457 · L2 MIAGE · Les Bâtisseurs
              </span>

              {/* QR Code stylisé officiel 21x21 */}
              <div className="mt-1.5 p-3 rounded-[18px] border border-[#0A1430]/[0.12] bg-white">
                <svg
                  width="168"
                  height="168"
                  viewBox="0 0 168 168"
                  className="block"
                >
                  {/* Coin haut-gauche */}
                  <rect x="8" y="8" width="48" height="48" rx="8" fill="#0A1430" />
                  <rect x="16" y="16" width="32" height="32" rx="4" fill="#ffffff" />
                  <rect x="24" y="24" width="16" height="16" rx="2" fill="#0A1430" />

                  {/* Coin haut-droit */}
                  <rect x="112" y="8" width="48" height="48" rx="8" fill="#0A1430" />
                  <rect x="120" y="16" width="32" height="32" rx="4" fill="#ffffff" />
                  <rect x="128" y="24" width="16" height="16" rx="2" fill="#0A1430" />

                  {/* Coin bas-gauche */}
                  <rect x="8" y="112" width="48" height="48" rx="8" fill="#0A1430" />
                  <rect x="16" y="120" width="32" height="32" rx="4" fill="#ffffff" />
                  <rect x="24" y="128" width="16" height="16" rx="2" fill="#0A1430" />

                  {/* Motifs centraux et de données */}
                  <rect x="68" y="16" width="10" height="18" fill="#0A1430" />
                  <rect x="90" y="24" width="12" height="10" fill="#0A1430" />
                  <rect x="68" y="44" width="16" height="10" fill="#0A1430" />
                  <rect x="16" y="68" width="12" height="12" fill="#0A1430" />
                  <rect x="38" y="68" width="18" height="10" fill="#0A1430" />
                  <rect x="68" y="68" width="32" height="32" rx="6" fill="#2F6BF0" />
                  <circle cx="84" cy="84" r="8" fill="#ffffff" />
                  <rect x="112" y="68" width="16" height="12" fill="#0A1430" />
                  <rect x="140" y="76" width="20" height="10" fill="#0A1430" />
                  <rect x="68" y="112" width="14" height="20" fill="#0A1430" />
                  <rect x="92" y="120" width="20" height="12" fill="#0A1430" />
                  <rect x="122" y="112" width="16" height="14" fill="#0A1430" />
                  <rect x="144" y="132" width="16" height="24" fill="#0A1430" />
                  <rect x="88" y="144" width="22" height="14" fill="#0A1430" />
                </svg>
              </div>

              {/* Mention informative */}
              <span className="font-medium text-[13px] leading-[1.4] text-[#6A7189] px-2">
                Présente ce QR code à l'entrée de chaque séance et des épreuves.
              </span>

              {/* Badge d'activation */}
              <span className="font-semibold text-[12px] font-mono text-[#8A5A00] bg-[#FFF3C2] py-1.5 px-2.5 rounded-[8px]">
                Actif après validation de l'équipe
              </span>

              {/* Bouton fermer */}
              <button
                onClick={() => setBadgeModalOpen(false)}
                className="mt-2 w-full min-h-[44px] rounded-[14px] bg-[#F1F4FA] text-[#0A1430] font-extrabold text-[14px] hover:bg-[#E6EAF2] transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
