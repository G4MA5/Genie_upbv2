import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavbarPublique } from '../components/layout/NavbarPublique';
import { FooterPublique } from '../components/layout/FooterPublique';
import { MenuMobileProvider, useMenuMobile } from '../contexts/MenuMobileContext';
import { MobileDrawer } from '../components/layout/MobileDrawer';

function StructurePubliqueInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { burgerOpen, burgerVis, pageOrigin, closeBurger } = useMenuMobile();

  return (
    <div className="relative min-h-screen bg-[#0A1430] overflow-x-hidden">
      {/* 1. Tiroir Mobile authentique révélé derrière la page (Blueprint Grid) */}
      {burgerVis && <MobileDrawer onClose={closeBurger} />}

      {/* 2. Conteneur principal avec translation 3D (Shift 72vw, scale 0.86, coins arrondis 28px, ombre portée) */}
      <div
        style={{
          transform: burgerOpen ? 'translateX(72vw) scale(0.86)' : 'none',
          transformOrigin: pageOrigin,
          borderRadius: burgerOpen ? '28px' : '0',
          boxShadow: burgerOpen ? '-30px 0 60px rgba(0,0,0,0.45)' : 'none',
          transition: 'transform 0.55s cubic-bezier(0.7, 0, 0.2, 1), border-radius 0.55s, box-shadow 0.55s',
        }}
        className={`relative z-[1] min-h-screen flex flex-col bg-[#F6F8FC] ${burgerOpen ? 'overflow-hidden pointer-events-auto' : ''}`}
      >
        {/* Overlay invisible pour refermer au tap sur la portion de page décalée visible */}
        {burgerOpen && (
          <div
            onClick={closeBurger}
            aria-label="Fermer le menu"
            className="fixed inset-0 z-[2000] cursor-pointer"
          />
        )}

        <NavbarPublique />
        <main className={`flex-1 w-full ${!isHome ? 'pt-20 md:pt-28' : ''}`}>
          <Outlet />
        </main>
        <FooterPublique />
      </div>
    </div>
  );
}

export default function StructurePublique() {
  return (
    <MenuMobileProvider>
      <StructurePubliqueInner />
    </MenuMobileProvider>
  );
}
