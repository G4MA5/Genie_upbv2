import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, CheckCircle2, Clock, ShieldCheck, FileCheck, ArrowRight, AlertCircle, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MonEquipe() {
  const [hasTeam, setHasTeam] = useState<boolean>(true);

  // Membres de l'équipe
  const [members, setMembers] = useState([
    {
      id: '1',
      nom: 'Aya Kouassi',
      role: 'Capitaine & Développeuse Cloud',
      matricule: 'UPB-2026-8841',
      filiere: 'L3 Génie Logiciel',
      charte: true,
      isCapitaine: true,
    },
    {
      id: '2',
      nom: 'Jean-Marc Bamba',
      role: 'Spécialiste Hardware IoT',
      matricule: 'UPB-2026-8102',
      filiere: 'L3 Réseaux & Télécoms',
      charte: true,
      isCapitaine: false,
    },
    {
      id: '3',
      nom: 'Sarah Ouattara',
      role: 'UI/UX & Modélisation Métier',
      matricule: 'UPB-2026-7940',
      filiere: 'L2 Informatique',
      charte: true,
      isCapitaine: false,
    },
    {
      id: '4',
      nom: 'David Koffi',
      role: 'Agronomie & Données Capteurs',
      matricule: 'UPB-2026-8552',
      filiere: 'L3 Électronique',
      charte: true,
      isCapitaine: false,
    },
  ]);

  const handleRemoveMember = (nom: string) => {
    toast(`Retrait de ${nom} simulé`);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Header & Sélecteur de Démo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
            GESTION DU GROUPE
          </span>
          <h1 className="text-3xl font-black text-[#0E1E4A]">Mon Équipe de Tournoi</h1>
        </div>

        <button
          onClick={() => setHasTeam(!hasTeam)}
          className="px-3.5 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-[#0E1E4A] font-mono text-xs font-bold transition-colors cursor-pointer"
        >
          Basculer : {hasTeam ? 'Afficher Sans Équipe (P3)' : 'Afficher Avec Équipe (P3t)'}
        </button>
      </div>

      {hasTeam ? (
        /* ÉTAT P3t : AVEC ÉQUIPE */
        <div className="flex flex-col gap-6">
          {/* Bannière de l'équipe */}
          <div className="bg-[#0E1E4A] text-white rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#F58220] uppercase tracking-wider">
                  DISCIPLINE 01 • TECHNOLOGIE
                </span>
                <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Équipe Lagune Tech
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                Projet : « Système connecté d'irrigation intelligente et détection des ravageurs par IA ».
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-400/30 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                Quorum d'équipe atteint (4/5)
              </span>
              <span className="text-xs text-slate-400 font-mono">Code Équipe : #LAG-2026-TECH</span>
            </div>
          </div>

          {/* Liste des 5 membres de l'équipe (P3c) */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-[#2F6BF0]" />
                <h3 className="font-black text-xl text-[#0E1E4A]">Composition de l’équipe (4 sur 5)</h3>
              </div>

              <Link
                to="/espace/equipe/invitations"
                className="min-h-[40px] px-4 rounded-full bg-[#2F6BF0] hover:bg-[#1D4FD8] text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <UserPlus size={15} />
                <span>Inviter le 5ᵉ membre</span>
              </Link>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              {members.map((m) => (
                <div key={m.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#0E1E4A] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {m.nom.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base text-[#0E1E4A]">{m.nom}</span>
                        {m.isCapitaine && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black font-mono">
                            CAPITAINE
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{m.role} • {m.filiere}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <span className="text-xs font-mono font-bold text-slate-400">{m.matricule}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <FileCheck size={13} />
                      Charte signée
                    </span>
                    {!m.isCapitaine && (
                      <button
                        onClick={() => handleRemoveMember(m.nom)}
                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Retirer le membre"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Slot 5 : Invitation en attente */}
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-amber-50/50 -mx-6 px-6 rounded-xl border border-dashed border-amber-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-amber-300 text-amber-500 font-extrabold text-sm flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-slate-700">Invitation en attente de réponse</span>
                    <span className="text-xs text-slate-400 font-mono">Matricule UPB-2026-9021 • Envoyée il y a 2 jours</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    <Clock size={13} />
                    En attente
                  </span>
                  <Link
                    to="/espace/equipe/invitations"
                    className="text-xs font-bold text-[#2F6BF0] hover:underline ml-2"
                  >
                    Gérer
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Raccourcis d'actions officielles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/espace/equipe/charte"
              className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2F6BF0] flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors">
                    Règlement & Chartes signées
                  </h4>
                  <span className="text-xs text-slate-400">Consulter les signatures de l'équipe</span>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/espace/equipe/soumettre"
              className="p-5 rounded-2xl bg-[#E8742A] hover:bg-[#d96720] text-white shadow-md transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-black text-base text-white">
                  Soumission finale du dossier
                </h4>
                <span className="text-xs text-white/80">Livrable note d'intention & prototype</span>
              </div>
              <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ) : (
        /* ÉTAT P3 : SANS ÉQUIPE */
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-100 shadow-sm text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-[#E8742A] flex items-center justify-center">
              <Users size={32} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0E1E4A]">
              Vous ne faites partie d'aucune équipe
            </h2>

            <p className="text-slate-500 text-sm sm:text-base max-w-lg leading-relaxed">
              Pour participer à GÉNIE UPB, vous devez obligatoirement concourir en équipe de 4 à 6 membres. Choisissez l'une des options ci-dessous :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl pt-4">
              <Link
                to="/espace/equipe/creer"
                className="p-6 rounded-2xl bg-[#0E1E4A] text-white flex flex-col items-center gap-2 hover:bg-[#1B2D63] transition-all shadow-md group"
              >
                <PlusCircle size={28} className="text-[#F58220] group-hover:scale-110 transition-transform" />
                <span className="font-black text-lg">Créer une équipe</span>
                <span className="text-xs text-slate-300 text-center">Vous devenez le capitaine et invitez vos coéquipiers</span>
              </Link>

              <Link
                to="/espace/equipe/invitations"
                className="p-6 rounded-2xl bg-white border-2 border-[#0E1E4A] text-[#0E1E4A] flex flex-col items-center gap-2 hover:bg-slate-50 transition-all group"
              >
                <UserPlus size={28} className="text-[#2F6BF0] group-hover:scale-110 transition-transform" />
                <span className="font-black text-lg">Rejoindre une équipe</span>
                <span className="text-xs text-slate-500 text-center">Consulter les invitations reçues de vos camarades</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
