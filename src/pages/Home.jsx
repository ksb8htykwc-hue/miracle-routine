import { useState } from 'react'
import { useData } from '../context/DataContext'
import { useElapsed } from '../lib/useCountdown'
import { computeScore } from '../lib/scoring'
import { dayOfYear, todayKey } from '../lib/dateUtils'
import { FLAT_PRESCRIPTIONS } from '../data/prescriptions'
import { MILESTONES } from '../data/milestones'
import SplitFlapCounter from '../components/SplitFlapCounter'
import Card from '../components/Card'
import HardMomentModal from '../components/HardMomentModal'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Home() {
  const { data, getDay } = useData()
  const { days, hours, minutes, seconds } = useElapsed(data.streakStart)
  const day = getDay(todayKey())
  const score = computeScore(day)
  const [showHardMoment, setShowHardMoment] = useState(false)

  const ancrage = FLAT_PRESCRIPTIONS[dayOfYear() % FLAT_PRESCRIPTIONS.length]
  const nextMilestone = MILESTONES.find(m => m.day > days)
  const daysToMilestone = nextMilestone ? nextMilestone.day - days : null

  return (
    <div>
      <div className="home-hero">
        <span className="home-hero__caption">Abstinence — jours entiers</span>
        <SplitFlapCounter value={days} size="lg" />
        <div className="timeflap">
          <SplitFlapCounter value={pad(hours)} size="sm" />
          <span className="text-secondary">:</span>
          <SplitFlapCounter value={pad(minutes)} size="sm" />
          <span className="text-secondary">:</span>
          <SplitFlapCounter value={pad(seconds)} size="sm" />
        </div>
      </div>

      <Card neo className="home-score-row">
        <div className="dial">
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="38" fill="none" stroke="var(--line)" strokeWidth="8" />
            <circle
              cx="44" cy="44" r="38" fill="none"
              stroke="var(--positive)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - score.percent / 100)}
            />
          </svg>
          <span className="dial__label">{score.percent}%</span>
        </div>
        <div className="home-score-row__text">
          <h3>Score du jour</h3>
          <p className="text-secondary" style={{ fontSize: 13 }}>{score.done}/{score.total} habitudes cochées</p>
        </div>
      </Card>

      <div className="section-title">Ancrage du jour</div>
      <Card>
        <div className="ancrage-theme">{ancrage.theme}</div>
        <p className="ancrage-text">{ancrage.text}</p>
      </Card>

      <div className="section-title">Prochain palier</div>
      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {nextMilestone ? (
          <>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14.5 }}>{nextMilestone.title}</div>
              <div className="text-secondary" style={{ fontSize: 12.5 }}>{daysToMilestone} jour{daysToMilestone > 1 ? 's' : ''} restant{daysToMilestone > 1 ? 's' : ''}</div>
            </div>
          </>
        ) : (
          <div className="text-secondary" style={{ fontSize: 13.5 }}>Tous les paliers sont atteints.</div>
        )}
      </Card>

      <button className="btn hard-moment-btn" onClick={() => setShowHardMoment(true)}>
        Moment difficile
      </button>

      {showHardMoment && <HardMomentModal onClose={() => setShowHardMoment(false)} />}
    </div>
  )
}
