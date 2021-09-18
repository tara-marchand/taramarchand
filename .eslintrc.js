module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
  ],
  ignorePatterns: ['next.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.server.json'],
  },
  plugins: ['@typescript-eslint', '@next/next'],
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
