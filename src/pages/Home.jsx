import { useState } from 'react'
import { useData } from '../context/DataContext'
import { useElapsed } from '../lib/useCountdown'
import { computeScore } from '../lib/scoring'
import { dayOfYear, todayKey } from '../lib/dateUtils'
import { FLAT_PRESCRIPTIONS } from '../data/prescriptions'
import { MILESTONES } from '../data/milestones'
import AbstinenceDial from '../components/AbstinenceDial'
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
  const previousMilestoneDay = [...MILESTONES].reverse().find(m => m.day <= days)?.day || 0
  const milestoneSpan = nextMilestone ? nextMilestone.day - previousMilestoneDay : 1
  const milestonePercent = nextMilestone
    ? ((days - previousMilestoneDay) / milestoneSpan) * 100
    : 100

  return (
    <div>
      <div className="home-hero">
        <AbstinenceDial days={days} percent={milestonePercent} />
        <div className="time-pill">
          {pad(hours)}<span className="text-secondary">:</span>{pad(minutes)}<span className="text-secondary">:</span>{pad(seconds)}
        </div>
        <p className="home-hero__milestone">
          {nextMilestone
            ? `${daysToMilestone} jour${daysToMilestone > 1 ? 's' : ''} avant « ${nextMilestone.title} »`
            : 'Tous les paliers sont atteints.'}
        </p>
      </div>

      <Card neo className="home-score-row">
        <div className="dial">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" strokeWidth="7" />
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke="var(--positive)" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - score.percent / 100)}
              transform="rotate(-90 40 40)"
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

      <button className="btn hard-moment-btn" onClick={() => setShowHardMoment(true)}>
        Moment difficile
      </button>

      {showHardMoment && <HardMomentModal onClose={() => setShowHardMoment(false)} />}
    </div>
  )
}
