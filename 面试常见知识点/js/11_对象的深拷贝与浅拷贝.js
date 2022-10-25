/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-04 15:46:16
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-04 21:32:25
 * @FilePath: \面试常见知识点\js\11_对象的深拷贝与浅拷贝.js
 * @Description: 实现对象的深拷贝与浅拷贝.
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

// 1. 浅拷贝的实现
(function () {
  // 遍历赋值
  //  for in
  function clone1(obj) {
    var cloneObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = obj[key];
      }
    }
    return cloneObj;
  }

  // Object.keys()
  function clone2(obj) {
    var cloneObj = {};
    for (const key of Object.keys(obj)) {
      cloneObj[key] = obj[key];
    }
    return cloneObj;
  }

  // Object.entries
  function clone3(obj) {
    var cloneObj = {};
    for (const [key, value] of Object.entries(obj)) {
      cloneObj[key] = value;
    }
    return cloneObj;
  }

  // 2. Object.assign
  function clone4(obj) {
    return Object.assign(obj, {});
  }
})();

// 深拷贝的实现方法
(function () {
  // 1. JSON.strinfy() 与 JOSN.parse()
  // 存在问题：遇到函数，undefined，
  // Symbol，Date对象时会自动忽略，
  // 遇到正则时会返回空对象
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // 2. 递归
  // for in
  function deepClone1(obj) {
    if (!obj || typeof obj !== "object") {
      return obj;
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    var cloneObj = new obj.constructor();
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        cloneObj[key] = arguments.callee(obj[key]);
      }
    }
    return cloneObj;
  }

  // Object.keys
  function deepClone2(obj) {
    if (!obj || typeof obj !== "object") {
      return obj;
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    var cloneObj = new obj.constructor();
    for (const key of Object.keys(obj)) {
      cloneObj[key] = arguments.callee(obj[key]);
    }
    return cloneObj;
  }

  // Object.entries
  function deepClone3(obj) {
    if (!obj || typeof obj !== "object") {
      return obj;
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    var cloneObj = new obj.constructor();
    for (const [key, value] of Object.entries(obj)) {
      cloneObj[key] = arguments.callee(value);
    }
    return cloneObj;
  }

  let obj = {
    name: "zxh",
    color: ["cyan", "light"],
    reg: /a/g,
    say: function () {
      console.log("fun say");
    },
  };
  let obj2 = deepClone1(obj);
})();
