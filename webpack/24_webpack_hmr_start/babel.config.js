module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // default: false 不对当前 JS 做 polyfill 填充
        // usage: 依据源代码中使用到的新语法进行填充
        // entry: 依据兼容的浏览器填充
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
  ],
};
