import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/espace/Avatar';
import { action, useEspaceCharge } from '../../contexts/EspaceContext';
import { api } from '../../lib/api';
import { REGLE_DEUX_EQUIPES, casse, couleurCategorie, dateLongue, dateRelative, listeCategories } from '../../lib/format';
import type { Invitation } from '../../types/espace';

/**
 * ============================================================================
 * P3b : MES INVITATIONS (ESPACE PARTICIPANT)
 * ============================================================================
 * Invitations réelles reçues (chef, équipe, catégorie, date). Accepter une
 * invitation refuse automatiquement les autres (règle appliquée par le backend).
 */
export default function InvitationsEquipe() {
  const navigate = useNavigate();
  const { espace, rafraichir, choisirEquipe } = useEspaceCharge();
  const [invites, setInvites] = useState<Invitation[] | null>(null);
  const [enCours, setEnCours] = useState<number | null>(null);
  const prenom = casse(espace.candidat.prenom.split(' ')[0]);

  useEffect(() => {
    action(() => api.invitations()).then((r) => setInvites(r ?? []));
  }, []);

  const handleRefuse = async (id: number) => {
    setEnCours(id);
    const ok = await action(() => api.refuser(id), 'Invitation refusée');
    setEnCours(null);
    if (ok) {
      setInvites((prev) => (prev ?? []).filter((item) => item.id !== id));
      rafraichir();
    }
  };

  const handleAccept = async (iv: Invitation) => {
    setEnCours(iv.id);
    const equipe = await action(() => api.accepter(iv.id), `Bienvenue dans l'équipe ${iv.equipe.nom} !`);
    setEnCours(null);
    if (equipe) {
      choisirEquipe(equipe.id);
      await rafraichir();
      navigate('/espace/equipe');
    }
  };

  const liste = invites ?? [];

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond `←` */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Retour"
          >
            ←
          </button>

          {/* Titre avec badge compteur */}
          <div className="flex items-center gap-3">
            <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
              Invitations
            </h1>
            <span className="min-w-[32px] h-[32px] px-2.5 rounded-full bg-[#2F6BF0] text-white shadow-[0_10px_28px_rgba(47,107,240,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] grid place-items-center font-extrabold text-[15px]">
              {liste.length}
            </span>
          </div>
        </div>

        {/* État vide si aucune invitation */}
        {invites !== null && espace.equipes.length > 0 && (
          <div className="w-full flex gap-3 p-4 px-5 rounded-[18px] bg-[#FFF6DA] text-[#6B4E00] font-semibold text-[15px] leading-[1.5]">
            {espace.categories_possibles.length > 0
              ? `Tu fais déjà partie de l'équipe ${espace.equipes[0].nom} : tu peux encore rejoindre une équipe ${listeCategories(
                  espace.categories_possibles
                )}. ${REGLE_DEUX_EQUIPES}`
              : `Tu fais déjà partie de ${espace.equipes.length > 1 ? 'deux équipes' : `l'équipe ${espace.equipes[0].nom}`} : tu ne peux plus accepter d'invitation.`}
          </div>
        )}

        {invites !== null && liste.length === 0 && (
          <div className="w-full p-12 px-6 rounded-[24px] bg-white text-center flex flex-col gap-3 items-center shadow-[0_10px_30px_rgba(14,30,74,0.05)] border border-[#EEF1F7]">
            <span className="w-16 h-16 rounded-full bg-[#E3EBFB] text-[#2F6BF0] grid place-items-center font-extrabold text-[28px]">
              ✉
            </span>
            <span className="font-extrabold text-[22px] text-[#0A1430]">
              Aucune invitation
            </span>
            <span className="font-medium text-[16px] text-[#6A7189]">
              Quand un chef d'équipe t'invite, ça apparaît ici.
            </span>
          </div>
        )}

        {/* Grille 2 colonnes fluide sur grand écran (>=lg) */}
        {liste.length > 0 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {liste.map((iv) => (
              <div
                key={iv.id}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_12px_30px_rgba(14,30,74,0.08)] border border-[#EEF1F7] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(14,30,74,0.12)] flex flex-col"
              >
                {/* Header émetteur */}
                <div className="flex gap-3.5 items-center p-4 px-5 border-b border-[#EEECE6]">
                  <Avatar
                    personne={iv.chef}
                    couleur={couleurCategorie(iv.equipe.cle)}
                    className="w-11 h-11 text-[16px] shadow-sm"
                  />
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="font-bold text-[16px] text-[#0A1430] truncate">
                      {casse(iv.chef.prenom)} {casse(iv.chef.nom)}{' '}
                      <span className="font-medium text-[#6A7189]">via GÉNIE UPB</span>
                    </span>
                    <span className="font-medium text-[13px] text-[#6A7189]">
                      à moi · {dateRelative(iv.cree_le)}
                    </span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F6BF0] shrink-0" />
                </div>

                {/* Contenu de l'invitation */}
                <div className="p-5 flex flex-col gap-4">
                  <span className="font-black text-[20px] leading-[1.2] text-[#0A1430]">
                    Rejoins l'équipe {iv.equipe.nom} !
                  </span>

                  {/* Bannière bleu blueprint avec nom d'équipe en pastille blanche */}
                  <div style={{ backgroundColor: couleurCategorie(iv.equipe.cle) }} className="bg-[#2F6BF0] rounded-[20px] p-5 flex flex-col gap-3 items-start text-white shadow-inner bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)] bg-[size:32px_32px]">
                    <span className="font-black text-[15px] tracking-wider text-white/90 uppercase">
                      GÉNIE UPB
                    </span>
                    <span className="px-4 py-1.5 bg-white text-[#1D4FD8] rounded-full font-black text-[22px] shadow-sm">
                      {iv.equipe.nom}
                    </span>
                    <span className="font-bold text-[14px] text-white/95">
                      Catégorie {iv.equipe.categorie} · {iv.equipe.nb_membres} membre{iv.equipe.nb_membres > 1 ? 's' : ''} ·{' '}
                      {iv.equipe.taille}
                    </span>
                  </div>

                  <span className="font-medium text-[15px] leading-[1.55] text-[#3D4459]">
                    Bonjour {prenom}, {casse(iv.chef.prenom)} {casse(iv.chef.nom)} t'invite à rejoindre son équipe pour
                    GÉNIE UPB. Réponds avant la clôture des inscriptions le {dateLongue(espace.inscriptions_cloture)}.
                  </span>

                  {/* Boutons d'action Refuser / Accepter */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      disabled={enCours !== null}
                      onClick={() => handleRefuse(iv.id)}
                      className="flex-1 min-h-[54px] rounded-[16px] border-2 border-[#E3E8F0] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-slate-100 active:scale-95"
                    >
                      Refuser
                    </button>
                    <button
                      type="button"
                      disabled={enCours !== null || !iv.compatible}
                      title={iv.compatible ? undefined : `Invitation incompatible avec tes équipes ou ta filière. ${REGLE_DEUX_EQUIPES}`}
                      onClick={() => handleAccept(iv)}
                      className="flex-[1.4] min-h-[54px] rounded-[16px] bg-[#0A1430] text-white font-extrabold text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_24px_rgba(10,20,48,0.25)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{enCours === iv.id ? '…' : 'Accepter'}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notice d'information légale / règle de candidature unique */}
        <div className="w-full flex gap-3 p-4 px-5 rounded-[18px] bg-[#E9ECF5] text-[#0A1430] font-medium text-[15px] leading-[1.5] shadow-sm">
          <span className="font-black text-[16px] text-[#2F6BF0]">i</span>
          <span>
            Un étudiant a au plus 2 équipes : une dans la catégorie de sa filière (Droit, Technologie ou Économie) et
            une en Innovation.
            Accepter une invitation refuse automatiquement celles qui deviennent incompatibles.
          </span>
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
