module.exports = {
  env: {
    es6: false,
    browser: false,
    node: true,
  },
  extends: ['eslint:recommended', 'standard', 'prettier', 'prettier/standard'],
  plugins: ['standard', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
