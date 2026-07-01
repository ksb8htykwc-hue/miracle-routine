import { useState } from 'react'
import { useData } from '../context/DataContext'
import { useElapsed } from '../lib/useCountdown'
import Card from './Card'

export default function HardMomentModal({ onClose }) {
  const { data, resetStreak } = useData()
  const { days } = useElapsed(data.streakStart)
  const [choice, setChoice] = useState(null)
  const [daysAtRelapse, setDaysAtRelapse] = useState(null)

  const confirmRelapse = () => {
    setDaysAtRelapse(days)
    resetStreak()
    setChoice('relapse-done')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <Card neo className="modal" onClick={e => e.stopPropagation()}>
        {!choice && (
          <>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Moment difficile</h3>
            <p className="text-secondary" style={{ fontSize: 13.5, marginBottom: 18 }}>Où en es-tu, là, maintenant ?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn--block" onClick={() => setChoice('resist')}>Fortes pulsions — je résiste encore</button>
              <button className="btn btn--block btn--danger" onClick={() => setChoice('relapse-confirm')}>Rechute — j'ai cédé</button>
            </div>
          </>
        )}

        {choice === 'resist' && (
          <>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Tiens bon.</h3>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--positive)', marginBottom: 10 }}>
              5 séries de {days} pompes
            </p>
            <p className="text-secondary" style={{ fontSize: 13.5, marginBottom: 18 }}>
              Maintenant. Pas dans cinq minutes.
            </p>
            <button className="btn btn--block btn--primary" onClick={onClose}>C'est fait</button>
          </>
        )}

        {choice === 'relapse-confirm' && (
          <>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Un raté n'est pas la fin du monde.</h3>
            <p className="text-secondary" style={{ fontSize: 13.5, marginBottom: 18 }}>
              Reprendre demain, c'est ça la discipline. Confirmer la rechute réinitialisera ton compteur.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn--block btn--danger" onClick={confirmRelapse}>Confirmer</button>
              <button className="btn btn--block" onClick={() => setChoice(null)}>Retour</button>
            </div>
          </>
        )}

        {choice === 'relapse-done' && (
          <>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--negative)', marginBottom: 10 }}>
              1 série de {daysAtRelapse} pompes
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 18 }}>
              Un raté n'est pas la fin du monde. Reprendre demain, c'est ça la discipline.
            </p>
            <button className="btn btn--block btn--primary" onClick={onClose}>Reprendre</button>
          </>
        )}
      </Card>
    </div>
  )
}
