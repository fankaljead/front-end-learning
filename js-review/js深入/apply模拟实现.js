/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-01 14:50:08
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-01 14:57:34
 * @FilePath: \js-review\js深入\apply模拟实现.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
Function.prototype.apply2 = function (context, arr) {
  var context = context || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    // console.log("args:", args.toString());
    result = eval("context.fn(" + args + ")");
    // result = context.fn(args);
  }

  delete context.fn;
  return result;
};

var value = 2;
var foo = {
  value: 1,
};
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
bar.apply2(foo, ["xianghui", 18]);
bar.apply2(null, ["zxh", 24]);
