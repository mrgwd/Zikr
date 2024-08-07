import { useContext } from "react";
import { SebhaContext } from "@/contexts/SebhaProvider";
import { Mic, Rec } from "./icons";

export default function Button() {
  const { isListening, handleStartListening, handleEndListening } =
    useContext(SebhaContext);
  return (
    <button
      type="button"
      className={`relative rounded-full p-[3.25rem] ${
        !isListening
          ? "bg-zinc-100 hover:scale-105 dark:bg-zinc-600/50"
          : "rotate-180 scale-75 bg-primary-muted"
      } transition-all duration-500 ease-in-out`}
      onClick={isListening ? handleEndListening : handleStartListening}
    >
      <Mic
        className={`top1/2 absolute left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 fill-zinc-400 transition-all duration-500 ease-in-out ${
          isListening && "rotate-180 opacity-0"
        }`}
      />
      <div
        className={`${
          !isListening && "-rotate-180 opacity-0"
        } transition-all duration-500 ease-in-out`}
      >
        <Rec
          className={`top1/2 dark:stroke-primary/60 absolute left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 stroke-primary`}
        />
      </div>
    </button>
  );
}
