/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:20:41
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:20:42
 * @FilePath: \js-review\js深入\ES6\模块加载方案\sea.js\vender\add.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

define(function (require, exports, module) {
  console.log("加载了 add 模块");

  var add = function (num1, num2) {
    return num1 + num2;
  };

  module.exports = { add: add };
});
