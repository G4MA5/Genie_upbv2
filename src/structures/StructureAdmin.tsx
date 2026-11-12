import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarAdmin } from '../components/layout/SidebarAdmin';

export default function StructureAdmin() {
  return (
    <div className="min-h-screen bg-[#F3FAFF] flex">
      <SidebarAdmin />
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
