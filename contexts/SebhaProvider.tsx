"use client";
import { createContext, useEffect, useState } from "react";
import { SebhaContextValue, SebhaProviderProps } from "@/interfaces/appTypes";
import { useAzkar } from "./AzkarProvider";

let SpeechRecognition: /*SpeechRecognition | null*/ any = null;
let transcript: string;

const SebhaContext = createContext<SebhaContextValue>({
  counter: 0,
  selectedZikr: "",
  isListening: false,
  transcript: "",
  setSelectedZikr: () => {},
  handleStartListening: () => {},
  handleEndListening: () => {},
});

const SebhaProvider = ({ children }: SebhaProviderProps) => {
  const [azkar, setAzkar] = useAzkar();
  const [counter, setCounter] = useState(0);
  const [selectedZikr, setSelectedZikr] = useState("سبحان الله وبحمده");
  const [isListening, setIsListening] = useState(false);

  const handleResetCounter = () => {
    setCounter(0);
  };
  const handleStartListening = () => {
    console.log("Start Listening for", selectedZikr);
    SpeechRecognition.start();
    setIsListening(true);
  };
  const handleEndListening = () => {
    console.log("Listening has endded", selectedZikr);
    handleResetCounter();
    SpeechRecognition.stop();
    setIsListening(false);
    setAzkar(
      azkar.map((zikr) =>
        zikr.name === selectedZikr
          ? { ...zikr, count: zikr.count + counter }
          : zikr,
      ),
    );
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      SpeechRecognition = new webkitSpeechRecognition();
      SpeechRecognition.lang = "ar";
    }
  }, []);
  useEffect(() => {
    if (!SpeechRecognition) return;
    SpeechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      transcript = event.results[0][0].transcript;
      DetectZikr_Model1();
    };
  }, [selectedZikr]);

  const DetectZikr_Model1 = () => {
    let newCounter: number = 0;
    switch (selectedZikr) {
      case "سبحان الله وبحمده":
        newCounter = transcript.split("سبحان").length - 1;
        break;

      case "استغفر الله":
        newCounter = transcript.split("ستغفر").length - 1;
        break;

      case "لا إله إلا الله":
        newCounter = transcript.split("الله").length - 1;
        break;

      case "لا حول ولا قوة إلا بالله":
      case "لا حول ولا قوه الا بالله":
        newCounter = transcript.split("ولا قو").length - 1;
        break;

      case "اللهم صلِّ وسلم على محمد":
        newCounter = transcript.split("وسلم ع").length - 1;
        break;

      case "الله أكبر":
      case "الله اكبر":
        newCounter = transcript.split("كبر").length - 1;
        break;

      default:
        newCounter = transcript.split(selectedZikr).length - 1;
    }

    setCounter((counter) => counter + newCounter);
    console.log(newCounter, selectedZikr, transcript, azkar);
  };

  if (SpeechRecognition)
    SpeechRecognition.onend = () => {
      if (isListening) SpeechRecognition.start();
    };
  return (
    <SebhaContext.Provider
      value={{
        counter,
        selectedZikr,
        isListening,
        transcript,
        setSelectedZikr,
        handleStartListening,
        handleEndListening,
      }}
    >
      {children}
    </SebhaContext.Provider>
  );
};
export { SebhaContext, SebhaProvider };
