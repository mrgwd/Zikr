import { useContext } from 'react'
import { SebhaContext } from '@/contexts/SebhaProvider'
import { Mic, Rec } from './icons'

export default function Button() {
  const { isListening, handleStartListening, handleEndListening } =
    useContext(SebhaContext)
  return (
    <button
      type="button"
      className={`p-[3.25rem] rounded-full relative ${
        !isListening
          ? 'bg-zinc-100 dark:bg-zinc-600/50 hover:scale-105'
          : 'bg-green-50 dark:bg-green-700/40 scale-75 rotate-180'
      } transition-all duration-500 ease-in-out`}
      onClick={isListening ? handleEndListening : handleStartListening}
    >
      <Mic
        className={`w-10 h-10 absolute top1/2 left-1/2 transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 fill-zinc-400 ${
          isListening && 'opacity-0 rotate-180'
        }`}
      />
      <div
        className={`${
          !isListening && 'opacity-0 -rotate-180'
        } transition-all duration-500 ease-in-out`}
      >
        <Rec
          className={`w-10 h-10 absolute top1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[#5FBA48] dark:stroke-[#5FBA48]/60`}
        />
      </div>
    </button>
  )
}
