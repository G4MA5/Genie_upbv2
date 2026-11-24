import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary a capturé une exception :', error, errorInfo);
  }

  private handleReload = () => {
    // Si l'erreur est liée à un chunk d'ancienne version, forcer le rechargement propre
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 grid place-items-center mb-4 text-2xl font-black">
            !
          </div>
          <h2 className="text-xl font-black text-[#0A1430] mb-2">Une mise à jour a été déployée</h2>
          <p className="text-slate-500 text-sm max-w-md mb-6">
            Une nouvelle version du site est disponible. Cliquez ci-dessous pour actualiser et continuer votre navigation.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-2.5 rounded-xl bg-[#1D4FD8] text-white font-extrabold text-sm shadow-[0_8px_20px_rgba(29,79,216,0.3)] hover:brightness-110 active:scale-95 transition-all"
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
