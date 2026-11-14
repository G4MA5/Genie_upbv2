import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface MenuMobileContextType {
  burgerOpen: boolean;
  burgerVis: boolean;
  pageOrigin: string;
  toggleBurger: () => void;
  closeBurger: () => void;
}

const MenuMobileContext = createContext<MenuMobileContextType | undefined>(undefined);

export const MenuMobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [burgerVis, setBurgerVis] = useState(false);
  const [pageOrigin, setPageOrigin] = useState('0 50%');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const closeBurger = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setBurgerOpen(false);
    document.documentElement.style.overflowX = '';
    document.body.style.overflowX = '';
    timeoutRef.current = setTimeout(() => {
      setBurgerVis(false);
    }, 600);
  };

  const toggleBurger = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const nextOpen = !burgerOpen;

    if (nextOpen) {
      const originY = Math.round(window.scrollY + window.innerHeight / 2);
      setPageOrigin(`0 ${originY}px`);
      setBurgerVis(true);
      setBurgerOpen(true);
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
    } else {
      closeBurger();
    }
  };

  // Fermer automatiquement le menu lors d'une navigation
  useEffect(() => {
    if (burgerOpen) {
      closeBurger();
    }
  }, [location.pathname]);

  // Fermer automatiquement si l'écran est redimensionné en desktop (> 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && burgerOpen) {
        closeBurger();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [burgerOpen]);

  // Nettoyer les styles de scroll au démontage
  useEffect(() => {
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <MenuMobileContext.Provider
      value={{
        burgerOpen,
        burgerVis,
        pageOrigin,
        toggleBurger,
        closeBurger,
      }}
    >
      {children}
    </MenuMobileContext.Provider>
  );
};

export const useMenuMobile = (): MenuMobileContextType => {
  const context = useContext(MenuMobileContext);
  if (!context) {
    throw new Error('useMenuMobile must be used within a MenuMobileProvider');
  }
  return context;
};
