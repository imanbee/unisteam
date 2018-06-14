const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CSVSource = path.resolve(__dirname, '../source/server/multiplayer_games.csv');
const CSVDest = path.resolve(__dirname, '../dist/server/multiplayer_games.csv');

const PRODUCTION = 'production'

const extractCss = new ExtractTextPlugin('style.css')

const config = {
  entry: [
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public/assets'),
    publicPath: '/assets/'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: extractCss.extract([
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(PRODUCTION)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        //drop_console: true,
        unsafe: true,
        drop_debugger: true,
        dead_code: true
      }
    }),
    extractCss,
  ],
}

module.exports = merge(baseConfig, config)
