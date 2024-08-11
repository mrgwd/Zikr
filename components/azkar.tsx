"use client";
import { useContext } from "react";
import { SebhaContext } from "@/contexts/SebhaProvider";
import { useAzkar } from "@/contexts/AzkarProvider";

export default function Azkar() {
  const { isListening, selectedZikr, setSelectedZikr } =
    useContext(SebhaContext);
  const [azkar] = useAzkar();
  return (
    <div>
      <select
        className="dark:text-light dark:hover:bg-darker hover:bg-light/70 bg select-azkar text-darky text-ceenter h-10 w-60 cursor-pointer appearance-none rounded-full border-none bg-zinc-100 bg-[length:10px_12px] bg-[20px] bg-no-repeat px-4 text-xl transition-all dark:bg-zinc-700"
        disabled={isListening}
        name="Azkar"
        id="Azkar"
        value={selectedZikr}
        onChange={(e) => setSelectedZikr(e.target.value)}
      >
        {azkar?.map((zikr) => (
          <option
            key={zikr.name}
            value={zikr.name}
            className={`${
              zikr.count >= 1000
                ? "text-secondary"
                : zikr.count >= 100 && "text-primary"
            }`}
          >
            {`${zikr.name}`}
          </option>
        ))}
      </select>
    </div>
  );
}
