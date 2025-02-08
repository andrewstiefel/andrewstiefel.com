const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./_includes/**/*.{html,liquid}",
    "./_layouts/**/*.{html,liquid}",
    "./_pages/*.{html,liquid}",
    "./_posts/**/*.md",
    "./*.md",
    "./*.html",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
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
        'serif': ['Source Serif', ...defaultTheme.fontFamily.serif],
        'display': ['Roboto Condensed', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: {
          150: '#eceef1',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          'max-width': '72.5ch',
          css: {
            pre: {
              border: '1px solid',
              'background-color': '#030712',
              'border-color': '#374151',
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