const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  corePlugins: {},
  important: false,
  plugins: [],
  prefix: '',
  separator: ':',
  theme: {
    extend: {
      colors: {
        primary: colors.indigo
      },
      fontFamily: {
        display: ['EB Garamond', 'serif'],
        body: []
      }
    }
  }
};
