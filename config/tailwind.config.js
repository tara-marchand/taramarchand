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
      }
    }
  }
};
