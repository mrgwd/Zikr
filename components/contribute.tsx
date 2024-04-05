import { Bug, GitHub } from './icons'

export default function Contribute() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium">
      <a
        href="https://github.com/mrgwd/Zikr"
        target="_blank"
        className="text-zinc-400 items-center justify-center hover:text-zinc-800 dark:hover:text-zinc-200 dark:text-zinc-500 flex gap-2 transition-all group"
        dir="rtl"
      >
        <p>ساهم في تطوير المشروع </p>
        <GitHub className="fill-zinc-400 group-hover:fill-zinc-800 dark:group-hover:fill-zinc-200 dark:fill-zinc-500 transition-all" />
      </a>
      <a
        href="mailto:mogdwd@gmail.com"
        target="_blank"
        className="flex gap-2 mt-2 text-zinc-400 items-center justify-center dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all group"
      >
        <Bug className="fill-zinc-400 group-hover:fill-zinc-800 dark:group-hover:fill-zinc-200 dark:fill-zinc-500 transition-all" />
        <p>بلغ عن مشلكة أو أطلب ميزة </p>
      </a>
    </div>
  )
}
