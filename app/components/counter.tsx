import { useContext } from 'react'
import { SebhaContext } from '../contexts/SebhaProvider'

export default function Counter() {
  const { counter, isListening } = useContext(SebhaContext)
  return (
    <p
      className={`${
        !isListening ? 'h-0 overflow-hidden' : 'h-8'
      } transition-all mt-4`}
    >
      {counter}
    </p>
  )
}
