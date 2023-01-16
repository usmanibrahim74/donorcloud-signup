/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: "#synergy-donation-tailwind",
  important: true,
  // prefix: 'tw-',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#071C3D",
          50: "#eff9ff",
          100: "#e2f3ff",
          200: "#b8e6ff",
          300: "#79d2ff",
          400: "#32bcfe",
          500: "#338fff",
          600: "#1067ff",
          700: "#075dfb",
          800: "#094fca",
          900: "#071c3d",
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
