import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { PageLoader } from './components/ui/PageLoader';
import { PrototypeNavDrawer } from './components/dev/PrototypeNavDrawer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// LAYOUTS
const StructurePublique = lazy(() => import('./structures/StructurePublique'));
const StructureCandidat = lazy(() => import('./structures/StructureCandidat'));
const StructureFormateur = lazy(() => import('./structures/StructureFormateur'));
const StructureAdmin = lazy(() => import('./structures/StructureAdmin'));

// DOMAINE 1 : PAGES PUBLIQUES
const Accueil = lazy(() => import('./pages/publique/Accueil'));
const CategorieTechnologie = lazy(() => import('./pages/publique/categories/CategorieTechnologie'));
const CategorieInnovation = lazy(() => import('./pages/publique/categories/CategorieInnovation'));
const CategorieEconomie = lazy(() => import('./pages/publique/categories/CategorieEconomie'));
const CategorieDroit = lazy(() => import('./pages/publique/categories/CategorieDroit'));
const Calendrier = lazy(() => import('./pages/publique/Calendrier'));
const Documents = lazy(() => import('./pages/publique/Documents'));
const FAQ = lazy(() => import('./pages/publique/FAQ'));
const Actualites = lazy(() => import('./pages/publique/Actualites'));
const ArticleDetail = lazy(() => import('./pages/publique/ArticleDetail'));
const Partenaires = lazy(() => import('./pages/publique/Partenaires'));
const Inscription = lazy(() => import('./pages/publique/Inscription'));

// DOMAINE 2 : ESPACE CANDIDAT
const DashboardCandidat = lazy(() => import('./pages/candidat/DashboardCandidat'));
const MonProfil = lazy(() => import('./pages/candidat/MonProfil'));
const MonEquipe = lazy(() => import('./pages/candidat/MonEquipe'));
const CreerEquipe = lazy(() => import('./pages/candidat/CreerEquipe'));
const InvitationsEquipe = lazy(() => import('./pages/candidat/InvitationsEquipe'));
const MembresEquipe = lazy(() => import('./pages/candidat/MembresEquipe'));
const CharteReglement = lazy(() => import('./pages/candidat/CharteReglement'));
const SoumissionDossier = lazy(() => import('./pages/candidat/SoumissionDossier'));
const StatutCandidature = lazy(() => import('./pages/candidat/StatutCandidature'));
const FormationsHub = lazy(() => import('./pages/candidat/Formations/FormationsHub'));
const PlanningSessions = lazy(() => import('./pages/candidat/Formations/PlanningSessions'));
const SupportsCours = lazy(() => import('./pages/candidat/Formations/SupportsCours'));
const SeanceDistance = lazy(() => import('./pages/candidat/Formations/SeanceDistance'));
const AssiduitePresence = lazy(() => import('./pages/candidat/Formations/AssiduitePresence'));
const AnnoncesFormateur = lazy(() => import('./pages/candidat/Formations/AnnoncesFormateur'));

// DOMAINE 3 : ESPACE FORMATEUR & JURY
const DashboardFormateur = lazy(() => import('./pages/formateur/DashboardFormateur'));
const SeancesPlanning = lazy(() => import('./pages/formateur/SeancesPlanning'));
const EmargementScan = lazy(() => import('./pages/formateur/EmargementScan'));
const PublicationSupports = lazy(() => import('./pages/formateur/PublicationSupports'));
const AnnoncesQuestions = lazy(() => import('./pages/formateur/AnnoncesQuestions'));

// DOMAINE 4 : ESPACE ADMIN & ORGANISATION
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ValidationEquipes = lazy(() => import('./pages/admin/ValidationEquipes'));
const FicheEquipeAdmin = lazy(() => import('./pages/admin/FicheEquipeAdmin'));
const GestionQuotas = lazy(() => import('./pages/admin/GestionQuotas'));
const ExportDonnees = lazy(() => import('./pages/admin/ExportDonnees'));
const SuiviFormations = lazy(() => import('./pages/admin/SuiviFormations'));
const ParametresTournoi = lazy(() => import('./pages/admin/ParametresTournoi'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" />
      {/* Menu dev prototype masqué par défaut (activable via ?dev=1 ou ?proto=1 dans l'URL) */}
      <PrototypeNavDrawer />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* ========================================================= */}
          {/* 1. PORTAIL PUBLIC                                         */}
          {/* ========================================================= */}
          <Route element={<StructurePublique />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/concours" element={<Navigate to="/concours/technologie" replace />} />
            <Route path="/concours/technologie" element={<CategorieTechnologie />} />
            <Route path="/concours/innovation" element={<CategorieInnovation />} />
            <Route path="/concours/economie" element={<CategorieEconomie />} />
            <Route path="/concours/droit" element={<CategorieDroit />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/faq-contact" element={<FAQ />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:slug" element={<ArticleDetail />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Navigate to="/inscription" replace />} />
          </Route>

          {/* ========================================================= */}
          {/* 2. ESPACE CANDIDAT & GESTION D'ÉQUIPE                     */}
          {/* ========================================================= */}
          <Route element={<StructureCandidat />}>
            <Route path="/espace" element={<Navigate to="/espace/dashboard" replace />} />
            <Route path="/espace/dashboard" element={<DashboardCandidat />} />
            <Route path="/espace/profil" element={<MonProfil />} />
            <Route path="/espace/equipe" element={<MonEquipe />} />
            <Route path="/espace/equipe/creer" element={<CreerEquipe />} />
            <Route path="/espace/equipe/invitations" element={<InvitationsEquipe />} />
            <Route path="/espace/equipe/membres" element={<MembresEquipe />} />
            <Route path="/espace/equipe/charte" element={<CharteReglement />} />
            <Route path="/espace/equipe/soumettre" element={<SoumissionDossier />} />
            <Route path="/espace/statut" element={<StatutCandidature />} />
            <Route path="/espace/formations" element={<FormationsHub />} />
            <Route path="/espace/formations/planning" element={<PlanningSessions />} />
            <Route path="/espace/formations/supports" element={<SupportsCours />} />
            <Route path="/espace/formations/visio" element={<SeanceDistance />} />
            <Route path="/espace/formations/presence" element={<AssiduitePresence />} />
            <Route path="/espace/formations/annonces" element={<AnnoncesFormateur />} />
          </Route>

          {/* ========================================================= */}
          {/* 3. ESPACE FORMATEUR & JURY                                */}
          {/* ========================================================= */}
          <Route element={<StructureFormateur />}>
            <Route path="/formateur" element={<Navigate to="/formateur/dashboard" replace />} />
            <Route path="/formateur/dashboard" element={<DashboardFormateur />} />
            <Route path="/formateur/seances" element={<SeancesPlanning />} />
            <Route path="/formateur/seances/scan-qr" element={<EmargementScan />} />
            <Route path="/formateur/supports" element={<PublicationSupports />} />
            <Route path="/formateur/annonces" element={<AnnoncesQuestions />} />
          </Route>

          {/* ========================================================= */}
          {/* 4. ESPACE ADMIN & ORGANISATION                            */}
          {/* ========================================================= */}
          <Route element={<StructureAdmin />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/equipes" element={<ValidationEquipes />} />
            <Route path="/admin/equipes/:id" element={<FicheEquipeAdmin />} />
            <Route path="/admin/quotas" element={<GestionQuotas />} />
            <Route path="/admin/export" element={<ExportDonnees />} />
            <Route path="/admin/formations" element={<SuiviFormations />} />
            <Route path="/admin/parametres" element={<ParametresTournoi />} />
          </Route>

          {/* 404 / REDIRECTION */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}
