import { useEffect, useState } from 'react'
import { Moon, Sun } from './icons'

export default function DarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark))
    const htmlClassList = document.querySelector('html')?.classList
    if (isDark) {
      htmlClassList?.add('dark')
    } else {
      htmlClassList?.remove('dark')
    }
  }, [isDark])

  const handleDarkMode = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <button
      type="button"
      onClick={handleDarkMode}
      className="absolute top-6 right-14"
    >
      <Moon
        className={`fill-zinc-700 dark:fill-zinc-200 absolute transition-all duration-500 ease-in-out ${
          isDark && 'rotate-180 opacity-0'
        }`}
      />
      <Sun
        className={`fill-zinc-700 dark:fill-zinc-200 absolute transition-all duration-500 ease-in-out ${
          !isDark && '-rotate-180 opacity-0'
        }`}
      />
    </button>
  )
}
