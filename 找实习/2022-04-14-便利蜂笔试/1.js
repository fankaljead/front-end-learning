/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-14 16:57:56
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-14 18:09:42
 * @FilePath: \2022-04-14-便利蜂笔试\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t1(
  n = 3,
  t_cost = [
    [490, 40],
    [480, 30],
    [720, 30],
  ]
) {
  if (t_cost.length <= 0) {
    return t_cost.length;
  }
  t_cost.sort((a, b) => a[0] - b[0]);
  let rider = [t_cost[0][0]];

  for (let i = 1; i < t_cost.length; ++i) {
    let [t, cost] = t_cost[i];
    if (rider[0] + cost <= t) {
      rider[0] = t;

      insertBefore(rider);
      continue;
    } else {
      rider.unshift(t);
      insertAfter(rider);
    }
  }

  // console.log(t_cost);
  // console.log(rider);
  return rider.length;
}
t1();

function insertBefore(rider = [5, 1, 2, 3, 4, 5, 6]) {
  let temp = rider[0];
  let j = 1;
  for (; j < rider.length; ++j) {
    if (rider[j] < temp) {
      rider[j - 1] = rider[j];
    } else {
      break;
    }
  }
  rider[j - 1] = temp;
  console.log(rider);
}

function insertAfter(rider = [1, 2, 3, 4, 5, 4]) {
  let len = rider.length;
  let temp = rider[len - 1];
  let j = len - 2;
  for (; j >= 0; --j) {
    if (rider[j] > temp) {
      rider[j + 1] = rider[j];
    } else {
      break;
    }
  }
  rider[j + 1] = temp;
  console.log(rider);
}

// insertAfter([2, 1]);
// insertBefore([2, 1]);
// let n = readInt();
// let line;
// let t_cost = [];
// while ((line = read_line()) != "") {
//   let arr = line.split(" ");
//   let t = parseInt(arr[0]);
//   let cost = parseInt(arr[1]);
//   t_cost.push([t, cost]);
//   print(t1(n, t_cost));
// }

// console.log("  fdf df  dcsf  ".trim().split(" "));
for (let i = 0; i < n; ++i) {
  let t = readInt();
  let cost = readInt();
  t_cost.push([t, cost]);
}
