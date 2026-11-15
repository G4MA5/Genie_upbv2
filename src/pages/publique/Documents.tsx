import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { documentsData, DocumentItem } from '../../data/documentsData';

export default function Documents() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadingId(doc.id);
    toast.success(`Téléchargement lancé : ${doc.t}`);

    // Téléchargement réel d'un fichier PDF factice conforme
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
      // Fallback gracieux
    }

    setTimeout(() => {
      setDownloadingId(null);
    }, 800);
  };

  return (
    <div
      data-screen-label="S4 Documents"
      style={{
        position: 'relative',
        width: '100%',
        background: '#F6F8FC',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '18px',
        paddingRight: '18px',
        paddingTop: '84px',
        paddingBottom: '40px',
      }}
      className="md:pt-[120px]"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* En-tête officiel S4 */}
        <span
          style={{
            font: "600 13px 'JetBrains Mono', monospace",
            color: '#2F6BF0',
            letterSpacing: '.04em',
          }}
        >
          DOCUMENTS
        </span>

        <h1
          style={{
            margin: 0,
            font: "800 38px/1.05 'Nunito', sans-serif",
            color: '#0E1E4A',
            letterSpacing: '-.02em',
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

        {/* Liste des cartes Documents exactes du prototype */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '2px' }}>
          {documentsData.map((d) => {
            const isDownloading = downloadingId === d.id;
            return (
              <div
                key={d.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 20px rgba(14,30,74,.04)',
                }}
              >
                {/* Ligne haute : Icône PDF & Textes */}
                <div style={{ display: 'flex', gap: '14px' }}>
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
                    }}
                  >
                    PDF
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        font: "800 18px/1.2 'Nunito', sans-serif",
                        color: '#0E1E4A',
                      }}
                    >
                      {d.t}
                    </span>
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
                      padding: '0 16px',
                      borderRadius: '999px',
                      background: '#0E1E4A',
                      color: '#fff',
                      font: "600 14px 'Nunito', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      cursor: isDownloading ? 'default' : 'pointer',
                      border: 'none',
                      outline: 'none',
                      transition: 'opacity .15s',
                      opacity: isDownloading ? 0.7 : 1,
                    }}
                  >
                    <span>{isDownloading ? '✓ Lancé' : '↓ Télécharger'}</span>
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
