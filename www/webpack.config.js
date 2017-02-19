const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
  entry: "index",
  output: {
    path: __dirname + "/dist",
    filename: 'index.js'
  },
  resolve: {
    root: __dirname
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', 'es2015', 'es2016']
        }
      }, {
        test: /\.s?css$/i,
        loader: extractCSS.extract(['css','sass'])
      }, {
        test: /\.html$/,
        loader: 'html',
        query: {
          minimize: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kaze-Blog',
      // favicon: ''
    }),
    extractCSS
  ],
  devtool: process.env.DEV ? 'inline-source-map' : ''
}
