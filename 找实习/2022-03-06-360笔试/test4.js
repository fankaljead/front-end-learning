/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-06 17:25:16
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-06 17:43:36
 * @FilePath: \test\test4.js
 * @Description: 反转黑白棋
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// let n = 100,
//   q = [
//     [1, 30],
//     [21, 40],
//   ];

let n = readInt(),
  q = readInt();
let qs = [];
let line;
while ((line = read_line()) != "") {
  let arr = line.split(" ");
  let a = parseInt(arr[0]);
  let b = parseInt(arr[1]);
  qs.push([a, b]);
}

let pieces = Array(n).fill(1);
function flip(pieces = [], L = 0, R = 1) {
  if (L < 0 || R >= pieces.length) {
    return;
  }

  for (let i = L; i <= R; ++i) {
    pieces[i] = !pieces[i];
  }
}

function countBlackPieces(pieces = [], qs = []) {
  for (const q of qs) {
    flip(pieces, q[0], q[1]);
    console.log(pieces.reduce((p, v) => p + v));
  }
}

countBlackPieces(pieces, qs);

function countBlackPieces(pieces = [], qs = []) {
  const res = [];
  for (const q of qs) {
    flip(pieces, q[0], q[1]);
    res.push(pieces.reduce((p, v) => p + v));
  }
  return res;
}

console.log(countBlackPieces(pieces, q));
