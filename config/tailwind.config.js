const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  important: false,
  plugins: [],
  prefix: '',
  purge: {
    content: ['./views/**/*.hbs', './static/**/*.tsx'],
    mode: 'layers',
  },
  separator: ':',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
        // => @media print { ... }
      },
    },
  },
};
