import { type Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#132da0",
        secondary: "#e3f2ff",
        accent: "#2d68ff",
      },
    },
  },
  plugins: [],
}) satisfies Config;
