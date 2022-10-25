/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-02 16:44:49
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-02 16:46:55
 * @FilePath: \js-review\js深入\ES6\红绿灯问题.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）
// 三个亮灯函数已经存在：
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

var light = function (timer, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};

var step = function () {
  Promise.resolve()
    .then(() => light(3000, red))
    .then(() => light(2000, green))
    .then(() => light(1000, yellow))
    .then(() => step());
};

step();
