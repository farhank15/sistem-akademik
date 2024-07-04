/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#64748b",
          DEFAULT: "#1e293b",
          dark: "#0f172a",
        },
        secondary: {
          light: "#cbd5e1",
          DEFAULT: "#94a3b8",
          dark: "#64748b",
        },
        accent: {
          light: "#f87171",
          DEFAULT: "#ef4444",
          dark: "#b91c1c",
        },
        neutral: {
          light: "#e5e7eb",
          DEFAULT: "#374151",
          dark: "#1f2937",
        },
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["sunset"],
  },
};
