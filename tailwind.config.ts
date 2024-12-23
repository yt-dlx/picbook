import daisyui from "daisyui";
import type { Config } from "tailwindcss";
import twdisplay from "tailwindcss-displaymodes";
import aspectRatio from "@tailwindcss/aspect-ratio";
export default {
  darkMode: "class",
  plugins: [daisyui, aspectRatio, twdisplay],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { aspectRatio: { "h-9": "9", "w-16": "16" }, fontFamily: { Kurale: ["var(--font-Kurale)"], Brittany: ["var(--font-Brittany)"] } } }
} satisfies Config;
