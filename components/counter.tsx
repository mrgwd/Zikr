import { useContext } from 'react'
import { SebhaContext } from '@/contexts/SebhaProvider'

export default function Counter() {
  const { counter, isListening } = useContext(SebhaContext)
  return (
    <p
      className={`${
        !isListening ? 'h-0' : 'h-8'
      } transition-all mt-4 overflow-hidden`}
    >
      {counter}
    </p>
  )
}
