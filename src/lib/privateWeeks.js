import { toDateStr } from './dates.js'

const MOIS_COURT = [
  'jan', 'fév', 'mar', 'avr', 'mai', 'juin',
  'juil', 'août', 'sep', 'oct', 'nov', 'déc',
]

function short(d) {
  return `${d.getDate()} ${MOIS_COURT[d.getMonth()]}`
}

export function weeksInMonth(monthKey) {
  const [y, m] = monthKey.split('-').map(Number)
  const first = new Date(y, m - 1, 1)
  const last = new Date(y, m, 0)

  const cur = new Date(first)
  const dow = cur.getDay() || 7
  cur.setDate(cur.getDate() - (dow - 1))

  const weeks = []
  while (cur <= last) {
    const start = new Date(cur)
    const end = new Date(cur)
    end.setDate(end.getDate() + 6)
    weeks.push({
      key: toDateStr(start),
      label: `${short(start)} – ${short(end)}`,
    })
    cur.setDate(cur.getDate() + 7)
  }
  return weeks
}

export function quarterCapForMonth(monthKey) {
  const programStart = '2026-07'
  const [sy, sm] = programStart.split('-').map(Number)
  const [y, m] = monthKey.split('-').map(Number)
  const monthsSince = (y - sy) * 12 + (m - sm)
  const quarter = Math.min(4, Math.max(1, Math.floor(monthsSince / 3) + 1))
  return quarter
}

export const QUARTER_CAPS = [
  'Trimestre 1 (mois 1-3) : max 1x/semaine',
  'Trimestre 2 (mois 4-6) : max 1x/2 semaines',
  'Trimestre 3 (mois 7-9) : max 1x/mois',
  'Trimestre 4 (mois 10-12) : à la carte, conscient',
]
