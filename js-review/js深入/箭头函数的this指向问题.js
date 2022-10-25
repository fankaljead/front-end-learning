/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-20 16:19:36
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-22 13:05:45
 * @FilePath: \js-review\js深入\箭头函数的this指向问题.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 箭头函数根据外层作用域来决定 this
var obj2 = {
  name: "obj2",
  innerObj: {
    name: "innerObj",
    getName: () => {
      console.log(this, this.name);
    },
  },
};
console.log(obj2.innerObj.getName());

function Person(name) {
  this.name = name;
  this.obj2 = {
    name: "obj2",
    innerObj: {
      name: "innerObj",
      getName: () => {
        console.log(this, this.name);
      },
    },
  };
}

let p1 = new Person("p1");
let p2 = new Person("p2");
console.log(p1.obj2.innerObj.getName());
console.log(p2.obj2.innerObj.getName());

var adder = {
  base: 1,
  add: function (a) {
    var base = 2;
    var fn = (v) => this.base + v;
    return fn(a);
  },
  addByCall: function (a) {
    var fn = (v) => this.base + v;
    var obj = {
      base: 3,
    };
    return fn.call(obj, a);
  },
};
console.log(adder.add(1));
console.log(adder.addByCall(1));
