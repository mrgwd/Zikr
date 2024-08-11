import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "primary-muted": "var(--color-primary-muted)",
        "secondary-muted": "var(--color-secondary-muted)",
        light: {
          primary: "var(--color-light-primary)",
          secondary: "var(--color-light-secondary)",
          muted: "var(--color-light-muted)",
        },
        dark: {
          primary: "var(--color-dark-primary)",
          secondary: "var(--color-dark-secondary)",
          muted: "var(--color-dark-muted)",
        },
      },
    },
  },
};
export default config;
