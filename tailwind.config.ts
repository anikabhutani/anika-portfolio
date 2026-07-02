import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a1628",
        blue: "#1a3a6e",
        mid: "#2563a8",
        sky: "#4b8fd4",
        pale: "#dbeafe",
        accent: "#60a5fa",
        off: "#f0f4fb",
        muted: "#4a5568",
        light: "#94a3b8",
        border: "#c7d8ef",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(26,58,110,0.07)",
        cardHover: "0 8px 28px rgba(26,58,110,0.1)",
        modal: "0 24px 64px rgba(10,22,40,0.18)",
      },
      keyframes: {
        pulse2: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.85)" },
        },
        matrixFall: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        pulse2: "pulse2 2s infinite",
        matrixFall: "matrixFall 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
