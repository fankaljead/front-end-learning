/*
 * @Author: Zhou Xianghui
 * @Date: 2022-04-08 19:54:37
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-04-08 20:07:18
 * @FilePath: \2022-04-08-阅文笔试\1.js
 * @Description:
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 最长递增子序列

function findShortestSubstring(s = "abcbbkkk") {
  let res = [];
  for (let i = 0, len = s.length; i < len; ++i) {
    let temp = [s[i]];
    for (let j = i + 1; j < len; ++j) {
      if (s[j] > temp[temp.length - 1]) {
        temp.push(s[j]);
      }
    }
    if (temp.length > res.length) {
      res = temp;
    }
  }
  return res.join("");
}
console.log(findShortestSubstring());
console.log(findShortestSubstring("xabbcacpqr"));
