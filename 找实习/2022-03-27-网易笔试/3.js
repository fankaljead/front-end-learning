/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-27 15:12:07
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-27 16:11:58
 * @FilePath: \2022-03-27-网易笔试\3.js
 * @Description: 完全二叉树的构造
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */

function t3(n = 5) {
  let res = [];
  let p = 1,
    q = 2;
  while (q <= n) {
    res.push(q);
    q += 2;
  }
  while (p <= n) {
    res.push(p);
    p += 2;
  }

  return res;
}
