# CLAUDE.md

## CONTEXTE
Utilisateur : Alfred Gayault, 22 ans, Gabon. Porteur du projet agricole familial AMBIA MI NTCHE. Pattern documenté sur son historique complet (2019-2026) : cycles chaud-froid sur tous ses projets — démarrage intense, exigence de perfection immédiate, abandon dès que le résultat n'est pas exceptionnel, remplacement de l'action par la préparation (nouveau matériel, nouvelle méthode, nouvel outil). Diagnostic de l'utilisateur lui-même, dans ses propres mots : "je sais tout, je lis tout, mais je ne fais rien."

Conséquence directe pour la conception de cette app : aucun streak qui repart à zéro. Règle Never Miss Twice partout où c'est pertinent (un jour manqué = un accident, deux jours d'affilée = à corriger immédiatement avec la version minimale de l'action, jamais une version de rattrapage plus lourde).

## IDENTITÉ VISUELLE (déjà validée par l'utilisateur, ne pas réinventer)
- Fond : `#010607` (quasi-noir)
- Texte / éléments secondaires : `#C8CBCC` (gris clair)
- Accent unique : `#FF3C00` (orange-rouge) — pas d'autre couleur sur le dashboard principal
- Typographie : Archivo (Bold pour titres, Regular pour texte courant)
- Style : brutaliste et paradoxalement minimaliste. Un seul panneau flottant en verre dépoli (glassmorphism sobre) par écran. Pas d'empilement de cartes façon dashboard Notion. Mobile-first, gros boutons tactiles, viewport iPhone en priorité.

## CONTRAINTES NON NÉGOCIABLES
1. Livrable complet en une seule session, aujourd'hui.
2. Le dashboard principal a une seule fonction centrale : le geste du jour sur 3 fronts. Pas de tableau de bord multi-widgets sur cet écran.
3. Aucune fonctionnalité "setup" superflue (thèmes multiples, animations complexes, intégrations sociales) — refuse et redirige si l'utilisateur en redemande une en cours de session.
4. Pas de gamification à points, pas de notifications push agressives, pas de fonctionnalités sociales.
5. Le module privé Pilier 3 (voir plus bas) est fonctionnellement complet et construit aujourd'hui, mais reste strictement séparé, visuellement et structurellement, du dashboard principal des 3 fronts — jamais dans la même vue, jamais dans la même heatmap, jamais comparé.
6. Supprimer entièrement l'ancien tracker existant dans ce dossier avant de commencer, ne garder aucun de ses fichiers ni de son code.

## ÉCRAN PRINCIPAL — LES 3 FRONTS
1. **Ambia Mi Ntche** (projet agricole)
2. **Création de contenu** (écriture, montage, publication)
3. **Corps & compétences dures** (sport/TFM, Excel, Illustrator, dactylographie)

Pour chaque front, chaque jour : un champ texte libre obligatoire ("Quel est le geste minimum que tu as fait aujourd'hui ?") + une case à cocher. Pas de note de qualité, pas de photo, pas d'évaluation.

### Visualisation
Heatmap annuelle par front, façon GitHub contributions. Jamais de compteur de série affiché ("🔥 X jours"). Un jour est rempli ou vide, rien d'autre n'est montré.

### Logique Never Miss Twice
- 1 jour manqué sur un front → rien de spécial le lendemain, l'app fonctionne normalement.
- 2 jours manqués d'affilée sur le même front → au prochain lancement, cet écran devient prioritaire, tout le reste masqué, un seul bouton affiché : "Fais la version 1 minute, maintenant" avec un exemple concret par front (Ambia Mi Ntche : "va arroser un seul plant" ; contenu : "écris une phrase" ; corps/compétences : "fais un push-up" ou "ouvre Illustrator 60 secondes"). Débloqué uniquement quand la case est cochée. Ton du texte : factuel, jamais moralisateur, jamais de culpabilisation.

## MODULE TFM — Programme Transformation Faite Maison (Eric Flag), 60 jours
Intégré au front "Corps & compétences dures", vue dédiée accessible depuis ce front. L'utilisateur redémarre au Jour 1. Objectif personnel affiché en simple repère (pas un champ à cocher ni à tracker) : 90kg de masse fonctionnelle.

### Mécanique : curseur de programme, pas verrou calendaire
L'app affiche toujours la séance du jour où l'utilisateur EN EST dans le programme, pas le jour civil réel. Tant qu'elle n'est pas cochée, elle reste affichée le lendemain et les jours suivants, sans pénalité, sans rattrapage à faire. Le curseur n'avance que quand la case est cochée. Chaque séance affiche son titre, sa durée, et ses liens vidéo cliquables (ouverture dans le navigateur ou l'app YouTube).

### Données complètes (Volume 1 : jours 1-30, Volume 2 : jours 31-60)

| Jour | Séance | Liens |
|---|---|---|
| 1 | Pectoraux + Posture (28 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc, Posture: https://youtu.be/PX1mLdKFD_w |
| 2 | Épaules & Dos + Bas du Corps (33 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Bas du Corps: https://youtu.be/G2NWfxVM8jg |
| 3 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Posture: https://youtu.be/PX1mLdKFD_w, Technique: https://youtu.be/WjsQc9GUBW0 |
| 4 | Bras + Abdos (28 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bras: https://youtu.be/97RT7J7ikpw, Abdos: https://youtu.be/3eQa7C6D4XU |
| 5 | Bas du Corps + Abdos (30 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/G2NWfxVM8jg, Abdos: https://youtu.be/3eQa7C6D4XU |
| 6 | Épaules & Dos + Posture (31 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Posture: https://youtu.be/PX1mLdKFD_w |
| 7 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Posture: https://youtu.be/PX1mLdKFD_w |
| 8 | Pectoraux + Abdos (26 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc, Abdos: https://youtu.be/3eQa7C6D4XU |
| 9 | Bas du Corps ×2 (34 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/G2NWfxVM8jg |
| 10 | Épaules & Dos + Bras (31 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Bras: https://youtu.be/97RT7J7ikpw |
| 11 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Posture: https://youtu.be/PX1mLdKFD_w |
| 12 | Pectoraux + Bas du Corps (30 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc, Bas du Corps: https://youtu.be/G2NWfxVM8jg |
| 13 | Épaules & Dos + Abdos (29 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Abdos: https://youtu.be/3eQa7C6D4XU |
| 14 | Bas du Corps + Posture (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/G2NWfxVM8jg, Posture: https://youtu.be/PX1mLdKFD_w |
| 15 | Pectoraux + Bras (28 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc, Bras: https://youtu.be/97RT7J7ikpw |
| 16 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Posture: https://youtu.be/PX1mLdKFD_w |
| 17 | Épaules & Dos + Posture (31 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Posture: https://youtu.be/PX1mLdKFD_w |
| 18 | Bras + Bas du Corps (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bras: https://youtu.be/97RT7J7ikpw, Bas du Corps: https://youtu.be/G2NWfxVM8jg |
| 19 | Abdos ×2 (26 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Abdos: https://youtu.be/3eQa7C6D4XU |
| 20 | Pectoraux ×2 (26 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc |
| 21 | Bas du Corps ×2 + Posture (49 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/G2NWfxVM8jg, Posture: https://youtu.be/PX1mLdKFD_w |
| 22 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Posture: https://youtu.be/PX1mLdKFD_w |
| 23 | Épaules & Dos + Bras + Abdos (44 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Bras: https://youtu.be/97RT7J7ikpw, Abdos: https://youtu.be/3eQa7C6D4XU |
| 24 | Bas du Corps ×2 + Abdos (47 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/G2NWfxVM8jg, Abdos: https://youtu.be/3eQa7C6D4XU |
| 25 | Pectoraux + Posture (28 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc, Posture: https://youtu.be/PX1mLdKFD_w |
| 26 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Posture: https://youtu.be/PX1mLdKFD_w |
| 27 | Bras + Bas du Corps + Abdos (45 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bras: https://youtu.be/97RT7J7ikpw, Bas du Corps: https://youtu.be/G2NWfxVM8jg, Abdos: https://youtu.be/3eQa7C6D4XU |
| 28 | Épaules & Dos ×2 + Abdos (45 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Épaules & Dos: https://youtu.be/n4fsXXfU5jY, Abdos: https://youtu.be/3eQa7C6D4XU |
| 29 | Bas du Corps ×2 + Posture (49 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/G2NWfxVM8jg, Posture: https://youtu.be/PX1mLdKFD_w |
| 30 | Pectoraux + Bras + Abdos (41 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pectoraux: https://youtu.be/2m6FlDwaIhc, Bras: https://youtu.be/97RT7J7ikpw, Abdos: https://youtu.be/3eQa7C6D4XU |
| 31 | Pompes + Abdos & Gainage (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 32 | Mobilité Active + Abdos & Gainage (37 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 33 | Bas du Corps + Abdos & Gainage (34 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/KoD1uenU6go, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 34 | Dos & Biceps + Pompes (30 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Dos & Biceps: https://youtu.be/VYBb-Ul-ack, Pompes: https://youtu.be/ZHiXQUpJdf0 |
| 35 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Technique: https://youtu.be/5zhlDW1WUw8 |
| 36 | Mobilité Active + Abdos & Gainage (37 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 37 | Dos & Biceps + Bas du Corps (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Dos & Biceps: https://youtu.be/VYBb-Ul-ack, Bas du Corps: https://youtu.be/KoD1uenU6go |
| 38 | Pompes + Abdos & Gainage (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 39 | Bas du Corps ×2 (34 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/KoD1uenU6go |
| 40 | Mobilité Active + Pompes (35 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Pompes: https://youtu.be/ZHiXQUpJdf0 |
| 41 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0 |
| 42 | Mobilité Active + Abdos & Gainage (37 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 43 | Pompes + Bas du Corps (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0, Bas du Corps: https://youtu.be/KoD1uenU6go |
| 44 | Mobilité Active + Abdos & Gainage (37 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 45 | Dos & Biceps + Bas du Corps (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Dos & Biceps: https://youtu.be/VYBb-Ul-ack, Bas du Corps: https://youtu.be/KoD1uenU6go |
| 46 | Pompes + Abdos & Gainage (32 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 47 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Équilibre sur les mains: https://youtu.be/5zhlDW1WUw8 |
| 48 | Dos & Biceps ×2 (30 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Dos & Biceps: https://youtu.be/VYBb-Ul-ack |
| 49 | Mobilité Active ×2 (40 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY |
| 50 | Bas du Corps ×2 (34 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/KoD1uenU6go |
| 51 | Abdos & Gainage ×2 (37 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 52 | Pompes ×2 (30 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0 |
| 53 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Équilibre sur les mains: https://youtu.be/5zhlDW1WUw8 |
| 54 | Dos & Biceps + Bas du Corps + Abdos & Gainage (49 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Dos & Biceps: https://youtu.be/VYBb-Ul-ack, Bas du Corps: https://youtu.be/KoD1uenU6go, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 55 | Mobilité Active + Abdos & Gainage ×2 (54 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 56 | Pompes + Bas du Corps + Dos & Biceps (47 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0, Bas du Corps: https://youtu.be/KoD1uenU6go, Dos & Biceps: https://youtu.be/VYBb-Ul-ack |
| 57 | Repos | Assouplissement: https://youtu.be/WjsQc9GUBW0, Équilibre sur les mains: https://youtu.be/5zhlDW1WUw8 |
| 58 | Mobilité Active + Dos & Biceps + Abdos & Gainage (52 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Mobilité Active: https://youtu.be/zNhqYaa79jY, Dos & Biceps: https://youtu.be/VYBb-Ul-ack, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 59 | Bas du Corps ×2 + Abdos & Gainage (51 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Bas du Corps: https://youtu.be/KoD1uenU6go, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |
| 60 | Pompes + Dos & Biceps + Abdos & Gainage (47 min) | Échauffement: https://youtu.be/pcgzgl8b5C8, Pompes: https://youtu.be/ZHiXQUpJdf0, Dos & Biceps: https://youtu.be/VYBb-Ul-ack, Abdos & Gainage: https://youtu.be/9zDE16j14Ng |

## MODULE DÉCISION (anti-sunk-cost)
Accessible depuis un menu discret sur le dashboard principal. Avant tout nouveau projet ou achat significatif (matériel, logiciel, formation) : formulaire court — nom, critère de succès mesurable et daté, date de bilan. Liste consultable, jamais supprimable, pour se confronter aux critères écrits à froid plutôt qu'à l'humeur du jour du bilan.

## MODULE PRIVÉ — SUIVI HEBDOMADAIRE (Pilier 3, Programme personnel 12 mois)
Écran séparé, accessible uniquement via un lien texte discret en bas du dashboard principal (pas d'icône visible, pas de raccourci depuis les 3 fronts). Jamais affiché sur le dashboard principal, jamais mélangé à sa heatmap. Palette identique mais fond légèrement plus sombre pour marquer visuellement la séparation ("espace privé").

Cadence hebdomadaire, pas quotidienne. Pas de heatmap, pas de streak. Un tableau par mois, une ligne par semaine :
- Kegel fait (case)
- Sport 3x (case)
- Coucher régulier (case)
- Porno — nombre de fois cette semaine (compteur simple, pas de couleur rouge/verte)
- Victoire du jour (texte libre court)
- Une case "Note libre du mois" en bas de chaque tableau mensuel

Plafonds de référence affichés en info discrète en haut de l'écran (repère, pas objectif à cocher) :
- Trimestre 1 (mois 1-3, à partir de juillet 2026) : max 1x/semaine
- Trimestre 2 (mois 4-6) : max 1x/2 semaines
- Trimestre 3 (mois 7-9) : max 1x/mois
- Trimestre 4 (mois 10-12) : à la carte, conscient

Aucun message de félicitation ou d'alerte automatique. Aucune comparaison visuelle avec les 3 fronts principaux. Espace de consultation et de notation, pas de performance.

## STACK TECHNIQUE
- App web mono-page, React + Tailwind CSS.
- Stockage local persistant (indexedDB ou équivalent — au choix de Claude Code selon simplicité de livraison en une journée).
- Mobile-first : viewport iPhone, gros boutons tactiles, aucune dépendance à la souris.
- Police Archivo importée (Google Fonts), palette strictement limitée aux couleurs définies plus haut.

## HORS SCOPE V1 (à ne jamais ajouter sans validation explicite préalable)
Suivi lecture, suivi financier, réseaux sociaux, comptes multi-utilisateurs, synchronisation cloud, notifications push, thèmes multiples, statistiques avancées, graphiques de tendance, tracker de poids.
