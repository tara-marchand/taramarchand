/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  important: false,
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  prefix: '',
  separator: ':',
  theme: {
    extend: {},
  },
};
