import { useContext } from "react";
import { SebhaContext } from "@/contexts/SebhaProvider";
import { useAzkar } from "@/contexts/AzkarProvider";

export default function Statistics() {
  const [azkar] = useAzkar();
  const { selectedZikr } = useContext(SebhaContext);
  const todayCount = azkar?.find((zikr) => zikr.name === selectedZikr)?.count;
  return (
    <p>
      <span
        className={`${
          todayCount
            ? todayCount >= 1000
              ? "text-secondary"
              : todayCount >= 100 && "text-primary"
            : ""
        }`}
      >
        {todayCount}{" "}
      </span>
      ذكرًا هذا اليوم
    </p>
  );
}
