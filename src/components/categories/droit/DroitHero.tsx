import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DroitHero() {
  const navigate = useNavigate();

  const svgBg = `url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27768%27%20height%3D%27576%27%3E%3Crect%20width%3D%27768%27%20height%3D%27576%27%20fill%3D%27%23F7F1E7%27%2F%3E%3Crect%20x%3D%2796%27%20y%3D%2796%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%23EEE2CF%27%2F%3E%3Crect%20x%3D%27576%27%20y%3D%27288%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%23F0E6D5%27%2F%3E%3Crect%20x%3D%27192%27%20y%3D%27384%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%23ECDFCB%27%2F%3E%3Crect%20x%3D%27480%27%20y%3D%27384%27%20width%3D%2796%27%20height%3D%2796%27%20fill%3D%27%23EEE2CF%27%2F%3E%3Crect%20x%3D%27-1%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%2795%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27191%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27287%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27383%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27479%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27575%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27671%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%27767%27%20y%3D%270%27%20width%3D%272%27%20height%3D%27576%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27-1%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%2795%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27191%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27287%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27383%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27479%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27575%27%20width%3D%27768%27%20height%3D%272%27%20fill%3D%27%23E6D8C3%27%2F%3E%3C%2Fsvg%3E")`;

  return (
    <div
      data-sd-bg="1"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F7F1E7',
        backgroundImage: svgBg,
        backgroundSize: '880px 660px',
        padding: '130px clamp(20px,5vw,72px) 56px',
      }}
    >
      {/* Gradient atmosphérique bas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '42%',
          background: 'linear-gradient(180deg,rgba(222,205,181,0) 0%,rgba(222,205,181,.5) 55%,#DECDB5 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
          gap: 'clamp(24px,3vw,40px)',
          alignItems: 'stretch',
        }}
      >
        {/* Colonne gauche : Titre, pitch, boutons */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '26px',
            minWidth: 0,
            paddingTop: '20px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} />

          <h1
            style={{
              margin: 0,
              font: '900 clamp(52px,7vw,108px)/.92 Nunito,sans-serif',
              letterSpacing: '-.03em',
              textTransform: 'none',
              background: 'linear-gradient(180deg,#3B3F4C 0%,#0A1430 45%,#8A8D98 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Qui sera le&nbsp;
            <br />
            génie du droit ?
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: '40ch',
              font: '600 18px/1.5 Nunito,sans-serif',
              color: '#3A3F55',
              textWrap: 'pretty',
            }}
          >
            Trois épreuves pour tester vos connaissances, votre éloquence et votre sens de la plaidoirie.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span
              onClick={() => navigate('/inscription')}
              data-go="S8"
              data-shine="1"
              style={{
                minHeight: '52px',
                padding: '0 24px',
                borderRadius: '14px',
                border: '3px solid #0A1430',
                background: 'linear-gradient(180deg,#8A5130,#6B3A1F)',
                color: '#fff',
                font: '800 17px Nunito,sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                boxShadow: '0 12px 26px rgba(107,58,31,.4),inset 0 1px 0 rgba(255,255,255,.18)',
                transition: 'translate .3s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.translate = '0 -3px')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.translate = '0 0')}
            >
              S'inscrire →
            </span>

            <a
              href="#dossiers"
              style={{
                minHeight: '52px',
                padding: '0 22px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,.55)',
                border: '1px solid rgba(255,255,255,.8)',
                boxShadow: '0 20px 40px rgba(10,20,48,.12)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                color: '#0A1430',
                font: '800 17px Nunito,sans-serif',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'translate .3s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.translate = '0 -3px')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.translate = '0 0')}
            >
              Découvrir les épreuves
            </a>
          </div>
        </div>

        {/* Colonne droite Desktop */}
        <div
          className="hidden md:block"
          style={{
            position: 'relative',
            minHeight: '600px',
            minWidth: 0,
          }}
        >
          <div style={{ position: 'absolute', left: '-60px', right: '120px', top: '-50px', bottom: '40px' }}>
            <img
              src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.webp"
              alt="Statue de la Justice"
              style={{
                display: 'block',
                width: '710px',
                height: '798px',
                objectFit: 'contain',
                objectPosition: '30% 0%',
                filter:
                  'drop-shadow(3px 0 0 #111) drop-shadow(-3px 0 0 #111) drop-shadow(0 3px 0 #111) drop-shadow(0 -3px 0 #111) drop-shadow(0 30px 40px rgba(10,20,48,.3))',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '44%',
              translate: '0 -50%',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'flex-start',
              padding: '16px 18px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,.55)',
              border: '1px solid rgba(255,255,255,.8)',
              boxShadow: '0 20px 40px rgba(10,20,48,.12)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          >
            <span style={{ font: '900 48px/1 Nunito,sans-serif', color: '#0A1430', letterSpacing: '-.03em' }}>
              48
            </span>
            <span style={{ maxWidth: '16ch', font: '600 14px/1.35 Nunito,sans-serif', color: '#5A5F70' }}>
              participants, formés pendant 1 mois
            </span>
          </div>
        </div>

        {/* Colonne droite Mobile */}
        <div
          className="flex md:hidden flex-col items-center gap-4 min-w-0"
          style={{ marginTop: '16px' }}
        >
          <img
            src="/images/9aad4d4a-6846-4e6b-ab8e-71d6fd6e428c.webp"
            alt="Statue de la Justice"
            style={{
              display: 'block',
              width: 'min(100%,360px)',
              height: 'auto',
              filter:
                'drop-shadow(3px 0 0 #111) drop-shadow(-3px 0 0 #111) drop-shadow(0 3px 0 #111) drop-shadow(0 -3px 0 #111) drop-shadow(0 24px 30px rgba(10,20,48,.3))',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '18px',
              background: 'rgba(255,255,255,.6)',
              border: '1px solid rgba(255,255,255,.85)',
              boxShadow: '0 14px 30px rgba(10,20,48,.12)',
            }}
          >
            <span style={{ font: '900 40px/1 Nunito,sans-serif', color: '#0A1430', letterSpacing: '-.03em' }}>
              48
            </span>
            <span style={{ maxWidth: '18ch', font: '600 14px/1.35 Nunito,sans-serif', color: '#5A5F70' }}>
              participants, formés pendant 1 mois
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
