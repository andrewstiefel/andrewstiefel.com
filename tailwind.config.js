const colors = require('tailwindcss/colors')

module.exports = {
  content: [`_site/**/*.html`],
  theme: {
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.zinc,
      green: colors.emerald,
      blue: colors.sky,
      yellow: colors.yellow,
      red: colors.rose,
      primary: '#065F46',
      primary_dark: '#059669',
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}