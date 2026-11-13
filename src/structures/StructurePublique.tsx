import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavbarPublique } from '../components/layout/NavbarPublique';
import { FooterPublique } from '../components/layout/FooterPublique';

export default function StructurePublique() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC]">
      <NavbarPublique />
      <main className={`flex-1 w-full ${!isHome ? 'pt-20 md:pt-28' : ''}`}>
        <Outlet />
      </main>
      <FooterPublique />
    </div>
  );
}
