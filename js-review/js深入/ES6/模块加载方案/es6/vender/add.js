/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:33:55
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:33:57
 * @FilePath: \js-review\js深入\ES6\模块加载方案\es6\vender\add.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// add.js
console.log("加载了 add 模块");

var add = function (x, y) {
  return x + y;
};

export { add };
