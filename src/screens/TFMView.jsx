import GlassPanel from '../components/GlassPanel.jsx'
import { TFM_PROGRAM, TFM_OBJECTIF } from '../data/tfmProgram.js'

export default function TFMView({ tfmDay, onComplete, onBack }) {
  const finished = tfmDay > TFM_PROGRAM.length
  const session = finished ? null : TFM_PROGRAM[tfmDay - 1]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <GlassPanel>
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack} className="text-xs text-fg-dim">
            ← Retour
          </button>
          <span className="text-xs text-fg-dim">
            {finished ? '60 / 60' : `Jour ${tfmDay} / 60`}
          </span>
        </div>

        <p className="mt-4 text-[11px] text-fg-dim">Repère : {TFM_OBJECTIF}</p>

        {finished ? (
          <div className="mt-6">
            <h2 className="font-bold text-fg text-lg">Programme terminé</h2>
            <p className="mt-2 text-sm text-fg-dim">
              Les 60 jours sont faits. Rien d’autre à cocher ici.
            </p>
          </div>
        ) : (
          <div className="mt-6">
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

            <button
              type="button"
              onClick={onComplete}
              className="mt-6 w-full rounded-xl bg-accent text-bg py-3 text-sm font-semibold"
            >
              Séance faite
            </button>
          </div>
        )}
      </GlassPanel>
    </div>
  )
}
