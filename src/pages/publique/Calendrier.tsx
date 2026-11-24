import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Images officielles extraites du prototype
import lieuImg from '../../assets/images/campus_upb_lieu.png';
import bannerImg from '../../assets/images/banniere_calendrier.png';
import concoursThumb from '../../assets/images/admin_hero_etudiantes.png';

/**
 * ============================================================================
 * S3 — CALENDRIER ET LIEU
 * ============================================================================
 * Restitution 100% fidèle au prototype scripts/proto_real.html (Lignes 967-979).
 * - Grille calendrier 3 colonnes responsive
 * - Novembre 2026, Décembre 2026, Janvier 2027 avec barres de range continues
 * - Carte Lieu (Université Polytechnique de Bingerville) avec photo campus
 * - Bannière Édition 2025, Parcours candidat, 4 étapes avec thumbnails
 * - Carte Programme détaillé (PDF téléchargeable)
 */

interface DayCell {
  empty?: boolean;
  day?: number;
  rangeBg?: string;
  borderRadius?: string;
  badgeBg?: string;
  isWhiteText?: boolean;
}

// 1. Novembre 2026 (1er = Dimanche -> 6 cases vides, 30 jours)
const NOV_DAYS: DayCell[] = (() => {
  const days: DayCell[] = [];
  for (let i = 0; i < 6; i++) days.push({ empty: true });
  for (let d = 1; d <= 30; d++) {
    let rangeBg: string | undefined;
    let borderRadius: string | undefined;
    let badgeBg: string | undefined;
    let isWhiteText = false;

    if (d >= 25 && d <= 30) {
      rangeBg = '#DCE7FB';
      if (d === 25) {
        borderRadius = '999px 0 0 999px';
        badgeBg = '#2F63D0';
        isWhiteText = true;
      } else if (d === 29) {
        borderRadius = '0 999px 999px 0';
      } else if (d === 30) {
        borderRadius = '999px';
        badgeBg = '#2F63D0';
        isWhiteText = true;
      } else {
        borderRadius = '0';
      }
    }
    days.push({ day: d, rangeBg, borderRadius, badgeBg, isWhiteText });
  }
  return days;
})();

// 2. Décembre 2026 (1er = Mardi -> 1 case vide, 31 jours)
const DEC_DAYS: DayCell[] = (() => {
  const days: DayCell[] = [];
  days.push({ empty: true });
  for (let d = 1; d <= 31; d++) {
    let rangeBg: string | undefined;
    let borderRadius: string | undefined;
    let badgeBg: string | undefined;
    let isWhiteText = false;

    if (d >= 1 && d <= 18) {
      rangeBg = '#DCE7FB';
      if (d === 1) {
        borderRadius = '999px 0 0 999px';
        badgeBg = '#2F63D0';
        isWhiteText = true;
      } else if (d === 6 || d === 13) {
        borderRadius = '0 999px 999px 0'; // Fin de semaine (Dimanche)
      } else if (d === 7 || d === 14) {
        borderRadius = '999px 0 0 999px'; // Début de semaine (Lundi)
      } else if (d === 18) {
        borderRadius = '0 999px 999px 0';
        badgeBg = '#2F63D0';
        isWhiteText = true;
      } else {
        borderRadius = '0';
      }
    } else if (d >= 21 && d <= 31) {
      rangeBg = '#FFF3C2';
      if (d === 21) {
        borderRadius = '999px 0 0 999px';
        badgeBg = '#E8B33D';
        isWhiteText = true;
      } else if (d === 27) {
        borderRadius = '0 999px 999px 0'; // Dimanche
      } else if (d === 28) {
        borderRadius = '999px 0 0 999px'; // Lundi
      } else if (d === 31) {
        borderRadius = '0 999px 999px 0';
        badgeBg = '#E8B33D';
        isWhiteText = true;
      } else {
        borderRadius = '0';
      }
    }
    days.push({ day: d, rangeBg, borderRadius, badgeBg, isWhiteText });
  }
  return days;
})();

// 3. Janvier 2027 (1er = Vendredi -> 4 cases vides, 31 jours)
const JAN_DAYS: DayCell[] = (() => {
  const days: DayCell[] = [];
  for (let i = 0; i < 4; i++) days.push({ empty: true });
  for (let d = 1; d <= 31; d++) {
    let rangeBg: string | undefined;
    let borderRadius: string | undefined;
    let badgeBg: string | undefined;
    let isWhiteText = false;

    if (d >= 1 && d <= 24) {
      rangeBg = '#FFF3C2';
      if (d === 1) {
        borderRadius = '999px 0 0 999px';
        badgeBg = '#E8B33D';
        isWhiteText = true;
      } else if (d === 3 || d === 10 || d === 17 || d === 24) {
        borderRadius = '0 999px 999px 0'; // Dimanche
        if (d === 24) {
          badgeBg = '#E8B33D';
          isWhiteText = true;
        }
      } else if (d === 4 || d === 11 || d === 18) {
        borderRadius = '999px 0 0 999px'; // Lundi
      } else {
        borderRadius = '0';
      }
    } else if (d >= 27 && d <= 29) {
      rangeBg = '#FFE0CC';
      if (d === 27) {
        borderRadius = '999px 0 0 999px';
        badgeBg = '#E8742A';
        isWhiteText = true;
      } else if (d === 29) {
        borderRadius = '0 999px 999px 0';
        badgeBg = '#E8742A';
        isWhiteText = true;
      } else {
        borderRadius = '0';
      }
    } else if (d === 30) {
      rangeBg = '#FFE0CC';
      borderRadius = '999px';
      badgeBg = '#E8742A';
      isWhiteText = true;
    }
    days.push({ day: d, rangeBg, borderRadius, badgeBg, isWhiteText });
  }
  return days;
})();

const DAY_NAMES = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

interface CalendarMonthProps {
  monthName: string;
  year: string;
  days: DayCell[];
}

function CalendarMonthCard({ monthName, year, days }: CalendarMonthProps) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '26px',
        padding: '20px',
        boxShadow: '0 14px 34px rgba(14,30,74,.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minWidth: 0,
      }}
    >
      <span style={{ font: '800 20px Nunito,sans-serif', color: '#0A1430' }}>
        {monthName} <span style={{ color: '#8A8FA3', fontWeight: 500 }}>{year}</span>
      </span>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: '6px',
        }}
      >
        {DAY_NAMES.map((name) => (
          <span
            key={name}
            style={{
              font: '700 12px Nunito,sans-serif',
              color: '#8A8FA3',
              textAlign: 'center',
              paddingBottom: '6px',
            }}
          >
            {name}
          </span>
        ))}

        {days.map((cell, idx) => {
          if (cell.empty) {
            return <span key={`empty-${idx}`} />;
          }

          return (
            <span
              key={`day-${cell.day}`}
              style={{
                height: '40px',
                display: 'grid',
                placeItems: 'center',
                background: cell.rangeBg || 'transparent',
                borderRadius: cell.borderRadius || '0',
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'grid',
                  placeItems: 'center',
                  font: '700 14px Nunito,sans-serif',
                  background: cell.badgeBg || 'transparent',
                  color: cell.isWhiteText ? '#fff' : '#0A1430',
                  borderRadius: cell.badgeBg ? '50%' : '0',
                }}
              >
                {cell.day}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Calendrier() {
  const handleDownloadPdf = () => {
    toast.success('Téléchargement du programme détaillé (PDF)...', {
      duration: 3500,
      icon: '📄',
    });
  };

  return (
    <div
      data-screen-label="S3 Calendrier et lieu"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#EEF3FB',
        padding: '96px 20px 48px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '36px',
          padding: '28px',
          boxShadow: '0 30px 70px rgba(14,30,74,.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {/* ========================================================= */}
        {/* EN-TÊTE : DE L'INSCRIPTION À LA FINALE                    */}
        {/* ========================================================= */}
        <div
          style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              style={{
                font: "600 13px 'JetBrains Mono',monospace",
                letterSpacing: '.06em',
                color: '#2F63D0',
              }}
            >
              CALENDRIER COMPLET
            </span>
            <h1
              style={{
                margin: 0,
                font: '800 clamp(32px,4vw,48px)/1 Nunito,sans-serif',
                color: '#0A1430',
                letterSpacing: '-.02em',
              }}
            >
              De l'inscription à la finale
            </h1>
          </div>

          <Link
            to="/inscription"
            data-shine="1"
            style={{
              textDecoration: 'none',
              minHeight: '52px',
              padding: '0 24px',
              borderRadius: '999px',
              background: '#0A1430',
              color: '#fff',
              font: '800 16px Nunito,sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            S'inscrire →
          </Link>
        </div>

        {/* ========================================================= */}
        {/* COLONNE 1 : NOVEMBRE 2026 & DÉCEMBRE 2026                 */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0 }}>
          <CalendarMonthCard monthName="Novembre" year="2026" days={NOV_DAYS} />
          <CalendarMonthCard monthName="Décembre" year="2026" days={DEC_DAYS} />
        </div>

        {/* ========================================================= */}
        {/* COLONNE 2 : JANVIER 2027 & CARTE LIEU                     */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0 }}>
          <CalendarMonthCard monthName="Janvier" year="2027" days={JAN_DAYS} />

          {/* CARTE LIEU — UNIVERSITÉ POLYTECHNIQUE DE BINGERVILLE */}
          <div
            style={{
              position: 'relative',
              borderRadius: '26px',
              overflow: 'hidden',
              minHeight: '230px',
              background: `#0A1430 url("${lieuImg}") center 35%/cover`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,transparent 20%,rgba(10,20,48,.92))',
              }}
            />
            <div
              style={{
                position: 'relative',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span
                style={{
                  font: "600 12px 'JetBrains Mono',monospace",
                  letterSpacing: '.06em',
                  color: '#A9C2FF',
                }}
              >
                LIEU
              </span>
              <span style={{ font: '800 22px/1.1 Nunito,sans-serif', color: '#fff' }}>
                Université Polytechnique de Bingerville
              </span>
              <span style={{ font: '500 14px Nunito,sans-serif', color: '#C9D1E8' }}>
                Salle et accès à confirmer (C-09)
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLONNE 3 : MON PARCOURS (ÉTAPES) & PROGRAMME DÉTAILLÉ    */}
        {/* ========================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
          {/* BANNIÈRE ÉDITION 2025 */}
          <div
            style={{
              position: 'relative',
              minHeight: '200px',
              borderRadius: '26px',
              overflow: 'hidden',
              background: `#0A1430 url("${bannerImg}") center 30%/cover`,
              display: 'flex',
              alignItems: 'flex-end',
              boxShadow: '0 14px 30px rgba(14,30,74,.15)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,transparent 45%,rgba(10,20,48,.85))',
              }}
            />
            <span
              style={{
                position: 'relative',
                margin: '16px',
                padding: '4px 12px 6px',
                background: '#fff',
                color: '#1D4FD8',
                borderRadius: '999px',
                font: '800 18px Nunito,sans-serif',
              }}
            >
              Édition 2025
            </span>
          </div>

          {/* TITRE ET LÉGENDE DU PARCOURS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <h2 style={{ margin: 0, font: '800 22px Nunito,sans-serif', color: '#0A1430' }}>
              Mon parcours
            </h2>
            <span
              style={{
                display: 'flex',
                gap: '6px',
                font: '600 12px Nunito,sans-serif',
                color: '#6A7189',
                alignItems: 'center',
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2F63D0' }} />
              Inscr.
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E8B33D', marginLeft: '6px' }} />
              Form.
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E8742A', marginLeft: '6px' }} />
              Concours
            </span>
          </div>

          {/* ÉTAPE 1 : INSCRIPTIONS */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '22px',
              background: '#fff',
              border: '1.5px solid #EEF0F5',
              transition: 'box-shadow .25s ease, transform .25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(14,30,74,.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span
              style={{
                width: '64px',
                height: '64px',
                flex: 'none',
                borderRadius: '18px',
                background: `#2F63D0 url("${bannerImg}") center 30%/cover`,
                display: 'grid',
                placeItems: 'center',
                font: '800 22px Nunito,sans-serif',
                color: '#fff',
              }}
            />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ font: '800 17px Nunito,sans-serif', color: '#0A1430' }}>Inscriptions</span>
              <span style={{ font: '600 13px Nunito,sans-serif', color: '#6A7189' }}>25 nov. → 18 déc. 2026</span>
              <span style={{ font: '500 13px Nunito,sans-serif', color: '#8A8FA3' }}>Création de compte et des équipes</span>
            </div>
          </div>

          {/* ÉTAPE 2 : FORMATIONS */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '22px',
              background: '#fff',
              border: '1.5px solid #EEF0F5',
              transition: 'box-shadow .25s ease, transform .25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(14,30,74,.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span
              style={{
                width: '64px',
                height: '64px',
                flex: 'none',
                borderRadius: '18px',
                background: '#E8B33D',
                display: 'grid',
                placeItems: 'center',
                font: '800 22px Nunito,sans-serif',
                color: '#fff',
              }}
            />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ font: '800 17px Nunito,sans-serif', color: '#0A1430' }}>Formations</span>
              <span style={{ font: '600 13px Nunito,sans-serif', color: '#6A7189' }}>21 déc. → 24 janv.</span>
              <span style={{ font: '500 13px Nunito,sans-serif', color: '#8A8FA3' }}>Allégé du 24 déc. au 3 janv.</span>
            </div>
          </div>

          {/* ÉTAPE 3 : CONCOURS */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '22px',
              background: '#fff',
              border: '1.5px solid #EEF0F5',
              transition: 'box-shadow .25s ease, transform .25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(14,30,74,.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span
              style={{
                width: '64px',
                height: '64px',
                flex: 'none',
                borderRadius: '18px',
                background: `#E8742A url("${concoursThumb}") center 25%/cover`,
                display: 'grid',
                placeItems: 'center',
                font: '800 22px Nunito,sans-serif',
                color: '#fff',
              }}
            />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ font: '800 17px Nunito,sans-serif', color: '#0A1430' }}>Concours</span>
              <span style={{ font: '600 13px Nunito,sans-serif', color: '#6A7189' }}>27 → 29 janv. 2027</span>
              <span style={{ font: '500 13px Nunito,sans-serif', color: '#8A8FA3' }}>Trois jours d’épreuves</span>
            </div>
          </div>

          {/* ÉTAPE 4 : CÉRÉMONIE DE CLÔTURE */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '22px',
              background: '#fff',
              border: '1.5px solid #EEF0F5',
              transition: 'box-shadow .25s ease, transform .25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(14,30,74,.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span
              style={{
                width: '64px',
                height: '64px',
                flex: 'none',
                borderRadius: '18px',
                background: '#0A1430',
                display: 'grid',
                placeItems: 'center',
                font: '800 22px Nunito,sans-serif',
                color: '#fff',
              }}
            />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ font: '800 17px Nunito,sans-serif', color: '#0A1430' }}>Cérémonie de clôture</span>
              <span style={{ font: '600 13px Nunito,sans-serif', color: '#6A7189' }}>30 janv. 2027</span>
              <span style={{ font: '500 13px Nunito,sans-serif', color: '#8A8FA3' }}>Remise des prix</span>
            </div>
          </div>

          {/* CARTE PROGRAMME DÉTAILLÉ (TÉLÉCHARGEMENT PDF) */}
          <div
            style={{
              marginTop: 'auto',
              borderRadius: '26px',
              padding: '20px',
              background: '#0A1430',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                padding: '4px 12px 6px',
                background: '#fff',
                color: '#1D4FD8',
                borderRadius: '999px',
                font: '800 20px Nunito,sans-serif',
              }}
            >
              Programme détaillé
            </span>
            <span style={{ font: '500 14px/1.45 Nunito,sans-serif', color: '#C9D1E8' }}>
              Horaires et activités des quatre jours (C-08, C-10).
            </span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              data-shine="1"
              style={{
                minHeight: '46px',
                padding: '0 18px',
                borderRadius: '999px',
                border: 0,
                background: '#fff',
                color: '#0A1430',
                font: '800 15px Nunito,sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              ↓ Télécharger le PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
