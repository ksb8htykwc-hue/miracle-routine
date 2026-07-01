export const PRESCRIPTIONS = [
  {
    theme: 'Corps & Santé',
    items: [
      'Le lit est fait pour dormir et pour l’intimité.',
      'On mange dans le silence, sans téléphone.',
      'Pas de sucre gratuit et fortuit.',
      'Une âme saine dans un esprit sain dans un corps sain.',
    ],
  },
  {
    theme: 'Discipline & Temps',
    items: [
      'Un raté n’est pas la fin du monde. Reprendre demain, c’est ça la discipline.',
      'Le téléphone est un outil de travail, pas de distraction.',
      'Le divertissement doit être choisi, mérité, constructif — pas subi.',
      'Si tu essaies, tu prends le risque d’échouer mais aussi de réussir. Si tu n’essaies pas, tu as échoué d’office.',
      'Il faut néanmoins nuancer : savoir choisir ses combats.',
    ],
  },
  {
    theme: 'Relations & Femmes',
    items: [
      'Toutes les femmes sont belles mais ne sont pas des morceaux de chair.',
      'Trouver une femme bonne et belle est facile ; une femme qui t’aime et te fait évoluer, beaucoup moins. Focus sur toi.',
      'Inutile de faire des films avec elles.',
    ],
  },
  {
    theme: 'Richesse & Travail',
    items: [
      'La gestion financière et l’organisation sont les premières sources de richesse, bien au-delà du salaire.',
      'Je suis chef d’exploitation agricole gabonaise. Je me donne les moyens d’atteindre 500 000 FCFA/mois d’ici fin 2027.',
    ],
  },
  {
    theme: 'Spirituel & Sagesse',
    items: [
      'La prière calme le cœur et l’esprit.',
      'Nuancer est nécessaire. Savoir choisir ses combats.',
    ],
  },
]

// Liste à plat, utilisée pour la rotation quotidienne de l'Ancrage du jour.
export const FLAT_PRESCRIPTIONS = PRESCRIPTIONS.flatMap(group =>
  group.items.map(text => ({ theme: group.theme, text }))
)
