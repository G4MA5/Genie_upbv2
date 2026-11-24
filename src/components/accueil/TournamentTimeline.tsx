import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const TournamentTimeline: React.FC = () => {
  // Calcul de la position dynamique du coureur selon la date actuelle
  const { runnerX, runnerPercent, runnerLabel } = useMemo(() => {
    const now = Date.now();
    const D = [
      '2026-11-01',
      '2026-11-25',
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
      runnerPercent: rx,
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
        className="relative w-full h-[290px] sm:h-[460px] lg:h-[520px] overflow-hidden"
      >
        {/* --- POTEAU DE DÉPART --- */}
        <div className="absolute left-2.5 sm:left-12 top-[144px] sm:top-[230px] w-1 sm:w-2 h-[56px] sm:h-[110px] bg-[#0A1430] z-[3]">
          <span className="absolute left-0 bottom-[calc(100%+6px)] whitespace-nowrap font-mono font-bold text-[10px] sm:text-xs lg:text-sm text-[#0A1430] tracking-wider">
            DÉPART
          </span>
        </div>

        {/* --- POTEAU D'ARRIVÉE AVEC DRAPEAU À DAMIER --- */}
        <div className="absolute right-2.5 sm:right-10 top-[70px] sm:top-[80px] w-1 sm:w-2 h-[130px] sm:h-[260px] bg-[#0A1430] z-[4]">
          {/* Drapeau à damier noir et blanc */}
          <div
            className="absolute right-full top-0 w-[30px] sm:w-[60px] h-[20px] sm:h-[40px]"
            style={{
              background:
                'repeating-conic-gradient(#0A1430 0 25%, #ffffff 0 50%) 0 0 / 10px 10px',
            }}
          />
        </div>

        {/* --- LES 4 PANNEAUX EN BOIS (JALONS DU TOURNOI) --- */}
        {/* Jalon 1 : Inscriptions (24%) - Pieu HAUT */}
        <div
          data-sign="1"
          className="absolute left-[24%] top-[200px] sm:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-1.5 sm:p-3.5 lg:p-4 bg-[#0E1E4A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[72px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform text-center sm:text-left">
            <span className="font-mono font-bold text-[8.5px] sm:text-xs lg:text-sm text-[#A9C2FF] tracking-wider">
              25 NOV.
            </span>
            <span className="font-extrabold text-[12px] sm:text-xl lg:text-2xl text-white font-['Sen'] leading-none">
              Inscriptions
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-[#C9D1E8]">
              jusqu'au 18 déc.
            </span>
          </div>
          {/* Pieu en bois haut (46px mobile / 90px desktop) */}
          <div className="w-[5px] sm:w-[10px] h-[46px] sm:h-[70px] lg:h-[90px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* Jalon 2 : Formations (46%) - Pieu COURT */}
        <div
          data-sign="2"
          className="absolute left-[46%] top-[200px] sm:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-1.5 sm:p-3.5 lg:p-4 bg-[#0E1E4A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[72px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform text-center sm:text-left">
            <span className="font-mono font-bold text-[8.5px] sm:text-xs lg:text-sm text-[#A9C2FF] tracking-wider">
              21 DÉC.
            </span>
            <span className="font-extrabold text-[12px] sm:text-xl lg:text-2xl text-white font-['Sen'] leading-none">
              Formations
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-[#C9D1E8]">
              allégé 24 déc. → 3 janv.
            </span>
          </div>
          {/* Pieu en bois court (18px mobile / 40px desktop) */}
          <div className="w-[5px] sm:w-[10px] h-[18px] sm:h-[30px] lg:h-[40px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* Jalon 3 : Concours - MIS EN VALEUR EN ORANGE (68%) - Pieu HAUT */}
        <div
          data-sign="3"
          className="absolute left-[68%] top-[200px] sm:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-1.5 sm:p-3.5 lg:p-4 bg-[#E8742A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[72px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform text-center sm:text-left">
            <span className="font-mono font-bold text-[8.5px] sm:text-xs lg:text-sm text-[#FFE8D6] tracking-wider">
              27 JANV.
            </span>
            <span className="font-extrabold text-[12px] sm:text-xl lg:text-2xl text-white font-['Sen'] leading-none">
              Concours
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-white/90">
              3 jours d'épreuves
            </span>
          </div>
          {/* Pieu en bois haut (46px mobile / 90px desktop) */}
          <div className="w-[5px] sm:w-[10px] h-[46px] sm:h-[70px] lg:h-[90px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* Jalon 4 : Clôture (86%) - Pieu COURT */}
        <div
          data-sign="4"
          className="absolute left-[86%] top-[200px] sm:top-[340px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-[3]"
        >
          <div className="p-1.5 sm:p-3.5 lg:p-4 bg-[#0E1E4A] border border-[#0A1430]/15 shadow-xl rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 min-w-[72px] sm:min-w-[150px] lg:min-w-[170px] hover:-translate-y-1.5 transition-transform text-center sm:text-left">
            <span className="font-mono font-bold text-[8.5px] sm:text-xs lg:text-sm text-[#A9C2FF] tracking-wider">
              30 JANV.
            </span>
            <span className="font-extrabold text-[12px] sm:text-xl lg:text-2xl text-white font-['Sen'] leading-none">
              Clôture
            </span>
            <span className="hidden sm:block font-medium text-[11px] lg:text-xs text-[#C9D1E8]">
              Cérémonie & prix
            </span>
          </div>
          {/* Pieu en bois court (18px mobile / 40px desktop) */}
          <div className="w-[5px] sm:w-[10px] h-[18px] sm:h-[30px] lg:h-[40px] bg-[#6B4A2E] border-l-2 sm:border-l-[3px] border-[#8A6440]" />
        </div>

        {/* --- LE COUREUR ARTICULÉ GÉNIE UPB (DATA-RUNNER) --- */}
        <div
          data-runner="1"
          className="absolute top-[200px] sm:top-[340px] -translate-x-1/2 -translate-y-full z-[5] w-[48px] sm:w-[80px] h-[60px] sm:h-[120px] transition-[left] duration-1000 ease-out"
          style={{ left: runnerX }}
        >
          {/* Ligne pointillée montant jusqu'au badge */}
          <div
            className="absolute left-1/2 bottom-[calc(100%+6px)] w-0.5 h-[74px] sm:h-[144px] -ml-[1px]"
            style={{
              background:
                'repeating-linear-gradient(#0A1430 0 6px, transparent 6px 12px)',
            }}
          />

          {/* Badge flottant avec label dynamique (ex: "J-9 · Inscriptions") */}
          <div
            className="absolute left-1/2 bottom-[calc(100%+80px)] sm:bottom-[calc(100%+150px)] whitespace-nowrap px-2 sm:px-3 py-1 bg-white text-[#1D4FD8] font-mono font-bold text-[10px] sm:text-xs lg:text-sm rounded-full shadow-[0_14px_34px_rgba(10,20,48,0.18)] border border-[#0A1430]/12"
            style={{
              transform: runnerPercent < 20 ? 'translateX(calc(-50% + 14px))' : 'translateX(-50%)',
            }}
          >
            {runnerLabel}
          </div>

          {/* Ombre au sol sous le coureur */}
          <div className="absolute left-1/2 -bottom-1 sm:-bottom-1.5 w-[35px] sm:w-[52.5px] h-[5px] sm:h-[7.5px] -ml-[17.5px] sm:-ml-[26.25px] rounded-full bg-black/35" />

          {/* Personnage coureur articulé (bobbing & membres animés) */}
          <div className="absolute left-1 sm:left-0 bottom-0 w-[80px] h-[120px] origin-bottom-left scale-50 sm:scale-100">
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
        <div className="absolute left-0 right-0 top-[200px] sm:top-[340px] h-[30px] sm:h-[54px] lg:h-[60px] bg-[#2B2F3A] shadow-[inset_0_3px_0_#4A4F5C] sm:shadow-[inset_0_6px_0_#4A4F5C]">
          {/* Ligne médiane animée (pointillés réguliers) */}
          <div
            data-lane="80"
            className="absolute left-0 right-0 top-1/2 h-[2px] sm:h-[4px] -mt-[1px] sm:-mt-[2px] animate-[roadLaneMove80_0.72s_linear_infinite]"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.38) 0 16px, transparent 16px 40px)',
            }}
          />

          {/* Ligne inférieure animée (espacée, desktop) */}
          <div
            data-lane="240"
            className="hidden sm:block absolute left-0 right-0 bottom-1 sm:bottom-1.5 h-[1.5px] sm:h-[2px] animate-[roadLaneMove240_2.16s_linear_infinite]"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 120px, transparent 120px 240px)',
            }}
          />
        </div>

        {/* --- TRANSITION VERS LE FOOTER BLEU NUIT --- */}
        <div className="absolute left-0 right-0 top-[230px] sm:top-[394px] lg:top-[400px] bottom-0 bg-[#0A1430] bg-gradient-to-b from-[#2B2F3A] to-[#0A1430]" />
      </div>

      {/* 3. SECTION CTA HERO FOOTER : "Prêt à relever le défi ?" (Calibré Mobile img2 & Desktop img3) */}
      <div className="relative bg-[#0A1430] text-white pt-16 sm:pt-28 pb-20 sm:pb-32 px-5 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
          {/* Badge Pilule */}
          <span className="px-5 py-2 rounded-full border border-white/20 bg-white/5 font-medium text-xs sm:text-sm lg:text-base text-[#C9D1E8]">
            Prêt à relever le défi ?
          </span>

          {/* Titre Majeur & Impressionnant */}
          <h3 className="font-extrabold text-[34px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-white tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] text-balance">
            Inscriptions ouvertes
            <br />
            <span className="font-normal text-[#A9C2FF]">du 25 nov. au 18 déc.</span>
          </h3>

          {/* Paragraphe descriptif : visible sur desktop, masqué sur mobile (img2) */}
          <p className="hidden sm:block max-w-[500px] text-base sm:text-lg lg:text-[19px] text-[#C9D1E8] leading-relaxed mx-auto text-pretty">
            Quatre catégories, trois jours d'épreuves. Forme ton équipe et inscris-toi avant la clôture.
          </p>

          {/* Bouton d'action */}
          <div className="w-full flex justify-center mt-2 sm:mt-3">
            <Link
              to="/inscription"
              className="w-full max-w-[280px] sm:w-auto min-h-[54px] sm:min-h-[58px] px-8 sm:px-9 rounded-2xl bg-[#2F6BF0] hover:bg-[#2558CA] text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3.5 shadow-[0_14px_40px_rgba(47,107,240,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Créer mon compte</span>
              <span className="text-xl">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
