# GUIDE DE NAVIGATION & CODAGE POUR L'AGENT IA — GÉNIE UPB v2

Ce document est la **boussole officielle et contractuelle pour tout développeur ou agent IA** intervenant sur le projet **Génie UPB v2**.
Toute l'architecture est pré-câblée, les dossiers créés, et toutes les routes connectées dans `App.tsx`.

---

## 1. Stack Technique & Règles Absolues

1. **Stack Technique :**
   - React 19 + TypeScript + Vite + Tailwind CSS 3.4 + React Router v7 + Framer Motion 12 + Lucide React + React Hot Toast.
2. **Polices Typographiques Locales (ZÉRO CDN distant) :**
   - Les polices doivent être chargées via les fichiers locaux `@font-face` WOFF2 dans `src/index.css` :
     - `Silkscreen` (titres et badges monospace rétro-futuristes).
     - `Nunito` (typographie principale de corps de texte et titres gras).
     - `JetBrains Mono` (code, libellés de jury, timestamps, données techniques).
     - `Georgia` (citations littéraires, titres d'arène et d'éliminatoires).
3. **Règle d'Or : ZÉRO INVENTION (Fidélité 1:1 au Prototype) :**
   - Chaque écran provient obligatoirement de `scripts/proto_real.html`.
   - Tout texte, chiffre, étiquette, composant, animation, masque ou interaction doit être extrait fidèlement du prototype.
   - **Interdiction formelle** de créer des boutons génériques de substitution, des toggles inventés ou des placeholders simplifiés.
4. **Vérification Visuelle Obligatoire (Sous-Agent Navigateur) :**
   - Toute section ou page modifiée doit faire l'objet de captures d'écran réelles sur **Desktop (1280 × 800)** ET sur **Mobile (390 × 844)**.
   - Les captures doivent être vérifiées avant d'annoncer la fin du travail.
5. **Gestion Git : STRICTEMENT AUCUN PUSH DISTANT SANS AUTORISATION EXPLICITE :**
   - Les commits sont enregistrés localement sur `main` et répercutés sur `dev`.
   - Le remote GitHub personnel est : `https://github.com/G4MA5/Genie_upbv2.git`.
   - **JAMAIS de `git push`** tant que l'utilisateur n'a pas dit textuellement : *"tu peux push"*, *"push ... maintenant"*, ou instruction équivalente.
6. **Le Breakpoint Pivot : `md: 768px` :**
   - Mobile (`< 768px`) : Barre tactile inférieure (`BottomTabBar`), cartes 1 colonne, menu burger cinématique avec décalage 3D (`translateX(72vw) scale(0.86)`).
   - Desktop (`>= 768px`) : Navbar capsule flottante en haut, grilles 2 à 4 colonnes, illustrations pleines dimensions avec effets de drop-shadow stéréoscopiques.

---

## 2. Architecture des 4 Catégories du Concours (`/concours/...`)

Chaque catégorie dispose de sa propre route dédiée dans `src/pages/publique/categories/` et d'une architecture modulaire sous-jacente dans `src/components/categories/<nom>/` :

### A. Catégorie Technologie (`/concours/technologie` — `proto_real.html` [ST])
- **Orchestrateur :** `src/pages/publique/categories/CategorieTechnologie.tsx`
- **Modules :** `src/components/categories/technologie/`
  1. `TechHero.tsx` : En-tête bleu nuit `#0C1E4A` avec grille matricielle animée, H1 « Qui sera le génie technologique », drone officiel avec sticker contour blanc volumétrique et CTA « S'inscrire → ».
  2. `TechMission.tsx` : Mission Agritech « Surveiller les cultures », titre Silkscreen, ondulations topographiques vectorielles et 3 statistiques clés.
  3. `TechDeroule.tsx` : Déroulé des 4 épreuves (01 Drone à monter, 02 Électronique, 03 Code embarqué, 04 Vol d'essai), jalon 3+1 JOURS.
  4. `TechEvaluation.tsx` : Points critiques vérifiés par le jury avec animations en direct (rapport vert, flux de données, radar concentrique) et barre des 3 jurés.

### B. Catégorie Innovation (`/concours/innovation` — `proto_real.html` [SI])
- **Orchestrateur :** `src/pages/publique/categories/CategorieInnovation.tsx`
- **Modules :** `src/components/categories/innovation/`
  1. `InnoHero.tsx` & `InnoHeroBackground.tsx` : Grille matricielle animée continue sur 90s (`[data-si-bg]`, `@keyframes siBgGlide`), titre percutant et reflet sweep `[data-shine="1"]` sur le bouton CTA.
  2. `InnoIncubateur.tsx` : Portes d'incubateur coulissantes animées en boucle (`[data-door="l"]` et `[data-door="r"]`), panneau interactif.
  3. `InnoJury.tsx` : Silhouette des mini-personnages du jury avec points d'interrogation animés, respect strict de la mise en page mobile et desktop.
  4. `InnoEpreuve.tsx` : Cubes Rubik 3D interactifs, animations d'incubateur temps réel sans aucun bouton de substitution.

### C. Catégorie Économie (`/concours/economie` — `proto_real.html` [SE])
- **Orchestrateur :** `src/pages/publique/categories/CategorieEconomie.tsx`
- **Modules :** `src/components/categories/economie/`
  1. `EcoHero.tsx` : Fond vert forêt `#1F4A2A` avec grille SVG matricielle animée sur 70s (`sdBgGlide`), titre avec mot incliné à -4° et double contour sticker (7px blanc, 13px orange `#F58220`), tirelire cochon officielle à 2.5°.
  2. `EcoSimulation.tsx` :
     - Terminal boursier rétro avec bordure 6px blanche et ombre portée 80px.
     - Graphique en chandeliers japonais HTML5 `<canvas>` généré en temps réel avec mèches, corps colorés et cours dynamique.
     - Leaderboard live reclassé dynamiquement toutes les 1 100 ms avec les 12 équipes officielles et top 4 surligné.
     - Bandeau défilant (Ticker Tape) infini avec 10 matières premières ivoiriennes (`CACAO`, `COTON`, `OR`, `ANACARDE`, etc.).
     - Cartes des 3 étapes (01 Simulation, 02 Classement, 03 Soutenance).
  3. `EcoSoutenance.tsx` : Fond crème doux `#EBE7DE`, badge dateur « Jour 3 · vendredi 29 janvier 2027 », illustration centrale de l'ampoule remplie de pièces avec masque radial `radial-gradient`, 4 critères d'évaluation et 3 jalons chronologiques.

### D. Catégorie Droit (`/concours/droit` — `proto_real.html` [SD])
- **Orchestrateur :** `src/pages/publique/categories/CategorieDroit.tsx`
- **Modules :** `src/components/categories/droit/`
  1. `DroitHero.tsx` : Fond crème `#F7F1E7` avec grille matricielle animée (`[data-sd-bg="1"]`, 70s), H1 avec dégradé de texte métallique, Statue de la Justice officielle avec sticker contour et carte « 48 participants maximum ».
  2. `DroitCitationStats.tsx` : Fond doré `#E8CFA4` avec mot géant filigrane « DROIT », arc elliptique incliné à -14°, bulle citation bordeaux `#7A1A1F` avec grands guillemets Georgia et grille 2×2 des 4 statistiques officielles.
  3. `DroitDossiers.tsx` : Les 3 épreuves organisées en **accordéon vertical interactif de dossiers physiques superposés** :
     - Chemises avec onglets tactiles décalés (5%, 36%, 66%) et oreilles à courbure radiale inversée (`radial-gradient`).
     - Animation d'ouverture verticale fluide par calcul de `top` (`.7s cubic-bezier(.2,.8,.2,1)`).
     - Photos officielles avec fondus dégradés, bouton d'extension rotatif `+` vers `×`, filigranes géants 01, 02, 03 et encarts d'évaluation en police `JetBrains Mono`.
  4. `DroitArene.tsx` :
     - L'Arène des idées et Éliminatoires 2027 sur fond texturé cuir/bois avec gradient radial et ombre interne 160px.
     - Arbre de tournoi SVG luminescent doré avec animation de tracé `stroke-dashoffset`.
     - 8 écussons d'équipes biseautés (`clip-path: polygon(...)`), 4 à gauche et 4 à droite.
     - Statue de la Justice trophée centrale dorée avec halo lumineux radial et socle « GÉNIE DU DROIT ».
     - Révélation progressive au scroll (`[data-jrev]`) et défilement horizontal fluide sur mobile.

---

## 3. Index Général des Écrans du Prototype & Fichiers Associés

### DOMAINE 1 : PORTAIL PUBLIC (`src/structures/StructurePublique.tsx`)
- **[S1] Accueil :** `src/pages/publique/Accueil.tsx`
  - Composants : `src/components/accueil/` (`HeroBanner`, `CountdownTimer`, `CategoriesGrid`, `TournamentTimeline`, `PresentationUpb`, `NewsCarousel`, `PartnersSection`).
- **[S2] Concours & Catégories :** `src/pages/publique/Concours.tsx`
- **[ST] Catégorie Technologie :** `src/pages/publique/categories/CategorieTechnologie.tsx`
- **[SI] Catégorie Innovation :** `src/pages/publique/categories/CategorieInnovation.tsx`
- **[SE] Catégorie Économie :** `src/pages/publique/categories/CategorieEconomie.tsx`
- **[SD] Catégorie Droit :** `src/pages/publique/categories/CategorieDroit.tsx`
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
- **[P3c] Gestion des Membres :** `src/pages/candidat/MembresEquipe.tsx`
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

## 4. Données et Types Réutilisables

- Données statiques : `src/data/categoriesData.ts`, `timelineData.ts`, `faqData.ts`, `documentsData.ts`, `partnersData.ts`, `newsData.ts`.
- Modèles de données : `src/types/user.ts`, `team.ts`, `category.ts`, `formation.ts`.
- Hooks : `src/hooks/useMediaQuery.ts`, `useCountdown.ts`, `useAuth.ts`, `useTeam.ts`.
- Composants UI réutilisables : `src/components/ui/` (`Button`, `Input`, `Select`, `Modal`, `Badge`, `Accordion`, `PageLoader`).
- Journal des règles et reproches : `JOURNAL_DES_REPROCHES_ET_REGLES.md` (à consulter impérativement avant toute intervention).
