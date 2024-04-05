import { useContext } from 'react'
import { SebhaContext } from '@/contexts/SebhaProvider'
import { useAzkar } from '@/contexts/AzkarProvider'

export default function Statistics() {
  const [azkar] = useAzkar()
  const { selectedZikr } = useContext(SebhaContext)
  const todayCount = azkar.find((zikr) => zikr.name === selectedZikr)?.count
  return (
    <p>
      <span
        className={`${
          todayCount
            ? todayCount >= 1000
              ? 'text-yellow-600'
              : todayCount >= 100 && 'text-green-700'
            : ''
        }`}
      >
        {todayCount}{' '}
      </span>
      ذكرًا هذا اليوم
    </p>
  )
}
