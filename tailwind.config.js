/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        metamorphous: ["Metamorphous", "cursive"], // Add the Metamorphous font family
      },
    },
  },
  plugins: [],
};
