import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../data/categoriesData';

export default function Concours() {
  return (
    <div
      data-screen-label="S2 Concours et categories"
      style={{
        position: 'relative',
        width: '100%',
        background: '#F6F8FC',
        minHeight: '100vh',
        overflowX: 'clip',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '84px clamp(18px, 4vw, 32px) 56px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* En-tête officiel S2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span
            style={{
              font: "600 13px 'JetBrains Mono',monospace",
              color: '#2F6BF0',
              letterSpacing: '.05em',
            }}
          >
            LE CONCOURS
          </span>
          <h1
            style={{
              margin: 0,
              font: '800 clamp(32px, 4vw, 44px)/1.1 Nunito,sans-serif',
              color: '#0E1E4A',
              letterSpacing: '-.02em',
            }}
          >
            Un concours, quatre terrains.
          </h1>
          <p
            style={{
              margin: 0,
              font: '400 16px/1.6 Nunito,sans-serif',
              color: '#3D4459',
              maxWidth: '820px',
            }}
          >
            GÉNIE UPB réunit les étudiants de licence autour de défis concrets. Pendant trois jours, les équipes conçoivent, testent et défendent leurs projets devant un jury de professionnels. Cinq semaines de formations les y préparent.
          </p>
        </div>

        {/* Grille des 4 Catégories officielles (ZÉRO pilules inventées) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '20px',
          }}
        >
          {categoriesData.map((c) => (
            <div
              key={c.id}
              style={{
                background: '#fff',
                borderRadius: '22px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderTop: `5px solid ${c.couleur}`,
                boxShadow: '0 4px 20px rgba(10,20,48,.04)',
              }}
            >
              {/* Nom & Numéro */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ font: '800 24px Nunito,sans-serif', color: '#0E1E4A' }}>
                  {c.name}
                </span>
                <span style={{ font: '800 28px Nunito,sans-serif', color: c.couleur }}>
                  {c.code}
                </span>
              </div>

              {/* Pitch */}
              <span
                style={{
                  font: '400 16px/1.5 Nunito,sans-serif',
                  color: '#4A5168',
                  minHeight: '44px',
                }}
              >
                {c.pitch}
              </span>

              {/* Taille & Places restantes */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  font: '600 15px Nunito,sans-serif',
                  color: '#4A5168',
                }}
              >
                <span>{c.tailleEquipe}</span>
                <span style={{ color: c.couleur, fontWeight: 700 }}>{c.placesRestantes}</span>
              </div>

              {/* Barre de remplissage */}
              <div
                style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: '#EEECE6',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${c.tauxRemplissage}%`,
                    background: c.couleur,
                    borderRadius: '3px',
                  }}
                />
              </div>

              {/* Boutons d'action (Voir la fiche & S'inscrire) */}
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '6px' }}>
                <Link
                  to={`/concours/${c.slug}`}
                  data-shine="1"
                  style={{
                    flex: 1,
                    minHeight: '46px',
                    borderRadius: '999px',
                    border: '1.5px solid #0E1E4A',
                    color: '#0E1E4A',
                    font: '600 15px Nunito,sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'translate .2s, background .2s, color .2s',
                  }}
                >
                  Voir la fiche
                </Link>

                <Link
                  to="/inscription"
                  data-shine="1"
                  style={{
                    flex: 1,
                    minHeight: '46px',
                    borderRadius: '999px',
                    background: '#E8742A',
                    color: '#0A1430',
                    font: '700 15px Nunito,sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'translate .2s, opacity .2s',
                  }}
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
