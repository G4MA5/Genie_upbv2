import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { action, useEspaceCharge } from '../../contexts/EspaceContext';
import { api, urlFichier } from '../../lib/api';
import { LIBELLE_ETAT, nomComplet } from '../../lib/format';

/**
 * ============================================================================
 * P2 MON PROFIL — PARTICIPANT
 * ============================================================================
 * - Photo de profil envoyée dans le bucket « photos-profil »
 * - Identité issue de la base des étudiants UPB (lecture seule)
 * - Hébergement sur place (modifiable)
 * - Badge QR réel (disponible une fois l'équipe validée)
 */
export default function MonProfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { espace, rafraichir, deconnecter } = useEspaceCharge();
  const moi = espace.candidat;
  const equipe = espace.equipe;
  const avatarUrl = urlFichier(moi.photo_url) ?? '';
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [infosOpen, setInfosOpen] = useState(false);
  const [envoiPhoto, setEnvoiPhoto] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setEnvoiPhoto(true);
    const r = await action(() => api.changerPhoto(file), 'Photo mise à jour');
    setEnvoiPhoto(false);
    if (r) rafraichir();
  };

  const basculerHebergement = async () => {
    const r = await action(() => api.modifierProfil(!moi.hebergement), 'Préférence enregistrée');
    if (r) rafraichir();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 font-['Nunito',sans-serif]">
      {/* Conteneur fluide responsive pleine largeur sur grand écran */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-5 md:gap-6">
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
                {envoiPhoto ? '…' : !avatarUrl && moi.initiales}
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
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Identité du candidat */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-black text-[28px] leading-[1.05] tracking-[-0.02em] text-white break-words">
                {nomComplet(moi)}
              </span>
              <span className="font-semibold text-[15px] text-white break-words">
                {[moi.niveau, moi.filiere, moi.matricule].filter(Boolean).join(' · ')}
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
                  {equipe ? equipe.nom : 'Aucune'}
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
                  {equipe ? LIBELLE_ETAT[equipe.etat] : 'Sans équipe'}
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
            GRILLE DES SECTIONS EN 2 COLONNES FLUIDES SUR GRAND ÉCRAN (>=lg)
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full items-start">
          
          {/* COLONNE GAUCHE : ACCÈS RAPIDE + AIDE */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* SECTION : ACCÈS RAPIDE */}
            <div className="flex flex-col gap-2.5">
              <h2 className="font-extrabold text-[22px] text-[#0A1430]">
                Accès rapide
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Mon équipe */}
                <div
                  onClick={() => navigate('/espace/equipe')}
                  className="relative bg-white rounded-[22px] p-4 flex flex-col gap-2 shadow-[0_10px_24px_rgba(14,30,74,0.06)] border border-[#EEF1F7] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
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
                  <span className="absolute right-3.5 bottom-3.5 w-[30px] h-[30px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-extrabold text-[16px]">
                    ›
                  </span>
                </div>

                {/* Formations */}
                <div
                  onClick={() => navigate('/espace/formations')}
                  className="relative bg-white rounded-[22px] p-4 flex flex-col gap-2 shadow-[0_10px_24px_rgba(14,30,74,0.06)] border border-[#EEF1F7] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
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
                  <span className="absolute right-3.5 bottom-3.5 w-[30px] h-[30px] rounded-full bg-[#DCE7FF] text-[#1D4FD8] grid place-items-center font-extrabold text-[16px]">
                    ›
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION : AIDE */}
            <div className="flex flex-col gap-2.5">
              <h2 className="font-extrabold text-[22px] text-[#0A1430]">
                Aide
              </h2>

              <div className="bg-white rounded-[22px] overflow-hidden shadow-[0_10px_24px_rgba(14,30,74,0.06)] border border-[#EEF1F7] flex flex-col">
                {/* FAQ et contacts */}
                <div
                  onClick={() => navigate('/faq-contact')}
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
                  onClick={() => navigate('/espace/equipe/charte')}
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
          </div>

          {/* COLONNE DROITE : MON COMPTE + SE DÉCONNECTER */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* SECTION : MON COMPTE */}
            <div className="flex flex-col gap-2.5">
              <h2 className="font-extrabold text-[22px] text-[#0A1430]">
                Mon compte
              </h2>

              <div className="bg-white rounded-[22px] overflow-hidden shadow-[0_10px_24px_rgba(14,30,74,0.06)] border border-[#EEF1F7] flex flex-col">
                {/* Informations personnelles */}
                <div
                  onClick={() => setInfosOpen((v) => !v)}
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
                  <span className="font-extrabold text-[18px] text-[#2F6BF0]">{infosOpen ? '⌄' : '›'}</span>
                </div>

                {infosOpen && (
                  <div className="px-4 pb-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-medium text-[14px]">
                    {[
                      ['Matricule', moi.matricule],
                      ['Niveau', moi.niveau],
                      ['Filière', moi.filiere],
                      ['E-mail', moi.email],
                      ['Téléphone', moi.telephone],
                      ['N° candidat', moi.numero_candidat],
                    ].map(([k, v]) => (
                      <React.Fragment key={k}>
                        <span className="text-[#6A7189]">{k}</span>
                        <span className="text-[#0A1430] font-bold break-all">{v || '—'}</span>
                      </React.Fragment>
                    ))}
                    <span className="col-span-2 pt-1 text-[12px] text-[#6A7189]">
                      Données issues de la base des étudiants UPB. Une erreur ? Contacte la scolarité.
                    </span>
                  </div>
                )}

                <div className="h-px bg-[#EEECE6] mx-4" />

                {/* Hébergement sur place */}
                <div
                  onClick={basculerHebergement}
                  className="flex items-center gap-3.5 p-3.5 px-4 cursor-pointer hover:bg-[#F3F6FD] transition-colors"
                >
                  <span className="w-10 h-10 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[16px]">
                    ⌂
                  </span>
                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span className="font-bold text-[16px] text-[#0A1430]">Hébergement sur place</span>
                    <span className="font-medium text-[13px] text-[#6A7189]">
                      {moi.hebergement ? 'Je dois être logé·e pendant le concours' : 'Je ne loge pas sur place'}
                    </span>
                  </div>
                  <span
                    className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${moi.hebergement ? 'bg-[#2F6BF0]' : 'bg-[#D6DBE6]'}`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${moi.hebergement ? 'left-6' : 'left-1'}`}
                    />
                  </span>
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
                      {moi.photo_url ? 'Changer ma photo' : 'Ajouter ma photo'}
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

            {/* BOUTON DÉCONNEXION */}
            <div
              onClick={deconnecter}
              className="min-h-[54px] rounded-[16px] bg-white text-[#C8372D] font-extrabold text-[17px] flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_10px_24px_rgba(14,30,74,0.06)] border border-[#EEF1F7] hover:bg-red-50/50 active:scale-[0.99] transition-all"
            >
              <span>⇥</span>
              <span>Se déconnecter</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DU BADGE NUMÉRIQUE (badge PNG réel généré à la validation) */}
      {badgeModalOpen && (
        <div
          onClick={() => setBadgeModalOpen(false)}
          className="fixed inset-0 z-[520] bg-[#0A1430]/70 backdrop-blur-[8px] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[380px] bg-white rounded-[28px] p-5 flex flex-col gap-4 items-center shadow-[0_30px_60px_rgba(0,0,0,0.35)] animate-scaleIn"
          >
            {espace.badge_url ? (
              <>
                <img
                  src={urlFichier(espace.badge_url)}
                  alt="Mon badge GÉNIE UPB"
                  className="w-full max-h-[62vh] object-contain rounded-[18px] shadow-md"
                />
                <a
                  href={urlFichier(espace.badge_url)}
                  download="badge-genie-upb.png"
                  className="w-full min-h-[50px] rounded-[16px] bg-[#0A1430] text-white font-extrabold text-[16px] flex items-center justify-center"
                >
                  Télécharger mon badge
                </a>
              </>
            ) : (
              <>
                <span className="w-16 h-16 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[28px]">
                  ▦
                </span>
                <span className="font-black text-[20px] text-[#0A1430] text-center">Badge pas encore disponible</span>
                <span className="font-medium text-[15px] leading-[1.5] text-[#4A5168] text-center">
                  Ton badge avec QR code unique sera généré et envoyé par e-mail dès que les organisateurs auront validé ton
                  équipe.
                </span>
              </>
            )}
            <button
              type="button"
              onClick={() => setBadgeModalOpen(false)}
              className="font-bold text-[15px] text-[#6A7189] underline cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
