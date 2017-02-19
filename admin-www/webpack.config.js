const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var extractCSS = new ExtractTextPlugin('[name].style.css');

module.exports = {
  entry: {
    index: "index",
    editor: "editor"
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },
  resolve: {
    root: path.join(__dirname, 'code'),
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', 'es2015', 'es2016', 'stage-0']
        }
      }, {
        test: /\.s?css$/i,
        loader: extractCSS.extract(['css', 'sass'])
      }, {
        test: /\.html$/,
        loader: 'html',
        query: {
          minimize: true
        }
      }, {
        loader: 'file-loader',
        test: /\.(png|jpg|gif|webp|eot|ttf|cur|woff2?|svg)$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kaze-Blog-Admin',
      // favicon: ''
    }),
    extractCSS
  ],
  devtool: process.env.DEV ? 'inline-source-map' : ''
}
