import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, ArrowLeft, ShieldCheck, Mail, Phone, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MembresEquipe() {
  const [members, setMembers] = useState([
    {
      id: '1',
      nom: 'Aya Kouassi',
      role: 'Capitaine & Lead Dev',
      matricule: 'UPB-2026-8841',
      filiere: 'L3 Génie Logiciel',
      email: 'aya.kouassi@etudiant.upb.ci',
      telephone: '(+225) 07 48 92 10 33',
      charte: true,
      isCapitaine: true,
    },
    {
      id: '2',
      nom: 'Jean-Marc Bamba',
      role: 'Hardware & IoT',
      matricule: 'UPB-2026-8102',
      filiere: 'L3 Réseaux & Télécoms',
      email: 'jm.bamba@etudiant.upb.ci',
      telephone: '(+225) 05 12 34 56 78',
      charte: true,
      isCapitaine: false,
    },
    {
      id: '3',
      nom: 'Sarah Ouattara',
      role: 'UI/UX & Métier',
      matricule: 'UPB-2026-7940',
      filiere: 'L2 Informatique',
      email: 'sarah.ouattara@etudiant.upb.ci',
      telephone: '(+225) 07 11 22 33 44',
      charte: true,
      isCapitaine: false,
    },
    {
      id: '4',
      nom: 'David Koffi',
      role: 'Agronomie & Data',
      matricule: 'UPB-2026-8552',
      filiere: 'L3 Électronique',
      email: 'david.koffi@etudiant.upb.ci',
      telephone: '(+225) 01 99 88 77 66',
      charte: true,
      isCapitaine: false,
    },
  ]);

  const [memberToRemove, setMemberToRemove] = useState<any>(null);

  const confirmRemove = () => {
    if (memberToRemove) {
      setMembers(members.filter((m) => m.id !== memberToRemove.id));
      toast.success(`${memberToRemove.nom} a été retiré de l'équipe.`);
      setMemberToRemove(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Retour */}
      <Link
        to="/espace/equipe"
        className="flex items-center gap-2 text-sm font-bold text-[#0E1E4A] hover:text-[#2F6BF0] transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Retour à mon équipe</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
          ANNUAIRE D’ÉQUIPE
        </span>
        <h1 className="text-3xl font-black text-[#0E1E4A]">Les 5 Membres de l'Équipe</h1>
        <p className="text-sm text-slate-500">
          Retrouvez les coordonnées et le statut de chaque membre pour synchroniser vos travaux.
        </p>
      </div>

      {/* Grille des membres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#0E1E4A] text-white font-black text-base flex items-center justify-center shrink-0">
                  {m.nom.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-lg text-[#0E1E4A]">{m.nom}</h3>
                    {m.isCapitaine && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black font-mono">
                        CAPITAINE
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#2F6BF0]">{m.role}</span>
                  <span className="text-xs text-slate-400 font-mono">{m.matricule} • {m.filiere}</span>
                </div>
              </div>

              {!m.isCapitaine && (
                <button
                  onClick={() => setMemberToRemove(m)}
                  className="text-slate-300 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                  title="Retirer ce membre"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <span className="flex items-center gap-2">
                <Mail size={13} className="text-slate-400" />
                {m.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={13} className="text-slate-400" />
                {m.telephone}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 size={12} />
                Charte UPB signée
              </span>
            </div>
          </div>
        ))}

        {/* Slot 5 libre */}
        <div className="bg-slate-50/80 rounded-[24px] p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-3 min-h-[220px]">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 text-slate-400 flex items-center justify-center font-bold">
            5
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A]">Place disponible</h4>
            <p className="text-xs text-slate-400 max-w-xs mt-0.5">
              Invitez un 5ᵉ membre pour compléter votre équipe avant la clôture.
            </p>
          </div>
          <Link
            to="/espace/equipe/invitations"
            className="min-h-[40px] px-5 rounded-full bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <UserPlus size={14} />
            <span>Inviter par matricule</span>
          </Link>
        </div>
      </div>

      {/* Modale de confirmation de retrait (Prototype rmShow) */}
      {memberToRemove && (
        <div className="fixed inset-0 z-50 bg-[#0A1430]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center">
              <h3 className="font-black text-lg text-[#0E1E4A]">Retirer ce membre ?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Êtes-vous sûr de vouloir retirer <strong>{memberToRemove.nom}</strong> de l'équipe ? Il sera averti par e-mail.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setMemberToRemove(null)}
                className="flex-1 min-h-[44px] rounded-xl border border-slate-200 text-slate-600 font-bold text-xs cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 min-h-[44px] rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer"
              >
                Confirmer le retrait
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
