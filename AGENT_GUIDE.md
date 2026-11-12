# GUIDE DE NAVIGATION & CODAGE POUR L'AGENT IA — GÉNIE UPB v2

Ce document est la **boussole officielle pour tout développeur ou agent IA** intervenant sur le projet **Génie UPB v2**.
Toute l'architecture est déjà pré-câblée, les dossiers créés, et toutes les routes connectées dans `App.tsx`.
Pour intégrer un écran, il vous suffit de vous rendre **directement dans le fichier correspondant** indiqué ci-dessous.

---

## 1. Stack Technique & Règles Absolues

1. **Stack :** React 19 + TypeScript + Tailwind CSS 3.4 + React Router v7 + Framer Motion 12 + Lucide React + React Hot Toast.
2. **Règle de Nommage Sémantique (ZÉRO `PartieX`) :**  
   Nommez toujours les sous-composants selon leur fonction métier (`HeroBanner.tsx`, `TeamCard.tsx`, `InviteModal.tsx`, etc.).
3. **Le Breakpoint Pivot : `md: 768px`**  
   - Mobile (`< 768px`) : Barre tactile inférieure (`BottomTabBar`), cartes 1 colonne, menu burger avec `overflow: hidden` sur le body.
   - Desktop (`>= 768px`) : Sidebars complètes, grilles 2 à 5 colonnes.
4. **Charte Couleurs :**
   - Nuit : `#0A1430` | Marine : `#0E1E4A` | Papier : `#F6F8FC`
   - Orange Action : `#E8742A` | Or Cérémonie : `#E8B33D`
   - Technologie : `oklch(0.58 0.15 258)` | Innovation : `oklch(0.62 0.15 50)`
   - Économie : `oklch(0.58 0.12 170)` | Droit : `oklch(0.55 0.15 340)`

---

## 2. Index des 47 Écrans du Prototype ➔ Fichiers Sources Exacts

### DOMAINE 1 : PORTAIL PUBLIC (`src/structures/StructurePublique.tsx`)
- **[S1] Accueil :** `src/pages/publique/Accueil.tsx`
  - Utilise les composants dans `src/components/accueil/` (`HeroBanner`, `CountdownTimer`, `CategoriesGrid`, `TournamentTimeline`, `PresentationUpb`, `NewsCarousel`, `PartnersSection`).
- **[S2] Concours & Catégories :** `src/pages/publique/Concours.tsx`
- **[S2a / SD / SI / ST / SE] Fiche Catégorie :** `src/pages/publique/FicheCategorie.tsx`
  - Utilise les composants dans `src/components/categories/` (`DroitTournament`, `TechAgriculture`, `EcoChallenge`, `InnoIncubateur`, `JuryCriteria`).
- **[S3] Calendrier & Lieux :** `src/pages/publique/Calendrier.tsx`
- **[S4] Documents & Chartes :** `src/pages/publique/Documents.tsx`
- **[S5] FAQ & Assistance :** `src/pages/publique/FAQ.tsx`
- **[S6] Actualités :** `src/pages/publique/Actualites.tsx`
- **[A] Article :** `src/pages/publique/ArticleDetail.tsx`
- **[S7] Partenaires :** `src/pages/publique/Partenaires.tsx`
- **[S8] Créer un Compte :** `src/pages/publique/Inscription.tsx` *(gère les états GB Bientôt et GC Clôture)*
- **[S9] Connexion :** `src/pages/publique/Connexion.tsx`

### DOMAINE 2 : ESPACE CANDIDAT & GESTION D'ÉQUIPE (`src/structures/StructureCandidat.tsx`)
- **[P1] Mon Espace (Dashboard) :** `src/pages/candidat/DashboardCandidat.tsx`
- **[P2] Mon Profil :** `src/pages/candidat/MonProfil.tsx`
- **[P3 / P3t] Mon Équipe (Sans / Avec) :** `src/pages/candidat/MonEquipe.tsx`
- **[P3a] Créer une Équipe :** `src/pages/candidat/CreerEquipe.tsx`
- **[P3b] Invitations par Matricule :** `src/pages/candidat/InvitationsEquipe.tsx`
- **[P3c] Gestion des 5 Membres :** `src/pages/candidat/MembresEquipe.tsx`
- **[P3d] Règlement & Charte :** `src/pages/candidat/CharteReglement.tsx`
- **[P3e] Soumission Finale du Dossier :** `src/pages/candidat/SoumissionDossier.tsx`
- **[P4] Statut du Dossier :** `src/pages/candidat/StatutCandidature.tsx`
- **[P5] Hub Formations :** `src/pages/candidat/Formations/FormationsHub.tsx`
- **[P5a] Calendrier des Ateliers :** `src/pages/candidat/Formations/PlanningSessions.tsx`
- **[P5b] Téléchargement Supports :** `src/pages/candidat/Formations/SupportsCours.tsx`
- **[P5c] Séance Virtuelle (Visio) :** `src/pages/candidat/Formations/SeanceDistance.tsx`
- **[P5d] Suivi d'Assiduité :** `src/pages/candidat/Formations/AssiduitePresence.tsx`
- **[P5e] Annonces Formateurs :** `src/pages/candidat/Formations/AnnoncesFormateur.tsx`

### DOMAINE 3 : ESPACE FORMATEUR & JURY (`src/structures/StructureFormateur.tsx`)
- **[F] Tableau de Bord :** `src/pages/formateur/DashboardFormateur.tsx`
- **[F1 / F1a] Planning Séances :** `src/pages/formateur/SeancesPlanning.tsx`
- **[F1b] Présence par Scan QR Code :** `src/pages/formateur/EmargementScan.tsx`
- **[F2 / F2a] Publication Supports :** `src/pages/formateur/PublicationSupports.tsx`
- **[F3] Annonces & Questions :** `src/pages/formateur/AnnoncesQuestions.tsx`

### DOMAINE 4 : ESPACE ORGANISATEUR & ADMIN (`src/structures/StructureAdmin.tsx`)
- **[R] Dashboard Général :** `src/pages/admin/AdminDashboard.tsx`
- **[R1] Équipes à Valider :** `src/pages/admin/ValidationEquipes.tsx`
- **[R1a] Fiche Instruction Équipe :** `src/pages/admin/FicheEquipeAdmin.tsx`
- **[R1b] Quotas & Capacités :** `src/pages/admin/GestionQuotas.tsx`
- **[R1c] Export PCO (Excel/PDF) :** `src/pages/admin/ExportDonnees.tsx`
- **[R2 / R2a..c] Suivi Global Formations :** `src/pages/admin/SuiviFormations.tsx`
- **[R-Cfg] Paramètres du Tournoi :** `src/pages/admin/ParametresTournoi.tsx`

---

## 3. Données et Types Réutilisables

- Données statiques : `src/data/categoriesData.ts`, `timelineData.ts`, `faqData.ts`, `documentsData.ts`, `partnersData.ts`.
- Modèles de données : `src/types/user.ts`, `team.ts`, `category.ts`, `formation.ts`.
- Hooks : `src/hooks/useMediaQuery.ts`, `useCountdown.ts`, `useAuth.ts`, `useTeam.ts`.
- Composants UI réutilisables : `src/components/ui/` (`Button`, `Input`, `Select`, `Modal`, `Badge`, `Accordion`, `PageLoader`).
