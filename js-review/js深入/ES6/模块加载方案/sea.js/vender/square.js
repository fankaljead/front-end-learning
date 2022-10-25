/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:21:43
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:21:44
 * @FilePath: \js-review\js深入\ES6\模块加载方案\sea.js\vender\square.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
define(function (require, exports, module) {
  console.log("加载了 square 模块");

  var multiplyModule = require("./multiply");

  module.exports = {
    square: function (num) {
      return multiplyModule.multiply(num, num);
    },
  };
});
