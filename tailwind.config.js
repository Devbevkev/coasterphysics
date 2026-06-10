/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#07131f",
          900: "#0b1d2e",
          800: "#10283e",
        },
        glow: {
          cyan: "#6ee7f9",
          blue: "#38bdf8",
          gold: "#fbbf24",
          coral: "#fb7185",
          mint: "#5eead4",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Avenir Next"', "sans-serif"],
        body: ['"Plus Jakarta Sans"', '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        neon: "0 20px 60px rgba(56, 189, 248, 0.22)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
