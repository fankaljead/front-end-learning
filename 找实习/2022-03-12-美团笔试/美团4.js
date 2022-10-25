/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-12 16:27:06
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-12 17:17:55
 * @FilePath: \test\美团4.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
let n = 2,
  m = 4;

// var line="2 1 1 2";

let arr = line.split(" ");
let nums = arr.map((v) => Number(v));
function m4(n = 2, m = 4, nums = [2, 1, 1, 2]) {
  let res = 0,
    start = 0;
  let flag = new Set();
  while (start < m && nums[start] != 1) {
    start++;
  }
  if (start >= m) {
    return 0;
  } else {
    res++;
    for (let i = start; i <= m; ++i) {
      flag.add(nums[i]);
      if (flag.size === n) {
        res++;
        flag = new Set();
        flag.add(nums[i]);
      }
      flag.add(nums[i]);
    }
    if (flag.size === n) {
      res++;
    }
    return res;
  }
}
console.log(m4(n, m, nums));

// let line = "2 1 1 2";
// let arr = line.split(" ");
// let nums = arr.map((v) => Number(v));
// console.log(nums);
