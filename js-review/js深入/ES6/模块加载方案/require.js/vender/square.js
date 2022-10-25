/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:04:41
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:04:41
 * @FilePath: \js-review\js深入\ES6\模块加载方案\require.js\vender\square.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
define(["./multiply"], function (multiplyModule) {
  console.log("加载了 square 模块");
  return {
    square: function (num) {
      return multiplyModule.multiply(num, num);
    },
  };
});
