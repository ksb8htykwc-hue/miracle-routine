import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { ROUTINE_ITEMS, SECTIONS } from '../data/routineItems'
import { isItemDone, computeScore } from '../lib/scoring'
import { todayKey } from '../lib/dateUtils'
import Toggle from '../components/Toggle'
import Card from '../components/Card'

export default function Routine() {
  const { getDay, setRoutineItem } = useData()
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
        <div className="text-secondary" style={{ fontSize: 13 }}>{score.done}/{score.total} habitudes</div>
      </Card>

      {SECTIONS.map(section => (
        <div key={section.id}>
          <div className="section-title">{section.label}</div>
          <Card>
            {ROUTINE_ITEMS.filter(item => item.section === section.id).map(item => (
              <RoutineRow
                key={item.id}
                item={item}
                day={day}
                dateKey={dateKey}
                setRoutineItem={setRoutineItem}
              />
            ))}
          </Card>
        </div>
      ))}
    </div>
  )
}

function RoutineRow({ item, day, dateKey, setRoutineItem }) {
  const done = isItemDone(item, day)

  return (
    <div className="routine-row">
      <div className="routine-row__main">
        <div className="routine-row__label-line">
          <span className="routine-row__label">{item.label}</span>
        </div>
        {item.linkTo && (
          <Link to={item.linkTo} className="routine-row__link">Aller à l'entraînement →</Link>
        )}
      </div>
      <Toggle checked={done} onChange={value => setRoutineItem(dateKey, item.id, value)} />
    </div>
  )
}
