import { todayStr } from '../lib/dates.js'

export default function RecoveryBanner({ fronts, onDoMinimal }) {
  const today = todayStr()

  return (
    <div className="mb-5 rounded-2xl border border-accent/30 bg-accent/[0.06] p-4">
      <p className="text-xs text-fg-dim">
        2 jours sans geste{fronts.length > 1 ? ', sur plusieurs fronts' : ''}. La version 1 minute suffit — ou continue plus bas si ce n’est pas le moment.
      </p>

      <div className="mt-3 divide-y divide-white/10">
        {fronts.map((front) => (
          <div key={front.id} className="py-3 first:pt-0 last:pb-0">
            <p className="text-sm font-semibold text-fg">{front.name}</p>
            <p className="mt-1 text-xs text-fg-dim">{front.minimal}</p>
            <button
              type="button"
              onClick={() => onDoMinimal(front.id, today, front.minimal)}
              className="mt-2 w-full rounded-xl bg-accent text-bg py-2.5 text-sm font-semibold shadow-[0_0_20px_rgba(255,60,0,0.35)]"
            >
              Fais la version 1 minute, maintenant
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
