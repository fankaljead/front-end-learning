/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 21:35:30
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 21:56:11
 * @FilePath: \js-review\js-面试\EventBus.js
 * @Description: EventBus 或者 EventEmitter
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach((callback) => {
      callback(...args);
    });
  }
}
class EventEmitter {
  constructor() {
    // 单例模式
    if (!EventEmitter.instance) {
      EventEmitter.instance = this;
      this.handleMap = {};
    }
    //map结构，用于储存事件与其对应的回调
    return EventEmitter.instance;
  }

  //事件订阅，需要接收订阅事件名和对应的回调函数
  on(eventName, callback) {
    this.handleMap[eventName] = this.handleMap[eventName] ?? [];
    this.handleMap[eventName].push(callback);
  }

  //事件发布，需要接收发布事件名和对应的参数
  emit(eventName, ...args) {
    if (this.handleMap[eventName]) {
      //这里需要浅拷贝一下handleMap[eventName],因为在 once 添加订阅时会修改this.handleMap,若once绑定在前就会导致后一个监听被移除
      const handlers = [...this.handleMap[eventName]];
      handlers.forEach((callback) => callback(...args));
    }
  }

  //移除订阅，需要移除的订阅事件名及指定的回调函数
  remove(eventName, callback) {
    const callBacks = this.handleMap[eventName];
    const index = callBacks.indexOf(callback);
    if (index !== -1) {
      callBacks.splice(index, 1);
    }
  }

  //添加单次订阅，触发一次订阅事件后取消订阅，需要添加的订阅事件名及指定的回调函数
  once(eventName, callback) {
    const warpper = (...args) => {
      callback(...args);
      this.remove(eventName, warpper);
    };
    this.on(eventName, warpper);
  }
}

//基础测试
const eventBus = new EventEmitter();
eventBus.once("demo", (params) => {
  console.log(1, params);
});
eventBus.on("demo", (params) => {
  console.log(2, params);
});
eventBus.on("demo", (params) => {
  console.log(3, params);
});
eventBus.emit("demo", "someData");
console.log(eventBus);
