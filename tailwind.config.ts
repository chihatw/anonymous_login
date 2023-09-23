import type { Config } from "tailwindcss";
import { shadcnPreset } from "./lib/shadcn-preset";

const config: Config = {
  presets: [shadcnPreset],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      // sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        danger: "#f43f5e", // rose-500
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
