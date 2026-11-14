import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MessageCircle, HelpCircle, User, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

interface Announce {
  id: string;
  who: string;
  when: string;
  text: string;
}

interface Question {
  id: string;
  who: string;
  question: string;
  answer?: string;
  hasAnswer: boolean;
  trainerName?: string;
}

export default function AnnoncesFormateur() {
  const [announces] = useState<Announce[]>([
    {
      id: 'a1',
      who: 'Mme Konan (Formatrice Technologie & Prototypage)',
      when: 'Aujourd’hui, 10:12',
      text: 'Apportez vos croquis jeudi : on construit les premières maquettes en séance au Fablab. Les kits de composants électroniques seront distribués sur place.',
    },
    {
      id: 'a2',
      who: 'M. Ibrahim Diallo (Formateur Pitch & Storytelling)',
      when: 'Lundi, 18:30',
      text: 'Le replay de l’atelier pitch ainsi que la grille d’évaluation du jury sont désormais en ligne dans l’onglet Supports.',
    },
  ]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      who: 'Les Bâtisseurs (Catégorie Innovation)',
      question: 'Peut-on présenter une maquette numérique interactive au lieu d’un prototype matériel physique ?',
      hasAnswer: true,
      trainerName: 'Mme Konan',
      answer: 'Oui, une maquette Figma ou prototype logiciel interactif est parfaitement acceptée et valorisée pour la catégorie Innovation.',
    },
    {
      id: 'q2',
      who: 'Équipe Lagune (Catégorie Technologie)',
      question: 'Le pitch final devant le grand jury se fait-il exclusivement en français ?',
      hasAnswer: false,
    },
  ]);

  const [newQuestionText, setNewQuestionText] = useState<string>('');

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: Question = {
      id: `q-${Date.now()}`,
      who: 'Aya Kouassi (Équipe Lagune)',
      question: newQuestionText.trim(),
      hasAnswer: false,
    };

    setQuestions(prev => [newQ, ...prev]);
    setNewQuestionText('');
    toast.success('Votre question a été soumise aux formateurs !');
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR & TITRE */}
      <div className="flex items-center gap-4">
        <Link
          to="/espace/formations"
          className="w-11 h-11 rounded-full bg-white text-[#0E1E4A] border border-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
          title="Retour aux formations"
        >
          ←
        </Link>
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Communication • P5e
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Annonces & Questions
          </h1>
        </div>
      </div>

      {/* 2. FLUX DES ANNONCES OFFICIELLES (Bordure dorée #E8B33D) */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-[#0E1E4A] flex items-center gap-2">
          <Bell size={18} className="text-[#E8B33D]" />
          <span>Annonces des formateurs</span>
        </h2>

        {announces.map(a => (
          <div
            key={a.id}
            className="bg-white rounded-2xl p-5 border-l-[5px] border-[#E8B33D] border border-slate-100 shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-baseline flex-wrap gap-2 text-xs text-[#6A7189]">
              <span className="font-extrabold text-[#0E1E4A] text-sm">{a.who}</span>
              <span className="font-mono">{a.when}</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-[#3D4459] leading-relaxed">
              {a.text}
            </p>
          </div>
        ))}
      </div>

      {/* 3. SECTION QUESTIONS / RÉPONSES */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#0E1E4A]">Questions aux formateurs</h2>
          <span className="text-xs text-slate-400 font-mono">Délai moyen : &lt; 2h</span>
        </div>

        {/* Formulaire de question */}
        <form
          onSubmit={handleSendQuestion}
          className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex gap-3 items-center"
        >
          <input
            type="text"
            value={newQuestionText}
            onChange={e => setNewQuestionText(e.target.value)}
            placeholder="Poser une question aux formateurs…"
            className="flex-1 px-4 py-3 bg-[#F6F8FC] rounded-xl text-sm text-[#0E1E4A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E1E4A]/10 font-medium"
          />
          <button
            type="submit"
            className="w-12 h-12 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white flex items-center justify-center font-bold text-lg shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Envoyer"
          >
            <Send size={18} />
          </button>
        </form>

        {/* Liste des questions */}
        <div className="space-y-3.5 pt-2">
          {questions.map(q => (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6A7189]">{q.who}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    q.hasAnswer
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {q.hasAnswer ? 'Répondu' : 'En attente'}
                </span>
              </div>

              <p className="font-bold text-sm sm:text-base text-[#121628] leading-snug">
                {q.question}
              </p>

              {q.hasAnswer && (
                <div className="p-3.5 rounded-xl bg-[#F2F0EA] text-sm text-[#3D4459] leading-relaxed border-l-4 border-[#0E1E4A]">
                  <strong className="text-[#0E1E4A] font-extrabold">{q.trainerName} : </strong>
                  {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
