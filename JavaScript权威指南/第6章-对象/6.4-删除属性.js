/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-30 15:36:04
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-30 19:03:52
 * @FilePath: \JavaScript权威指南\第6章-对象\6.4-删除属性.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
class A {
  constructor(name) {
    this.name = name;
  }
  some = 1;
}

class B extends A {
  age = 10;
  some = 2;
}

B.prototype.some = 3;

let b = new B("b");
delete b.some;
console.log(b);
let o = { x: 1 };
delete o.x;
console.log(o.x);
delete o.toString;
console.log(o.toString);
