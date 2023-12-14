import { useContext } from 'react'
import { SebhaContext } from '../contexts/SebhaProvider'

export default function Button() {
  const { isListening, handleStartLisnting, handleEndLisnting } =
    useContext(SebhaContext)
  return (
    <button
      //disabled={isListening}
      type="button"
      className={`p-8 rounded-full ${
        !isListening
          ? 'bg-green-100 hover:scale-105 m-4'
          : 'bg-fuchsia-100 scale-75'
      }  transition-all`}
      onClick={isListening ? handleEndLisnting : handleStartLisnting}
    >
      {!isListening ? (
        <svg
          className="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 15.5c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4S8 3.79 8 6v5.5c0 2.21 1.79 4 4 4Z"
            stroke="#15803d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4.35 9.65v1.7C4.35 15.57 7.78 19 12 19c4.22 0 7.65-3.43 7.65-7.65v-1.7M10.61 6.43c.9-.33 1.88-.33 2.78 0M11.2 8.55c.53-.14 1.08-.14 1.61 0M12 19v3"
            stroke="#15803d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 8.25v7.5M7.5 5.75v12.5M12 3.25v17.5M16.5 5.75v12.5M21 8.25v7.5"
            stroke="#d946ef"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </button>
  )
}
