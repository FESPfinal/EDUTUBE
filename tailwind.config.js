/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        'bubble-gum': '#ff77e9',
        bermuda: '#78dcca',
        'light-main': '#09CF83',
        'dark-main': '#07955E',
        'light-error': '#D32F2F',
        'dark-error': '#FF4D5D',
        'light-disabled': '#D9D9D9',
        'dark-disabled': '#ECECEC',
        'light-icon-gray': '#707070',
        'dark-icon-gray': '#E1E1E1',
      },
    },
  },
  plugins: [],
};
