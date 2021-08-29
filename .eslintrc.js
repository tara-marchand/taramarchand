module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['next.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.server.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.d.ts', '.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['*.js', '**/*.js'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2015,
      },
    },
  ],
};
