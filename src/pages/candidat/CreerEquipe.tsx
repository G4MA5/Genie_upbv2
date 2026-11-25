import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { action, useEspaceCharge } from '../../contexts/EspaceContext';
import { api } from '../../lib/api';
import { REGLE_DEUX_EQUIPES, couleurCategorie, listeCategories, pluriel } from '../../lib/format';

/**
 * ============================================================================
 * ÉCRAN P3a : CRÉER UNE ÉQUIPE
 * ============================================================================
 * Le créateur devient chef d'équipe. Les catégories, tailles d'équipe et nombres
 * d'équipes inscrites viennent du backend.
 */
export default function CreerEquipe() {
  const navigate = useNavigate();
  const { espace, referentiel, rafraichir, choisirEquipe } = useEspaceCharge();
  const possibles = espace.categories_possibles;
  const concours = referentiel?.concours ?? [];
  const [teamName, setTeamName] = useState('');
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [envoi, setEnvoi] = useState(false);

  // Plus aucune catégorie possible à l'arrivée sur la page (ex. déjà 2 équipes)
  useEffect(() => {
    if (possibles.length === 0) navigate('/espace/equipe', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || selectedCat === null || envoi) return;
    setEnvoi(true);
    const equipe = await action(() => api.creerEquipe(teamName.trim(), selectedCat), 'Équipe créée : tu en es le chef !');
    setEnvoi(false);
    if (equipe) {
      choisirEquipe(equipe.id);
      await rafraichir();
      navigate('/espace/equipe/membres');
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour × et Titre */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Fermer et retourner"
          >
            ×
          </button>
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Créer une équipe
          </h1>
        </div>

        {/* Formulaire pleine largeur en 2 colonnes sur grand écran (>=lg) */}
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Colonne Gauche : Nom de l'équipe + Bouton de création */}
          <div className="flex flex-col gap-5 bg-white rounded-[24px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(14,30,74,0.06)] border border-[#EEF1F7]">
            <label className="flex flex-col gap-2">
              <span className="font-extrabold text-[17px] text-[#0A1430]">
                Nom de l'équipe
              </span>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Nom de votre équipe"
                maxLength={60}
                className="min-h-[54px] rounded-[16px] border-2 border-[#0A1430] bg-white px-4 font-extrabold text-[18px] text-[#0A1430] outline-none shadow-sm focus:border-[#2F6BF0] transition-colors"
              />
              <span className="font-medium text-[14px] text-[#6A7189]">
                Modifiable jusqu'à la soumission officielle.
              </span>
            </label>

            {!espace.inscriptions_ouvertes && (
              <span className="font-bold text-[14px] text-[#B4281F]">Les inscriptions sont closes.</span>
            )}
            <button
              type="submit"
              disabled={!teamName.trim() || selectedCat === null || envoi || !espace.inscriptions_ouvertes}
              className="mt-2 min-h-[54px] rounded-[16px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] font-extrabold text-[17px] flex items-center justify-center cursor-pointer shadow-[0_10px_22px_rgba(232,98,26,0.3)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {envoi ? 'Création…' : selectedCat === null ? 'Choisis une catégorie' : 'Créer et inviter mes membres'}
            </button>
          </div>

          {/* Colonne Droite : Sélection de la Catégorie */}
          <div className="flex flex-col gap-3.5">
            <span className="font-extrabold text-[18px] text-[#0A1430] px-1">
              Catégorie du concours
            </span>

            <div className="flex flex-col gap-3">
              {concours.length === 0 && (
                <span className="font-semibold text-[15px] text-[#6A7189] px-1">
                  Aucune catégorie ouverte pour le moment.
                </span>
              )}
              {espace.equipes.length > 0 && (
                <span className="font-semibold text-[14px] leading-snug text-[#6A7189] px-1">
                  Tu fais déjà partie de l'équipe {espace.equipes[0].nom} : tu peux encore créer une équipe{' '}
                  {listeCategories(possibles)}. {REGLE_DEUX_EQUIPES}
                </span>
              )}
              {concours.map((cat) => {
                const isSelected = selectedCat === cat.id;
                const permise = !cat.cle || possibles.includes(cat.cle);
                return (
                  <div
                    key={cat.id}
                    onClick={() => permise && setSelectedCat(cat.id)}
                    aria-disabled={!permise}
                    className={`bg-white rounded-[20px] p-4 px-5 flex gap-4 items-center border-2 cursor-pointer transition-all duration-200 shadow-sm ${
                      !permise
                        ? 'border-transparent opacity-45 cursor-not-allowed'
                        : isSelected
                        ? 'border-[#0A1430] shadow-[0_6px_20px_rgba(10,20,48,0.1)]'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    {/* Barre verticale colorée */}
                    <span
                      style={{ backgroundColor: couleurCategorie(cat.cle) }}
                      className="w-1.5 self-stretch rounded-full"
                    />

                    {/* Détails */}
                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                      <span className="font-extrabold text-[19px] text-[#0A1430] leading-snug">
                        {cat.categorie}
                      </span>
                      <span className="font-medium text-[14px] text-[#6A7189] leading-tight">
                        {cat.taille} ·{' '}
                        <span className="font-bold text-[#17744B]">
                          {pluriel(cat.nb_equipes ?? 0, 'équipe')} inscrite{(cat.nb_equipes ?? 0) > 1 ? 's' : ''}
                        </span>
                      </span>
                      {!permise && (() => {
                        // Catégorie fermée : on affiche sa règle de filière si c'est elle qui bloque
                        const regleFiliere = cat.regles.find((r) => /fili[èe]re/i.test(r) && !/toutes les fili[èe]res\./i.test(r));
                        return regleFiliere ? (
                          <span className="mt-1 font-semibold text-[13px] leading-snug text-[#B4281F]">{regleFiliere}</span>
                        ) : null;
                      })()}
                      {isSelected && cat.regles.length > 0 && (
                        <span className="mt-1.5 flex flex-col gap-0.5">
                          {cat.regles.map((r) => (
                            <span key={r} className="font-semibold text-[13px] leading-snug text-[#4A5168]">
                              • {r}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>

                    {/* Radio indicator officiel avec anneau et ombre interne */}
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#0A1430] bg-[#0A1430] shadow-[inset_0_0_0_4px_#fff]'
                          : 'border-[#D6D2C8] bg-white shadow-[inset_0_0_0_4px_#fff]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
