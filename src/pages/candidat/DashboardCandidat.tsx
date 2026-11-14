import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PlayCircle, CheckCircle2, Mail, Clock, ArrowRight, ShieldAlert, Sparkles, Video, FileText, ChevronRight } from 'lucide-react';

export default function DashboardCandidat() {
  // Simule l'état avec équipe ou sans équipe
  const [hasTeam, setHasTeam] = useState<boolean>(true);
  const [invCount, setInvCount] = useState<number>(2);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fadeIn">
      {/* 1. BANNIÈRE CANDIDAT BLEUE AVEC GRILLE (Exact Prototype P1) */}
      <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#2F63D0] text-white p-6 sm:p-8 shadow-lg"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.14) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.14) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-[3px] border-[#F2C45A] bg-[#1E4CB0] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
              AK
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#A9C2FF]">Bonjour,</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Aya Kouassi
              </h1>
              <span className="text-xs text-white/80 font-mono pt-0.5">
                Matricule UPB-2026-8841 • L3 Informatique
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Bouton invitations avec badge (✉) */}
            <Link
              to="/espace/equipe/invitations"
              className="relative w-12 h-12 rounded-full bg-white text-[#0A1430] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
              title="Invitations d'équipe reçues"
            >
              <Mail size={20} />
              {invCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1.5 rounded-full bg-[#FFE14A] text-[#0A1430] font-black text-[11px] font-mono border-2 border-white flex items-center justify-center shadow-sm">
                  {invCount}
                </span>
              )}
            </Link>

            {/* Bascule de démo d'état équipe */}
            <button
              onClick={() => setHasTeam(!hasTeam)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
              title="Basculer entre l'état 'Sans équipe' et 'Avec équipe'"
            >
              État : {hasTeam ? 'Avec Équipe' : 'Sans Équipe'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. STATUT DE L'ÉQUIPE (AVEC OU SANS ÉQUIPE) */}
      {hasTeam ? (
        /* ÉTAT : AVEC ÉQUIPE (Équipe Lagune • Technologie) */
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(10,20,48,0.05)] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
                  CATÉGORIE 01 • TECHNOLOGIE
                </span>
                <span className="w-2 h-2 rounded-full bg-[#2F6BF0]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0E1E4A]">
                Équipe Lagune Tech
              </h2>
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-[#EBF3FF] text-[#2F6BF0] font-extrabold text-xs flex items-center gap-1.5">
              <CheckCircle2 size={15} />
              Dossier en cours de constitution
            </span>
          </div>

          {/* Remplissage de l'équipe (5 membres) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-500">Membres confirmés</span>
              <span className="text-xl font-black text-[#0E1E4A]">4 / 5 membres</span>
              <span className="text-xs text-amber-600 font-semibold pt-0.5">1 invitation en attente</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-500">Chartes validées</span>
              <span className="text-xl font-black text-emerald-600">4 / 4 signées</span>
              <span className="text-xs text-slate-400 font-medium pt-0.5">Règlement UPB accepté</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-500">Prochaine étape</span>
              <span className="text-xl font-black text-[#2F6BF0]">Dépôt livrable</span>
              <span className="text-xs text-slate-400 font-medium pt-0.5">Avant le 18 Décembre</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              to="/espace/equipe"
              className="min-h-[46px] px-6 rounded-full bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-extrabold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <Users size={16} />
              <span>Gérer mon équipe & membres</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/espace/equipe/soumettre"
              className="min-h-[46px] px-6 rounded-full bg-[#E8742A] hover:bg-[#d96720] text-white font-extrabold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <span>Soumettre le dossier final</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ) : (
        /* ÉTAT : SANS ÉQUIPE */
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-dashed border-amber-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF6DA] text-[#E8B33D] flex items-center justify-center shrink-0">
              <ShieldAlert size={28} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black text-[#0E1E4A]">Vous n'avez pas encore d'équipe</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                Pour concourir, vous devez soit fonder une équipe et inviter vos camarades, soit accepter une invitation.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/espace/equipe/creer"
              className="w-full sm:w-auto min-h-[46px] px-6 rounded-full bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <span>Créer une équipe</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/espace/equipe/invitations"
              className="w-full sm:w-auto min-h-[46px] px-6 rounded-full border-2 border-[#0E1E4A] text-[#0E1E4A] font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-50"
            >
              <span>Voir mes invitations ({invCount})</span>
            </Link>
          </div>
        </div>
      )}

      {/* 3. WIDGET FORMATIONS & SÉANCE VIRTUELLE DIRECTE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prochaine séance visio */}
        <div className="lg:col-span-2 bg-[#0E1E4A] text-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#F58220] uppercase tracking-wider">
                PROCHAINE FORMATION EN DIRECT
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Atelier IoT 02 : Architecture capteurs & LoRaWAN
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
              Animé par Dr. Konan Kouamé. Émargement automatique par QR Code et prise de notes collaborative.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-4 text-xs font-mono text-[#A9C2FF]">
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#F58220]" />
                Samedi 26 Déc. • 10h00 - 12h30
              </span>
            </div>

            <Link
              to="/espace/formations/visio"
              className="min-h-[44px] px-6 rounded-full bg-[#2F6BF0] hover:bg-[#1D4FD8] text-white font-extrabold text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <Video size={16} />
              <span>Rejoindre la visio live</span>
            </Link>
          </div>
        </div>

        {/* Taux d'assiduité du candidat */}
        <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-[#6A7189] uppercase tracking-wider">
              MON ASSIDUITÉ
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#0E1E4A]">80%</span>
              <span className="text-xs font-bold text-emerald-600">Conforme (min 80%)</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              4 sur 5 séances présentielles et visio validées.
            </p>
          </div>

          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 w-4/5" />
          </div>

          <Link
            to="/espace/formations/presence"
            className="text-xs font-bold text-[#2F6BF0] hover:underline flex items-center justify-between pt-1"
          >
            <span>Voir le relevé de présence</span>
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      {/* 4. RACCOURCIS BENTO VERS LES AUTRES SECTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/espace/formations/supports"
          className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2F6BF0] flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A] group-hover:text-[#2F6BF0] transition-colors">
              Supports de cours
            </h4>
            <span className="text-xs text-slate-400">8 documents téléchargeables</span>
          </div>
        </Link>

        <Link
          to="/espace/equipe/membres"
          className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A] group-hover:text-[#F58220] transition-colors">
              Membres d'équipe
            </h4>
            <span className="text-xs text-slate-400">Gérer les 5 coéquipiers</span>
          </div>
        </Link>

        <Link
          to="/espace/statut"
          className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A] group-hover:text-emerald-600 transition-colors">
              Statut du dossier
            </h4>
            <span className="text-xs text-slate-400">Validation commission</span>
          </div>
        </Link>

        <Link
          to="/espace/profil"
          className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#BE185D] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A] group-hover:text-[#BE185D] transition-colors">
              Mon profil étudiant
            </h4>
            <span className="text-xs text-slate-400">Coordonnées & matricule</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
