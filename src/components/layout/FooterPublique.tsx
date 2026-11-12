import React from 'react';
import { Link } from 'react-router-dom';

export const FooterPublique: React.FC = () => {
  return (
    <footer className="bg-[#0A1430] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <span className="font-extrabold text-2xl text-white block mb-2">GÉNIE UPB</span>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Le grand concours universitaire d'excellence et d'innovation de l'Université Polytechnique de Bingerville.
          </p>
          <span className="text-[11px] text-[#E8742A] font-bold tracking-wider uppercase">Inscriptions du 23 nov. au 18 déc.</span>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Concours</h4>
          <ul className="text-sm space-y-2 text-slate-400">
            <li><Link to="/concours/technologie" className="hover:text-white">Technologie & Prototype</Link></li>
            <li><Link to="/concours/innovation" className="hover:text-white">Innovation & Incubateur</Link></li>
            <li><Link to="/concours/economie" className="hover:text-white">Économie & Portefeuille</Link></li>
            <li><Link to="/concours/droit" className="hover:text-white">Droit & Mini-procès</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Ressources</h4>
          <ul className="text-sm space-y-2 text-slate-400">
            <li><Link to="/calendrier" className="hover:text-white">Planning officiel</Link></li>
            <li><Link to="/documents" className="hover:text-white">Chartes & Règlements</Link></li>
            <li><Link to="/faq-contact" className="hover:text-white">FAQ & Assistance</Link></li>
            <li><Link to="/partenaires" className="hover:text-white">Sponsors et partenaires</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Université</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Université Polytechnique de Bingerville (UPB)<br />
            Campus universitaire, Côte d'Ivoire.
          </p>
          <Link to="/connexion" className="text-xs font-bold text-[#E8B33D] hover:underline">
            Portail Formateurs & Organisateurs →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026-2027 Université Polytechnique de Bingerville — Tous droits réservés.</p>
        <p className="mt-2 sm:mt-0">Plateforme développée pour GÉNIE UPB v2.</p>
      </div>
    </footer>
  );
};
