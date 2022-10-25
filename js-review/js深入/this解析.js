/*
 * @Author: ZhouXianghui
 * @Date: 2022-04-05 14:26:59
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-05 16:20:57
 * @FilePath: \js-review\js深入\this解析.js
 * @Description:
 * long long time ago
 * Copyright (c) 2022 by ZhouXianghui/Qianjiang Tech, All Rights Reserved.
 */
// 1. new 调用绑定
// function foo(a) {
//   console.log("this:", this);
//   this.a = a;
// }
// var bar = new foo(2);
// console.log(bar.a);

// 2. 通过 call apply 显示绑定
// function foo() {
//   console.log("this:", this);
//   console.log(this.a);
// }
// var obj = {
//   a: 2,
//   name: "zxh",
// };
// var a = 1;
// foo.call(obj); // 2

// // 3. 函数在某个上下文中调用 隐式绑定
// function foo() {
//   console.log("this:", this);
//   console.log(this.a);
// }
// var obj = {
//   a: 2,
//   foo: foo,
// };
// var a = 1;
// obj.foo(); // 2

// 4. 默认绑定
// function foo() {
//   console.log("this:", this);
//   console.log(this.a);
// }
// var obj = {
//   a: 2,
//   foo: foo,
// };
// var bar = obj.foo;
// // globalThis.a = "ooops, global"; // node 环境 var 声明变量不会挂载到 global 上
// var a = "ooops, global";
// bar();

// 5. 箭头函数根据外层作用域来决定 this
// function foo() {
//   return (a = () => {
//     console.log("this:", this);
//     console.log(this.a);
//   });
// }
// var obj1 = {
//   a: 2,
// };
// var obj2 = {
//   a: 3,
// };
// var bar = foo.call(obj2);
// bar.call(obj2);

// setTimeout 中的箭头函数 this
"use strict";
function foo() {
  this.name = "inner";
  return () => {
    return () => {
      setTimeout(() => {
        console.log("this:", this);
        console.log(this.name);
      });
    };
  };
}

var obj = {
  foo: foo,
  name: "zxh",
};
var name = "global";
var f1 = obj.foo();
var f2 = f1();
f2();
obj.foo()()();
