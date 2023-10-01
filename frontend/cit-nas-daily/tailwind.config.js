/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    colors: {
      primary: "#8A353C",
      secondary: "#E9C434",
      gray: "#717171",
    },
    extend: {},
  },
  plugins: ["flowbite/plugin"],
};
