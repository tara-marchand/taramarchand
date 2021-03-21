module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  overrides: [
    {
      files: [
        'components/**/*',
        'data/**/*',
        'pages/**/*',
        'types/**/*',
        'utils/**/*',
      ],
      env: {
        browser: true,
      },
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
        react: {
          version: 'detect',
        },
      },
    },
  ],
  parser: '@babel/eslint-parser',
  plugins: ['import'],
  root: true,
  rules: {
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
  },
};
