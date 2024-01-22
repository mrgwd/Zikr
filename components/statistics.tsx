import { useContext } from 'react'
import { SebhaContext } from '@/contexts/SebhaProvider'
import { useAzkar } from '@/contexts/AzkarProvider'

export default function Statistics() {
  const [azkar] = useAzkar()
  const { selectedZikr } = useContext(SebhaContext)
  const todayCount = azkar.find((zikr) => zikr.name === selectedZikr)?.count
  return (
    <p>
      <span className="text-green-700">{todayCount} </span>
      ذكر لهذا اليوم
    </p>
  )
}
