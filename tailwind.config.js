const { NONAME } = require('dns');

module.exports = {
  important: false,
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  prefix: '',
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  separator: ':',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      typography: {
        DEFAULT: {
          css: {
            'a:hover': {
              'text-decoration': 'underline',
            },
            h1: {
              'margin-bottom': 0,
              a: {
                'text-decoration': 'none',
              },
              'a:hover': {
                'text-decoration': 'none',
              },
            },
          },
        },
      },
    },
  },
};
