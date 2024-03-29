const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

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
      primary_dark: '#a7f3d0',
    },
    extend: {
      fontFamily: {
        'sans': ['Inter var', ...defaultTheme.fontFamily.sans],
        'serif': ['Martel', ...defaultTheme.fontFamily.serif],
        'display': ['Roboto Condensed', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          'max-width': '72.5ch',
          css: {
            pre: {
              border: '1px solid',
              'border-color': '#3f3f46',
            },
            blockquote: {
              'font-weight': '400',
              'padding-top': theme('spacing.px'),
              'padding-bottom': theme('spacing.px'),
            },
          }
        },
      }),
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}