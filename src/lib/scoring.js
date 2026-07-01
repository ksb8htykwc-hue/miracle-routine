import { ROUTINE_ITEMS, TOTAL_ITEMS, MIN_VITAL_IDS } from '../data/routineItems'

export function isItemDone(item, dayData) {
  if (!dayData) return false
  if (item.type === 'text') {
    return Boolean((dayData.texts?.[item.id] || '').trim())
  }
  if (item.type === 'kifs') {
    const kifs = dayData.kifs || ['', '', '']
    return kifs.every(k => k.trim().length > 0)
  }
  return Boolean(dayData.items?.[item.id])
}

export function computeScore(dayData) {
  if (!dayData) return { done: 0, total: TOTAL_ITEMS, percent: 0, minVitalMet: false }
  const done = ROUTINE_ITEMS.filter(item => isItemDone(item, dayData)).length
  const percent = Math.round((done / TOTAL_ITEMS) * 100)
  const minVitalMet = MIN_VITAL_IDS.every(id => {
    const item = ROUTINE_ITEMS.find(i => i.id === id)
    return isItemDone(item, dayData)
  })
  return { done, total: TOTAL_ITEMS, percent, minVitalMet }
}

// Statut visuel pour une journée passée dans le calendrier.
export function dayStatus(dayData, relapsed) {
  if (relapsed) return 'relapse'
  if (!dayData) return 'none'
  const { percent, minVitalMet } = computeScore(dayData)
  if (percent >= 90) return 'full'
  if (percent >= 50) return 'partial'
  if (minVitalMet) return 'minimal'
  return 'none'
}
