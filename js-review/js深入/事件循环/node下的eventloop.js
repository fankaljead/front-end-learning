/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-04 15:58:14
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-04 15:58:15
 * @FilePath: \js-review\js深入\事件循环\node下的eventloop.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

(function () {
  setTimeout(() => {
    console.log("timer1");

    Promise.resolve().then(function () {
      console.log("promise1");
    });
  }, 0);

  setTimeout(() => {
    console.log("timer2");

    Promise.resolve().then(function () {
      console.log("promise2");
    });
  }, 0);

  // 以上代码在浏览器和 node 中打印情况是不同的
  // 浏览器中一定打印 timer1, promise1, timer2, promise2
  // node 中可能打印 timer1, timer2, promise1, promise2
  // 也可能打印 timer1, promise1, timer2, promise2
});

(function () {
  setTimeout(() => {
    console.log("timer1");

    Promise.resolve().then(function () {
      console.log("promise1");
    });
  }, 0);

  process.nextTick(() => {
    console.log("nextTick");
  });
  // nextTick, timer1, promise1
})();
