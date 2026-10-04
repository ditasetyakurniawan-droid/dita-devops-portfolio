import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#090B10",
          surface: "#11151D",
          raised: "#19202B",
          inset: "#0D1118",
        },
        slate: {
          50: "#F5F7FA",
          100: "#E9EDF2",
          200: "#C9D2DC",
          300: "#A8B2C0",
          400: "#8391A5",
          500: "#647184",
          600: "#485465",
          700: "#343E4D",
          800: "#252D39",
          900: "#151B25",
          950: "#0D1118",
        },
        accent: {
          blue: "#7AA8FF",
          cyan: "#71D7D0",
          platinum: "#C9D2DC",
          purple: "#A855F7",
          indigo: "#6366F1",
        },
        border: {
          subtle: "rgba(201, 210, 220, 0.11)",
          highlight: "rgba(201, 210, 220, 0.22)",
          glass: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "ambient-blue": "radial-gradient(ellipse 52% 46% at 51% 42%, rgba(74, 111, 193, 0.18), transparent 75%)",
        "ambient-cyan": "radial-gradient(ellipse 42% 50% at 72% 58%, rgba(50, 142, 153, 0.11), transparent 80%)",
        "ambient-purple": "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139, 92, 246, 0.16), transparent 75%)",
        "border-glow": "linear-gradient(110deg, rgba(122,168,255,0.55), rgba(201,210,220,0.16) 42%, rgba(113,215,208,0.46))",
        "border-neon": "linear-gradient(135deg, rgba(168,85,247,0.6), rgba(99,102,241,0.3) 50%, rgba(6,182,212,0.6))",
        "card-sheen": "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 38%)",
        "gradient-cosmic": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent)",
      },
      boxShadow: {
        panel: "0 22px 70px -28px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.05)",
        halo: "0 0 35px -14px rgba(122,168,255,0.32)",
        "glow-purple": "0 0 35px -5px rgba(168, 85, 247, 0.45)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.45)",
        "glow-primary": "0 0 40px -10px rgba(99, 102, 241, 0.55)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        display: "-0.055em",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "spin-very-slow": "spin 25s linear infinite",
        "pulse-subtle": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
