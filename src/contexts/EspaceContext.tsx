import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ApiError, api, session } from '../lib/api';
import type { Equipe, Espace, EspaceApi, Referentiel } from '../types/espace';

const CLE_EQUIPE = 'genie-equipe-active';

interface EspaceCtx {
  espace: Espace | null;
  referentiel: Referentiel | null;
  chargement: boolean;
  /** Recharge toutes les données de l'espace. */
  rafraichir: () => Promise<void>;
  /** Remplace l'équipe par celle renvoyée par une action (évite un rechargement complet). */
  majEquipe: (equipe: Equipe) => void;
  /** Choisit l'équipe affichée quand le candidat en a deux (Technologie + Innovation). */
  choisirEquipe: (id: number) => void;
  deconnecter: () => void;
}

const Ctx = createContext<EspaceCtx | null>(null);

export function EspaceProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [brut, setBrut] = useState<EspaceApi | null>(null);
  const [idEquipe, setIdEquipe] = useState<number | null>(() => {
    const v = Number(localStorage.getItem(CLE_EQUIPE));
    return Number.isFinite(v) && v > 0 ? v : null;
  });
  const [referentiel, setReferentiel] = useState<Referentiel | null>(null);
  const [chargement, setChargement] = useState(true);

  const deconnecter = useCallback(() => {
    session.clear();
    localStorage.removeItem(CLE_EQUIPE);
    setBrut(null);
    navigate('/inscription', { replace: true });
  }, [navigate]);

  const rafraichir = useCallback(async () => {
    try {
      const [e, r] = await Promise.all([api.espace(), referentiel ? Promise.resolve(referentiel) : api.referentiel()]);
      setBrut(e);
      setReferentiel(r);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return; // géré par l'écouteur ci-dessous
      toast.error(err instanceof Error ? err.message : 'Erreur de chargement.');
    } finally {
      setChargement(false);
    }
  }, [referentiel]);

  useEffect(() => {
    if (!session.get()) {
      navigate('/inscription', { replace: true });
      return;
    }
    rafraichir();
    const expiree = () => {
      toast.error('Session expirée : reconnecte-toi avec ton matricule.');
      navigate('/inscription', { replace: true });
    };
    window.addEventListener('genie-session-expiree', expiree);
    return () => window.removeEventListener('genie-session-expiree', expiree);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const majEquipe = useCallback((equipe: Equipe) => {
    setBrut((prev) =>
      prev ? { ...prev, equipes: prev.equipes.map((e) => (e.id === equipe.id ? equipe : e)) } : prev
    );
  }, []);

  const choisirEquipe = useCallback((id: number) => {
    setIdEquipe(id);
    localStorage.setItem(CLE_EQUIPE, String(id));
  }, []);

  // Vue des pages : l'équipe sélectionnée (ou la première) devient `espace.equipe`.
  const espace = useMemo<Espace | null>(() => {
    if (!brut) return null;
    const equipe = brut.equipes.find((e) => e.id === idEquipe) ?? brut.equipes[0] ?? null;
    return { ...brut, equipe, badge_url: equipe?.badge_url ?? null };
  }, [brut, idEquipe]);

  const valeur = useMemo(
    () => ({ espace, referentiel, chargement, rafraichir, majEquipe, choisirEquipe, deconnecter }),
    [espace, referentiel, chargement, rafraichir, majEquipe, choisirEquipe, deconnecter]
  );
  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
}

export function useEspace(): EspaceCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useEspace doit être utilisé dans <EspaceProvider>');
  return v;
}

/** Variante pour les pages qui ne s'affichent qu'une fois les données chargées. */
export function useEspaceCharge() {
  const ctx = useEspace();
  return { ...ctx, espace: ctx.espace as Espace };
}

/** Exécute une action API avec toast d'erreur ; renvoie undefined en cas d'échec. */
export async function action<T>(fn: () => Promise<T>, succes?: string): Promise<T | undefined> {
  try {
    const r = await fn();
    if (succes) toast.success(succes);
    return r;
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    return undefined;
  }
}
