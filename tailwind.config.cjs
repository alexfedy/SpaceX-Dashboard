/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors");
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
  // plugins: [
  //   createThemes({
  //     dark: {
  //       primary: "aqua",
  //       secondary: "#334756",
  //       textc: "#DDDDDD",
  //       backg: "#121212",
  //     },
  //     light: {
  //       primary: "lightblue",
  //       secondary: "lightblue",
  //       textc: "#121212",
  //       backg: "#EEEEEE",
  //     },
  //   }),
  // ],
};
