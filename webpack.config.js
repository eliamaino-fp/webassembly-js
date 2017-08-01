const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  	loaders: [
  	  {
  	    test: /\.wasm$/,
  	    loaders: ['wasm-loader']	
  	  }
  	]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/js/wasm/*.wasm',
      to: 'wasm/[name].wasm'
    }])
  ],
  node: {
    fs: 'empty'
  }
};
