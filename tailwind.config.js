/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/src/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  plugins: [
    'tailwindcss/nesting',
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
