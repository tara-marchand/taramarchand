/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('prettier-plugin-tailwindcss'),
    'tailwindcss/nesting',
  ],
};
