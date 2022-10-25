const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = (env) => {
  const isProduction = env.production;
  return {
    entry: "./src/index.js",
    watch: false,
    devtool: "cheap-module-source-map",
    output: {
      filename: "js/main.js",
      publicPath: "",
      path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
      assetModuleFilename: "img/[name].[hash:4][ext]",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
        watch: false,
      },
      compress: true,
      port: 9000,
      hot: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "https://api.github.com",
          pathRewrite: { "^/api": "" },
          changeOrigin: true,
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "vue-style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 1, esModule: false },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 2, esModule: false },
            },
            "postcss-loader",
            "less-loader",
          ],
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
          test: /\.jsx?$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: ["vue-loader"],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "37 Webpack Merge Production",
        template: "./public/index.html",
      }),
      new DefinePlugin({
        BASE_URL: JSON.stringify("./"),
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: [".js", ".json", ".jsx", ".vue", ".ts"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
};