import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Clock, User, CheckCircle2, MessageSquare, Volume2, Mic, Users, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SeanceDistance() {
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [attendanceLogged, setAttendanceLogged] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'M. Ibrahim Diallo', text: 'Bienvenue à tous ! Nous commençons dans 5 minutes. Vérifiez vos micros.', time: '13:55' },
    { sender: 'Aya Kouassi', text: 'Bonjour monsieur, micro et caméra prêts !', time: '13:58' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleJoin = () => {
    setIsInRoom(true);
    if (!attendanceLogged) {
      setAttendanceLogged(true);
      toast.success('Présence validée avec succès pour cette séance !', {
        icon: '✅',
        duration: 4000,
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        sender: 'Aya Kouassi (Vous)',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. EN-TÊTE VIOLET CINÉMATIQUE (Style Prototype P5c #5B3BB5) */}
      <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#5B3BB5] text-white p-6 sm:p-8 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link
            to="/espace/formations"
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center font-bold text-lg transition-all"
            title="Retour"
          >
            ←
          </Link>
          <span className="px-3 py-1 rounded-full bg-white/20 font-bold text-xs">
            À distance · en direct
          </span>
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-purple-200 uppercase tracking-wider">
            Séance 2 • Masterclass Visioconférence
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Atelier pitch : convaincre en 7 minutes
          </h1>
        </div>
      </div>

      {/* 2. DÉTAILS DE LA SÉANCE OU SALLE VISIO VIRTUELLE */}
      {!isInRoom ? (
        <div className="flex flex-col gap-6">
          {/* Fiche d'informations */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm divide-y divide-slate-100">
            <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
              <span className="text-[#6A7189] font-medium flex items-center gap-2">
                <Calendar size={18} className="text-slate-400" />
                Date
              </span>
              <span className="font-extrabold text-[#0E1E4A]">Lundi 4 janvier 2027</span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
              <span className="text-[#6A7189] font-medium flex items-center gap-2">
                <Clock size={18} className="text-slate-400" />
                Heure
              </span>
              <span className="font-extrabold text-[#0E1E4A]">14:00 – 16:00 (2h)</span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
              <span className="text-[#6A7189] font-medium flex items-center gap-2">
                <User size={18} className="text-slate-400" />
                Formateur
              </span>
              <span className="font-extrabold text-[#0E1E4A]">M. Ibrahim Diallo</span>
            </div>
          </div>

          {/* Alerte présence automatique */}
          <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[#E9ECF5] text-[#0E1E4A] font-semibold text-sm leading-relaxed border border-blue-100">
            <span className="w-6 h-6 rounded-full bg-[#0E1E4A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              i
            </span>
            <span>
              Votre présence est automatiquement enregistrée et horodatée dès que vous rejoignez la séance en direct.
            </span>
          </div>

          {/* Bouton d'entrée dans la visio */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <span className="font-bold text-sm text-[#5B3BB5] flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#5B3BB5]" />
              Commence dans 12 min
            </span>

            <button
              onClick={handleJoin}
              className="w-full min-h-[58px] rounded-full bg-[#E8742A] hover:bg-[#D6641A] text-[#0A1430] font-black text-lg sm:text-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              <span>Rejoindre la séance</span>
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      ) : (
        /* SALLE VISIO EN DIRECT ACTIVE */
        <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
          {/* Lecteur Vidéo Principal */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="relative aspect-video rounded-[24px] bg-[#0A1430] overflow-hidden shadow-xl flex items-center justify-center text-white border-2 border-purple-500/30">
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                EN DIRECT
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-200">
                <Users size={14} />
                <span>34 participants</span>
              </div>

              {/* Contenu visio simulé */}
              <div className="flex flex-col items-center text-center p-6 space-y-3">
                <div className="w-20 h-20 rounded-full bg-[#5B3BB5] text-white flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/20">
                  ID
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">M. Ibrahim Diallo</h3>
                  <p className="text-xs text-purple-200">Partage d'écran : "Structure d'un pitch mémorable"</p>
                </div>
              </div>

              {/* Barre de contrôles vidéo */}
              <div className="absolute bottom-4 inset-x-4 bg-black/60 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors">
                    <Mic size={18} />
                  </button>
                  <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors">
                    <Video size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={15} />
                    Présence validée
                  </span>
                </div>

                <button
                  onClick={() => setIsInRoom(false)}
                  className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Quitter
                </button>
              </div>
            </div>
          </div>

          {/* Tchat en Direct */}
          <div className="w-full lg:w-80 bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col h-[400px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-sm text-[#0E1E4A] flex items-center gap-2">
                <MessageSquare size={16} className="text-[#5B3BB5]" />
                Tchat de la séance
              </h4>
              <span className="text-[11px] font-mono text-slate-400">En direct</span>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
              {messages.map((m, idx) => (
                <div key={idx} className="flex flex-col text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#0E1E4A]">{m.sender}</span>
                    <span className="text-[10px] text-slate-400">{m.time}</span>
                  </div>
                  <p className="text-slate-600 bg-slate-50 p-2 rounded-xl leading-relaxed">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Poser une question..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 text-xs border border-slate-200 focus:outline-none focus:border-[#5B3BB5]"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[#5B3BB5] text-white font-bold text-xs hover:bg-purple-800 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
