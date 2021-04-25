export default {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ['import'],
  root: true,
  rules: {
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
  },
};
