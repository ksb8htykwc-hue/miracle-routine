const SIZE = 240
const STROKE = 10
const RADIUS = (SIZE - STROKE * 2) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const TICKS = [0, 90, 180, 270]

export default function AbstinenceDial({ days, percent = 0 }) {
  const offset = CIRCUMFERENCE * (1 - Math.min(100, Math.max(0, percent)) / 100)

  return (
    <div className="dial-outer neo">
      <div className="dial-inner">
        <svg className="dial-svg" viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {TICKS.map(angle => (
            <line
              key={angle}
              x1={SIZE / 2} y1={16} x2={SIZE / 2} y2={28}
              stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" opacity="0.35"
              transform={`rotate(${angle} ${SIZE / 2} ${SIZE / 2})`}
            />
          ))}
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--line)" strokeWidth={STROKE} />
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none"
            stroke="var(--positive)" strokeWidth={STROKE} strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            className="dial-progress"
          />
        </svg>
        <div className="dial-center">
          <span className="dial-days">{days}</span>
          <span className="dial-label">jour{days > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}
