import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#050608",
          900: "#0a0b0f",
          800: "#101218",
          700: "#1a1d26",
          600: "#272b38",
        },
        accent: {
          DEFAULT: "#2f8fff",
          soft: "#5ea6ff",
          dim: "#1c3a63",
        },
        ember: "#ff9f5b",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(91,140,255,0.16), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
