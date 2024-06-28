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
          light: "#a8dadc",
          DEFAULT: "#457b9d",
          dark: "#1d3557",
        },
        secondary: {
          light: "#f1faee",
          DEFAULT: "#a8dadc",
          dark: "#457b9d",
        },
        accent: {
          light: "#ffafcc",
          DEFAULT: "#ff6b6b",
          dark: "#c44536",
        },
        neutral: {
          light: "#f5f5f5",
          DEFAULT: "#d3d3d3",
          dark: "#7d7d7d",
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
    themes: ["winter"], // Enable the 'winter' theme
  },
};
