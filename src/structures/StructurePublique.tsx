import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarPublique } from '../components/layout/NavbarPublique';
import { FooterPublique } from '../components/layout/FooterPublique';

export default function StructurePublique() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC]">
      <NavbarPublique />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <FooterPublique />
    </div>
  );
}
