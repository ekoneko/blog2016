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
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', ['es2015', {modules: false}], 'es2016']
        }
      }, {
        test: /\.s?css$/i,
        loader: extractCSS.extract(['css-loader','sass-loader'])
      }, {
        test: /\.html$/,
        loader: 'html-loader',
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
  node: {
    fs: "empty"
  },
  devtool: process.env.DEV ? 'inline-source-map' : ''
}
