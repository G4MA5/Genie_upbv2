import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { documentsData, DocumentItem } from '../../data/documentsData';
import { Link } from 'react-router-dom';

export default function Documents() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState<boolean>(false);

  const triggerDownload = (filename: string, title: string) => {
    try {
      const dummyPdfContent = `%PDF-1.4\n%GÉNIE UPB 2026 - ${title}\n1 0 obj\n<< /Title (${title}) /Author (GÉNIE UPB) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
      const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {
      // Fallback gracieux
    }
  };

  const handleDownload = (doc: DocumentItem) => {
    setDownloadingId(doc.id);
    toast.success(`Téléchargement lancé : ${doc.t}`);
    triggerDownload(doc.t.replace(/[^a-zA-Z0-9À-ÿ_-]/g, '_'), doc.t);
    setTimeout(() => {
      setDownloadingId(null);
    }, 800);
  };

  const handleDownloadAll = () => {
    setDownloadingAll(true);
    toast.success('Téléchargement de tous les documents officiels en cours…');
    documentsData.forEach((doc, idx) => {
      setTimeout(() => {
        triggerDownload(doc.t.replace(/[^a-zA-Z0-9À-ÿ_-]/g, '_'), doc.t);
      }, idx * 250);
    });
    setTimeout(() => {
      setDownloadingAll(false);
      toast.success('Pack complet téléchargé avec succès !');
    }, documentsData.length * 250 + 400);
  };

  return (
    <div
      data-screen-label="S4 Documents"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#EEF3FB',
        boxSizing: 'border-box',
        paddingTop: '144px',
        paddingBottom: '64px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Grand Conteneur En-tête & Pack complet */}
        <div
          style={{
            background: '#fff',
            borderRadius: '32px',
            padding: '36px 40px',
            boxShadow: '0 20px 50px rgba(14,30,74,.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '720px' }}>
            <span
              style={{
                font: "600 13px 'JetBrains Mono', monospace",
                color: '#2F63D0',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              DOCUMENTS OFFICIELS DU CONCOURS
            </span>
            <h1
              style={{
                margin: 0,
                font: "800 clamp(32px, 4vw, 46px)/1.05 'Nunito', sans-serif",
                color: '#0A1430',
                letterSpacing: '-0.02em',
              }}
            >
              Règlement et documents
            </h1>
            <p
              style={{
                margin: 0,
                font: "400 17px/1.6 'Nunito', sans-serif",
                color: '#4A5168',
              }}
            >
              À lire avant de soumettre votre équipe. Chaque membre accepte le règlement et les chartes
              depuis son espace candidat avant la clôture des inscriptions le 18 décembre.
            </p>
          </div>

          {/* Bouton Télécharger l'ensemble du pack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <button
              onClick={handleDownloadAll}
              disabled={downloadingAll}
              style={{
                minHeight: '52px',
                padding: '0 26px',
                borderRadius: '999px',
                background: downloadingAll ? '#2F63D0' : '#0A1430',
                color: '#fff',
                font: "800 15px 'Nunito', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: downloadingAll ? 'default' : 'pointer',
                border: 'none',
                boxShadow: '0 10px 24px rgba(10,20,48,.18)',
                transition: 'all .2s ease',
              }}
              onMouseEnter={(e) => {
                if (!downloadingAll) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(10,20,48,.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!downloadingAll) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(10,20,48,.18)';
                }
              }}
            >
              <span>{downloadingAll ? '⏳ Téléchargement du pack…' : '↓ Tout télécharger (4,7 Mo)'}</span>
            </button>
            <span style={{ font: "500 12px 'Nunito', sans-serif", color: '#8A8FA3', paddingLeft: '8px' }}>
              4 fichiers PDF certifiés 2026
            </span>
          </div>
        </div>

        {/* Grille 2 colonnes des 4 Documents Officiels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: '24px',
          }}
        >
          {documentsData.map((d) => {
            const isDownloading = downloadingId === d.id;
            return (
              <div
                key={d.id}
                style={{
                  background: '#fff',
                  borderRadius: '26px',
                  padding: '24px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  boxShadow: '0 14px 34px rgba(14,30,74,.06)',
                  border: '1px solid rgba(14,30,74,.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 20px 42px rgba(14,30,74,.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(14,30,74,.06)';
                }}
              >
                {/* Ligne haute : Icône PDF & Contenu */}
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  {/* Icône PDF stylisée exacte du prototype */}
                  <div
                    style={{
                      flex: 'none',
                      width: '50px',
                      height: '62px',
                      borderRadius: '10px',
                      background: '#FBE6E3',
                      color: '#B4281F',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: '10px',
                      font: "800 12px 'JetBrains Mono', monospace",
                      boxShadow: 'inset 0 -2px 0 rgba(180,40,31,.2)',
                    }}
                  >
                    PDF
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          font: "800 20px/1.2 'Nunito', sans-serif",
                          color: '#0A1430',
                        }}
                      >
                        {d.t}
                      </span>
                      {d.tag ? (
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '999px',
                            font: "700 11px 'Nunito', sans-serif",
                            background: d.tag === 'Obligatoire' ? '#FBE6E3' : '#E8EEFA',
                            color: d.tag === 'Obligatoire' ? '#B4281F' : '#2F6BF0',
                          }}
                        >
                          {d.tag}
                        </span>
                      ) : null}
                    </div>

                    <span
                      style={{
                        font: "400 15px/1.5 'Nunito', sans-serif",
                        color: '#4A5168',
                      }}
                    >
                      {d.d}
                    </span>
                  </div>
                </div>

                {/* Ligne basse : Métadonnées & Bouton Télécharger */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    paddingTop: '14px',
                    borderTop: '1px solid #F2F4F8',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      font: "600 13px 'Nunito', sans-serif",
                      color: '#6A7189',
                    }}
                  >
                    {d.v} · {d.s}
                  </span>

                  <button
                    onClick={() => handleDownload(d)}
                    disabled={isDownloading}
                    style={{
                      minHeight: '44px',
                      padding: '0 20px',
                      borderRadius: '999px',
                      background: isDownloading ? '#2F63D0' : '#0A1430',
                      color: '#fff',
                      font: "700 14px 'Nunito', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: isDownloading ? 'default' : 'pointer',
                      border: 'none',
                      transition: 'all 0.18s ease',
                      boxShadow: '0 4px 14px rgba(10,20,48,.1)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isDownloading) {
                        e.currentTarget.style.background = '#1D3B8A';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDownloading) {
                        e.currentTarget.style.background = '#0A1430';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <span>{isDownloading ? '✓ Téléchargé' : '↓ Télécharger'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Processus d'engagement en 3 étapes */}
        <div
          style={{
            background: '#fff',
            borderRadius: '32px',
            padding: '36px 40px',
            boxShadow: '0 14px 34px rgba(14,30,74,.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              style={{
                font: "600 13px 'JetBrains Mono', monospace",
                color: '#2F63D0',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              COMMENT ÇA MARCHE
            </span>
            <h2
              style={{
                margin: 0,
                font: "800 26px/1.2 'Nunito', sans-serif",
                color: '#0A1430',
              }}
            >
              Processus d'approbation et d'engagement des équipes
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px',
            }}
          >
            {/* Étape 1 */}
            <div
              style={{
                background: '#F6F8FC',
                borderRadius: '20px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span
                style={{
                  font: "800 13px 'JetBrains Mono', monospace",
                  color: '#2F63D0',
                  background: '#E0EBFC',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  alignSelf: 'flex-start',
                }}
              >
                ÉTAPE 01
              </span>
              <h3 style={{ margin: 0, font: "800 17px 'Nunito', sans-serif", color: '#0A1430' }}>
                Lecture & concertation
              </h3>
              <p style={{ margin: 0, font: "400 14px/1.55 'Nunito', sans-serif", color: '#4A5168' }}>
                Téléchargez les documents ci-dessus et partagez-les avec vos coéquipiers pour en comprendre
                les règles et exigences techniques.
              </p>
            </div>

            {/* Étape 2 */}
            <div
              style={{
                background: '#F6F8FC',
                borderRadius: '20px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span
                style={{
                  font: "800 13px 'JetBrains Mono', monospace",
                  color: '#17744B',
                  background: '#E3F4EB',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  alignSelf: 'flex-start',
                }}
              >
                ÉTAPE 02
              </span>
              <h3 style={{ margin: 0, font: "800 17px 'Nunito', sans-serif", color: '#0A1430' }}>
                Signature numérique
              </h3>
              <p style={{ margin: 0, font: "400 14px/1.55 'Nunito', sans-serif", color: '#4A5168' }}>
                Chaque membre invité se connecte à son espace candidat pour valider individuellement son
                adhésion au règlement et aux chartes.
              </p>
            </div>

            {/* Étape 3 */}
            <div
              style={{
                background: '#F6F8FC',
                borderRadius: '20px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span
                style={{
                  font: "800 13px 'JetBrains Mono', monospace",
                  color: '#E8742A',
                  background: '#FFEBDC',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  alignSelf: 'flex-start',
                }}
              >
                ÉTAPE 03
              </span>
              <h3 style={{ margin: 0, font: "800 17px 'Nunito', sans-serif", color: '#0A1430' }}>
                Validation définitive
              </h3>
              <p style={{ margin: 0, font: "400 14px/1.55 'Nunito', sans-serif", color: '#4A5168' }}>
                Dès que tous les membres ont signé, le chef d'équipe soumet la candidature. L'équipe passe
                alors en validation auprès du jury UPB.
              </p>
            </div>
          </div>
        </div>

        {/* Encart sombre d'assistance juridique & FAQ */}
        <div
          style={{
            background: '#0A1430',
            color: '#fff',
            borderRadius: '32px',
            padding: '32px 38px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            boxShadow: '0 20px 50px rgba(10,20,48,.15)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '640px' }}>
            <span
              style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,.12)',
                color: '#F2C45A',
                borderRadius: '999px',
                font: "800 13px 'JetBrains Mono', monospace",
                alignSelf: 'flex-start',
              }}
            >
              ASSISTANCE & RÈGLEMENT
            </span>
            <h3 style={{ margin: 0, font: "800 24px 'Nunito', sans-serif" }}>
              Une question sur une clause ou un critère d'épreuve ?
            </h3>
            <p style={{ margin: 0, font: "400 15px/1.5 'Nunito', sans-serif", color: '#C9D1E8' }}>
              Consultez notre foire aux questions ou écrivez directement au secrétariat du concours à{' '}
              <strong style={{ color: '#fff' }}>contact@genie-upb.ci</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/faq-contact"
              style={{
                minHeight: '48px',
                padding: '0 22px',
                borderRadius: '999px',
                background: '#fff',
                color: '#0A1430',
                font: "800 15px 'Nunito', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(0,0,0,.2)',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Consulter la FAQ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
