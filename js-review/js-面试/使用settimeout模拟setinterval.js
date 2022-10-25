/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-28 14:11:25
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-29 13:22:19
 * @FilePath: \js-review\js-面试\使用settimeout模拟setinterval.js
 * @Description: 使用 setTimeout 模拟 setInterval
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

// setInterval 的问题：
// 1. 如果 setInterval 执行的代码中，有异步代码，那么 setInterval 会被挂起，直到异步代码执行完毕，才会继续执行。
// 2. 如果 setInterval 执行的代码中，有同步代码，那么 setInterval 会继续执行。
function interval(fn, time) {
  fn();
  setTimeout(() => {
    interval(fn, time);
  }, time);
}

// 测试
let date = new Date();
let date2 = new Date();
interval(() => {
  let cur = new Date();
  console.log("interval1: ", cur.getTime() - date.getTime());
  date = cur;
}, 2000);

interval(() => {
  let cur = new Date();
  console.log("interval2: ", cur.getTime() - date2.getTime());
  date2 = cur;
}, 2000);

setInterval(() => {
  let cur = new Date();
  console.log("interval1: ", cur.getTime() - date.getTime());
  date = cur;
}, 2000);

setInterval(() => {
  let cur = new Date();
  console.log("interval2: ", cur.getTime() - date2.getTime());
  date2 = cur;
}, 2000);

for (let i = 0; i < 5; ++i) {
  setTimeout(() => {
    console.log("settimeout ", i);
  }, 2000);
}
