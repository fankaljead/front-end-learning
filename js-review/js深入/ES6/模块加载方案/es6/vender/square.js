/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:34:28
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:34:30
 * @FilePath: \js-review\js深入\ES6\模块加载方案\es6\vender\square.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

// square.js
console.log("加载了 square 模块");

import { multiply } from "./multiply.js";

var square = function (num) {
  return multiply(num, num);
};

export { square };
