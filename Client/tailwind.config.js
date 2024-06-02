/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'College': "url('src/assets/College.jpg')",
        'Thumbnail_8': "url('src/assets/Thumbnail_8.png')",
      }
    },
  },
  plugins: [],
}