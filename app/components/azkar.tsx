'use client'

import { useContext } from 'react'
import { SebhaContext } from '../contexts/SebhaProvider'
import { azkar } from '../contexts/AzkarProvider'

export default function Azkar() {
  const { isListening, selectedZikr, setSelectedZikr } =
    useContext(SebhaContext)
  return (
    <div dir="rtl">
      <select
        disabled={isListening}
        name="Azkar"
        id="Azkar"
        value={selectedZikr}
        onChange={(e) => setSelectedZikr(e.target.value)}
      >
        {azkar.map((zikr) => (
          <option
            key={zikr.name}
            value={zikr.name}
            className={`${zikr.count >= 100 && 'text-green-700'}`}
          >
            {`${zikr.name}`}
          </option>
        ))}
      </select>
    </div>
  )
}
