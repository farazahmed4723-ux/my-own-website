import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#060813",
        surface: "#0D1126",
        "surface-card": "rgba(16, 20, 42, 0.65)",
        "surface-card-hover": "rgba(25, 30, 60, 0.75)",
        "purple-glow": "#8B5CF6",
        "violet-glow": "#A855F7",
        "electric-purple": "#7C3AED",
        "gold-accent": "#D6A84B",
        "gold-light": "#F3D282",
        "neon-green": "#10B981",
        "text-primary": "#F8FAFC",
        "text-muted": "#94A3B8",
        "text-subtle": "#64748B",
        border: "rgba(255, 255, 255, 0.08)",
        "border-glow": "rgba(139, 92, 246, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        "purple-glow": "0 0 30px -5px rgba(139, 92, 246, 0.4)",
        "purple-lg": "0 0 50px -10px rgba(139, 92, 246, 0.5)",
        "violet-glow": "0 0 35px -5px rgba(168, 85, 247, 0.4)",
        "gold-glow": "0 0 25px -5px rgba(214, 168, 75, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at 65% 45%, rgba(139, 92, 246, 0.28) 0%, rgba(168, 85, 247, 0.12) 35%, rgba(6, 8, 19, 0) 70%)",
        "gradient-purple-gold": "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #D6A84B 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
