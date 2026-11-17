import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P5e : ANNONCES ET QUESTIONS AUX FORMATEURS (ESPACE PARTICIPANT)
 * ============================================================================
 * Conforme à 100% au Prototype officiel (scripts/proto_real.html L552753 - 558000) :
 * - Bouton retour `←` rond
 * - Titre "Annonces"
 * - Cartes d'annonces officielles avec liseré or (#E8B33D) sur la gauche
 * - Section "Questions" avec champ d'envoi et bouton flèche `↑`
 * - Liste des questions d'équipes et réponses certifiées des formateurs
 * 100% Tailwind CSS valide.
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

const INITIAL_ANNOUNCES: Announcement[] = [
  {
    id: 'a1',
    who: 'Mme Konan · Responsable Innovation',
    when: 'Aujourd’hui, 11:15',
    t: 'La grille d’évaluation détaillée du prototype sera mise en ligne ce soir dans l’onglet Supports. N’hésitez pas à poser vos questions ici.',
  },
  {
    id: 'a2',
    who: 'Secrétariat du Concours',
    when: 'Hier, 16:40',
    t: 'Rappel : les séances du 24 décembre au 3 janvier se déroulent intégralement à distance via Google Meet en fin de journée.',
  },
];

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: 'q1',
    who: 'Aya Kouassi (Les Bâtisseurs) · il y a 2h',
    q: 'Pouvons-nous utiliser des maquettes interactives Figma pour la démonstration de jeudi prochain ?',
    a: 'Oui, tout à fait. Une maquette cliquable avec scénario utilisateur complet est acceptée et même recommandée.',
    hasAnswer: true,
  },
  {
    id: 'q2',
    who: 'Jean-Marc Bamba · hier',
    q: 'Les replays des ateliers sont-ils comptabilisés dans le calcul de l’assiduité ?',
    a: 'Seule la présence en direct ou un visionnage validé avant 48h permet d’attester de l’assiduité.',
    hasAnswer: true,
  },
];

export default function AnnoncesFormateur() {
  const navigate = useNavigate();
  const [announces] = useState<Announcement[]>(INITIAL_ANNOUNCES);
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [questionInput, setQuestionInput] = useState('');

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    setQuestions((prev) => [
      {
        id: `q-${Date.now()}`,
        who: 'Moi · à l’instant',
        q: questionInput.trim(),
      },
      ...prev,
    ]);
    setQuestionInput('');
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#F6F8FC] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-start items-center animate-fadeIn">
      <div className="max-w-[560px] w-full flex flex-col gap-3 pt-12 md:pt-4">
        
        {/* Bouton retour en rond `←` */}
        <button
          type="button"
          onClick={() => navigate('/espace/formations')}
          className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0A1430] cursor-pointer hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Titre Annonces */}
        <h1 className="m-0 font-black text-[32px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
          Annonces
        </h1>

        {/* Liste des annonces */}
        <div className="flex flex-col gap-3">
          {announces.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-[18px] p-3.5 px-4 flex flex-col gap-1.5 border-l-[5px] border-[#E8B33D] shadow-[0_6px_20px_rgba(10,20,48,0.04)] border-y border-r border-[#EEF1F7]"
            >
              <div className="flex justify-between font-semibold text-[13px] text-[#6A7189]">
                <span className="text-[#0A1430] font-bold">{a.who}</span>
                <span>{a.when}</span>
              </div>
              <span className="font-medium text-[15px] leading-[1.5] text-[#3D4459]">
                {a.t}
              </span>
            </div>
          ))}
        </div>

        {/* Section Questions */}
        <h2 className="m-0 mt-3 font-extrabold text-[24px] text-[#0A1430]">
          Questions
        </h2>

        {/* Champ de saisie question */}
        <form
          onSubmit={handleSendQuestion}
          className="bg-white rounded-[18px] p-3 flex gap-2 items-center shadow-sm border border-[#EEF1F7]"
        >
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Poser une question aux formateurs…"
            className="flex-1 min-h-[48px] px-3.5 rounded-[12px] bg-[#F6F8FC] font-normal text-[15px] text-[#0A1430] placeholder-[#8A8FA3] outline-none"
          />
          <button
            type="submit"
            disabled={!questionInput.trim()}
            className="w-12 h-12 rounded-full bg-[#0A1430] text-white flex items-center justify-center font-bold text-[18px] cursor-pointer disabled:opacity-40 transition-opacity hover:bg-[#1A2649]"
          >
            ↑
          </button>
        </form>

        {/* Liste des questions */}
        <div className="flex flex-col gap-2.5">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-[18px] p-3.5 px-4 flex flex-col gap-2 shadow-sm border border-[#EEF1F7]"
            >
              <span className="font-semibold text-[13px] text-[#6A7189]">
                {q.who}
              </span>
              <span className="font-bold text-[15px] leading-[1.45] text-[#121628]">
                {q.q}
              </span>

              {q.hasAnswer && (
                <div className="p-2.5 px-3 rounded-[12px] bg-[#F2F0EA] font-medium text-[14px] leading-[1.45] text-[#3D4459]">
                  <b className="text-[#0A1430]">Mme Konan :</b> {q.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
