import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const TournamentTimeline: React.FC = () => {
  // Calcul de la position dynamique du coureur selon la date actuelle
  const { runnerX, runnerLabel } = useMemo(() => {
    const now = Date.now();
    const D = [
      '2026-11-01',
      '2026-11-23',
      '2026-12-21',
      '2027-01-27',
      '2027-01-30',
    ].map((d) => new Date(d + 'T00:00:00').getTime());

    const XA = [4, 24, 46, 68, 86];
    let rx = XA[0];

    if (now >= D[4]) {
      rx = 93;
    } else {
      for (let i = 0; i < 4; i++) {
        if (now >= D[i] && now < D[i + 1]) {
          rx = XA[i] + ((XA[i + 1] - XA[i]) * (now - D[i])) / (D[i + 1] - D[i]);
          break;
        }
      }
    }

    const nextMilestones = [
      ['Inscriptions', D[1]],
      ['Formations', D[2]],
      ['Concours', D[3]],
      ['Clôture', D[4]],
    ] as const;

    const nextEvent = nextMilestones.find((x) => x[1] > now);
    const label = nextEvent
      ? `J-${Math.ceil((nextEvent[1] - now) / 86400000)} · ${nextEvent[0]}`
      : 'Bravo, arrivé !';

    return {
      runnerX: `${rx.toFixed(2)}%`,
      runnerLabel: label,
    };
  }, []);

  return (
    <section className="relative bg-[#F8F6F1] pt-12 sm:pt-20 select-none overflow-hidden">
      {/* 1. EN-TÊTE DE LA SECTION : Titre & Bouton "Calendrier complet" */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5">
        <div>
          <span className="font-mono font-bold text-xs tracking-wider text-[#E8742A] uppercase block mb-2">
            Calendrier & Étapes
          </span>
          <h2 className="font-extrabold text-3xl sm:text-5xl text-[#0E1E4A] tracking-tight">
            De l'inscription à la finale.
          </h2>
        </div>

        <Link
          to="/calendrier"
          className="self-start sm:self-auto min-h-[46px] px-6 rounded-full border-3 border-white text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_10px_22px_rgba(5,15,50,0.3)] -rotate-2 hover:rotate-0 hover:scale-105 transition-all bg-gradient-to-br from-[#FFA24A] via-[#F58220] to-[#E0640F]"
        >
          Calendrier complet <span>→</span>
        </Link>
      </div>

      {/* 2. LE CIRCUIT ROUTIER INTERACTIF (DATA-ROUTE) */}
      <div
        data-route="1"
        className="relative w-full h-[320px] sm:h-[460px] lg:h-[520px] overflow-hidden"
      >
        {/* --- POTEAU DE DÉPART --- */}
        <div className="absolute left-3 sm:left-12 top-[160px] sm:top-[260px] lg:top-[230px] w-1.5 sm:w-2 h-[60px] sm:h-[100px] lg:h-[110px] bg-[#0A1430] z-[3]">
          <span className="absolute left-0 bottom-[calc(100%+6px)] whitespace-nowrap font-mono font-bold text-[10px] sm:text-xs lg:text-sm text-[#0A1430] tracking-wider">
            DÉPART
          </span>
        </div>

        {/* --- POTEAU D'ARRIVÉE AVEC DRAPEAU À DAMIER --- */}
        <div className="absolute right-3 sm:right-10 top-[90px] sm:top-[120px] lg:top-[80px] w-1.5 sm:w-2 h-[130px] sm:h-[220px] lg:h-[260px] bg-[#0A1430] z-[4]">
          {/* Drapeau à damier noir et blanc */}
          <div
            className="absolute right-full top-0 w-[36px] sm:w-[50px] lg:w-[60px] h-[24px] sm:h-[34px] lg:h-[40px]"
            style={{
              background:
                'repeating-conic-gradient(#0A1430 0 25%, #ffffff 0 50%) 0 0 / 16px 16px',
            }}
          />
        </div>

        {/* --- LES 4 PANNEAUX EN BOIS (JALONS DU TOURNOI) --- */}
        {/* Jalon 1 : Inscriptions (24%) */}
        <div
          data-sign="1"
          className="absolute left-[24%] top-[220px] sm:top-[320px] lg:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-2 sm:p-3.5 lg:p-4 bg-[#0E1E4A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[90px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform">
            <span className="font-mono font-bold text-[9px] sm:text-xs lg:text-sm text-[#A9C2FF] tracking-wider">
              23 NOV.
            </span>
            <span className="font-extrabold text-xs sm:text-xl lg:text-2xl text-white font-['Sen']">
              Inscriptions
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-[#C9D1E8]">
              jusqu'au 18 déc.
            </span>
          </div>
          {/* Pieu en bois */}
          <div className="w-[6px] sm:w-[10px] h-[36px] sm:h-[70px] lg:h-[90px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* Jalon 2 : Formations (46%) */}
        <div
          data-sign="2"
          className="absolute left-[46%] top-[220px] sm:top-[320px] lg:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-2 sm:p-3.5 lg:p-4 bg-[#0E1E4A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[90px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform">
            <span className="font-mono font-bold text-[9px] sm:text-xs lg:text-sm text-[#A9C2FF] tracking-wider">
              21 DÉC.
            </span>
            <span className="font-extrabold text-xs sm:text-xl lg:text-2xl text-white font-['Sen']">
              Formations
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-[#C9D1E8]">
              allégé 24 déc. → 3 janv.
            </span>
          </div>
          {/* Pieu en bois court */}
          <div className="w-[6px] sm:w-[10px] h-[18px] sm:h-[30px] lg:h-[40px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* Jalon 3 : Concours - MIS EN VALEUR EN ORANGE (68%) */}
        <div
          data-sign="3"
          className="absolute left-[68%] top-[220px] sm:top-[320px] lg:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-2 sm:p-3.5 lg:p-4 bg-[#E8742A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[90px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform">
            <span className="font-mono font-bold text-[9px] sm:text-xs lg:text-sm text-[#FFE8D6] tracking-wider">
              27 JANV.
            </span>
            <span className="font-extrabold text-xs sm:text-xl lg:text-2xl text-white font-['Sen']">
              Concours
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-white/90">
              3 jours d'épreuves
            </span>
          </div>
          {/* Pieu en bois */}
          <div className="w-[6px] sm:w-[10px] h-[36px] sm:h-[70px] lg:h-[90px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* Jalon 4 : Clôture (86%) */}
        <div
          data-sign="4"
          className="absolute left-[86%] top-[220px] sm:top-[320px] lg:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-2 sm:p-3.5 lg:p-4 bg-[#0E1E4A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[90px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform">
            <span className="font-mono font-bold text-[9px] sm:text-xs lg:text-sm text-[#A9C2FF] tracking-wider">
              30 JANV.
            </span>
            <span className="font-extrabold text-xs sm:text-xl lg:text-2xl text-white font-['Sen']">
              Clôture
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-[#C9D1E8]">
              Cérémonie & prix
            </span>
          </div>
          {/* Pieu en bois court */}
          <div className="w-[6px] sm:w-[10px] h-[18px] sm:h-[30px] lg:h-[40px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* --- LE COUREUR ARTICULÉ GÉNIE UPB (DATA-RUNNER) --- */}
        <div
          data-runner="1"
          className="absolute top-[220px] sm:top-[320px] lg:top-[340px] -translate-x-1/2 -translate-y-full z-[5] transition-[left] duration-1000 ease-out"
          style={{ left: runnerX }}
        >
          {/* Ligne pointillée montant jusqu'au badge */}
          <div
            className="absolute left-1/2 bottom-[calc(100%+6px)] w-0.5 h-[60px] sm:h-[100px] lg:h-[144px] -ml-[1px]"
            style={{
              background:
                'repeating-linear-gradient(#0A1430 0 6px, transparent 6px 12px)',
            }}
          />

          {/* Badge flottant avec label dynamique (ex: "J-74 · Concours") */}
          <div className="absolute left-1/2 bottom-[calc(100%+66px)] sm:bottom-[calc(100%+106px)] lg:bottom-[calc(100%+150px)] -translate-x-1/2 whitespace-nowrap px-2 sm:px-3 py-1 bg-white text-[#1D4FD8] font-mono font-bold text-[10px] sm:text-xs lg:text-sm rounded-full shadow-[0_14px_34px_rgba(10,20,48,0.18)] border border-[#0A1430]/12">
            {runnerLabel}
          </div>

          {/* Ombre au sol sous le coureur */}
          <div className="absolute left-1/2 -bottom-1.5 w-[36px] sm:w-[52px] h-[5px] sm:h-[7.5px] -ml-[18px] sm:-ml-[26px] rounded-full bg-black/35" />

          {/* Personnage coureur articulé (bobbing & membres animés) */}
          <div className="relative w-[60px] sm:w-[80px] h-[90px] sm:h-[120px] origin-bottom scale-[0.6] sm:scale-[0.75] lg:scale-100">
            <div className="absolute inset-0 rotate-[7deg] origin-[40px_100px] animate-[runnerBob_0.31s_infinite_ease-in-out]">
              {/* Bras arrière (ab & abf) */}
              <div className="absolute left-[37px] top-[43px] w-[9px] h-[20px] rounded-[5px] bg-[#1A3D9E] origin-[4.5px_4px] z-[1] animate-[runnerAb_0.62s_infinite_ease-in-out]">
                <div className="absolute left-0 top-[9px] w-[9px] h-[11px] rounded-b-[5px] bg-[#4E2A15]" />
                <div className="absolute left-[0.5px] top-[16px] w-[8px] h-[18px] rounded-[4px] bg-[#4E2A15] origin-[4px_3px] animate-[runnerAbf_0.62s_infinite_ease-in-out]">
                  <span className="absolute -left-[0.5px] top-[14px] w-[9px] h-[9px] rounded-full bg-[#4E2A15]" />
                </div>
              </div>

              {/* Jambe arrière (lb & lbs) */}
              <div
                className="absolute left-[36px] top-[70px] w-[11px] h-[26px] rounded-[6px] origin-[5.5px_4px] z-[1] animate-[runnerLb_0.62s_infinite_ease-in-out]"
                style={{
                  background: 'linear-gradient(#0E1E4A 0 52%, #4E2A15 52%)',
                }}
              >
                <div className="absolute left-[1px] top-[21px] w-[9px] h-[25px] rounded-[5px] bg-[#4E2A15] origin-[4.5px_3px] animate-[runnerLbs_0.62s_infinite_ease-in-out]">
                  {/* Chaussure */}
                  <div className="absolute -left-[1px] top-[21px] w-[17px] h-[8px] rounded-[4px_7px_3px_3px] bg-[#D9DDE4] shadow-[inset_0_-2px_0_#8C93A0]" />
                </div>
              </div>

              {/* Buste / Polo bleu UPB */}
              <div className="absolute left-[29px] top-[40px] w-[24px] h-[34px] rounded-[11px_11px_6px_6px] bg-[#2453C9] z-[2]">
                {/* Écusson UPB */}
                <span className="absolute left-[9px] top-[9px] w-[8px] h-[8px] rounded-full bg-[#9ACBEE] shadow-[inset_0_0_0_2px_#0F2350]" />
                {/* Ceinture blanche */}
                <span className="absolute left-0 top-[24px] w-[24px] h-[4px] bg-white/85" />
              </div>

              {/* Short noir/bleu nuit */}
              <div className="absolute left-[29px] top-[66px] w-[24px] h-[13px] rounded-[3px_3px_6px_6px] bg-[#0E1E4A] z-[3]" />

              {/* Cou */}
              <div className="absolute left-[37px] top-[32px] w-[9px] h-[10px] bg-[#6A3B1F] z-[2]" />

              {/* Tête & Casquette/Bandeau UPB */}
              <div className="absolute left-[30px] top-[11px] w-[25px] h-[26px] rounded-[48%_52%_46%_54%] bg-[#6A3B1F] z-[3]">
                {/* Cheveux / casquette */}
                <span className="absolute left-0 -top-[2px] w-[24px] h-[13px] rounded-[12px_12px_3px_6px] bg-[#141010]" />
                {/* Bandeau blanc */}
                <span className="absolute -left-[1px] top-[7px] w-[25px] h-[4px] bg-white rounded-[2px]" />
                {/* Yeux & détails */}
                <span className="absolute left-[9px] top-[13px] w-[5px] h-[6px] rounded-full bg-[#4E2A15]" />
                <span className="absolute left-[18px] top-[14px] w-[3px] h-[4px] rounded-[2px] bg-[#141010]" />
                <span className="absolute left-[17px] top-[20px] w-[6px] h-[2.5px] rounded-b-[3px] bg-[#2A120A]" />
              </div>

              {/* Jambe avant (lf & lfs) */}
              <div
                className="absolute left-[36px] top-[70px] w-[11px] h-[26px] rounded-[6px] origin-[5.5px_4px] z-[4] animate-[runnerLf_0.62s_infinite_ease-in-out]"
                style={{
                  background: 'linear-gradient(#0E1E4A 0 52%, #6A3B1F 52%)',
                }}
              >
                <div className="absolute left-[1px] top-[21px] w-[9px] h-[25px] rounded-[5px] bg-[#6A3B1F] origin-[4.5px_3px] animate-[runnerLfs_0.62s_infinite_ease-in-out]">
                  {/* Chaussure avant */}
                  <div className="absolute -left-[1px] top-[21px] w-[17px] h-[8px] rounded-[4px_7px_3px_3px] bg-white shadow-[inset_0_-2px_0_#A3A9B2]" />
                </div>
              </div>

              {/* Bras avant (af & aff) */}
              <div className="absolute left-[37px] top-[43px] w-[9px] h-[20px] rounded-[5px] bg-[#2453C9] origin-[4.5px_4px] z-[5] animate-[runnerAf_0.62s_infinite_ease-in-out]">
                <div className="absolute left-0 top-[9px] w-[9px] h-[11px] rounded-b-[5px] bg-[#6A3B1F]" />
                <div className="absolute left-[0.5px] top-[16px] w-[8px] h-[18px] rounded-[4px] bg-[#6A3B1F] origin-[4px_3px] animate-[runnerAff_0.62s_infinite_ease-in-out]">
                  <span className="absolute -left-[0.5px] top-[14px] w-[9px] h-[9px] rounded-full bg-[#6A3B1F]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CHAUSSÉE ROUTIÈRE & BANDES BLANCHES DÉFILANTES --- */}
        <div className="absolute left-0 right-0 top-[220px] sm:top-[320px] lg:top-[340px] h-[40px] sm:h-[54px] lg:h-[64px] bg-[#2B2F3A] shadow-[inset_0_4px_0_#4A4F5C] sm:shadow-[inset_0_6px_0_#4A4F5C]">
          {/* Ligne médiane animée (pointillés réguliers) */}
          <div
            data-lane="80"
            className="absolute left-0 right-0 top-1/2 h-[3px] sm:h-[4px] -mt-[1.5px] sm:-mt-[2px] animate-[roadLaneMove80_0.72s_linear_infinite]"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.38) 0 34px, transparent 34px 80px)',
            }}
          />

          {/* Ligne inférieure animée (espacée) */}
          <div
            data-lane="240"
            className="absolute left-0 right-0 bottom-1 sm:bottom-1.5 h-[1.5px] sm:h-[2px] animate-[roadLaneMove240_2.16s_linear_infinite]"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 120px, transparent 120px 240px)',
            }}
          />
        </div>

        {/* --- TRANSITION VERS LE FOOTER BLEU NUIT --- */}
        <div className="absolute left-0 right-0 top-[260px] sm:top-[374px] lg:top-[404px] bottom-0 bg-[#0A1430] bg-gradient-to-b from-[#2B2F3A] to-[#0A1430]" />
      </div>

      {/* 3. SECTION CTA HERO FOOTER : "Prêt à relever le défi ?" */}
      <div className="relative bg-[#0A1430] text-white pt-14 sm:pt-20 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 font-medium text-xs sm:text-sm text-[#C9D1E8]">
            Prêt à relever le défi ?
          </span>

          <h3 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Inscriptions ouvertes
            <br />
            <span className="font-normal text-[#A9C2FF]">du 23 nov. au 18 déc.</span>
          </h3>

          <p className="max-w-lg text-sm sm:text-base text-[#C9D1E8] leading-relaxed">
            Quatre catégories, trois jours d'épreuves. Forme ton équipe et inscris-toi avant la clôture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
            <Link
              to="/inscription"
              className="min-h-[50px] px-7 rounded-2xl bg-[#2F6BF0] hover:bg-[#2558CA] text-white font-bold text-sm sm:text-base flex items-center gap-3 shadow-[0_14px_40px_rgba(47,107,240,0.55)] transition-all hover:scale-105"
            >
              Créer mon compte <span className="text-lg">↗</span>
            </Link>

            <Link
              to="/connexion"
              className="min-h-[50px] px-6 rounded-2xl border border-white/25 hover:bg-white/10 text-white font-bold text-sm sm:text-base flex items-center transition-all"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
