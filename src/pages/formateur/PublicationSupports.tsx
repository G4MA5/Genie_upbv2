import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface SupportItem {
  id: string;
  s: string; // Séance
  t: string; // Titre
  k: string; // Type (Document, Vidéo, Exercice, Lien)
  d: string; // Date
}

/**
 * ============================================================================
 * SUPPORTS DE COURS FORMATEUR (ÉCRANS F2 & F2a DU PROTOTYPE)
 * ============================================================================
 * 100% fidèle au prototype scripts/proto_real.html L612565-614500 :
 * F2 Supports :
 *   - En-tête avec Titre "Supports" + Bouton "+ Publier" en orange #E8742A
 *   - Bannière verte de succès "✓ Support publié. Les équipes sont notifiées."
 *   - Liste des cartes supports avec badge type #F2F0EA, date, titre et séance
 * F2a Publier un support :
 *   - Bouton fermer rond "×"
 *   - Titre "Publier un support"
 *   - Champ Titre (Checklist prototype) avec bordure 2px #0E1E4A
 *   - Sélecteur Séance ("Prototypage rapide · 7 janv. ▾")
 *   - Sélecteur Catégorie ("Innovation ▾")
 *   - Bascule Fichier / Lien
 *   - Fiche fichier uploadé avec icône PDF, jauge verte 70% et checklist-prototype.pdf
 *   - Bouton pilule "Publier" sombre #0E1E4A
 * ============================================================================
 */
export default function PublicationSupports() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mode d'affichage : 'liste' (F2) ou 'publier' (F2a)
  const initialMode = searchParams.get('action') === 'publier' ? 'publier' : 'liste';
  const [mode, setMode] = useState<'liste' | 'publier'>(initialMode);

  // Synchronisation avec les query params (ex: via le drawer F2a)
  useEffect(() => {
    if (searchParams.get('action') === 'publier') {
      setMode('publier');
    }
  }, [searchParams]);

  const switchMode = (newMode: 'liste' | 'publier') => {
    setMode(newMode);
    if (newMode === 'publier') {
      setSearchParams({ action: 'publier' });
    } else {
      setSearchParams({});
    }
  };

  // 1. Données authentiques des supports F2 du prototype (L686029)
  const [supports, setSupports] = useState<SupportItem[]>([
    {
      id: 'sup-1',
      s: 'Atelier pitch',
      t: 'Trame de pitch en 7 minutes',
      k: 'Document',
      d: '4 janv.',
    },
    {
      id: 'sup-2',
      s: 'Atelier pitch',
      t: 'Replay de la séance',
      k: 'Vidéo',
      d: '4 janv.',
    },
    {
      id: 'sup-3',
      s: 'Prototypage rapide',
      t: 'Fiche maquette papier',
      k: 'Exercice',
      d: '6 janv.',
    },
    {
      id: 'sup-4',
      s: 'Étude de marché',
      t: 'Banque d’études de marché',
      k: 'Lien',
      d: '28 déc.',
    },
  ]);

  // Formulaire F2a
  const [titleInput, setTitleInput] = useState<string>('Checklist prototype');
  const [selectedSession, setSelectedSession] = useState<string>('Prototypage rapide · 7 janv.');
  const [selectedCategory, setSelectedCategory] = useState<string>('Innovation');
  const [mediaType, setMediaType] = useState<'fichier' | 'lien'>('fichier');
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(true);

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newSupport: SupportItem = {
      id: `sup-${Date.now()}`,
      s: selectedSession.split('·')[0].trim(),
      t: titleInput.trim(),
      k: mediaType === 'fichier' ? 'Document' : 'Lien',
      d: 'Auj.',
    };

    setSupports([newSupport, ...supports]);
    setShowSuccessBanner(true);
    switchMode('liste');
    toast.success('Support publié. Les équipes sont notifiées.');
  };

  return (
    <div
      data-screen-label={mode === 'publier' ? 'F2a Publier un support' : 'F2 Supports'}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#F6F8FC',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="p-4 sm:p-6 md:py-8 md:px-8"
    >
      <div className="w-full max-w-[560px] md:max-w-[880px] lg:max-w-[1020px] mx-auto flex flex-col gap-4">
        {/* ==================================================================
            VUE 1 : F2 SUPPORTS (LISTE DES SUPPORTS)
            ================================================================== */}
        {mode === 'liste' && (
          <div className="flex flex-col gap-3.5 md:gap-4">
            {/* Ligne haute : Titre Supports + Bouton + Publier */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  margin: 0,
                  font: "800 36px/1 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  letterSpacing: '-.02em',
                }}
              >
                Supports
              </h1>

              <button
                type="button"
                onClick={() => switchMode('publier')}
                style={{
                  minHeight: '46px',
                  padding: '0 18px',
                  borderRadius: '999px',
                  background: '#E8742A',
                  color: '#0A1430',
                  font: "700 15px 'Nunito', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(232,116,42,.25)',
                  transition: 'transform .15s, opacity .15s',
                }}
                className="hover:scale-[1.02] active:scale-[0.98]"
              >
                + Publier
              </button>
            </div>

            {/* Bannière de notification verte authentique */}
            {showSuccessBanner && (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: '#DFF2E7',
                  color: '#17744B',
                  font: "600 15px 'Nunito', sans-serif",
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 800 }}>✓</span>
                <span>Support publié. Les équipes sont notifiées.</span>
              </div>
            )}

            {/* Liste des cartes supports exactes du prototype */}
            <div className="flex flex-col gap-3 md:gap-4 mt-1">
              {supports.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: '#fff',
                    borderRadius: '18px',
                    boxShadow: '0 4px 16px rgba(14,30,74,.04)',
                  }}
                  className="p-3.5 sm:p-4 md:p-6 flex flex-col gap-1.5 md:gap-2.5 transition-shadow hover:shadow-md"
                >
                  {/* Ligne haute : Badge format (Document/Vidéo/Exercice/Lien) & Date */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: '#F2F0EA',
                        font: "700 12px 'Nunito', sans-serif",
                        color: '#4A5168',
                      }}
                    >
                      {r.k}
                    </span>

                    <span
                      style={{
                        font: "500 13px 'Nunito', sans-serif",
                        color: '#6A7189',
                      }}
                    >
                      {r.d}
                    </span>
                  </div>

                  {/* Titre du support */}
                  <span
                    style={{
                      font: "700 16px 'Nunito', sans-serif",
                      color: '#0E1E4A',
                    }}
                    className="md:text-[18px]"
                  >
                    {r.t}
                  </span>

                  {/* Séance rattachée */}
                  <span
                    style={{
                      font: "500 14px 'Nunito', sans-serif",
                      color: '#6A7189',
                    }}
                  >
                    Séance : {r.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            VUE 2 : F2a PUBLIER UN SUPPORT (FORMULAIRE D'AJOUT)
            ================================================================== */}
        {mode === 'publier' && (
          <form onSubmit={handlePublishSubmit} className="flex flex-col gap-3.5 md:gap-4">
            {/* Bouton retour rond exact × */}
            <div>
              <button
                type="button"
                onClick={() => switchMode('liste')}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: "700 20px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(14,30,74,.05)',
                  cursor: 'pointer',
                }}
                className="hover:bg-slate-50 transition-colors"
                title="Fermer"
              >
                ×
              </button>
            </div>

            {/* Titre H1 Publier un support */}
            <h1
              style={{
                margin: '2px 0 6px 0',
                font: "800 34px/1 'Nunito', sans-serif",
                color: '#0E1E4A',
                letterSpacing: '-.02em',
              }}
            >
              Publier un support
            </h1>

            {/* Champ Titre */}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ font: "600 15px 'Nunito', sans-serif", color: '#0E1E4A' }}>
                Titre
              </span>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                required
                style={{
                  minHeight: '50px',
                  borderRadius: '14px',
                  border: '2px solid #0E1E4A',
                  background: '#fff',
                  padding: '0 14px',
                  font: "500 16px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </label>

            {/* Champ Séance */}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ font: "600 15px 'Nunito', sans-serif", color: '#0E1E4A' }}>
                Séance
              </span>
              <div
                style={{
                  minHeight: '50px',
                  borderRadius: '14px',
                  border: '1.5px solid #D6D2C8',
                  background: '#fff',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  font: "500 16px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                }}
              >
                <span>{selectedSession}</span>
                <span style={{ color: '#6A7189' }}>▾</span>
              </div>
            </label>

            {/* Champ Catégorie */}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ font: "600 15px 'Nunito', sans-serif", color: '#0E1E4A' }}>
                Catégorie
              </span>
              <div
                style={{
                  minHeight: '50px',
                  borderRadius: '14px',
                  border: '1.5px solid #D6D2C8',
                  background: '#fff',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  font: "500 16px 'Nunito', sans-serif",
                  color: '#0E1E4A',
                }}
              >
                <span>{selectedCategory}</span>
                <span style={{ color: '#6A7189' }}>▾</span>
              </div>
            </label>

            {/* Sélecteur Fichier / Lien */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                marginTop: '2px',
              }}
            >
              <button
                type="button"
                onClick={() => setMediaType('fichier')}
                style={{
                  minHeight: '46px',
                  borderRadius: '12px',
                  background: mediaType === 'fichier' ? '#0E1E4A' : 'transparent',
                  color: mediaType === 'fichier' ? '#fff' : '#0E1E4A',
                  border: mediaType === 'fichier' ? 'none' : '1.5px solid #D6D2C8',
                  font: "700 15px 'Nunito', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background .15s, color .15s',
                }}
              >
                Fichier
              </button>

              <button
                type="button"
                onClick={() => setMediaType('lien')}
                style={{
                  minHeight: '46px',
                  borderRadius: '12px',
                  background: mediaType === 'lien' ? '#0E1E4A' : 'transparent',
                  color: mediaType === 'lien' ? '#fff' : '#0E1E4A',
                  border: mediaType === 'lien' ? 'none' : '1.5px solid #D6D2C8',
                  font: "600 15px 'Nunito', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background .15s, color .15s',
                }}
              >
                Lien
              </button>
            </div>

            {/* Fiche de fichier PDF uploadé à 70% exacte du prototype */}
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                boxShadow: '0 4px 16px rgba(14,30,74,.04)',
                marginTop: '2px',
              }}
            >
              {/* Icône PDF rose/rouge exacte */}
              <div
                style={{
                  flex: 'none',
                  width: '40px',
                  height: '48px',
                  borderRadius: '8px',
                  background: '#FBE6E3',
                  color: '#B4281F',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '7px',
                  font: "800 11px 'JetBrains Mono', monospace",
                }}
              >
                PDF
              </div>

              {/* Nom du fichier et barre de progression */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    font: "700 15px 'Nunito', sans-serif",
                    color: '#0E1E4A',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  checklist-prototype.pdf
                </span>

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
                      width: '70%',
                      borderRadius: '3px',
                      background: '#17744B',
                    }}
                  />
                </div>
              </div>

              {/* Pourcentage */}
              <span
                style={{
                  font: "600 13px 'Nunito', sans-serif",
                  color: '#6A7189',
                }}
              >
                70 %
              </span>
            </div>

            {/* Bouton pilule Publier */}
            <button
              type="submit"
              style={{
                minHeight: '54px',
                borderRadius: '999px',
                background: '#0E1E4A',
                color: '#fff',
                font: "800 17px 'Nunito', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                marginTop: '6px',
                boxShadow: '0 10px 24px rgba(14,30,74,.18)',
                transition: 'opacity .15s',
              }}
              className="hover:opacity-95 active:scale-[0.99]"
            >
              Publier
            </button>
          </form>
        )}

        {/* Espaceur bas pour dégager la barre de navigation capsule */}
        <div aria-hidden="true" style={{ flex: 'none', height: '100px' }} />
      </div>
    </div>
  );
}
