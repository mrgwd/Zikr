import Image from "next/image";
import HeroSectionCTA from "./HeroSectionCTA";

export default function HeroSection() {
  return (
    <section className="space-y-6 pt-20">
      <div className="animate-fade flex items-center justify-center gap-2 opacity-0">
        <Image src="/logo.png" alt="Logo" width={25} height={25} />
        <p className="text-lg font-bold md:text-xl lg:text-2xl">Katheera</p>
      </div>
      <h1
        className="animate-fade text-center text-3xl font-bold opacity-0 sm:text-4xl md:text-5xl lg:text-7xl"
        style={{ animationDelay: "50ms" }}
      >
        Turn your <span className="text-muted-foreground/50">silence</span>{" "}
        <br /> into
        <span className="text-brand"> rewards</span>
      </h1>
      <p
        className="animate-fade mx-auto max-w-xs text-center text-neutral-400 opacity-0"
        style={{ animationDelay: "100ms" }}
      >
        <q className="">
          <i>O you who have believed, remember Allah with much remembrance</i>
        </q>
        <br />— Quran 33:41
      </p>
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className="animate-fade flex gap-2 opacity-0"
          style={{ animationDelay: "150ms" }}
        >
          <HeroSectionCTA />
        </div>
        <small
          className="animate-fade text-neutral-400 opacity-0"
          style={{ animationDelay: "200ms" }}
        >
          Free • Privacy-first • Open source
        </small>
      </div>
    </section>
  );
}
