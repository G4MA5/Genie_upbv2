import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * ============================================================================
 * PROTOTYPE NAV DRAWER (MENU DEV FLOTTANT EN BAS À GAUCHE)
 * ============================================================================
 * Reproduit à l'identique le menu burger du prototype officiel (Prototype (4).html).
 * Positionné en bas à gauche à sa place initiale.
 * Contient la liste exacte et à jour des 37 écrans du concours.
 */

interface ScreenItem {
  code: string;
  label: string;
  path: string;
  status: 'done' | 'todo';
}

interface ScreenGroup {
  title: string;
  items: ScreenItem[];
}

const GROUPS: ScreenGroup[] = [
  {
    title: 'SITE PUBLIC',
    items: [
      { code: 'S1', label: 'Accueil', path: '/', status: 'done' },
      { code: 'S2', label: 'Concours et catégories', path: '/concours', status: 'done' },
      { code: 'S2a', label: 'Fiche catégorie', path: '/concours/technologie', status: 'done' },
      { code: 'ST', label: 'Catégorie Technologie', path: '/concours/technologie', status: 'done' },
      { code: 'SI', label: 'Catégorie Innovation', path: '/concours/innovation', status: 'done' },
      { code: 'SE', label: 'Catégorie Économie', path: '/concours/economie', status: 'done' },
      { code: 'SD', label: 'Catégorie Droit', path: '/concours/droit', status: 'done' },
      { code: 'S3', label: 'Calendrier et lieu', path: '/calendrier', status: 'done' },
      { code: 'S4', label: 'Documents', path: '/documents', status: 'done' },
      { code: 'S5', label: 'FAQ et contacts', path: '/faq-contact', status: 'done' },
      { code: 'S6', label: 'Actualités', path: '/actualites', status: 'done' },
      { code: 'A', label: 'Article', path: '/actualites/ceremonie-lancement-2026', status: 'done' },
      { code: 'S7', label: 'Partenaires', path: '/partenaires', status: 'done' },
      { code: 'S8', label: 'Créer un compte', path: '/inscription', status: 'done' },
      { code: 'S9', label: 'Connexion', path: '/connexion', status: 'done' },
      { code: 'GB', label: 'Bientôt ouvertes', path: '/inscription?state=upcoming', status: 'done' },
      { code: 'GC', label: 'Inscriptions closes', path: '/inscription?state=closed', status: 'done' },
    ],
  },
  {
    title: 'PARTICIPANT',
    items: [
      { code: 'P1', label: 'Mon espace', path: '/espace/dashboard', status: 'done' },
      { code: 'P2', label: 'Mon profil', path: '/espace/profil', status: 'done' },
      { code: 'P3', label: 'Mon équipe (sans)', path: '/espace/equipe?state=empty', status: 'done' },
      { code: 'P3t', label: 'Mon équipe (avec)', path: '/espace/equipe', status: 'done' },
      { code: 'P3a', label: 'Créer une équipe', path: '/espace/equipe/creer', status: 'done' },
      { code: 'P3b', label: 'Invitations', path: '/espace/equipe/invitations', status: 'done' },
      { code: 'P3c', label: 'Membres', path: '/espace/equipe/membres', status: 'done' },
      { code: 'P3d', label: 'Règlement et chartes', path: '/espace/equipe/charte', status: 'done' },
      { code: 'P3e', label: 'Soumettre', path: '/espace/equipe/soumettre', status: 'done' },
      { code: 'P4', label: 'Statut', path: '/espace/statut', status: 'done' },
      { code: 'P5', label: 'Formations', path: '/espace/formations', status: 'done' },
      { code: 'P5a', label: 'Calendrier', path: '/espace/formations/planning', status: 'done' },
      { code: 'P5b', label: 'Supports', path: '/espace/formations/supports', status: 'done' },
      { code: 'P5c', label: 'Séance à distance', path: '/espace/formations/visio', status: 'done' },
      { code: 'P5d', label: 'Assiduité', path: '/espace/formations/presence', status: 'done' },
      { code: 'P5e', label: 'Annonces', path: '/espace/formations/annonces', status: 'done' },
    ],
  },
  {
    title: 'RESPONSABLE',
    items: [
      { code: 'R1', label: 'Tableau de bord', path: '/admin/dashboard', status: 'done' },
      { code: 'R1a', label: 'Fiche équipe', path: '/admin/equipes/1', status: 'done' },
      { code: 'R1b', label: 'Quotas & attente', path: '/admin/quotas', status: 'done' },
      { code: 'R1c', label: 'Export PCO', path: '/admin/export', status: 'done' },
      { code: 'R2', label: 'Formations', path: '/admin/formations', status: 'done' },
      { code: 'R2c', label: 'Assiduité', path: '/admin/formations?tab=presence', status: 'done' },
    ],
  },
  {
    title: 'FORMATEUR',
    items: [
      { code: 'F1', label: 'Séances', path: '/formateur/seances', status: 'done' },
      { code: 'F1a', label: 'Calendrier', path: '/formateur/seances', status: 'done' },
      { code: 'F1b', label: 'Présence par scan', path: '/formateur/seances/scan-qr', status: 'done' },
      { code: 'F2', label: 'Supports', path: '/formateur/supports', status: 'done' },
      { code: 'F2a', label: 'Publier un support', path: '/formateur/supports', status: 'done' },
      { code: 'F3', label: 'Annonces', path: '/formateur/annonces', status: 'done' },
    ],
  },
];

export function PrototypeNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Filtrage rapide selon recherche
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return GROUPS;
    const q = search.toLowerCase().trim();
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter(
        (it) => it.code.toLowerCase().includes(q) || it.label.toLowerCase().includes(q)
      ),
    })).filter((g) => g.items.length > 0);
  }, [search]);

  // Code de l'écran actif
  const currentCode = useMemo(() => {
    const full = location.pathname + location.search;
    for (const group of GROUPS) {
      for (const item of group.items) {
        if (full === item.path || location.pathname === item.path) return item.code;
      }
    }
    if (location.pathname.startsWith('/concours/')) {
      if (location.pathname.includes('technologie')) return 'ST';
      if (location.pathname.includes('innovation')) return 'SI';
      if (location.pathname.includes('economie')) return 'SE';
      if (location.pathname.includes('droit')) return 'SD';
    }
    return null;
  }, [location.pathname, location.search]);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. BOUTON FLOTTANT BURGER (En bas à gauche à sa place initiale) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Menu du prototype (Navigation écrans)"
        aria-label="Menu du prototype"
        style={{
          position: 'fixed',
          left: '18px',
          bottom: '18px',
          zIndex: 9999,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          background: 'rgba(10, 20, 48, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: '#fff',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: isOpen ? '22px' : '20px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {isOpen ? (
          '✕'
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <span>☰</span>
            {currentCode && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  background: '#E8742A',
                  color: '#fff',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0,0,0,.35)',
                }}
              >
                {currentCode}
              </span>
            )}
          </span>
        )}
      </button>

      {/* 2. OVERLAY BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9997,
            background: 'rgba(4, 10, 24, 0.65)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* 3. TIROIR / ASIDE DU PROTOTYPE (Ouverture fluide depuis la gauche) */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '320px',
          maxWidth: '85vw',
          zIndex: 9998,
          background: '#0A1430',
          color: '#fff',
          padding: '20px 16px 80px 16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '8px 0 32px rgba(0,0,0,0.5)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          visibility: isOpen ? 'visible' : 'hidden',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        {/* EN-TÊTE AUTHENTIQUE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: '11px',
                color: '#F2C45A',
                letterSpacing: '.06em',
              }}
            >
              PROTOTYPE CLIQUABLE
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#7F8BB0',
              }}
            >
              v4.0
            </span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '22px', color: '#fff', letterSpacing: '-0.02em' }}>
            GÉNIE UPB 2026
          </span>
        </div>

        {/* RECHERCHE RAPIDE */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un écran (ex: P1, Équipe...)"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '38px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(255, 255, 255, 0.06)',
            color: '#fff',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '13px',
            padding: '0 12px',
            outline: 'none',
          }}
        />

        {/* LISTE DES GROUPES D'ÉCRANS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredGroups.map((group) => (
            <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: '11px',
                  color: '#7F8BB0',
                  letterSpacing: '.06em',
                  padding: '6px 8px',
                  textTransform: 'uppercase',
                }}
              >
                {group.title}
              </span>
              {group.items.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.code === 'ST' && location.pathname.includes('/technologie')) ||
                  (item.code === 'SI' && location.pathname.includes('/innovation')) ||
                  (item.code === 'SE' && location.pathname.includes('/economie')) ||
                  (item.code === 'SD' && location.pathname.includes('/droit'));

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item.path)}
                    style={{
                      minHeight: '34px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      padding: '0 10px',
                      borderRadius: '8px',
                      border: 0,
                      background: isActive ? 'rgba(255,255,255,.14)' : 'transparent',
                      color: isActive ? '#fff' : '#C9D1E8',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease',
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        width: '34px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        fontSize: '11px',
                        color: isActive ? '#E8742A' : '#7F8BB0',
                        flexShrink: 0,
                      }}
                    >
                      {item.code}
                    </span>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                    {item.status === 'done' ? (
                      <span
                        title="Écran terminé"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#10B981',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <span
                        title="En cours"
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default PrototypeNavDrawer;
