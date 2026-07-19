import { useEffect, useState } from 'react'
import { loadJSON, saveJSON } from './storage.js'

export function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => loadJSON(key, fallback))

  useEffect(() => {
    saveJSON(key, value)
  }, [key, value])

  return [value, setValue]
}
