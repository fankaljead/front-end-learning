/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-02 16:48:20
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-02 16:52:28
 * @FilePath: \js-review\js深入\ES6\promisify.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 有的时候，我们需要将 callback 语法的 API 改造成 Promise 语法，为此我们需要一个 promisify 的方法。

// 因为 callback 语法传参比较明确，最后一个参数传入回调函数，回调函数的第一个参数是一个错误信息，如果没有错误，就是 null，所以我们可以直接写出一个简单的 promisify 方法：

function promisify(original) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) {
          reject(err);
        } else {
          resolve(...values);
        }
      });
      original.apply(this, args);
    });
  };
}

let promises = [];
for (let i = 0; i < 10; i++) {
  promises.push(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 1000 * i);
    })
  );
}

let pp = Promise.all(promises);

pp.then((r) => console.log(r));
