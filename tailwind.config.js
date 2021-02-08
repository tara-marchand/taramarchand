module.exports = {
  important: false,
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  prefix: '',
  purge: ['./server/views/**/*.hbs', './client/src/**/*.tsx'],
  separator: ':',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      typography: {
        DEFAULT: {
          css: {
            'line-height': '1.5em',
            h2: {
              'margin-top': '1.25em',
            },
          },
        },
      },
    },
  },
};
