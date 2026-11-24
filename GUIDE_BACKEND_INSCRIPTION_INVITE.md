# 📋 Spécifications Backend : Module « Inscription en tant qu'Invité »
**Version :** 2.0 (Alignée sur la branche `dev` — commit `1fb3e4b`)  
**Date :** Novembre 2026  
**Destinataire :** Développeur Backend / API  
**Projet :** GÉNIE UPB v2  

---

## 1. Contexte & Objectif

Le frontend de l'application GÉNIE UPB a fait l'objet d'une refonte complète de la fonctionnalité **« S'inscrire en tant qu'invité »** sur la branche `dev`.  
Ce module permet aux personnes extérieures ainsi qu'aux étudiants de l'UPB sans équipe d'obtenir un **Pass Invité officiel** pour assister aux cérémonies et présentations de projets du concours.

L'ancienne implémentation front générait un PDF en local dans le navigateur et demandait un jeu de champs statique. **La nouvelle version délègue l'enregistrement et l'expédition du pass officiel par e-mail au backend.**

Ce document récapitule les changements, la charge utile (payload JSON), les règles de validation et les points de branchement.

---

## 2. Synthèse des Changements (Ancien Front vs Nouveau Front)

| Critère | 🔴 Ancien Front | 🟢 Nouveau Front (`dev`) | Impact Backend |
| :--- | :--- | :--- | :--- |
| **Architecture du composant** | Code dupliqué dans la page `Inscription.tsx` | Composant mutualisé réutilisable : `ModalInscriptionInvite.tsx` | Une seule route API à brancher pour tous les points d'entrée |
| **Parcours utilisateur** | 1 formulaire unique avec astérisques rouges (`*`) | **Formulaire en 2 étapes épuré** (0 astérisque, mascotte robot animée, navigation fluide) | Soumission déclenchée à la fin de l'étape 2 |
| **Profil UPB** | Demandait Nom, Prénom, Établissement, Ambition | **Nom, Prénom, Matricule UPB**.  *(L'ambition n'est plus demandée pour l'UPB)* | Pas de champ `ambition` requis si `type === 'UPB'` |
| **Profil Autre (Extérieur)** | Champs génériques sans distinction | **Nom, Prénom, Nom de l'établissement, Ambition** | `etablissement` et `ambition` obligatoires si `type === 'Autre'` |
| **Délivrance du Pass** | Téléchargement direct d'un PDF généré en JS client | **Suppression du téléchargement**. Affichage d'une confirmation : *« Pass envoyé par e-mail »* | **Le backend doit envoyer l'e-mail avec le pass nominatif + QR code** |
| **Points d'accès dans l'app** | Uniquement sur la page publique `/inscription` | - Page publique `/inscription`<br>- Desktop Sidebar `/espace/*`<br>- Desktop Floating Button `/espace/*`<br>- Mobile Dashboard `/espace/dashboard` (sous Formations)<br>- Pages `/espace/equipe?state=empty` & `state=removed` | Prévoir l'authentification optionnelle (visiteur anonyme vs étudiant connecté) |

---

## 3. Schéma des Données (Payload JSON)

Le frontend prépare les données selon le type d'invité choisi (`UPB` ou `Autre`).

### Cas A : Invité UPB (Étudiant campus UPB)
```json
{
  "type": "UPB",
  "nom": "Kouassi",
  "prenom": "Aya",
  "matricule": "UPB-2024-0012",
  "email": "aya.kouassi@upb.ci",
  "etablissement": "UPB"
}
```
> **Notes :**
> - Pour les étudiants connectés dans l'espace candidat (`/espace/*`), `nom`, `prenom`, `matricule` et `email` sont pré-remplis automatiquement par la session de l'utilisateur.
> - Le champ `ambition` **ne doit pas** être requis si `type === "UPB"`.

---

### Cas B : Invité Extérieur (Autre établissement / Entreprise)
```json
{
  "type": "Autre",
  "nom": "Kophy",
  "prenom": "Yaho Djack",
  "etablissement": "ESATIC",
  "ambition": "Découvrir les innovations en IA et assister aux soutenances.",
  "email": "kophy.djack@esatic.ci"
}
```
> **Notes :**
> - `etablissement` : obligatoire (nom de l'école, université ou structure).
> - `ambition` : obligatoire (court texte décrivant l'intérêt ou le projet).
> - `matricule` : `null` ou absent.

---

### Modèle TypeScript Recommandé pour le Backend

```typescript
export type TypeInvite = 'UPB' | 'Autre';

export interface InscriptionInviteDto {
  type: TypeInvite;
  nom: string;
  prenom: string;
  email: string;
  // Champs conditionnels selon le type :
  matricule?: string;       // Requis si type === 'UPB'
  etablissement?: string;   // 'UPB' si type === 'UPB', saisi par l'utilisateur si 'Autre'
  ambition?: string;        // Requis si type === 'Autre'
}

export interface InscriptionInviteResponse {
  success: boolean;
  message: string;
  inviteId: string;
  passNumero: string;
  emailEnvoye: boolean;
}
```

---

## 4. Contrat d'API Recommandé

### Endpoint : Création d'une inscription invité
- **Méthode :** `POST`
- **Route :** `/api/inscriptions/invite` *(ou `/api/invites` selon vos conventions)*
- **Headers :**
  ```http
  Content-Type: application/json
  Authorization: Bearer <token>   (Optionnel : présent si l'utilisateur est connecté dans l'espace candidat)
  ```

### Exemple de Requête (UPB)
```bash
curl -X POST https://api.genieupb.ci/api/inscriptions/invite \
  -H "Content-Type: application/json" \
  -d '{
    "type": "UPB",
    "nom": "KOUASSI",
    "prenom": "Aya",
    "matricule": "UPB-2024-0012",
    "email": "aya.kouassi@upb.ci"
  }'
```

### Exemple de Réponse Succès (`201 Created` ou `200 OK`)
```json
{
  "success": true,
  "message": "Inscription enregistrée. Votre Pass Invité officiel vous a été envoyé par e-mail.",
  "data": {
    "inviteId": "inv_88293f0a",
    "passNumero": "PASS-INV-2026-0412",
    "type": "UPB",
    "nom": "KOUASSI",
    "prenom": "Aya",
    "email": "aya.kouassi@upb.ci",
    "emailEnvoye": true,
    "qrCodePayload": "UPB-INV-2026:inv_88293f0a"
  }
}
```

### Exemple de Réponse Erreur (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation échouée",
  "errors": [
    {
      "field": "matricule",
      "message": "Le matricule UPB est obligatoire pour les étudiants de l'UPB."
    }
  ]
}
```

---

## 5. Logique Métier & Génération du Pass par E-mail

Dès réception de la requête valide :
1. **Enregistrement en base de données** dans la table/collection `invites`.
2. **Génération du Pass Numérique Nominatif** :
   - Numéro unique de pass : `PASS-INV-2026-XXXX`.
   - QR Code d'émargement contenant la référence du pass ou l'ID invité.
   - Thème graphique : **Couleur Or `#E6B60A`** correspondant au badge officiel `INVITÉ` (voir `BADGE_THEMES.Invité` dans [`BadgeNumerique.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/components/common/BadgeNumerique.tsx)).
3. **Expédition par E-mail** :
   - Objet : `Votre Pass Invité officiel — GÉNIE UPB 2026`
   - Corps du message avec récapitulatif (Nom, Prénom, Établissement/Matricule, Accès aux présentations).
   - Pièce jointe : PDF du pass ou QR code d'accès scannable aux séances.

---

## 6. Points d'Intégration dans le Code Frontend

Tous les formulaires d'invités convergent vers le composant unique :
- **Fichier composant :** [`src/components/common/ModalInscriptionInvite.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/components/common/ModalInscriptionInvite.tsx)

### Fonction de soumission à brancher sur l'API :
Dans [`ModalInscriptionInvite.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/components/common/ModalInscriptionInvite.tsx), localisez la méthode `handleSubmitStep2` :

```typescript
// Localisation : src/components/common/ModalInscriptionInvite.tsx (~ligne 209)
const handleSubmitStep2 = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Validation front existante
  if (inviteType === 'UPB') {
    if (!inviteMatricule.trim()) {
      setInviteErr('Veuillez saisir votre matricule UPB.');
      return;
    }
  } else {
    if (!inviteEtablissement.trim() || !inviteAmbition.trim()) {
      setInviteErr('Veuillez renseigner votre établissement et votre ambition.');
      return;
    }
  }

  // 2. Branchement API Backend (À activer par le développeur) :
  try {
    const payload = {
      type: inviteType,
      nom: inviteNom.trim(),
      prenom: invitePrenom.trim(),
      matricule: inviteType === 'UPB' ? inviteMatricule.trim() : undefined,
      etablissement: inviteType === 'UPB' ? 'UPB' : inviteEtablissement.trim(),
      ambition: inviteType === 'Autre' ? inviteAmbition.trim() : undefined,
      // email: recupéré via le profil candidat ou prompt si public
    };

    // const res = await apiClient.post('/api/inscriptions/invite', payload);
    
    setInviteErr(null);
    setInviteStep('success'); // Affiche l'écran de confirmation d'envoi par e-mail
  } catch (err: any) {
    setInviteErr(err.response?.data?.message || 'Erreur lors de l\'enregistrement.');
  }
};
```

---

## 7. Fichiers Front Concernés par cette Fonctionnalité

Pour référence, voici tous les fichiers front qui utilisent ce module sur la branche `dev` :
- [`src/components/common/ModalInscriptionInvite.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/components/common/ModalInscriptionInvite.tsx) : Le modal en 2 étapes, mascotte, et écran de confirmation e-mail.
- [`src/pages/publique/Inscription.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/publique/Inscription.tsx) : Bouton en bas à droite ouvrant le modal sur la page publique.
- [`src/structures/StructureCandidat.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/structures/StructureCandidat.tsx) : Bouton flottant desktop + raccourci dans la barre latérale pour les étudiants sans équipe.
- [`src/pages/candidat/DashboardCandidat.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/candidat/DashboardCandidat.tsx) : Carte dédiée sur mobile sous *« Formations disponibles »*.
- [`src/pages/candidat/MonEquipe.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/pages/candidat/MonEquipe.tsx) : Carte d'action invité sur les états *« Sans équipe »* (`empty`) et *« Retiré »* (`removed`).
- [`src/components/common/BadgeNumerique.tsx`](file:///C:/Users/ELIAKIM/.gemini/antigravity/scratch/genie_upb_v2/src/components/common/BadgeNumerique.tsx) : Thèmes des 9 badges dont le thème `Invité` (`#E6B60A`).
