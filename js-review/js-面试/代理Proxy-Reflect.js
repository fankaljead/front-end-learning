/*
 * @Author: Zhou Xianghui
 * @Date: 2022-08-24 19:38:39
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-08-25 10:15:39
 * @FilePath: \js-review\js-面试\代理Proxy-Reflect.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
const obj = {
  name: "zxh",
  age: 24,
  male: true,
};

const objProxy = new Proxy(obj, {
  // 1. get 捕获器
  get: function (target, key, receiver) {
    console.log("get 捕获器");
    return target[key];
  },

  // 2. set 捕获器
  set: function (target, key, newValue, receiver) {
    console.log("set 捕获器");
    target[key] = newValue;
  },

  // 3. has 捕获器
  has: function (target, key) {
    console.log("has 捕获器");
    return Object.keys(target).includes(key);
  },

  // 4. delete 捕获器
  deleteProperty: function (target, key) {
    console.log("delete 捕获器");
    return delete target[key];
  },

  // 5. getPrototypeOf 捕获器
  getPrototypeOf: function (target) {
    console.log("getPrototypeOf 捕获器");
    return Object.getPrototypeOf(target);
  },

  // 6. setPrototypeOf 捕获器 这只对象的原型指向另外一个对象
  setPrototypeOf: function (target, newObj) {
    console.log("setPrototypeOf 捕获器");
    return Object.setPrototypeOf(target, newObj);
  },

  // 7. isExtensible 捕获器 判断对象是否可以扩展
  isExtensible: function (target) {
    console.log("isExtensible 捕获器");
    return Object.isExtensible(target);
  },

  // 8. preventExtensions 捕获器 禁止扩展
  preventExtensions: function (target) {
    console.log("preventExtensions 捕获器");
    return Object.preventExtensions(target);
  },

  // 9. getOwnPropertyDescriptor 捕获器
  getOwnPropertyDescriptor: function (target) {
    console.log("getOwnPropertyDescriptor 捕获器");
    return Object.getOwnPropertyDescriptor(target);
  },

  // 10. defineProperty 捕获器
  defineProperty: function (target, key, obj) {
    console.log("defineProperty 捕获器");
    return Object.defineProperty(target, key, obj);
  },

  // 11. ownKeys 捕获器
  ownKeys: function (target) {
    console.log("ownKeys 捕获器");
    // return Object.getOwnPropertyNames(target);
    return Object.getOwnPropertySymbols(target);
  },

  // 12. apply 捕获器  普通函数调用
  apply: function (target, thisArg, paramArr) {
    console.log("apply 捕获器");
    target.apply(thisArg, paramArr);
  },

  // 13. contruct 捕获器 new 操作符
  construct: function (target, paramArr) {
    console.log("construct 捕获器");
    return new target(...paramArr);
  },
});

// objProxy.age += 1;
// console.log(objProxy.age);
// console.log("name" in objProxy);
// console.log(delete objProxy.male);

(function () {
  const obj = {
    _name: "zxh",
    get name() {
      return this._name;
    },
    set name(newValue) {
      this._name = newValue;
    },
  };

  const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
      console.log("get 捕获器");
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, newValue, receiver) {
      console.log("set 捕获器");
      Reflect.set(target, key, newValue, receiver);
    },
  });
  console.log(objProxy.name);
  objProxy.name = "12";
})();
