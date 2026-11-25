import { useEffect, useState } from 'react';

/** Base des étudiants UPB : l'étudiant dont le matricule est inconnu y est envoyé pour régulariser son dossier. */
export const URL_BASE_ETUDIANTS_UPB = 'https://dbupb.synapstic.tech/';
const DELAI_S = 3;

/**
 * Redirection différée vers la base des étudiants UPB quand un matricule est introuvable.
 * Quelques secondes pour lire le message ; annulable (ex. faute de frappe corrigée).
 */
export function useRedirectionBaseUpb() {
  const [reste, setReste] = useState<number | null>(null);

  useEffect(() => {
    if (reste === null) return;
    if (reste <= 0) {
      window.location.assign(URL_BASE_ETUDIANTS_UPB);
      return;
    }
    const t = setTimeout(() => setReste((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(t);
  }, [reste]);

  return {
    reste,
    lancer: () => setReste(DELAI_S),
    annuler: () => setReste(null),
  };
}

/** Avis affiché sous le message d'erreur : compte à rebours, lien direct et annulation. */
export function AvisRedirectionUpb({
  reste,
  annuler,
  className = '',
}: {
  reste: number | null;
  annuler: () => void;
  className?: string;
}) {
  if (reste === null) return null;
  return (
    <span className={`font-semibold text-[13px] leading-[1.45] text-[#4A5168] font-sans ${className}`}>
      Redirection vers la base des étudiants UPB dans {reste} s…{' '}
      <a href={URL_BASE_ETUDIANTS_UPB} className="font-extrabold text-[#0A1430] underline">
        Y aller maintenant
      </a>{' '}
      ·{' '}
      <button type="button" onClick={annuler} className="font-bold text-[#4A5168] underline cursor-pointer">
        Annuler
      </button>
    </span>
  );
}
