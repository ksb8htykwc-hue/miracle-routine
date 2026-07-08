// Les habitudes essentielles de la routine quotidienne. Toutes comptent comme minimum vital :
// la liste a déjà été réduite au strict nécessaire.
export const ROUTINE_ITEMS = [
  { id: 'reveil', label: 'Réveil à 5h45', section: 'matin', minVital: true, type: 'toggle' },
  { id: 'growth_ritual_matin', label: 'Growth Ritual', section: 'matin', minVital: true, type: 'toggle' },
  { id: 'sport', label: 'Sport', section: 'matin', minVital: true, type: 'toggle', linkTo: '/sport' },
  { id: 'conditionnement', label: 'Conditionnement', section: 'matin', minVital: true, type: 'toggle' },

  { id: 'fin_ecran', label: "Fin d'écran à 21h30", section: 'soir', minVital: true, type: 'toggle' },
  { id: 'growth_ritual_soir', label: 'Growth Ritual', section: 'soir', minVital: true, type: 'toggle' },
  { id: 'brossage_dentaire', label: 'Brossage dentaire', section: 'soir', minVital: true, type: 'toggle' },
  { id: 'couche_22h', label: 'Couché à 22h', section: 'soir', minVital: true, type: 'toggle' },
]

export const SECTIONS = [
  { id: 'matin', label: 'Matin', hint: '' },
  { id: 'soir', label: 'Soir', hint: '' },
]

export const TOTAL_ITEMS = ROUTINE_ITEMS.length
export const MIN_VITAL_IDS = ROUTINE_ITEMS.filter(i => i.minVital).map(i => i.id)
