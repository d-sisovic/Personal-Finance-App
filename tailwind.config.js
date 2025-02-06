/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '23.4375em',
        tablet: '48em',
        desktop: '90em',
      },
    },
  },
  plugins: [],
};
