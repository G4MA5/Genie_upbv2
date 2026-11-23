# GUIDE MÉTHODOLOGIQUE DE CALIBRATION ET D'ARCHITECTURE DES CATÉGORIES
> **Document de référence pour le refactoring et l'alignement des pages Catégories (Technologie, Droit, Économie, Innovation)**
> Établi sur la base du standard validé de la **Catégorie Technologie** (`/concours/technologie`) et étalonné sur le modèle de la **Page d'Accueil** (`Accueil.tsx` / `HeroBanner.tsx`).

---

## 1. PRINCIPE DIRECTEUR : L'ACCUEIL COMME ÉTALON DE RÉFÉRENCE

La page d'accueil est le modèle calibré de toute la plateforme :
1. **Unicité des composants d'action** : Tous les boutons principaux CTA partagent la même taille, la même bordure, le même rayon et la même typographie que le bouton *"Je m'inscris →"* de l'Accueil.
2. **Harmonie de l'échelle typographique** : La hauteur optique des blocs de titre sur Desktop (~230px à 240px) et sur Mobile (~110px) doit être cohérente sur toutes les catégories.
3. **Zéro invention** : Tous les textes, chiffres, étapes, jurys et éléments proviennent rigoureusement de `scripts/proto_real.html`.
4. **100% Tailwind CSS** : Aucune propriété statique dans des objets `style={{ ... }}`.
5. **Strictement aucun push distant** : Les commits sont uniquement locaux sur la branche `dev`.

---

## 2. ARCHITECTURE MODULAIRE EN 4 SECTIONS DÉCOUPLÉES

Comme pour l'Accueil (`RideauAccueil`, `HeroBanner`, `CategoriesGrid`, `TournamentTimeline`), chaque page de catégorie dans `src/pages/publique/categories/Categorie<Nom>.tsx` est un orchestrateur épuré (~40 lignes) qui assemble 4 sous-composants dédiés situés dans `src/components/categories/<nom_categorie>/` :

```
src/components/categories/<nom_categorie>/
├── <Cat>Hero.tsx            # En-tête avec titre géant, fond animé, bot/mascotte 3D, bouton CTA
├── <Cat>Mission.tsx         # Mission thématique, badge monospace Silkscreen, 3 statistiques chiffrées
├── <Cat>Deroule.tsx         # Déroulé des épreuves, 4 colonnes d'étapes (01 à 04), calendrier (3+1 JOURS)
└── <Cat>Evaluation.tsx      # Ce que le jury vérifie, points critiques animés, barre du jury (3 membres)
```

### Le rôle de l'Orchestrateur (`Categorie<Nom>.tsx`) :
- Importe les 4 modules.
- Intègre l'effet de scroll reveal global (dévoilement progressif à l'apparition).
- Affiche le `FooterPublique` à la fin de la page.
- Le conteneur s'étend du pixel `y = 0` sous la navbar capsule (aucun padding parasite sur `<main>`).

---

## 3. CALIBRATION PRÉCISE DES ÉLÉMENTS DU HERO (`<Cat>Hero.tsx`)

### A. Le Bouton CTA (« S'inscrire → ») — Clone exact des tokens de l'Accueil
Ne jamais modifier ces dimensions, elles garantissent l'harmonie sur toute la plateforme :

```tsx
<button
  onClick={() => navigate('/inscription')}
  className="self-start mt-8 sm:mt-10 min-h-[52px] sm:min-h-[58px] lg:min-h-[60px] px-6 sm:px-8 lg:px-8 rounded-2xl border-4 border-white bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-black text-lg sm:text-xl lg:text-[22px] leading-none flex items-center gap-2.5 sm:gap-3 whitespace-nowrap cursor-pointer shadow-[0_14px_30px_rgba(232,98,26,0.45)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(232,98,26,0.6)] active:scale-95 transition-all"
  style={{
    animation: 'fxBreathe 2.4s ease-in-out infinite alternate',
  }}
>
  <span>S'inscrire</span>
  <span className="text-xl sm:text-2xl">→</span>
</button>
```

- **Hauteur** : `60px` à l'échelle Desktop (`lg:min-h-[60px]`), `58px` sur tablette, `52px` sur mobile.
- **Bordure** : `border-4 border-white` (4px blanc plein).
- **Arrondi** : `rounded-2xl` (16px).
- **Padding horizontal** : `px-8` (32px de chaque côté sur desktop).
- **Police** : `lg:text-[22px] font-black`.

---

### B. Le Titre H1 Hero
Le titre comporte généralement 3 lignes (ex: *"Qui sera le"*, *"génie"*, *"technologique / du droit / de l'innovation / de l'économie"*).

```tsx
<h1 className="m-0 flex flex-col items-start font-black text-[clamp(56px,7.5vw,120px)] leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]">
  <span className="whitespace-nowrap">Qui sera le</span>
  <span className="whitespace-nowrap">génie</span>
  <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 text-[0.78em] origin-left font-black ton-genie-title-desktop hidden md:inline-block">
    {nomCategorie}
  </span>
  <span className="mt-[0.12em] whitespace-nowrap inline-block -rotate-4 text-[0.78em] origin-left font-black ton-genie-title-mobile inline-block md:hidden">
    {nomCategorie}
  </span>
</h1>
```

- **Taille de police** : `text-[clamp(56px,7.5vw,120px)]`
  - Mobile (390px) : `56px`
  - Desktop standard (1280px) : `96px`
  - Grand écran (1536px+) : jusqu'à `120px`
- **Interlignage** : `leading-[0.86]` pour conserver un bloc ultra-serré et percutant.
- **Hauteur totale mesurée du bloc 3 lignes** : **`238px`** (identique au bloc 2 lignes de l'Accueil à ~230px).
- **Ombre 3D** : `drop-shadow-[0_7px_0_rgba(5,15,50,0.45)]`.
- **Ligne inclinée** : `-rotate-4`, taille `text-[0.78em]`, avec les classes de contour emblématiques `ton-genie-title-desktop` / `ton-genie-title-mobile`.

---

### C. L'Objet 3D / Illustration / Mascotte du Hero
- **Sur Desktop** :
  - Placé à droite en position absolue : `absolute right-[clamp(-20px,1vw,40px)] top-1/2 w-[min(42%,460px)] -translate-y-[45%] pointer-events-none z-[2]`.
  - Contour blanc 4px + ombre portée volumétrique : `drop-shadow-[4px_0_0_#fff] drop-shadow-[-4px_0_0_#fff] drop-shadow-[0_4px_0_#fff] drop-shadow-[0_-4px_0_#fff] drop-shadow-[0_24px_34px_rgba(0,0,0,0.45)]`.
  - Animation de flottaison verticale : `translate: 0 0` vers `translate: 0 -18px` (boucle 4.2s `ease-in-out`).
- **Sur Mobile** :
  - Placé sous le bloc Titre + Bouton avec `max-w-[320px] sm:max-w-[360px] mx-auto mt-4`.

---

### D. Le Conteneur de Section Hero
- `min-h-[660px] lg:min-h-[740px] px-5 sm:px-10 lg:px-[72px] pt-[108px] pb-10`
- Dégradé inférieur de transition vers la section suivante :
  `h-[55%] bg-gradient-to-b from-transparent via-[rgba(...,0.35)] to-[couleur_fond_section_suivante]`

---

## 4. SECTION 2 : MISSION (« <Cat>Mission.tsx »)
- **Fond** : Couleur vibrante spécifique de la catégorie (ex: `#0B3FD9` pour Technologie, `#E84E36` pour Économie, etc.).
- **Badge d'en-tête** : `[ MISSION ] [ SOUS-TITRE ]` en police `Silkscreen` monospace `text-[13px] tracking-[0.1em]`.
- **Titre de Mission** : En `Silkscreen` majuscule `text-[clamp(40px,5.6vw,84px)] leading-[0.95] tracking-[-0.02em]`.
- **Illustration d'arrière-plan** : Ondulation vectorielle (ex: `TopographyWave.tsx`).
- **3 Cartes Statistiques Chiffrées** :
  - Séparées par une bordure haute `border-t-2 border-white/80`.
  - Grand chiffre en `Silkscreen` : `text-[clamp(56px,7vw,104px)] leading-[0.85]`.
  - Libellé en `Nunito` majuscule : `text-sm font-extrabold tracking-wider`.

---

## 5. SECTION 3 : DÉROULÉ DES ÉPREUVES (« <Cat>Deroule.tsx »)
- **Fond** : Alternance de contraste (ex: fond clair `#E3E5EA` pour contraster avec les bleus sombres).
- **En-tête de section** : Badge `[ DÉROULÉ ]` + grand titre `Silkscreen` (ex: `CONSTRUIRE PUIS PROUVER`).
- **Transition graphique** : Texture de pixels SVG ou vague géométrique.
- **Grille des 4 étapes (01 à 04)** :
  - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8`.
  - Chaque étape avec son numéro géant en couleur (`01`, `02`, `03`, `04` en `Silkscreen text-5xl sm:text-6xl`), titre en majuscules grasses, et description soignée.
- **Bandeau de durée** : Chiffre emblématique (ex: `3+1 JOURS`) avec texte d'explication.
- **Pied de section technique** : Ligne `border-t-2` avec `© GÉNIE UPB`, tags `[ CATÉGORIE ]` et composition des équipes (`ÉQUIPES DE 6`).

---

## 6. SECTION 4 : ÉVALUATION PAR LE JURY (« <Cat>Evaluation.tsx »)
- **Fond** : Bleu marine profond ou teinte foncée de la catégorie (ex: `#0F3C8A`).
- **Badge & Titre** : `[ ÉVALUATION ]` + `CE QUE LE JURY VÉRIFIE`.
- **Illustration thématique** : Panneau indicateur à directions ou totem spécifique avec masque radial dégradé.
- **3 Points Critiques documentés** :
  - Boîtes carrées de 96px (`w-24 h-24 rounded-[18px] bg-white/[0.07] border border-white/30`).
  - Animations interactives Web Animations API :
    1. *Point 01* : Lignes de rapport animées + validation verte `✓`.
    2. *Point 02* : Flux de bits numériques ou données + barres d'analyse oscillantes.
    3. *Point 03* : Ondes concentriques radar ou liaison signal radio.
- **Barre d'évaluation du Jury** :
  - Séparateur horizontal `border-t-2`.
  - Badge `[ JURY ]` + « 3 membres évaluent chaque équipe. ».
  - 3 avatars circulaires de 60px avec icônes de jurés.

---

## 7. CHECK-LIST DE REPRODUCTION POUR CHAQUE NOUVELLE CATÉGORIE

Pour chaque catégorie à réaménager (Droit, Économie, Innovation) :

```
[ ] 1. Localiser le data-screen-label dans scripts/proto_real.html :
       - Droit : is.SD
       - Économie : is.SE
       - Innovation : is.SI
[ ] 2. Extraire les vrais textes, chiffres, étapes, jurys et visuels exacts.
[ ] 3. Créer le dossier src/components/categories/<nom_categorie>/ avec les 4 fichiers :
       - Hero
       - Mission
       - Deroule
       - Evaluation
[ ] 4. Alléger Categorie<Nom>.tsx pour en faire un orchestrateur propre de 40 lignes.
[ ] 5. Appliquer les tokens stricts du Bouton CTA Accueil (60px, px-8, border-4, rounded-2xl, 22px).
[ ] 6. Appliquer l'échelle de titre H1 calibrée clamp(56px, 7.5vw, 120px) leading-[0.86].
[ ] 7. Vérifier en direct avec le sous-agent navigateur (1280x800 et 390x844) avec capture d'écran.
[ ] 8. Compiler avec npm run build sans aucune erreur TypeScript.
[ ] 9. Consigner les détails dans JOURNAL_DES_REPROCHES_ET_REGLES.md.
[ ] 10. Committer localement sur dev (STRICTEMENT AUCUN PUSH DISTANT).
```
