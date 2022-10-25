/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-07 19:09:43
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-07 20:07:19
 * @FilePath: \2022-04-07\3.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t3(n = 4, k = 2) {
  let res = 0;

  let n_2k = n - 2 * k;

  if (n_2k > k) {
    res =
      (factorial(26, 26 - k + 1) * factorial(n_2k, 1)) /
      (factorial(n_2k - k, 1) * factorial(k, 1));
  } else {
    res = factorial(26, 26 - k + 1) / factorial(k, 1);
  }
  return res;
}

function factorial(n = 10, k = 1) {
  let res = 1;
  for (let i = k; i <= n; i++) {
    res *= i;
    if (res > 1e6) {
      res %= 1e6;
    }
  }
  return res;
}

// 组合数
function C(n = 4, k = 2) {
  let res = 1;
  for (let i = n; i > n - k; i--) {
    res *= i;
  }
  for (let i = 1; i <= k; i++) {
    res /= i;
  }
  return res;
}
// console.log(C(10, 2));
console.log(t3(2, 1));
console.log(t3(4, 2));
