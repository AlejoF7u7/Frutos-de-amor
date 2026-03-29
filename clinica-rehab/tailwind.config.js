/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1A2A',   // Azul profundo del logo
          orange: '#F2A21F', // Naranja vibrante para botones
          red: '#C93C32',    // Rojo del corazón
          blue: '#006093',   // Azul de las manos
          light: '#F8FAFC',  // Fondo moderno (sustituye al beige)
        }
      }
    },
  },
  plugins: [],
}