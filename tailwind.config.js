import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '654px'
    },
    fontFamily: {
      'sans': ['Ubuntu', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      'white': 'hsl(0, 0%, 100%)',
      'neutral': {
        400: 'hsl(231, 100%, 99%)',
        300: 'hsl(217, 100%, 97%)',
        200: 'hsl(229, 24%,  87%)',
        100: 'hsl(231, 11%,  63%)',
      },
    },
    extend: {
      colors: {
        'accent': {
          200: 'hsl(213, 96%,  18%)',
          400: 'hsl(243, 100%, 62%)',
          700: 'hsl(228, 100%, 84%)',
          750: 'hsl(206, 94%,  87%)',
        },
        'error': 'hsl(354, 84%,  57%)',
      },
    },
  },
  plugins: [],
}

