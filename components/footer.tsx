import { hijriDate } from '@/utils/hijriDate'
import Statistics from './statistics'

export default function Footer() {
  return (
    <div
      className="rounded-3xl bg-white py-8 px-12 text-center flex justify-between font-medium text-lg"
      dir="rtl"
    >
      <p>{hijriDate}</p>
      <Statistics />
    </div>
  )
}
