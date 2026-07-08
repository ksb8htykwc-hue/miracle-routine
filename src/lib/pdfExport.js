import jsPDF from 'jspdf'
import { computeScore } from './scoring'
import { SPORT_PROGRAM } from '../data/sportProgram'
import { MATERIEL_ALL_ITEMS } from '../data/materiel'
import { formatFcfa } from './format'
import { MOIS } from './dateUtils'

function monthDays(year, month) {
  const count = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: count }, (_, i) => {
    const d = i + 1
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    return key
  })
}

export function exportMonthToPdf(data, year, month) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 48
  let y = margin
  const lineHeight = 16
  const pageHeight = doc.internal.pageSize.getHeight()
  const pageWidth = doc.internal.pageSize.getWidth()

  const ensureSpace = (needed = lineHeight) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
  }

  const h1 = text => {
    ensureSpace(28)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(text, margin, y)
    y += 26
  }

  const h2 = text => {
    ensureSpace(22)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(text, margin, y)
    y += 18
  }

  const p = text => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2)
    lines.forEach(line => {
      ensureSpace()
      doc.text(line, margin, y)
      y += lineHeight
    })
  }

  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`
  const days = monthDays(year, month)

  h1(`Miracle Routine — Bilan de ${MOIS[month]} ${year}`)

  // Résumé des scores
  h2('Résumé des scores')
  const scored = days
    .filter(k => data.routine[k])
    .map(k => ({ key: k, ...computeScore(data.routine[k]) }))
  if (scored.length === 0) {
    p('Aucune donnée de routine enregistrée ce mois-ci.')
  } else {
    const avg = Math.round(scored.reduce((s, d) => s + d.percent, 0) / scored.length)
    const minVitalDays = scored.filter(d => d.minVitalMet).length
    p(`Jours renseignés : ${scored.length}/${days.length}`)
    p(`Score moyen : ${avg}%`)
    p(`Minimum vital atteint : ${minVitalDays} jour(s)`)
  }

  // Sport
  h2('Progression sport')
  const sportThisMonth = Object.entries(data.sportProgress.completions || {})
    .filter(([, date]) => date.startsWith(monthKey))
    .map(([globalDay, date]) => ({ globalDay: Number(globalDay), date }))
    .sort((a, b) => a.globalDay - b.globalDay)
  if (sportThisMonth.length === 0) {
    p('Aucune séance validée ce mois-ci.')
  } else {
    sportThisMonth.forEach(({ globalDay, date }) => {
      const entry = SPORT_PROGRAM.find(d => d.globalDay === globalDay)
      p(`${date} — Jour ${globalDay} : ${entry ? entry.title : ''}`)
    })
  }
  p(`Total programme : ${data.sportProgress.lastCompletedDay}/${SPORT_PROGRAM.length} séances validées.`)

  // Finances
  h2('Progression financière')
  const financeEntry = data.finance.entries.find(e => e.month === monthKey)
  if (financeEntry) {
    p(`Revenu net déclaré pour ${monthKey} : ${formatFcfa(financeEntry.amount)}`)
  } else {
    p('Aucune saisie financière pour ce mois-ci.')
  }

  // Matériel
  h2('Matériel acquis')
  const materielChecked = data.materiel || {}
  const materielThisMonth = MATERIEL_ALL_ITEMS.filter(it => (materielChecked[it.id] || '').startsWith(monthKey))
  if (materielThisMonth.length === 0) {
    p('Aucune acquisition validée ce mois-ci.')
  } else {
    materielThisMonth.forEach(it => p(`${materielChecked[it.id]} — ${it.nom} (${formatFcfa(it.prix)})`))
  }
  const materielTotalChecked = MATERIEL_ALL_ITEMS
    .filter(it => materielChecked[it.id])
    .reduce((s, it) => s + it.prix, 0)
  p(`Total acquis à ce jour : ${formatFcfa(materielTotalChecked)}`)

  doc.save(`miracle-routine-${monthKey}.pdf`)
}
