import React, { createContext, useContext } from 'react'
import { Zikr } from '@/interfaces/appTypes'
import { useLocalStorage } from '@/hooks/useLocalStorage' // assuming you have the useLocalStorage hook defined in this file

const AzkarContext = createContext<
  [Zikr[], (value: Zikr[]) => void] | undefined
>(undefined)

export function AzkarProvider({ children }: { children: React.ReactNode }) {
  const [azkar, setAzkar] = useLocalStorage('azkar', [
    { name: 'سبحان الله وبحمده', count: 0 },
    { name: 'الحمد لله', count: 0 },
    { name: 'لا إله إلا الله', count: 0 },
    { name: 'الله أكبر', count: 0 },
    { name: 'استغفر الله', count: 0 },
    { name: 'لا حول ولا قوة إلا بالله', count: 0 },
    { name: 'اللهم صلِّ وسلم على محمد', count: 0 },
  ])

  return (
    <AzkarContext.Provider value={[azkar, setAzkar]}>
      {children}
    </AzkarContext.Provider>
  )
}

export function useAzkar() {
  const context = useContext(AzkarContext)
  if (context === undefined) {
    throw new Error('useAzkar must be used within a AzkarProvider')
  }
  return context
}
