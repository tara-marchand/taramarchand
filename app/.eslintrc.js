module.exports = {
  env: {
    es6: true,
    browser: false,
    node: true
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
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    indent: ['warn', 2],
    'prettier/prettier': 'error',
    strict: 0
  }
};
