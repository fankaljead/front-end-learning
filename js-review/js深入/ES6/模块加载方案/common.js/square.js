/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:30:08
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:30:09
 * @FilePath: \js-review\js深入\ES6\模块加载方案\common.js\square.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// square.js
console.log("加载了 square 模块");

var multiply = require("./multiply.js");

var square = function (num) {
  return multiply.multiply(num, num);
};

module.exports.square = square;
