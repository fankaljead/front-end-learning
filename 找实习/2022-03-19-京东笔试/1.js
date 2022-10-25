/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-19 19:38:25
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-19 20:31:15
 * @FilePath: \京东-2022-03-19\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 小明的最大值
function t1(L = [5, 1, 3], R = [6, 2, 7], P = [5, 7, 5], n = 3) {
  let res = [];

  for (let i = 0; i < n; i++) {
    let l = L[i];
    let r = R[i];
    let p = P[i];
    let ll = l % p,
      len = r - l;
    let max = 0;
    if (ll + len >= p) {
      max = p - 1;
    } else {
      max = ll + len;
    }
    // rr = r % p;
    // if (r - l >= p) {
    //   max = p - 1;
    // } else {
    //   max = ll < rr ? rr : p - 1;
    // }
    res.push(max);
  }
  return res;
}

// console.log(t1());
let L = "5 1 3 1".split(" ").map((item) => parseInt(item));
let R = "6 2 7 1".split(" ").map((item) => parseInt(item));
let P = "5 7 5 1".split(" ").map((item) => parseInt(item));
let T = 4;
console.log(L);
console.log(R);
console.log(P);
console.log(t1(L, R, P, T));
console.log(...[1, 2, 3]);

function tt()