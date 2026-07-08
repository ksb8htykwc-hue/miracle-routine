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
