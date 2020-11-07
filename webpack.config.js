let path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};