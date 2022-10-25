/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 15:27:43
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 15:56:12
 * @FilePath: \2022-03-27-网易笔试\4.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function t4(
  n = 3,
  m = 3,
  aij = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ]
) {
  let flag = [];
  for (let i = 0; i < m; i++) {
    flag.push(new Array(n).fill(0));
  }
  flag[0][0] = 0;

  for (let i = 1; i < m; ++i) {
    if (aij[i][0] !== aij[i - 1][0]) {
      flag[i][0] = flag[i - 1][0] + 2;
    } else {
      flag[i][0] = flag[i - 1][0] + 1;
    }
  }

  for (let i = 1; i < n; ++i) {
    if (aij[0][i] !== aij[0][i - 1]) {
      flag[0][i] = flag[0][i - 1] + 2;
    } else {
      flag[0][i] = flag[0][i - 1] + 1;
    }
  }

  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      let p1 = 0,
        p2 = 0;
      if (aij[i][j] !== aij[i - 1][j]) {
        p1 = 2;
      } else {
        p1 = 1;
      }
      if (aij[i][j] !== aij[i][j - 1]) {
        p2 = 2;
      } else {
        p2 = 1;
      }
      flag[i][j] = Math.min(flag[i - 1][j] + p1, flag[i][j - 1] + p2);
    }
  }

  return flag[m - 1][n - 1];
}

console.log(t4());

function readline() {
  return "3 3";
}

// let nm = readline().split(" ");
// let n = parseInt(nm[0]);
// let m = parseInt(nm[1]);
// console.log(n, m);
let aij = [];
// let line;
// while ((line = readline())) {
//   line = line.split(" ");
//   aij.push(line.map((v) => parseInt(v)));
// }

line = "1 0 0".split(" ");
aij.push(line.map((v) => parseInt(v)));
line = "1 1 1".split(" ");
aij.push(line.map((v) => parseInt(v)));
line = "0 0 1".split(" ");
aij.push(line.map((v) => parseInt(v)));
console.log(aij);
