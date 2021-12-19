module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: false,
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
  prefix: '',
  content: ['./src/**/*.tsx'],
  separator: ':',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
    },
  },
};
