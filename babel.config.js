const presets = ['@babel/preset-env', '@babel/preset-react'];
const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  ['lodash', { id: ['lodash'] }],
];

if (process.env.NODE_ENV === 'development') {
  plugins.unshift('react-hot-loader/babel');
}

module.exports = { presets, plugins };
