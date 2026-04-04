/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode (toggled via <html class="dark">)
  darkMode: "class",

  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./_posts/**/*.{md,html}",
    "./_docs/**/*.{md,html}",
    "./assets/js/**/*.js",
    "./*.{html,md}",
    "./**/*.{html,md}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "Menlo", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.gray.700"),
            a: { color: theme("colors.brand.600") },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.300"),
            a: { color: theme("colors.brand.400") },
          },
        },
      }),
    },
  },

  plugins: {
    stylelint: {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
