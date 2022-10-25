// CommonJS 语法
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
  ],
  devServer: {
    port: 8000,
    static: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "babel-loader",
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
};
