module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parser: 'babel-eslint',
  plugins: ['prettier', 'react'],
  // parserOptions: {
  //   ecmaVersion: 8,
  //   ecmaFeatures: {
  //     impliedStrict: true,
  //     jsx: true
  //   },
  //   sourceType: 'module'
  // },
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
  rules: {
    indent: ['warn', 2],
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    strict: 0
  }
};
