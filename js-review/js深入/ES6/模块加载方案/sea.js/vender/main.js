/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:19:56
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:19:57
 * @FilePath: \js-review\js深入\ES6\模块加载方案\sea.js\vender\main.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
define(function (require, exports, module) {
  var addModule = require("./add");
  console.log(addModule.add(1, 2));

  var squareModule = require("./square");
  console.log(squareModule.square(3));
});
