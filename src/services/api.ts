// Client HTTP unique du backend GENIE UPB.
// - VITE_API_URL    : API principale (connexion, invites, personnel, benevoles, moi)
// - VITE_BADGES_URL : service des badges (/api/badges/...)
export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const BADGES_URL: string = import.meta.env.VITE_BADGES_URL ?? API_URL;

const TOKEN_KEY = 'genie_upb_token';

export const jeton = {
  lire(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  ecrire(valeur: string | null) {
    try {
      if (valeur) localStorage.setItem(TOKEN_KEY, valeur);
      else localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* stockage indisponible */
    }
  },
};

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

/** Message a afficher a l'utilisateur pour une erreur quelconque. */
export function messageErreur(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 403) return err.message || 'Accès réservé.';
    if (err.status === 429) return 'Trop de demandes. Réessayez dans quelques minutes.';
    if (err.status === 503) return `${err.message || 'Service indisponible.'} Vous pouvez réessayer.`;
    return err.message;
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

type Options = {
  method?: 'GET' | 'POST';
  base?: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  /** Pages publiques : ne jamais rediriger vers la connexion sur 401. */
  public?: boolean;
};

async function envoyer(path: string, opts: Options): Promise<Response> {
  const base = opts.base ?? API_URL;
  const url = new URL(path, base);
  for (const [k, v] of Object.entries(opts.query ?? {})) {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  }
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  const t = jeton.lire();
  if (t) headers.Authorization = `Bearer ${t}`;

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: opts.method ?? 'GET',
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError('Impossible de joindre le serveur. Vérifiez votre connexion.', 0, 'reseau');
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && !opts.public) {
      jeton.ecrire(null);
      if (window.location.pathname !== '/connexion') window.location.assign('/connexion');
    }
    throw new ApiError(data?.message || 'Une erreur est survenue.', res.status, data?.code);
  }
  return res;
}

/** Appel JSON : renvoie le corps `{ status: "ok", ... }`. */
export async function api<T = any>(path: string, opts: Options = {}): Promise<T> {
  const res = await envoyer(path, opts);
  const data = await res.json().catch(() => ({}));
  if (data?.status === 'error') throw new ApiError(data.message, res.status, data.code);
  return data as T;
}

/** Appel qui renvoie un fichier (image, PDF, ZIP). */
export async function apiBlob(path: string, opts: Options = {}): Promise<{ blob: Blob; headers: Headers }> {
  const res = await envoyer(path, opts);
  return { blob: await res.blob(), headers: res.headers };
}
