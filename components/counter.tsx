import { useContext } from 'react'
import { SebhaContext } from '@/contexts/SebhaProvider'

export default function Counter() {
  const { counter, isListening } = useContext(SebhaContext)
  return (
    <p
      className={`${
        !isListening ? 'opacity-0' : 'opacity-100 mt-4'
      } transition-all duration-500 mt-2 cursor-default font-bold`}
    >
      {counter}
    </p>
  )
}
