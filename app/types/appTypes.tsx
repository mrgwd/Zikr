export interface SebhaContextValue {
  //hasBrowserSupport: boolean
  isListening: boolean
  counter: number
  selectedZikr: string
  transcript: string
  setSelectedZikr: React.Dispatch<React.SetStateAction<string>>
  handleStartLisnting: () => void
  handleEndLisnting: () => void
}

export interface SebhaProviderProps {
  children: React.ReactNode
}

export interface Zikr {
  name: string
  count: number
}
