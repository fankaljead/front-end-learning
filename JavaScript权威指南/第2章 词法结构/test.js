/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-25 15:40:15
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-25 16:47:47
 * @FilePath: \JavaScript权威指南\第2章 词法结构\test.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
let s = "hello world";
let o1 = null,
  o2 = undefined;
let obj = {
  o1: "null",
  o2: "undefined",
};
console.log(obj[null]);
console.log(obj[undefined]);
console.log(Object.entries(obj));

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    var name = "zxh";
    return () => {
      return this.name;
    };
    return this.name;
  }
  getName2 = () => {
    var name = "zxh";
    return () => {
      return this.name;
    };
  };
}

function Person2(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    var name = "zxh";
    return () => {
      return this.name;
    };
    return this.name;
  };
  this.getName2 = () => {
    var name = "zxh";
    return () => {
      return this.name;
    };
  };
}

let p = new Person2("zhangsan", 18);
let p = new Person("zhangsan", 18);
