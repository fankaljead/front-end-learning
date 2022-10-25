/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-14 18:16:55
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-14 18:53:12
 * @FilePath: \2022-04-14-便利蜂笔试\2.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t2(arr1 = [], arr2 = [], arr3 = [], x = 1) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  arr3.sort((a, b) => a - b);
  let count = 0;

  for (let i = 0; i < arr1.length; ++i) {
    let res = x - arr1[i];
    let j = 0,
      k = arr3.length - 1;
    while (j <= arr2.length - 1 && k >= 0) {
      if (arr2[j] + arr3[k] <= res) {
        count += k + 1;
        j++;
      } else {
        k--;
      }
    }
    if (j <= arr2.length - 1 && k < 0) {
      while (j <= arr2.length - 1) {
        if (arr2[j] + arr3[0] <= res) {
          count++;
          j++;
        } else {
          break;
        }
      }
    }
  }

  if (count === 0) {
    return -1;
  }
  return count % (1e9 + 7);
}

function getArr() {
  let line = read_line();
  let arr = line.split(" ");
  return arr.map((v) => parseInt(v));
}

let arr1 = getArr();
let arr2 = getArr();
let arr3 = getArr();
let x = readInt();
console.log(t2(arr1, arr2, arr3, x));

function find() {
  let W = readInt();
  let record = new Map();
  let count = 0;
}
