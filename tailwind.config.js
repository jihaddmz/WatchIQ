/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D5372F",
        secondary: {
          100: "#FFD602",
          50: "rgba(255,214,2,0.5)",
          30: "rgba(255,214,2,0.3)",
        },
        background: "#000000",
        card: "#1C1C1E",
      },
      width: {
        15: "60"
      },
      height: {
        15: "60"
      }
    },
  },
  plugins: [],
}