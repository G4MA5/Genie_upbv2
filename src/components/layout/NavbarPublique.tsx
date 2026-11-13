import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import logoUpb from '../../assets/images/logo_genie_upb.png';
import catTech from '../../assets/images/cat_a.png';
import catInno from '../../assets/images/cat_b.png';
import catEco from '../../assets/images/cat_c.png';
import catDroit from '../../assets/images/cat_d.png';

export const NavbarPublique: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isAccueil = location.pathname === '/';
  const isConcours = location.pathname.startsWith('/concours') || location.pathname.startsWith('/fiche-categorie');
  const isActualites = location.pathname.startsWith('/actualites');

  const menuCats = [
    {
      name: '01. Technologie',
      size: 'Agriculture connectée · 6 places',
      img: catTech,
      path: '/fiche-categorie/technologie',
    },
    {
      name: '02. Innovation',
      size: 'Pitch startup & incubateur · 3 places',
      img: catInno,
      path: '/fiche-categorie/innovation',
    },
    {
      name: '03. Économie',
      size: 'Portefeuille simulé · 8 places',
      img: catEco,
      path: '/fiche-categorie/economie',
    },
    {
      name: '04. Droit',
      size: 'Procès simulé · Complet',
      img: catDroit,
      path: '/fiche-categorie/droit',
    },
  ];

  return (
    <>
      {/* ========================================================
          1. EXACT DESKTOP HEADER (Identique au Prototype HTML & img1)
          ======================================================== */}
      {isDesktop ? (
        <header
          style={{
            position: 'fixed',
            top: '18px',
            left: 0,
            right: 0,
            zIndex: 200,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <nav
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 5px 5px 10px',
              borderRadius: '999px',
              background: '#0E1E4A',
              boxShadow: '0 12px 30px rgba(10,20,48,.35)',
              userSelect: 'none',
            }}
          >
            {/* LOGO */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logoUpb}
                alt="GÉNIE UPB"
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  height: '34px',
                  width: 'auto',
                  display: 'block',
                  flex: 'none',
                }}
              />
            </Link>

            {/* LIENS DE NAVIGATION */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                gap: '2px',
                margin: '0 6px',
              }}
            >
              {/* ACCUEIL */}
              <Link
                to="/"
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  position: 'relative',
                  zIndex: 1,
                  minHeight: '38px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  background: isAccueil ? 'rgba(255,255,255,.12)' : 'transparent',
                  color: '#fff',
                  font: '500 16px Nunito, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'background .2s',
                }}
              >
                Accueil
              </Link>

              {/* CONCOURS + MENU DÉROULANT AU SURVOL */}
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                style={{ position: 'relative', display: 'flex' }}
              >
                <Link
                  to="/concours"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '38px',
                    padding: '0 14px',
                    borderRadius: '999px',
                    background: isConcours ? 'rgba(255,255,255,.12)' : 'transparent',
                    color: '#fff',
                    font: '500 16px Nunito, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'background .2s',
                  }}
                >
                  <span>Concours</span>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>▾</span>
                </Link>

                {/* CARTE DÉROULANTE SOUS-MENU */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      paddingTop: '14px',
                      zIndex: 300,
                    }}
                  >
                    <div
                      style={{
                        width: '520px',
                        padding: '10px',
                        borderRadius: '24px',
                        background: '#0E1E4A',
                        border: '1px solid rgba(255,255,255,.16)',
                        boxShadow: '0 24px 50px rgba(10,20,48,.45)',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '6px',
                      }}
                    >
                      {menuCats.map((mc) => (
                        <Link
                          key={mc.name}
                          to={mc.path}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition: 'background .25s',
                          }}
                          className="hover:bg-white/10"
                        >
                          <span
                            style={{
                              width: '56px',
                              height: '56px',
                              flex: 'none',
                              borderRadius: '14px',
                              backgroundImage: `url(${mc.img})`,
                              backgroundPosition: 'center 22%',
                              backgroundSize: 'cover',
                              backgroundColor: '#E6EAF1',
                            }}
                          />
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                            <span style={{ font: '800 18px/1 Nunito,sans-serif', color: '#fff' }}>
                              {mc.name}
                            </span>
                            <span style={{ font: '500 13px Nunito,sans-serif', color: '#AEB8D6' }}>
                              {mc.size}
                            </span>
                          </span>
                        </Link>
                      ))}

                      <Link
                        to="/concours"
                        style={{
                          gridColumn: '1 / -1',
                          minHeight: '44px',
                          marginTop: '4px',
                          borderRadius: '14px',
                          background: 'rgba(255,255,255,.08)',
                          color: '#A9C2FF',
                          font: '700 15px Nunito,sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          transition: 'background .2s, color .2s',
                        }}
                        className="hover:bg-white/15 hover:text-white"
                      >
                        Toutes les catégories →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTUALITÉS */}
              <Link
                to="/actualites"
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  minHeight: '38px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  background: isActualites ? 'rgba(255,255,255,.12)' : 'transparent',
                  color: '#fff',
                  font: '500 16px Nunito, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'background .2s',
                }}
              >
                Actualités
              </Link>
            </div>

            {/* BOUTON INSCRIPTION */}
            <Link
              to="/inscription"
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                minHeight: '40px',
                padding: '0 18px',
                borderRadius: '999px',
                background: '#fff',
                color: '#0E1E4A',
                font: '600 16px Nunito,sans-serif',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,.1)',
                transition: 'transform .15s, opacity .15s',
              }}
              className="hover:opacity-95 active:scale-95"
            >
              Inscription
            </Link>
          </nav>
        </header>
      ) : (
        /* ========================================================
            2. EXACT MOBILE HEADER (md:hidden)
            ======================================================== */
        <header
          style={{
            position: 'fixed',
            top: '18px',
            left: 0,
            right: 0,
            zIndex: 200,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              pointerEvents: 'auto',
              width: 'calc(100% - 28px)',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* BOUTON BURGER PROTOTYPE */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
              style={{
                justifySelf: 'start',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,.25)',
                background: '#0E1E4A',
                boxShadow: '0 10px 24px rgba(10,20,48,.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <span style={{ width: '20px', height: '2.5px', borderRadius: '2px', background: '#fff' }} />
              <span style={{ width: '20px', height: '2.5px', borderRadius: '2px', background: '#fff' }} />
              <span style={{ width: '12px', height: '2.5px', borderRadius: '2px', background: '#F58220', marginRight: '8px' }} />
            </button>

            {/* LOGO CENTRÉ */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={logoUpb}
                alt="GÉNIE UPB"
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  height: '46px',
                  width: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 14px rgba(10,20,48,.35))',
                }}
              />
            </Link>

            {/* BOUTON S'INSCRIRE DÉGRADÉ */}
            <Link
              to="/inscription"
              style={{
                justifySelf: 'end',
                minHeight: '44px',
                padding: '0 14px',
                borderRadius: '14px',
                border: '3px solid #fff',
                background: 'linear-gradient(180deg,#FF9A3D,#E8621A)',
                color: '#fff',
                font: '900 14px Nunito,sans-serif',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 10px 24px rgba(232,98,26,.35)',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              S'inscrire
            </Link>
          </div>
        </header>
      )}

      {/* ========================================================
          3. MOBILE FULLSCREEN OVERLAY MENU
          ======================================================== */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: '#0A1430',
            backgroundImage:
              'linear-gradient(rgba(29,91,181,.3) 2px,transparent 2px),linear-gradient(90deg,rgba(29,91,181,.3) 2px,transparent 2px)',
            backgroundSize: '88px 88px',
            display: 'flex',
            flexDirection: 'column',
            padding: '28px 24px 32px 26px',
            boxSizing: 'border-box',
            overflow: 'auto',
          }}
          className="animate-fadeIn"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <img src={logoUpb} alt="GÉNIE UPB" style={{ height: '44px', width: 'auto' }} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                marginLeft: 'auto',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,.2)',
                background: 'rgba(255,255,255,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>
          </div>

          <nav style={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 0',
                font: '900 32px/1 Nunito,sans-serif',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Accueil
            </Link>

            <Link
              to="/concours"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 0',
                font: '900 32px/1 Nunito,sans-serif',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Concours
            </Link>

            {menuCats.map((mc) => (
              <Link
                key={mc.name}
                to={mc.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '9px 0 9px 16px',
                  font: '900 20px/1 Nunito,sans-serif',
                  color: '#C9D6F5',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F58220' }} />
                {mc.name.replace(/^\d+\.\s*/, '')}
              </Link>
            ))}

            <Link
              to="/actualites"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 0',
                font: '900 32px/1 Nunito,sans-serif',
                color: '#fff',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Actualités
            </Link>
          </nav>

          <Link
            to="/inscription"
            style={{
              marginTop: 'auto',
              alignSelf: 'flex-start',
              minHeight: '54px',
              padding: '0 22px',
              borderRadius: '14px',
              border: '3px solid #fff',
              background: 'linear-gradient(180deg,#FF9A3D,#E8621A)',
              color: '#fff',
              font: '900 18px Nunito,sans-serif',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 10px 24px rgba(232,98,26,.35)',
            }}
          >
            S'inscrire →
          </Link>
        </div>
      )}
    </>
  );
};
