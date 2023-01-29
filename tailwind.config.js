/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    aspectRatio: false,
    preflight: false,
  },
  important: false,
  plugins: [require('@tailwindcss/aspect-ratio')],
  prefix: '',
  separator: ':',
  theme: {
    extend: {},
  },
};
