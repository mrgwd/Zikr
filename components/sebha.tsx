import Azkar from "./azkar";
import Button from "./button";
import Counter from "./counter";
export default function Sebha() {
  return (
    <div className="h-64 rounded-xl bg-light-primary py-6 text-center text-2xl dark:bg-dark-secondary sm:px-20 sm:py-8 ">
      <Azkar />
      <Counter />
      <Button />
    </div>
  );
}
