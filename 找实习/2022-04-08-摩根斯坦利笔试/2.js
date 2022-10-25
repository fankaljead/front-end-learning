/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-08 20:19:56
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-08 20:50:02
 * @FilePath: \2022-04-08-阅文笔试\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function getMaxKnowledge(
  d = 10,
  n = 4,
  k = 2,
  s = [2, 5, 4, 3],
  e = [8, 9, 7, 5],
  a = [800, 1600, 200, 400]
) {
  let res = 0;
  for (let i = 0; i < d; i++) {
    let arr = new Array(n).fill(0);
    // for (let k = 0; k < n; k++) {
    for (let j = 0; j < n; j++) {
      if (i + 1 >= s[j] && i + 1 <= e[j]) {
        arr[j] = a[j];
      }
    }
    // }
    // console.log(arr);
    arr.sort((a, b) => b - a);
    let max = 0;
    for (let j = 0; j < k; j++) {
      max += arr[j];
    }
    if (max > res) {
      res = max;
    }
  }
  return res;
  // console.log(res);
}

getMaxKnowledge();

function getMaxKnowledge2(
  d = 10,
  // n = 4,
  k = 2,
  s = [2, 5, 4, 3],
  e = [8, 9, 7, 5],
  a = [800, 1600, 200, 400]
) {
  let ss = s.sort((a, b) => b - a),
    ee = e.sort((a, b) => b - a),
    aa = a.sort((a, b) => b - a);
  let n = s.length;
  let maxS = ss[0],
    minE = ss[n - 1];
  for (let i = 1; i < n; ++i) {
    if (minE > maxS) {
      maxS = ss[i];
    }
  }
}
