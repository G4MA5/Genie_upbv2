import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface TrainerQuestion {
  id: string;
  team: string;
  when: string;
  q: string;
  open: boolean;
  done: boolean;
  reply?: string;
}

/**
 * ============================================================================
 * ANNONCES & QUESTIONS FORMATEUR (ÉCRAN F3 DU PROTOTYPE)
 * ============================================================================
 * 100% fidèle au prototype scripts/proto_real.html L617659-617800 & L687751 :
 * - Titre principal "Annonces" (36px font 800 Nunito #0E1E4A)
 * - Zone de publication de l'annonce avec texte d'exemple et bouton "Publier l'annonce"
 * - Titre de section "Questions des équipes" (24px font 800 Nunito #0E1E4A)
 * - Liste des questions d'équipes avec badges "En attente" (#FBEFD2 / #8A5A00) ou "Répondu" (#DFF2E7 / #17744B)
 * - Champ de réponse avec bordure 2px #0E1E4A et bouton "Envoyer la réponse"
 * - Barre capsule de navigation en bas avec pastille active sur "Annonces"
 * ============================================================================
 */
export default function AnnoncesQuestions() {
  const [announcementText, setAnnouncementText] = useState<string>(
    'Apportez vos croquis jeudi : on construit les premières maquettes en séance.'
  );

  const [questions, setQuestions] = useState<TrainerQuestion[]>([
    {
      id: 'q1',
      team: 'Équipe Lagune',
      when: 'il y a 1 h',
      q: 'Le pitch se fait-il en français uniquement ?',
      open: true,
      done: false,
      reply: 'Le pitch se fait en français ; quelques mots d\'anglais sont acceptés.',
    },
    {
      id: 'q2',
      team: 'Les Bâtisseurs',
      when: 'hier',
      q: 'Peut-on présenter une maquette numérique ?',
      open: false,
      done: true,
      reply: 'Oui, une maquette interactive est acceptée pour la catégorie Innovation.',
    },
  ]);

  const [replies, setReplies] = useState<Record<string, string>>({
    q1: 'Le pitch se fait en français ; quelques mots d\'anglais sont acceptés',
  });

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    toast.success('Annonce publiée. Les équipes sont notifiées.');
  };

  const handleSendReply = (id: string) => {
    const text = replies[id] || '';
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            open: false,
            done: true,
            reply: text || 'Réponse envoyée par la formatrice.',
          };
        }
        return q;
      })
    );
    toast.success('Réponse envoyée à l\'équipe.');
  };

  return (
    <div
      data-screen-label="F3 Annonces et questions"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#F6F8FC',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="p-4 sm:p-6 md:py-8 md:px-8"
    >
      <div className="w-full max-w-[560px] md:max-w-[880px] lg:max-w-[1020px] mx-auto flex flex-col gap-3.5 md:gap-5">
        {/* ==================================================================
            1. TITRE OFFICIEL F3 : "Annonces"
            ================================================================== */}
        <h1
          style={{
            margin: 0,
            font: "800 36px/1 'Nunito', sans-serif",
            color: '#0E1E4A',
            letterSpacing: '-.02em',
          }}
        >
          Annonces
        </h1>

        {/* ==================================================================
            2. CARTE PUBLIER L'ANNONCE (Exact Prototype F3)
            ================================================================== */}
        <form
          onSubmit={handlePublishAnnouncement}
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(14,30,74,.04)',
          }}
          className="md:p-6"
        >
          <textarea
            rows={3}
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            style={{
              minHeight: '90px',
              padding: '12px',
              borderRadius: '12px',
              background: '#F6F8FC',
              font: "400 15px/1.5 'Nunito', sans-serif",
              color: '#3D4459',
              border: 'none',
              resize: 'none',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
            placeholder="Écrivez votre consigne ou annonce ici..."
          />

          <button
            type="submit"
            style={{
              alignSelf: 'flex-end',
              minHeight: '46px',
              padding: '0 20px',
              borderRadius: '999px',
              background: '#0E1E4A',
              color: '#fff',
              font: "700 15px 'Nunito', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(14,30,74,.18)',
              transition: 'opacity .15s',
            }}
            className="hover:opacity-90 active:scale-[0.99]"
          >
            Publier l'annonce
          </button>
        </form>

        {/* ==================================================================
            3. TITRE DE SECTION : "Questions des équipes"
            ================================================================== */}
        <h2
          style={{
            margin: '6px 0 0 0',
            font: "800 24px 'Nunito', sans-serif",
            color: '#0E1E4A',
            letterSpacing: '-.01em',
          }}
        >
          Questions des équipes
        </h2>

        {/* ==================================================================
            4. LISTE DES QUESTIONS (fQuestions)
            ================================================================== */}
        <div className="flex flex-col gap-3 md:gap-4">
          {questions.map((q) => {
            const isAnswered = q.done;
            const badgeBg = isAnswered ? '#DFF2E7' : '#FBEFD2';
            const badgeFg = isAnswered ? '#17744B' : '#8A5A00';
            const statusLabel = isAnswered ? 'Répondu' : 'En attente';

            return (
              <div
                key={q.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 4px 16px rgba(14,30,74,.04)',
                }}
                className="md:p-6"
              >
                {/* Ligne haute : Équipe · Moment & Badge statut */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      font: "700 14px 'Nunito', sans-serif",
                      color: '#0E1E4A',
                    }}
                  >
                    {q.team}{' '}
                    <span
                      style={{
                        fontWeight: 500,
                        color: '#6A7189',
                      }}
                    >
                      · {q.when}
                    </span>
                  </span>

                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '999px',
                      background: badgeBg,
                      color: badgeFg,
                      font: "700 12px 'Nunito', sans-serif",
                    }}
                  >
                    {statusLabel}
                  </span>
                </div>

                {/* Question posée */}
                <span
                  style={{
                    font: "600 15px/1.45 'Nunito', sans-serif",
                    color: '#121628',
                  }}
                  className="md:text-[16px]"
                >
                  {q.q}
                </span>

                {/* Champ de réponse actif (open = true) exact du prototype */}
                {q.open && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
                    <textarea
                      rows={2}
                      value={replies[q.id] || ''}
                      onChange={(e) =>
                        setReplies({ ...replies, [q.id]: e.target.value })
                      }
                      style={{
                        minHeight: '70px',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '2px solid #0E1E4A',
                        font: "400 15px/1.5 'Nunito', sans-serif",
                        color: '#3D4459',
                        outline: 'none',
                        resize: 'none',
                        background: '#fff',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => handleSendReply(q.id)}
                      style={{
                        alignSelf: 'flex-end',
                        minHeight: '44px',
                        padding: '0 18px',
                        borderRadius: '999px',
                        background: '#0E1E4A',
                        color: '#fff',
                        font: "700 14px 'Nunito', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'opacity .15s',
                      }}
                      className="hover:opacity-90 active:scale-[0.99]"
                    >
                      Envoyer la réponse
                    </button>
                  </div>
                )}

                {/* Réponse enregistrée (si répondu) */}
                {!q.open && q.reply && (
                  <div
                    style={{
                      background: '#F6F8FC',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      font: "400 14px/1.5 'Nunito', sans-serif",
                      color: '#4A5168',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#17744B', fontSize: '13px' }}>
                      ✓ Réponse envoyée
                    </span>
                    <span>{q.reply}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Espaceur bas pour la barre de navigation capsule */}
        <div aria-hidden="true" style={{ flex: 'none', height: '100px' }} />
      </div>
    </div>
  );
}
