import { Zikr } from '@/interfaces/appTypes'
import { presentDate } from '@/utils/getPresentDate'
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
    if (typeof window === 'undefined') return
    const lastReset = window.localStorage.getItem('lastReset')
    if (!lastReset) {
      window.localStorage.setItem('lastReset', presentDate.toString())
    } else if (presentDate.getTime() !== new Date(lastReset).getTime()) {
      console.log('reset')
      resetValue()
      window.localStorage.setItem('lastReset', presentDate.toString())
    }
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
    resetAtMidnight()
  })

  return [storedValue, setStoredValue]
}
