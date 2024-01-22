import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialValue: any) {
  // Get from local storage then
  // parse stored json or if none return initialValue
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

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
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
    const handle = setTimeout(() => {
      setValue(initialValue)
    }, getTimeUntilMidnight())

    return () => {
      clearTimeout(handle)
    }
  }, [])

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

// import { useState, useEffect } from 'react'

// export default function useLocalStorage(key: string, defaultValue: any) {
//   const [value, setValue] = useState(() => {
//     const storedValue = window.localStorage.getItem(key)
//     if (storedValue) {
//       return JSON.parse(storedValue)
//     }
//     window.localStorage.setItem(key, JSON.stringify(defaultValue))
//     return defaultValue
//   })

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])

//   return [value, setValue]
// }

// import { useState, useEffect } from 'react';

// function useLocalStorage(key, initialValue) {
//     // Get from local storage then
//     // parse stored json or if none return initialValue
//     const readValue = () => {
//         if (typeof window === 'undefined') {
//             return initialValue;
//         }

//         try {
//             const item = window.localStorage.getItem(key);
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             console.warn(`Error reading localStorage key “${key}”:`, error);
//             return initialValue;
//         }
//     };

//     const [storedValue, setStoredValue] = useState(readValue);

//     // Return a wrapped version of useState's setter function that ...
//     // ... persists the new value to localStorage.
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             window.localStorage.setItem(key, JSON.stringify(storedValue));
//         }
//     }, [key, storedValue]);

//     return [storedValue, setStoredValue];
// }

// export default useLocalStorage;
