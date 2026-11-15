import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { documentsData, DocumentItem } from '../../data/documentsData';

export default function Documents() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadingId(doc.id);
    toast.success(`Téléchargement lancé : ${doc.t}`);

    // Création d'un fichier PDF factice pour rendre le téléchargement effectif
    try {
      const dummyPdfContent = `%PDF-1.4\n%GÉNIE UPB 2026 - ${doc.t}\n1 0 obj\n<< /Title (${doc.t}) /Author (GÉNIE UPB) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
      const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.t.replace(/[^a-zA-Z0-9À-ÿ_-]/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {
      // Fallback gracieux si l'API Blob est restreinte
    }

    setTimeout(() => {
      setDownloadingId(null);
    }, 900);
  };

  return (
    <div
      data-screen-label="S4 Documents"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#F6F8FC',
        boxSizing: 'border-box',
        paddingTop: '96px',
        paddingBottom: '48px',
        paddingLeft: '18px',
        paddingRight: '18px',
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* En-tête officiel S4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              font: "600 13px 'JetBrains Mono', monospace",
              color: '#2F6BF0',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            DOCUMENTS
          </span>
          <h1
            style={{
              margin: 0,
              font: "800 clamp(30px, 4.5vw, 38px)/1.08 'Nunito', sans-serif",
              color: '#0E1E4A',
              letterSpacing: '-0.02em',
            }}
          >
            Règlement et documents
          </h1>
          <p
            style={{
              margin: 0,
              font: "400 16px/1.55 'Nunito', sans-serif",
              color: '#4A5168',
            }}
          >
            À lire avant de soumettre votre équipe. Chaque membre accepte le règlement et les chartes
            depuis son espace.
          </p>
        </div>

        {/* Liste des cartes Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
          {documentsData.map((d) => {
            const isDownloading = downloadingId === d.id;
            return (
              <div
                key={d.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 20px rgba(14,30,74,.04)',
                  border: '1px solid rgba(14,30,74,.03)',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(14,30,74,.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,30,74,.04)';
                }}
              >
                {/* Ligne haute : Icône PDF & Textes */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  {/* Icône PDF stylisée exacte du prototype */}
                  <div
                    style={{
                      flex: 'none',
                      width: '44px',
                      height: '54px',
                      borderRadius: '8px',
                      background: '#FBE6E3',
                      color: '#B4281F',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: '8px',
                      font: "800 11px 'JetBrains Mono', monospace",
                      boxShadow: 'inset 0 -2px 0 rgba(180,40,31,.15)',
                    }}
                  >
                    PDF
                  </div>

                  {/* Titre & Description */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      minWidth: 0,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          font: "800 18px/1.2 'Nunito', sans-serif",
                          color: '#0E1E4A',
                        }}
                      >
                        {d.t}
                      </span>
                      {d.tag ? (
                        <span
                          style={{
                            padding: '2px 8px',
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
                        font: "400 15px/1.45 'Nunito', sans-serif",
                        color: '#4A5168',
                      }}
                    >
                      {d.d}
                    </span>
                  </div>
                </div>

                {/* Ligne basse : Métadonnées (version · taille) & Bouton Télécharger */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    paddingTop: '4px',
                    borderTop: '1px solid #F4F6FB',
                  }}
                >
                  <span
                    style={{
                      font: "500 13px 'Nunito', sans-serif",
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
                      padding: '0 18px',
                      borderRadius: '999px',
                      background: isDownloading ? '#2F6BF0' : '#0E1E4A',
                      color: '#fff',
                      font: "600 14px 'Nunito', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: isDownloading ? 'default' : 'pointer',
                      border: 'none',
                      outline: 'none',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 12px rgba(14,30,74,.12)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isDownloading) {
                        e.currentTarget.style.background = '#1D3B8A';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDownloading) {
                        e.currentTarget.style.background = '#0E1E4A';
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
      </div>
    </div>
  );
}
