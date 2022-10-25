/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:22:40
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:22:41
 * @FilePath: \js-review\js深入\ES6\模块加载方案\sea.js\vender\multiply.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
define(function (require, exports, module) {
  console.log("加载了 multiply 模块");

  var multiply = function (num1, num2) {
    return num1 * num2;
  };

  module.exports = { multiply: multiply };
});
