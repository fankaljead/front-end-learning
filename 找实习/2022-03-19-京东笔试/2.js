/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-19 20:20:33
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-20 13:55:41
 * @FilePath: \2022-03-19-京东\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function t(x = 4, y = 1) {
  if (x <= y) {
    return y - x;
  }
  if (x % 3 == 0) {
    x = x / 3;
  } else {
    x++;
  }
  return 1 + t(x, y);
}
function t2(
  T = 2,
  xy = [
    [4, 1],
    [2, 2],
  ]
) {
  let res = [];

  for (let i = 0; i < T; i++) {
    let x = xy[i][0];
    let y = xy[i][1];

    res.push(ttt(x, y));
  }

  return res;
}

function tt(x = 4, y = 1) {
  if (x <= y) {
    return y - x;
  }
  let res = 0n;
  while (x != y) {
    if (x <= y) {
      res += y - x;
      return res;
    }
    if (x % 3 === 0) {
      x = x / 3;
      res++;
    } else {
      res += 3 - (x % 3) + 1;
      x = Math.ceil(x / 3);
    }
  }
  return res;
}

function ttt(x = 4n, y = 1n) {
  if (x <= y) {
    return y - x;
  }
  let res = 0n;
  while (x != y) {
    if (x <= y) {
      res += y - x;
      return res;
    }
    if (x % 3n == 0n) {
      x = x / 3n;
      res++;
    } else {
      res += 3n - (x % 3n) + 1n;
      x = x / 3n + 1n;
    }
  }
  return res;
}

let T = 2;
let xy = [
  // [4, 1],
  // [10e5, 10e3 - 2],
  // [100, 33],
  // [2, 2],
  // [10e16, 10e16 - 1],
  [10n ** 18n, 10n ** 18n - 2n],
  [10n ** 16n, 10n ** 16n - 1n],
];
//  这里 10^16 超过了 Number.Max_VALUE 必须使用 BigInt
// for (let i = 0; i < T; i++) {
//   let line = read_line();
//   let arr = line.split(" ");
//   let x = parseInt(arr[0]);
//   let y = parseInt(arr[1]);
//   xy.push([x, y]);
// }

console.log(t2(T, xy).join(" ").replace("n", ""));
