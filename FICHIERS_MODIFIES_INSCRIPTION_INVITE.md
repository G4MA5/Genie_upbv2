# 🛠️ Guide de Mise à Jour Frontend : « S'inscrire en tant qu'invité »
**Pour le développeur qui intègre le nouveau front sur sa branche**  
**Branche source :** `dev` (commit `1fb3e4b`)

Ce document liste **exactement les fichiers modifiés**, les **lignes de code à supprimer** (ancien front) et le **nouveau code à mettre à la place**.

---

## 📁 Sommaire des Fichiers

1. **`src/components/common/ModalInscriptionInvite.tsx`** *(Nouveau fichier à ajouter)*
2. **`src/pages/publique/Inscription.tsx`** *(Ancien modal supprimé -> remplacé par l'appel du composant)*
3. **`src/structures/StructureCandidat.tsx`** *(Ajout du raccourci sidebar & modal)*
4. **`src/pages/candidat/DashboardCandidat.tsx`** *(Ajout de la carte invité sous les formations sur mobile)*
5. **`src/pages/candidat/MonEquipe.tsx`** *(Ajout de l'option invité pour les étudiants sans équipe)*

---

## 1. Nouveau fichier à ajouter
👉 **Fichier à créer / copier :** `src/components/common/ModalInscriptionInvite.tsx`

> **Ce qu'il fait :** Il contient le nouveau formulaire en 2 étapes, la mascotte animée, la logique UPB (demande Matricule sans ambition) vs Autre (demande Établissement + Ambition sans matricule), et l'écran de confirmation d'envoi du pass par e-mail.

Il suffit de copier ce fichier tel quel depuis la branche `dev` dans votre dossier `src/components/common/`.

---

## 2. `src/pages/publique/Inscription.tsx`

### A. Les imports en haut du fichier
❌ **Code à enlever :**
```typescript
import { UserPlus, X, CheckCircle2, Download } from 'lucide-react';
```
✅ **Code à mettre à la place :**
```typescript
import { UserPlus } from 'lucide-react';
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';
```

---

### B. Les états et fonctions de l'ancien modal
Dans le corps du composant `Inscription()`, repérez le bloc d'état de l'invité.

❌ **Code à enlever (environ 80 lignes) :**
```typescript
  // État de l'inscription invité (Nom, Prénom, Établissement, Ambition)
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteNom, setInviteNom] = useState('');
  const [invitePrenom, setInvitePrenom] = useState('');
  const [inviteEtablissement, setInviteEtablissement] = useState('');
  const [inviteAmbition, setInviteAmbition] = useState('');
  const [inviteErr, setInviteErr] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleSubmitInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !inviteNom.trim() ||
      !invitePrenom.trim() ||
      !inviteEtablissement.trim() ||
      !inviteAmbition.trim()
    ) {
      setInviteErr('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setInviteErr(null);
    setInviteSuccess(true);
  };

  const handleResetInvite = () => {
    setInviteNom('');
    setInvitePrenom('');
    setInviteEtablissement('');
    setInviteAmbition('');
    setInviteErr(null);
    setInviteSuccess(false);
    setInviteModalOpen(false);
  };

  const handleDownloadGuestPass = () => {
    // ... ancien générateur de PDF local ...
  };
```

✅ **Code à mettre à la place :**
```typescript
  // État du modal d'inscription invité
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
```

---

### C. Le clic sur le bouton en bas à droite
Repérez le bouton flottant « S'inscrire en tant qu'invité » sur la page.

❌ **Code à enlever :**
```typescript
        <button
          type="button"
          onClick={() => {
            setInviteModalOpen(true);
            setInviteSuccess(false);
            setInviteErr(null);
          }}
          className="group flex items-center ...
```

✅ **Code à mettre à la place :**
```typescript
        <button
          type="button"
          onClick={() => setInviteModalOpen(true)}
          className="group flex items-center ...
```

---

### D. Le rendu du modal (en bas du JSX)
À la fin du JSX de `Inscription.tsx`, avant le dernier `</div>` fermant.

❌ **Code à enlever (les ~170 lignes de l'ancien modal JSX avec astérisques rouges et bouton de téléchargement) :**
```tsx
      {/* Modal Formulaire d'inscription invité */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 ...">
          ...
          <form onSubmit={handleSubmitInvite}>
             ... nom, prénom, ambition avec astérisques rouges ...
          </form>
          ... bouton Télécharger mon Pass Invité (PDF) ...
        </div>
      )}
```

✅ **Code à mettre à la place :**
```tsx
      {/* Modal d'inscription invité en 2 étapes */}
      <ModalInscriptionInvite
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
```

---

## 3. `src/structures/StructureCandidat.tsx` (Espace Candidat)

### A. Import en haut
✅ **À ajouter avec les autres imports :**
```typescript
import ModalInscriptionInvite from '../components/common/ModalInscriptionInvite';
```

### B. État dans le composant
✅ **À ajouter dans `StructureCandidat()` :**
```typescript
const [guestModalOpen, setGuestModalOpen] = useState(false);
```

### C. Raccourci dans la barre latérale (Desktop)
Dans `<aside className="hidden lg:flex ...">`, sous le bloc « Mon équipe » :
✅ **À ajouter :**
```tsx
          {/* Option invité si l'étudiant n'a pas d'équipe */}
          <div
            onClick={() => setGuestModalOpen(true)}
            className="flex items-center gap-2.5 p-2.5 rounded-[14px] bg-[#0A1430] text-white cursor-pointer hover:bg-[#14234b] active:scale-[0.98] transition-all shadow-sm group select-none"
            title="Vous n'avez pas d'équipe ? Participez en tant qu'invité"
          >
            <span className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:rotate-6 transition-transform">
              <UserPlus size={15} strokeWidth={2.5} />
            </span>
            <div className="flex flex-col text-left leading-tight min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#FF9A3D] tracking-wider">
                Sans équipe ?
              </span>
              <span className="text-[12px] font-extrabold text-white truncate">
                Accès Invité
              </span>
            </div>
          </div>
```

### D. Montage du Modal
Juste avant le dernier `</div>` fermant du composant :
✅ **À ajouter :**
```tsx
      {/* Modal d'inscription invité */}
      <ModalInscriptionInvite
        isOpen={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
        initialNom="Kouassi"
        initialPrenom="Aya"
        initialMatricule="UPB-2024-0012"
      />
```

---

## 4. `src/pages/candidat/DashboardCandidat.tsx` (Dashboard Mobile)

### A. Imports en haut
✅ **À ajouter :**
```typescript
import { UserPlus } from 'lucide-react';
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';
```

### B. État dans le composant
✅ **À ajouter dans `DashboardCandidat()` :**
```typescript
const [guestModalOpen, setGuestModalOpen] = useState(false);
```

### C. Carte Invité sous « Formations disponibles » (Mobile uniquement)
Dans `<div className="md:hidden flex flex-col gap-4 p-4 pb-28">`, juste en dessous de l'encadré en pointillés `Formations disponibles après la validation de votre équipe` :
✅ **À ajouter :**
```tsx
        {/* Accès Invité pour les étudiants sans équipe (mobile uniquement) */}
        <div className="shrink-0 rounded-[22px] bg-gradient-to-br from-[#0A1430] via-[#0E1A3D] to-[#14234D] p-4 text-white shadow-[0_12px_30px_rgba(10,20,48,0.18)] border border-white/10 flex flex-col gap-3 mt-1">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF9A3D] to-[#E8621A] text-white shadow-sm">
              <UserPlus size={20} strokeWidth={2.4} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#FF9A3D]">
                Sans équipe pour concourir ?
              </span>
              <h4 className="font-extrabold text-[15px] text-white leading-tight">
                Participez en tant qu'invité
              </h4>
              <p className="text-[12px] text-white/70 mt-1 leading-snug">
                Assistez aux cérémonies officielles et découvrez les projets présentés.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setGuestModalOpen(true)}
            className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/15 text-white font-extrabold text-[13px] transition-all cursor-pointer"
          >
            <span className="text-[#FF9A3D]">S'inscrire en tant qu'invité</span>
            <span className="w-7 h-7 rounded-[8px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] flex items-center justify-center text-white text-[13px] shadow-sm">
              →
            </span>
          </button>
        </div>
```

### D. Montage du modal
Avant le dernier `</div>` fermant du composant :
✅ **À ajouter :**
```tsx
      {/* Modal d'inscription invité (mobile) */}
      <ModalInscriptionInvite
        isOpen={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
        initialNom="Kouassi"
        initialPrenom="Aya"
        initialMatricule="UPB-2024-0012"
      />
```

---

## 5. `src/pages/candidat/MonEquipe.tsx`

### A. Import
✅ **À ajouter :**
```typescript
import ModalInscriptionInvite from '../../components/common/ModalInscriptionInvite';
```

### B. État
✅ **À ajouter dans `MonEquipe()` :**
```typescript
const [guestModalOpen, setGuestModalOpen] = useState(false);
```

### C. Dans l'état `state === 'empty'` (P3 Sans équipe)
Dans la carte de candidature, sous les boutons de création et de recherche d'équipe :
✅ **À ajouter :**
```tsx
              {/* Option Accès Invité pour les étudiants sans équipe */}
              <div className="w-full rounded-[18px] bg-[#0A1430] p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-white/10">
                <div className="flex flex-col text-left">
                  <span className="text-[11px] uppercase font-bold text-[#FF9A3D] tracking-wider">
                    Vous n'avez pas d'équipe pour concourir ?
                  </span>
                  <span className="text-[13px] text-white/80 mt-0.5">
                    Ne manquez pas l'événement : participez comme invité pour assister aux présentations.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setGuestModalOpen(true)}
                  className="shrink-0 px-4 py-2.5 rounded-[12px] bg-gradient-to-r from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-[13px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  S'inscrire en tant qu'invité
                </button>
              </div>
```

### D. Dans l'état `state === 'removed'` (P3r Retiré de l'équipe)
Dans la section *« ET MAINTENANT ? »*, après la carte 2 :
✅ **À ajouter :**
```tsx
                {/* Carte 3 : Participer comme invité */}
                <div
                  onClick={() => setGuestModalOpen(true)}
                  className="bg-white rounded-[18px] p-4 flex items-center justify-between border border-[#EEF1F7] cursor-pointer hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-extrabold text-[16px] text-[#0A1430]">
                      Participer comme invité
                    </span>
                    <span className="font-medium text-[13px] text-[#6A7189]">
                      Assister aux présentations et cérémonies du concours
                    </span>
                  </div>
                  <span className="font-black text-[18px] text-[#E8621A]">›</span>
                </div>
```

### E. Montage du modal
À la fin du JSX de `MonEquipe.tsx` :
✅ **À ajouter :**
```tsx
      <ModalInscriptionInvite
        isOpen={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
        initialNom="Kouassi"
        initialPrenom="Aya"
        initialMatricule="UPB-2024-0012"
      />
```
