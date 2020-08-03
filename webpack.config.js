const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
         {
             test: /\.js/,
             exclude: /node_modules/,
             use: {
                loader: 'babel-loader',
             }
         },
         {
            test: /\.scss/,
            use: ['style-loader', 'css-loader', 'postcss-lodaer', 'sass-loader'] // Note that postcss loader must come before sass-loader
         }
      ]
   }
};