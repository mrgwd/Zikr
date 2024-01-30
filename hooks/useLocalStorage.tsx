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
    const nextMidnight = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
    const timeUntilMidnight = nextMidnight - new Date().getTime()
    const timeout = setTimeout(resetValue, timeUntilMidnight)
    return () => clearTimeout(timeout)
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  })

  useEffect(resetAtMidnight)

  return [storedValue, setStoredValue]

  //   const readValue = () => {
  //     if (typeof window === 'undefined') {
  //       return initialValue
  //     }

  //     try {
  //       const item = window.localStorage.getItem(key)
  //       return item ? JSON.parse(item) : initialValue
  //     } catch (error) {
  //       console.warn(`Error reading localStorage key “${key}”:`, error)
  //       return initialValue
  //     }
  //   }

  //   const [storedValue, setStoredValue] = useState(readValue)

  //   const setValue = (value: Zikr[]) => {
  //     try {
  //       setStoredValue(value)
  //       window.localStorage.setItem(key, JSON.stringify(value))
  //     } catch (error) {
  //       console.warn(`Error setting localStorage key “${key}”:`, error)
  //     }
  //   }

  //   useEffect(() => {
  //     setStoredValue(readValue())
  //   }, [])

  //   return [storedValue, setValue]
  // }

  // function getTimeUntilMidnight() {
  //   const now = new Date()
  //   const midnight = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate() + 1,
  //     0,
  //     0,
  //     0,
  //   ) // Wed Jan 31 2024
  //   return midnight.getTime() - now.getTime() //26201254
}
