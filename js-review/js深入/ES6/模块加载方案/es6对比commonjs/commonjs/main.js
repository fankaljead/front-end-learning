/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:40:09
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:42:45
 * @FilePath: \js-review\js深入\ES6\模块加载方案\es6对比commonjs\commonjs\main.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
var mod = require("./counter");

console.log(mod.counter);
console.log(mod.ccounter);
mod.incCounter();
console.log(mod.counter);
console.log(mod.ccounter);
