/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'xxs': '390px',
        'xs': '420px',
      },
    },
  },
  plugins: [],
};
