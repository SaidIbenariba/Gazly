/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/lib/esm/**/*.js",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "400px",
      // => @media (min-width: 640px) { ... }

      md: "700px",
      // md: "1024px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "login-bg": "url('/src/assets/')",
      },
      colors: {
        background: "rgba(var(--background))",
        sidebar: "rgba(var(--sidebar))",
        border: "rgba(var(--border))",
        text: "rgba(var(--text))",
        active: "rgba(var(--active))",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [flowbite.plugin()],
});
