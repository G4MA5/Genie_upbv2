import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategorieDroit() {
  const navigate = useNavigate();
  const [activeDossier, setActiveDossier] = useState<number>(0);
  const [gavelWord, setGavelWord] = useState<string>('Objection !');

  const words = ['Objection !', 'Silence !', 'Adjugé !', 'La séance est ouverte'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGavelWord((prev) => {
        const nextIdx = (words.indexOf(prev) + 1) % words.length;
        return words[nextIdx];
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#F7F1E7] overflow-x-hidden text-[#0A1430] font-sans">
      {/* 1. HERO DROIT (Exact Prototype is.SD) */}
      <section className="relative overflow-hidden bg-[#F7F1E7] px-5 sm:px-10 lg:px-18 pt-28 pb-16">
        {/* Background Grid Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(#C4A987 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <h1 className="m-0 font-black text-5xl sm:text-7xl lg:text-[96px] leading-[0.92] tracking-tight bg-gradient-to-b from-[#3B3F4C] via-[#0A1430] to-[#8A8D98] bg-clip-text text-transparent">
              Qui sera le
              <br />
              génie du droit ?
            </h1>

            <p className="m-0 text-lg sm:text-xl font-bold text-[#3A3F55] leading-relaxed">
              Trois épreuves pour tester vos connaissances, votre éloquence et votre sens de la plaidoirie.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/inscription')}
                className="min-h-[52px] px-8 rounded-xl border-2 border-[#0A1430] bg-gradient-to-b from-[#8A5130] to-[#6B3A1F] text-white font-black text-base flex items-center gap-2 shadow-[0_12px_26px_rgba(107,58,31,0.4)] hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                S'inscrire →
              </button>

              <a
                href="#epreuves"
                className="min-h-[52px] px-6 rounded-xl bg-white/70 border border-white backdrop-blur text-[#0A1430] font-extrabold text-base flex items-center shadow-md hover:-translate-y-0.5 transition-transform"
              >
                Découvrir les épreuves
              </a>
            </div>
          </div>

          {/* Statue de la Justice Image */}
          <div className="relative flex items-center justify-center">
            <img
              src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.png"
              alt="Statue de la Justice"
              className="w-full max-w-[420px] lg:max-w-[500px] h-auto object-contain drop-shadow-[0_24px_30px_rgba(10,20,48,0.3)]"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/75 backdrop-blur-md border border-white rounded-2xl p-4 sm:p-5 flex flex-col gap-1 shadow-xl">
              <span className="font-black text-4xl sm:text-5xl text-[#0A1430]">48</span>
              <span className="text-xs sm:text-sm font-bold text-[#5A5F70] max-w-[14ch]">
                participants maximum, formés pendant 1 mois
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNIÈRE CRIMSON & STATS */}
      <section className="relative overflow-hidden bg-[#E8CFA4] px-5 sm:px-10 lg:px-18 py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          {/* Citation Crimson */}
          <div className="lg:col-span-7 rounded-[30px] bg-[#7A1A1F] p-8 sm:p-12 text-white shadow-2xl relative">
            <span className="block font-serif text-7xl leading-none text-white/40">“</span>
            <p className="m-0 font-normal text-xl sm:text-2xl lg:text-3xl leading-snug">
              La catégorie Droit oppose <b className="font-black">8 équipes de 5 à 6 personnes</b> à travers trois épreuves : le <b className="font-black">Génie en herbe</b>, le <b className="font-black">Débat contradictoire</b> et le <b className="font-black">Procès fictif</b>.
            </p>
            <span className="block w-16 h-1 bg-white rounded-full mt-4" />
          </div>

          {/* 4 Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-6 bg-[#7A1A1F] text-white flex flex-col gap-1 shadow">
              <span className="font-black text-4xl sm:text-5xl">3</span>
              <span className="font-semibold text-sm sm:text-base text-[#F3E2C4]">épreuves</span>
            </div>
            <div className="rounded-2xl p-6 bg-[#F3E2C4] border-2 border-[#7A1A1F] text-[#7A1A1F] flex flex-col gap-1 shadow">
              <span className="font-black text-4xl sm:text-5xl">8</span>
              <span className="font-semibold text-sm sm:text-base">équipes</span>
            </div>
            <div className="rounded-2xl p-6 bg-[#F3E2C4] border-2 border-[#7A1A1F] text-[#7A1A1F] flex flex-col gap-1 shadow">
              <span className="font-black text-4xl sm:text-5xl">5–6</span>
              <span className="font-semibold text-sm sm:text-base">membres/équipe</span>
            </div>
            <div className="rounded-2xl p-6 bg-[#7A1A1F] text-white flex flex-col gap-1 shadow">
              <span className="font-black text-4xl sm:text-5xl">48</span>
              <span className="font-semibold text-sm sm:text-base text-[#F3E2C4]">participants max</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LES TROIS ÉPREUVES (Dossiers Interactifs) */}
      <section id="epreuves" className="relative bg-[#600E14] text-white px-5 sm:px-10 lg:px-18 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono font-bold text-xs tracking-widest text-[#E8CFA4]">
                LE DOSSIER
              </span>
              <h2 className="m-0 font-normal text-4xl sm:text-6xl text-white">
                Les trois <b className="font-black">épreuves.</b>
              </h2>
              <span className="block w-20 h-1.5 bg-white rounded-full mt-2" />
            </div>

            <span className="text-sm sm:text-base font-semibold text-[#F3E2C4]">
              Sélectionnez un dossier ci-dessous
            </span>
          </div>

          {/* Dossiers Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { id: 0, title: 'Épreuve 01', name: 'Génie en herbe' },
              { id: 1, title: 'Épreuve 02', name: 'Débat contradictoire' },
              { id: 2, title: 'Épreuve 03', name: 'Procès fictif' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDossier(d.id)}
                className={`px-6 py-3.5 rounded-t-2xl font-black text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                  activeDossier === d.id
                    ? 'bg-[#2A0B0E] text-[#E8CFA4] border-t-2 border-[#E8CFA4]'
                    : 'bg-[#8E2027]/60 text-white/70 hover:bg-[#8E2027]'
                }`}
              >
                {d.title} · {d.name}
              </button>
            ))}
          </div>

          {/* Dossier Active Content */}
          <div className="bg-[#2A0B0E] rounded-b-3xl rounded-tr-3xl p-6 sm:p-10 border border-[#E8CFA4]/20 shadow-2xl">
            {activeDossier === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-sm text-[#E8CFA4]">ÉPREUVE 01</span>
                  <h3 className="m-0 font-black text-3xl sm:text-4xl text-white">Génie en herbe</h3>
                  <p className="text-base sm:text-lg text-[#E8D5B5] leading-relaxed">
                    Jeu de questions-réponses rapide : le modérateur pose la question, la première équipe qui appuie sur son buzzer répond. Les points s’affichent en direct sur grand écran.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-mono text-xs text-[#E8CFA4]">ÉVALUÉ PAR</span>
                      <p className="font-extrabold text-white mt-1">Le modérateur</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-mono text-xs text-[#E8CFA4]">CE QUI COMPTE</span>
                      <p className="font-extrabold text-white mt-1">Rapidité & Exactitude</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/f3963bb8-de66-4060-9c0e-d13d9d4689d2.png"
                    alt="Génie en herbe"
                    className="w-full h-auto object-cover max-h-[380px]"
                  />
                </div>
              </div>
            )}

            {activeDossier === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-sm text-[#E8CFA4]">ÉPREUVE 02</span>
                  <h3 className="m-0 font-black text-3xl sm:text-4xl text-white">Débat contradictoire</h3>
                  <p className="text-base sm:text-lg text-[#E8D5B5] leading-relaxed">
                    Deux camps défendent des idées opposées sur un sujet d’ordre général. Passage chronométré de 8 minutes : introduction (2 min), développement (3 min), conclusion (3 min).
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-mono text-xs text-[#E8CFA4]">JURY</span>
                      <p className="font-extrabold text-white mt-1">3 personnes</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-mono text-xs text-[#E8CFA4]">CRITÈRES</span>
                      <p className="font-extrabold text-white mt-1">Tenue, gestuelle & pertinence</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/4634aa41-81b7-4f80-9e39-6553a6c62d26.png"
                    alt="Débat contradictoire"
                    className="w-full h-auto object-cover max-h-[380px]"
                  />
                </div>
              </div>
            )}

            {activeDossier === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-sm text-[#E8CFA4]">ÉPREUVE 03</span>
                  <h3 className="m-0 font-black text-3xl sm:text-4xl text-white">Procès fictif</h3>
                  <p className="text-base sm:text-lg text-[#E8D5B5] leading-relaxed">
                    Faux procès sur une affaire imaginaire complète. Les étudiants endossent les rôles d'un tribunal : juge, avocats, accusation, défense et témoins, toge officielle comprise.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-mono text-xs text-[#E8CFA4]">JURY</span>
                      <p className="font-extrabold text-white mt-1">3 magistrats & juristes</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-mono text-xs text-[#E8CFA4]">TENUE</span>
                      <p className="font-extrabold text-white mt-1">Toge officielle</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/300dfb21-0316-461e-b373-392c806a4440.png"
                    alt="Procès fictif"
                    className="w-full h-auto object-cover max-h-[380px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. SD DÉROULEMENT TOURNOI (L'arène des idées & Animated Gavel) */}
      <section className="relative overflow-hidden bg-[#24160C] text-white px-5 sm:px-10 lg:px-18 py-20 lg:py-28">
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center gap-10 z-10">
          <span className="font-serif font-bold text-sm tracking-[0.3em] uppercase text-[#FFC266]">
            L’arène des idées
          </span>
          <h2 className="m-0 font-serif font-bold text-4xl sm:text-6xl lg:text-7xl uppercase text-[#E8CFA4] tracking-wide">
            Éliminatoires 2027
          </h2>
          <p className="m-0 max-w-2xl font-bold text-base sm:text-lg text-[#E8D5B5]">
            8 équipes entrent dans l’arène. Quarts, demi-finales, finale : à chaque duel, une seule équipe avance vers la statue.
          </p>

          {/* Marteau du Juge Animé */}
          <div className="my-6 p-6 rounded-2xl bg-[#3B2314] border border-[#FFC266]/30 flex flex-col items-center gap-3">
            <span className="text-3xl">⚖️</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={gavelWord}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="font-serif font-black text-2xl sm:text-3xl text-[#FFC266] uppercase tracking-wider"
              >
                {gavelWord}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs font-mono text-[#E8D5B5]/60">Marteau du jury en délibération</span>
          </div>

          {/* 8 Teams Tournament Tree Presentation */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((team) => (
              <div
                key={team}
                className="rounded-xl p-4 bg-gradient-to-b from-[#F3E2C4] to-[#E2C793] text-[#7A1A1F] flex flex-col items-center gap-1 shadow-lg"
              >
                <span className="font-serif font-bold text-xs tracking-wider">ÉQUIPE</span>
                <span className="font-serif font-black text-3xl">{team}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
