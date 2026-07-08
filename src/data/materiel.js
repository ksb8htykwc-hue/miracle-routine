// Feuille de route acquisitions — neuf étapes, du fondamental à ce qui reste.
const i = (id, nom, source, prix, estime = false) => ({ id, nom, source, prix, estime })

export const MATERIEL_ETAPES = [
  {
    id: 'e1',
    tag: 'Fondation',
    titre: 'Les outils de travail quotidien',
    pourquoi: "Ce sur quoi tout le reste s'appuie — édition, communication, concentration.",
    items: [
      i('e1-macbook', 'MacBook Pro M1 Pro · 16"', '', 500000),
      i('e1-iphone', 'iPhone 15 Pro Max · 256 Go', 'Gabon', 220000),
      i('e1-mx-master', 'Logitech MX Master 4', 'France · 120,63 €', 79120),
      i('e1-sony-ult', 'Sony ULT Wear · casque sans fil', 'France · 129,99 €', 85270),
    ],
  },
  {
    id: 'e2',
    tag: 'Le gain de temps mesuré',
    titre: 'Le design vectoriel, sans souris',
    pourquoi: 'Une itération de logo AMN : 1 heure à la souris, 5 minutes au stylet.',
    items: [
      i('e2-xppen', 'XPPen Artist 16 3rd · écran 15,4"', 'France · 299,99 €', 196780),
    ],
  },
  {
    id: 'e3',
    tag: 'La leçon retenue',
    titre: 'Le son, réglé pour de bon',
    pourquoi: 'Terrain et studio, deux usages distincts et complémentaires.',
    items: [
      i('e3-dji-mic', 'DJI Mic Mini 2 · 2 TX + 1 RX + boîtier', 'France · 99 €', 64940),
      i('e3-blue-yeti', 'Blue Yeti · micro USB de bureau', 'France · 109,94 €', 72110),
    ],
  },
  {
    id: 'e4',
    tag: "L'investissement central",
    titre: 'Le boîtier, stabilisé et fiable',
    pourquoi: 'Le poste le plus lourd. Stabilisateur vérifié compatible ZV-1.',
    items: [
      i('e4-zv1', 'Sony ZV-1 + poignée (pack Fnac)', 'France · 629,99 €', 413240),
      i('e4-moza', 'Moza Mini-P · stabilisateur compact + suivi', 'France · ≈140 €', 91830, true),
      i('e4-sd', 'Carte SD SanDisk Extreme Pro 128 Go', 'France · ≈30 €', 19680, true),
      i('e4-batterie', 'Batterie Sony NP-BX1 (rechange)', 'France · 25,51 €', 16730),
    ],
  },
  {
    id: 'e5',
    tag: 'La chaîne complète',
    titre: 'Ce qui relie la caméra au montage',
    pourquoi: 'Sans ça, tout ce qui précède reste à moitié utile.',
    items: [
      i('e5-hub', 'Belkin hub USB-C 11-en-1', 'France · 81,29 €', 53320),
      i('e5-ssd', 'SanDisk Creator Phone SSD 2 To MagSafe', 'France · 199 €', 130540),
      i('e5-trepied', 'Trépied flexible Neewer TP34', 'France · 25,99 €', 17050),
    ],
  },
  {
    id: 'e6',
    tag: 'La fondation qui ne se voit pas',
    titre: 'Le corps qui doit tenir 24 mois',
    pourquoi: "AMN n'a pas besoin d'un DTA bien équipé et épuisé.",
    items: [
      i('e6-tapis', 'Tapis HAPBEAR 213×152 cm', 'France · 109 €', 71500),
      i('e6-amazfit', 'Amazfit Bip Max', 'France · 99,90 €', 65530),
      i('e6-halteres', 'Kit haltères 100 kg', 'Gabon', 100000),
      i('e6-balance', 'Balance alimentaire Tefal', 'Gabon', 12000),
      i('e6-bandes', 'Bandes élastiques Fokky', 'France · 26,99 €', 17700),
      i('e6-chaussures', 'Chaussures running Adidas Duramo SL 2', 'France · 39 €', 25580),
    ],
  },
  {
    id: 'e7',
    tag: 'Explorer, tester, se divertir',
    titre: 'Un espace loin du travail',
    pourquoi: 'Le seul appareil pour tes propres vidéos, loin du MacBook réservé au travail.',
    items: [
      i('e7-ipad', 'iPad Air 10,9" 256 Go (reconditionné)', 'France · 443 €', 290590),
      i('e7-pencil', 'Apple Pencil (USB-C)', 'France · 79,99 €', 52470),
    ],
  },
  {
    id: 'e8',
    tag: 'La séparation nette',
    titre: 'Un canal qui ne se mélange plus',
    pourquoi: "Dépôts, versements, clients, partenaires — sur un appareil qui n'est pas ta vie personnelle.",
    items: [
      i('e8-galaxy-a56', 'Samsung Galaxy A56 double SIM', 'Gabon — usage AMN', 160000),
    ],
  },
  {
    id: 'e9',
    tag: 'Le moins urgent',
    titre: 'Ce qui restera quand le reste sera obsolète',
    pourquoi: 'Aucun impact opérationnel. Mais des souvenirs imprimés ne se remplacent pas.',
    items: [
      i('e9-selphy', 'Canon SELPHY CP1500', 'Gabon', 65000),
      i('e9-album', 'Album photo DazSpirit · 600 pochettes', 'France · 21,43 €', 14060),
      i('e9-led', '3 lumières LED', 'Gabon', 90000),
    ],
  },
  {
    id: 'e10',
    tag: 'Logistique',
    titre: 'Envoi groupé',
    pourquoi: "Tous les articles France partent en une seule commande — le fret n'est pas proportionnel au gramme.",
    items: [
      i('e10-fret', 'Fret groupé (≈14 kg, envoi France)', '', 182000),
    ],
  },
]

export const MATERIEL_ALL_ITEMS = MATERIEL_ETAPES.flatMap(e => e.items)
export const MATERIEL_TOTAL = MATERIEL_ALL_ITEMS.reduce((sum, it) => sum + it.prix, 0)
