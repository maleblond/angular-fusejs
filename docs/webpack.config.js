const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./vendor.ts', './main.ts'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
  },
  resolve: {
    modules: [ path.join(__dirname, "node_modules") ],
    extensions: ['.ts', '.js']
  },
};