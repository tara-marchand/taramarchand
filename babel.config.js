const presets = [
  ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
  ['@babel/preset-env', { targets: { esmodules: true } }],
  '@babel/preset-react',
];
const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  ['lodash', { id: ['lodash'] }],
];

if (process.env.NODE_ENV === 'development') {
  plugins.unshift('react-hot-loader/babel');
}

module.exports = { presets, plugins };
