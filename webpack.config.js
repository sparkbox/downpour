'use strict';

module.exports = {
  entry: `./js/drizzle.js`,
  output: {
    path: __dirname + "/dist",
    filename: "drizzle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        include: /node_modules/,
        loader: 'es3ify-loader',
      },
    ],
  }
};
