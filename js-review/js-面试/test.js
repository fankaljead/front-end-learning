/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-24 15:15:49
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-24 15:19:50
 * @FilePath: \js-review\js-面试\test.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}

Foo.getName = function () {
  console.log(2);
};

Foo.prototype.getName = function () {
  console.log(3);
};

var getName = function () {
  console.log(4);
};

function getName() {
  console.log(5);
}

// 测试输出
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
