import { hijriDate } from '@/utils/hijriDate'
import Statistics from './statistics'

export default function Footer() {
  return (
    <div
      className="rounded-3xl rounded-t-xl bg-white dark:bg-zinc-700/50 py-8 px-8 sm:px-12 text-center gap-3 sm:gap-2 flex justify-between font-medium text-lg"
      dir="rtl"
    >
      <p>{hijriDate}</p>
      <span className="text-zinc-400">•</span>
      <Statistics />
    </div>
  )
}
