module.exports = {
  env: {
    es6: true,
    browser: true,
    node: false,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
    'prettier/standard',
    'prettier/babel',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: 'babel-eslint',
  plugins: [
    'standard',
    '@typescript-eslint',
    'babel',
    'prettier',
    'react',
    'react-hooks',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
