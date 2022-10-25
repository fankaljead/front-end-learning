const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  watch: false,
  devtool: false,
  output: {
    filename: "main.js",
    publicPath: " /dist/",
    path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
    assetModuleFilename: "img/[name].[hash:4][ext]",
  },
  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, esModule: false },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },

      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:4][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: { filename: "font/[name].[hash:3][ext]" },
      },
      // {
      //   test: /\.js$/,
      //   use: ["babel-loader"],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "25 React HMR",
      template: "./public/index.html",
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify("./"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
