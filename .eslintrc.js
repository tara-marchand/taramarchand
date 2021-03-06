module.exports = {
  env: {
    es6: true,
    node: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: { '@typescript-eslint/explicit-module-boundary-types': ['off'] },
    },
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
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
