import GlassPanel from '../components/GlassPanel.jsx'
import { todayStr } from '../lib/dates.js'

export default function Recovery({ fronts, onDoMinimal }) {
  const today = todayStr()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <GlassPanel>
        <p className="text-xs text-fg-dim">
          2 jours sans geste{fronts.length > 1 ? ', sur plusieurs fronts' : ''}. La version 1 minute suffit.
        </p>

        <div className="mt-5 divide-y divide-white/10">
          {fronts.map((front) => (
            <div key={front.id} className="py-5 first:pt-0 last:pb-0">
              <h2 className="font-bold text-fg">{front.name}</h2>
              <p className="mt-1 text-sm text-fg-dim">{front.minimal}</p>
              <button
                type="button"
                onClick={() => onDoMinimal(front.id, today, front.minimal)}
                className="mt-3 w-full rounded-xl bg-accent text-bg py-3 text-sm font-semibold"
              >
                Fais la version 1 minute, maintenant
              </button>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}
