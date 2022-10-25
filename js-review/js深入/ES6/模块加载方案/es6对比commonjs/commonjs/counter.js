/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 16:40:31
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 16:43:31
 * @FilePath: \js-review\js深入\ES6\模块加载方案\es6对比commonjs\commonjs\counter.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

var counter = 3;
var ccounter = {
  value: 1,
};
function incCounter() {
  counter++;
  ccounter.value++;
}
module.exports = {
  counter: counter,
  ccounter: ccounter,
  incCounter: incCounter,
};
