import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#44242b",
          cream: "#f6f2f0",
          rose: "#cbb8b2",
          orange: "#F17F05",
          green: "#556c23",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "Georgia", "serif"],
        lora: ["Lora", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
