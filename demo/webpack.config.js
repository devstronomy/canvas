const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/index.ts', './main.css'],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '...'], // ... -> resolves default webpack extension
    alias: {
      Canvas: path.resolve(__dirname, '../src'),
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' }), new MiniCssExtractPlugin()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
}
