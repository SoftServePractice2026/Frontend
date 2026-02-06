/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebasNeue: ['BebasNeue', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
      },

      colors: {
        primary: {
          light: "#040D12",
          dark: "#FFFFFF",
        },

        secondary: {
          light: "#C8102E",
          dark: "#C8102E",
        },

        accent: {
          light: "#FF6D1F",
          light_second: "#dfa3ff",
          dark: "#FFD700",
          dark_second: "#D4AF37",
          red: "#C8102E",
        },

        button: {
          light: "#1A1A1B",
          dark: "#F5F5F7",
        },

        description: {
          light: "#3A3A3A",
          dark: "#8B8B9A",
        }
      }
    },
  },
  plugins: [],
}