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
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  separator: ':',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
    },
  },
};
