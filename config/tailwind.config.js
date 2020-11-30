const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  important: false,
  plugins: [],
  prefix: '',
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
