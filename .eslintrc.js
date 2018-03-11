module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  // parserOptions: {
  //   ecmaVersion: 8,
  //   ecmaFeatures: {
  //     impliedStrict: true,
  //     jsx: true
  //   },
  //   sourceType: 'module'
  // },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    indent: ['warn', 2],
    strict: 0
  }
}
