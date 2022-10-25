/*
 * @Author: Zhou Xianghui
 * @Date: 2022-03-22 19:38:57
 * @LastEditors: Zhou Xianghui
 * @LastEditTime: 2022-03-22 21:12:06
 * @FilePath: \2022-03-22-百度笔试\2.js
 * @Description: 最长区间
 * after a long, long, long time
 * Copyright (c) 2022 by Zhou Xianghui/Qianjiang Tech, All Rights Reserved.
 */
// 最长区间
function t2(str = "11011") {
  let x = str.indexOf(str[0], 1);
  let b = str[0] === "1" ? 1 : 0;
  let zeroOne = [1 - b, b]; // 0的个数 1的个数
  let dp = [
    [0, 0],
    [x, x],
  ];

  for (let i = 1, len = str.length; i < len; i++) {
    if (dp[1][1] < i) {
      if (str[dp[0][0] + i - dp[1][0]] === str[i]) {
        let width = i - dp[1][0];
        dp[0][1] = dp[0][0] + width;
        dp[1][1] = i;
        for (let j = 0; j < width; j++) {
          if (str[j + i] === "1") {
            zeroOne[1]++;
          } else {
            zeroOne[0]++;
          }
        }
      }
    } else if (dp[1][1] > i) {
      if (str[i] === str[dp[1][0] - (i - dp[0][1])]) {
        let width = i - dp[0][1];
        dp[0][1] = i;
        dp[1][0] = dp[1][0] - width;
        for (let j = 0; j < width; j++) {
          if (str[j + i] === "1") {
            zeroOne[1]++;
          } else {
            zeroOne[0]++;
          }
        }
      }
    } 
    console.log(dp);
  }

  let res = [dp[0][0] + 1, dp[0][1] + 1, dp[1][0] + 1, dp[1][1] + 1];
  return res;
}

// let str = "11011";

// console.log(str.indexOf(str[0], 1));
// console.log(t2());
// console.log(t2("101").join(" "));
// console.log(t2("10111").join(" "));
// console.log(t2("111110010").join(" "));
// console.log(t2("10001").join(" "));
// console.log(t2("11").join(" "));
console.log(t2("1001001").join(" "));
// console.log(t2("100010").join(" "));
// console.log(t2("1000110").join(" "));
// console.log(t2("100010001").join(" "));
// console.log(t2("10001001111001").join(" "));
