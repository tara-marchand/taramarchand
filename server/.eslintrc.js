module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.server.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
  ignorePatterns: ['.eslintrc.js', 'otel-server.js']
};
