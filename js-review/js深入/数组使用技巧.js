/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-20 10:53:20
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-09-15 16:20:37
 * @FilePath: \js-review\js深入\数组使用技巧.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 8. 两个数组的交集
function intersection(arr1 = [], arr2 = []) {
  return [...new Set(arr1)].filter((item) => arr2.includes(item));
}
console.log(intersection([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]));

// 8.5 两个数组的并集
function union(arr1 = [], arr2 = []) {
  return [...new Set([...arr1, ...arr2])];
}
console.log(union([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]));

// 8.6 两个数组的差集
function difference(arr1 = [], arr2 = []) {
  return [...new Set(arr1)].filter((item) => !arr2.includes(item));
}
console.log(difference([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]));

// 9. 删除数组中的 falsy 值
function compact(arr = []) {
  // return arr.filter((item) => item);
  return arr.filter(Boolean);
}
console.log(compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]));

// 10. 随机获取数组中的值
function sample(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}
console.log(sample([1, 2, 3, 4, 5]));

// 11. 判断是否为数组
function isArray(arr = []) {
  // return Object.prototype.toString.call(arr) === "[object Array]";
  // return arr.constructor === Array;
  return Array.isArray(arr);
}

// 12. 判断对象是否为空
function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

// 13 随机打乱数组
function shuffle(arr = []) {
  let _arr = [...arr];
  for (let i = 0; i < _arr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
  }
  return _arr;
}
let arr = Array.from({ length: 10 }, (_, i) => i);
console.log(shuffle(arr));
