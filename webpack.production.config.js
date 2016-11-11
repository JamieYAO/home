const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
  entry: './javascripts/nodeBook.index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  output: {
    path: './web/bin/',
    filename: 'bundle.js'
  }
};
