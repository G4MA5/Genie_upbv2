# 📘 Guide de Développement — Espaces Responsable & Formateur
> **Projet** : GÉNIE UPB 2026 (v2.0)  
> **Destinataire** : Développeur en charge des modules **Responsable (Organisation / Admin)** et **Formateur (Formations & Jury)**.  
> **Objectif** : Restitution fidèle **1:1** des maquettes du prototype officiel (`scripts/`).

---

## 🎯 1. Périmètre & Rôle du Développeur

Vous êtes responsable de l'intégration et de la finalisation de **deux espaces majeurs** du portail :

1. **Espace Responsable / Admin (`R1` à `R2c`)** : Gestion du tournoi, validation des équipes, gestion des quotas de filières, export des listes pour le PCO (Poste de Commandement de l'Organisation), et supervision globale des formations.
2. **Espace Formateur / Jury (`F1` à `F3`)** : Planning des sessions de cours, module d'émargement et scan QR code en direct, publication des supports pédagogiques, et forum d'annonces/questions avec les candidats.

> [!IMPORTANT]
> **Règle absolue du projet : ZÉRO INVENTION.**  
> Tout élément (textes, boutons, agencements, couleurs, modales, interactions) doit provenir directement des maquettes prototypes situées dans le dossier `scripts/`. N'inventez pas de fonctionnalités ou de badges supplémentaires.

---

## 🗂️ 2. Arborescence des Fichiers de Travail

Voici la cartographie exacte des dossiers et fichiers sur lesquels vous devez travailler dans le projet :

```text
genie_upb_v2/
│
├── scripts/                                       <-- VOS PROTOTYPES DE RÉFÉRENCE (HTML/CSS)
│   ├── proto_real.html                            <-- Prototype complet intégrant tous les écrans
│   │
│   │--- [MAQUETTES RESPONSABLE]
│   ├── R1_Desktop.html                            <-- Écran R1 : Équipes à valider (Desktop & Mobile)
│   ├── R1a_Fiche_equipe.html                      <-- Écran R1a : Fiche détaillée de l'équipe
│   ├── R1b_Quotas.html                            <-- Écran R1b : Quotas & Liste d'attente
│   ├── R1c_Export.html                            <-- Écran R1c : Export PCO (CSV / PDF / Excel)
│   ├── R2_Formations.html                         <-- Écran R2 : Suivi global des formations
│   ├── R2a_Planning.html                          <-- Écran R2a : Planning des créneaux de formation
│   ├── R2b_Supports.html                          <-- Écran R2b : Supports de cours déposés
│   └── R2c_Assiduite.html                         <-- Écran R2c : Assiduité & Présences
│   │
│   │--- [MAQUETTES FORMATEUR]
│   ├── F1_Seances.html                            <-- Écran F1 : Séances du formateur
│   ├── F1a_Calendrier.html                        <-- Écran F1a : Calendrier & Planning
│   ├── F1b_Presence_par_scan.html                 <-- Écran F1b : Émargement caméra QR code
│   ├── F2_Supports.html                           <-- Écran F2 : Liste des supports de cours
│   ├── F2a_Publier_un_support.html                <-- Écran F2a : Formulaire de dépôt de support
│   └── F3_Annonces_et_questions.html              <-- Écran F3 : Annonces & Forum de questions
│
├── src/
│   ├── structures/                                <-- VOS LAYOUTS GLOBAUX
│   │   ├── StructureAdmin.tsx                     <-- Layout Espace Responsable (Sidebar + En-tête)
│   │   └── StructureFormateur.tsx                 <-- Layout Espace Formateur (Navbar + Bottom bar mobile)
│   │
│   ├── components/layout/                         <-- COMPOSANTS DE NAVIGATION SPÉCIFIQUES
│   │   └── SidebarAdmin.tsx                       <-- Barre latérale de navigation Responsable
│   │
│   ├── pages/admin/                               <-- VOS PAGES RESPONSABLE (À IMPLÉMENTER / AJUSTER)
│   │   ├── AdminDashboard.tsx                     <-- Vue synthétique du tableau de bord admin
│   │   ├── ValidationEquipes.tsx                  <-- Écran R1 : Validation des équipes candidates
│   │   ├── FicheEquipeAdmin.tsx                   <-- Écran R1a : Fiche équipe détaillée
│   │   ├── GestionQuotas.tsx                      <-- Écran R1b : Gestion des quotas & files d'attente
│   │   ├── ExportDonnees.tsx                      <-- Écran R1c : Export PCO
│   │   ├── SuiviFormations.tsx                    <-- Écrans R2, R2a, R2b, R2c : Supervision formations
│   │   └── ParametresTournoi.tsx                  <-- Paramètres généraux du concours
│   │
│   └── pages/formateur/                           <-- VOS PAGES FORMATEUR (À IMPLÉMENTER / AJUSTER)
│       ├── DashboardFormateur.tsx                 <-- Vue d'accueil du formateur connecté
│       ├── SeancesPlanning.tsx                    <-- Écrans F1 & F1a : Séances et calendrier
│       ├── EmargementScan.tsx                     <-- Écran F1b : Scan QR Code d'émargement
│       ├── PublicationSupports.tsx                <-- Écrans F2 & F2a : Gestion & publication supports
│       └── AnnoncesQuestions.tsx                  <-- Écran F3 : Annonces et questions/réponses
```

> [!WARNING]
> **Fichiers hors de votre périmètre (ne pas modifier)** :
> - `src/pages/publique/` (Accueil, Concours, Catégories Technologie, Innovation, Économie, Droit — déjà 100% finalisées).
> - `src/pages/candidat/` (Espace Candidat géré par un autre développeur).
> - `src/components/dev/PrototypeNavDrawer.tsx` (Menu d'aide au développement).

---

## 🗺️ 3. Matrice de Correspondance des Écrans

| Code | Écran | Maquette HTML Source | Fichier React Cible | Route dans l'Application |
| :---: | :--- | :--- | :--- | :--- |
| **`R1`** | **Équipes à valider** | `scripts/R1_Desktop.html` | [ValidationEquipes.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/ValidationEquipes.tsx) | `/admin/equipes` |
| **`R1a`** | **Fiche Équipe** | `scripts/R1a_Fiche_equipe.html` | [FicheEquipeAdmin.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/FicheEquipeAdmin.tsx) | `/admin/equipes/:id` |
| **`R1b`** | **Quotas & Attente** | `scripts/R1b_Quotas.html` | [GestionQuotas.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/GestionQuotas.tsx) | `/admin/quotas` |
| **`R1c`** | **Export PCO** | `scripts/R1c_Export.html` | [ExportDonnees.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/ExportDonnees.tsx) | `/admin/export` |
| **`R2`** | **Suivi Formations** | `scripts/R2_Formations.html` | [SuiviFormations.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/SuiviFormations.tsx) | `/admin/formations` |
| **`R2a`** | **Planning Formations** | `scripts/R2a_Planning.html` | [SuiviFormations.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/SuiviFormations.tsx) *(onglet Planning)* | `/admin/formations` *(tab: planning)* |
| **`R2b`** | **Supports Déposés** | `scripts/R2b_Supports.html` | [SuiviFormations.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/SuiviFormations.tsx) *(onglet Supports)* | `/admin/formations` *(tab: supports)* |
| **`R2c`** | **Assiduité & Présences** | `scripts/R2c_Assiduite.html` | [SuiviFormations.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/admin/SuiviFormations.tsx) *(onglet Assiduité)* | `/admin/formations` *(tab: presence)* |
| **`F1`** | **Mes Séances** | `scripts/F1_Seances.html` | [SeancesPlanning.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/formateur/SeancesPlanning.tsx) | `/formateur/seances` |
| **`F1a`** | **Calendrier Formateur** | `scripts/F1a_Calendrier.html` | [SeancesPlanning.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/formateur/SeancesPlanning.tsx) *(vue calendrier)* | `/formateur/seances` *(vue calendrier)* |
| **`F1b`** | **Émargement par Scan QR** | `scripts/F1b_Presence_par_scan.html` | [EmargementScan.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/formateur/EmargementScan.tsx) | `/formateur/seances/scan-qr` |
| **`F2`** | **Supports de cours** | `scripts/F2_Supports.html` | [PublicationSupports.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/formateur/PublicationSupports.tsx) | `/formateur/supports` |
| **`F2a`** | **Publier un support** | `scripts/F2a_Publier_un_support.html` | [PublicationSupports.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/formateur/PublicationSupports.tsx) *(modale / form)* | `/formateur/supports` *(action publier)* |
| **`F3`** | **Annonces & Questions** | `scripts/F3_Annonces_et_questions.html` | [AnnoncesQuestions.tsx](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/formateur/AnnoncesQuestions.tsx) | `/formateur/annonces` |

---

## 🏢 4. Détail Écran par Écran : Espace Responsable

### `R1` — Équipes à Valider (`scripts/R1_Desktop.html`)
- **Fichier React** : `src/pages/admin/ValidationEquipes.tsx`
- **Route** : `/admin/equipes`
- **Fonctionnalités clés** :
  - **Filtres par statut** : Boutons "Toutes", "En attente de validation", "Validées", "Dossier incomplet", "Rejetées".
  - **Filtres par Catégorie** : Pastilles Technologie, Innovation, Économie, Droit.
  - **Table / Grille des équipes** : Nom de l'équipe, filière d'origine, chef d'équipe, effectif (ex: 3/4), date de soumission.
  - **Actions rapides** : Bouton *"Valider"* (vert), bouton *"Fiche"* redirigeant vers `R1a`, bouton *"Rejeter"* (rouge avec modal de motif).
  - **Version Mobile** : Les lignes de tableau basculent en cartes compactes lisibles avec badge de statut.

### `R1a` — Fiche Équipe Détaillée (`scripts/R1a_Fiche_equipe.html`)
- **Fichier React** : `src/pages/admin/FicheEquipeAdmin.tsx`
- **Route** : `/admin/equipes/:id`
- **Fonctionnalités clés** :
  - En-tête avec bouton retour `← Équipes`, nom de l'équipe, badge de catégorie et statut actuel.
  - **Bloc Membres** : Liste des 3 à 4 étudiants (Nom, prénom, matricule, niveau L2/L3, rôle Chef ou Membre, statut étudiant vérifié).
  - **Bloc Dossier de candidature** : Fichier technique PDF soumis, lien de consultation, taille, date de dépôt.
  - **Panneau de décision** :
    - Bouton principal : *« Valider définitivement l'équipe »* (déclenche notification et passage en quota).
    - Bouton secondaire : *« Demander une correction »* (champ texte pour mentionner les pièces manquantes).
    - Bouton de rejet : *« Refuser la candidature »*.

### `R1b` — Quotas & Liste d'Attente (`scripts/R1b_Quotas.html`)
- **Fichier React** : `src/pages/admin/GestionQuotas.tsx`
- **Route** : `/admin/quotas`
- **Fonctionnalités clés** :
  - Jauge de remplissage global des équipes autorisées (ex: 48/60 équipes validées).
  - **Répartition par catégorie** :
    - Technologie : barre de quota (ex: 12/12 - Complet)
    - Innovation : barre de quota (ex: 10/16 - 6 places)
    - Économie : barre de quota (ex: 8/12 - 4 places)
    - Droit : barre de quota (ex: 16/16 - Complet)
  - **Gestion de la file d'attente (Waitlist)** : Liste priorisée des équipes en réserve selon la date de soumission avec bouton d'admission manuelle en cas de désistement.

### `R1c` — Export PCO (`scripts/R1c_Export.html`)
- **Fichier React** : `src/pages/admin/ExportDonnees.tsx`
- **Route** : `/admin/export`
- **Fonctionnalités clés** :
  - **Exportation des listes officielles** :
    - Format CSV (séparateur point-virgule)
    - Format Excel (.xlsx)
    - Format PDF d'émargement imprimable
  - **Sélection des filtres d'export** : Sélectionner les colonnes (Matricules, Noms, Téléphones, Catégories, Équipes validées uniquement).
  - **Bouton de téléchargement instantané** avec simulation de téléchargement de fichier.

### `R2`, `R2a`, `R2b`, `R2c` — Suivi des Formations (`scripts/R2_*.html`)
- **Fichier React** : `src/pages/admin/SuiviFormations.tsx`
- **Route** : `/admin/formations`
- **Fonctionnalités clés (organisées avec des onglets)** :
  - **Vue globale (`R2`)** : Statistiques de participation, taux d'assiduité moyen, formateurs actifs.
  - **Planning (`R2a`)** : Grille des créneaux planifiés, salles physiques (ex: Amphi A, Salle informatique 3), liens de visio, bouton d'ajout de séance.
  - **Supports (`R2b`)** : Liste des supports déposés par les formateurs, bouton d'approbation et téléchargement.
  - **Assiduité (`R2c`)** : Table complète des étudiants avec taux de présence (barres colorées : vert > 75%, orange 50-75%, rouge < 50% avec risque d'exclusion du tournoi).

---

## 👨‍🏫 5. Détail Écran par Écran : Espace Formateur

### `F1` & `F1a` — Mes Séances & Calendrier (`scripts/F1_Seances.html`, `scripts/F1a_Calendrier.html`)
- **Fichier React** : `src/pages/formateur/SeancesPlanning.tsx`
- **Route** : `/formateur/seances`
- **Fonctionnalités clés** :
  - **Carte de la prochaine séance** : Titre du module, catégorie associée, date, heure, lieu ou lien visio, nombre d'inscrits.
  - **Basculement de vue** : Bouton pour basculer entre la vue "Liste des séances" et la vue "Calendrier mensuel".
  - **Bouton direct d'émargement** : Bouton proéminent *« Lancer l'émargement de la séance »* menant directement à `F1b`.

### `F1b` — Émargement par Scan QR Code (`scripts/F1b_Presence_par_scan.html`)
- **Fichier React** : `src/pages/formateur/EmargementScan.tsx`
- **Route** : `/formateur/seances/scan-qr`
- **Fonctionnalités clés** :
  - **Viseur de scan caméra** : Zone carrée animée simulant le viseur de la caméra avec scan laser vert/orange.
  - **Mode manuel de secours** : Champ pour saisir directement le matricule UPB de l'étudiant si la caméra est indisponible.
  - **Feed des émargements en direct** : Liste défilante des étudiants validés avec confirmation sonore/visuelle (Nom, matricule, heure d'émargement).
  - Compteur d'assiduité en temps réel (ex: 28 / 34 présents).

### `F2` & `F2a` — Supports de Cours (`scripts/F2_Supports.html`, `scripts/F2a_Publier_un_support.html`)
- **Fichier React** : `src/pages/formateur/PublicationSupports.tsx`
- **Route** : `/formateur/supports`
- **Fonctionnalités clés** :
  - Liste des documents déposés avec badges de type (PDF, Diaporama, Archive ZIP, Liens GitHub/Drive).
  - Nombre de téléchargements et date de dernière mise à jour.
  - **Modale / Formulaire de publication (`F2a`)** :
    - Champ Titre du support
    - Sélecteur de catégorie (Technologie, Innovation, Économie, Droit)
    - Description / Objectifs pédagogiques
    - Zone de drop de fichier ou saisie d'URL externe
    - Bouton d'action *« Publier pour les candidats »*.

### `F3` — Annonces & Forum de Questions (`scripts/F3_Annonces_et_questions.html`)
- **Fichier React** : `src/pages/formateur/AnnoncesQuestions.tsx`
- **Route** : `/formateur/annonces`
- **Fonctionnalités clés** :
  - **Deux volets / onglets distincts** :
    1. **Annonces officielles** : Rédiger une communication officielle visible par tous les candidats d'une filière ou catégorie.
    2. **Questions des étudiants** : Liste des questions posées par les chefs d'équipe avec filtre *« En attente de réponse »* et *« Réponses apportées »*.
  - Zone de réponse rapide en accordéon pour apporter des éclaircissements techniques ou organisationnels.

---

## 🎨 6. Charte Graphique & Design System UPB

Respectez scrupuleusement les constantes de design du projet pour garantir une harmonie totale :

### 1. Couleurs Principales (HEX & Tailwind)
| Rôle | Code Couleur | Usage |
| :--- | :---: | :--- |
| **Bleu Nuit UPB** | `#0A1430` / `#0E1E4A` | Arrière-plans sombres, headers, texte des titres principaux |
| **Bleu Électrique** | `#2F6BF0` / `#1D5BB5` | Boutons d'action, liens actifs, bordures d'accentuation |
| **Orange Génie** | `#E8742A` / `#F58220` | Boutons d'action prioritaires (CTA), badges "En attente", accents |
| **Or / Doré** | `#F2C45A` / `#E8B33D` | Badges officiels, trophée, distinctions |
| **Fond Admin** | `#E9EBF0` / `#F6F7FA` | Couleur de fond globale du panneau d'administration |
| **Blanc pur** | `#FFFFFF` | Cartes blanches, tables, conteneurs principaux |
| **Vert Validation** | `#10B981` / `#059669` | Statut validé, présence confirmée, assiduité > 75% |
| **Rouge Refus** | `#EF4444` / `#DC2626` | Statut rejeté, absence injustifiée, annulation |

### 2. Typographies Officielles
- **Titres & Interface** : `font-sans` (`Nunito, sans-serif`)
- **Chiffres, Matricules, Codes & Horaires** : `font-mono` (`'JetBrains Mono', monospace`)
- **Titres de sections / Tags spécifiques** : `'Silkscreen', monospace` (si mentionné dans la maquette)

> [!NOTE]
> Toutes les polices sont déjà chargées localement en WOFF2 dans [index.html](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/index.html) et [index.css](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/index.css). N'ajoutez aucun `<link>` Google Fonts !

### 3. Icônes
Utilisez exclusivement le package `lucide-react` déjà installé dans le projet :
```tsx
import { 
  Users, CheckCircle2, XCircle, AlertCircle, 
  Download, FileText, Calendar, QrCode, MessageSquare, 
  Search, Filter, ChevronRight, Eye 
} from 'lucide-react';
```

---

## 🚀 7. Guide de Démarrage Local & Vérifications

### 1. Lancement de l'environnement de développement
Ouvrez votre terminal dans le répertoire racine du projet et lancez le serveur Vite :
```powershell
npm run dev
```
Le site sera accessible sur : **`http://localhost:5173/`**

### 2. Comment inspecter les maquettes prototypes pixel par pixel
Lancez un serveur local HTTP pour ouvrir n'importe quel fichier du dossier `scripts/` :
```powershell
python -m http.server 8089
```
Vous pouvez ensuite ouvrir directement :
- **Prototype global complet** : `http://localhost:8089/scripts/proto_real.html`
- **Maquette R1 spécifique** : `http://localhost:8089/scripts/R1_Desktop.html`
- **Maquette F1 spécifique** : `http://localhost:8089/scripts/F1_Seances.html`
*(et ainsi de suite pour chaque fichier HTML du dossier `scripts/`)*.

### 3. Utilisation du Menu Burger de Navigation (en bas à gauche)
Sur votre serveur de dev local (`http://localhost:5173/`), vous disposez d'un **bouton burger flottant rond `☰`** situé en bas à gauche de chaque écran :
- Cliquez dessus pour faire apparaître le volet latéral instantané.
- Cliquez directement sur **`R1`**, **`R1a`**, **`R1b`**, **`R1c`**, **`R2`** ou **`F1`**, **`F2`**, **`F3`** pour tester immédiatement vos écrans en cours de travail.
- Utilisez la barre de recherche du menu pour filtrer les pages.

### 4. Vérification du Build avant de pousser
Avant de finaliser une session de travail, exécutez impérativement la commande suivante pour vérifier qu'aucune erreur TypeScript ou de compilation n'est présente :
```powershell
npm run build
```
Le build doit impérativement afficher : **`✓ built in ...` sans aucune erreur**.

---

## ✅ 8. Checklist Qualité à Valider pour Chaque Écran

Avant de considérer un écran comme terminé :
- [ ] L'écran correspond au pixel près à sa maquette HTML dans `scripts/`.
- [ ] Les données dynamiques sont typées avec TypeScript (pas de `any`).
- [ ] Le responsive fonctionne sur Desktop (1280px) et sur Mobile (390px).
- [ ] Aucun texte ou label n'est inventé par rapport au prototype.
- [ ] `npm run build` se termine avec 0 erreur.
- [ ] Vos commits respectent la convention : `feat(admin): ...` ou `feat(formateur): ...`.

---
*Ce document sert de contrat technique de référence pour toute contribution aux espaces Responsable et Formateur du projet GÉNIE UPB 2026.*
