export function toDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayStr() {
  return toDateStr(new Date())
}

export function daysAgoStr(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toDateStr(d)
}

export function addDaysStr(dateStr, n) {
  const [y, m, day] = dateStr.split('-').map(Number)
  const d = new Date(y, m - 1, day)
  d.setDate(d.getDate() + n)
  return toDateStr(d)
}

const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

export function monthKey(dateStr) {
  return dateStr.slice(0, 7)
}

export function monthLabel(key) {
  const [y, m] = key.split('-').map(Number)
  return `${MOIS[m - 1]} ${y}`
}

export function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7)
}
