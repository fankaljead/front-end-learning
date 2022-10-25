/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-01 15:10:28
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-01 15:14:00
 * @FilePath: \js-review\js深入\new模拟实现.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

// 例子
(function () {
  // Otaku 御宅族，简称宅
  function Otaku(name, age) {
    this.name = name;
    this.age = age;

    this.habit = "Games";
  }

  // 因为缺乏锻炼的缘故，身体强度让人担忧
  Otaku.prototype.strength = 60;

  Otaku.prototype.sayYourName = function () {
    console.log("I am " + this.name);
  };

  var person = new Otaku("Kevin", "18");

  console.log(person.name); // Kevin
  console.log(person.habit); // Games
  console.log(person.strength); // 60

  person.sayYourName(); // I am Kevin
})();

// 第 1 版 new 实现
(function () {
  function objectFactory() {
    var obj = {};
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);

    return obj;
  }
})();

// 第 2 版 new 实现 返回值效果
(function () {
  function objectFactory() {
    var obj = {};
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);

    return typeof res === "object" ? ret : obj;
  }
})();
