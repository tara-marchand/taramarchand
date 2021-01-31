module.exports = {
  important: false,
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  prefix: '',
  purge: {
    content: ['./server/views/**/*.hbs', './client/**/*.tsx'],
    mode: 'layers',
  },
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
