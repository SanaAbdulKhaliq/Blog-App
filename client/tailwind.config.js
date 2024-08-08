/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/src/Assests/HomeBG.jpg')",
        'post-image': "url('/src/Assests/mypostBG.jpeg')",
        'politics-image': "url('/src/Assests/politicBG.jpeg')",
        'fashion-image': "url('/src/Assests/fashionBG.jpeg')",
        'travel-image': "url('/src/Assests/travelBG.jpeg')",
        'food-image': "url('/src/Assests/foodBG.jpeg')",
      }
    },
  },
  plugins: [],
}

