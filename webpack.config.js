var path = require('path');

module.exports = {
  entry: {
    'app' : './src/js/app.js',
    'env-worker': './src/js/env-worker.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  }
};
