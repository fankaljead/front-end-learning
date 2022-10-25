/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-01 14:57:45
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-01 15:09:49
 * @FilePath: \js-review\js深入\bind模拟实现.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 例子
(function () {
  var foo = {
    value: 1,
  };
  var value = 2;
  function bar() {
    console.log(this.value);
  }

  var bindFoo = bar.bind(foo);
  // bindFoo = bar.bind();

  bindFoo(); // 1
})();

// 第 1 版 bind 实现
(function () {
  Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
      return self.apply(context);
    };
  };
})();

// 第 2 版 bind 实现 传参的模拟实现
(function () {
  Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(bindArgs);
      return self.apply(context, finalArgs);
    };
  };
})();

// 第 3 版 bind 实现 可以给定参数执行函数 构造函数效果的模拟实现
(function () {
  Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(bindArgs);
      return self.apply(context, finalArgs);
    };

    fBound.prototype = this.prototype;
    return fBound;
  };
})();

// 第 4 版 bind 实现 可以给定参数执行函数 构造函数效果的模拟实现优化
(function () {
  Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};

    var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(bindArgs);
      return self.apply(context, finalArgs);
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
})();

// 第 5 版 bind 实现 最终版
(function () {
  Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};

    var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(bindArgs);
      return self.apply(this instanceof fNOP ? this : context, finalArgs);
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
