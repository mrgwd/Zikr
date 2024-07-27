import { presentDate } from '@/utils/getPresentDate'
import { useState, useEffect } from 'react'

export function useLocalStorage(
  key: string,
  initialValue: any,
  resetAtMidNight: boolean = false,
) {
  const [storedValue, setStoredValue] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedValue = localStorage.getItem(key)
    if (savedValue) setStoredValue(JSON.parse(savedValue))
    else {
      setStoredValue(initialValue)
      localStorage.setItem(key, JSON.stringify(initialValue))
    }
  }, [])

  const setValue = (value: any) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  const resetValue = () => {
    setValue(initialValue)
  }

  const resetAtMidnight = () => {
    if (typeof window === 'undefined') return
    const lastReset = window.localStorage.getItem('lastReset')
    if (!lastReset) {
      window.localStorage.setItem('lastReset', presentDate.toString())
    } else if (
      presentDate.toDateString() !== new Date(lastReset).toDateString()
    ) {
      console.log('reset')
      resetValue()
      window.localStorage.setItem('lastReset', presentDate.toString())
    }
  }

  useEffect(() => {
    if (resetAtMidNight) resetAtMidnight()
  }, [resetAtMidNight])

  return [storedValue, setValue]
}
