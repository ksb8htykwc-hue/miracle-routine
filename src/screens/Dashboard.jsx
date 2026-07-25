import GlassPanel from '../components/GlassPanel.jsx'
import FrontSection from '../components/FrontSection.jsx'
import RecoveryBanner from '../components/RecoveryBanner.jsx'
import { FRONTS } from '../data/fronts.js'

export default function Dashboard({ frontsData, onChangeFront, onOpenTfm, onOpenDecision, onOpenPrivate, recoveryFronts, onDoMinimal }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <GlassPanel>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold tracking-[0.2em] text-fg-dim">SYSTÈME 22</h1>
          <button
            type="button"
            onClick={onOpenDecision}
            aria-label="Décisions"
            className="text-fg-dim text-lg leading-none px-2 -mr-2"
          >
            ⋯
          </button>
        </div>

        {recoveryFronts.length > 0 && (
          <div className="mt-4">
            <RecoveryBanner fronts={recoveryFronts} onDoMinimal={onDoMinimal} />
          </div>
        )}

        <div className="mt-4 divide-y divide-white/10">
          {FRONTS.map((front) => (
            <FrontSection
              key={front.id}
              front={front}
              frontData={frontsData[front.id] || {}}
              onChange={onChangeFront}
              onOpenTfm={onOpenTfm}
            />
          ))}
        </div>
      </GlassPanel>

      <button
        type="button"
        onClick={onOpenPrivate}
        className="mt-6 text-[11px] text-fg-dim/30"
      >
        espace privé
      </button>
    </div>
  )
}
