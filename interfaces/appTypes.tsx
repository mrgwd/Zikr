export interface SebhaContextValue {
  isListening: boolean;
  counter: number;
  selectedZikr: string;
  transcript: string;
  setSelectedZikr: React.Dispatch<React.SetStateAction<string>>;
  handleStartListening: () => void;
  handleEndListening: () => void;
}

export interface SebhaProviderProps {
  children: React.ReactNode;
}

export interface Zikr {
  name: string;
  count: number;
}
// type HexColor = `#${string & { length: 3 | 6 }}`
export interface IconProps {
  className?: string;
  color?: string;
}

export interface step {
  title: string;
  description: string;
  image?: string;
}

export interface StepperProps {
  steps: step[];
  currentStep: number;
  version: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleClose: () => void;
}
