const webpack = require('webpack');
const fs = require('fs');
const Path = require('path');
const WebpackCleanupPlugin =  require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom', 'axios'],
  	app: './client/app.js'
  },
  output: {
  	path: Path.join(__dirname, '/public/js'),
    filename: '[name].js'
  },
  module: {
  	loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory=true'
			}
		]
  },
	plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: 2
      })
    ]
};
