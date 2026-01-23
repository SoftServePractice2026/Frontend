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
          light: "#00ADB5",
          dark: "#E50914",
        },

        accent: {
          light: "#C400C6",
          dark: "#D4AF37",
        },

        button: {
          light: "#1A1A1B",
          dark: "#F5F5F7",
        }
      }
    },
  },
  plugins: [],
}