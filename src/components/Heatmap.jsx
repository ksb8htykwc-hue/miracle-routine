import { useEffect, useRef } from 'react'
import { toDateStr } from '../lib/dates.js'

function buildWeeks() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  const dow = start.getDay() || 7
  start.setDate(start.getDate() - (dow - 1))

  const weeks = []
  let cur = new Date(start)
  while (cur <= today) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(cur)
      week.push(d > today ? null : d)
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export default function Heatmap({ data }) {
  const scrollRef = useRef(null)
  const weeks = buildWeeks()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [])

  return (
    <div ref={scrollRef} className="overflow-x-auto pb-1 [scrollbar-width:none]">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d, di) => {
              if (!d) return <div key={di} className="w-[10px] h-[10px]" />
              const dateStr = toDateStr(d)
              const done = !!data[dateStr]?.done
              return (
                <div
                  key={di}
                  title={dateStr}
                  className={`w-[10px] h-[10px] rounded-[2px] ${
                    done ? 'bg-accent' : 'bg-white/[0.06]'
                  }`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
