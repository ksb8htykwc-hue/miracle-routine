import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { createDefaultData } from '../lib/defaultData'
import { todayKey } from '../lib/dateUtils'
import { db, firebaseEnabled } from '../lib/firebase'
import { useAuth } from './AuthContext'

const STORAGE_KEY = 'miracle-routine-data'
const DataContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createDefaultData()
    const parsed = JSON.parse(raw)
    return { ...createDefaultData(), ...parsed }
  } catch {
    return createDefaultData()
  }
}

function emptyDay() {
  return { items: {}, texts: {}, kifs: ['', '', ''] }
}

function remoteDocRef(uid) {
  return doc(db, 'users', uid, 'appData', 'state')
}

export function DataProvider({ children }) {
  const { user } = useAuth()
  const [data, setDataRaw] = useState(loadInitial)
  const skipNextPush = useRef(false)
  const hydrated = useRef(false)

  // Toute mutation locale passe par ici pour horodater l'état (utilisé pour la réconciliation Firestore).
  const setData = useCallback((updater) => {
    setDataRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      return next === prev ? prev : { ...next, updatedAt: Date.now() }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // Synchro Firestore : réconciliation initiale (le plus récent gagne) puis écoute + écriture différée.
  useEffect(() => {
    if (!firebaseEnabled || !user) return
    hydrated.current = false
    const ref = remoteDocRef(user.uid)
    let cancelled = false

    getDoc(ref).then(snap => {
      if (cancelled) return
      if (snap.exists()) {
        const remote = snap.data()
        setDataRaw(prev => {
          if ((remote.updatedAt || 0) >= (prev.updatedAt || 0)) {
            return { ...createDefaultData(), ...remote }
          }
          return prev
        })
      } else {
        setDoc(ref, data).catch(() => {})
      }
      hydrated.current = true
    }).catch(() => {
      hydrated.current = true
    })

    const unsub = onSnapshot(ref, snap => {
      if (!snap.exists() || snap.metadata.hasPendingWrites) return
      const remote = snap.data()
      setDataRaw(prev => {
        if ((remote.updatedAt || 0) > (prev.updatedAt || 0)) {
          skipNextPush.current = true
          return { ...createDefaultData(), ...remote }
        }
        return prev
      })
    })

    return () => { cancelled = true; unsub() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (!firebaseEnabled || !user || !hydrated.current) return
    if (skipNextPush.current) { skipNextPush.current = false; return }
    const ref = remoteDocRef(user.uid)
    const t = setTimeout(() => {
      setDoc(ref, data).catch(() => {})
    }, 800)
    return () => clearTimeout(t)
  }, [data, user])

  const getDay = useCallback((dateKey) => data.routine[dateKey] || emptyDay(), [data.routine])

  const setRoutineItem = useCallback((dateKey, itemId, value) => {
    setData(prev => {
      const day = prev.routine[dateKey] || emptyDay()
      return {
        ...prev,
        routine: {
          ...prev.routine,
          [dateKey]: { ...day, items: { ...day.items, [itemId]: value } },
        },
      }
    })
  }, [setData])

  const setRoutineText = useCallback((dateKey, field, value) => {
    setData(prev => {
      const day = prev.routine[dateKey] || emptyDay()
      return {
        ...prev,
        routine: {
          ...prev.routine,
          [dateKey]: { ...day, texts: { ...day.texts, [field]: value } },
        },
      }
    })
  }, [setData])

  const setKif = useCallback((dateKey, index, value) => {
    setData(prev => {
      const day = prev.routine[dateKey] || emptyDay()
      const kifs = [...(day.kifs || ['', '', ''])]
      kifs[index] = value
      return {
        ...prev,
        routine: { ...prev.routine, [dateKey]: { ...day, kifs } },
      }
    })
  }, [setData])

  const completeSportDay = useCallback((globalDay) => {
    setData(prev => ({
      ...prev,
      sportProgress: {
        lastCompletedDay: Math.max(prev.sportProgress.lastCompletedDay, globalDay),
        completions: { ...prev.sportProgress.completions, [globalDay]: todayKey() },
      },
    }))
  }, [setData])

  const addFinanceEntry = useCallback((month, amount) => {
    setData(prev => {
      const entries = prev.finance.entries.filter(e => e.month !== month)
      entries.push({ month, amount })
      entries.sort((a, b) => a.month.localeCompare(b.month))
      return { ...prev, finance: { entries } }
    })
  }, [setData])

  const markMilestoneSeen = useCallback((day) => {
    setData(prev => (
      prev.milestonesSeen.includes(day)
        ? prev
        : { ...prev, milestonesSeen: [...prev.milestonesSeen, day] }
    ))
  }, [setData])

  const resetStreak = useCallback(() => {
    setData(prev => ({
      ...prev,
      streakStart: new Date().toISOString(),
      wastedSeriesCount: prev.wastedSeriesCount + 1,
      relapseDates: [...prev.relapseDates, todayKey()],
      milestonesSeen: [],
    }))
  }, [setData])

  const setTheme = useCallback((theme) => {
    setData(prev => ({ ...prev, theme }))
  }, [setData])

  const value = useMemo(() => ({
    data,
    todayKey,
    getDay,
    setRoutineItem,
    setRoutineText,
    setKif,
    completeSportDay,
    addFinanceEntry,
    markMilestoneSeen,
    resetStreak,
    setTheme,
  }), [data, getDay, setRoutineItem, setRoutineText, setKif, completeSportDay, addFinanceEntry, markMilestoneSeen, resetStreak, setTheme])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}
