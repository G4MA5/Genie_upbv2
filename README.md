# 🏆 GÉNIE UPB v2 — Plateforme Tournoi Inter-Filières UPB

> Plateforme web officielle de la 2nde édition du tournoi d'excellence académique et d'innovation de l'**Université Polytechnique de Bingerville (UPB)**.

---

## 🚀 Présentation du Projet

Génie UPB v2 est une application web moderne développée avec **React 19**, **TypeScript** et **Tailwind CSS**. Elle centralise la gestion complète de la compétition :
- **Portail Public** : Découverte des 4 pôles d'excellence, calendrier des épreuves, documents officiels, actualités, et inscriptions en ligne.
- **Espace Candidats & Équipes** : Gestion des équipes (5 membres dont 1 capitaine), signature numérique de la charte, soumission des dossiers, et accès aux 5 semaines de formations certifiantes.
- **Espace Formateurs & Jurys** : Suivi des séances pédagogiques, émargement par scan de QR code, publication des supports et salon questions/réponses.
- **Espace Administration** : Tableau de bord de pilotage, validation des candidatures, gestion des quotas de filières, et exports de données.

---

## 🏛️ Les 4 Pôles d'Excellence

1. **01. Technologie & Informatique** : Projets d'agriculture connectée, capteurs IoT et développement logiciel.
2. **02. Entrepreneuriat & Innovation** : Concours de pitch de startups, modèle Canvas et incubation de projets à fort impact.
3. **03. Économie & Gestion** : Simulation boursière, gestion de portefeuille d'actifs et gestion de crise d'entreprise.
4. **04. Droit & Mini-Procès** : Concours d'éloquence juridique, plaidoiries et simulation de tribunal arbitral.

---

## 🛠️ Stack Technique

- **Frontend Framework** : React 19 (`react`, `react-dom`)
- **Language** : TypeScript (`strict: true`)
- **Bundler & Dev Server** : Vite 6 (avec code-splitting dynamique et lazy-loading `React.lazy()`)
- **Styling** : Tailwind CSS v3 (palette officielle : Marine `#0E1E4A`, Nuit `#0A1430`, Orange `#E8742A`, Or `#E8B33D`, Papier `#F6F8FC`)
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Notifications** : React Hot Toast

---

## 📁 Architecture du Projet

```text
src/
├── App.tsx                     # 38 routes lazy-loadées + Suspense + Toaster
├── main.tsx                    # Montage React 19
├── index.css                   # Tailwind CSS + variables de thème
│
├── types/                      # Définitions TypeScript (user, team, category, formation)
├── data/                       # Données mockées du tournoi
├── hooks/                      # Hooks personnalisés (useCountdown, useMediaQuery, useAuth, useTeam)
│
├── layouts/                    # 4 Layouts applicatifs
│   ├── StructurePublique.tsx   # Layout public (Navbar + Footer)
│   ├── StructureCandidat.tsx   # Espace candidat (Header + BottomTabBar mobile + Sidebar)
│   ├── StructureFormateur.tsx  # Espace formateur (Header + Navigation émargement)
│   └── StructureAdmin.tsx      # Espace administration (Sidebar dashboard)
│
├── pages/                      # 38 Pages routées ("pages blanches" intelligentes)
│   ├── publique/               # 11 pages (Accueil, Concours, FicheCategorie, Inscription, ...)
│   ├── candidat/               # 15 pages (Dashboard, MonEquipe, CreerEquipe, FormationsHub, ...)
│   ├── formateur/              # 5 pages (Dashboard, SeancesPlanning, EmargementScan, ...)
│   └── admin/                  # 7 pages (AdminDashboard, ValidationEquipes, GestionQuotas, ...)
│
└── components/                 # 39 Composants modulaires
    ├── layout/                 # NavbarPublique, BottomTabBar, SidebarCandidat...
    ├── accueil/                # HeroBanner, CountdownTimer, CategoriesGrid, Timeline...
    ├── categories/             # DroitTournament, TechAgriculture, EcoChallenge, InnoIncubateur
    ├── equipe/                 # TeamCard, MemberSlot, InviteModal, CharterSignature
    ├── formateur/              # QrScanner, SupportUploader, QuestionThread
    ├── ui/                     # Button, Input, Select, Modal, Badge, Accordion...
    └── animations/             # PageLoader, PageTransition, FadeIn
```

Pour le mapping complet des écrans du prototype vers les composants de code, consultez le fichier [AGENT_GUIDE.md](./AGENT_GUIDE.md).

---

## ⚙️ Installation & Lancement

```bash
# Cloner le dépôt
git clone https://github.com/stone2000e/genie_upb_v2.git
cd genie_upb_v2

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

---

## 📜 Licence & Droits

Projet développé pour l'**Université Polytechnique de Bingerville (UPB)**. Tous droits réservés © 2026-2027.
