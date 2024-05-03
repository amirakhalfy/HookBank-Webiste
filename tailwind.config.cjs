/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {

      colors: {
        dimWhite: "rgba(255, 255, 255, 0.7)",
        blackGold: {
          DEFAULT: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1)), rgba(255, 215, 0, 0.9)' // black gradient to gold
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
