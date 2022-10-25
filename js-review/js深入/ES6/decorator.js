/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-03 17:33:11
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-03 17:35:29
 * @FilePath: \js-review\js深入\ES6\decorator.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// @annotation
// class MyClass {}

// function annotation(target) {
//   target.annotated = true;
// }
function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`Calling ${name} with`, args);
    return oldValue.apply(this, args);
  };

  return descriptor;
}

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Math();
math.add(2, 3);
