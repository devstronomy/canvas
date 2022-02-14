const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist-demo',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'], // ... -> resolves default webpack extension
    alias: {
      CanvasMK: path.resolve(__dirname, '../src'),
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
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
    ],
  },
}
