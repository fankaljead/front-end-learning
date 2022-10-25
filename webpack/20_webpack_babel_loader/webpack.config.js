const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    publicPath: " /dist/",
    path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
    assetModuleFilename: "img/[name].[hash:4][ext]",
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
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [
        //         [
        //           "@babel/preset-env",
        //           {
        //             targets: "chrome 91",
        //           },
        //         ],
        //       ],
        //       plugins: [
        //         // "@babel/plugin-transform-arrow-functions",
        //         // "@babel/plugin-transform-block-scoping",
        //       ],
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "17 Webpack5 Html Plugin",
      template: "./public/index.html",
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
  ],
};
