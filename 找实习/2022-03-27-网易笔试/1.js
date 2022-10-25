/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 12:34:55
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 15:51:53
 * @FilePath: \2022-03-27-网易笔试\1.js
 * @Description: 网易笔试 第一题
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t1(a = 5, b = 2, x = 3, y = 1) {
  let res = Number.MAX_VALUE;
  function backtracking(a = 5, b = 2, x = 3, y = 1, count = 0) {
    if (a <= 0 && b <= 0) {
      if (count < res) {
        res = count;
      }
      return;
    }
    backtracking(a - y, b - y, x, y, count + 1);
    if (a > 0) {
      backtracking(a - x, b, x, y, count + 1);
    }
    if (b > 0) {
      backtracking(a, b - x, x, y, count + 1);
    }
  }

  backtracking(a, b, x, y, 0);
  return res;
}

console.log(t1());
