import { useState } from 'react'
import { useData } from '../context/DataContext'
import { dayStatus } from '../lib/scoring'
import { toDateKey, todayKey, monthLabel } from '../lib/dateUtils'
import { exportMonthToPdf } from '../lib/pdfExport'
import Card from '../components/Card'

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export default function Calendrier() {
  const { data, getDay } = useData()
  const now = new Date()
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() })

  const firstOfMonth = new Date(cursor.year, cursor.month, 1)
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7 // lundi = 0

  const cells = []
  for (let i = 0; i < leadingBlanks; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const today = todayKey()

  return (
    <div>
      <div className="cal-header">
        <button className="cal-nav-btn" onClick={() => setCursor(c => shiftMonth(c, -1))}>‹</button>
        <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: 'capitalize' }}>{monthLabel(cursor.year, cursor.month)}</h2>
        <button className="cal-nav-btn" onClick={() => setCursor(c => shiftMonth(c, 1))}>›</button>
      </div>

      <Card>
        <div className="cal-grid">
          {WEEKDAYS.map((w, i) => <div key={i} className="cal-weekday">{w}</div>)}
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="cal-day cal-day--empty" />
            const dateKey = toDateKey(new Date(cursor.year, cursor.month, d))
            const relapsed = data.relapseDates.includes(dateKey)
            const status = dateKey <= today ? dayStatus(getDay(dateKey), relapsed) : 'future'
            const isToday = dateKey === today
            return (
              <div
                key={i}
                className={`cal-day cal-day--${status} ${isToday ? 'cal-day--today' : ''}`}
              >
                {d}
              </div>
            )
          })}
        </div>
      </Card>

      <button
        className="btn btn--block"
        style={{ marginTop: 16 }}
        onClick={() => exportMonthToPdf(data, cursor.year, cursor.month)}
      >
        Exporter {monthLabel(cursor.year, cursor.month)} en PDF
      </button>
    </div>
  )
}

function shiftMonth({ year, month }, delta) {
  const d = new Date(year, month + delta, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}
