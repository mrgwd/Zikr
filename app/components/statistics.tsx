import { useContext, useEffect, useState } from 'react'
import { SebhaContext } from '../contexts/SebhaProvider'
import { azkar } from '../contexts/AzkarProvider'

export default function Statistics() {
  const { selectedZikr } = useContext(SebhaContext)
  const todayCount = azkar.map(
    (zikr) => zikr.name === selectedZikr && zikr.count,
  )
  return (
    <p>
      <span className="text-green-700">{todayCount} </span>
      ذكر لهذا اليوم
    </p>
  )
}
