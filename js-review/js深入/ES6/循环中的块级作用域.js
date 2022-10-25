/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-02 14:41:23
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-02 14:45:58
 * @FilePath: \js-review\js深入\ES6\循环中的块级作用域.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

(function () {
  var funcs = [];
  for (var i = 0; i < 3; ++i) {
    funcs[i] = function () {
      console.log(i);
    };
  }
  funcs[0]();
})(); // 3

(function () {
  var funcs = [];
  for (let i = 0; i < 3; ++i) {
    funcs[i] = function () {
      console.log(i);
    };
  }
  funcs[0]();
})(); // 0

(function () {
  for (let i = 0; i < 3; ++i) {
    let i = "abc";
    console.log(i);
  }
})(); // abc abc abc

(function () {
  for (var i = 0; i < 3; ++i) {
    var i = "abc";
    console.log(i);
  }
})(); // abc

(function () {
  for (let i = 0; i < 3; ++i) {
    var i = "abc"; // Identifier 'i' has already been declared
    console.log(i);
  }
}); //  报错

(function () {
  for (var i = 0; i < 3; ++i) {
    let i = "abc"; // Identifier 'i' has already been declared
    console.log(i);
  }
}); //  报错
