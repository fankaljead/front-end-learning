const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    publicPath: " /dist/",
    path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
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
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         // require("autoprefixer"),
          //         // require("postcss-preset-env"),
          //         "postcss-preset-env",
          //       ],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      // {
      //   test: /\.(png|svg|gif|jpe?g)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         esModule: false, // 不转为 esModule
      //       },
      //     },
      //   ],
      // },
      { test: /\.(png|svg|gif|jpe?g)$/, use: ["file-loader"] },
    ],
  },
  // browserslist: [">%1", "last 2 version", "not dead"],
};
