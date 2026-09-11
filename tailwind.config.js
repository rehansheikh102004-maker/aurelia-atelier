/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marine: {
          base: "#001D39",
          deep: "#001224",
          surface: "#0A4174",
        },
        slate: {
          mid: "#49769F",
          light: "#4E8EA2",
        },
        cerulean: "#6EA2B3",
        ice: {
          glow: "#7BBDE8",
          pearl: "#BDD8E9",
        },
        gold: {
          DEFAULT: "#E29B4A",
          accent: "#E29B4A",
          glow: "#F5A642",
          muted: "#8C683B",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Geist Mono'", "monospace"],
      },
      boxShadow: {
        luxury: "0 20px 50px -10px rgba(23, 22, 20, 0.08)",
        "luxury-hover": "0 30px 60px -12px rgba(163, 123, 72, 0.15)",
        glass: "0 8px 32px 0 rgba(180, 168, 150, 0.2)",
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
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
};
