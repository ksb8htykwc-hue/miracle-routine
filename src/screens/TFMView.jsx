import { useState } from 'react'
import GlassPanel from '../components/GlassPanel.jsx'
import { TFM_PROGRAM, TFM_OBJECTIF } from '../data/tfmProgram.js'

export default function TFMView({ tfmDay, onComplete, onSetCursor, onBack }) {
  const [viewDay, setViewDay] = useState(tfmDay)

  const clampedView = Math.min(Math.max(viewDay, 1), TFM_PROGRAM.length)
  const finished = tfmDay > TFM_PROGRAM.length
  const session = TFM_PROGRAM[clampedView - 1]
  const isCursorDay = clampedView === tfmDay

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <GlassPanel>
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack} className="text-xs text-fg-dim">
            ← Retour
          </button>
          <span className="text-xs text-fg-dim">
            {finished ? '60 / 60' : `Curseur : Jour ${tfmDay} / 60`}
          </span>
        </div>

        <p className="mt-4 text-[11px] text-fg-dim">Repère : {TFM_OBJECTIF}</p>
        {finished && (
          <p className="mt-1 text-[11px] text-accent">
            Les 60 jours sont faits. Tu peux revoir n’importe quel jour ci-dessous.
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewDay((d) => Math.max(1, d - 1))}
            disabled={clampedView <= 1}
            className="text-fg-dim px-2 disabled:opacity-30"
          >
            ←
          </button>
          <span className="text-sm font-semibold text-fg">Jour {clampedView} / 60</span>
          <button
            type="button"
            onClick={() => setViewDay((d) => Math.min(TFM_PROGRAM.length, d + 1))}
            disabled={clampedView >= TFM_PROGRAM.length}
            className="text-fg-dim px-2 disabled:opacity-30"
          >
            →
          </button>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-fg text-lg">{session.title}</h2>
          {session.duration && (
            <p className="mt-1 text-sm text-fg-dim">{session.duration} min</p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {session.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-fg flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-accent text-xs">ouvrir →</span>
              </a>
            ))}
          </div>

          {isCursorDay ? (
            <button
              type="button"
              onClick={onComplete}
              className="mt-6 w-full rounded-xl bg-accent text-bg py-3 text-sm font-semibold shadow-[0_0_20px_rgba(255,60,0,0.35)]"
            >
              Séance faite
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSetCursor(clampedView)}
              className="mt-6 w-full rounded-xl bg-white/[0.06] border border-white/15 text-fg py-3 text-sm font-semibold"
            >
              Reprendre le programme ici
            </button>
          )}
        </div>
      </GlassPanel>
    </div>
  )
}
