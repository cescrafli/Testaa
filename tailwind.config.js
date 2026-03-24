/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./en/*.html",
    "./*.js",
    "./en/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ad2c00",
        "surface": "#fbf9f8",
        "brand-accent": "#ea580c",
        "outline-variant": "#e7bdb2",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container-highest": "#e4e2e2",
        "primary-container": "#d83900",
        "on-primary": "#ffffff",
        "on-surface": "#1b1c1c",
        "secondary": "#5f5e5e"
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
