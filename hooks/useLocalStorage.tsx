import { Zikr } from '@/interfaces/appTypes'
import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialValue: Zikr[]) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const resetValue = () => {
    setStoredValue(initialValue)
  }

  const resetAtMidnight = () => {
    const now = new Date()
    const nextMidnight = new Date(now)
    nextMidnight.setHours(24, 0, 0, 0)
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime()
    const timeout = setTimeout(resetValue, timeUntilMidnight)
    return () => clearTimeout(timeout)
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [])

  useEffect(resetAtMidnight)
  return [storedValue, setStoredValue]
}
