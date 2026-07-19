import { FRONTS } from '../data/fronts.js'
import { daysAgoStr, todayStr } from './dates.js'

export function frontsNeedingRecovery(frontsData) {
  const today = todayStr()
  const d1 = daysAgoStr(1)
  const d2 = daysAgoStr(2)

  return FRONTS.filter((front) => {
    const data = frontsData[front.id] || {}
    if (data[today]?.done) return false
    return !data[d1]?.done && !data[d2]?.done
  })
}
