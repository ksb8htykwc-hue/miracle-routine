// Les 17 items de la routine quotidienne. minVital = fait partie des 6 items obligatoires.
export const ROUTINE_ITEMS = [
  { id: 'eau', label: 'Eau', section: 'matin', minVital: true, type: 'toggle' },
  { id: 'priere', label: 'Prière', section: 'matin', minVital: true, type: 'toggle' },
  { id: 'bible', label: 'Bible', section: 'matin', minVital: true, type: 'toggle' },
  { id: 'lecture', label: 'Lecture développement personnel', section: 'matin', minVital: false, type: 'toggle' },
  { id: 'rangement_lit', label: 'Rangement du lit', section: 'matin', minVital: true, type: 'toggle' },
  { id: 'sport', label: 'Sport', section: 'matin', minVital: false, type: 'toggle', linkTo: '/sport' },
  { id: 'kegel', label: 'Kegel (5 min)', section: 'matin', minVital: false, type: 'toggle' },
  { id: 'preparation_mentale', label: 'Préparation mentale / conditionnement', section: 'matin', minVital: false, type: 'toggle' },
  { id: 'dejeuner', label: 'Déjeuner — sans téléphone, en silence, sans sucre ajouté', section: 'matin', minVital: false, type: 'toggle' },

  { id: 'travail', label: 'Travail', section: 'journee', minVital: false, type: 'toggle' },
  { id: 'creation', label: 'Création', section: 'journee', minVital: false, type: 'toggle' },

  { id: 'telephone_cote', label: 'Téléphone de côté à 21h30', section: 'soir', minVital: false, type: 'toggle' },
  { id: 'rangement_maison', label: 'Rangement maison + affaires du lendemain', section: 'soir', minVital: false, type: 'toggle' },
  { id: 'bilan_ecrit', label: 'Bilan de journée écrit', section: 'soir', minVital: true, type: 'text' },
  { id: 'kifs', label: '3 kifs du jour', section: 'soir', minVital: false, type: 'kifs' },
  { id: 'preparation_lendemain', label: 'Préparation de la journée suivante', section: 'soir', minVital: false, type: 'toggle' },
  { id: 'couche_22h', label: 'Couché à 22h', section: 'soir', minVital: true, type: 'toggle' },
]

export const SECTIONS = [
  { id: 'matin', label: 'Matin', hint: 'Dès 6h, réveil visé 5h45' },
  { id: 'journee', label: 'Journée', hint: '' },
  { id: 'soir', label: 'Soir', hint: 'Dès 21h30' },
]

export const TOTAL_ITEMS = ROUTINE_ITEMS.length
export const MIN_VITAL_IDS = ROUTINE_ITEMS.filter(i => i.minVital).map(i => i.id)
