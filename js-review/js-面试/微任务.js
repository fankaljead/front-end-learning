/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-29 16:56:10
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-29 18:38:17
 * @FilePath: \js-review\js-面试\微任务.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// (function () {
//   setTimeout(() => {
//     console.log("settimeout1");
//     let p = new Promise((resolve, reject) => {
//       resolve("p1");
//     });
//     p.then((r) => {
//       console.log(`task ${r}`);
//     });
//     console.log("Listener1");
//   }, 0);
//   setTimeout(() => {
//     console.log("settimeout2");
//     let p = new Promise((resolve, reject) => {
//       resolve("p2");
//     });
//     p.then((r) => {
//       console.log(`task ${r}`);
//     });
//     console.log("Listener2");
//   }, 0);
// })();
// setTimeout(() => {
//   setTimeout(() => {
//     console.log("settimeout1");
//     let p = new Promise((resolve, reject) => {
//       resolve("p1");
//     });
//     p.then((r) => {
//       console.log(`task ${r}`);
//     });
//     console.log("Listener1");
//   }, 0);
//   setTimeout(() => {
//     console.log("settimeout2");
//     let p = new Promise((resolve, reject) => {
//       resolve("p2");
//     });
//     p.then((r) => {
//       console.log(`task ${r}`);
//     });
//     console.log("Listener2");
//   }, 0);
// });

// (function () {
//   Promise.resolve(1).then((r) => {
//     console.log("promise:", r);
//   });
//   try {
//     throw new Error("错误");
//   } catch (e) {
//     console.log("error: ", e);
//     // return;
//   } finally {
//     console.log("final");
//   }
//   console.log("listen");
// })();

// (function () {
//   console.log("script start");

//   async function async1() {
//     await async2();
//     console.log("async1 end");
//   }
//   async function async2() {
//     console.log("async2 end");
//   }
//   async1();

//   setTimeout(function () {
//     console.log("setTimeout");
//   }, 0);

//   new Promise((resolve) => {
//     console.log("Promise");
//     resolve();
//   })
//     .then(function () {
//       console.log("promise1");
//     })
//     .then(function () {
//       console.log("promise2");
//     });

//   console.log("script end");

//   // script start
//   // async2 end
//   // Promise
//   // script end
//   // async1 end
//   // promise1
//   // promise2
//   // setTimeout
// })();

(function () {
  async function async1() {
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    console.log("async2 end");
  }
  async1();
  console.log("script end");
  // async2 end
  // script end
  // async1 end
})();
