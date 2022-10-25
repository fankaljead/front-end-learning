/*
 * @Author: Zhou Xianghui
 * @Date: 2022-09-12 16:33:50
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-09-12 16:38:07
 * @FilePath: \js-review\js深入\for-in与for-of.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 1. for of
// 迭代 Array
for (const num of [11, 22, 33]) {
  console.log(num);
}

// 迭代 String
for (const c of "hello") {
  console.log(c);
}

// 迭代 TypedArray
const tda = new Uint8Array([0x00, 0xff]);
for (const value of tda) {
  console.log(value);
}

// 迭代 Map
let mm = new Map([
  ["a", 1],
  ["b", 2],
]);
for (const entry of mm) {
  console.log(entry);
}

// 迭代 Set
let ss = new Set([1, 1, 2, 2, 2, 2, 3, 4]);
for (const v of ss) {
  console.log(v);
}

// 迭代迭代器
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}
for (const v of foo()) {
  console.log(v);
}
