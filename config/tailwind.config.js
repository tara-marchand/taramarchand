const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  important: false,
  plugins: [],
  prefix: '',
  purge: [
    '../views/**/*.hbs',
    '../static/src/**/*.jsx',
    '../static/src/**/*.tsx',
  ],
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
