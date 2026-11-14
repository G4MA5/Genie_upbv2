import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Si on quitte l'accueil ou qu'on transite vers une autre page,
    // restaurer défensivement tout overflow lock résiduel sur html et body
    if (pathname !== '/') {
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowX = '';
      document.documentElement.style.overflowY = '';
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
