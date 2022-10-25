/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-02 14:47:26
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-02 14:52:50
 * @FilePath: \js-review\js深入\ES6\循环中的let和const.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
(function () {
  var funcs = [];
  for (const i = 0; i < 10; ++i) {
    // Assignment to constant variable
    funcs[i] = function () {
      console.log(i);
    };
  }
  funcs[0]();
}); // 报错

(function () {
  for (let i = 0; i < 3; ++i) {
    const i = "abc";
    console.log(i);
  }
})(); // abc abc abc

(function () {
  var funcs = [],
    obj = { a: 1, b: 2, c: 3 };

  for (var key in obj) {
    funcs.push(function () {
      console.log(key);
    });
  }
  funcs[0]();
})(); // c

(function () {
  var funcs = [],
    obj = { a: 1, b: 2, c: 3 };

  for (const key in obj) {
    funcs.push(function () {
      console.log(key);
    });
  }
  funcs[0]();
})(); // a

(function () {
  var funcs = [],
    obj = { a: 1, b: 2, c: 3 };

  for (let key in obj) {
    funcs.push(function () {
      console.log(key);
    });
  }
  funcs[0]();
})(); // a
