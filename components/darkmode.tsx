import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
export default function DarkMode() {
  const [isDark, setIsDark] = useLocalStorage("darkMode", false);
  useEffect(() => {
    const htmlClassList = document.querySelector("html")?.classList;
    if (isDark) {
      htmlClassList?.add("dark");
    } else {
      htmlClassList?.remove("dark");
    }
  }, [isDark]);

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      type="button"
      onClick={handleDarkMode}
      className="absolute right-14 top-6"
    >
      <Moon
        className={`absolute fill-dark-secondary transition-all duration-500 ease-in-out dark:fill-light-secondary ${
          isDark && "rotate-180 opacity-0"
        }`}
      />
      <Sun
        className={`absolute fill-dark-secondary transition-all duration-500 ease-in-out dark:fill-light-secondary ${
          !isDark && "-rotate-180 opacity-0"
        }`}
      />
    </button>
  );
}
