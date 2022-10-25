/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-21 19:39:08
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-21 20:55:18
 * @FilePath: \2022-03-21-贝壳笔试\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function s(n = 13) {
  let res = 0;
  while (n != 0) {
    res += n % 10;
    n = Math.floor(n / 10);
  }
  return res;
}

let pp = new Array(1e6 + 1);
function tt2(n = 123) {
  if (pp[n] === 1) {
    return true;
  }
  let res = n % s(n);

  if (res === 1) {
    pp[n] = 1;
    return true;
  }
  return false;
}

function t2(
  t = 4,
  lr = [
    [11, 11],
    [13, 13],
    [1, 1e5],
    [1, 1e6],
  ]
) {
  let [min, max] = findMinMax(lr);
  calPP(min, max);
  for (let i = 0; i < t; i++) {
    // let count = 0;
    // for (let j = lr[i][0]; j <= lr[i][1]; j++) {
    //   if (tt2(j)) {
    //     count++;
    //   }
    // }
    console.log(countt(lr[i][0], lr[i][1]));
  }
}
t2();

function findMinMax(lr = []) {
  let min = lr[0][0];
  let max = lr[0][1];
  for (let i = 1; i < lr.length; i++) {
    if (min > lr[i][0]) {
      min = lr[i][0];
    }
    if (max < lr[i][1]) {
      max = lr[i][1];
    }
  }
  return [min, max];
}

function calPP(l = 1, r = 2) {
  for (let i = l; i <= r; i++) {
    tt2(i);
  }
}

function countt(l, r) {
  let count = 0;
  for (let i = l; i <= r; i++) {
    if (pp[i] === 1) {
      count++;
    }
  }
  return count;
}

let line = "11 13".split(" ");
let arr = line.map((v) => parseInt(v));
console.log(arr);
