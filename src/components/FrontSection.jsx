import Heatmap from './Heatmap.jsx'
import { GESTE_PROMPT } from '../data/fronts.js'
import { todayStr } from '../lib/dates.js'

export default function FrontSection({ front, frontData, onChange, onOpenTfm }) {
  const today = todayStr()
  const entry = frontData[today] || { done: false, text: '' }
  const canCheck = entry.text.trim().length > 0

  function setText(text) {
    onChange(front.id, today, { ...entry, text })
  }

  function toggleDone() {
    if (!entry.done && !canCheck) return
    onChange(front.id, today, { ...entry, done: !entry.done })
  }

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="font-bold text-fg">{front.name}</h2>
          <p className="text-xs text-fg-dim">{front.subtitle}</p>
        </div>
        {front.id === 'corps' && (
          <button
            type="button"
            onClick={onOpenTfm}
            className="text-xs text-accent shrink-0"
          >
            Programme TFM →
          </button>
        )}
      </div>

      <textarea
        value={entry.text}
        onChange={(e) => setText(e.target.value)}
        placeholder={GESTE_PROMPT}
        rows={2}
        className="mt-3 w-full resize-none rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-fg placeholder:text-fg-dim outline-none focus:border-accent/60"
      />

      <button
        type="button"
        onClick={toggleDone}
        className={`mt-3 w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
          entry.done
            ? 'bg-accent text-bg shadow-[0_0_20px_rgba(255,60,0,0.35)]'
            : canCheck
              ? 'bg-white/[0.06] text-fg border border-white/15'
              : 'bg-white/[0.03] text-fg-dim border border-white/5'
        }`}
      >
        {entry.done ? 'Fait aujourd’hui' : 'Marquer comme fait'}
      </button>

      <div className="mt-4">
        <Heatmap data={frontData} />
      </div>
    </div>
  )
}
