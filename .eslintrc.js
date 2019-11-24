module.exports = {
  env: {
    es6: true,
    browser: true,
    node: false
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json'
      },
      plugins: ['@typescript-eslint', 'react']
    },
    {
      env: {
        es6: true,
        browser: false,
        node: true
      },
      files: ['./app/**/*.*']
    }
  ],
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    indent: ['warn', 2],
    strict: 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
