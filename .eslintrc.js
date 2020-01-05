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
        'standard',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/babel',
        'prettier/react',
        'prettier/standard'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      plugins: [
        '@typescript-eslint',
        'babel',
        'prettier',
        'react',
        'react-hooks',
        'standard'
      ]
    },
    {
      env: {
        es6: true,
        browser: false,
        node: true
      },
      files: [path.resolve(process.cwd(), 'app/**/*.*')]
    }
  ],
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
