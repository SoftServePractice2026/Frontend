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
          dark: "#C8102E",
        },

        accent: {
          light: "#C400C6",
          dark: "#FFD700",
        },

        button: {
          light: "#1A1A1B",
          dark: "#F5F5F7",
        },

        description: {
          light: "",
          dark: "#8B8B9A",
        }
      }
    },
  },
  plugins: [],
}