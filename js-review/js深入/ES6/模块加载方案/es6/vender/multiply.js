/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:34:07
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:34:08
 * @FilePath: \js-review\js深入\ES6\模块加载方案\es6\vender\multiply.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// multiply.js
console.log("加载了 multiply 模块");

var multiply = function (x, y) {
  return x * y;
};

export { multiply };
