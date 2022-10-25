/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-29 13:58:17
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-29 20:01:29
 * @FilePath: \2022-03-29-百度笔试\1.js
 * @Description: 百度笔试第 1 题
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function reverseNumber(N = 123) {
  let result = 0;
  while (N) {
    result = result * 10 + (N % 10);
    N = Math.floor(N / 10);
  }
  return result;
}

function t1(N = 8, K = 9) {
  let max = 0,
    mul = 1;
  for (let i = 1; i <= K; i++) {
    mul = reverseNumber(N * i);
    if (mul > max) {
      max = mul;
    }
  }

  return max;
}

console.log(reverseNumber(123));
console.log(reverseNumber(1230));
console.log(t1(8, 9));
console.log(reverseNumber(1000 * 1000));