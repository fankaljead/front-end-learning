/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-29 18:23:11
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-29 20:29:16
 * @FilePath: \2022-03-29-百度笔试\2.js
 * @Description: 百度笔试第 2 题
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function gcd(A, B) {
  let p = 0;
  while (A % B !== 0) {
    p = A % B;
    A = B;
    B = p;
  }
  return B;
}

function lcm(A, B) {
  return (A * B) / gcd(A, B);
}

function find(N = 30) {
  let res = [];
  for (let i = 1, len = Math.floor(Math.sqrt(N)); i <= len; i++) {
    if (N % i === 0) {
      res.push([i, N / i]);
    }
  }
  return res;
}

function t2(N = 30) {
  let result = 1;
  // let times = find(N);
  // for (const time of times) {
  //   if (time[1] % 2 === 0) {
  //     ++result;
  //   }
  // }
  for (let i = 1, len = Math.floor(Math.sqrt(N)); i <= len; i++) {
    if (N % i === 0 && gcd(N / i, i) !== 0) {
      ++result;
    }
  }
  return result;
}
console.log(t2(30));
console.log(t2(16));
// console.log(find());
// console.log(find(2021));
console.log(t2(2021));
console.log(t2(1e8));
