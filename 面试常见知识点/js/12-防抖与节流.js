/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-04 21:35:36
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-04 21:42:36
 * @FilePath: \面试常见知识点\js\12-防抖与节流.js
 * @Description: 防抖与节流
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 1. 防抖
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

// 2. 节流
function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
