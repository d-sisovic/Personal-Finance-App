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
      boxShadow: {
        custom: '0rem 0.25rem 1.5rem 0rem rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
