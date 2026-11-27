import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, ArrowLeft, ArrowUp, HelpCircle } from 'lucide-react';

/**
 * ============================================================================
 * P5e : ANNONCES ET QUESTIONS AUX FORMATEURS (ESPACE PARTICIPANT)
 * ============================================================================
 * Communications réelles :
 * - Liste des annonces officielles (état d'attente propre tant qu'aucune annonce n'est publiée)
 * - Section Questions & Réponses avec champ d'envoi opérationnel
 */

interface Announcement {
  id: string;
  who: string;
  when: string;
  t: string;
}

interface QuestionItem {
  id: string;
  who: string;
  q: string;
  a?: string;
  hasAnswer?: boolean;
}

// Annonces officielles réelles (vide initialement avant les premières communications officielles)
const INITIAL_ANNOUNCES: Announcement[] = [];

// Questions des candidats (vide initialement)
const INITIAL_QUESTIONS: QuestionItem[] = [];

export default function AnnoncesFormateur() {
  const navigate = useNavigate();
  const [announces] = useState<Announcement[]>(INITIAL_ANNOUNCES);
  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem('genie_questions_candidat');
      return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
    } catch {
      return INITIAL_QUESTIONS;
    }
  });
  const [questionInput, setQuestionInput] = useState('');

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    const newQ: QuestionItem = {
      id: `q-${Date.now()}`,
      who: 'Moi · à l’instant',
      q: questionInput.trim(),
    };

    setQuestions((prev) => {
      const updated = [newQ, ...prev];
      try {
        localStorage.setItem('genie_questions_candidat', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    setQuestionInput('');
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Annonces
          </h1>
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran : Annonces à gauche, Questions à droite */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne 1 : Liste des annonces officielles */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
              COMMUNICATIONS OFFICIELLES ({announces.length})
            </span>

            {announces.length > 0 ? (
              announces.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-[22px] p-5 flex flex-col gap-2 border-l-[6px] border-[#E8B33D] shadow-[0_6px_20px_rgba(10,20,48,0.04)] border-y border-r border-[#EEF1F7]"
                >
                  <div className="flex justify-between font-semibold text-[13px] text-[#6A7189]">
                    <span className="text-[#0A1430] font-black">{a.who}</span>
                    <span>{a.when}</span>
                  </div>
                  <span className="font-medium text-[15px] leading-[1.55] text-[#3D4459]">
                    {a.t}
                  </span>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[24px] p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-3 border border-[#EEF1F7] shadow-[0_6px_20px_rgba(10,20,48,0.04)]">
                <div className="w-12 h-12 rounded-full bg-[#F3F6FD] text-[#2F6BF0] flex items-center justify-center">
                  <Megaphone size={24} strokeWidth={2.2} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-extrabold text-[17px] text-[#0A1430]">
                    Aucune annonce officielle pour le moment
                  </span>
                  <span className="font-medium text-[14px] text-[#6A7189] max-w-[360px] leading-relaxed">
                    Les informations relatives aux plannings, aux liens de visioconférence et aux consignes des formateurs apparaîtront ici.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Colonne 2 : Section Questions & Réponses */}
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
              QUESTIONS & RÉPONSES
            </span>

            {/* Champ de saisie question */}
            <form
              onSubmit={handleSendQuestion}
              className="bg-white rounded-[22px] p-3 flex gap-2 items-center shadow-sm border border-[#EEF1F7]"
            >
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Poser une question aux formateurs…"
                className="flex-1 min-h-[50px] px-4 rounded-[14px] bg-[#F6F8FC] font-medium text-[15px] text-[#0A1430] placeholder-[#8A8FA3] outline-none"
              />
              <button
                type="submit"
                disabled={!questionInput.trim()}
                className="w-12 h-12 rounded-full bg-[#0A1430] text-white flex items-center justify-center cursor-pointer disabled:opacity-40 transition-opacity hover:bg-[#1A2649] active:scale-95"
              >
                <ArrowUp size={20} strokeWidth={2.4} />
              </button>
            </form>

            {/* Liste des questions */}
            <div className="flex flex-col gap-3">
              {questions.length > 0 ? (
                questions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-[20px] p-4 px-5 flex flex-col gap-2.5 shadow-sm border border-[#EEF1F7]"
                  >
                    <span className="font-semibold text-[13px] text-[#6A7189]">
                      {q.who}
                    </span>
                    <span className="font-bold text-[15px] leading-[1.45] text-[#121628]">
                      {q.q}
                    </span>

                    {q.hasAnswer && (
                      <div className="p-3 px-3.5 rounded-[14px] bg-[#F2F0EA] font-medium text-[14px] leading-[1.5] text-[#3D4459]">
                        <b className="text-[#0A1430]">Réponse de l'équipe :</b> {q.a}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-2 border border-dashed border-[#D2D8E8] rounded-[22px] bg-white/50">
                  <div className="w-10 h-10 rounded-full bg-[#F3F6FD] text-[#2F6BF0] flex items-center justify-center mb-0.5">
                    <HelpCircle size={22} strokeWidth={2.2} />
                  </div>
                  <span className="font-bold text-[15px] text-[#0A1430]">
                    Une question sur les ateliers ou votre projet ?
                  </span>
                  <span className="font-medium text-[13px] text-[#6A7189] max-w-[320px]">
                    Posez votre question dans le champ ci-dessus. L'équipe d'encadrement vous répondra directement.
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
