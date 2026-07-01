import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { useElapsed } from '../lib/useCountdown'
import { MILESTONES } from '../data/milestones'
import Card from './Card'

export default function MilestoneModal() {
  const { data, markMilestoneSeen } = useData()
  const { days } = useElapsed(data.streakStart)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const reached = MILESTONES.find(m => days >= m.day && !data.milestonesSeen.includes(m.day))
    if (reached && !active) setActive(reached)
  }, [days, data.milestonesSeen, active])

  if (!active) return null

  return (
    <div className="modal-backdrop">
      <Card neo className="modal" style={{ textAlign: 'center' }}>
        <div className="pill" style={{ margin: '0 auto 16px', borderColor: 'var(--positive)', color: 'var(--positive)' }}>Palier atteint</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{active.title}</h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: active.reward ? 8 : 20 }}>{active.message}</p>
        {active.reward && (
          <p className="text-secondary" style={{ fontSize: 13, marginBottom: 20 }}>Récompense : {active.reward}</p>
        )}
        <button
          className="btn btn--block btn--primary"
          onClick={() => {
            markMilestoneSeen(active.day)
            setActive(null)
          }}
        >
          Continuer
        </button>
      </Card>
    </div>
  )
}
