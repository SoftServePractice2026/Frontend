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
          light: "",
          dark: "#FFFFFF",
        },

        secondary: {
          light: "",
          dark: "#E50914",
        },

        accent: {
          light: "",
          dark: "#D4AF37",
        },

        button: {
          light: "",
          dark: "#F5F5F7",
        }
      }
    },
  },
  plugins: [],
}