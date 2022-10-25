/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-26 12:26:37
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-26 14:43:39
 * @FilePath: \2022-03-26-网易雷火笔试\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 斐波拉契数列
function fibonacci(n) {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  let f0 = 0,
    f1 = 1,
    f2 = f0 + f1;
  for (let i = 2; i <= n; i++) {
    f2 = f0 + f1;
    f0 = f1;
    f1 = f2;
  }
  return f1;
}
