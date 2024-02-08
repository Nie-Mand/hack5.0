/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#e6e8ff',
          100: '#d2d5ff',
          200: '#aeb0ff',
          300: '#7e7dff',
          400: '#5f4aff',
          500: '#4e21ff',
          600: '#4900ff',
          700: '#4500ff',
          800: '#3a00d8',
          900: '#21056e',
        },
        secondary: {
          50: '#fef1f8',
          100: '#fde6f3',
          200: '#fecce7',
          300: '#fea3d3',
          400: '#fd69b4',
          500: '#f73d96',
          600: '#e71d74',
          700: '#c90d58',
          800: '#a60e49',
          900: '#8a1140',
        },
        tertiary: {
          50: '#effaff',
          100: '#def4ff',
          200: '#b6ebff',
          300: '#75deff',
          400: '#2cceff',
          500: '#00afea',
          600: '#0094d4',
          700: '#0076ab',
          800: '#00638d',
          900: '#065274',
        },
        background: 'white', // #ccc
      },
    },
  },
  plugins: [],
}
