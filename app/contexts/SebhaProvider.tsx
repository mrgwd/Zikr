'use client'
import { createContext, useEffect, useState } from 'react'
import { SebhaContextValue, SebhaProviderProps } from '../types/appTypes'
import { azkar } from './AzkarProvider'

let SpeechRecognition: any = null
let hasBrowserSupport: boolean
if ('webkitSpeechRecognition' in window) {
  SpeechRecognition = new webkitSpeechRecognition()
  SpeechRecognition.lang = 'ar'
}
let transcript: string

const SebhaContext = createContext<SebhaContextValue>({
  counter: 0,
  todayCounter: 0,
  hasBrowserSupport: !!SpeechRecognition,
  selectedZikr: '',
  isListening: false,
  transcript: '',
  setSelectedZikr: () => {},
  handleStartLisnting: () => {},
  handleEndLisnting: () => {},
})

const SebhaProvider = ({ children }: SebhaProviderProps) => {
  const [counter, setCounter] = useState(0)
  const [todayCounter, setTodayCounter] = useState(0)
  const [selectedZikr, setSelectedZikr] = useState('سبحان الله')
  const [isListening, setIsListening] = useState(false)
  const handleResetCounter = () => {
    setCounter(0)
  }
  const handleStartLisnting = () => {
    console.log('Start Lisnting for', selectedZikr)
    SpeechRecognition.start()
    setIsListening(true)
  }
  const handleEndLisnting = () => {
    console.log('Lisnting has endded', selectedZikr)
    azkar.map((zikr) => zikr.name === selectedZikr && (zikr.count += counter))
    handleResetCounter()
    SpeechRecognition.stop()
    setIsListening(false)
  }
  useEffect(() => {
    if (!SpeechRecognition) return
    SpeechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      transcript = event.results[0][0].transcript
      DetectZikr_Model1()
    }
  }, [selectedZikr])
  const DetectZikr_Model1 = () => {
    // if (transcript.includes(selectedZikr))
    //   console.log('Zikr made! =>', selectedZikr)

    // const newCounter = transcript.split(selectedZikr).length - 1
    // setCounter((counter) => counter + newCounter)

    // const newCounter = transcript.split('الله').length - 1
    // setCounter((counter) => counter + newCounter)

    let newCounter: number = 0
    if (selectedZikr === 'لا إله إلا الله')
      newCounter = transcript.split('الله').length - 1
    else if (selectedZikr === 'اللهم صلي وسلم على محمد')
      newCounter = transcript.split('على محمد').length - 1
    else if (selectedZikr === 'لا حول ولا قوة إلا بالله')
      newCounter = transcript.split('قوة').length - 1
    else newCounter = transcript.split(selectedZikr).length - 1

    setCounter((counter) => counter + newCounter)
    console.log(newCounter, selectedZikr, transcript)
  }
  if (SpeechRecognition)
    SpeechRecognition.onend = () => {
      if (isListening) SpeechRecognition.start()
    }
  return (
    <SebhaContext.Provider
      value={{
        counter,
        todayCounter,
        hasBrowserSupport,
        selectedZikr,
        isListening,
        transcript,
        setSelectedZikr,
        handleStartLisnting,
        handleEndLisnting,
      }}
    >
      {children}
    </SebhaContext.Provider>
  )
}
export { SebhaContext, SebhaProvider }
