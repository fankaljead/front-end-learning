const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist"), // 这里必须为绝对路径
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/, // 一般为一个正则表达式，用于匹配需要处理的文件类型
      //   use: [
      //     {
      //       loader: "css-loader",
      //     },
      //   ],
      // },
      // {
      //   test: /\.css$/,
      //   loader: "css-loader",
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // use: ["css-loader", "style-loader"], // 执行顺序有问题，先 style-loader -> css-loader 从右往左
      },
    ],
  },
};
