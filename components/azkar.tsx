'use client'
import { useContext } from 'react'
import { SebhaContext } from '@/contexts/SebhaProvider'
import { useAzkar } from '@/contexts/AzkarProvider'

export default function Azkar() {
  const { isListening, selectedZikr, setSelectedZikr } =
    useContext(SebhaContext)
  const [azkar] = useAzkar()
  return (
    <div dir="rtl">
      <select
        className="bg-zinc-100 cursor-pointer dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 hover:bg-zinc-200/70 appearance-none bg-[20px] bg-[length:10px_12px] transition-all duration-300 bg-no-repeat bg select-azkar text-zinc-800 w-60 h-10 rounded-full border-none px-4 text-ceenter text-xl"
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
            className={`${
              zikr.count >= 1000
                ? 'text-yellow-600'
                : zikr.count >= 100 && 'text-green-700'
            }`}
          >
            {`${zikr.name}`}
          </option>
        ))}
      </select>
    </div>
  )
}
