import React from 'react';
import { Link } from 'react-router-dom';
import logoUpb from '../../assets/images/logo_genie_upb.png';

interface MobileDrawerProps {
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ onClose }) => {
  const categories = [
    { name: 'Technologie', path: '/fiche-categorie/technologie', delay: '200ms' },
    { name: 'Innovation', path: '/fiche-categorie/innovation', delay: '250ms' },
    { name: 'Économie', path: '/fiche-categorie/economie', delay: '300ms' },
    { name: 'Droit', path: '/fiche-categorie/droit', delay: '350ms' },
  ];

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(29,91,181,0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(29,91,181,0.3) 2px, transparent 2px)',
        backgroundSize: '88px 88px',
      }}
      className="fixed inset-0 z-0 bg-[#0A1430] flex flex-col p-[28px_30vw_32px_26px] box-border overflow-y-auto"
    >
      <div className="min-h-full flex flex-col">
        {/* Logo Génie UPB */}
        <Link to="/" onClick={onClose} className="self-start">
          <img src={logoUpb} alt="GÉNIE UPB" className="h-[44px] w-auto object-contain" />
        </Link>

        {/* Navigation avec cascade décalée (mIn) */}
        <nav className="mt-10 flex flex-col select-none">
          {/* Accueil */}
          <Link
            to="/"
            onClick={onClose}
            style={{
              opacity: 0,
              transform: 'translateX(-30px)',
              animation: 'mIn .5s cubic-bezier(.2,.8,.2,1) 80ms forwards',
            }}
            className="flex items-center gap-3 py-3.5 font-black text-[32px] leading-none text-white hover:text-[#F58220] transition-colors"
          >
            Accueil
          </Link>

          {/* Concours */}
          <Link
            to="/concours"
            onClick={onClose}
            style={{
              opacity: 0,
              transform: 'translateX(-30px)',
              animation: 'mIn .5s cubic-bezier(.2,.8,.2,1) 140ms forwards',
            }}
            className="flex items-center gap-3 py-3.5 font-black text-[32px] leading-none text-white hover:text-[#F58220] transition-colors"
          >
            Concours
          </Link>

          {/* 4 Sous-catégories avec puce orange */}
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              onClick={onClose}
              style={{
                opacity: 0,
                transform: 'translateX(-30px)',
                animation: `mIn .5s cubic-bezier(.2,.8,.2,1) ${cat.delay} forwards`,
              }}
              className="flex items-center gap-3 py-[9px] pl-4 font-black text-[20px] leading-none text-[#C9D6F5] hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#F58220] shrink-0" />
              <span>{cat.name}</span>
            </Link>
          ))}

          {/* Actualités */}
          <Link
            to="/actualites"
            onClick={onClose}
            style={{
              opacity: 0,
              transform: 'translateX(-30px)',
              animation: 'mIn .5s cubic-bezier(.2,.8,.2,1) 420ms forwards',
            }}
            className="flex items-center gap-3 py-3.5 font-black text-[32px] leading-none text-white hover:text-[#F58220] transition-colors"
          >
            Actualités
          </Link>
        </nav>

        {/* Bouton S'inscrire orange en bas */}
        <Link
          to="/inscription"
          onClick={onClose}
          style={{
            opacity: 0,
            transform: 'translateX(-30px)',
            animation: 'mIn .5s cubic-bezier(.2,.8,.2,1) 480ms forwards',
          }}
          className="mt-auto pt-6 self-start min-h-[54px] px-[22px] rounded-[14px] border-[3px] border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[18px] flex items-center shadow-[0_10px_24px_rgba(232,98,26,0.35)] active:scale-95 transition-transform"
        >
          S'inscrire →
        </Link>
      </div>
    </div>
  );
};
