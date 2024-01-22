export interface SebhaContextValue {
  isListening: boolean
  counter: number
  selectedZikr: string
  transcript: string
  setSelectedZikr: React.Dispatch<React.SetStateAction<string>>
  handleStartListening: () => void
  handleEndListening: () => void
}

export interface SebhaProviderProps {
  children: React.ReactNode
}

export interface Zikr {
  name: string
  count: number
}
