import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { SPORT_PROGRAM, TOTAL_SPORT_DAYS } from '../data/sportProgram'
import Card from '../components/Card'

export default function Sport() {
  const { data } = useData()
  const lastCompleted = data.sportProgress.lastCompletedDay
  const currentRef = useRef(null)

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <div>
      <Card neo className="sport-progress">
        <div>
          <div className="text-secondary" style={{ fontSize: 12 }}>Progression</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{lastCompleted}/{TOTAL_SPORT_DAYS}</div>
        </div>
        <div className="progress-bar" style={{ flex: 1, marginLeft: 18 }}>
          <div className="progress-bar__fill" style={{ width: `${(lastCompleted / TOTAL_SPORT_DAYS) * 100}%` }} />
        </div>
      </Card>

      <div className="sport-list" style={{ marginTop: 16 }}>
        {SPORT_PROGRAM.map(day => {
          const done = day.globalDay <= lastCompleted
          const isCurrent = day.globalDay === lastCompleted + 1
          const locked = !done && !isCurrent

          const content = (
            <>
              <div className={`sport-day__num ${done ? 'sport-day__num--done' : ''}`}>
                {done ? '✓' : day.globalDay}
              </div>
              <div className="sport-day__body">
                <div className="sport-day__title">{day.rest ? `Jour ${day.globalDay} · Repos` : `Jour ${day.globalDay} · ${day.title}`}</div>
                <div className="sport-day__meta">
                  Volume {day.volume} — Jour {day.dayInVolume}{day.duration ? ` · ${day.duration} min` : ''}
                </div>
              </div>
            </>
          )

          if (locked) {
            return (
              <div key={day.globalDay} className="sport-day sport-day--locked">
                {content}
              </div>
            )
          }

          return (
            <Link
              key={day.globalDay}
              ref={isCurrent ? currentRef : null}
              to={`/sport/${day.globalDay}`}
              className={`sport-day ${isCurrent ? 'sport-day--current' : ''}`}
              style={{ textDecoration: 'none', color: 'var(--text)' }}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
