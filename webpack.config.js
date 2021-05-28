const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CLIENT_PATH = 'src/client';

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, CLIENT_PATH, 'index.tsx')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  mode: 'development',
  // target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx']
  },
  output: {
    filename: 'client-bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, CLIENT_PATH, "index.html")
    })
  ]
};