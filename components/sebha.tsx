import Azkar from './azkar'
import Button from './button'
import Counter from './counter'
export default function Sebha() {
  return (
    <div className="rounded-xl h-64 text-2xl bg-white dark:bg-zinc-700/50 py-6 sm:py-8 sm:px-20 text-center ">
      <Azkar />
      <Counter />
      <Button />
    </div>
  )
}
