const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [`_site/**/*.html`],
  theme: {
    fontFamily: {
      'display': ['Roboto Condensed'],
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
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'serif': ['Martel', ...defaultTheme.fontFamily.serif],
      },
      typography: (theme) => ({
        DEFAULT: {
          'max-width': '72.5ch',
          css: {
            'h1, h2, h3, h4, h5, h6': {
              'font-family': theme('fontFamily.display'),
            },
            pre: {
              border: '1px solid',
              'border-color': '#3f3f46',
            },
          }
        }
      }),
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}