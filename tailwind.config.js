/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "grid",
    "grid-cols-1",
    "grid-cols-2",
    "md:grid-cols-2",
    "gap-4",
    "gap-6",
    "gap-8",
    "p-4",
    "p-6",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
