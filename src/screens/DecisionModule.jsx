import { useState } from 'react'
import GlassPanel from '../components/GlassPanel.jsx'
import { todayStr } from '../lib/dates.js'

export default function DecisionModule({ decisions, onAdd, onBack }) {
  const [name, setName] = useState('')
  const [criterion, setCriterion] = useState('')
  const [reviewDate, setReviewDate] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim() || !criterion.trim() || !reviewDate) return
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      criterion: criterion.trim(),
      reviewDate,
      createdAt: todayStr(),
    })
    setName('')
    setCriterion('')
    setReviewDate('')
  }

  const sorted = [...decisions].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <GlassPanel>
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack} className="text-xs text-fg-dim">
            ← Retour
          </button>
          <h1 className="text-xs font-bold tracking-[0.15em] text-fg-dim">DÉCISIONS</h1>
        </div>

        <form onSubmit={submit} className="mt-5 flex flex-col gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du projet ou de l’achat"
            className="rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-fg placeholder:text-fg-dim outline-none focus:border-accent/60"
          />
          <textarea
            value={criterion}
            onChange={(e) => setCriterion(e.target.value)}
            placeholder="Critère de succès mesurable et daté"
            rows={2}
            className="resize-none rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-fg placeholder:text-fg-dim outline-none focus:border-accent/60"
          />
          <label className="text-[11px] text-fg-dim">
            Date de bilan
            <input
              type="date"
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              className="mt-1 w-full rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-fg outline-none focus:border-accent/60"
            />
          </label>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-accent text-bg py-3 text-sm font-semibold shadow-[0_0_20px_rgba(255,60,0,0.35)]"
          >
            Enregistrer
          </button>
        </form>

        {sorted.length > 0 && (
          <div className="mt-6 divide-y divide-white/10">
            {sorted.map((d) => (
              <div key={d.id} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-fg">{d.name}</p>
                <p className="mt-1 text-xs text-fg-dim">{d.criterion}</p>
                <p className="mt-1 text-[11px] text-fg-dim">Bilan : {d.reviewDate}</p>
              </div>
            ))}
          </div>
        )}
      </GlassPanel>
    </div>
  )
}
