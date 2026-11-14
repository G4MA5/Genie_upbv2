import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface TrainerQuestion {
  id: string;
  team: string;
  when: string;
  question: string;
  status: 'En attente' | 'Répondu';
  sbg: string;
  sfg: string;
  open: boolean;
  replyText?: string;
}

export default function AnnoncesQuestions() {
  const [announcementText, setAnnouncementText] = useState<string>(
    'Apportez vos croquis jeudi : on construit les premières maquettes en séance.'
  );

  const [questions, setQuestions] = useState<TrainerQuestion[]>([
    {
      id: 'q1',
      team: 'Équipe Lagune',
      when: 'il y a 1 h',
      question: 'Le pitch se fait-il en français uniquement ?',
      status: 'En attente',
      sbg: '#FBEFD2',
      sfg: '#8A5A00',
      open: true,
      replyText: 'Le pitch se fait en français ; quelques mots d\'anglais sont acceptés.',
    },
    {
      id: 'q2',
      team: 'Les Bâtisseurs',
      when: 'hier',
      question: 'Peut-on présenter une maquette numérique au lieu d\'un prototype physique ?',
      status: 'Répondu',
      sbg: '#DFF2E7',
      sfg: '#17744B',
      open: false,
      replyText: 'Oui, une maquette interactive est acceptée pour la catégorie Innovation.',
    },
  ]);

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    toast.success('Annonce diffusée à tous les étudiants de la promotion !');
  };

  const handleSendReply = (id: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === id) {
          return {
            ...q,
            status: 'Répondu',
            sbg: '#DFF2E7',
            sfg: '#17744B',
            open: false,
          };
        }
        return q;
      })
    );
    toast.success('Réponse transmise à l\'équipe !');
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. TITRE OFFICIEL */}
      <div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
          Interactions • F3
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0E1E4A] tracking-tight">
          Annonces & Questions
        </h1>
      </div>

      {/* 2. DIFFUSION D'ANNONCE OFFICIELLE (Exact Prototype F3) */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <h2 className="text-base font-extrabold text-[#0E1E4A]">
          Diffuser une annonce aux étudiants
        </h2>

        <form onSubmit={handlePublishAnnouncement} className="flex flex-col gap-3">
          <textarea
            rows={3}
            value={announcementText}
            onChange={e => setAnnouncementText(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[#F6F8FC] border border-slate-200 text-sm sm:text-base font-medium text-[#3D4459] focus:outline-none focus:border-[#0E1E4A] leading-relaxed resize-none"
            placeholder="Écrivez votre consigne ou annonce ici..."
          />

          <button
            type="submit"
            className="self-end min-h-[46px] px-6 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-extrabold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Publier l'annonce</span>
            <Send size={15} />
          </button>
        </form>
      </div>

      {/* 3. QUESTIONS DES ÉQUIPES & RÉPONSES FORMATEUR (Exact Prototype F3) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-[#0E1E4A]">
            Questions des équipes
          </h2>
          <span className="text-xs font-mono font-bold text-slate-500">
            {questions.filter(q => q.status === 'En attente').length} en attente
          </span>
        </div>

        <div className="space-y-4">
          {questions.map(q => (
            <div
              key={q.id}
              className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#0E1E4A]">
                  {q.team} <span className="font-medium text-[#6A7189]">· {q.when}</span>
                </span>
                <span
                  className="px-3 py-1 rounded-full font-bold text-xs"
                  style={{ backgroundColor: q.sbg, color: q.sfg }}
                >
                  {q.status}
                </span>
              </div>

              <p className="font-bold text-base text-[#121628] leading-snug">
                {q.question}
              </p>

              {/* Si ouverte avec réponse en cours d'édition */}
              {q.open ? (
                <div className="flex flex-col gap-2.5 pt-1">
                  <textarea
                    rows={2}
                    value={q.replyText}
                    onChange={e => {
                      const val = e.target.value;
                      setQuestions(prev =>
                        prev.map(item => (item.id === q.id ? { ...item, replyText: val } : item))
                      );
                    }}
                    className="w-full p-3.5 rounded-xl border-2 border-[#0E1E4A] text-sm text-[#3D4459] font-medium leading-relaxed focus:outline-none bg-white"
                  />
                  <button
                    onClick={() => handleSendReply(q.id)}
                    className="self-end min-h-[44px] px-6 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-extrabold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Envoyer la réponse</span>
                    <Send size={14} />
                  </button>
                </div>
              ) : (
                /* Réponse déjà transmise */
                q.replyText && (
                  <div className="p-3.5 rounded-xl bg-[#F2F0EA] text-sm text-[#3D4459] leading-relaxed border-l-4 border-[#0E1E4A] mt-1">
                    <strong className="text-[#0E1E4A] font-extrabold">Votre réponse : </strong>
                    {q.replyText}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
