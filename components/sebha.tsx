import Azkar from './azkar'
import Button from './button'
import Counter from './counter'
export default function Sebha() {
  //const { isListening } = useContext(SebhaContext)

  return (
    <div className="rounded-3xl h-64 text-2xl bg-white py-8 px-20 text-center ">
      <Azkar />
      <Counter />
      <Button />
    </div>
  )
}
