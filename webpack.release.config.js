var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');

var appEntryCommon = require('./app-entry'), commonEntry=[], key, hasProp = {}.hasOwnProperty;
for (key in appEntryCommon) {
  if (!hasProp.call(appEntryCommon, key)) continue;
  commonEntry.push(key);
}

webpackConfig.output.filename = '[name].[chunkhash].js';
webpackConfig.output.publicPath = 'http://mimimi.mimimi.mimimi';

webpackConfig.devtool = 'source-map';

webpackConfig.debug = false;

webpackConfig.plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'bundle',
    filename: 'bundle.[chunkhash].js',
    minChunks: 3,
    chunks: commonEntry
  }),
  new ExtractTextPlugin("[name].[chunkhash].css"),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    compress: {
      warnings: false
    }
  }),
  new AssetsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.DefinePlugin({
    PRODUCTION: true,
    BUILD_ENV: '"sandbox"'
  })
]

module.exports = webpackConfig;
