# JOURNAL DES REPROCHES, ERREURS ET RÈGLES DE FIDÉLITÉ STRICTE

> **Document de référence qualité pour l'agent Antigravity**
> Ce fichier recense l'intégralité des reproches formulés par l'utilisateur, les erreurs commises par l'assistant, ainsi que les règles absolues de vérification à appliquer avant toute validation d'écran sur ce projet et pour tous les futurs projets de reproduction de prototypes.
> **RÈGLE N°1 : Ce document est mis à jour à chaque nouveau reproche ou remarque de l'utilisateur.**

---

## 1. RÈGLE D'OR ABSOLUE : ZÉRO INVENTION

> [!CAUTION]
> **INTERDICTION FORMELLE D'INVENTER LE MOINDRE ÉLÉMENT.**
> - Ne jamais inventer de composants qui n'existent pas dans le prototype HTML.
> - Ne jamais ajouter de boutons de test ou de bascule développeur (ex : barres "Phase : Ouvertes / Bientôt / Closes").
> - Ne jamais remplacer une page complexe par un placeholder générique ou un template simplifié.
> - Chaque texte, couleur, dégradé, bordure, rayon d'arrondi (`border-radius`), ombre portée (`box-shadow`), image et animation provient **DIRECTEMENT ET STRICTEMENT** du fichier prototype HTML source (`scripts/proto_real.html`).

> [!IMPORTANT]
> **GUIDE MÉTHODOLOGIQUE DES CATÉGORIES**
> Pour toute page de catégorie (Technologie, Droit, Économie, Innovation), suivre impérativement le patron d'architecture et de calibration consigné dans [GUIDE_METHODE_CATEGORIES.md](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/GUIDE_METHODE_CATEGORIES.md).

---

## 2. HISTORIQUE DÉTAILLÉ DES REPROCHES & ERREURS COMMISES

### Erreur 1 : L'invention de composants fictifs (Barre "Phase" sur Inscription)
- **Le reproche utilisateur** :
  > *"inscription . deja la page tu as inventer des bouton ou tu aas mis phase . est ce que je peut avoir une explication ?"*
- **L'erreur commise** :
  Sur la page Inscription (`Inscription.tsx`), au lieu de reproduire fidèlement l'écran `S8 Creer un compte` du prototype, l'assistant a inventé une barre d'onglets développeur artificielle intitulée *"Phase : Ouvertes | Bientôt (GB) | Closes (GC)"* avec des boutons cliquables qui n'ont jamais existé dans le design du prototype.
- **Règle corrective** :
  Les écrans `S8 Creer un compte`, `Inscriptions bientot ouvertes (GB)` et `Inscriptions closes (GC)` sont des écrans distincts dans le prototype ayant chacun leur route propre. On ne fusionne jamais des écrans avec des toggles inventés.

---

### Erreur 2 : Remplacement des pages riches par des pages génériques simplifiées
- **Le reproche utilisateur** :
  > *"attend mais tu te fou de moi ? quand tu regarde le prototype html , les pages qui sont la bas tu es sur que tu as respecter les element ? je prend juste un exemple concours et que tu vas dans technologie quand tu regarde ce qui est dans le prototype html et ce que tu as fait c'est la mm chose ? dis moi la veriter tu as inventer ou tu as vraiment regarder le prototype ???"*
- **L'erreur commise** :
  Pour la page Catégorie Technologie (`CategorieTechnologie.tsx`), au lieu de lire et d'extraire le balisage HTML complet de la section `ST Agriculture` et de ses sous-sections (`SURVEILLER LES CULTURES`, les 4 étapes du déroulé `CONSTRUIRE PUIS PROUVER`, le drone, les jurys, etc.), l'assistant a codé une page générique standard inventée de toutes pièces avec une simple carte récapitulative. De plus, une barre d'onglets sticky artificielle avait été ajoutée dans `FicheCategorie.tsx`.
- **Règle corrective** :
  Avant de coder une page, localiser le `data-screen-label` exact dans `scripts/proto_real.html` et reproduire chaque section, chaque stat, chaque illustration vectorielle ou photo réelle sans rien omettre ni simplifier.
- **Résolution appliquée et vérifiée (14 novembre 2026)** :
  1. Extraction intégrale de la section `is.ST` (46 291 caractères) depuis `scripts/proto_real.html`.
  2. Suppression de la barre sticky inventée dans `FicheCategorie.tsx` pour permettre au fond `#0C1E4A` de s'étendre dès le pixel `y = 0` sous la capsule flottante.
  3. Reconstruction fidèle de la page en 100% Tailwind CSS avec :
     - **Hero** : Titre géant « Qui sera le génie technologique » avec double contour d'ombre iconique, fond Blueprint grid SVG, grand drone silhouette blanche + ombre 30px, bouton d'action orange « S'inscrire → ».
     - **ST Agriculture** : Fond bleu `#0B3FD9`, badge `[ MISSION ] [ AGRITECH ]`, grand titre « SURVEILLER LES CULTURES » en Silkscreen, topographie vectorielle d'élévation, 3 statistiques `06`, `3+1`, `03`.
     - **Technologie déroulé** : Titre « CONSTRUIRE PUIS PROUVER », drone flottant en apesanteur, transition de pixels SVG authentique, bandeau « 3+1 JOURS », 4 colonnes d'étapes (`01 Montage`, `02 Intégration`, `03 Calibrage`, `04 Expériences`), ligne méta `© GÉNIE UPB`.
     - **Technologie évaluation** : Fond `#0F3C8A`, titre « CE QUE LE JURY VÉRIFIE », panneau indicateur à 3 directions avec masque radial, 3 points critiques avec animations Web Animations API (rapport technique avec checkmark verte, injection de données avec bits descendants et barres égaliseur, contrôle station avec ondes radar concentriques), barre inférieure jury avec 3 membres.
     - **Footer public** : Présent et aligné en fin de page.
  4. Vérification visuelle réelle Desktop (1280x800) et Mobile (390x844) validée avec succès par le sous-agent navigateur.

---

### Erreur 3 : Liens fantômes menant à l'accueil
- **Le reproche utilisateur** :
  > *"deja les element du burger je comprend technologie innovation et les autres ca mene vers des pages normalement mais la jevois que ca mene a l'acceuil seulement . attend tu est sur que tu as respecter les pages du prototype html ?"*
- **L'erreur commise** :
  Dans le menu mobile (`MobileDrawer.tsx`) et la navbar, les liens pointaient vers `/` ou ne déclenchaient aucune vraie navigation, bloquant l'utilisateur sur la page d'accueil au lieu de charger les pages dédiées (`/concours/technologie`, `/concours/innovation`, `/concours/economie`, `/concours/droit`).
- **Règle corrective** :
  Chaque lien du menu burger et de la navbar doit pointer vers sa route spécifique fonctionnelle qui affiche le contenu dédié correspondant au prototype.

---

### Erreur 4 : Défauts de layout global, bande blanche parasite & footer indésirable
- **Le reproche utilisateur** :
  > *"hum deja pour page est en dessous de la nav bar seigneur mais quest qui te prend ? tes verifiction c'est de fausse simulation ?"*
- **L'erreur commise** :
  1. **Bande blanche parasite au-dessus de la page** : Dans `StructurePublique.tsx`, une classe `pt-20 md:pt-28` avait été appliquée sur `<main>`, exposant 80px à 112px du fond gris-blanc du wrapper au-dessus de la page d'inscription. La navbar flottait dans ce trou blanc et la page bleue `#BFD6FF` ne commençait qu'en dessous, donnant l'impression que la page était coupée et enfoncée sous la navbar.
  2. **Footer géant sur des pages autonomes** : Le `FooterPublique` était affiché aveuglément sur toutes les pages, y compris sur `/inscription` (S8) et `/connexion` (S9), alors que dans le prototype, ces pages n'ont strictement AUCUN footer (le footer est réservé à l'Accueil S1 et aux Catégories).
- **Règle corrective** :
  1. `<main>` ne doit comporter aucun padding artificiel (`mainPad: 0` comme dans le prototype). Le fond de chaque page (`#BFD6FF`, `#0C1E4A`, etc.) doit s'étendre sans interruption du pixel `y = 0` jusqu'en bas.
  2. Chaque page gère son espacement interne (`padding-top: 100px` ou `pt-28`) pour que la navbar capsule flotte harmonieusement au-dessus de son propre arrière-plan.
  3. Le footer ne doit être affiché QUE sur les pages où il est explicitement présent dans le prototype.

---

### Erreur 5 : Vérifications superficielles dites "fausses simulations"
- **Le reproche utilisateur** :
  > *"tes verifiction c'est de fausse simulation ?"*
- **L'erreur commise** :
  L'assistant se contentait de vérifier que la page chargeait un code HTTP 200 ou que certains nœuds texte existaient, sans inspecter visuellement la cohérence d'ensemble (fond plein écran, alignement vertical par rapport à la navbar, présence de bandes vides ou de footers hors contexte).
- **Règle corrective** :
  Toute vérification doit obligatoirement être une **vérification visuelle réelle par capture d'écran** (desktop ET mobile) via le sous-agent navigateur, en inspectant l'affichage effectif tel qu'un utilisateur humain le voit à l'écran.

---

### Erreur 6 : Bouton d'inscription du menu mobile bâclé
- **Le reproche utilisateur** :
  > *"le bouton s'incrire dans le burger n'est pas tres bien fait"* (avec capture d'écran à l'appui)
- **L'erreur commise** :
  Le bouton "S'inscrire" dans le tiroir mobile n'avait pas les dimensions, la bordure blanche épaisse (3px), le dégradé orange exact (`#FF9A3D` vers `#E8621A`), et l'ombre portée profonde du prototype.
- **Règle corrective** :
  Copier les styles CSS exacts inline du prototype : `min-h-[54px] px-[22px] rounded-[14px] border-[3px] border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-[18px] shadow-[0_10px_24px_rgba(232,98,26,0.35)]`.

---

### Erreur 7 : Animation du menu tiroir burger manquante ou incomplète
- **Le reproche utilisateur** :
  > *"super passon au burger ya une animation qui doit etre mis en place va voir dans le html"*
- **L'erreur commise** :
  Le menu mobile s'ouvrait au départ comme un modal basique au lieu d'exécuter l'animation cinématique 3D du prototype : la page principale se décale vers la droite (`translateX(72vw)`), rétrécit (`scale(0.86)`), prend des coins arrondis (`borderRadius: 28px`) avec une ombre forte (`boxShadow: -30px 0 60px rgba(0,0,0,0.45)`), révélant le tiroir bleu nuit en arrière-plan.
- **Règle corrective** :
  Toujours inspecter les transitions CSS et styles dynamiques dans le prototype pour reproduire la cinématique exacte.

---

### Erreur 8 : Mascotte d'inscription dénaturée, textes inventés et omission des animations interactives (yeux qui suivent la souris, clignements, hochement, célébration)
- **Le reproche utilisateur** :
  > *"dans inscription inscription la mascotte que tu as mise ce n'est pas las bonnne et iil y a des animation qui manque"*
  > *"je crois que tes con . img1 c'est ce que tu as fait . et dans le html va regarder si c'est pareil tu as encore inventer des truc et tu n'as pas fait l'animation des yeux qui suivent la souris ."*
- **L'erreur commise** :
  1. **Textes inventés** : Avoir substitué les vrais titres et sous-titres dynamiques du prototype (`matTitle` et `matSub`) par des phrases codées en dur ("Rejoins l'aventure !", "Saisis ton matricule UPB pour commencer."). Dans le prototype, le titre et le sous-titre sont vivants et changent selon l'état du robot :
     - `idle` (repos) : *"Prêt pour le défi ?"* / *"Entre ton matricule, on s’occupe du reste."*
     - `focus` (frappe) : *"Super, continue…"* / *"Il figure sur ta carte d’étudiant."*
     - `err` (erreur de format) : *"Oups !"* / *"Ce matricule ne semble pas correct."*
     - `think` (chargement) : *"Je cherche…"* / *"Une seconde, on vérifie ton matricule."*
     - `happy` (étudiant trouvé) : *"Te voilà !"* / *"Vérifie que c’est bien toi."*
     - `joy` (consentement validé) : *"Génial !"* / *"Il ne reste qu’à créer ton compte."*
  2. **Omission complète des animations interactives** :
     - Les yeux étaient deux ronds noirs statiques au lieu d'avoir les pupilles (`data-pupil="1" data-k="6"`) qui suivent trigonométriquement les mouvements du curseur souris (`pointermove`).
     - Absence du clignement périodique des yeux (`blink()` toutes les 2.5s à 5s avec `scale: 1 0.08`).
     - Absence du regard focalisé sur la saisie du champ matricule lors de la frappe.
     - Absence du regard circulaire orbital du robot quand il réfléchit (`Math.cos(t) * 300, Math.sin(t) * 300`).
     - Absence du hochement de tête d'erreur "non" (`data-head` rotation alternative `[-14deg, 12deg, -8deg, 5deg]`) en cas de matricule invalide.
     - Absence du saut de joie (`data-face` bounce vertical) et de l'agitation triomphante du bras (`data-arm` wave `[-22deg, 10deg]`) lorsque l'étudiant est identifié.
     - Absence de l'état d'écrasement des yeux (`eyeSq`), des joues roses (`cheekOp`), et de la forme expressive de la bouche (`mouthW`, `mouthH`, `mouthR`).
- **Règle corrective** :
  Extraire et réintégrer l'intégralité du moteur d'animation JavaScript du prototype : suivi du regard (`pointermove`), clignement périodique, animation de réflexion orbitale, réaction physique aux erreurs et aux succès, et textes d'humeur dynamiques exacts.

---

### Erreur 9 : Utilisation de styles inline `style={{ ... }}` au lieu de classes Tailwind CSS
- **Le reproche utilisateur** :
  > *"je t'ai dit que on utilisait pas du css mais du tailwind css non ? jespere que tu as suivi c'est consigne . tu as utiliser tu tailwind oui ou non ?"*
- **L'erreur commise** :
  Sur `Inscription.tsx`, pour reproduire la carte S8 et la mascotte SVG à partir du fichier prototype, l'assistant a conservé de nombreux styles inline `style={{ position: 'relative', width: '100%', ... }}` hérités du prototype HTML au lieu de les convertir rigoureusement en classes utilitaires Tailwind CSS (`className="..."`).
- **Règle corrective** :
  1. Toute mise en page, structure, typographie, couleur, espacement, ombre et bordure doit être exprimée en classes Tailwind CSS (`className="..."`).
  2. Les attributs `style={{ ... }}` sont formellement réservés aux seules valeurs dynamiques calculées en temps réel par les fonctions mathématiques/JavaScript (ex: `style={{ transform: \`translate(\${dx * r}px, \${dy * r}px)\` }}` pour le suivi des yeux ou les keyframes d'interpolation).
  3. Aucun style CSS statique ne doit subsister sous forme d'objet inline `style={{ ... }}`.

---

### Erreur 10 : Éléments parasites inventés sur Inscription (sourcils sur la mascotte et traits/barres de progression en bas)
- **Le reproche utilisateur** :
  > *"on a pas encore fini avec inscription , tu fait plein d'erreur . deja pourquoi il la dessourcil , ensuite pourquoi tu as ajouter de trait en bas ?"*
- **L'erreur commise** :
  1. **Sourcils inventés** : L'assistant a ajouté artificiellement deux éléments `<span>` de sourcils au-dessus des yeux du robot. Dans le prototype source `scripts/proto_real.html` (lignes 1042-1043), le robot n'a **STRICTEMENT AUCUN SOURCIL**.
  2. **Traits en bas inventés** : L'assistant a ajouté deux barres horizontales (`w-8 h-1 rounded-full`) sous la mascotte comme une fausse barre de progression d'étapes. Ces traits n'existent nulle part dans le prototype.
- **Règle corrective** :
  1. Supprimer immédiatement et totalement les deux sourcils du visage du robot.
  2. Supprimer immédiatement le conteneur de traits/stepper sous la mascotte.
  3. Se calquer à 100% sur le balisage exact extrait dans `s8_extracted_exact.html` sans ajouter le moindre élément décoratif supplémentaire.

---

### Erreur 11 : Bordure mince manquante sur la navbar desktop et omission des animations d'arrière-plan et d'éléments sur Catégorie Technologie
- **Le reproche utilisateur** :
  > *"deja ajoute des border sur la nav bar desktop mais tres mince . ensuite il a y a les animation des element et en arrire plan que tu n'as pas fait."*
- **L'erreur commise** :
  1. Dans `NavbarPublique.tsx`, la capsule `<nav>` desktop n'avait pas la fine bordure semi-transparente du prototype (`border: 1px solid rgba(255,255,255,.16)`).
  2. Sur Catégorie Technologie, plusieurs animations vivantes du prototype n'avaient pas été intégrées :
     - La dérive diagonale continue de la grille blueprint Hero (`data-si-bg="1"`, décalage 880px 660px sur 90s).
     - Le générateur dynamique de cellules Cyber Tetris / moniteurs CRT Matrix phosphorescents avec scanlines et code Matrix vert/orange (`data-tetris="1"`).
     - L'ondulation continue des courbes de niveau de la topographie vectorielle d'élévation en SVG.
     - L'oscillation verticale de flottaison du drone Hero (`data-si-bot="1"` de 0 à -18px).
     - L'animation de scroll reveal (`opacity: 0, translateY(24px)` vers `opacity: 1, translateY(0)`) à l'apparition des éléments.
- **Règle corrective** :
  1. Appliquer la classe Tailwind exacte `border border-white/[0.16]` sur la balise `<nav>` de la capsule desktop dans `NavbarPublique.tsx`.
  2. Implémenter et brancher rigoureusement toutes les animations d'arrière-plan et d'éléments (`TechHeroBackground.tsx`, `TopographyWave.tsx`, `data-si-bot`, `data-tetris`, `data-fx="float"`).
- **Résolution appliquée et vérifiée (14 novembre 2026)** :
  - Bordure `border border-white/[0.16]` ajoutée sur `NavbarPublique.tsx`.
  - Moteur `TechHeroBackground.tsx` connecté avec grille blueprint dérivante et terminaux CRT Matrix clignotants.
  - Ondulation morphologique SVG continue sur les 24 courbes de niveau dans `TopographyWave.tsx`.
  - Flottaison verticale active sur le drone Hero desktop et mobile.
  - Vérification visuelle validée par le sous-agent navigateur (`screenshots/step_173_shot_1.png`).

---

### Erreur 12 : Décalibrage arbitraire du Hero de Catégorie au lieu d'utiliser l'Accueil comme modèle de référence
- **Le reproche utilisateur** :
  > *"tu es sur que c'est la taille de la hero de acceuil tu as pris ? parce en fait la page d'acceuil c'est comme un modele tout est deja bien calibrer la bas"*
- **L'erreur commise** :
  Suite à la remarque sur des éléments perçus comme trop gros, l'assistant a sous-dimensionné arbitrairement la police du titre à `clamp(42px, 5.5vw, 96px)` (ce qui donnait ~70px sur Desktop 1280px) et a rétréci le bouton CTA à `min-h-[56px]`, `px-7`, texte `20px` et bordure `3px`, au lieu de se référer aux dimensions réelles et calibrées de la page d'accueil (`HeroBanner.tsx`) qui sert de standard :
  - Bouton Accueil : `min-h-[60px]`, `px-8`, `border-4 border-white`, `rounded-2xl`, texte `22px` font-black.
  - Titre Accueil : `63px` mobile, `150px` desktop sous conteneur `scale-[0.84]` (~126px calculé).
- **Règle corrective** :
  La page d'accueil (`Accueil.tsx` / `HeroBanner.tsx`) est le modèle de calibrage de toute la plateforme :
  1. Le bouton d'action principal CTA d'un Hero doit réutiliser STRICTEMENT les tokens de l'Accueil : `min-h-[52px] sm:min-h-[58px] lg:min-h-[60px] px-6 sm:px-8 lg:px-8 rounded-2xl border-4 border-white text-lg sm:text-xl lg:text-[22px]`.
  2. Le titre du Hero doit être calibré sur l'échelle visuelle de l'Accueil (~60px sur mobile, ~115-126px sur desktop pour les lignes fortes), en maintenant un empilement compact `leading-[0.86]`.

---

### Erreur 13 : Blocage de la navigation et du scroll lors de la transition depuis l'Accueil vers les autres pages
- **Le reproche utilisateur** :
  > *"et je note un probleme . des fois quand tu qui te acceuil pour venir dans technologie ou les autres pages tu n'arrive plus a naviguer . essaie de verifier ca"*
- **L'erreur commise** :
  1. **Fuite de l'état `overflow: hidden` du Rideau d'Accueil** : `RideauAccueil.tsx` applique `document.documentElement.style.overflow = 'hidden'` et `document.body.style.overflow = 'hidden'`. Lors d'une navigation directe (via la navbar desktop ou le tiroir mobile) quittant l'Accueil (`/`) alors que le rideau n'avait pas été ouvert, React démonte `<Accueil />` et `<RideauAccueil />` instantanément. Le callback `onExitComplete` d'`AnimatePresence` n'est jamais déclenché, et le `useEffect` ne contenait aucun nettoyage au démontage. En conséquence, `overflow: hidden` restait figé de manière permanente sur `<html>` et `<body>`, bloquant tout défilement et toute navigation sur `/concours/technologie` et les autres pages.
  2. **Absence de purge défensive sur `ScrollToTop.tsx`** : Le composant ne faisait que `window.scrollTo(0, 0)` sans réinitialiser les styles d'overflow modifiés par les pages précédentes.
  3. **Liens génériques sur les capsules du Hero Accueil** : Dans `HeroBanner.tsx`, les badges Économie, Technologie, Droit et Innovation menaient tous vers `/concours` au lieu de pointer directement vers leurs sous-catégories respectives.
- **Règle corrective** :
  1. Tout composant verrouillant le défilement global (`overflow = 'hidden'`) DOIT OBLIGATOIREMENT intégrer un hook de cleanup au démontage :
     ```tsx
     useEffect(() => {
       return () => {
         document.documentElement.style.overflow = '';
         document.body.style.overflow = '';
       };
     }, []);
     ```
  2. `ScrollToTop.tsx` doit purger défensivement toutes les propriétés d'overflow (`overflow`, `overflowX`, `overflowY`) sur `documentElement` et `body` à chaque transition de route (`pathname`).
  3. Toutes les capsules et liens de catégories (Navbar, Hero, Bento Grid, Mobile Drawer) doivent router directement vers leurs URL canoniques `/concours/:categorySlug`.
- **Résolution appliquée et vérifiée (14 novembre 2026)** :
  - Cleanup au démontage implémenté dans `RideauAccueil.tsx`.
  - Purge défensive d'overflow configurée dans `ScrollToTop.tsx`.
  - Liens des badges de `HeroBanner.tsx` et cartes de `CategoriesGrid.tsx` redirigés vers `/concours/:categorySlug`.
  - Build TypeScript / Vite 100% propre (`npm run build` en 8.26s).
  - Test de navigation validé en conditions réelles par sous-agent navigateur (défilement fluide vérifié, `window.scrollY` opérationnel).

---

## 3. CHECK-LIST OBLIGATOIRE AVANT DE DÉCLARER UNE PAGE TERMINÉE

Avant de présenter une page à l'utilisateur, l'assistant doit obligatoirement valider les 6 points suivants :

```
[ ] 1. SOURCE PROTOTYPE VÉRIFIÉE
       - Le bloc data-screen-label="SX ..." a été extrait de scripts/proto_real.html.
       - Tous les textes, chiffres, titres, badges et boutons correspondent au mot près.

[ ] 2. AUCUNE INVENTION DÉVELOPPEUR
       - Aucun bouton de test, toggle de phase, ou sélecteur non présent dans le prototype.
       - Zéro placeholder "Coming soon" ou carte simplifiée si le prototype contient une maquette détaillée.

[ ] 3. GESTION DU LAYOUT (NAVBAR & FOOTER)
       - La page a-t-elle la navbar dans le prototype (tableau pubNav) ? Si non, masquer la navbar.
       - La page a-t-elle le footer dans le prototype ? Si non, masquer le footer.
       - Le fond de la page s'étend-il jusqu'au bord supérieur de la fenêtre (y = 0) sans bande blanche ni décalage parasite ?

[ ] 4. NAVIGATION ET LIENS FONCTIONNELS
       - Tous les boutons et liens cliquables mènent vers de vraies routes existantes et fonctionnelles.
       - Aucun lien ne renvoie à l'accueil par défaut.

[ ] 5. VÉRIFICATION VISUELLE RÉELLE DANS LE NAVIGATEUR
       - Inspection réelle via le sous-agent navigateur sur Desktop (1280 × 800) ET sur Mobile (390 × 844).
       - Vérification de l'absence de chevauchement entre la navbar flottante et le contenu haut de la page.
       - Capture d'écran enregistrée et analysée visuellement.

[ ] 6. STRICTEMENT AUCUN GIT PUSH
       - Les commits sont UNIQUEMENT enregistrés localement sur la branche dev.
       - Aucun push distant tant que l'utilisateur n'a pas validé manuellement et dit : "tu peux push".
```

---

## 4. ÉLÉMENTS ET PAGES ACTUELLEMENT GELÉS (NE JAMAIS MODIFIER)

Les éléments suivants ont été définitivement validés par l'utilisateur et sont **STRICTEMENT GELÉS** :
1. `Accueil.tsx` : Structure globale, Rideau d'ouverture cinématique, Hero Section, Grille des Catégories, Timeline du Tournoi.
2. `NavbarPublique.tsx` : Design de la capsule desktop et du header mobile (3 boutons burger, logo, bouton inscription).
3. `MobileDrawer.tsx` : Tiroir mobile avec décalage 3D (`translateX(72vw) scale(0.86)`), fond blueprint grid, typographies Silkscreen/Nunito, et bouton orange "S'inscrire →".

---

## 5. PROCESSUS DE MISE À JOUR CONTINUE

Dès que l'utilisateur exprime une critique, une remarque d'insatisfaction ou signale une incohérence :
1. **Accuser réception immédiatement** sans chercher d'excuses.
2. **Ajouter le reproche verbatim** dans la section 2 de ce document.
3. **Consigner l'erreur technique exacte** qui a causé ce problème.
4. **Définir la règle corrective** pour qu'elle ne se reproduise plus jamais.
5. **Enregistrer la modification** dans Git localement.
