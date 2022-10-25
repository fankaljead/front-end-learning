/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-14 18:13:00
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-14 18:50:09
 * @FilePath: \2022-04-14-便利蜂笔试\3.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t3(
  shelft_width = 4,
  goods = [
    [1, 1],
    [2, 3],
    [2, 3],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 2],
  ]
) {
  let hs = [];
  goods.sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < goods.length; ++i) {
    let [w, h] = goods[i];
    let j = i + 1;
    for (; j < goods.length && w <= shelft_width; ++j) {
      if (w + goods[j][0] > shelft_width) {
        break;
      } else {
        w += goods[j][0];
      }
      h = Math.max(h, goods[j][1]);
    }
    i = j - 1;
    hs.push(h);
  }

  return hs.reduce((a, b) => a + b);
}



let shelft_width = readInt();
let line;
let goods = [];
while ((line = read_line()) != "") {
  let arr = line.split(" ");
  let w = parseInt(arr[0]);
  let h = parseInt(arr[1]);
  goods.push([w, h]);
}
console.log(t3());