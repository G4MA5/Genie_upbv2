import React, { useState } from 'react';
import { faqThemes, faqData, FaqItem } from '../../data/faqData';

export default function FAQ() {
  const [selectedTheme, setSelectedTheme] = useState<string>('Équipes');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'eq-1': true });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentQuestions = faqData.filter((item) => item.theme === selectedTheme);

  return (
    <div
      data-screen-label="S5 FAQ et contacts"
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
        paddingBottom: '40px',
      }}
      className="pt-[84px] md:pt-[130px]"
    >
      <div
        className="w-full max-w-[560px] md:max-w-[1080px] lg:max-w-[1180px] flex flex-col gap-4"
        style={{
          width: '100%',
        }}
      >
        {/* En-tête officiel S5 */}
        <span
          style={{
            font: "600 13px 'JetBrains Mono', monospace",
            color: '#2F6BF0',
            letterSpacing: '.04em',
          }}
        >
          AIDE
        </span>

        <h1
          style={{
            margin: 0,
            font: "800 38px/1.05 'Nunito', sans-serif",
            color: '#0E1E4A',
            letterSpacing: '-.02em',
          }}
        >
          Questions fréquentes
        </h1>

        {/* Pilules de thèmes horizontales */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
          className="no-scrollbar"
        >
          {faqThemes.map((theme) => {
            const isActive = selectedTheme === theme;
            return (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                style={{
                  flex: 'none',
                  minHeight: '40px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  background: isActive ? '#0E1E4A' : '#fff',
                  color: isActive ? '#fff' : '#0E1E4A',
                  font: "600 14px 'Nunito', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  boxShadow: isActive ? '0 4px 12px rgba(14,30,74,.15)' : '0 2px 8px rgba(14,30,74,.04)',
                  transition: 'all .18s ease',
                }}
              >
                {theme}
              </button>
            );
          })}
        </div>

        {/* Accordéon FAQ avec fond blanc arrondi */}
        <div
          style={{
            background: '#fff',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(14,30,74,.04)',
            marginTop: '4px',
          }}
        >
          {currentQuestions.map((f, index) => {
            const isOpen = !!openItems[f.id];
            const isLast = index === currentQuestions.length - 1;
            return (
              <div
                key={f.id}
                style={{
                  borderBottom: isLast ? 'none' : '1px solid #F2F0EA',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
                className="md:p-5"
              >
                {/* Ligne question cliquable */}
                <div
                  onClick={() => toggleItem(f.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{
                      font: "700 16px/1.35 'Nunito', sans-serif",
                      color: '#121628',
                    }}
                    className="md:text-[17px]"
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      flex: 'none',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? '#0E1E4A' : '#F2F0EA',
                      color: isOpen ? '#fff' : '#0E1E4A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      font: "700 18px 'Nunito', sans-serif",
                      transition: 'all .2s ease',
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </div>

                {/* Réponse dépliable */}
                {isOpen && (
                  <span
                    style={{
                      font: "400 15px/1.55 'Nunito', sans-serif",
                      color: '#4A5168',
                      paddingTop: '2px',
                    }}
                    className="md:text-[16px]"
                  >
                    {f.a}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Carte sombre de contact officielle S5 */}
        <div
          style={{
            background: '#0E1E4A',
            color: '#fff',
            borderRadius: '22px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: '0 10px 28px rgba(14,30,74,.12)',
            marginTop: '4px',
          }}
          className="md:p-6"
        >
          <span
            style={{
              font: "800 22px 'Nunito', sans-serif",
              marginBottom: '8px',
              color: '#fff',
            }}
          >
            Une autre question ?
          </span>

          {/* Ligne E-mail */}
          <div
            style={{
              minHeight: '52px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,.14)',
            }}
          >
            <span
              style={{
                width: '90px',
                font: "600 14px 'Nunito', sans-serif",
                color: '#F2C45A',
              }}
            >
              E-mail
            </span>
            <a
              href="mailto:contact@genie-upb.ci"
              style={{
                font: "500 15px 'Nunito', sans-serif",
                color: '#fff',
                textDecoration: 'none',
              }}
              className="hover:underline"
            >
              contact@genie-upb.ci
            </a>
          </div>

          {/* Ligne Téléphone */}
          <div
            style={{
              minHeight: '52px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,.14)',
            }}
          >
            <span
              style={{
                width: '90px',
                font: "600 14px 'Nunito', sans-serif",
                color: '#F2C45A',
              }}
            >
              Téléphone
            </span>
            <a
              href="tel:+2250700000000"
              style={{
                font: "500 15px 'Nunito', sans-serif",
                color: '#fff',
                textDecoration: 'none',
              }}
              className="hover:underline"
            >
              +225 07 00 00 00 00
            </a>
          </div>

          {/* Ligne Réseaux */}
          <div
            style={{
              minHeight: '52px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,.14)',
            }}
          >
            <span
              style={{
                width: '90px',
                font: "600 14px 'Nunito', sans-serif",
                color: '#F2C45A',
              }}
            >
              Réseaux
            </span>
            <span
              style={{
                font: "500 15px 'Nunito', sans-serif",
                color: '#fff',
              }}
            >
              @genieupb
            </span>
          </div>

          {/* Ligne Horaires */}
          <div
            style={{
              minHeight: '52px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: '90px',
                font: "600 14px 'Nunito', sans-serif",
                color: '#F2C45A',
              }}
            >
              Horaires
            </span>
            <span
              style={{
                font: "500 15px 'Nunito', sans-serif",
                color: '#fff',
              }}
            >
              Lun–Ven · 9 h – 17 h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
