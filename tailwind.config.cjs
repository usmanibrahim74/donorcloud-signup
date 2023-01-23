

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("./preset.js")],
  // important: "#synergy-donation-tailwind",
  important: true,
  // prefix: 'tw-',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        "primary-light": "#1b3051",
      },
    },
    fontFamily: {
      sans: ["Red Hat Display", "sans-serif"],
    },
  },
  plugins: [],
};
