/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-01 14:38:05
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-01 14:49:25
 * @FilePath: \js-review\js深入\call实现.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 第一版 call 实现
(function () {
  Function.prototype.call2 = function (context) {
    context.fn = this;
    context.fn();
    delete context.fn;
  };

  var foo = {
    value: 1,
  };

  function bar() {
    console.log(this.value);
  }

  bar.call2(foo);
})();

// 第二版 call 实现 可以给定参数执行函数
(function () {
  Function.prototype.call2 = function (context) {
    context.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
      args.push("arguments[" + i + "]");
    }

    eval("context.fn(" + args + ")");
    delete context.fn;
  };

  var foo = {
    value: 1,
  };

  function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
  }

  bar.call2(foo, "xianghui", 18);
})();

// 第三版 call 实现 可以给定参数执行函数 this 参数可以传 null ，当为 null 时，this 指向 window
var value = 2;
(function () {
  Function.prototype.call2 = function (context) {
    var context = context || globalThis || window;
    context.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
      args.push("arguments[" + i + "]");
    }

    var result = eval("context.fn(" + args + ")");
    delete context.fn;

    return result;
  };

  var value = 2;

  var foo = {
    value: 1,
  };

  function bar(name, age) {
    // console.log(name);
    // console.log(age);
    console.log(this.value);
    return {
      value: this.value,
      name: name,
      age: age,
    };
  }
  bar.call2(null);

  console.log(bar.call2(foo, "xianghui", 18));
})();
