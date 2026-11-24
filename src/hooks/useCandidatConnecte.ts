import { useEffect, useState } from 'react';
import { session } from '../lib/api';

/**
 * true tant qu'un candidat a une session (jeton gardé dans le navigateur, valable 90 jours).
 * Se met à jour quand la session expire (réponse 401) ou change dans un autre onglet.
 */
export function useCandidatConnecte(): boolean {
  const [connecte, setConnecte] = useState<boolean>(() => !!session.get());

  useEffect(() => {
    const maj = () => setConnecte(!!session.get());
    window.addEventListener('genie-session-expiree', maj);
    window.addEventListener('storage', maj);
    window.addEventListener('focus', maj);
    return () => {
      window.removeEventListener('genie-session-expiree', maj);
      window.removeEventListener('storage', maj);
      window.removeEventListener('focus', maj);
    };
  }, []);

  return connecte;
}
