// Point de référence fixe : départ de l'abstinence le 1er juillet 2026 à 00:00.
export const ABSTINENCE_START = '2026-07-01T00:00:00'

export function createDefaultData() {
  return {
    streakStart: ABSTINENCE_START,
    wastedSeriesCount: 0,
    relapseDates: [],
    routine: {},
    sportProgress: { lastCompletedDay: 0, completions: {} },
    finance: { entries: [] },
    materiel: {},
    milestonesSeen: [],
    theme: 'system',
    updatedAt: 0,
  }
}

// Fusionne l'état distant (Firestore) avec l'état local sans jamais faire régresser
// une progression déjà acquise (séances sport validées, habitudes cochées, matériel
// acheté, etc.), quelle que soit la source la plus "récente" au sens de l'horloge.
export function safeMerge(local, remote) {
  const base = { ...createDefaultData(), ...remote }

  const localSport = local.sportProgress || {}
  const remoteSport = base.sportProgress || {}
  base.sportProgress = {
    lastCompletedDay: Math.max(localSport.lastCompletedDay || 0, remoteSport.lastCompletedDay || 0),
    completions: { ...remoteSport.completions, ...localSport.completions },
  }

  const routine = { ...base.routine }
  for (const [date, localDay] of Object.entries(local.routine || {})) {
    routine[date] = { items: { ...routine[date]?.items, ...localDay.items } }
  }
  base.routine = routine

  base.materiel = { ...base.materiel, ...local.materiel }

  const financeByMonth = {}
  for (const entry of [...(base.finance?.entries || []), ...(local.finance?.entries || [])]) {
    financeByMonth[entry.month] = entry
  }
  base.finance = { entries: Object.values(financeByMonth).sort((a, b) => a.month.localeCompare(b.month)) }

  base.milestonesSeen = Array.from(new Set([...(base.milestonesSeen || []), ...(local.milestonesSeen || [])]))
  base.relapseDates = Array.from(new Set([...(base.relapseDates || []), ...(local.relapseDates || [])]))

  const localWasted = local.wastedSeriesCount || 0
  const remoteWasted = base.wastedSeriesCount || 0
  if (remoteWasted > localWasted) {
    // Une rechute a été enregistrée ailleurs plus récemment : on la respecte.
    base.wastedSeriesCount = remoteWasted
  } else if (localWasted > remoteWasted) {
    base.streakStart = local.streakStart
    base.wastedSeriesCount = localWasted
  } else {
    // Même nombre de rechutes : on garde le départ le plus ancien pour ne jamais perdre de jours.
    base.streakStart = new Date(local.streakStart || base.streakStart) < new Date(base.streakStart)
      ? local.streakStart
      : base.streakStart
  }

  base.updatedAt = Math.max(local.updatedAt || 0, remote.updatedAt || 0)
  return base
}
