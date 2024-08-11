import { hijriDate } from "@/utils/hijriDate";
import Statistics from "./statistics";

export default function Footer() {
  return (
    <div className="relative flex justify-between gap-3 rounded-3xl rounded-t-xl bg-light-primary px-8 py-8 text-center text-lg font-medium dark:bg-dark-secondary sm:gap-2 sm:px-12">
      <p>{hijriDate}</p>
      <span className="text-light-muted dark:text-dark-muted">•</span>
      <Statistics />
    </div>
  );
}
