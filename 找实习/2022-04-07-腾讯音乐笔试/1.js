/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-07 19:04:44
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-07 19:14:00
 * @FilePath: \2022-04-07\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
function t1(s = "111") {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      res++;
    }
  }

  return Array.from(s).reduce((p, c) => p + Number(c === "1"), 0) - 1;

  return res++;
}
