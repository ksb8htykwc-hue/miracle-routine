# Miracle Routine

Application personnelle de discipline et de reconstruction (NoFap/NoPorn, routines quotidiennes, programme sportif, objectif financier).

## Développement local

```bash
npm install
npm run dev
```

## Configuration Firebase

Les clés sont lues depuis `.env` (non commité — voir `.env.example`). Dans la console Firebase :

1. **Authentication** → méthode Email/Mot de passe activée, avec ton compte utilisateur déjà créé.
2. **Firestore Database** → créée en mode production.
3. **Règles Firestore** à coller dans Firestore → Règles :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/appData/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Sans ces règles, toutes les lectures/écritures Firestore sont refusées par défaut.

## Déploiement GitHub Pages

```bash
npm run build
```

Publie le contenu de `dist/` sur la branche `gh-pages` (via une action GitHub ou `git subtree push`). Le build utilise des chemins relatifs (`base: './'`), donc il fonctionne aussi bien à la racine d'un domaine que dans un sous-dossier `username.github.io/miracle-routine/`.

## Icônes PWA

Les icônes dans `public/icons/` (favicons, apple-touch-icon, icônes manifest 192/512) sont les visuels définitifs du monogramme "M".
