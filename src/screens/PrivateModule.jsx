import { useEffect, useState } from 'react'
import GlassPanel from '../components/GlassPanel.jsx'
import { monthLabel } from '../lib/dates.js'
import { weeksInMonth, QUARTER_CAPS } from '../lib/privateWeeks.js'

const EMPTY_ENTRY = { kegel: false, sport: false, coucher: false, porno: 0, victoire: '' }

const ABSTINENCE_START = new Date('2026-07-25T00:00:00')

function useAbstinenceTimer() {
  const [elapsed, setElapsed] = useState(() => Date.now() - ABSTINENCE_START.getTime())
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - ABSTINENCE_START.getTime()), 1000)
    return () => clearInterval(id)
  }, [])
  const totalSecs = Math.floor(elapsed / 1000)
  const days = Math.floor(totalSecs / 86400)
  const hours = Math.floor((totalSecs % 86400) / 3600)
  const mins = Math.floor((totalSecs % 3600) / 60)
  const secs = totalSecs % 60
  return { days, hours, mins, secs }
}

export default function PrivateModule({ privateData, onChangeEntry, onChangeNote, onBack, monthOffset, setMonthOffset }) {
  const { days, hours, mins, secs } = useAbstinenceTimer()
  const base = new Date()
  base.setDate(1)
  base.setMonth(base.getMonth() + monthOffset)
  const key = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, '0')}`

  const weeks = weeksInMonth(key)
  const monthData = privateData[key] || { entries: {}, note: '' }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-bg-private">
      <GlassPanel dark>
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack} className="text-xs text-fg-dim">
            ← Retour
          </button>
          <h1 className="text-xs font-bold tracking-[0.15em] text-fg-dim">ESPACE PRIVÉ</h1>
        </div>

        <div className="mt-4 rounded-2xl border border-glass-faint bg-glass-xs p-4 text-center">
          <p className="text-[10px] text-fg-dim/50 tracking-widest uppercase mb-2">Abstinence</p>
          <div className="flex items-end justify-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-fg tabular-nums">{days}</span>
              <span className="text-[9px] text-fg-dim/50 mt-0.5">j</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-fg tabular-nums">{String(hours).padStart(2,'0')}</span>
              <span className="text-[9px] text-fg-dim/50 mt-0.5">h</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-fg tabular-nums">{String(mins).padStart(2,'0')}</span>
              <span className="text-[9px] text-fg-dim/50 mt-0.5">min</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-fg-dim/40 tabular-nums">{String(secs).padStart(2,'0')}</span>
              <span className="text-[9px] text-fg-dim/50 mt-0.5">s</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-[10px] text-fg-dim/60 leading-relaxed">
          {QUARTER_CAPS.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMonthOffset(monthOffset - 1)}
            className="text-fg-dim px-2"
          >
            ←
          </button>
          <span className="text-sm font-semibold text-fg capitalize">{monthLabel(key)}</span>
          <button
            type="button"
            onClick={() => setMonthOffset(monthOffset + 1)}
            className="text-fg-dim px-2"
          >
            →
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] text-fg-dim">
                <th className="pr-2 pb-2 font-normal">Semaine</th>
                <th className="px-2 pb-2 font-normal">Kegel</th>
                <th className="px-2 pb-2 font-normal">Sport 3x</th>
                <th className="px-2 pb-2 font-normal">Coucher</th>
                <th className="px-2 pb-2 font-normal">Porno</th>
                <th className="pl-2 pb-2 font-normal">Victoire du jour</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((w) => {
                const entry = monthData.entries[w.key] || EMPTY_ENTRY
                return (
                  <tr key={w.key} className="border-t border-glass-faint align-top">
                    <td className="pr-2 py-2 text-[11px] text-fg-dim whitespace-nowrap">{w.label}</td>
                    {['kegel', 'sport', 'coucher'].map((field) => (
                      <td key={field} className="px-2 py-2">
                        <input
                          type="checkbox"
                          checked={!!entry[field]}
                          onChange={(e) => onChangeEntry(key, w.key, { ...entry, [field]: e.target.checked })}
                          className="w-5 h-5 accent-[#ff3c00]"
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        min={0}
                        value={entry.porno}
                        onChange={(e) => onChangeEntry(key, w.key, { ...entry, porno: Math.max(0, Number(e.target.value) || 0) })}
                        className="w-12 rounded-lg bg-glass-sm border border-glass px-2 py-1 text-sm text-fg outline-none"
                      />
                    </td>
                    <td className="pl-2 py-2">
                      <input
                        type="text"
                        value={entry.victoire}
                        onChange={(e) => onChangeEntry(key, w.key, { ...entry, victoire: e.target.value })}
                        placeholder="—"
                        className="w-32 rounded-lg bg-glass-sm border border-glass px-2 py-1 text-sm text-fg placeholder:text-fg-dim outline-none"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <label className="mt-5 block text-[11px] text-fg-dim">
          Note libre du mois
          <textarea
            value={monthData.note}
            onChange={(e) => onChangeNote(key, e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-xl bg-glass-sm border border-glass px-3 py-2 text-sm text-fg outline-none focus:border-accent/60"
          />
        </label>
      </GlassPanel>
    </div>
  )
}
