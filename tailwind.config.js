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
};
