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
        background: {
          DEFAULT: "#080808",
          secondary: "#0f0f0f",
          tertiary: "#141414",
          card: "#111111",
          elevated: "#1a1a1a",
        },
        border: {
          DEFAULT: "#1f1f1f",
          subtle: "#161616",
          glow: "#2a2a2a",
        },
        accent: {
          cyan: "#00d4ff",
          purple: "#a855f7",
          green: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
          blue: "#3b82f6",
        },
        text: {
          primary: "#f0f0f0",
          secondary: "#8a8a8a",
          muted: "#555555",
        },
      },
      fontFamily: {
        sans: ["'Geist'", "'Geist Fallback'", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "monospace"],
        display: ["'Syne'", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-cyan": "radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 60%)",
        "mesh-purple": "radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
        "mesh-green": "radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 60%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { opacity: "0.4", boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)" },
          "100%": { opacity: "1", boxShadow: "0 0 40px rgba(0, 212, 255, 0.25)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(0, 212, 255, 0.15), 0 0 60px rgba(0, 212, 255, 0.05)",
        "glow-purple": "0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(168, 85, 247, 0.05)",
        "glow-green": "0 0 30px rgba(16, 185, 129, 0.15), 0 0 60px rgba(16, 185, 129, 0.05)",
        "card": "0 1px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      gridTemplateColumns: {
        "bento": "repeat(12, 1fr)",
      },
    },
  },
  plugins: [],
};

export default config;