import React from 'react';

export default function DroitCitationStats() {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#E8CFA4',
        padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,72px)',
      }}
    >
      {/* Grand texte filigrane DROIT */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-2%',
          top: '50%',
          translate: '0 -50%',
          font: '900 clamp(160px,26vw,380px)/.8 Nunito,sans-serif',
          letterSpacing: '-.04em',
          color: '#D9B983',
          opacity: 0.5,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        DROIT
      </span>

      {/* Arc elliptique décoratif */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-12%',
          top: '8%',
          width: '62%',
          height: '120%',
          border: '2px solid #7A1A1F',
          borderColor: '#7A1A1F transparent transparent #7A1A1F',
          borderRadius: '50%',
          opacity: 0.35,
          rotate: '-14deg',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'center',
        }}
      >
        {/* Colonne gauche : Bulle Citation Crimson */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '30px',
              background: '#7A1A1F',
              padding: 'clamp(28px,4vw,48px)',
              boxShadow: '0 24px 50px rgba(94,18,23,.28)',
            }}
          >
            <span style={{ display: 'block', font: '900 96px/.6 Georgia,serif', color: '#fff', height: '44px' }}>
              “
            </span>
            <p
              style={{
                margin: 0,
                font: '400 clamp(22px,2.4vw,32px)/1.3 Nunito,sans-serif',
                color: '#fff',
                textWrap: 'pretty',
              }}
            >
              La catégorie Droit oppose <b style={{ fontWeight: 900 }}>8 équipes de 5 à 6 personnes</b> à travers trois épreuves : le <b style={{ fontWeight: 900 }}>Génie en herbe</b>, le <b style={{ fontWeight: 900 }}>Débat contradictoire</b> et le <b style={{ fontWeight: 900 }}>Procès fictif</b>.
            </p>
            <span
              style={{
                display: 'block',
                width: '64px',
                height: '5px',
                marginTop: '10px',
                borderRadius: '3px',
                background: '#fff',
              }}
            />
            <span
              style={{
                display: 'block',
                font: '900 96px/.6 Georgia,serif',
                color: '#fff',
                height: '44px',
                textAlign: 'right',
              }}
            >
              “
            </span>
            {/* Flèche pointeur bulle de dialogue */}
            <span
              style={{
                position: 'absolute',
                left: '56px',
                bottom: '-26px',
                width: 0,
                height: 0,
                borderLeft: '26px solid transparent',
                borderRight: '26px solid transparent',
                borderTop: '28px solid #7A1A1F',
              }}
            />
          </div>
        </div>

        {/* Colonne droite : 4 Cartes statistiques */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
            gap: '16px',
            minWidth: 0,
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '26px 24px',
              background: '#7A1A1F',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                font: '900 clamp(48px,5vw,68px)/1 Nunito,sans-serif',
                color: '#fff',
                letterSpacing: '-.03em',
              }}
            >
              3
            </span>
            <span style={{ font: '400 19px/1.2 Nunito,sans-serif', color: '#F3E2C4' }}>
              {' '}
              <b style={{ fontWeight: 900 }}>épreuves</b>
            </span>
            <span
              style={{
                display: 'block',
                width: '36px',
                height: '4px',
                marginTop: '6px',
                borderRadius: '2px',
                background: '#fff',
              }}
            />
          </div>

          {/* Card 2 */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '26px 24px',
              background: '#F3E2C4',
              border: '2px solid #7A1A1F',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                font: '900 clamp(48px,5vw,68px)/1 Nunito,sans-serif',
                color: '#7A1A1F',
                letterSpacing: '-.03em',
              }}
            >
              8
            </span>
            <span style={{ font: '400 19px/1.2 Nunito,sans-serif', color: '#7A1A1F' }}>
              {' '}
              <b style={{ fontWeight: 900 }}>équipes</b>
            </span>
            <span
              style={{
                display: 'block',
                width: '36px',
                height: '4px',
                marginTop: '6px',
                borderRadius: '2px',
                background: '#7A1A1F',
              }}
            />
          </div>

          {/* Card 3 */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '26px 24px',
              background: '#F3E2C4',
              border: '2px solid #7A1A1F',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                font: '900 clamp(48px,5vw,68px)/1 Nunito,sans-serif',
                color: '#7A1A1F',
                letterSpacing: '-.03em',
              }}
            >
              5–6
            </span>
            <span style={{ font: '400 19px/1.2 Nunito,sans-serif', color: '#7A1A1F' }}>
              membres <b style={{ fontWeight: 900 }}>par équipe</b>
            </span>
            <span
              style={{
                display: 'block',
                width: '36px',
                height: '4px',
                marginTop: '6px',
                borderRadius: '2px',
                background: '#7A1A1F',
              }}
            />
          </div>

          {/* Card 4 */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '26px 24px',
              background: '#7A1A1F',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                font: '900 clamp(48px,5vw,68px)/1 Nunito,sans-serif',
                color: '#fff',
                letterSpacing: '-.03em',
              }}
            >
              48
            </span>
            <span style={{ font: '400 19px/1.2 Nunito,sans-serif', color: '#F3E2C4' }}>
              participants <b style={{ fontWeight: 900 }}>maximum</b>
            </span>
            <span
              style={{
                display: 'block',
                width: '36px',
                height: '4px',
                marginTop: '6px',
                borderRadius: '2px',
                background: '#fff',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
