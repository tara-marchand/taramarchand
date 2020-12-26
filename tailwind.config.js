const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  important: false,
  plugins: [require('@tailwindcss/typography')],
  prefix: '',
  purge: {
    content: ['./app/views/**/*.hbs', './static/**/*.tsx'],
    mode: 'layers',
  },
  separator: ':',
  theme: {
    extend: { screens: { print: { raw: 'print' } } },
  },
};
