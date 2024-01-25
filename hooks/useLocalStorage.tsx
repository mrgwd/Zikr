import { Zikr } from '@/interfaces/appTypes'
import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialValue: Zikr[]) {
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = (value: Zikr[]) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }

  useEffect(() => {
    setStoredValue(readValue())
  }, [])

  useEffect(() => {
    const resetAtMidnight = () => {
      setValue(initialValue)
      localStorage.setItem(`${key}-last-update`, Date.now().toString())
    }

    const timeUntilMidnight = getTimeUntilMidnight()
    const lastUpdateTime = localStorage.getItem(`${key}-last-update`)

    // Check if the reset time has passed since the last update
    if (
      !lastUpdateTime ||
      Date.now() - parseInt(lastUpdateTime, 10) > timeUntilMidnight
    ) {
      resetAtMidnight()
    }

    // Set up an interval to check for reset at midnight
    const interval = setInterval(resetAtMidnight, timeUntilMidnight)

    return () => clearInterval(interval)
  }, [key, initialValue])

  return [storedValue, setValue]
}

function getTimeUntilMidnight() {
  const now = new Date()
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
  )
  return midnight.getTime() - now.getTime()
}
