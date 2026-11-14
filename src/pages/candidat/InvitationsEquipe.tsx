import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, Mail, CheckCircle2, XCircle, Clock, Search, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function InvitationsEquipe() {
  const [matriculeInput, setMatriculeInput] = useState('');
  const [roleInput, setRoleInput] = useState('Développeur Frontend');
  const [sending, setSending] = useState(false);

  // Invitations reçues (pour rejoindre une équipe)
  const [receivedInvites, setReceivedInvites] = useState([
    {
      id: 'inv-rec-1',
      equipe: 'Innovators UPB',
      categorie: 'Innovation',
      capitaine: 'Marc-Aurèle Koné',
      date: 'Hier à 16:30',
    },
    {
      id: 'inv-rec-2',
      equipe: 'Justice & Progrès',
      categorie: 'Droit',
      capitaine: 'Fatou Diop',
      date: 'Il y a 3 jours',
    },
  ]);

  // Invitations envoyées par mon équipe
  const [sentInvites, setSentInvites] = useState([
    {
      id: 'inv-sent-1',
      nom: 'Franck Kouamé',
      matricule: 'UPB-2026-9021',
      filiere: 'L2 Math-Info',
      role: 'Hardware & Capteurs',
      status: 'En attente',
    },
  ]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matriculeInput.trim()) {
      toast.error('Veuillez saisir un matricule étudiant UPB valide.');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      const newInv = {
        id: `inv-${Date.now()}`,
        nom: 'Étudiant UPB Identifié',
        matricule: matriculeInput.toUpperCase(),
        filiere: 'L3 Informatique',
        role: roleInput,
        status: 'En attente',
      };
      setSentInvites([...sentInvites, newInv]);
      setMatriculeInput('');
      toast.success(`Invitation envoyée au matricule ${newInv.matricule} !`);
    }, 600);
  };

  const handleAcceptReceived = (id: string, equipe: string) => {
    setReceivedInvites(receivedInvites.filter((i) => i.id !== id));
    toast.success(`Félicitations ! Vous avez rejoint l’équipe « ${equipe} ».`);
  };

  const handleDeclineReceived = (id: string) => {
    setReceivedInvites(receivedInvites.filter((i) => i.id !== id));
    toast('Invitation déclinée.');
  };

  const handleCancelSent = (id: string) => {
    setSentInvites(sentInvites.filter((i) => i.id !== id));
    toast('Invitation annulée.');
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
          COOPTATION & RECRUTEMENT
        </span>
        <h1 className="text-3xl font-black text-[#0E1E4A]">Invitations d'Équipe</h1>
        <p className="text-sm text-slate-500">
          Invitez des camarades via leur matricule UPB ou répondez aux sollicitations reçues.
        </p>
      </div>

      {/* FORMULAIRE D'ENVOI D'INVITATION (PAR MATRICULE) */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <UserPlus size={20} className="text-[#2F6BF0]" />
          <h2 className="font-black text-xl text-[#0E1E4A]">Inviter un coéquipier par Matricule UPB</h2>
        </div>

        <form onSubmit={handleSendInvite} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Matricule UPB *</label>
            <input
              type="text"
              required
              value={matriculeInput}
              onChange={(e) => setMatriculeInput(e.target.value)}
              placeholder="Ex: UPB-2026-9021"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-mono text-[#0E1E4A] uppercase focus:outline-none focus:border-[#2F6BF0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Rôle proposé dans l'équipe</label>
            <input
              type="text"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="Ex: Développeur, Agronomie, Pitch..."
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={sending}
              className="w-full h-11 rounded-xl bg-[#2F6BF0] hover:bg-[#1D4FD8] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Send size={15} />
              <span>{sending ? 'Envoi...' : 'Envoyer l’invitation'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECTION INVITATIONS REÇUES */}
      {receivedInvites.length > 0 && (
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Mail size={20} className="text-[#F58220]" />
            <h3 className="font-black text-xl text-[#0E1E4A]">
              Invitations reçues ({receivedInvites.length})
            </h3>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {receivedInvites.map((inv) => (
              <div key={inv.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-[#0E1E4A]">{inv.equipe}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2F6BF0]">
                      {inv.categorie}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Invitée par le capitaine {inv.capitaine} • {inv.date}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleAcceptReceived(inv.id, inv.equipe)}
                    className="min-h-[38px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 size={14} />
                    <span>Accepter</span>
                  </button>
                  <button
                    onClick={() => handleDeclineReceived(inv.id)}
                    className="min-h-[38px] px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <XCircle size={14} />
                    <span>Décliner</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION INVITATIONS ENVOYÉES EN ATTENTE */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Clock size={20} className="text-[#E8B33D]" />
          <h3 className="font-black text-xl text-[#0E1E4A]">
            Invitations envoyées par votre équipe ({sentInvites.length})
          </h3>
        </div>

        {sentInvites.length > 0 ? (
          <div className="flex flex-col divide-y divide-slate-100">
            {sentInvites.map((inv) => (
              <div key={inv.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-[#0E1E4A]">{inv.nom}</span>
                    <span className="font-mono text-xs font-bold text-slate-400">({inv.matricule})</span>
                  </div>
                  <span className="text-xs text-slate-500">{inv.role} • {inv.filiere}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                    {inv.status}
                  </span>
                  <button
                    onClick={() => handleCancelSent(inv.id)}
                    className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">Aucune invitation envoyée en cours.</p>
        )}
      </div>
    </div>
  );
}
