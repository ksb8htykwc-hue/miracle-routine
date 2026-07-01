import { useState } from 'react'
import { useData } from '../context/DataContext'
import { PRESCRIPTIONS } from '../data/prescriptions'
import Card from '../components/Card'

const GOAL = 500000

function formatFcfa(n) {
  return `${n.toLocaleString('fr-FR')} FCFA`
}

export default function Objectifs() {
  const [tab, setTab] = useState('finances')

  return (
    <div>
      <div className="subtabs">
        <button className={`subtab ${tab === 'finances' ? 'subtab--active' : ''}`} onClick={() => setTab('finances')}>Finances</button>
        <button className={`subtab ${tab === 'prescriptions' ? 'subtab--active' : ''}`} onClick={() => setTab('prescriptions')}>Prescriptions</button>
      </div>

      {tab === 'finances' ? <Finances /> : <Prescriptions />}
    </div>
  )
}

function Finances() {
  const { data, addFinanceEntry } = useData()
  const [month, setMonth] = useState('')
  const [amount, setAmount] = useState('')

  const entries = [...data.finance.entries].sort((a, b) => b.month.localeCompare(a.month))
  const latest = entries[0]
  const globalPercent = latest ? Math.min(100, Math.round((latest.amount / GOAL) * 100)) : 0

  const submit = e => {
    e.preventDefault()
    if (!month || !amount) return
    addFinanceEntry(month, Number(amount))
    setMonth('')
    setAmount('')
  }

  return (
    <div>
      <Card neo>
        <div className="text-secondary" style={{ fontSize: 12 }}>Objectif</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>{formatFcfa(GOAL)} / mois</div>
        <div className="text-secondary" style={{ fontSize: 12.5, marginTop: 2 }}>Horizon : décembre 2027</div>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${globalPercent}%` }} />
        </div>
        <div className="text-secondary" style={{ fontSize: 12, marginTop: 6 }}>
          {latest ? `${globalPercent}% de l'objectif (dernière saisie : ${latest.month})` : 'Aucune saisie pour le moment'}
        </div>
      </Card>

      <div className="section-title">Saisie mensuelle</div>
      <Card>
        <form className="finance-form" onSubmit={submit}>
          <input className="field" type="month" value={month} onChange={e => setMonth(e.target.value)} required />
          <input className="field" type="number" min="0" placeholder="Montant FCFA" value={amount} onChange={e => setAmount(e.target.value)} required />
          <button className="btn btn--primary" type="submit">+</button>
        </form>
      </Card>

      <div className="section-title">Historique</div>
      <Card>
        {entries.length === 0 && <p className="text-secondary" style={{ fontSize: 13.5 }}>Rien à afficher pour l'instant.</p>}
        {entries.map(entry => {
          const percent = Math.min(100, Math.round((entry.amount / GOAL) * 100))
          return (
            <div key={entry.month} className="finance-entry">
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{entry.month}</div>
                <div className="progress-bar" style={{ width: 140 }}>
                  <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{formatFcfa(entry.amount)}</div>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

function Prescriptions() {
  return (
    <div>
      {PRESCRIPTIONS.map(group => (
        <div key={group.theme} className="prescription-group">
          <div className="section-title">{group.theme}</div>
          <Card>
            {group.items.map((text, i) => (
              <p key={i} className="prescription-item">{text}</p>
            ))}
          </Card>
        </div>
      ))}
    </div>
  )
}
