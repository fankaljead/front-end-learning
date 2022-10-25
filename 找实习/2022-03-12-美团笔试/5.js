/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-12 17:57:41
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-12 17:57:43
 * @FilePath: \test\5.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
let n = readInt();

let bw = read_line()
  .split(" ")
  .map((v) => Number(v));
let p = read_line()
  .split(" ")
  .map((v) => Number(v));

function m5(n = 6, bw = [1, 0, 1, 1, 0, 0], p = [0, 1, 2, 1, 4, 4]) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push([]);
  }

  for (let i = 0; i < n; ++i) {
    if (p[i] === 0) {
      continue;
    }
    arr[p[i]].push(i);
  }

  let white = 1,
    black = 1;
  for (let i = 0; i < n; ++i) {
    if (bw[i] === 1) {
      if (arr[i].length === 0) {
        white++;
      } else if (arr[i].reduce((a, b) => bw[a] + bw[b]) < arr[i].length) {
        white++;
      }
    } else {
      if (arr[i].length === 0) {
        black++;
      } else if (arr[i].reduce((a, b) => bw[a] + bw[b]) === arr[i].length) {
        black++;
      }
    }
  }
  console.log(white, black);
}

m5(n, bw, p);
