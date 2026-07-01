import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { SPORT_PROGRAM } from '../data/sportProgram'
import Card from '../components/Card'

export default function SportDay() {
  const { day } = useParams()
  const navigate = useNavigate()
  const { data, completeSportDay } = useData()
  const globalDay = Number(day)
  const entry = SPORT_PROGRAM.find(d => d.globalDay === globalDay)
  const lastCompleted = data.sportProgress.lastCompletedDay

  if (!entry) return null

  const done = globalDay <= lastCompleted
  const isCurrent = globalDay === lastCompleted + 1
  const locked = !done && !isCurrent

  if (locked) {
    return (
      <div>
        <Card>
          <p className="text-secondary" style={{ fontSize: 13.5 }}>Cette séance n'est pas encore débloquée.</p>
          <Link to="/sport" className="btn" style={{ marginTop: 14, display: 'inline-flex' }}>Retour au programme</Link>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Link to="/sport" className="text-secondary" style={{ fontSize: 13, textDecoration: 'none' }}>← Programme</Link>

      <div className="section-title" style={{ marginTop: 16 }}>
        Jour {entry.globalDay} — Volume {entry.volume}, Jour {entry.dayInVolume}
      </div>

      <Card neo>
        <h2 style={{ fontSize: 19, fontWeight: 700 }}>{entry.rest ? 'Repos' : entry.title}</h2>
        {entry.duration && <p className="text-secondary" style={{ fontSize: 13, marginTop: 4 }}>Durée approximative : {entry.duration} minutes</p>}
        {entry.rest && <p className="text-secondary" style={{ fontSize: 13, marginTop: 4 }}>Facultatif : assouplissement, posture ou technique.</p>}
      </Card>

      <div className="section-title">Blocs d'exercice</div>
      <div className="sport-blocks">
        {entry.blocks.map((block, i) => (
          <a key={i} href={block.url} target="_blank" rel="noreferrer" className="sport-block">
            {block.label}
            <span className="text-secondary">▶</span>
          </a>
        ))}
      </div>

      {!entry.rest && (
        <Card style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13.5 }}>N'oublie pas le Kegel (5 min) juste après la séance.</p>
        </Card>
      )}

      {done ? (
        <button className="btn btn--block" disabled>Séance déjà validée</button>
      ) : (
        <button
          className="btn btn--block btn--primary"
          onClick={() => {
            completeSportDay(globalDay)
            navigate('/sport')
          }}
        >
          Séance terminée
        </button>
      )}
    </div>
  )
}
