import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { ROUTINE_ITEMS, SECTIONS, MIN_VITAL_IDS } from '../data/routineItems'
import { isItemDone, computeScore } from '../lib/scoring'
import { todayKey } from '../lib/dateUtils'
import Toggle from '../components/Toggle'
import Card from '../components/Card'

export default function Routine() {
  const { getDay, setRoutineItem, setRoutineText, setKif } = useData()
  const dateKey = todayKey()
  const day = getDay(dateKey)
  const score = computeScore(day)

  return (
    <div>
      <Card neo style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <div className="text-secondary" style={{ fontSize: 12 }}>Score du jour</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{score.percent}%</div>
        </div>
        <div className={`pill ${score.minVitalMet ? '' : ''}`} style={{ borderColor: score.minVitalMet ? 'var(--positive)' : 'var(--line)', color: score.minVitalMet ? 'var(--positive)' : 'var(--text-secondary)' }}>
          <span className="dot" style={{ background: score.minVitalMet ? 'var(--positive)' : 'var(--text-secondary)' }} />
          Minimum vital {score.minVitalMet ? 'atteint' : `${MIN_VITAL_IDS.filter(id => isItemDone(ROUTINE_ITEMS.find(i => i.id === id), day)).length}/6`}
        </div>
      </Card>

      {SECTIONS.map(section => (
        <div key={section.id}>
          <div className="section-title">{section.label}{section.hint ? ` · ${section.hint}` : ''}</div>
          <Card>
            {ROUTINE_ITEMS.filter(item => item.section === section.id).map(item => (
              <RoutineRow
                key={item.id}
                item={item}
                day={day}
                dateKey={dateKey}
                setRoutineItem={setRoutineItem}
                setRoutineText={setRoutineText}
                setKif={setKif}
              />
            ))}
          </Card>
        </div>
      ))}
    </div>
  )
}

function RoutineRow({ item, day, dateKey, setRoutineItem, setRoutineText, setKif }) {
  const done = isItemDone(item, day)

  return (
    <div className="routine-row">
      <div className="routine-row__main">
        <div className="routine-row__label-line">
          {item.minVital && <span className="dot" style={{ background: done ? 'var(--positive)' : 'var(--text-secondary)' }} />}
          <span className="routine-row__label">{item.label}</span>
        </div>
        {item.linkTo && (
          <Link to={item.linkTo} className="routine-row__link">Aller à l'entraînement →</Link>
        )}

        {item.type === 'text' && (
          <textarea
            className="field"
            rows={3}
            placeholder="Écris ton bilan de la journée…"
            style={{ marginTop: 8 }}
            value={day.texts?.[item.id] || ''}
            onChange={e => setRoutineText(dateKey, item.id, e.target.value)}
          />
        )}

        {item.type === 'kifs' && (
          <div className="kifs-list">
            {[0, 1, 2].map(i => (
              <input
                key={i}
                className="field"
                type="text"
                placeholder={`Kif n°${i + 1}`}
                value={day.kifs?.[i] || ''}
                onChange={e => setKif(dateKey, i, e.target.value)}
              />
            ))}
          </div>
        )}
      </div>

      {item.type !== 'text' && item.type !== 'kifs' && (
        <Toggle checked={done} onChange={value => setRoutineItem(dateKey, item.id, value)} />
      )}
    </div>
  )
}
