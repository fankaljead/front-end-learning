/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:03:11
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:04:32
 * @FilePath: \js-review\js深入\ES6\模块加载方案\require.js\vender\add.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
define(function () {
  console.log("加载了 add 模块");
  var add = function (x, y) {
    return x + y;
  };

  return {
    add: add,
  };
});
