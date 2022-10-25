/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-06 22:18:36
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-06 22:27:02
 * @FilePath: \360笔试2022-03-06\test5.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function findK(nums = [], k = 1) {
  let res = [];
  nums.forEach((v) => res.push(...v));
  res.sort((a, b) => a - b);
  return res[k-1];
}

let n = readInt(),
  k = readInt();
let line;
let nums = [];
while ((line = read_line()) != "") {
  let arr = line.split(" ");
  nums.push(arr.map((v) => parseInt(v)));
}

// console.log(findK(nums));
