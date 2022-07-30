module.exports = {
  files: [
    './components/*.ts',
    './components/*.tsx',
    './data/*.ts',
    './data/*.tsx',
    './pages/*.ts',
    './pages/*.tsx',
    './types/*.ts',
    './types/*.tsx',
  ],
  env: {
    browser: true,
  },
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['../tsconfig.json'],
  },
  plugins: ['@typescript-eslint', '@next/next'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
};
