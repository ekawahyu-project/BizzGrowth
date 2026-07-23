/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Inter", "ui-monospace", "monospace"],
      },
      colors: {
        slate: {
          150: "#e9eff4",
          850: "#172033",
        },
        // Primary = SimulaBiz brand purple (from the new Material 3 design system)
        primary: {
          DEFAULT: "#673dcd",
          50: "#f5f2fe",
          100: "#e8ddff",
          200: "#d9cbfb",
          300: "#c0a8f7",
          400: "#a37ef0",
          500: "#8a5ce8",
          600: "#673dcd",
          700: "#5120b7",
          800: "#3f1a8f",
          900: "#2f1569",
        },
        secondary: {
          DEFAULT: "#2f55c8",
          50: "#eef2ff",
          100: "#dce1ff",
          500: "#4a6fe0",
          600: "#2f55c8",
          700: "#25439e",
        },
        tertiary: {
          DEFAULT: "#006a3b",
          50: "#f6fff4",
          100: "#c8f7dd",
          500: "#00864c",
          600: "#006a3b",
          700: "#00522d",
        },
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(103,61,205,0.10), 0 1px 3px rgba(103,61,205,0.03)",
        "premium-hover": "0 20px 40px -15px rgba(103,61,205,0.20), 0 1px 5px rgba(103,61,205,0.04)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s cubic-bezier(0.4,0,0.2,1) both",
        "scale-in": "scale-in 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
      },
    },
  },
  plugins: [],
};
