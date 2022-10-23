const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [`_site/**/*.html`],
  theme: {
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
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              border: '1px solid',
              'border-color': '#3f3f46',
            }
          }
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}