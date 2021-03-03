module.exports = {
  env: {
    es6: true,
    browser: true,
    node: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['components/**/*', 'pages/**/*'],
      env: {
        es6: true,
        browser: true,
        node: true,
      },
    },
    {
      files: ['server/**/*'],
      env: {
        es6: true,
        browser: false,
        node: true,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
